# Data Model for Consignor Registration

## Overview
The data model supports the new registration system with:
- Separate account registration
- Optional event participation
- Referral system tracking
- Payment status management

## Tables

### Consignors
- id (PK)
- email (unique)
- name
- phone
- address
- created_at
- updated_at
- account_status

### Events
- id (PK)
- name
- start_date
- end_date
- location
- regular_fee
- super_fee
- created_at
- updated_at

### Participations
- id (PK)
- consignor_id (FK to Consignors)
- event_id (FK to Events)
- type (regular|super)
- referral_code
- payment_status
- participation_status
- created_at
- updated_at

## Relationships
- Consignors 1:n Participations
- Events 1:n Participations

## Indexes
- Unique index on (consignor_id, event_id) in Participations
- Index on email in Consignors
- Index on event_id in Participations

## Registration Flow
1. Account creation creates Consignors record
2. Profile completion updates Consignors record
3. Event participation creates Participations record
4. Payment processing updates Participations record

## Example Queries

### Get Consignor with Participations
```sql
SELECT c.*, p.*
FROM consignors c
LEFT JOIN participations p ON c.id = p.consignor_id
WHERE c.id = ?
```

### Get Active Participations
```sql
SELECT *
FROM participations
WHERE consignor_id = ?
  AND participation_status = 'active'
```

### Get Event Statistics
```sql
SELECT 
  e.name,
  COUNT(p.id) AS total_participants,
  SUM(CASE WHEN p.type = 'super' THEN 1 ELSE 0 END) AS super_participants
FROM events e
LEFT JOIN participations p ON e.id = p.event_id
GROUP BY e.id
```

### Get Conversion Rates
```sql
SELECT
  COUNT(DISTINCT c.id) AS total_accounts,
  COUNT(DISTINCT p.consignor_id) AS participating_accounts
FROM consignors c
LEFT JOIN participations p ON c.id = p.consignor_id
```

### Get Referral Impact
```sql
SELECT
  referral_code,
  COUNT(*) AS total_participations,
  SUM(CASE WHEN type = 'super' THEN 1 ELSE 0 END) AS super_participations
FROM participations
GROUP BY referral_code