# Shopper Codes

## Overview
Shopper codes are unique identifiers generated for each customer that enable tracking and reporting of purchases across multiple sales. This feature supports the generation of shopper invoices that list all items purchased by a specific customer.

## Shopper Code Format
A shopper code is automatically generated using customer information from Shopify and follows this format:
`FFF-LLL-PPP` where:
- `FFF`: First three letters of the shopper's first name
- `LLL`: First three letters of the shopper's last name
- `PPP`: First three characters of the shopper's postal code

Example: For Jane Smith at M5V 2T6 → `JAN-SMI-M5V`

## Implementation Details

### Code Generation
- Shopper codes are automatically generated when a sale is processed through Shopify
- The system extracts customer information from the Shopify API:
  - First name
  - Last name
  - Postal code
- All letters in the code are converted to uppercase for consistency

### Data Storage
- Each sale record includes the associated shopper code
- This creates a relationship between:
  - The purchased item
  - The consignor (seller)
  - The shopper (buyer)

## Shopper Invoice Report

### Purpose
The shopper invoice report provides a comprehensive list of all items purchased by a specific shopper code, enabling tracking of customer purchasing patterns and generating complete purchase histories.

### Report Contents
- Shopper code
- Customer information
- List of all purchased items including:
  - Item description
  - Price
  - Purchase date
  - Consignor information
  - Event/sale information

### Access
- Available through the admin reporting interface
- Searchable by shopper code
- Filterable by date range

## Integration Points
- Shopify API: Customer information retrieval
- Sales Processing: Shopper code generation and storage
- Reporting System: Shopper invoice generation