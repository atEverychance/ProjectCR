# Webhooks

## Overview
Event-driven webhook system for real-time integrations. See [Webhook Architecture](../diagrams/architecture/webhook-architecture.mmd) for system design.

## Event Types

### Profile Events

#### email.updated
Triggered when a consignor's email address is updated.

Payload:
```json
{
  "event": "email.updated",
  "timestamp": "2025-01-21T22:20:56Z",
  "data": {
    "consignor_id": "uuid",
    "old_email": "old@example.com",
    "new_email": "new@example.com",
    "sync_status": "pending|completed|failed",
    "sync_error": "error message if failed"
  }
}
```

#### profile.created
Triggered when a new consignor profile is created.

Payload:
```json
{
  "event": "profile.created",
  "timestamp": "2025-01-21T22:20:56Z",
  "data": {
    "consignor_id": "uuid",
    "email": "example@domain.com",
    "name": "John Doe"
  }
}
```

### Event Registration

#### event.registered
Triggered when a consignor registers for an event.

Payload:
```json
{
  "event": "event.registered",
  "timestamp": "2025-01-21T22:20:56Z",
  "data": {
    "event_id": "uuid",
    "consignor_id": "uuid",
    "type": "regular|super",
    "fee_paid": true
  }
}
```

### Inventory Events

#### item.created
Triggered when a new item is created.

Payload:
```json
{
  "event": "item.created",
  "timestamp": "2025-01-21T22:20:56Z",
  "data": {
    "item_id": "uuid",
    "consignor_id": "uuid",
    "event_id": "uuid",
    "title": "string",
    "price": "decimal"
  }
}
```

#### item.sold
Triggered when an item is sold.

Payload:
```json
{
  "event": "item.sold",
  "timestamp": "2025-01-21T22:20:56Z",
  "data": {
    "item_id": "uuid",
    "sale_price": "decimal",
    "sale_date": "timestamp"
  }
}
```

## Webhook Management

### Registration
Endpoint: `POST /api/v1/webhooks`

Request:
```json
{
  "url": "https://your-domain.com/webhook",
  "events": ["email.updated", "profile.created"],
  "secret": "your-secret-key"
}
```

### Security
- HMAC signature validation
- Secret key management
- IP whitelisting
- Rate limiting

### Delivery
- Retry policy (3 attempts)
- Exponential backoff
- Success acknowledgment
- Failure handling

## Best Practices

### Implementation
1. Verify signatures
2. Process asynchronously
3. Return 200 quickly
4. Handle duplicates
5. Log responses

### Error Handling
1. Monitor failures
2. Track retry status
3. Alert on patterns
4. Maintain audit log

### Performance
1. Quick acknowledgment
2. Async processing
3. Resource management
4. Queue monitoring

## Testing

### Webhook Tester
Endpoint: `POST /api/v1/webhooks/test`

Request:
```json
{
  "event": "email.updated",
  "url": "https://your-domain.com/webhook"
}
```

### Validation
- Signature verification
- Payload format
- Response timing
- Error scenarios

## Monitoring

### Metrics
- Delivery rate
- Response time
- Error rate
- Retry count

### Alerts
- Delivery failures
- Response patterns
- Error thresholds
- System health
