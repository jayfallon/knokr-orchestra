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
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#ba326b]/20">
      {getArtistImageUrl(member.imageUrl) ? (
        <img
          src={getArtistImageUrl(member.imageUrl)!}
          alt={member.name}
          className="w-16 rounded object-cover"
          style={{ aspectRatio: "1.618 / 1" }}
        />
      ) : (
        <div className="w-16 rounded bg-[#ba326b]/20 flex items-center justify-center text-xl text-[#ba326b]" style={{ aspectRatio: "1.618 / 1" }}>
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
              className="font-medium text-[#4c222a] hover:text-[#ba326b] hover:underline"
            >
              {member.name}
            </a>
          ) : (
            <span className="font-medium text-[#4c222a]">{member.name}</span>
          )}
        </div>
        <p className="text-sm text-[#4c222a]/70 capitalize">
          {member.role}
          {years && <span className="ml-2 text-[#4c222a]/50">({years})</span>}
        </p>
      </div>
    </div>
  );
}
