# Drop-off Schedule Data Model

## Overview
The drop-off scheduling system manages consignor item drop-off times. Key features:
- 15-minute interval slots
- Location-specific capacity limits
- Flexible modification options
- Automated email notifications
- Processing status tracking

## Tables

### DropOffSlots
- id (PK)
- event_id (FK to Events)
- start_time (datetime)
- end_time (datetime)
- location_zone (string)
- capacity (integer)
- remaining_spots (integer)
- created_at
- updated_at

### ConsignorDropOffs
- id (PK)
- event_id (FK to Events)
- consignor_id (FK to Consignors)
- slot_id (FK to DropOffSlots)
- status (enum: scheduled|cancelled|completed|no_show)
- arrival_time (datetime, nullable)
- completion_time (datetime, nullable)
- estimated_item_count (integer)
- actual_item_count (integer, nullable)
- processing_notes (text, nullable)
- created_at
- updated_at
- cancelled_at (nullable)
- reminder_sent_at (nullable)

## Relationships
- Events 1:n DropOffSlots
- DropOffSlots 1:n ConsignorDropOffs
- Consignors 1:n ConsignorDropOffs
- Events 1:n ConsignorDropOffs

## Constraints
- One active drop-off slot per consignor per event
- Unique index on (consignor_id, slot_id) to prevent duplicate bookings
- Check constraint on remaining_spots >= 0
- Slots must be 15 minutes in duration (end_time - start_time = 15 minutes)

## Data Integrity Rules

### Booking Process
1. Verify consignor doesn't have another active slot
2. Verify slot has remaining capacity
3. Create ConsignorDropOffs record
4. Decrement remaining_spots in DropOffSlots
5. Trigger confirmation email

### Cancellation Process
1. Update status to 'cancelled'
2. Set cancelled_at timestamp
3. Increment remaining_spots in DropOffSlots
4. Trigger cancellation email
5. Allow rebooking if within event timeline

### Processing Flow
1. Record arrival_time when consignor checks in
2. Update actual_item_count during processing
3. Record completion_time when processing finished
4. Update status to 'completed'
5. Add any processing_notes

## Email Notifications

### Types
1. Booking Confirmation
   - Drop-off time details
   - Location information
   - Item preparation instructions
   - Cancellation policy

2. Cancellation Confirmation
   - Cancelled slot details
   - Rebooking instructions
   - Timeline requirements

3. Reminder (24h before)
   - Drop-off time details
   - Location information
   - Item preparation checklist
   - Required documentation

4. Processing Complete
   - Completion time
   - Items processed count
   - Next steps
   - Event timeline

## Indexes
- Primary keys on all id fields
- Foreign key indexes on event_id, consignor_id, and slot_id
- Index on status for filtering
- Index on start_time for date range queries
- Compound index on (event_id, status, start_time) for slot availability checks
- Index on arrival_time for check-in tracking