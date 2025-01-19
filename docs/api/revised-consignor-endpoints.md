# Consignor API Endpoints

## Overview
The consignor system separates account registration from event participation. This allows consignors to:
- Create an account without immediately participating in events
- Participate in multiple events over time
- Manage their profile independently from event participation

See [Registration Flow Diagram](/docs/diagrams/registration-flow.mmd) for complete system flow.

## Consignor Registration

### Create Consignor Account
POST /api/v1/consignors
Request body:
- email (string)
- name (string)
- phone (string, optional)
- address (string, optional)

Response:
- consignor_id
- account_status
- created_at

### Get Consignor Profile
GET /api/v1/consignors/{id}
Response:
- Basic profile
- Account status
- Registration date

## Event Participation

### Register for Event
POST /api/v1/consignors/{id}/events
Request body:
- event_id (string)
- type (regular|super)
- referral_code (string, optional)

Response:
- participation_id
- event_details
- payment_status
- participation_status

### Get Event Participation
GET /api/v1/consignors/{id}/events/{event_id}
Response:
- Event details
- Participation status
- Payment status

### Update Participation
PUT /api/v1/consignors/{id}/events/{event_id}
Request body:
- type (regular|super, optional)
- referral_code (string, optional)

Response:
- Updated participation details

### List Participations
GET /api/v1/consignors/{id}/events
Response:
- Array of event participations
- Each with:
  - event_id
  - participation_status
  - payment_status