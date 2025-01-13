# Data Model

## Overview
Complete database schema supporting multi-tenant operations with client isolation. See [Complete Data Model](../diagrams/complete-data-model.mmd) for the full entity relationship diagram.

## Quick Reference
| Entity               | Key Fields                          | Relationships                     |
|----------------------|-------------------------------------|-----------------------------------|
| Clients              | id, name, domain                   | ClientShopifyAccess, Events       |
| ClientShopifyAccess  | client_id, access_token            | Clients                           |
| Events               | id, client_id, name                | EventLocations, EventConsignors   |
| Consignors           | id, client_id, consignor_id        | EventConsignors, Items            |
| Items                | id, event_consignor_id, status     | Sales, Categories, Sizes          |
| Categories           | id, category_detail                | Items, CategoryOverrides          |
| Sizes                | id, size_value                     | Items, SizeOverrides              |
| Sales                | id, item_id, shopify_order_id      | Items                             |

## Field Type Reference
| Field Type           | Description                        | Example                           |
|----------------------|------------------------------------|-----------------------------------|
| PK                   | Primary Key (UUID)                 | "550e8400-e29b-41d4-a716-446655440000" |
| FK                   | Foreign Key (UUID)                 | "550e8400-e29b-41d4-a716-446655440001" |
| String               | Text field                         | "Summer Sale 2025"                |
| DateTime             | ISO 8601 timestamp                 | "2025-01-12T14:30:00Z"            |
| Boolean              | True/False value                   | true                              |
| Integer              | Whole number                       | 42                                |
| Decimal              | Fixed precision number             | 19.99                             |

## Core Entities

### Client Management

Clients
- id (PK, UUID) - Unique client identifier
- name (String) - Client organization name
- domain (String) - Client's primary domain (unique)
- created_at (DateTime) - Record creation timestamp
- active (Boolean) - Client account status

ClientShopifyAccess
- id (PK, UUID) - Unique access record identifier
- client_id (FK, UUID) - Reference to Clients.id
- access_token (String) - Shopify API access token (encrypted)
- location_id (String) - Shopify location ID
- tax_collection_id (String) - Shopify tax collection ID
- token_created_at (DateTime) - Token creation timestamp
- token_expires_at (DateTime) - Token expiration timestamp
- active (Boolean) - Access status

### Event Management

Events
- id (PK, UUID) - Unique event identifier
- client_id (FK, UUID) - Reference to Clients.id
- name (String) - Event name
- start_date (DateTime) - Event start date/time
- end_date (DateTime) - Event end date/time
- return_window_end (DateTime) - Last date for returns
- regular_fee (Decimal) - Regular consignor fee
- super_fee (Decimal) - Super consignor fee
- regular_base_rate (Decimal) - Regular consignor commission rate
- super_base_rate (Decimal) - Super consignor commission rate
- volunteer_shift_bonus (Decimal) - Bonus per volunteer shift
- super_item_bonus (Decimal) - Bonus per super item
- super_item_threshold (Integer) - Minimum items for super status
- markdown_active (Boolean) - Markdown pricing enabled
- status (String) - Event status (planned/active/closed)
- created_at (DateTime) - Record creation timestamp

EventLocations
- id (PK)
- event_id (FK)
- name
- address
- city
- postal_code
- province
- directions
- created_at

[Continue with the rest of the content in the same format...]
### Consignment Management

Consignors
- id (PK)
- client_id (FK)
- consignor_id (human readable)
- email
- name
- loyalty_count
- created_at
- active

EventConsignors
- id (PK)
- event_id (FK)
- consignor_id (FK)
- type (regular/super)
- base_rate
- fee_paid
- fee_paid_at
- volunteer_shift_count
- final_rate
- total_earnings
- is_paid
- paid_at
- created_at

Items
- id (PK)
- event_consignor_id (FK)
- category_id (FK)
- size_id (FK)
- shopify_product_id
- title
- price
- markdown_eligible
- status
- sold_at
- sold_price
- earned_amount
- transfer_count
- transferred_from_item_id (FK)
- created_at

### Configuration Management

Categories
- id (PK)
- category_detail
- category_type_id (FK)
- enabled
- is_default
- created_at

CategoryOverrides
- id (PK)
- client_id (FK)
- category_id (FK)
- category_detail
- enabled
- created_at

Sizes
- id (PK)
- size_value
- size_group
- enabled
- is_default
- created_at

SizeOverrides
- id (PK)
- client_id (FK)
- size_id (FK)
- size_value
- enabled
- created_at

### Scheduling

EventDropOffSlots
- id (PK)
- event_id (FK)
- location_id (FK)
- start_time
- end_time
- max_consignors
- booked_count
- created_at

EventVolunteerSlots
- id (PK)
- event_id (FK)
- location_id (FK)
- shift_type_id (FK)
- start_time
- end_time
- max_volunteers
- booked_count
- created_at

DropOffBookings
- id (PK)
- event_consignor_id (FK)
- drop_off_slot_id (FK)
- created_at

VolunteerBookings
- id (PK)
- event_consignor_id (FK)
- volunteer_slot_id (FK)
- completed
- created_at

### Sales & Reconciliation

Sales
- id (PK)
- item_id (FK)
- shopify_order_id
- sale_price
- sale_date
- is_returned
- created_at

Referrals
- id (PK)
- event_id (FK)
- referring_consignor_id (FK)
- new_consignor_id (FK)
- reward_amount
- is_paid
- created_at
- paid_at

## Relationships
See [Entity Relationships](../diagrams/entity-relationships.mmd) for complete relationship diagram.

## Indexes
- client_id on all relevant tables
- shopify_product_id for quick lookups
- consignor_id for human-readable searches
- event dates for range queries
- status fields for filtered queries

## Constraints
- Foreign key relationships
- Unique constraints on business keys
- Check constraints on status fields
- Validation rules on numerical fields

## Audit Trail
See [Audit Schema](../diagrams/audit-schema.mmd) for complete audit structure.
