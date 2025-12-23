"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { getArtistImageUrl } from "@/lib/image";
import type { ArtistCardProps } from "./types";
import "./ArtistCard.css";

function getLocation(
  city: string,
  region: string | null,
  country: string
): string {
  const isUSorUK = country === "United States" || country === "United Kingdom";
  const secondPart = isUSorUK ? region : country;
  const parts = [city, secondPart].filter(
    (p) => p && p !== "Unknown" && p !== "TBD"
  );
  return parts.join(", ") || "Unknown";
}

function getNameSizeClass(name: string): string {
  if (name.length > 30) return "text-sm";
  if (name.length > 20) return "text-base";
  return "text-xl";
}

export function ArtistCard({
  artist,
  index = 0,
  enableVideoHover = false,
  enableAnimation = true,
}: ArtistCardProps) {
  const imageUrl = getArtistImageUrl(artist.imageUrl);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (enableVideoHover && artist.videoUrl) {
      videoRef.current?.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (enableVideoHover && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const hasSocials = artist.socials && artist.socials.length > 0;
  const hasVideo = enableVideoHover && artist.videoUrl;

  const cardContent = (
    <Card className="shadow-md rounded-lg bg-[#A21534] transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(162,21,52,0.6)]">
      <CardHeader
        className="group relative p-0 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={artist.name}
            width={400}
            height={247}
            className={`aspect-[1.618/1] w-full object-cover transition-all duration-300 group-hover:scale-120 ${
              hasVideo && isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <div className="aspect-[1.618/1] w-full flex items-center justify-center bg-gradient-to-br from-[#A21534]/40 to-[#A21534]/20">
            <svg
              className="h-1/3 w-1/3 text-[#FFF5D0]/50"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18V5l12-2v13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
              <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        )}
        {hasVideo && (
          <video
            ref={videoRef}
            src={artist.videoUrl}
            muted
            loop
            playsInline
            className={`absolute inset-0 aspect-[1.618/1] w-full object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {hasSocials && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
            <div className="flex gap-1 rounded-full bg-[#A21534]/90 px-1 py-1">
              {artist.socials!.slice(0, 3).map((social) => (
                <SocialIcon
                  key={social.network}
                  url={social.url}
                  style={{ width: 44, height: 44 }}
                  bgColor="transparent"
                  fgColor="#FFF5D0"
                  className="social-icon-hover cursor-pointer transition-transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ))}
            </div>
          </div>
        )}
      </CardHeader>
      <CardBody className="px-4 py-3 text-center">
        <Link href={`/artist/${artist.slug}`}>
          <h2
            className={`${getNameSizeClass(artist.name)} font-bold tracking-tight text-[#FFF5D0] cursor-pointer hover:text-white transition-colors min-h-14 flex items-center justify-center`}
          >
            {artist.name}
          </h2>
        </Link>
        {(artist.city || artist.country) && (
          <p className="text-sm text-[#FFF5D0]/70">
            {getLocation(artist.city, artist.region, artist.country)}
          </p>
        )}
      </CardBody>
    </Card>
  );

  if (enableAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}
