import { z } from "zod";

export const MEMBER_ROLES = [
  "vocals",
  "guitar",
  "bass",
  "drums",
  "keys",
  "synth",
  "dj",
  "producer",
  "other",
] as const;

export const memberSubmissionSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  role: z.string().min(1, "Role is required"),
  isActive: z.boolean().default(true),
  startYear: z.number().int().min(1900).max(new Date().getFullYear()).nullable().optional(),
  endYear: z.number().int().min(1900).max(new Date().getFullYear()).nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  wikipediaUrl: z.string().url().nullable().optional(),
  note: z.string().max(500).nullable().optional(),
  honeypot: z.string().max(0).optional(), // Bot detection - must be empty
});

export type MemberSubmission = z.infer<typeof memberSubmissionSchema>;
