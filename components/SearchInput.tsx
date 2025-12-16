"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getArtistImageUrl } from "@/lib/image";

interface Artist {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  genres: string[];
  location: string;
  memberCount: number;
}

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Artist[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/artists/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.artists || []);
        setIsOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const selectArtist = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/artist/${slug}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for an artist or band..."
        className="w-full px-6 py-4 text-lg text-[#4c222a] bg-white border-2 border-[#d9657c]/30 rounded-full focus:outline-none focus:border-[#d9657c] placeholder:text-[#4c222a]/40"
      />
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-5 h-5 border-2 border-[#d9657c]/30 border-t-[#d9657c] rounded-full animate-spin" />
        </div>
      )}

      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-[#d9657c]/20 rounded-xl shadow-lg max-h-96 overflow-auto">
          {results.map((artist) => (
            <li key={artist.id}>
              <button
                onClick={() => selectArtist(artist.slug)}
                className="w-full px-4 py-3 flex items-center gap-4 hover:bg-[#fdf5d4] text-left"
              >
                {getArtistImageUrl(artist.imageUrl) ? (
                  <img
                    src={getArtistImageUrl(artist.imageUrl)!}
                    alt={artist.name}
                    className="w-16 h-10 rounded object-cover"
                    style={{ aspectRatio: "1.618 / 1" }}
                  />
                ) : (
                  <div className="w-16 h-10 rounded bg-[#d9657c]/20 flex items-center justify-center text-[#d9657c]" style={{ aspectRatio: "1.618 / 1" }}>
                    {artist.name[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#4c222a] truncate">{artist.name}</p>
                  <p className="text-sm text-[#4c222a]/60 truncate">
                    {artist.location} {artist.memberCount > 0 && `· ${artist.memberCount} members`}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute z-10 w-full mt-2 px-4 py-3 bg-white border border-[#d9657c]/20 rounded-xl shadow-lg text-[#4c222a]/60">
          No artists found
        </div>
      )}
    </div>
  );
}
