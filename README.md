# Orchestra

**Who's in the Band?** — A community tool for documenting band members.

Orchestra lets music fans search for any artist and contribute band member information. Submissions are reviewed by admins before being added to the [Knokr](https://knokr.com) database.

## Features

- **Search** — Autocomplete artist search with debounced queries
- **View Members** — See current and past band members with social links
- **Related Artists** — Discover connected artists based on shared members, festivals, genres, and geography
- **Festivals** — See upcoming and past festival appearances
- **Random Artist** — Discover new artists with a random button
- **Social Links** — Artist profiles with website, Spotify, Instagram, Facebook, YouTube, TikTok, Apple Music, Bandcamp, and SoundCloud
- **Authentication** — Optional sign-in via Clerk for enhanced features
- **Contribute** — Submit new member info (name, role, years active, image, Wikipedia link)
- **Auto-linking** — Members are automatically matched to existing artist profiles
- **Bot Prevention** — Cloudflare Turnstile CAPTCHA and honeypot fields
- **Rate Limiting** — 10 submissions per hour per IP to prevent abuse

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Styling:** Tailwind CSS 4
- **Components:** HeroUI
- **Animation:** Framer Motion
- **Authentication:** Clerk
- **Database:** PostgreSQL via Prisma
- **Validation:** Zod
- **Security:** Cloudflare Turnstile
- **Hosting:** Railway
- **CDN:** AWS CloudFront

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (shared with knokr-base)

### Installation

```bash
# Clone the repo
git clone https://github.com/jayfallon/knokr-orchestra.git
cd knokr-orchestra

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your environment variables (see below)

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_CLOUDFRONT_URL` | CloudFront URL for artist images |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key |

## Project Structure

```
knokr-orchestra/
├── app/
│   ├── api/artists/
│   │   ├── search/route.ts       # Artist search endpoint
│   │   ├── random/route.ts       # Random artist endpoint
│   │   └── [id]/
│   │       ├── route.ts          # Get artist details
│   │       └── members/route.ts  # Submit member endpoint
│   ├── artist/[slug]/
│   │   ├── page.tsx              # Artist detail page (server)
│   │   └── content.tsx           # Artist detail page (client)
│   ├── terms/page.tsx            # Terms of Service
│   ├── privacy/page.tsx          # Privacy Policy
│   ├── layout.tsx                # Root layout with Clerk
│   ├── providers.tsx             # HeroUI provider wrapper
│   └── page.tsx                  # Home (search + random)
├── components/
│   ├── ArtistCard/               # Unified card for members and related artists
│   ├── FestivalCard.tsx          # Festival display card
│   ├── SearchInput.tsx           # Autocomplete search
│   ├── SuggestBand.tsx           # Random artist suggestion
│   ├── MemberForm.tsx            # Submission form with CAPTCHA
│   └── Footer.tsx                # Footer with links
├── lib/
│   ├── db.ts                     # Prisma client
│   ├── image.ts                  # CloudFront image URLs
│   ├── rate-limit.ts             # IP-based rate limiting
│   ├── turnstile.ts              # Cloudflare Turnstile verification
│   └── validation.ts             # Zod schemas and sanitization
└── prisma/
    └── schema.prisma             # Database models
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/artists/search?q=` | Search artists by name (max 50 results) |
| GET | `/api/artists/random` | Get a random artist |
| GET | `/api/artists/[id]` | Get artist with members, festivals, and related artists |
| POST | `/api/artists/[id]/members` | Submit new member (requires Turnstile token) |

## Contributing

Contributions are welcome! Please read the terms of service before submitting data.

## License

MIT

---

Built for [Knokr](https://knokr.com) — Discover live music.
