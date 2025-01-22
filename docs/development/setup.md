# Development Setup Guide

## Prerequisites

1. Node.js 18+ and npm
2. Cloudflare account
3. Wrangler CLI (`npm install -g wrangler`)
4. Git
5. GitHub account
6. VS Code (recommended)

## Initial Setup

### 1. Cloudflare Configuration

```bash
# Login to Cloudflare
wrangler login

# Create D1 database
wrangler d1 create consignment-retail
# Note the database_id from output

# Create KV namespace
wrangler kv:namespace create CACHE
# Note the id from output

# Create Queue
wrangler queues create jobs-queue
```

### 2. Environment Setup

Create necessary secrets in Cloudflare:

```bash
wrangler secret put CLERK_API_KEY
wrangler secret put SHOPIFY_API_KEY
wrangler secret put SHOPIFY_API_SECRET
wrangler secret put EMAIL_API_KEY
```

### 3. Local Development

```bash
# Clone repository
git clone [repository-url]
cd ProjectCR

# Install dependencies
npm install

# Start local development
npm run dev
```

## Development Workflow

### Database Management

```bash
# Create new migration
wrangler d1 migrations create [migration-name]

# Apply migrations locally
wrangler d1 migrations apply --local

# Apply migrations to production
wrangler d1 migrations apply
```

### Local Testing

```bash
# Run tests
npm test

# Run type checking
npm run typecheck
```

### Deployment

```bash
# Deploy to production
npm run deploy
```

## Project Structure

```
/
├── src/                    # TypeScript source code
│   ├── routes/            # API route handlers
│   ├── models/            # Data models and types
│   └── workers/           # Worker implementations
├── migrations/            # D1 database migrations
├── public/               # Static assets
└── tests/                # Test files
```

## TypeScript Configuration

The project uses strict TypeScript configuration for maximum type safety. Key settings:

- Strict mode enabled
- ESNext target
- Module resolution: Node
- Cloudflare Workers types included

## Development Tools

### VS Code Extensions

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Cloudflare Workers
- Mermaid Preview (for architecture diagrams)

### Code Quality

- ESLint for linting
- Prettier for formatting
- TypeScript for type checking
- Vitest for testing

## Local Development Features

### Hot Reload

The development server supports hot reloading for:
- Worker changes
- Frontend changes
- Database schema changes

### Local Database

D1 provides a local SQLite database for development that mirrors the production environment.

### Local KV Storage

Wrangler emulates Workers KV locally for development.

## Debugging

### Worker Debugging

1. Use `console.log()` in development
2. Check Worker logs in Cloudflare dashboard
3. Use `wrangler tail` for real-time logs

### Database Debugging

1. Use D1 local dashboard
2. Execute queries via Wrangler CLI
3. Monitor query performance in Cloudflare dashboard

## Common Issues

### CORS in Development

Add local origins to `wrangler.toml`:

```toml
[env.development]
cors = ["http://localhost:3000"]
```

### Type Errors

Ensure types are properly imported:

```typescript
import type { Env } from '../types';
```

### D1 Connection Issues

Check database binding in `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "consignment-retail"
database_id = "your-database-id"
```

## Best Practices

1. **Type Safety**
   - Use TypeScript strict mode
   - Define interfaces for all data structures
   - Avoid `any` types

2. **Error Handling**
   - Use typed error responses
   - Implement proper error boundaries
   - Log errors appropriately

3. **Testing**
   - Write unit tests for Workers
   - Test database migrations
   - Validate types during testing

4. **Security**
   - Use environment variables for secrets
   - Implement proper authentication
   - Validate all inputs

5. **Performance**
   - Use appropriate caching strategies
   - Optimize database queries
   - Monitor Worker CPU usage
