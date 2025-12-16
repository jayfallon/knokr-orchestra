import { prisma } from "@/lib/db";
import { memberSubmissionSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: artistId } = await params;

  // Get IP for rate limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] ||
             headersList.get("x-real-ip") ||
             "unknown";

  // Check rate limit
  const { allowed, remaining } = checkRateLimit(ip);
  if (!allowed) {
    return Response.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
    );
  }

  try {
    const body = await request.json();

    // Validate input
    const result = memberSubmissionSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check (bot detection)
    if (data.honeypot) {
      return Response.json({ success: true, message: "Member submitted for review" });
    }

    // Verify Turnstile CAPTCHA
    if (data.turnstileToken) {
      const isValid = await verifyTurnstileToken(data.turnstileToken, ip);
      if (!isValid) {
        return Response.json(
          { error: "CAPTCHA verification failed" },
          { status: 400 }
        );
      }
    } else if (process.env.TURNSTILE_SECRET_KEY) {
      // Only require token if Turnstile is configured
      return Response.json(
        { error: "CAPTCHA required" },
        { status: 400 }
      );
    }

    // Verify artist exists
    const artist = await prisma.artist.findUnique({ where: { id: artistId } });
    if (!artist) {
      return Response.json({ error: "Artist not found" }, { status: 404 });
    }

    // Check if member name matches an existing artist
    const matchedArtist = await prisma.artist.findFirst({
      where: {
        name: { equals: data.name, mode: "insensitive" },
      },
      select: { id: true, imageUrl: true, website: true },
    });

    // Create pending submission (auto-fill image from matched artist if available)
    const submission = await prisma.pendingArtistMember.create({
      data: {
        artistId,
        name: data.name,
        role: data.role,
        isActive: data.isActive,
        startYear: data.startYear ?? null,
        endYear: data.endYear ?? null,
        imageUrl: data.imageUrl ?? matchedArtist?.imageUrl ?? null,
        wikipediaUrl: data.wikipediaUrl ?? null,
        submitterNote: data.note ?? null,
        submitterIp: ip,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Member submitted for review",
        submissionId: submission.id,
      },
      { status: 201, headers: { "X-RateLimit-Remaining": remaining.toString() } }
    );
  } catch (error) {
    console.error("Submission error:", error);
    return Response.json({ error: "Submission failed" }, { status: 500 });
  }
}
