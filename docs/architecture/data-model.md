# Data Architecture

## Overview

The application uses Cloudflare D1, a serverless SQLite database running at the edge. All database interactions are strongly typed using TypeScript.

## Database Design

### Core Tables

```typescript
// TypeScript type definitions matching D1 schema

interface Consignor {
  id: number;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  preferred_contact?: 'email' | 'phone';
  created_at: string;
  updated_at: string;
}

interface Event {
  id: number;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  location: string;
  max_consignors: number;
  drop_off_start: string;
  drop_off_end: string;
  pick_up_start: string;
  pick_up_end: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

interface InventoryItem {
  id: number;
  user_id: string;
  event_id: number;
  name: string;
  description?: string;
  category: string;
  size?: string;
  price: number;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  status: 'pending' | 'approved' | 'rejected' | 'sold' | 'returned';
  barcode?: string;
  created_at: string;
  updated_at: string;
}
```

## Edge Database Architecture

### D1 Features Used

1. **SQLite at Edge**
   - Zero latency database access
   - Automatic replication
   - ACID compliance

2. **Prepared Statements**
   - Type-safe queries
   - SQL injection prevention
   - Query optimization

3. **Migrations**
   - Version controlled schema
   - Automated deployment
   - Rollback support

### Performance Optimization

1. **Indexing Strategy**
   - Primary keys
   - Foreign key relationships
   - Common query paths
   - Full-text search indexes

2. **Query Optimization**
   - Prepared statements
   - Efficient joins
   - Proper indexing
   - Query planning

3. **Caching Layer**
   - Workers KV for frequent reads
   - Cache invalidation strategy
   - Cache-aside pattern
   - TTL management

## Data Access Patterns

### Type-Safe Queries

```typescript
// Example of type-safe D1 query
async function getConsignor(db: D1Database, userId: string): Promise<Consignor | null> {
  return await db
    .prepare('SELECT * FROM consignors WHERE user_id = ?')
    .bind(userId)
    .first<Consignor>();
}
```

### Transaction Handling

```typescript
// Example of D1 transaction
async function createInventoryItem(
  db: D1Database,
  item: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>
): Promise<number> {
  const stmt = db.prepare(`
    INSERT INTO inventory_items (
      user_id, event_id, name, description, category,
      size, price, condition, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING id
  `);
  
  const result = await stmt
    .bind(
      item.user_id,
      item.event_id,
      item.name,
      item.description,
      item.category,
      item.size,
      item.price,
      item.condition,
      item.status
    )
    .first<{ id: number }>();
    
  return result?.id;
}
```

## Data Migration Strategy

### Migration Process

1. **Create Migration**
   ```bash
   wrangler d1 migrations create [name]
   ```

2. **Test Locally**
   ```bash
   wrangler d1 migrations apply --local
   ```

3. **Deploy to Production**
   ```bash
   wrangler d1 migrations apply
   ```

### Rollback Strategy

1. **Automatic Rollbacks**
   - Transaction failure handling
   - Schema version control
   - Data integrity checks

2. **Manual Intervention**
   - Emergency rollback procedures
   - Data recovery process
   - Integrity verification

## Data Backup and Recovery

### Backup Strategy

1. **Automated Backups**
   - Daily incremental backups
   - Weekly full backups
   - Point-in-time recovery

2. **Backup Verification**
   - Integrity checks
   - Recovery testing
   - Backup rotation

### Recovery Procedures

1. **Data Recovery**
   - Point-in-time restoration
   - Partial data recovery
   - Integrity verification

2. **Business Continuity**
   - Recovery time objectives
   - Recovery point objectives
   - Service level agreements

## Security Measures

### Data Protection

1. **Access Control**
   - Row-level security
   - Column encryption
   - Access logging

2. **Edge Security**
   - TLS encryption
   - WAF protection
   - DDoS mitigation

### Compliance

1. **Data Privacy**
   - GDPR compliance
   - Data retention
   - Data minimization

2. **Audit Trail**
   - Change tracking
   - Access logging
   - Compliance reporting

## Monitoring and Maintenance

### Performance Monitoring

1. **Metrics Collection**
   - Query performance
   - Cache hit rates
   - Error rates

2. **Alerting**
   - Performance thresholds
   - Error conditions
   - Capacity planning

### Maintenance Tasks

1. **Regular Maintenance**
   - Index optimization
   - Query analysis
   - Schema updates

2. **Health Checks**
   - Database connectivity
   - Query performance
   - Data integrity
