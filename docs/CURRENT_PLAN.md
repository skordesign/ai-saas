# CURRENT PLAN — AI-Powered SaaS Landing Page Portfolio

**Status:** PENDING USER APPROVAL  
**Created:** 2026-04-20

---

## Problem Statement

Build a portfolio project that demonstrates:
- Product thinking (real SaaS concept, not a toy demo)
- Modern frontend skills (Next.js 15, animations, polished UI)
- AI integration depth (streaming LLM, not just static text)
- Full-stack capability (.NET 10 backend, proper API design)

---

## Product Concept: **Polarizelab**

> "Turn your idea into high-converting landing page copy in seconds."

**Why this concept?**
- Meta and memorable: a landing page *about* a landing page copy tool
- Has a clear value proposition hiring managers immediately understand
- The AI demo IS the product — visitors experience the value live
- Business model is obvious: freemium SaaS

### Core AI Feature — Live Copy Generator
The hero section contains an interactive demo: user types their product name and a 1-line description, then watches AI stream a complete marketing package (headline, tagline, feature bullets, CTA) in real-time via SSE. This is ChatGPT-level UX on a landing page.

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | Next.js 15 App Router | Latest, most in-demand |
| Styling | Tailwind CSS v4 | Modern utility-first |
| Components | shadcn/ui | Production-grade, customizable |
| Animations | Framer Motion | Industry standard for SaaS |
| Backend | .NET 10 Minimal API | Fast, modern C#, hot in enterprise |
| LLM | Azure OpenAI (GPT-4o) | Required by spec |
| Streaming | Server-Sent Events (SSE) | Lighter than WebSockets for one-way AI streams |
| Monorepo | Turborepo | Industry standard, enables parallel builds |
| Package Manager | pnpm | Faster, disk-efficient |

---

## Landing Page Sections (Product Thinking)

1. **Navbar** — Logo + nav links + "Get Early Access" CTA button
2. **Hero** — Headline, sub-headline, LIVE AI DEMO embedded (the killer feature)
3. **Social Proof Bar** — "Trusted by X companies", logo strip
4. **Features** — 3-column grid with animated icons (Speed, Quality, Customization)
5. **How It Works** — 3-step process with scroll-triggered animations
6. **Testimonials** — 3 cards with avatar, quote, role
7. **Pricing** — 3 tiers (Free, Pro $29/mo, Team $99/mo) with feature comparison
8. **FAQ** — Accordion with common questions
9. **Final CTA + Waitlist** — Email capture form
10. **Footer** — Links, social, legal

---

## Project Structure

```
ai-saas/
├── apps/
│   ├── web/                    # Next.js 15 frontend
│   │   ├── src/
│   │   │   ├── app/            # App Router pages
│   │   │   ├── components/
│   │   │   │   ├── sections/   # Hero, Features, Pricing, etc.
│   │   │   │   └── ui/         # shadcn components
│   │   │   ├── lib/            # Utilities, API client
│   │   │   └── types/          # TypeScript types
│   │   ├── public/
│   │   └── package.json
│   └── api/                    # .NET 10 Minimal API
│       ├── Endpoints/          # Route handlers
│       ├── Services/           # AzureOpenAI service
│       ├── Models/             # Request/response models
│       ├── Program.cs
│       └── appsettings.json
├── docs/
│   └── CURRENT_PLAN.md
├── turbo.json
├── package.json                # Root (pnpm workspaces)
└── .env.example
```

---

## Key Files to Create

### Frontend (Next.js)
- `apps/web/src/app/page.tsx` — Main landing page
- `apps/web/src/app/layout.tsx` — Root layout
- `apps/web/src/components/sections/Hero.tsx` — Hero + AI demo widget
- `apps/web/src/components/sections/Features.tsx`
- `apps/web/src/components/sections/HowItWorks.tsx`
- `apps/web/src/components/sections/Testimonials.tsx`
- `apps/web/src/components/sections/Pricing.tsx`
- `apps/web/src/components/sections/FAQ.tsx`
- `apps/web/src/components/sections/WaitlistCTA.tsx`
- `apps/web/src/components/ui/Navbar.tsx`
- `apps/web/src/components/ui/Footer.tsx`
- `apps/web/src/components/AICopyDemo.tsx` — The live streaming AI demo
- `apps/web/src/lib/api.ts` — Fetch wrapper for .NET API

### Backend (.NET 10)
- `apps/api/Program.cs` — Minimal API setup + CORS
- `apps/api/Endpoints/CopyEndpoints.cs` — SSE streaming endpoint
- `apps/api/Services/AzureOpenAIService.cs` — Azure OpenAI client
- `apps/api/Models/CopyRequest.cs` — Request model

---

## API Design

### POST `/api/copy/stream`
- **Request:** `{ productName: string, description: string }`
- **Response:** `text/event-stream` (SSE)
- **Behavior:** Streams GPT-4o tokens as they arrive from Azure OpenAI
- **Prompt:** Generates headline + tagline + 3 feature bullets + CTA for the given product

---

## Environment Variables

```env
# .env.local (Next.js)
NEXT_PUBLIC_API_URL=http://localhost:5000

# appsettings.Development.json (.NET)
AzureOpenAI__Endpoint=https://<resource>.openai.azure.com/
AzureOpenAI__ApiKey=<key>
AzureOpenAI__DeploymentName=gpt-4o
```

---

## Coding Standards

- TypeScript strict mode, no `any`
- ESLint + Prettier enforced
- .NET C# nullable reference types enabled
- No hardcoded secrets — all via environment variables
- SSE error handling with proper `data: [DONE]` signals
- Responsive design (mobile-first)

---

## Test Strategy

- No test directory exists yet — will skip automated tests for portfolio project
- Manual verification: run dev servers, test AI streaming demo end-to-end

---

## Build Commands

```bash
# Install all deps
pnpm install

# Dev (both apps in parallel via Turborepo)
pnpm dev

# Frontend only
pnpm --filter web dev

# Backend only
cd apps/api && dotnet run
```

---

## Completion Status

- [x] Phase 1: Plan approved — 2026-04-20
- [x] Phase 2: Development complete — 2026-04-20
- [x] Phase 3: Build/lint verified — 2026-04-20 (Next.js ✅ · .NET ✅)
- [x] Phase 4: Summary written — 2026-04-20
