# Orchestra

**Who's in the Band?** — A community tool for documenting band members.

Orchestra lets music fans search for any artist and contribute band member information. Submissions are reviewed by admins before being added to the [Knokr](https://knokr.com) database.

## Features

- **Search** — Find any artist in the Knokr database
- **View Members** — See current and past band members
- **Contribute** — Submit new member info (name, role, years active)
- **Auto-linking** — Members are automatically matched to existing artist profiles
- **Rate Limiting** — 10 submissions per hour per IP to prevent abuse

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL via Prisma
- **Hosting:** Railway

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
# Edit .env.local with your DATABASE_URL and NEXT_PUBLIC_CLOUDFRONT_URL

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

## Project Structure

```
knokr-orchestra/
├── app/
│   ├── api/artists/        # API routes
│   ├── artist/[slug]/      # Artist detail page
│   ├── terms/              # Terms of Service
│   ├── privacy/            # Privacy Policy
│   └── page.tsx            # Home (search)
├── components/
│   ├── SearchInput.tsx     # Autocomplete search
│   ├── MemberCard.tsx      # Member display card
│   └── MemberForm.tsx      # Submission form
├── lib/
│   ├── db.ts               # Prisma client
│   ├── image.ts            # CloudFront image URLs
│   ├── rate-limit.ts       # IP-based rate limiting
│   └── validation.ts       # Zod schemas
└── prisma/
    └── schema.prisma       # Database models
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/artists/search?q=` | Search artists by name |
| GET | `/api/artists/[id]` | Get artist with members |
| POST | `/api/artists/[id]/members` | Submit new member |

## Contributing

Contributions are welcome! Please read the terms of service before submitting data.

## License

MIT

---

Built for [Knokr](https://knokr.com) — Discover live music.
