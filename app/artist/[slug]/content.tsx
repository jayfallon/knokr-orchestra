"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MemberCard from "@/components/MemberCard";
import MemberForm from "@/components/MemberForm";
import { getArtistImageUrl } from "@/lib/image";

interface Member {
  id: string;
  name: string;
  role: string;
  isActive: boolean;
  startYear: number | null;
  endYear: number | null;
  imageUrl: string | null;
  wikipediaUrl: string | null;
}

interface Artist {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  genres: string[];
  location: string;
  bio: string | null;
  website: string | null;
  spotify: string | null;
}

interface RelatedArtist {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  location: string;
  connectionReason: string;
}

interface Props {
  artist: Artist;
  currentMembers: Member[];
  pastMembers: Member[];
  relatedArtists: RelatedArtist[];
}

export default function ArtistContent({ artist, currentMembers, pastMembers, relatedArtists }: Props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-[#fdf5d4]">
      <header className="border-b border-[#ba326b]/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-[#ba326b] hover:text-[#4c222a]">
            ← Back to search
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      {getArtistImageUrl(artist.imageUrl) ? (
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-7xl rounded-xl overflow-hidden" style={{ aspectRatio: "1.618 / 1" }}>
            <Image
              src={getArtistImageUrl(artist.imageUrl)!}
              alt={artist.name}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-7xl rounded-xl bg-[#ba326b]/20 flex items-center justify-center text-6xl text-[#ba326b]" style={{ aspectRatio: "1.618 / 1" }}>
            {artist.name[0]}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Artist Info */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 text-[#4c222a] block uppercase tracking-wide">
            {artist.name}
          </h1>
          <p className="text-lg text-[#4c222a]/70 mb-4 uppercase tracking-wider">{artist.location}</p>
          {artist.genres.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {artist.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1.5 text-sm bg-[#ba326b]/20 text-[#ba326b] rounded-full uppercase tracking-wide"
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
                className="text-base text-[#ba326b] hover:underline uppercase tracking-wide"
              >
                Spotify
              </a>
            )}
            {artist.website && (
              <a
                href={artist.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[#ba326b]/80 hover:underline uppercase tracking-wide"
              >
                Website
              </a>
            )}
          </div>
        </div>

        {/* Current Members */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-[#4c222a] uppercase tracking-wide">
              Current Members {currentMembers.length > 0 && `(${currentMembers.length})`}
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-[#610553] text-[#fdf5d4] rounded-full text-sm font-medium hover:bg-[#4a0440] cursor-pointer uppercase tracking-wide"
            >
              + Add Member
            </button>
          </div>
          {currentMembers.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <p className="text-[#4c222a]/60 py-8 text-center border border-dashed border-[#ba326b]/30 rounded-xl">
              No members listed yet. Be the first to add one!
            </p>
          )}
        </section>

        {/* Former Members */}
        {pastMembers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#4c222a] mb-6 uppercase tracking-wide">
              Former Members ({pastMembers.length})
            </h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {pastMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* Related Artists */}
        {relatedArtists.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#4c222a] mb-6 uppercase tracking-wide">
              Related Artists
            </h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {relatedArtists.map((related) => (
                <Link
                  key={related.id}
                  href={`/artist/${related.slug}`}
                  className="group"
                >
                  <div className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] rounded-xl bg-white border border-[#ba326b]/10 overflow-hidden">
                    <div className="relative overflow-hidden rounded-t-xl" style={{ aspectRatio: "1.618 / 1" }}>
                      {getArtistImageUrl(related.imageUrl) ? (
                        <Image
                          src={getArtistImageUrl(related.imageUrl)!}
                          alt={related.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex w-full h-full items-center justify-center bg-gradient-to-br from-[#610553]/20 to-[#ba326b]/20 text-4xl text-[#ba326b]">
                          {related.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-gradient-to-b from-white to-[#fdf5d4]/50">
                      <p className="text-lg font-semibold text-[#4c222a] group-hover:text-[#ba326b] line-clamp-1">
                        {related.name}
                      </p>
                      <p className="text-xs text-[#ba326b]/70 line-clamp-1">
                        {related.connectionReason}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Add Member Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-[#ba326b]/20">
              <h2 className="text-xl font-semibold text-[#4c222a]">Add a Band Member</h2>
              <p className="text-sm text-[#4c222a]/60">for {artist.name}</p>
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
