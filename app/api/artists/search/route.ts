import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

function formatLocation(city: string | null, region: string | null, country: string | null): string {
  const countryLower = country?.toLowerCase() ?? "";
  const isUSA = countryLower === "united states" || countryLower === "us" || countryLower === "usa";
  const isUK = countryLower === "united kingdom" || countryLower === "uk";

  if (isUSA || isUK) {
    return [city, region].filter(Boolean).join(", ");
  }
  return [city, country].filter(Boolean).join(", ");
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

  if (!q || q.length < 2) {
    return Response.json({ artists: [] });
  }

  try {
    const artists = await prisma.artist.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
        genres: true,
        city: true,
        region: true,
        country: true,
        _count: {
          select: { members: true },
        },
      },
      take: limit,
      orderBy: { name: "asc" },
    });

    return Response.json({
      artists: artists.map((a) => ({
        id: a.id,
        name: a.name,
        slug: a.slug,
        imageUrl: a.imageUrl,
        genres: a.genres,
        location: formatLocation(a.city, a.region, a.country),
        memberCount: a._count.members,
      })),
    });
  } catch (error) {
    console.error("Search error:", error);
    return Response.json({ error: "Search failed" }, { status: 500 });
  }
}
