# NeuralCopy — AI SaaS Portfolio Project

## Project Overview

**NeuralCopy** is an AI-powered SaaS landing page that demonstrates:
- Live GPT-4o streaming demo (SSE from .NET 10 → Azure OpenAI)
- Modern SaaS landing page with full product thinking
- Next.js 16 App Router + .NET 10 Minimal API monorepo

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | Next.js (App Router) | 16.x |
| Styling | Tailwind CSS | v4 |
| Components | shadcn/ui (Nova preset, Radix) | latest |
| Animations | Framer Motion | 12.x |
| Icons | Lucide React | latest |
| Backend | .NET Minimal API | 10.0 |
| AI | Azure OpenAI (GPT-4o) | via SDK 2.1.0 |
| Streaming | Server-Sent Events (SSE) | — |
| Monorepo | Turborepo + pnpm workspaces | — |

## Project Structure

```
ai-saas/
├── apps/
│   ├── web/                         # Next.js 16 frontend
│   │   ├── app/
│   │   │   ├── globals.css          # Dark theme with violet accent
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx             # Main landing page
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx       # Fixed nav with mobile menu
│   │   │   │   └── Footer.tsx
│   │   │   ├── sections/
│   │   │   │   ├── Hero.tsx         # Hero + AICopyDemo
│   │   │   │   ├── SocialProof.tsx
│   │   │   │   ├── Features.tsx
│   │   │   │   ├── HowItWorks.tsx
│   │   │   │   ├── Testimonials.tsx
│   │   │   │   ├── Pricing.tsx
│   │   │   │   ├── FAQ.tsx
│   │   │   │   └── WaitlistCTA.tsx
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   └── AICopyDemo.tsx       # Core AI streaming widget
│   │   └── lib/
│   │       ├── api.ts               # SSE streaming client
│   │       └── utils.ts             # shadcn cn() utility
│   └── api/                         # .NET 10 Minimal API
│       ├── Endpoints/
│       │   └── CopyEndpoints.cs     # POST /api/copy/stream
│       ├── Services/
│       │   └── AzureOpenAIService.cs
│       ├── Models/
│       │   └── CopyRequest.cs
│       └── Program.cs
├── docs/
│   └── CURRENT_PLAN.md
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Dev Commands

```bash
# Install all dependencies from root
pnpm install

# Run both apps in parallel
pnpm dev

# Frontend only (port 3000)
pnpm --filter web dev

# Backend only (port 5000)
cd apps/api && dotnet run

# Build check
cd apps/web && pnpm build
cd apps/api && dotnet build
```

## Coding Standards

### TypeScript (Frontend)
- Strict mode enabled — no `any`
- Components: PascalCase, one file per component
- Tailwind v4 — use `@apply` sparingly, prefer inline classes
- shadcn/ui for all form elements and structural components
- Framer Motion for all animations (`whileInView` with `once: true`)

### C# (Backend)
- Nullable reference types enabled
- Minimal API pattern — no controllers
- Endpoints in `Endpoints/` static extension classes
- Services injected via constructor DI
- No hardcoded secrets — always `IConfiguration`

## Environment Variables

### Frontend (`apps/web/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (`apps/api/appsettings.Development.json`)
```json
{
  "AzureOpenAI": {
    "Endpoint": "https://<resource>.openai.azure.com/",
    "ApiKey": "<key>",
    "DeploymentName": "gpt-4o"
  }
}
```

## Key Design Decisions

- **Dark theme by default** — modern SaaS aesthetic, violet/purple accent
- **SSE over WebSockets** — simpler for one-way AI token streaming
- **Client-side SSE parsing** — `streamCopy()` in `lib/api.ts` handles SSE chunks with buffer
- **`parseCopy()`** — regex parses structured output (HEADLINE/TAGLINE/FEATURE_N/CTA labels)
- **Framer Motion `whileInView`** — all sections animate on scroll, `once: true` prevents re-trigger

## Custom CSS Utilities

Defined in `globals.css`:
- `.gradient-text` — violet-to-fuchsia gradient text
- `.glow` — large purple box-shadow for primary elements
- `.glow-sm` — small glow for buttons/icons
- `.grid-bg` — subtle dot-grid background pattern
