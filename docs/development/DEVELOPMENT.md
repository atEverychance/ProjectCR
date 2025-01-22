# Development Guide

This guide explains how to set up and run the project for development using our Cloudflare-based architecture.

## Prerequisites

1. Node.js 18 or higher
2. npm 9 or higher
3. Cloudflare account
4. Wrangler CLI
5. Git

## Initial Setup

1. **Install Dependencies**

```bash
# Install project dependencies
npm install

# Install Wrangler CLI globally (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

2. **Run Setup Script**

```bash
npm run setup
```

This script will:
- Create D1 database
- Create KV namespace
- Create message queue
- Configure wrangler.toml
- Set up project directories
- Run initial migrations

3. **Configure Environment Variables**

Add your API keys to Wrangler secrets:

```bash
wrangler secret put CLERK_API_KEY
wrangler secret put SHOPIFY_API_KEY
wrangler secret put SHOPIFY_API_SECRET
wrangler secret put EMAIL_API_KEY
```

## Development Workflow

### Running Locally

```bash
# Start development server
npm run dev

# In a separate terminal, run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint

# Formatting
npm run format
```

### Database Operations

```bash
# Create a new migration
wrangler d1 migrations create [migration-name]

# Apply migrations locally
npm run db:migrate:local

# Apply migrations to production
npm run db:migrate
```

### Deployment

```bash
# Deploy to Cloudflare
npm run deploy
```

## Project Structure

```
/
├── src/                    # Source code
│   ├── routes/            # API routes
│   ├── models/            # Data models
│   ├── utils/             # Utilities
│   └── workers/           # Worker implementations
├── migrations/            # Database migrations
├── test/                  # Test files
└── scripts/              # Development scripts
```

## TypeScript Configuration

The project uses strict TypeScript settings:

- Strict mode enabled
- ESNext target
- Module resolution: Node
- Path aliases configured
- Cloudflare Workers types included

## Testing

We use Vitest for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Cloudflare Resources

### D1 Database

- Local development uses SQLite
- Automatic migrations
- Type-safe queries
- Edge-based execution

### Workers KV

- Global key-value storage
- Used for caching and sessions
- Automatic replication
- Edge-based access

### Queues

- Background job processing
- Message persistence
- Dead letter queue
- Retry mechanisms

## Best Practices

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Format with Prettier
- Write JSDoc comments

### Git Workflow

1. Create feature branch
2. Make changes
3. Run tests and linting
4. Create pull request
5. Wait for review
6. Merge to main

### Error Handling

- Use typed error responses
- Implement proper error boundaries
- Log errors appropriately
- Handle edge cases

### Performance

- Use appropriate caching
- Optimize database queries
- Monitor Worker CPU usage
- Implement rate limiting

## Troubleshooting

### Common Issues

1. **Wrangler Authentication**
   ```bash
   wrangler login
   ```

2. **Database Connection**
   ```bash
   wrangler d1 list
   ```

3. **KV Access**
   ```bash
   wrangler kv:namespace list
   ```

4. **Queue Issues**
   ```bash
   wrangler queues list
   ```

### Development Tools

1. **VS Code Extensions**
   - ESLint
   - Prettier
   - TypeScript and JavaScript Language Features
   - Cloudflare Workers

2. **Chrome DevTools**
   - Network tab for API requests
   - Console for Worker logs
   - Sources for debugging

3. **Wrangler CLI**
   - `wrangler dev` for local development
   - `wrangler tail` for logs
   - `wrangler publish` for deployment

## Support

For additional help:
1. Check Cloudflare Workers documentation
2. Review project documentation in `/docs`
3. Submit issues on GitHub
4. Contact the development team