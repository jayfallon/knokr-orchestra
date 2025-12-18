"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardBody, Chip } from "@heroui/react";
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

export default function MemberCard({ member }: { member: Member }) {
  const years =
    member.startYear && member.endYear
      ? `${member.startYear}–${member.endYear}`
      : member.startYear
      ? `${member.startYear}–present`
      : null;

  const imageUrl = getArtistImageUrl(member.imageUrl);

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] rounded-xl bg-white border border-[#ba326b]/10">
      <CardBody className="p-0">
        {/* Image */}
        <div className="relative overflow-hidden rounded-t-xl" style={{ aspectRatio: "1.618 / 1" }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex w-full h-full items-center justify-center bg-gradient-to-br from-[#610553]/20 to-[#ba326b]/20">
              <svg
                className="h-1/3 w-1/3 text-[#ba326b]/50"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={`Placeholder image for ${member.name}`}
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
          {/* Years badge */}
          {years && (
            <div className="absolute bottom-2 right-2">
              <Chip
                size="sm"
                variant="flat"
                className="bg-[#610553]/90 text-[#fdf5d4] text-xs"
              >
                {years}
              </Chip>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 bg-gradient-to-b from-white to-[#fdf5d4]/50">
          <Link
            href={`/artist/${member.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
            className="text-lg font-semibold text-[#4c222a] hover:text-[#ba326b] line-clamp-1 block"
          >
            {member.name}
          </Link>
          <p className="text-sm text-[#4c222a]/60 capitalize line-clamp-1">
            {member.role}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
