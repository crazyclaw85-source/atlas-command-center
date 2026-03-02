# Atlas Command Center

Personal command dashboard and trading signal system.

## Architecture

```
atlas-command-center/
├── apps/
│   ├── dashboard/          # Next.js 15 - Personal Command Dashboard
│   └── signals/            # Python/FastAPI - Trading Signal Engine
├── packages/
│   ├── shared-ui/          # Reusable UI components
│   └── types/              # Shared TypeScript definitions
├── infra/
│   └── docker-compose.yml  # Postgres, Redis, API, Dashboard
└── docs/
    └── architecture.md     # System design documentation
```

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local dev)
- Python 3.12+ (for local dev)
- pnpm

### Development

```bash
# Clone and enter repo
git clone https://github.com/crazyclaw85-source/atlas-command-center.git
cd atlas-command-center

# Start infrastructure services
cd infra && docker-compose up -d

# Install dependencies
pnpm install

# Start development
pnpm dev
```

Services will be available at:
- Dashboard: http://localhost:3000
- Signals API: http://localhost:8001
- Postgres: localhost:5432
- Redis: localhost:6379

## Development Workflow

1. Create feature branch from `main`
2. Make atomic commits with descriptive messages
3. Run linting: `pnpm lint`
4. Run type checks: `pnpm type-check`
5. Open PR for review

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, Python 3.12, Pydantic
- **Database**: PostgreSQL 16, Redis 7
- **Monorepo**: Turborepo, pnpm workspaces

## License

MIT
