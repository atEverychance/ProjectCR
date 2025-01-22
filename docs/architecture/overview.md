# Architecture Overview

## System Design
The Online Consignment Event Platform is built on a multi-tenant architecture supporting multiple client organizations, leveraging Cloudflare's edge computing platform. See [System Architecture](/docs/diagrams/architecture/system-architecture.mmd) for the complete system overview.

## Core Components

### Frontend Application
- React + TypeScript SPA
- Mobile-first design
- Progressive enhancement
- Offline capabilities
- Deployed via Cloudflare Pages
See [Frontend Architecture](/docs/diagrams/architecture/frontend-architecture.mmd) for details.

### Edge Computing Services
- TypeScript-based Cloudflare Workers
- Cloudflare D1 database
- Workers KV for caching
- Cloudflare Queues for background jobs
- Edge function deployment
- Durable Objects for state management:
  * Sale Session management
  * Inventory reconciliation
  * Real-time commission calculations
See [Backend Architecture](/docs/diagrams/architecture/backend-architecture.mmd) and [Durable Objects Architecture](/docs/diagrams/architecture/durable-objects-architecture.mmd) for details.

### External Integrations
- Shopify Custom App (per client)
- Clerk.dev Authentication
- Mailchimp Transactional Email
See [Integration Architecture](/docs/diagrams/architecture/integration-architecture.mmd) for details.

## Registration System

### Account Management
- Separate account registration
- Profile management
- Authentication options:
  * Magic link
  * Social login
- Optional event participation

### Event Participation
- Multiple event participation
- Participation fee handling
- Referral system
- Payment tracking
See [Registration Flow](/docs/diagrams/flows/registration-flow.mmd) for details.

## Data Flow

### User Operations
1. Authentication via Clerk.dev
2. Client context resolution
3. Resource access control
4. Data isolation via D1
5. Registration tracking
6. Participation management
See [Data Flow](/docs/diagrams/flows/data-flow.mmd) for complete flow.

### Background Processing
1. Image processing at the edge
2. Email notifications via Workers
3. Webhook handling
4. Report generation
5. Participation tracking
6. Referral processing
See [Processing Flow](/docs/diagrams/flows/processing-flow.mmd) for details.

## Security Implementation

### Multi-tenant Isolation
- Domain-based client identification
- Request scoping at the edge
- Data partitioning in D1
- Cache isolation via Workers KV

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Resource-level permissions
- Cross-tenant protection
- Edge-based validation

## Performance Considerations

### Edge Caching Strategy
- Workers KV for global caching
- D1 query optimization
- Static asset caching via Pages
- Client-specific cache keys
- Edge Cache for static assets

### Background Processing
- Cloudflare Queues for job processing
- Retry mechanisms
- Error handling
- Worker monitoring
- Dead letter queues

### Mobile Optimization
- Image compression at the edge
- Progressive loading
- Offline support
- Batch operations
- Edge-optimized responses

## Reliability Measures

### Data Integrity
- D1 transaction management
- Strong consistency via Durable Objects:
  * Atomic sale operations
  * Real-time inventory tracking
  * Transactional state management
  * Concurrent access control
- State persistence and recovery
- Audit logging and versioning
- Backup strategy via Wrangler
- Cross-system reconciliation

### Error Handling
- Structured error responses
- Durable Objects error handling:
  * State conflict resolution
  * Atomic operation retries
  * Instance recovery procedures
  * Concurrent access handling
- Circuit breakers and rate limiting
- Fallback options with data consistency
- Edge-based error recovery
- Cross-system reconciliation

## Edge Computing Benefits

### Global Performance
- Automatic edge deployment
- Low-latency responses
- Global data replication
- DDoS protection
- SSL by default

### Cost Optimization
- Pay-per-use pricing
- No infrastructure management
- Automatic scaling
- Free tier benefits
- Built-in monitoring
