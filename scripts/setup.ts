#!/usr/bin/env node
import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Setup script for initializing the Cloudflare-based project
 */
async function setup() {
  try {
    console.log('🚀 Setting up Cloudflare development environment...\n');

    // Create D1 database
    console.log('📦 Creating D1 database...');
    const dbOutput = execSync('wrangler d1 create consignment-retail', { encoding: 'utf8' });
    const dbId = dbOutput.match(/database_id = "([^"]+)"/)?.[1];
    
    if (!dbId) {
      throw new Error('Failed to extract database ID');
    }

    // Create KV namespace
    console.log('📦 Creating KV namespace...');
    const kvOutput = execSync('wrangler kv:namespace create CACHE', { encoding: 'utf8' });
    const kvId = kvOutput.match(/id = "([^"]+)"/)?.[1];

    if (!kvId) {
      throw new Error('Failed to extract KV namespace ID');
    }

    // Create queue
    console.log('📦 Creating queue...');
    execSync('wrangler queues create jobs-queue');

    // Update wrangler.toml with IDs
    console.log('📝 Updating wrangler.toml...');
    const wranglerConfig = `
name = "consignment-retail"
main = "src/worker.ts"
compatibility_date = "2024-01-22"
node_compat = true

# D1 Database
[[d1_databases]]
binding = "DB"
database_name = "consignment_retail"
database_id = "${dbId}"

# KV Store for caching and sessions
[[kv_namespaces]]
binding = "CACHE"
id = "${kvId}"

# Queue for background jobs
[[queues.producers]]
binding = "JOBS_QUEUE"
queue = "jobs-queue"

[[queues.consumers]]
queue = "jobs-queue"
max_batch_size = 10
max_batch_timeout = 30
max_retries = 3
dead_letter_queue = "jobs-dlq"

# Environment variables
[vars]
ENV = "development"

# Development environment
[env.development]
name = "consignment-retail-dev"
vars = { ENV = "development" }
cors = ["http://localhost:3000"]

# Production environment
[env.production]
name = "consignment-retail"
vars = { ENV = "production" }
`;

    writeFileSync('wrangler.toml', wranglerConfig);

    // Create necessary directories
    console.log('📁 Creating project directories...');
    const directories = [
      'src/models',
      'src/routes',
      'src/utils',
      'src/workers',
      'test',
      'migrations',
    ];

    directories.forEach((dir) => {
      mkdirSync(dir, { recursive: true });
    });

    // Run initial migration
    console.log('🔄 Running initial database migration...');
    execSync('wrangler d1 migrations apply consignment-retail');

    console.log('\n✅ Setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Add your API keys to wrangler secrets:');
    console.log('   wrangler secret put CLERK_API_KEY');
    console.log('   wrangler secret put SHOPIFY_API_KEY');
    console.log('   wrangler secret put SHOPIFY_API_SECRET');
    console.log('   wrangler secret put EMAIL_API_KEY');
    console.log('\n2. Start development server:');
    console.log('   npm run dev');

  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setup().catch(console.error);