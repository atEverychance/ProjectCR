# Architecture Overview

## System Design
The Online Consignment Event Platform is built on a multi-tenant architecture supporting multiple client organizations. See [System Architecture](/docs/diagrams/architecture/system-architecture.mmd) for the complete system overview.

## Core Components

### Frontend Application
- Svelte-based SPA
- Mobile-first design
- Progressive enhancement
- Offline capabilities
See [Frontend Architecture](/docs/diagrams/architecture/frontend-architecture.mmd) for details.

### Backend Services
- FastAPI application server
- SQLite database
- Redis queue system
- Background workers
See [Backend Architecture](/docs/diagrams/architecture/backend-architecture.mmd) for details.

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
See [Registration Flow](/docs/diagrams/registration-flow.mmd) for details.

## Data Flow

### User Operations
1. Authentication via Clerk.dev
2. Client context resolution
3. Resource access control
4. Data isolation
5. Registration tracking
6. Participation management
See [Data Flow](/docs/diagrams/flows/data-flow.mmd) for complete flow.

### Background Processing
1. Image processing
2. Email notifications
3. Webhook handling
4. Report generation
5. Participation tracking
6. Referral processing
See [Processing Flow](/docs/diagrams/flows/processing-flow.mmd) for details.

## Security Implementation

### Multi-tenant Isolation
- Domain-based client identification
- Request scoping
- Data partitioning
- Cache isolation

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Resource-level permissions
- Cross-tenant protection

## Performance Considerations

### Caching Strategy
- Redis for application cache
- Query result caching
- Static asset caching
- Client-specific cache keys

### Background Processing
- Queue-based job processing
- Retry mechanisms
- Error handling
- Monitoring

### Mobile Optimization
- Image compression
- Progressive loading
- Offline support
- Batch operations

## Reliability Measures

### Data Integrity
- Transaction management
- Consistent state handling
- Audit logging
- Backup strategy

### Error Handling
- Structured error responses
- Retry mechanisms
- Circuit breakers
- Fallback options
