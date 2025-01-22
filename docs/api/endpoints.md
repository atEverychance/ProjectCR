# API Endpoints

## Overview
Complete API endpoint documentation including authentication, request/response formats, and error handling. All endpoints are implemented as Cloudflare Workers running at the edge. See [API Architecture](../diagrams/architecture/api-architecture.mmd) for system structure.

## Authentication

### Headers
Required headers:
- Authorization: Bearer {token}
- X-Client-ID: {client_id}
- Content-Type: application/json

### Response Format
TypeScript interface for standard response structure:
```typescript
interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  request_id: string;
}
```

## Consignor Endpoints

### Registration
POST /api/v1/consignors
Request body requires:
- email (string)
- name (string)
- type (regular|super)
- referral_code (string, optional)

GET /api/v1/consignors/{id}
Returns:
- Basic profile
- Participation history
- Current status
- Loyalty information

### Inventory Management
POST /api/v1/inventory
Request body requires:
- title (string)
- category_id (integer)
- size_id (integer)
- price (decimal)
- markdown_eligible (boolean)
- photos (array of strings)

GET /api/v1/inventory/{id}
PUT /api/v1/inventory/{id}
DELETE /api/v1/inventory/{id}

## Event Endpoints

### Event Management
POST /api/v1/events
Request body requires:
- name (string)
- start_date (datetime)
- end_date (datetime)
- location (string)
- regular_fee (decimal)
- super_fee (decimal)

GET /api/v1/events/{id}/stats
Returns:
- Sales metrics
- Participation data
- Financial summary
- Schedule status

### Scheduling
POST /api/v1/events/{id}/volunteer-slots
Request body requires:
- shift_type (string)
- start_time (datetime)
- end_time (datetime)
- capacity (integer)

POST /api/v1/events/{id}/dropoff-slots
Request body requires:
- start_time (datetime)
- end_time (datetime)
- capacity (integer)

## Administrative Endpoints

### Client Management
GET /api/v1/admin/clients
POST /api/v1/admin/clients
PUT /api/v1/admin/clients/{id}

### Payment Processing
GET /api/v1/admin/reports/payments/{event_id}
Query parameters:
- page (integer, default: 1)
- per_page (integer, default: 3, fixed)
Returns:
- PDF file containing 3 payments per page
- Content-Type: application/pdf
Required permissions: ADMIN_REPORTS_WRITE

### Configuration
GET /api/v1/admin/config
PUT /api/v1/admin/config
GET /api/v1/admin/config/categories
PUT /api/v1/admin/config/categories

### Reporting
GET /api/v1/admin/reports/sales
GET /api/v1/admin/reports/consignors
GET /api/v1/admin/reports/inventory

## Durable Objects State Management

### Sale Session Management
- **POST /api/v1/sales/sessions**
  - Creates a new sale session.
  - Request Body:
    ```typescript
    interface CreateSaleSessionRequest {
      event_id: string;
      start_time: string;
      end_time: string;
      commission_rates: {
        base: number;
        volunteer: number;
        super: number;
      };
    }
    ```
  - Response:
    ```typescript
    interface SaleSessionResponse {
      session_id: string;
      status: 'active' | 'completed' | 'cancelled';
      metadata: {
        total_sales: number;
        total_commissions: number;
        item_count: number;
        sold_count: number;
      };
    }
    ```

- **GET /api/v1/sales/sessions/{session_id}**
  - Retrieves current sale session state.
  - Response includes real-time sales data and commission calculations.

- **POST /api/v1/sales/sessions/{session_id}/complete**
  - Completes a sale session and persists final state.
  - Triggers commission calculations and inventory updates.

### Inventory Reconciliation
- **POST /api/v1/inventory/reconciliation**
  - Initiates inventory reconciliation process.
  - Request Body:
    ```typescript
    interface ReconciliationRequest {
      event_id: string;
      sync_type: 'full' | 'incremental';
      options?: {
        force_sync: boolean;
        conflict_resolution: 'most_recent' | 'manual';
      };
    }
    ```
  - Response:
    ```typescript
    interface ReconciliationResponse {
      reconciliation_id: string;
      status: 'in_progress' | 'completed' | 'failed';
      stats: {
        total_items: number;
        synced_items: number;
        conflicts: number;
      };
    }
    ```

- **GET /api/v1/inventory/reconciliation/{reconciliation_id}**
  - Retrieves reconciliation status and results.

### Commission Calculations
- **POST /api/v1/commissions/calculate**
  - Triggers real-time commission calculation.
  - Request Body:
    ```typescript
    interface CalculateCommissionRequest {
      transaction_id: string;
      items: Array<{
        item_id: string;
        price: number;
        consignor_id: string;
      }>;
      volunteer_status?: {
        is_volunteer: boolean;
        hours_worked: number;
      };
    }
    ```
  - Response:
    ```typescript
    interface CommissionCalculationResponse {
      calculation_id: string;
      status: 'completed' | 'error';
      results: {
        base_amount: number;
        bonus_amount: number;
        total_amount: number;
        items: Array<{
          item_id: string;
          commission: number;
        }>;
      };
    }
    ```

- **GET /api/v1/commissions/{calculation_id}**
  - Retrieves commission calculation details.

### Error Handling for Durable Objects
In addition to standard error responses, Durable Objects operations may return:
- 409: Conflict (concurrent modification)
- 412: Precondition Failed (state mismatch)
- 423: Locked (resource temporarily locked)

### Headers for State Management
Response headers for Durable Objects operations:
- X-DO-Version: State version number
- X-DO-Timestamp: Last modification timestamp
- X-DO-Region: Processing region

## Shopify Integration Endpoints

### Sync Products to Shopify
- **POST /api/shopify/sync-products**
  - Syncs products from the system to Shopify.
  - Request Body:
    ```typescript
    interface SyncProductsRequest {
      event_id: string;
      consignor_id: string;
    }
    ```
  - Response:
    ```typescript
    interface SyncProductsResponse {
      success: boolean;
      synced_products: number;
    }
    ```

### Process Shopify Orders
- **POST /api/shopify/process-order**
  - Handles incoming Shopify orders.
  - Request Body:
    ```typescript
    interface ProcessOrderRequest {
      order_id: string;
      items: Array<{
        product_id: string;
        quantity: number;
        price: number;
      }>;
    }
    ```
  - Response:
    ```typescript
    interface ProcessOrderResponse {
      success: boolean;
      order_id: string;
    }
    ```

### Handle Shopify Webhooks
- **POST /api/shopify/webhook**
  - Processes Shopify webhooks for real-time updates.
  - Request Body:
    ```typescript
    interface WebhookRequest {
      topic: string;
      data: {
        order_id: string;
        items: Array<{
          product_id: string;
          quantity: number;
          price: number;
        }>;
      };
    }
    ```
  - Response:
    ```typescript
    interface WebhookResponse {
      success: boolean;
      processed: boolean;
    }
    ```

### Authentication
POST /api/v1/webhooks/clerk/user
POST /api/v1/webhooks/clerk/session

## Error Responses

### Client Errors (4xx)
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error

### Server Errors (5xx)
- 500: Internal Server Error
- 502: Bad Gateway
- 503: Service Unavailable
- 504: Gateway Timeout

## Rate Limiting

### Cloudflare Workers Rate Limiting
Rate limiting is implemented at the edge using Cloudflare Workers:
- 100,000 requests per day per Worker (Free tier)
- Custom rate limits per route configurable in worker code
- Automatic DDoS protection

### Headers
Response headers:
- CF-RateLimit-Limit
- CF-RateLimit-Remaining
- CF-RateLimit-Reset
