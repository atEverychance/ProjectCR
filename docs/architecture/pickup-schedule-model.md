# Pickup Schedule Data Model

## Overview
The pickup schedule system enables shoppers to book time slots for picking up their purchased items. Key features:
- Multiple pickup slots per event
- Capacity limits per slot
- Maximum 3 bookings per shopper per event
- Automated email notifications
- Integration with shopper invoices

## Tables

### PickupSlots
- id (PK)
- event_id (FK to Events)
- start_time (datetime)
- end_time (datetime)
- capacity (integer)
- remaining_spots (integer)
- created_at
- updated_at

### ShopperPickups
- id (PK)
- event_id (FK to Events)
- shopper_email (string)
- pickup_slot_id (FK to PickupSlots)
- invoice_number (string)
- status (enum: scheduled|cancelled|completed)
- created_at
- updated_at
- cancelled_at (nullable)
- reminder_sent_at (nullable)

## Relationships
- Events 1:n PickupSlots
- PickupSlots 1:n ShopperPickups
- Events 1:n ShopperPickups

## Constraints
- Maximum 3 pickup slots per shopper per event
- Unique index on (shopper_email, pickup_slot_id) to prevent duplicate bookings
- Check constraint on remaining_spots >= 0

## Data Integrity Rules

### Booking Process
1. Verify shopper hasn't exceeded 3 slots per event
2. Verify slot has remaining capacity
3. Create ShopperPickups record
4. Decrement remaining_spots in PickupSlots
5. Trigger confirmation email

### Cancellation Process
1. Update status to 'cancelled'
2. Set cancelled_at timestamp
3. Increment remaining_spots in PickupSlots
4. Trigger cancellation email

### Completion Process
1. Update status to 'completed'
2. Record completion timestamp
3. Update reporting metrics

## Email Notifications

### Types
1. Booking Confirmation
   - Slot details
   - Invoice reference
   - Cancellation instructions

2. Cancellation Confirmation
   - Cancelled slot details
   - Rebooking instructions

3. Reminder (24h before)
   - Slot details
   - Invoice reference
   - Location information
   - Special instructions

## Indexes
- Primary keys on all id fields
- Foreign key indexes on event_id and pickup_slot_id
- Index on shopper_email for quick lookup
- Index on status for filtering
- Index on start_time for date range queries
- Compound index on (event_id, status, start_time) for slot availability checks