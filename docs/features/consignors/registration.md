# Consignor Registration

## Overview
Complete registration and event participation flow for consignors. See [Registration Flow](../../diagrams/flows/registration-flow.mmd) for the complete process.

## Registration Process

### Simplified Flow
1. User clicks register
2. Chooses authentication method:
   - Magic link (enter email)
   - Social login (Google/Facebook/Apple)
3. Completes authentication
4. Account created

### Social Login Options
- Google
- Facebook
- Apple

### Benefits
- No password management
- Simplified user experience
- Reduced support overhead
- Faster onboarding
- Privacy-focused options

### Initial Registration
Required information:
- Email address
- Full name
- Password
- Terms acceptance

Validation:
- Email uniqueness
- Password strength
- Domain validation
- Client association

System actions:
- Create consignor record
- Send welcome email
- Initialize profile
- Generate consignor ID

### Event Participation
Required steps:
1. Select event
2. Choose consignor type:
   - Regular ($15, 2 photos max)
   - Super ($25, 4 photos max, +5% on items $100+)
3. Pay participation fee
4. Complete referral information

Referral collection:
- Source selection
- Consignor ID input (if referred)
- Validation of referring consignor
- Reward tracking ($5 per referral)

## Profile Management

### Basic Information
Editable fields:
- Name
- Email
- Contact preferences
- Password

### Email Management
Email updates:
- Email change requires verification
- Changes processed through background job system
- Updates propagate to:
  * Authentication system
  * Mailchimp subscriber list
  * Shopify customer profile
- Sync status tracking:
  * In Progress
  * Completed
  * Failed (with retry)
- Error handling:
  * Automatic retries (max 3 attempts)
  * Exponential backoff
  * Admin notifications for failures
- Change history maintained
- Rate limiting applied

See [Email Sync Flow](../../diagrams/flows/email-sync-flow.mmd) for technical details.

### Verification Process
1. Initiate email change
2. Verify new email address
3. Update local records
4. Queue sync job for external systems:
   - Shopify customer update
   - Mailchimp subscriber update
5. Monitor sync status
6. Notify user of completion/failure

### Participation History
Tracked information:
- Past events
- Earnings history
- Volunteer history
- Loyalty status

### Loyalty Program
Tracking:
- Participation count
- Free event eligibility
- Reward usage
- Program status

## Event Registration

### Fee Payment
Processing:
- Regular/Super fee collection
- Loyalty discount application
- Payment verification
- Receipt generation

### Type Selection
Options:
- Regular Consignor
  * $15 fee
  * 2 photos per item
  * Base commission rate
- Super Consignor
  * $25 fee
  * 4 photos per item
  * Higher commission rate
  * Bonus on high-value items

### Referral System
Collection points:
- Registration process
- Event participation
- Profile updates
- Manual entry

Reward processing:
- Validation checks
- Reward calculation
- Payment inclusion
- History tracking

## System Actions

### Account Creation
Backend processes:
- Database record creation
- Client association
- ID generation
- Welcome email

### Event Participation
System updates:
- Participation record
- Fee tracking
- Type assignment
- Access enablement

### Referral Processing
Handling:
- Referral validation
- Reward queuing
- Notification sending
- Record updating

## User Interface

### Registration Form
Components:
- Email input
- Password creation
- Name collection
- Terms acceptance

### Event Registration
Elements:
- Event selection
- Type choice
- Fee payment
- Referral input

### Profile Management
Features:
- Information editing
- History viewing
- Status checking
- Settings management
- Sync status monitoring
- Error notifications
