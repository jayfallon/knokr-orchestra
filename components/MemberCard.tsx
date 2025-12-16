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

  return (
    <div className="flex items-center gap-4 p-4 bg-[#fdf5d4]/10 rounded-xl border border-[#fdf5d4]/20">
      {getArtistImageUrl(member.imageUrl) ? (
        <img
          src={getArtistImageUrl(member.imageUrl)!}
          alt={member.name}
          className="w-16 rounded object-cover"
          style={{ aspectRatio: "1.618 / 1" }}
        />
      ) : (
        <div className="w-16 rounded bg-[#fdf5d4]/20 flex items-center justify-center text-xl text-[#fdf5d4]/60" style={{ aspectRatio: "1.618 / 1" }}>
          {member.name[0]}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {member.wikipediaUrl ? (
            <a
              href={member.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#fdf5d4] hover:underline"
            >
              {member.name}
            </a>
          ) : (
            <span className="font-medium text-[#fdf5d4]">{member.name}</span>
          )}
        </div>
        <p className="text-sm text-[#fdf5d4]/70 capitalize">
          {member.role}
          {years && <span className="ml-2 text-[#fdf5d4]/50">({years})</span>}
        </p>
      </div>
    </div>
  );
}
