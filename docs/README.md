# Online Consignment Event Platform Documentation

## Introduction
Complete documentation for a multi-tenant SaaS platform managing children's consignment events, from consignor registration through final reconciliation.

## System Overview
See [System Architecture](./diagrams/architecture/system-architecture.mmd) for complete system design and component interaction.

## Core Features

- **Multi-tenant System**
  - Client-specific Shopify store integration
  - Customizable categories and sizes
  - Isolated data and configuration per client

- **Consignor Management**
  - Mobile-first inventory management
  - Volunteer shift scheduling
  - Drop-off time management
  - Earnings tracking with variable commission rates
  - Referral rewards program

- **Event Operations**
  - Flexible event scheduling
  - Automated sales processing via Shopify
  - Return handling
  - Real-time commission calculations
  - Strong consistency guarantees
  - Final reconciliation and reporting

## Tech Stack

- Frontend: React + TypeScript
- Backend: Cloudflare Workers (TypeScript)
- Database: Cloudflare D1
- Queue: Cloudflare Queues
- State Management: Cloudflare Durable Objects
- Authentication: Clerk.dev
- E-commerce: Shopify
- Email: Mailchimp Transactional

## Documentation Structure

### /architecture
- System design and data models
- Multi-tenant architecture
- Integration specifications
- Security implementation
- Monitoring strategy
- Durable Objects implementation
- State management patterns
- Consistency guarantees

### /features
- Consignor management
- Event operations
- Administrative functions
- Mobile inventory system
- Financial processing
- Real-time sales tracking

### /development
- Local environment setup
- Testing strategy
- Deployment guide
- Code standards
- Performance optimization
- State management guidelines

### /api
- Endpoint specifications
- Webhook handlers
- Error handling
- Rate limiting
- Authentication
- State consistency APIs

### /diagrams
- System architecture
- Data flows
- Process flows
- Integration patterns
- Component relationships
- Durable Objects architecture
- State management flows

## Getting Started

1. **Prerequisites**
   - Node.js 18+
   - Cloudflare account
   - Wrangler CLI
   - Shopify Partner Account
   - Clerk.dev Account
   - Mailchimp Transactional Account

2. **Quick Start**
   - See [Development Setup](./development/setup.md)
   - See [Architecture Overview](./architecture/overview.md)
   - See [API Documentation](./api/endpoints.md)
   - See [Durable Objects Guide](./architecture/durable-objects.md)

## Integration Points

See [Integration Architecture](./diagrams/architecture/integration-architecture.mmd) for complete integration flow.

- Shopify Custom App
- Clerk.dev Authentication
- Mailchimp Transactional Email
- Cloudflare Queues
- Durable Objects State Management
