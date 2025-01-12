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
  - Commission calculations
  - Final reconciliation and reporting

## Tech Stack

- Frontend: Svelte
- Backend: FastAPI
- Database: SQLite
- Queue: Redis
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

### /features
- Consignor management
- Event operations
- Administrative functions
- Mobile inventory system
- Financial processing

### /development
- Local environment setup
- Testing strategy
- Deployment guide
- Code standards
- Performance optimization

### /api
- Endpoint specifications
- Webhook handlers
- Error handling
- Rate limiting
- Authentication

### /diagrams
- System architecture
- Data flows
- Process flows
- Integration patterns
- Component relationships

## Getting Started

1. **Prerequisites**
   - Python 3.9+
   - Node.js 16+
   - Redis
   - Shopify Partner Account
   - Clerk.dev Account
   - Mailchimp Transactional Account

2. **Quick Start**
   - See [Development Setup](./development/setup.md)
   - See [Architecture Overview](./architecture/overview.md)
   - See [API Documentation](./api/endpoints.md)

## Integration Points

See [Integration Architecture](./diagrams/architecture/integration-architecture.mmd) for complete integration flow.

- Shopify Custom App
- Clerk.dev Authentication
- Mailchimp Transactional Email
- Redis Queue Processing
