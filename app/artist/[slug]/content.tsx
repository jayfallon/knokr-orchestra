"use client";

import { useState } from "react";
import Link from "next/link";
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

interface Props {
  artist: Artist;
  currentMembers: Member[];
  pastMembers: Member[];
}

export default function ArtistContent({ artist, currentMembers, pastMembers }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [showPast, setShowPast] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9657c] to-[#4c222a]">
      <header className="border-b border-[#fdf5d4]/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-[#fdf5d4]/80 hover:text-[#fdf5d4]">
            ← Back to search
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Artist Header */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {getArtistImageUrl(artist.imageUrl) ? (
            <img
              src={getArtistImageUrl(artist.imageUrl)!}
              alt={artist.name}
              className="w-48 sm:w-56 rounded-xl object-cover flex-shrink-0"
              style={{ aspectRatio: "1.618 / 1" }}
            />
          ) : (
            <div className="w-48 sm:w-56 rounded-xl bg-[#fdf5d4]/20 flex items-center justify-center text-4xl text-[#fdf5d4]/60 flex-shrink-0" style={{ aspectRatio: "1.618 / 1" }}>
              {artist.name[0]}
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-[#fdf5d4]">{artist.name}</h1>
            <p className="text-[#fdf5d4]/70 mb-2">{artist.location}</p>
            {artist.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {artist.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 text-xs bg-[#fdf5d4]/20 text-[#fdf5d4] rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-3">
              {artist.spotify && (
                <a
                  href={artist.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#fdf5d4] hover:underline"
                >
                  Spotify
                </a>
              )}
              {artist.website && (
                <a
                  href={artist.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#fdf5d4]/80 hover:underline"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Current Members */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#fdf5d4]">
              Current Members {currentMembers.length > 0 && `(${currentMembers.length})`}
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-[#fdf5d4] text-[#4c222a] rounded-lg text-sm font-medium hover:opacity-90"
            >
              + Add Member
            </button>
          </div>
          {currentMembers.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {currentMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <p className="text-[#fdf5d4]/60 py-8 text-center border border-dashed border-[#fdf5d4]/30 rounded-xl">
              No members listed yet. Be the first to add one!
            </p>
          )}
        </section>

        {/* Past Members */}
        {pastMembers.length > 0 && (
          <section>
            <button
              onClick={() => setShowPast(!showPast)}
              className="flex items-center gap-2 text-lg font-semibold mb-4 text-[#fdf5d4] hover:text-[#fdf5d4]/80"
            >
              <span className={`transition-transform ${showPast ? "rotate-90" : ""}`}>▶</span>
              Past Members ({pastMembers.length})
            </button>
            {showPast && (
              <div className="grid gap-3 sm:grid-cols-2">
                {pastMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Add Member Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-zinc-200">
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

      {/* Footer */}
      <footer className="border-t border-[#fdf5d4]/10 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-[#fdf5d4]/50">
          <a
            href={`https://knokr.com/a/${artist.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            View {artist.name} on Knokr →
          </a>
        </div>
      </footer>
    </div>
  );
}
