# Pagination

## Overview
Standard pagination implementation for list endpoints. See [Pagination Flow](../diagrams/pagination-flow.mmd) for complete process.

## Implementation

### Query Parameters
Required parameters:
- page: Current page number (default: 1)
- per_page: Items per page (default: 20, max: 100)
- sort: Sort field (optional)
- order: asc/desc (optional)

Optional parameters:
- filter: Filter criteria
- search: Search terms
- include: Related data
- fields: Field selection

### Response Format
Standard structure:
{
"data": [],
"meta": {
"total_items": integer,
"total_pages": integer,
"current_page": integer,
"per_page": integer,
"has_next": boolean,
"has_previous": boolean
},
"links": {
"self": url,
"first": url,
"last": url,
"next": url,
"prev": url
}
}
## Supported Endpoints

### Inventory Lists
Endpoints:
- /api/v1/inventory
- /api/v1/consignors/{id}/inventory
- /api/v1/events/{id}/inventory

Sortable fields:
- created_at
- price
- status
- category

### Consignor Lists
Endpoints:
- /api/v1/consignors
- /api/v1/events/{id}/consignors
- /api/v1/reports/consignors

Sortable fields:
- name
- created_at
- type
- status

### Sales Reports
Endpoints:
- /api/v1/sales
- /api/v1/events/{id}/sales
- /api/v1/consignors/{id}/sales

Sortable fields:
- sale_date
- price
- category
- status

## Performance

### Optimization
Techniques:
- Cursor-based pagination
- Efficient counting
- Index utilization
- Cache usage

### Large Datasets
Handling:
- Partial counts
- Estimated totals
- Streaming responses
- Batch processing

## Implementation Details

### Cursor Pagination
Implementation:
- Key-based navigation
- Efficient queries
- Consistent ordering
- Stable results

### Offset Pagination
Implementation:
- Page calculation
- Limit/offset queries
- Total counting
- Result slicing

## Client Integration

### Best Practices
Guidelines:
- Page size limits
- Sorting options
- Filter usage
- Cache handling

### Error Handling
Scenarios:
- Invalid page numbers
- Out of range
- Invalid parameters
- Missing data

## Cache Strategy

### Cache Keys
Structure:
- Include parameters
- Version control
- Client context
- Result window

### Invalidation
Triggers:
- Data updates
- Parameter changes
- Time expiration
- Manual clear

## Security

### Access Control
Checks:
- Permission validation
- Resource access
- Data visibility
- Client context

### Rate Limiting
Controls:
- Request limits
- Result limits
- Resource usage
- Abuse prevention

## Performance Monitoring

### Metrics
Tracking:
- Response times
- Cache hits
- Query performance
- Resource usage

### Optimization
Areas:
- Query efficiency
- Cache usage
- Result size
- Network load

## Documentation

### Integration Guide
Topics:
- Parameter usage
- Response handling
- Error recovery
- Best practices

### Examples
Provided for:
- Basic pagination
- Complex sorting
- Filtering
- Related data
