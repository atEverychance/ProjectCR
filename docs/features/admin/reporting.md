# Administrative Reporting

## Overview
Comprehensive reporting system for event management and analysis. See [Reporting Architecture](../../diagrams/reporting-architecture.mmd) for complete structure.

## Sales Reports

### Daily Sales
- Total sales
- By category
- By consignor
- By payment method

### Event Sales
- Event totals
- Daily breakdown
- Top selling items
- Return rates

### Consignor Earnings
- Total earnings
- Payout status
- Commission breakdown
- Payment history

## Inventory Reports

### Current Inventory
- Total items
- By category
- By size
- By price range

### Sales Performance
- Sell-through rate
- Days to sell
- Markdown performance
- Return rates

### Consignor Activity
- Items listed
- Items sold
- Return rates
- Earnings summary

## Event Reports

### Event Overview
- Total sales
- Total consignors
- Total shoppers
- Volunteer participation

### Schedule Performance
- Drop-off slots
- Volunteer shifts
- Staffing levels
- Attendance rates

### Financial Summary
- Total revenue
- Expenses
- Net profit
- Commission payouts

## User Reports

### Consignor Activity
- Registration rates
- Inventory creation
- Sales performance
- Earnings summary

### Shopper Activity
- Total shoppers
- Repeat shoppers
- Average spend
- Category preferences

### Volunteer Participation
- Shift coverage
- No-show rates
- Performance ratings
- Retention rates

## Financial Reports

### Revenue Analysis
Components:
- Sales revenue
- Commission breakdown
- Fee collection
- Referral payments
- Net proceeds

### Commission Reports
Details:
- Base commission
- Volunteer bonuses
- Super bonuses
- Referral rewards
- Total earnings

### Fee Analysis
Tracking:
- Registration fees
- Fee waivers
- Payment status
- Collection rates

### Cheque Printing
Features:
- Print cheques for reconciled consignors
- Three cheques per US Letter page
- Formatted for Cheque Style #111
- Pagination support

Layout Specifications:
- Paper: US Letter (8.5" x 11")
- Margins: 0.25" all sides
- Cheque spacing: Equal thirds of page
- Font requirements: MICR encoding for routing/account numbers

Access Control:
- Limited to users with report generation permissions
- Audit trail of all cheque generation requests

Workflow:
1. Select event from dropdown
2. View list of reconciled consignors
3. Generate/download cheque PDF
4. Mark cheques as printed (optional)

## Operational Reports

### Volunteer Management
Metrics:
- Shift coverage
- Completion rates
- No-show rates
- Bonus impact

### Schedule Analysis
Reports:
- Drop-off utilization
- Volunteer coverage
- Shopping patterns
- Return processing

## Performance Analytics

### Category Performance
Analysis:
- Top categories
- Price trends
- Return rates
- Seasonal patterns

### Price Analysis
Metrics:
- Price distribution
- Markdown impact
- Optimal pricing
- Return correlation

## System Reports

### Usage Statistics
- Active users
- API usage
- Feature adoption
- Error rates

### Integration Status
- Shopify sync status
- Email delivery rates
- Webhook processing
- Authentication stats

### Performance Metrics
- Response times
- Queue status
- Resource usage
- Error rates

## Export Capabilities

### Data Formats
Available formats:
- CSV
- Excel
- PDF
- JSON

### Scheduling
Options:
- On-demand
- Scheduled exports
- Email delivery
- Archive access

## Custom Reporting

### Report Builder
Features:
- Metric selection
- Date ranges
- Filter options
- Format selection

### Saved Reports
Management:
- Template saving
- Schedule setting
- Distribution lists
- Access control

## Historical Analysis

### Trend Analysis
Comparisons:
- Event to event
- Season to season
- Year over year
- Category trends

### Performance Tracking
Metrics:
- Growth rates
- Return rates
- Participation trends
- Revenue patterns

## Audit Reports

### Transaction Audit
Tracking:
- Sales records
- Return processing
- Payment history
- Adjustments

### System Audit
Tracking:
- User actions
- Configuration changes
- Access attempts
- System logs

## Report Distribution

### Delivery Methods
Options:
- Email delivery
- Download center
- API access
- Automated distribution

### Access Control
Management:
- User permissions
- Report access
- Data visibility
- Export rights

## Report Storage

### Archive Management
Features:
- Report retention
- Version control
- Access logging
- Storage optimization

### Data Security
Protection:
- Access control
- Encryption
- Audit trails
- Compliance
