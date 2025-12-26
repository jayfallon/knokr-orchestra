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
    ? `https://www.google.com/search?q=${encodeURIComponent(
        artist.name + " band wikipedia"
      )}`
    : null;

  return (
    <div className="text-center">
      {!artist ? (
        <button
          onClick={fetchRandom}
          disabled={loading}
          className="px-6 py-2.5 text-sm bg-[#000A14] text-white rounded-full hover:text-[#3399FF] transition-colors disabled:opacity-50 cursor-pointer uppercase tracking-wide"
        >
          {loading ? "Finding..." : "Random"}
        </button>
      ) : (
        <div className="p-4 bg-[#000A14] rounded-xl border border-white/20">
          <p className="text-sm text-white/60 mb-2">How about...</p>
          <Link
            href={`/artist/${artist.slug}`}
            className="text-xl font-semibold text-white hover:text-[#3399FF]"
          >
            {artist.name}
          </Link>
          <div className="mt-3 flex justify-center gap-3">
            <a
              href={googleSearchUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/60 hover:text-[#3399FF]"
            >
              Search Wikipedia
            </a>
            <button
              onClick={fetchRandom}
              disabled={loading}
              className="text-xs text-white/60 hover:text-[#3399FF] disabled:opacity-50"
            >
              {loading ? "..." : "Try another"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
