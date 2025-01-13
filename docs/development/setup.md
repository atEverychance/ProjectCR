# Development Environment Setup

## Overview
Complete guide for setting up local development environment. The development architecture consists of local services, external integrations, and CI/CD pipelines. See the [Development Architecture](docs/diagrams/architecture/development-architecture.mmd) diagram for the complete system structure.

![Development Architecture](docs/diagrams/architecture/development-architecture.mmd)

## Prerequisites

### System Requirements
Required software:
- Python 3.9+
- Node.js 16+
- Redis
- SQLite
- Git

### External Services
Required accounts:
- Shopify Partner Account
- Clerk.dev Account
- Mailchimp Account

## Local Environment

### Directory Structure
Project organization:
/project_root
├── backend/
│   ├── app/
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── tests/
│   └── package.json
└── docs/
### Environment Variables
Required variables:

Backend settings:
- DATABASE_URL
- REDIS_URL
- CLERK_SECRET_KEY
- MAILCHIMP_API_KEY
- ENVIRONMENT=development

Frontend settings:
- VITE_API_URL
- VITE_CLERK_PUBLISHABLE_KEY
- VITE_ENVIRONMENT=development

## Apple Sign In Configuration

### Requirements
1. Apple Developer account
2. App ID creation
3. Service ID configuration
4. Private key generation

### Clerk.dev Setup
1. Enable Apple Sign In
2. Configure Service ID
3. Add Private Key
4. Set up Redirect URLs

## Installation Steps

### Backend Setup
Create virtual environment:
- python -m venv venv
- source venv/bin/activate  # or venv\Scripts\activate on Windows

Install dependencies:
- pip install -r requirements.txt

Configure environment:
- cp .env.example .env
- Edit .env with your configuration

### Frontend Setup
Install dependencies:
- cd frontend
- npm install

Configure environment:
- cp .env.example .env
- Edit .env with your configuration

### Database Setup
Initialize database:
- python manage.py init_db

Load sample data (optional):
- python manage.py load_sample_data

### Redis Setup
Start Redis:
- redis-server

## Development Workflow

### Running Services
Start backend:
- python manage.py run

Start frontend:
- cd frontend
- npm run dev

### Testing
Backend tests:
- pytest

Frontend tests:
- npm test

## Code Standards

### Python Standards
Style guide:
- Black formatting
- Flake8 linting
- Type hints
- Docstrings

### JavaScript Standards
Style guide:
- ESLint configuration
- Prettier formatting
- TypeScript types
- JSDoc comments

## Version Control

### Git Configuration
Repository setup:
- git init
- git remote add origin [repository-url]
- git flow init

### Branch Strategy
Workflow:
- main: production code
- develop: integration branch
- feature/*: new features
- fix/*: bug fixes

## IDE Setup

### VS Code
Recommended extensions:
- Python
- Svelte
- ESLint
- Prettier
- GitLens

Settings:
- Format on save
- Auto-import
- Type checking
- Linting

### PyCharm
Recommended plugins:
- Svelte
- Database tools
- Git integration
- Environment management

## Debugging

### Backend Debugging
Tools:
- Python debugger
- FastAPI debug toolbar
- Redis commander
- SQLite browser

### Frontend Debugging
Tools:
- Vue devtools
- Browser devtools
- Network inspector
- State management
