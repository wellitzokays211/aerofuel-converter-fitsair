# Aerofuel Converter

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/wellitzokays211/aerofuel-converter)

A modern, full-stack fuel converter application built with React, Tailwind CSS, shadcn/ui, and Hono on Cloudflare Workers and Pages. This production-ready template features a responsive UI, API routes, error handling, and seamless deployment to Cloudflare's edge network.

## Features

- **React 18** with TypeScript for type-safe frontend development
- **Tailwind CSS** with custom design system (shadcn/ui components)
- **Hono** backend with CORS, logging, and dynamic route loading
- **TanStack Query** for data fetching and caching
- **Cloudflare Workers/Pages** integration for global edge deployment
- **Dark mode** support with `next-themes`
- **Responsive sidebar layout** with mobile support
- **Error reporting** and boundaries
- **Hot reload** in development with Vite
- **Bun** for fast package management and scripting

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide React, Framer Motion, React Router, TanStack Query, Sonner (toasts)
- **Backend**: Hono, Cloudflare Workers, Workers KV/Durable Objects ready
- **Styling**: Tailwind CSS (with animations, gradients, glassmorphism)
- **Utils**: Zod (validation), Zustand (state), Immer (immutability)
- **Dev Tools**: Bun, ESLint, TypeScript, Wrangler

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) v1.0+ (recommended package manager)
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-update/) (for deployment)
- Node.js-compatible environment (Bun preferred)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

### Development

Start the development server with hot reload:

```bash
bun run dev
```

- Frontend: `http://localhost:3000`
- API: `http://localhost:3000/api/health` (test endpoint)

Type generation for Workers bindings:

```bash
bun run cf-typegen
```

Linting:

```bash
bun run lint
```

### Build

Build for production:

```bash
bun run build
```

Output is in `dist/` for Pages deployment.

### Deployment

Deploy to Cloudflare Workers/Pages with one command:

```bash
bun run deploy
```

This builds the app and runs `wrangler deploy`.

For custom deployments:

1. Configure `wrangler.jsonc` with your Cloudflare account ID
2. Set secrets: `wrangler secret put YOUR_SECRET`
3. Deploy: `wrangler deploy`

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/wellitzokays211/aerofuel-converter)

**Pro Tip**: Bind Workers KV or Durable Objects in `wrangler.jsonc` under `kv_namespaces` or `durable_objects`.

## Usage

### Frontend

- Replace `src/pages/HomePage.tsx` with your app content
- Use `AppLayout` for sidebar layouts: `<AppLayout><YourContent /></AppLayout>`
- API calls: Use TanStack Query with `/api/*` endpoints
- Theme toggle: Available via `useTheme` hook

Example API route in `worker/userRoutes.ts`:

```typescript
app.post('/api/convert', async (c) => {
  const { fuelType, amount } = await c.req.json();
  // Conversion logic
  return c.json({ result: amount * 0.85 });
});
```

### Backend

- Add routes in `worker/userRoutes.ts` (do not modify `worker/index.ts`)
- Access `env.ASSETS` for static assets
- Extend `Env` interface in `worker/core-utils.ts`

## Project Structure

```
├── src/              # React app (Vite)
│   ├── components/   # UI components (shadcn/ui + custom)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utilities (utils.ts, errorReporter.ts)
│   └── pages/        # Route components
├── worker/           # Cloudflare Worker (Hono)
│   ├── index.ts      # Core router (DO NOT MODIFY)
│   └── userRoutes.ts # Your API routes
├── public/           # Static assets
├── dist/             # Build output
├── package.json      # Dependencies (Bun)
└── wrangler.jsonc    # Cloudflare config
```

## Environment Variables

Set via Wrangler dashboard or CLI:

```
API_KEY=your_key
DATABASE_URL=your_db
```

Access in Worker: `c.env.API_KEY`

## Contributing

1. Fork and clone
2. `bun install`
3. `bun run dev`
4. Submit PR to `main`

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [shadcn/ui](https://ui.shadcn.com/)
- Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/YOUR_REPO/issues)

Built with ❤️ for the Cloudflare ecosystem.