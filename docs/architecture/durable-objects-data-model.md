# Durable Objects Data Models

## Sale Session DO

```typescript
interface SaleSession {
  id: string;
  eventId: string;
  status: 'active' | 'completed' | 'cancelled';
  startTime: number;
  endTime: number;
  items: {
    [itemId: string]: {
      status: 'available' | 'pending' | 'sold';
      lastUpdated: number;
      price: number;
      commissionRate: number;
    }
  };
  transactions: Array<{
    id: string;
    timestamp: number;
    items: string[];
    total: number;
    commissionTotal: number;
    shopperCode: string;
  }>;
  metadata: {
    totalSales: number;
    totalCommissions: number;
    itemCount: number;
    soldCount: number;
  };
}
```

## Inventory Reconciliation DO

```typescript
interface InventoryState {
  id: string;
  eventId: string;
  items: {
    [itemId: string]: {
      status: 'locked' | 'modifiable' | 'transfer';
      shopifyId: string;
      lastSynced: number;
      lastModified: number;
      version: number;
      data: {
        price: number;
        title: string;
        category: string;
        size: string;
        consignorId: string;
        [key: string]: any; // Additional tracked data points
      };
    }
  };
  syncMetadata: {
    lastSyncTime: number;
    syncCount: number;
    conflictCount: number;
    lastSuccessfulSync: number;
  };
}
```

## Commission Calculation DO

```typescript
interface CommissionState {
  id: string;
  eventId: string;
  rates: {
    base: number;
    volunteerBonus: number;
    superBonus: number;
  };
  calculations: {
    [transactionId: string]: {
      status: 'pending' | 'completed' | 'error';
      timestamp: number;
      attempts: number;
      baseAmount: number;
      bonusAmount: number;
      totalAmount: number;
      items: Array<{
        itemId: string;
        price: number;
        commission: number;
      }>;
      error?: string;
    }
  };
  metadata: {
    totalCalculations: number;
    errorCount: number;
    lastCalculation: number;
  };
}
```

## State Management

### Persistence Strategy
1. Active State:
   - Maintained in memory within DO
   - Backed by DO's storage API
   - Regular snapshots to D1

2. Historical Data:
   - Completed sessions in D1
   - Archived calculations
   - Audit records

### State Transitions

#### Sale Session
```
Initial -> Active -> (Completed | Cancelled)
```

#### Inventory Item
```
Modifiable -> Locked -> (Sold | Transfer)
```

#### Commission Calculation
```
Pending -> (Completed | Error -> Retry -> Completed)
```

## Data Access Patterns

### Sale Session DO
- High read/write during active sales
- Atomic updates for transactions
- Batch persistence of completed data

### Inventory Reconciliation DO
- Periodic sync operations
- Conflict resolution on updates
- State transition management

### Commission Calculation DO
- Real-time calculations
- Retry mechanism for failures
- Batch processing for adjustments

## Data Consistency

### Strong Consistency Requirements
- Transaction processing
- Inventory status updates
- Commission calculations

### Eventually Consistent
- Historical reporting data
- Analytics aggregations
- Archived records

## Performance Considerations

### Data Size Limits
- Session state: < 128KB per DO
- Inventory state: Partitioned by event
- Calculation state: Archived after completion

### Access Patterns
- Read-heavy during sales
- Write-heavy during reconciliation
- Balanced for commission calculations

### Caching Strategy
- Hot data in DO memory
- Warm data in DO storage
- Cold data in D1