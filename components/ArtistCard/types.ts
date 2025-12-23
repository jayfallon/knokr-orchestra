export interface ArtistSocial {
  network: string;
  url: string;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  genres: string[];
  city: string;
  region: string | null;
  country: string;
  bio: string | null;
  socials?: ArtistSocial[];
  videoUrl?: string;
}

export interface ArtistCardProps {
  artist: Artist;
  index?: number;
  enableVideoHover?: boolean;
  enableAnimation?: boolean;
}
