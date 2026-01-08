import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
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
  const { userId } = await auth();
  const isAuthenticated = !!userId;

  const artist = await prisma.artist.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      imageUrl: true,
      genres: true,
      city: true,
      region: true,
      country: true,
      bio: true,
      website: true,
      spotify: true,
      instagram: true,
      facebook: true,
      youtube: true,
      tiktok: true,
      bandcamp: true,
      soundcloud: true,
      appleMusic: true,
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
      FestivalLineup: {
        select: {
          Festival: {
            select: {
              id: true,
              name: true,
              slug: true,
              startDate: true,
              endDate: true,
              location: true,
              city: true,
              region: true,
              country: true,
              imageUrl: true,
            },
          },
        },
        orderBy: {
          Festival: {
            startDate: "desc",
          },
        },
      },
      connections: {
        select: {
          connectedArtist: {
            select: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
              city: true,
              region: true,
              country: true,
              instagram: true,
              facebook: true,
              youtube: true,
              spotify: true,
              tiktok: true,
            },
          },
          weight: true,
          sharedFestivals: true,
          sharedMembers: true,
          sharedGenres: true,
          sameCity: true,
          sameRegion: true,
        },
        orderBy: { weight: "desc" },
      },
      connectedBy: {
        select: {
          artist: {
            select: {
              id: true,
              name: true,
              slug: true,
              imageUrl: true,
              city: true,
              region: true,
              country: true,
              instagram: true,
              facebook: true,
              youtube: true,
              spotify: true,
              tiktok: true,
            },
          },
          weight: true,
          sharedFestivals: true,
          sharedMembers: true,
          sharedGenres: true,
          sameCity: true,
          sameRegion: true,
        },
        orderBy: { weight: "desc" },
      },
    },
  });

  if (!artist) notFound();

  // Look up artists that match member names - use Artist data if exists
  const memberNames = artist.members.map((m) => m.name);
  const matchingArtists = await prisma.artist.findMany({
    where: { name: { in: memberNames } },
    select: { name: true, slug: true, imageUrl: true, city: true, region: true, country: true, instagram: true, facebook: true, youtube: true, spotify: true, tiktok: true },
  });
  const artistDataMap = new Map(matchingArtists.map((a) => [a.name, a]));

  // If member exists as Artist, use Artist data
  const membersWithArtistData = artist.members.map((m) => {
    const artistRecord = artistDataMap.get(m.name);
    const socials: { network: string; url: string }[] = [];
    if (artistRecord?.instagram) socials.push({ network: "instagram", url: artistRecord.instagram });
    if (artistRecord?.facebook) socials.push({ network: "facebook", url: artistRecord.facebook });
    if (artistRecord?.youtube) socials.push({ network: "youtube", url: artistRecord.youtube });
    if (artistRecord?.spotify) socials.push({ network: "spotify", url: artistRecord.spotify });
    if (artistRecord?.tiktok) socials.push({ network: "tiktok", url: artistRecord.tiktok });
    return {
      ...m,
      slug: artistRecord?.slug ?? null,
      imageUrl: artistRecord?.imageUrl ?? m.imageUrl,
      city: artistRecord?.city ?? null,
      region: artistRecord?.region ?? null,
      country: artistRecord?.country ?? null,
      socials,
    };
  });

  const currentMembers = membersWithArtistData.filter((m) => m.isActive);
  const pastMembers = membersWithArtistData.filter((m) => !m.isActive);

  // Combine both directions of connections, dedupe by id, sort by weight
  // Exclude artists that are also members, limit to 24
  const memberNameSet = new Set(memberNames);
  const allConnections = [
    ...artist.connections.map((c) => ({
      artist: c.connectedArtist,
      weight: c.weight,
      sharedFestivals: c.sharedFestivals,
      sharedMembers: c.sharedMembers,
      sharedGenres: c.sharedGenres,
      sameCity: c.sameCity,
      sameRegion: c.sameRegion,
    })),
    ...artist.connectedBy.map((c) => ({
      artist: c.artist,
      weight: c.weight,
      sharedFestivals: c.sharedFestivals,
      sharedMembers: c.sharedMembers,
      sharedGenres: c.sharedGenres,
      sameCity: c.sameCity,
      sameRegion: c.sameRegion,
    })),
  ];
  const seen = new Set<string>();
  const relatedArtists = allConnections
    .sort((a, b) => b.weight - a.weight)
    .filter((c) => {
      if (seen.has(c.artist.id)) return false;
      if (memberNameSet.has(c.artist.name)) return false;
      seen.add(c.artist.id);
      return true;
    })
    .slice(0, 24)
    .map((c) => {
      const socials: { network: string; url: string }[] = [];
      if (c.artist.instagram) socials.push({ network: "instagram", url: c.artist.instagram });
      if (c.artist.facebook) socials.push({ network: "facebook", url: c.artist.facebook });
      if (c.artist.youtube) socials.push({ network: "youtube", url: c.artist.youtube });
      if (c.artist.spotify) socials.push({ network: "spotify", url: c.artist.spotify });
      if (c.artist.tiktok) socials.push({ network: "tiktok", url: c.artist.tiktok });
      return {
        id: c.artist.id,
        name: c.artist.name,
        slug: c.artist.slug,
        imageUrl: c.artist.imageUrl,
        city: c.artist.city,
        region: c.artist.region,
        country: c.artist.country,
        socials,
        connectionReason: getConnectionReason(c),
      };
    });

  function getConnectionReason(c: { sharedFestivals: number; sharedMembers: number; sharedGenres: number; sameCity: boolean; sameRegion: boolean }) {
    const reasons: string[] = [];
    if (c.sharedMembers > 0) reasons.push(`${c.sharedMembers} shared member${c.sharedMembers > 1 ? "s" : ""}`);
    if (c.sharedFestivals > 0) reasons.push(`${c.sharedFestivals} shared festival${c.sharedFestivals > 1 ? "s" : ""}`);
    if (c.sameCity) reasons.push("same city");
    if (c.sameRegion && !c.sameCity) reasons.push("same region");
    if (c.sharedGenres > 0) reasons.push(`${c.sharedGenres} shared genre${c.sharedGenres > 1 ? "s" : ""}`);
    return reasons.join(" · ") || "related";
  }

  // Extract festivals from FestivalLineup
  const festivals = artist.FestivalLineup.map((lineup) => lineup.Festival);

  return (
    <ArtistContent
      artist={artist}
      currentMembers={currentMembers}
      pastMembers={pastMembers}
      relatedArtists={relatedArtists}
      festivals={festivals}
      isAuthenticated={isAuthenticated}
    />
  );
}
