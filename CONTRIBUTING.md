# Contributing to Consignment Retail Platform

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to our Cloudflare-based TypeScript project.

## Development Environment

### Prerequisites
- Node.js 18+
- npm 9+
- Cloudflare account
- Wrangler CLI
- Git

### Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone [your-fork-url]
   cd ProjectCR
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up development environment:
   ```bash
   npm run setup
   ```

## Development Workflow

### Branch Naming
- Feature: `feature/description`
- Bug fix: `fix/description`
- Documentation: `docs/description`
- Refactor: `refactor/description`

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Maintenance tasks

Example:
```
feat(auth): implement Clerk.dev authentication
```

### TypeScript Guidelines

1. **Type Safety**
   - Use strict TypeScript settings
   - Avoid `any` types
   - Define interfaces for all data structures
   - Use proper type imports

2. **Code Organization**
   - Keep files focused and small
   - Use proper directory structure
   - Export types and interfaces
   - Use barrel exports when appropriate

### Testing

1. **Unit Tests**
   ```bash
   # Run tests
   npm test
   
   # Watch mode
   npm test -- --watch
   ```

2. **Type Checking**
   ```bash
   npm run typecheck
   ```

3. **Linting**
   ```bash
   npm run lint
   ```

### Database Changes

1. Create migration:
   ```bash
   wrangler d1 migrations create [name]
   ```

2. Test locally:
   ```bash
   npm run db:migrate:local
   ```

3. Include both up and down migrations

## Pull Request Process

1. **Before Submitting**
   - Update documentation
   - Add/update tests
   - Run all checks locally
   - Ensure CI passes
   - Rebase on main

2. **PR Description**
   - Use PR template
   - Link related issues
   - Describe changes clearly
   - Include testing instructions

3. **Code Review**
   - Address review comments
   - Keep discussions focused
   - Request re-review after changes

4. **After Merge**
   - Delete branch
   - Update related issues
   - Monitor deployment

## Best Practices

### Code Style
- Follow ESLint rules
- Use Prettier formatting
- Write clear comments
- Use meaningful names

### Performance
- Optimize database queries
- Use appropriate caching
- Monitor Worker CPU usage
- Consider edge cases

### Security
- Validate all inputs
- Use proper authentication
- Handle errors appropriately
- Follow security best practices

### Documentation
- Update README when needed
- Document API changes
- Include JSDoc comments
- Update architecture docs

## Working with Cloudflare

### Workers
- Use TypeScript features
- Handle errors properly
- Follow edge computing patterns
- Monitor performance

### D1 Database
- Write safe migrations
- Use prepared statements
- Handle race conditions
- Consider edge caching

### KV Storage
- Use for appropriate data
- Consider TTL settings
- Handle cache invalidation
- Monitor usage

### Queues
- Handle retries properly
- Use dead letter queues
- Monitor queue depth
- Handle failures gracefully

## Getting Help

1. Check existing documentation
2. Search closed issues
3. Ask in discussions
4. Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the project's license.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Questions?

Feel free to ask for help in:
- GitHub Discussions
- Issue comments
- Pull Request comments