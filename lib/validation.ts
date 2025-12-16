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

// Strip HTML tags and dangerous characters
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>]/g, "") // Remove any remaining angle brackets
    .trim();
}

// Allowed image URL domains
const ALLOWED_IMAGE_DOMAINS = [
  "wikipedia.org",
  "wikimedia.org",
  "imgur.com",
  "i.imgur.com",
  "cloudfront.net",
  "discogs.com",
  "last.fm",
  "spotify.com",
  "scdn.co",
];

// Validate image URL domain
function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_IMAGE_DOMAINS.some(
      (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

// Validate Wikipedia URL
function isValidWikipediaUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith("wikipedia.org");
  } catch {
    return false;
  }
}

export const memberSubmissionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(200)
    .transform(sanitizeText)
    .refine((val) => val.length >= 1, "Name is required"),
  role: z
    .string()
    .min(1, "Role is required")
    .transform(sanitizeText),
  isActive: z.boolean().default(true),
  startYear: z.number().int().min(1900).max(new Date().getFullYear()).nullable().optional(),
  endYear: z.number().int().min(1900).max(new Date().getFullYear()).nullable().optional(),
  imageUrl: z
    .string()
    .url()
    .refine(isValidImageUrl, "Invalid image URL domain")
    .nullable()
    .optional()
    .or(z.literal("")),
  wikipediaUrl: z
    .string()
    .url()
    .refine(isValidWikipediaUrl, "Must be a Wikipedia URL")
    .nullable()
    .optional()
    .or(z.literal("")),
  note: z
    .string()
    .max(500)
    .transform(sanitizeText)
    .nullable()
    .optional(),
  honeypot: z.string().max(0).optional(),
  turnstileToken: z.string().min(1, "CAPTCHA required").optional(),
});

export type MemberSubmission = z.infer<typeof memberSubmissionSchema>;
