# Shopify Integration

## Overview
The Shopify integration enables seamless synchronization of products, orders, and inventory between the system and Shopify stores. Each client has their own Shopify store with isolated credentials and data.

Key features:
- Real-time product synchronization
- Order processing and inventory updates
- Webhook handling for Shopify events
- Multi-tenant isolation with per-client stores

## Store Configuration

### Custom App Setup
Required configuration:
- App name: "{Client Name} Consignment"
- App type: Custom app
- API version: 2024-01
- Access scopes:
  * read_products, write_products
  * read_orders, write_orders
  * read_inventory, write_inventory
  * read_price_rules, write_price_rules
  * read_locations

### Store Settings
Required settings:
- Local pickup only
- Password protection enabled
- Customer accounts disabled
- Ontario tax rules configured
- Inventory tracking enabled

### Product Configuration
Required metafields:
- consignor_id (string)
- event_id (string)
- markdown_eligible (boolean)

## Integration Points

### Product Management
Creation flow:
- Local item creation
- Photo processing
- Shopify product creation
- Inventory synchronization
See [Product Flow](../../diagrams/shopify-product-flow.mmd) for details.

### Order Processing
Order flow:
- Webhook reception
- Order validation
- Inventory update
- Commission calculation
See [Order Flow](../../diagrams/shopify-order-flow.mmd) for details.

### Inventory Sync
Sync points:
- Initial creation
- Status updates
- Price changes
- Stock levels

## Webhook Management

### Critical Webhooks
Required webhooks:
- orders/create: Triggered when new orders are created
- orders/paid: Triggered when orders are paid
- orders/cancelled: Triggered when orders are cancelled
- products/update: Triggered when products are updated
- inventory_levels/update: Triggered when inventory levels change

### Webhook Processing Flow
1. Webhook received at API endpoint
2. Signature verification using Shopify HMAC
3. Immediate 200 response to Shopify
4. Message enqueued for background processing
5. Background worker processes payload:
   - Updates inventory
   - Syncs order data
   - Triggers notifications

### Reliability Strategy
- Immediate acknowledgment with 200 response
- Queue-based processing with retries
- Dead-letter queue for failed messages
- Manual recovery tools in admin dashboard
- Webhook delivery monitoring

### Error Handling
- Automatic retries with exponential backoff
- Detailed error logging with context
- Real-time alerts for critical failures
- Manual intervention tools for recovery
- Webhook replay capability

## Safety Nets

### Order Verification
Verification process:
- Periodic order sync
- Missing order detection
- Duplicate prevention
- Manual reconciliation

### Inventory Verification
Check points:
- Regular stock audit
- Price verification
- Status consistency
- Data integrity

### Error Recovery
Recovery tools:
- Order recovery
- Product sync
- Inventory correction
- Manual override

## Performance

### Rate Limiting
API limits:
- REST API: 2 requests/second
- GraphQL: 50 points/second
- Burst handling
- Queue management

### Optimization
Performance strategies:
- Batch operations
- Cached responses
- Efficient queries
- Resource pooling

### Monitoring
Tracking points:
- API response times
- Webhook delivery
- Processing rates
- Error frequency

## Security

### Authentication
Security measures:
- Access token management
- Webhook verification
- IP restrictions
- SSL enforcement

### Data Protection
Protection methods:
- Secure transmission
- Token encryption
- Data validation
- Access control

### Audit Trail
Tracked events:
- API calls
- Webhook receipts
- Data modifications
- Error occurrences
