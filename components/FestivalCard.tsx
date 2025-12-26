"use client";

import Image from "next/image";
import { Card, CardBody, Chip } from "@heroui/react";

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

function formatDateRange(startDate: Date, endDate: Date | null): string {
  const start = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };

  if (!endDate) {
    return start.toLocaleDateString("en-US", { ...options, year: "numeric" });
  }

  const end = new Date(endDate);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    return `${start.toLocaleDateString("en-US", options)}–${end.getDate()}, ${end.getFullYear()}`;
  }

  return `${start.toLocaleDateString("en-US", options)}–${end.toLocaleDateString("en-US", { ...options, year: "numeric" })}`;
}

export default function FestivalCard({ festival }: { festival: Festival }) {
  const dateRange = formatDateRange(festival.startDate, festival.endDate);
  const knokrUrl = `https://knokr.com/r/${festival.slug}`;

  return (
    <a href={knokrUrl} target="_blank" rel="noopener noreferrer">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] rounded-xl bg-[#000A14] border border-white/10">
        <CardBody className="p-0">
          <div className="relative overflow-hidden rounded-t-xl" style={{ aspectRatio: "1.618 / 1" }}>
            {festival.imageUrl ? (
              <Image
                src={festival.imageUrl}
                alt={festival.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex w-full h-full items-center justify-center bg-gradient-to-br from-[#0080FF]/20 to-[#003366]/20">
                <svg
                  className="h-1/3 w-1/3 text-white/50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label={`Placeholder image for ${festival.name}`}
                >
                  <path
                    d="M4 21V7a2 2 0 0 1 2-2h3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 3v4h6V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 5h3a2 2 0 0 1 2 2v14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 21h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="14" r="4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            )}
            <div className="absolute bottom-2 right-2">
              <Chip
                size="sm"
                variant="flat"
                className="bg-[#000A14]/90 text-white text-xs"
              >
                {dateRange}
              </Chip>
            </div>
          </div>

          <div className="p-4">
            <p className="text-lg font-semibold text-white hover:text-[#3399FF] line-clamp-1">
              {festival.name}
            </p>
            <p className="text-sm text-white/60 line-clamp-1">
              {festival.city}, {festival.country}
            </p>
          </div>
        </CardBody>
      </Card>
    </a>
  );
}
