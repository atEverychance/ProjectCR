# Inventory Management

## Overview
Mobile-first inventory management system optimized for efficient item entry. See [Inventory Flow](../../diagrams/inventory-flow.mmd) for complete process.

## Item Entry

### Quick Entry Interface
Required fields:
- Title
- Category
- Size
- Price
- Photos (2-4 based on consignor type)
- Markdown eligibility

Smart defaults:
- Size ranges by category
- Price suggestions
- Category shortcuts
- Recent selections
- Auto-fill from previous items

### Photo Management
Capabilities:
- Multiple photo upload
- Client-side compression with progress
- Photo preview with quality adjustment
- Auto-orientation
- Thumbnail generation
- Batch processing
- Offline capture and sync

Photo Feedback:
- Compression quality indicator
- Size reduction preview
- Format validation
- Retake suggestions

Limits:
- Regular: 2 photos max
- Super: 4 photos max
- 5MB per photo (pre-compression)
- Supported formats: JPG, PNG
- Minimum resolution: 800x600px

### Error Handling
Validation:
- Real-time field validation
- Photo quality checks
- Price range validation
- Category compatibility
- Size availability

Error Recovery:
- Clear error messages
- Field highlighting
- Correction suggestions
- Save draft capability
- Partial submission

### Offline Support
Features:
- Local item caching
- Offline photo capture
- Background sync
- Conflict resolution
- Sync status indicator

Limits:
- Max 50 items offline
- 24-hour sync window
- Manual sync trigger

### Batch Operations
Features:
- Multi-item upload
- Bulk category assignment
- Batch price updates
- Group markdown settings

## Mobile Optimization

### Performance
Optimizations:
- Progressive loading
- Image compression
- Offline support
- Background sync

### User Experience
Mobile features:
- Touch-friendly controls
- Quick category selection
- Easy photo capture
- Gesture support
- Auto-save

## Item Management

### Status Tracking
Item states:
- Draft
- Active
- Sold
- Returned
- Transferred

### Transfer System
Transfer rules:
- Maximum 2 transfers
- Price adjustment option
- History tracking
- Status preservation

### Inventory Views
Available views:
- Current items
- Sold items
- Returns
- Transfer history
- Draft items

## Data Validation

### Required Fields
Validation rules:
- Title requirements
- Category selection
- Size validation
- Price ranges
- Photo requirements

### Business Rules
Enforcement:
- Price minimums
- Category restrictions
- Photo limits
- Transfer limits
- Markdown rules

## Shopify Integration

### Product Creation
Sync points:
- Item creation
- Status updates
- Price changes
- Photo updates

### Inventory Tracking
Management:
- Stock levels
- Sale status
- Returns
- Transfers

## Reporting

### Item Statistics
Metrics:
- Total items
- Items sold
- Return rate
- Average price
- Category distribution

### Sales Performance
Analysis:
- Sale prices
- Time to sell
- Category performance
- Markdown impact

## User Interface

### Mobile Interface
Components:
- Quick entry form
- Photo upload
- Category browser
- Size selector
- Price input
- Batch tools

### Management Interface
Features:
- Item list
- Status filters
- Bulk actions
- Search/sort
- Export options
