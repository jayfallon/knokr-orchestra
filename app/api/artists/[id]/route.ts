import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const artist = await prisma.artist.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
        genres: true,
        location: true,
        bio: true,
        website: true,
        spotify: true,
        members: {
          select: {
            id: true,
            name: true,
            role: true,
            isActive: true,
            startYear: true,
            endYear: true,
            imageUrl: true,
            wikipediaUrl: true,
          },
          orderBy: [{ isActive: "desc" }, { startYear: "asc" }],
        },
      },
    });

    if (!artist) {
      return Response.json({ error: "Artist not found" }, { status: 404 });
    }

    const current = artist.members.filter((m) => m.isActive);
    const past = artist.members.filter((m) => !m.isActive);

    return Response.json({
      artist: {
        id: artist.id,
        name: artist.name,
        slug: artist.slug,
        imageUrl: artist.imageUrl,
        genres: artist.genres,
        location: artist.location,
        bio: artist.bio,
        website: artist.website,
        spotify: artist.spotify,
      },
      members: { current, past },
    });
  } catch (error) {
    console.error("Artist fetch error:", error);
    return Response.json({ error: "Failed to load artist" }, { status: 500 });
  }
}
