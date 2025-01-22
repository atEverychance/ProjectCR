# Event Management

## Overview
Comprehensive event setup and management system. See [Event Management Flow](../../diagrams/flows/event-management-flow.mmd) for complete process.

## Event Setup

### Basic Configuration
Required settings:
- Event name
- Date range
- Location details
- Fee structure
- Commission rates

### Schedule Configuration
Time periods:
- Shopping hours
- Markdown period
- Drop-off windows
- Volunteer shifts
- Return processing
See [Schedule Management](../../diagrams/schedule-management.mmd) for details.

### Financial Settings
Configuration:
- Regular consignor rate
- Super consignor rate
- Volunteer bonus rates
- Registration fees
- Markdown rules

## Access Control

### Shopping Access
Management:
- Password distribution
- Access timing
- Shopper groups
- Store visibility

### Consignor Access
Controls:
- Registration period
- Inventory cutoff
- Drop-off scheduling
- Volunteer signup

## Inventory Management

### Item Control
Features:
- Category management
- Price verification
- Photo standards
- Item approval

### Stock Management
Tracking through Inventory Reconciliation DO:
- Active items with real-time status
- Sold items with atomic updates
- Returns processing with state transitions
- Transfers with consistency guarantees

Key features:
- Automatic reconciliation with Shopify every 5 minutes
- Conflict resolution (most recent change wins)
- Item locking during active sales
- State transition management
- Batch operation support

See [Durable Objects Data Model](../../architecture/durable-objects-data-model.md) for implementation details.

## Operational Management

### Event Monitoring
Metrics:
- Sales tracking
- Inventory levels
- Participation rates
- Volunteer coverage

### Schedule Management
Controls:
- Time slot adjustment
- Capacity management
- Override capability
- Emergency changes

## Communication

### Automated Notifications
Messages for:
- Schedule changes
- Important updates
- Access information
- Deadline reminders

### Manual Communications
Options:
- Consignor updates
- Volunteer instructions
- Special announcements
- Emergency notices

## Financial Management

### Fee Collection
Tracking:
- Registration fees
- Fee waivers
- Payment status
- Receipt generation

### Sales Tracking
Monitoring:
- Real-time sales through Sale Session DO
  * Atomic transaction processing
  * Strong consistency guarantees
  * Immediate commission calculations
- Category performance tracking
- Return rates monitoring
- Final reconciliation with D1 persistence

### State Management
Durable Objects provide:
- Atomic sales operations
- Real-time inventory status
- Concurrent access control
- Consistent commission calculations

Implementation details:
- Sale Session DO for active sales
- Inventory Reconciliation DO for stock management
- Commission Calculation DO for real-time earnings
See [Durable Objects Architecture](../../architecture/durable-objects.md) for details.

## Reporting

### Event Statistics
Metrics:
- Total inventory
- Sales volume
- Return rate
- Category breakdown

### Financial Reports
Analysis through Commission Calculation DO:
- Real-time gross sales tracking
- Immediate commission calculations
  * Base commission rates
  * Volunteer bonus processing
  * Super consignor adjustments
- Automated fee collection tracking
- Live net proceeds calculation

Key features:
- Atomic transaction processing
- Real-time commission updates
- Error handling with retry capability
- Persistent state management
- Historical data in D1

See [Durable Objects Implementation Guide](../../architecture/durable-objects-implementation-guide.md) for complete details.

## Administrative Tools

### Event Controls
Features:
- Status management
- Schedule adjustment
- Access control
- Emergency tools

### User Management
Tools:
- Consignor oversight
- Volunteer tracking
- Permission control
- Support tools

## Post-Event Processing

### Reconciliation
Steps:
1. Close store access
2. Process returns
3. Calculate earnings
4. Generate reports
5. Process payments

### Analysis
Review:
- Performance metrics
- Success factors
- Issue resolution
- Improvement areas
