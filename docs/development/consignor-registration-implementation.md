# Consignor Registration Implementation Plan

## Overview
The registration system has been updated to separate account registration from event participation. This provides more flexibility and better matches real-world usage patterns.

## Phase 1: Database Setup (6 hrs)
1. Create Consignors table
2. Create Events table
3. Create Participations table
4. Add necessary indexes
5. Write initial seed data

## Phase 2: API Implementation (12 hrs)
1. Implement endpoints:
   - Account registration
   - Authentication
   - Profile management
   - Event participation management
2. Write integration tests
3. Update API documentation

## Phase 3: Frontend Implementation (10 hrs)
1. Create registration flow:
   - Account creation
   - Profile completion
   - Optional event participation
2. Add state management
3. Implement form validation
4. Write UI tests

## Phase 4: Testing & QA (6 hrs)
1. Write unit tests
2. Perform integration testing
3. Conduct end-to-end testing
4. Test edge cases:
   - Registration without event participation
   - Multiple event participations
   - Profile updates

## Phase 5: Deployment (2 hrs)
1. Create deployment plan
2. Deploy database schema
3. Deploy API
4. Deploy frontend

## Estimated Total: 36 hrs

## Updated Flow
See [Registration Flow Diagram](/docs/diagrams/flows/registration-flow.mmd) for the complete system flow.