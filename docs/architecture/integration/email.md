# Email Integration (Mailchimp Transactional)

## Overview
Queue-based email processing system using Mailchimp Transactional API. See [Email System](../../diagrams/flows/notification-system.mmd) for complete flow.

## Email Types

### Consignor Communications
Required templates:
- Welcome/Registration confirmation
- Volunteer shift confirmation
- Drop-off time confirmation
- Event participation confirmation

Template variables:
- name
- event_name
- event_details
- confirmation_details
- action_required

### Consignor Profile Updates
Triggered when a consignor updates their profile information, including their email address. Handled via a background job.

Actions:
- Update email address in Mailchimp via `update_mailchimp_email_task`.

Message variables:
- consignor_id
- new_email

### Admin Notifications
Required templates:
- New consignor registration
- Participation fee payment
- Volunteer shift selection
- Drop-off time booking

Template variables:
- consignor_details
- event_details
- action_type
- timestamp
- relevant_links

## Implementation

### Queue Management
Processing structure:
- Redis-based queue
- Worker processes
- Priority levels
- Retry mechanism

### Processing Strategy
Queue handling:
- Immediate queuing
- Background processing
- Batch sending
- Error handling

## Reliability

### Queue Processing
Processing steps:
1. Queue email job
2. Process in worker
3. Send via Mailchimp
4. Handle response
5. Log result

### Error Handling
Recovery process:
- Automatic retries (3 attempts)
- Error logging
- Failed job storage
- Manual recovery tools

### Monitoring
Tracking points:
- Queue length
- Processing rate
- Success rate
- Error frequency

## Multi-tenant Configuration

### Template Configuration
Structure:
- Base templates
- Client overrides
- Variable management
- Version control

### Sending Configuration
Settings:
- From addresses
- Reply-to handling
- Bounce processing
- Domain verification

### Client Isolation
Separation:
- Template access
- Queue isolation
- Log separation
- Error handling

## Performance

### Rate Limiting
Limits:
- Per-minute sending
- Burst handling
- Queue throttling
- Client quotas

### Optimization
Strategies:
- Batch processing
- Template caching
- Queue optimization
- Resource pooling

### Monitoring
Metrics:
- Delivery rates
- Processing times
- Queue status
- Error rates

## Security

### Authentication
Security:
- API key management
- Access control
- IP restrictions
- SSL enforcement

### Data Protection
Methods:
- Secure transmission
- Data encryption
- PII handling
- Access logging

### Audit Trail
Logging:
- Send attempts
- Delivery status
- Template usage
- Error events

## Compliance

### Email Requirements
Standards:
- CAN-SPAM compliance
- Unsubscribe handling
- Bounce processing
- Complaint handling

### Data Retention
Policies:
- Email logs
- Delivery records
- Error logs
- Analytics data
