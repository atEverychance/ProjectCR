# Data Model

## Overview
Complete database schema supporting multi-tenant operations with client isolation. See [Complete Data Model](../diagrams/complete-data-model.mmd) for the full entity relationship diagram.

## Core Entities

### Client Management

Clients
- id (PK)
- name
- domain
- created_at
- active

ClientShopifyAccess
- id (PK)
- client_id (FK)
- access_token
- location_id
- tax_collection_id
- token_created_at
- token_expires_at
- active

### Event Management

Events
- id (PK)
- client_id (FK)
- name
- start_date
- end_date
- return_window_end
- regular_fee
- super_fee
- regular_base_rate
- super_base_rate
- volunteer_shift_bonus
- super_item_bonus
- super_item_threshold
- markdown_active
- status
- created_at

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
