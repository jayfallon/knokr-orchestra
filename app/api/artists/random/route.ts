import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Get total count
    const count = await prisma.artist.count();
    if (count === 0) {
      return Response.json({ error: "No artists found" }, { status: 404 });
    }

    // Get random offset
    const skip = Math.floor(Math.random() * count);

    // Fetch random artist
    const artist = await prisma.artist.findFirst({
      skip,
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    if (!artist) {
      return Response.json({ error: "Artist not found" }, { status: 404 });
    }

    return Response.json(artist);
  } catch (error) {
    console.error("Random artist error:", error);
    return Response.json({ error: "Failed to fetch artist" }, { status: 500 });
  }
}
