"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArtistCard } from "@/components/ArtistCard";
import MemberForm from "@/components/MemberForm";
import FestivalCard from "@/components/FestivalCard";
import Footer from "@/components/Footer";
import { getArtistImageUrl } from "@/lib/image";

interface Member {
  id: string;
  name: string;
  slug: string | null;
  role: string;
  isActive: boolean;
  startYear: number | null;
  endYear: number | null;
  imageUrl: string | null;
  wikipediaUrl: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  socials: { network: string; url: string }[];
}

interface Artist {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  genres: string[];
  city: string;
  region: string | null;
  country: string;
  bio: string | null;
  website: string | null;
  spotify: string | null;
}

function formatLocation(artist: Artist): string {
  const country = artist.country.toLowerCase();
  const isUSA = country === 'united states' || country === 'us' || country === 'usa';
  const isUK = country === 'united kingdom' || country === 'uk';

  if (isUSA || isUK) {
    return [artist.city, artist.region].filter(Boolean).join(', ');
  }
  return [artist.city, artist.country].filter(Boolean).join(', ');
}

interface RelatedArtist {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  city: string;
  region: string | null;
  country: string;
  socials: { network: string; url: string }[];
  connectionReason: string;
}

interface Festival {
  id: string;
  name: string;
  slug: string;
  startDate: Date;
  endDate: Date | null;
  location: string;
  city: string;
  region: string | null;
  country: string;
  imageUrl: string | null;
}

interface Props {
  artist: Artist;
  currentMembers: Member[];
  pastMembers: Member[];
  relatedArtists: RelatedArtist[];
  festivals: Festival[];
}

export default function ArtistContent({ artist, currentMembers, pastMembers, relatedArtists, festivals }: Props) {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const handleRandomArtist = async () => {
    const res = await fetch("/api/artists/random");
    const data = await res.json();
    if (data.slug) {
      router.push(`/artist/${data.slug}`);
    }
  };

  // Split festivals into upcoming and past, sorted chronologically
  const now = new Date();
  const upcomingFestivals = festivals
    .filter((f) => new Date(f.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  const pastFestivals = festivals
    .filter((f) => new Date(f.startDate) < now)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  return (
    <div className="min-h-screen">
      <header>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center border-b border-white/20">
          <Link href="/" className="px-6 py-2.5 bg-[#000A14] text-white rounded-full text-sm font-medium hover:text-[#3399FF] cursor-pointer uppercase tracking-wide">
            Back
          </Link>
          <button
            onClick={handleRandomArtist}
            className="px-6 py-2.5 bg-[#000A14] text-white rounded-full text-sm font-medium hover:text-[#3399FF] cursor-pointer uppercase tracking-wide"
          >
            Random Artist
          </button>
        </div>
      </header>

      {/* Hero Image */}
      {getArtistImageUrl(artist.imageUrl) ? (
        <div className="flex justify-center mb-8 mt-8 px-4">
          <div className="relative w-full max-w-[1200px] aspect-video">
            <Image
              src={getArtistImageUrl(artist.imageUrl)!}
              alt={artist.name}
              fill
              className="rounded-xl object-cover"
              sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1232px) calc(100vw - 32px), 1200px"
              priority
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-[800px] rounded-xl bg-white/20 flex items-center justify-center text-6xl text-white" style={{ aspectRatio: "1.618 / 1" }}>
            {artist.name[0]}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Artist Info */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 text-white block uppercase tracking-wide">
            {artist.name}
          </h1>
          <p className="text-lg text-white/70 mb-4 uppercase tracking-wider">{formatLocation(artist)}</p>
          {artist.genres.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {artist.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1.5 text-sm bg-white/20 text-white rounded-full uppercase tracking-wide"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-center gap-4">
            {artist.spotify && (
              <a
                href={artist.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-white hover:text-[#3399FF] uppercase tracking-wide"
              >
                Spotify
              </a>
            )}
            {artist.website && (
              <a
                href={artist.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-white/80 hover:text-[#3399FF] uppercase tracking-wide"
              >
                Website
              </a>
            )}
          </div>
        </div>

        {/* Current Members */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-white uppercase tracking-wide">
              Current Members {currentMembers.length > 0 && `(${currentMembers.length})`}
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-[#000A14] text-white rounded-full text-sm font-medium hover:text-[#3399FF] cursor-pointer uppercase tracking-wide"
            >
              + Add Member
            </button>
          </div>
          {currentMembers.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentMembers.map((member, index) => (
                <ArtistCard
                  key={member.id}
                  artist={{
                    id: member.id,
                    name: member.name,
                    slug: member.slug ?? member.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                    imageUrl: member.imageUrl,
                    genres: [],
                    city: member.city ?? "",
                    region: member.region,
                    country: member.country ?? "",
                    bio: null,
                    socials: member.socials,
                  }}
                  index={index}
                  enableAnimation={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-white/60 py-8 text-center border border-dashed border-white/30 rounded-xl">
              No members listed yet. Be the first to add one!
            </p>
          )}
        </section>

        {/* Former Members */}
        {pastMembers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 uppercase tracking-wide">
              Former Members ({pastMembers.length})
            </h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {pastMembers.map((member, index) => (
                <ArtistCard
                  key={member.id}
                  artist={{
                    id: member.id,
                    name: member.name,
                    slug: member.slug ?? member.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                    imageUrl: member.imageUrl,
                    genres: [],
                    city: member.city ?? "",
                    region: member.region,
                    country: member.country ?? "",
                    bio: null,
                    socials: member.socials,
                  }}
                  index={index}
                  enableAnimation={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Festivals */}
        {festivals.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 uppercase tracking-wide">
              Festivals ({festivals.length})
            </h2>

            {upcomingFestivals.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white/80 mb-4 uppercase tracking-wide">
                  Upcoming
                </h3>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {upcomingFestivals.map((festival) => (
                    <FestivalCard key={festival.id} festival={festival} />
                  ))}
                </div>
              </div>
            )}

            {pastFestivals.length > 0 && (
              <div>
                <h3 className="text-xl font-medium text-white/80 mb-4 uppercase tracking-wide">
                  Past
                </h3>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {pastFestivals.map((festival) => (
                    <FestivalCard key={festival.id} festival={festival} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Related Artists */}
        {relatedArtists.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 uppercase tracking-wide">
              Related Artists
            </h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedArtists.map((related, index) => (
                <ArtistCard
                  key={related.id}
                  artist={{
                    id: related.id,
                    name: related.name,
                    slug: related.slug,
                    imageUrl: related.imageUrl,
                    genres: [],
                    city: related.city,
                    region: related.region,
                    country: related.country,
                    bio: null,
                    socials: related.socials,
                  }}
                  index={index}
                  enableAnimation={true}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Add Member Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-[#000A14] rounded-2xl shadow-xl max-h-[95vh] overflow-y-auto border border-white/10">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-xl font-semibold text-white">Add a Band Member</h2>
              <p className="text-sm text-white/60">for {artist.name}</p>
            </div>
            <div className="p-6">
              <MemberForm
                artistId={artist.id}
                onClose={() => setShowForm(false)}
                onSuccess={() => {
                  // Could refresh data here
                }}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
