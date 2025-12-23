"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArtistCard } from "@/components/ArtistCard";
import MemberForm from "@/components/MemberForm";
import FestivalCard from "@/components/FestivalCard";
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

  // Split festivals into upcoming and past
  const now = new Date();
  const upcomingFestivals = festivals.filter((f) => new Date(f.startDate) >= now);
  const pastFestivals = festivals.filter((f) => new Date(f.startDate) < now);

  return (
    <div className="min-h-screen bg-[#fdf5d4]">
      <header className="border-b border-[#A21534]/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="px-6 py-2.5 bg-[#A21534] text-[#FFF5D0] rounded-full text-sm font-medium hover:bg-[#8a1129] cursor-pointer uppercase tracking-wide">
            Back
          </Link>
          <button
            onClick={handleRandomArtist}
            className="px-6 py-2.5 bg-[#A21534] text-[#FFF5D0] rounded-full text-sm font-medium hover:bg-[#8a1129] cursor-pointer uppercase tracking-wide"
          >
            Random Artist
          </button>
        </div>
      </header>

      {/* Hero Image */}
      {getArtistImageUrl(artist.imageUrl) ? (
        <div className="flex justify-center mb-8 mt-8 px-4">
          <img
            src={getArtistImageUrl(artist.imageUrl)!}
            alt={artist.name}
            className="max-w-7xl h-auto rounded-xl"
          />
        </div>
      ) : (
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-[800px] rounded-xl bg-[#A21534]/20 flex items-center justify-center text-6xl text-[#A21534]" style={{ aspectRatio: "1.618 / 1" }}>
            {artist.name[0]}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Artist Info */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 text-[#A21534] block uppercase tracking-wide">
            {artist.name}
          </h1>
          <p className="text-lg text-[#A21534]/70 mb-4 uppercase tracking-wider">{formatLocation(artist)}</p>
          {artist.genres.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {artist.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1.5 text-sm bg-[#A21534]/20 text-[#A21534] rounded-full uppercase tracking-wide"
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
                className="text-base text-[#A21534] hover:underline uppercase tracking-wide"
              >
                Spotify
              </a>
            )}
            {artist.website && (
              <a
                href={artist.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[#A21534]/80 hover:underline uppercase tracking-wide"
              >
                Website
              </a>
            )}
          </div>
        </div>

        {/* Current Members */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-[#A21534] uppercase tracking-wide">
              Current Members {currentMembers.length > 0 && `(${currentMembers.length})`}
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-[#A21534] text-[#FFF5D0] rounded-full text-sm font-medium hover:bg-[#8a1129] cursor-pointer uppercase tracking-wide"
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
            <p className="text-[#A21534]/60 py-8 text-center border border-dashed border-[#A21534]/30 rounded-xl">
              No members listed yet. Be the first to add one!
            </p>
          )}
        </section>

        {/* Former Members */}
        {pastMembers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#A21534] mb-6 uppercase tracking-wide">
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
            <h2 className="text-3xl font-semibold text-[#A21534] mb-6 uppercase tracking-wide">
              Festivals ({festivals.length})
            </h2>

            {upcomingFestivals.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-medium text-[#A21534]/80 mb-4 uppercase tracking-wide">
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
                <h3 className="text-xl font-medium text-[#A21534]/80 mb-4 uppercase tracking-wide">
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
            <h2 className="text-3xl font-semibold text-[#A21534] mb-6 uppercase tracking-wide">
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
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-[#A21534]/20">
              <h2 className="text-xl font-semibold text-[#A21534]">Add a Band Member</h2>
              <p className="text-sm text-[#A21534]/60">for {artist.name}</p>
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

    </div>
  );
}
