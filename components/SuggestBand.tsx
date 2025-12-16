"use client";

import { useState } from "react";
import Link from "next/link";

interface Artist {
  id: string;
  name: string;
  slug: string;
}

export default function SuggestBand() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRandom = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/artists/random");
      if (res.ok) {
        const data = await res.json();
        setArtist(data);
      }
    } catch (error) {
      console.error("Failed to fetch random artist:", error);
    } finally {
      setLoading(false);
    }
  };

  const googleSearchUrl = artist
    ? `https://www.google.com/search?q=${encodeURIComponent(artist.name + " band wikipedia")}`
    : null;

  return (
    <div className="mt-6 text-center">
      {!artist ? (
        <button
          onClick={fetchRandom}
          disabled={loading}
          className="px-4 py-2 text-sm text-[#fdf5d4]/80 hover:text-[#fdf5d4] border border-[#fdf5d4]/30 hover:border-[#fdf5d4]/50 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Finding..." : "Suggest a band"}
        </button>
      ) : (
        <div className="p-4 bg-[#fdf5d4]/10 rounded-xl border border-[#fdf5d4]/20">
          <p className="text-sm text-[#fdf5d4]/70 mb-2">How about...</p>
          <Link
            href={`/artist/${artist.slug}`}
            className="text-xl font-semibold text-[#fdf5d4] hover:underline"
          >
            {artist.name}
          </Link>
          <div className="mt-3 flex justify-center gap-3">
            <a
              href={googleSearchUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#fdf5d4]/60 hover:text-[#fdf5d4] hover:underline"
            >
              Search Wikipedia
            </a>
            <button
              onClick={fetchRandom}
              disabled={loading}
              className="text-xs text-[#fdf5d4]/60 hover:text-[#fdf5d4] hover:underline disabled:opacity-50"
            >
              {loading ? "..." : "Try another"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
