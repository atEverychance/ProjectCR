# Consignment Retail Platform

A modern consignment retail management system built with TypeScript and Cloudflare's edge computing platform.

## Architecture Overview

- **Frontend**: React + TypeScript, hosted on Cloudflare Pages
- **Backend**: TypeScript-based Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite at the edge)
- **Caching**: Workers KV
- **Background Jobs**: Cloudflare Queues
- **Authentication**: Clerk.dev
- **E-commerce**: Shopify Integration

## Key Features

- Event management and scheduling
- Consignor registration and inventory management
- Appointment scheduling
- Sales tracking and reporting
- Commission calculation
- Email notifications

## Technology Stack

### Edge Computing
- Cloudflare Workers (TypeScript)
- D1 Database
- Workers KV
- Cloudflare Queues

### Development
- TypeScript
- React
- Hono (API framework)
- Zod (validation)
- Vitest (testing)

### Tools
- Wrangler CLI
- TypeScript compiler
- ESLint + Prettier
- GitHub Actions

## Getting Started

1. **Prerequisites**
   - Node.js 18+
   - Cloudflare account
   - Wrangler CLI
   ```bash
   npm install -g wrangler
   ```

2. **Setup**
   ```bash
   # Clone repository
   git clone [repository-url]
   cd ProjectCR

   # Install dependencies
   npm install

   # Login to Cloudflare
   wrangler login
   ```

3. **Local Development**
   ```bash
   # Start development server
   npm run dev
   ```

4. **Deployment**
   ```bash
   # Deploy to Cloudflare
   npm run deploy
   ```

## Documentation

- [Deployment Architecture](docs/architecture/deployment.md)
- [Development Setup](docs/development/setup.md)
- [Data Model](docs/architecture/data-model.md)
- [Integration Guide](docs/architecture/integration.md)

## Benefits of Our Architecture

### Performance
- Global edge network
- Zero-latency database access
- Automatic caching
- Optimized asset delivery

### Development
- Full TypeScript support
- Type-safe database queries
- Integrated development environment
- Local development tools

### Operations
- Zero server management
- Automatic scaling
- Built-in security
- Simplified deployment

### Cost
- Free tier for low usage
- Pay-per-use pricing
- No infrastructure costs
- Automatic cost optimization

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[License Type] - See LICENSE file for details

## Support

For support, please check:
1. Documentation in `/docs`
2. Issue tracker
3. Discussion forums

## Project Status

Current Version: 1.0.0
Status: Development

## Acknowledgments

- Cloudflare for edge computing platform
- Clerk.dev for authentication
- Shopify for e-commerce integration
