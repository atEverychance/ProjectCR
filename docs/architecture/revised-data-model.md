# Comprehensive Data Model

## Overview
The data model supports:
- Account registration and event participation
- Volunteer shift management
- Drop-off scheduling
- Pickup scheduling
- Referral system tracking
- Payment status management

## Core Tables

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

## Volunteer Schedule Tables

### VolunteerShifts
- id (PK)
- event_id (FK to Events)
- shift_type (enum: drop_off_sorting|item_organization|shopper_assistance|general_help)
- start_time (datetime)
- end_time (datetime)
- location_zone (string)
- capacity (integer)
- remaining_spots (integer)
- created_at
- updated_at

### VolunteerAssignments
- id (PK)
- event_id (FK to Events)
- consignor_id (FK to Consignors)
- shift_id (FK to VolunteerShifts)
- status (enum: scheduled|cancelled|completed|no_show)
- check_in_time (datetime, nullable)
- check_out_time (datetime, nullable)
- bonus_earned (decimal)
- created_at
- updated_at
- cancelled_at (nullable)
- reminder_sent_at (nullable)
- performance_notes (text, nullable)

## Drop-off Schedule Tables

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

## Pickup Schedule Tables

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

### Core Relationships
- Consignors 1:n Participations
- Events 1:n Participations

### Volunteer Relationships
- Events 1:n VolunteerShifts
- VolunteerShifts 1:n VolunteerAssignments
- Consignors 1:n VolunteerAssignments
- Events 1:n VolunteerAssignments

### Drop-off Relationships
- Events 1:n DropOffSlots
- DropOffSlots 1:n ConsignorDropOffs
- Consignors 1:n ConsignorDropOffs
- Events 1:n ConsignorDropOffs

### Pickup Relationships
- Events 1:n PickupSlots
- PickupSlots 1:n ShopperPickups
- Events 1:n ShopperPickups

## Indexes

### Core Indexes
- Unique index on (consignor_id, event_id) in Participations
- Index on email in Consignors
- Index on event_id in Participations

### Schedule-related Indexes
- Index on start_time for all schedule-related tables
- Index on status for all assignment/booking tables
- Compound indexes on (event_id, status, start_time) for availability checks
- Foreign key indexes for all relationships