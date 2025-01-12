# API Endpoints

## Overview
Complete API endpoint documentation including authentication, request/response formats, and error handling. See [API Architecture](../diagrams/api-architecture.mmd) for system structure.

## Authentication

### Headers
Required headers:
- Authorization: Bearer {token}
- X-Client-ID: {client_id}
- Content-Type: application/json

### Response Format
Standard response structure:
- status: success|error
- data: response payload
- error: error details when applicable
- request_id: unique identifier

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

### Configuration
GET /api/v1/admin/config
PUT /api/v1/admin/config
GET /api/v1/admin/config/categories
PUT /api/v1/admin/config/categories

### Reporting
GET /api/v1/admin/reports/sales
GET /api/v1/admin/reports/consignors
GET /api/v1/admin/reports/inventory

## Webhook Endpoints

### Shopify Integration
POST /api/v1/webhooks/shopify/order
- Handles order-related webhooks (create, paid, cancelled)
- Required headers:
  * X-Shopify-Topic: Webhook topic
  * X-Shopify-Hmac-Sha256: Signature verification
- Payload: Shopify order object

POST /api/v1/webhooks/shopify/product  
- Handles product update webhooks
- Required headers:
  * X-Shopify-Topic: Webhook topic
  * X-Shopify-Hmac-Sha256: Signature verification
- Payload: Shopify product object

POST /api/v1/webhooks/shopify/inventory
- Handles inventory level updates
- Required headers:
  * X-Shopify-Topic: Webhook topic
  * X-Shopify-Hmac-Sha256: Signature verification
- Payload: Shopify inventory level object

POST /api/v1/webhooks/shopify/fulfillment
- Handles fulfillment events
- Required headers:
  * X-Shopify-Topic: Webhook topic
  * X-Shopify-Hmac-Sha256: Signature verification
- Payload: Shopify fulfillment object

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

### Limits
Standard limits:
- 100 requests per minute per IP
- 1000 requests per hour per client
- 50 concurrent requests per client

### Headers
Response headers:
- X-RateLimit-Limit
- X-RateLimit-Remaining
- X-RateLimit-Reset
