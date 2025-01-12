# Shopify Integration

## Overview
The Shopify integration enables seamless synchronization of products, orders, and inventory between the system and Shopify stores. It supports multi-tenant operations, with each client having their own Shopify store and credentials.

## Key Workflows
1. **Product Sync**: Sync products from the system to Shopify, including categories, sizes, and pricing.
2. **Order Processing**: Handle Shopify orders, update inventory, and track sales.
3. **Inventory Management**: Sync inventory levels between the system and Shopify.
4. **Webhook Handling**: Process Shopify webhooks for real-time updates (e.g., new orders, inventory changes).

## Integration Points
- **Shopify REST API**: Used for product and order management.
- **Shopify GraphQL API**: Used for advanced queries and mutations.
- **Shopify Webhooks**: Used for real-time event notifications.

## Authentication
Each client has their own Shopify store and access token, stored in the `ClientShopifyAccess` table.

## Data Model
The following entities are involved in the Shopify integration:
- **ClientShopifyAccess**: Stores Shopify access tokens and configuration for each client.
- **Items**: Links to Shopify products via `shopify_product_id`.

## API Endpoints
- **POST /api/shopify/sync-products**: Syncs products to Shopify.
- **POST /api/shopify/process-order**: Processes Shopify orders.
- **POST /api/shopify/webhook**: Handles Shopify webhooks.

## Error Handling
- **Invalid Tokens**: Retry with a refreshed token.
- **Rate Limits**: Implement exponential backoff.
- **Webhook Failures**: Log errors and retry processing.

## Monitoring
- Track API usage and rate limits.
- Monitor webhook processing success rates.
- Alert on critical failures (e.g., token expiration, rate limit breaches).
