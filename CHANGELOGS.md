# Changelogs

## 2026-04-20 — Initial Build

### Added
- Turborepo monorepo with pnpm workspaces (`apps/web`, `apps/api`)
- **Next.js 16** frontend (App Router, TypeScript strict, Tailwind v4, shadcn/ui Nova preset, Framer Motion)
- **Custom dark theme** — violet/purple accent, grid-bg utility, `.gradient-text`, `.glow` utilities
- **Landing page sections**: Navbar, Hero, SocialProof, Features, HowItWorks, Testimonials, Pricing, FAQ, WaitlistCTA, Footer
- **`AICopyDemo` widget** — live SSE streaming demo embedded in hero; parses structured GPT-4o output into headline/tagline/features/CTA
- **`lib/api.ts`** — SSE streaming client with chunk buffering and `[DONE]` signal handling
- **.NET 10 Minimal API** (`apps/api`) with CORS, Azure OpenAI SSE streaming endpoint (`POST /api/copy/stream`)
- `AzureOpenAIService` — streams GPT-4o tokens via `IAsyncEnumerable<string>`
- `CLAUDE.md` — full tech stack reference and coding standards
- `.env.example` — environment variable template

### Fixed (during build verification)
- Replaced `asChild` (Radix pattern) with `render={<a />}` (Base UI pattern) on all Buttons
- Replaced renamed Lucide social icons (`Github`, `Twitter`, `Linkedin`) with available alternatives
- Fixed shadcn Accordion API: `multiple={false}` instead of `type="single" collapsible`
- Updated Tailwind v4 canonical classes (`w-200` instead of `w-[800px]`, `shrink-0` instead of `flex-shrink-0`)
