# Contributing to url-slugger

Thank you for your interest in contributing to url-slugger! This document provides guidelines and information for contributors.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Start development: `npm run test:watch`

## Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass: `npm test`
5. Ensure code is properly formatted: `npm run format`
6. Ensure code passes linting: `npm run lint`
7. Commit your changes using conventional commits
8. Push and create a pull request

## Code Standards

- **TypeScript**: All code must be written in TypeScript with strict type checking
- **Testing**: 100% test coverage is required
- **Formatting**: Code must be formatted with Prettier
- **Linting**: Code must pass ESLint checks
- **Commits**: Use conventional commit messages

## Commit Message Format

We use conventional commits for automated versioning and changelog generation:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

- `feat: add support for custom separators`
- `fix: handle edge case with empty strings`
- `docs: update API documentation`

## Testing

- Write tests for all new functionality
- Ensure edge cases are covered
- Include performance tests for critical paths
- Tests should be descriptive and well-organized

## Pull Request Process

1. Ensure your PR has a clear title and description
2. Link any related issues
3. Ensure all CI checks pass
4. Request review from maintainers
5. Address any feedback promptly

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a positive environment

## Questions?

Feel free to open an issue for any questions about contributing!
