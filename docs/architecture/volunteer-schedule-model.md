# Volunteer Schedule Data Model

## Overview
The volunteer scheduling system enables consignors to sign up for volunteer shifts to earn bonus commission. Key features:
- Multiple shift types with different responsibilities
- 3-hour shift duration
- Maximum 3 shifts per consignor per event
- 5% bonus per completed shift (max 15%)
- Automated email notifications

## Tables

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

## Relationships
- Events 1:n VolunteerShifts
- VolunteerShifts 1:n VolunteerAssignments
- Consignors 1:n VolunteerAssignments
- Events 1:n VolunteerAssignments

## Constraints
- Maximum 3 shifts per consignor per event
- Unique index on (consignor_id, shift_id) to prevent duplicate assignments
- Check constraint on remaining_spots >= 0
- Check constraint on bonus_earned <= 0.15 (15%)
- Shifts must be 3 hours in duration (end_time - start_time = 3 hours)

## Data Integrity Rules

### Assignment Process
1. Verify consignor hasn't exceeded 3 shifts per event
2. Verify shift has remaining capacity
3. Create VolunteerAssignments record
4. Decrement remaining_spots in VolunteerShifts
5. Trigger confirmation email

### Cancellation Process
1. Update status to 'cancelled'
2. Set cancelled_at timestamp
3. Increment remaining_spots in VolunteerShifts
4. Trigger cancellation email
5. Recalculate consignor's total bonus

### Completion Process
1. Record check_in_time at start
2. Record check_out_time at end
3. Update status to 'completed'
4. Calculate and store bonus_earned
5. Update consignor's total bonus

## Email Notifications

### Types
1. Assignment Confirmation
   - Shift details
   - Location information
   - Responsibilities
   - Cancellation policy

2. Cancellation Confirmation
   - Cancelled shift details
   - Impact on bonus earnings
   - Alternative shift options

3. Reminder (24h before)
   - Shift details
   - Location information
   - Responsibilities
   - Check-in instructions

4. Completion Confirmation
   - Shift completion record
   - Bonus earned
   - Total bonus status
   - Thank you message

## Indexes
- Primary keys on all id fields
- Foreign key indexes on event_id, consignor_id, and shift_id
- Index on status for filtering
- Index on start_time for date range queries
- Compound index on (event_id, status, start_time) for shift availability checks
- Index on check_in_time for attendance tracking