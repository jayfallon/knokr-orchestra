import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ArtistContent from "./content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const artist = await prisma.artist.findUnique({
    where: { slug },
    select: { name: true },
  });

  if (!artist) return { title: "Artist Not Found" };

  return {
    title: `${artist.name} - Band Members | Orchestra`,
    description: `View and contribute band member information for ${artist.name}`,
  };
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params;

  const artist = await prisma.artist.findUnique({
    where: { slug },
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
      connections: {
        select: {
          connectedArtist: {
            select: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
              location: true,
            },
          },
          weight: true,
        },
        orderBy: { weight: "desc" },
        take: 8,
      },
    },
  });

  if (!artist) notFound();

  // Look up artists that match member names - use Artist data if exists
  const memberNames = artist.members.map((m) => m.name);
  const matchingArtists = await prisma.artist.findMany({
    where: { name: { in: memberNames } },
    select: { name: true, imageUrl: true },
  });
  const artistDataMap = new Map(matchingArtists.map((a) => [a.name, a]));

  // If member exists as Artist, use Artist imageUrl
  const membersWithArtistData = artist.members.map((m) => {
    const artistRecord = artistDataMap.get(m.name);
    return {
      ...m,
      imageUrl: artistRecord?.imageUrl ?? m.imageUrl,
    };
  });

  const currentMembers = membersWithArtistData.filter((m) => m.isActive);
  const pastMembers = membersWithArtistData.filter((m) => !m.isActive);
  const relatedArtists = artist.connections.map((c) => c.connectedArtist);

  return (
    <ArtistContent
      artist={artist}
      currentMembers={currentMembers}
      pastMembers={pastMembers}
      relatedArtists={relatedArtists}
    />
  );
}
