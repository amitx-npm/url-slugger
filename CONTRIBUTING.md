# Contributing to url-slugger

Thank you for your interest in contributing to url-slugger! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, pnpm, or yarn

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/your-username/url-slugger.git
   cd url-slugger
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run tests to ensure everything is working:
   ```bash
   npm test
   ```

## Development Workflow

### Project Structure

```
url-slugger/
├── src/
│   └── index.ts          # Main implementation
├── tests/
│   └── index.test.ts     # Test suite
├── dist/                 # Built output (generated)
├── coverage/             # Coverage reports (generated)
├── .github/
│   └── workflows/
│       └── ci.yml        # CI/CD pipeline
├── package.json          # Package configuration
├── README.md             # Documentation
├── CONTRIBUTING.md       # This file
├── LICENSE               # ISC license
├── tsconfig.json         # TypeScript config
├── vitest.config.ts      # Test configuration
├── tsup.config.ts        # Build configuration
├── .eslintrc.cjs         # Linting rules
├── .prettierrc           # Code formatting
└── .releaserc.json       # Semantic release config
```

### Available Scripts

- `npm run build` - Build the package
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run release:check` - Run all checks before release

### Making Changes

1. Create a new branch for your feature or fix:

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

2. Make your changes following the coding standards below

3. Add or update tests as needed

4. Run the test suite:

   ```bash
   npm test
   ```

5. Run linting and formatting:

   ```bash
   npm run lint:fix
   npm run format
   ```

6. Commit your changes using conventional commits:
   ```bash
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve issue with edge case"
   ```

## Coding Standards

### TypeScript Guidelines

- Use strict TypeScript settings (already configured)
- Avoid `any` types - use proper type definitions
- Export types for public APIs
- Use meaningful variable and function names
- Add JSDoc comments for public functions

### Code Style

- Use Prettier for formatting (configured in `.prettierrc`)
- Follow ESLint rules (configured in `.eslintrc.cjs`)
- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multiline structures

### Example Code Style

```typescript
/**
 * Converts a string into a URL-friendly slug
 *
 * @param input - The string to convert to a slug
 * @param options - Configuration options for slug generation
 * @returns A URL-friendly slug string
 */
export function slugify(
  input: SlugifyInput,
  options: SlugifyOptions = {}
): string {
  // Handle null, undefined, or non-string inputs
  if (input === null || input === undefined) {
    return '';
  }

  // Convert to string
  let str = String(input);

  // Implementation continues...
}
```

## Testing Guidelines

### Test Structure

- Use Vitest for testing
- Organize tests in logical groups using `describe` blocks
- Use descriptive test names that explain the expected behavior
- Test both happy paths and edge cases
- Aim for 100% test coverage

### Test Categories

1. **Basic functionality** - Core features and common use cases
2. **Edge cases** - Null inputs, empty strings, special characters
3. **Options** - All configuration options and combinations
4. **Performance** - Benchmarks for critical operations
5. **Real-world examples** - Practical use cases

### Example Test

```typescript
describe('slugify', () => {
  describe('basic functionality', () => {
    it('should convert simple text to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });
  });

  describe('edge cases', () => {
    it('should handle null and undefined', () => {
      expect(slugify(null)).toBe('');
      expect(slugify(undefined)).toBe('');
    });
  });
});
```

## Commit Message Format

We use [Conventional Commits](https://conventionalcommits.org/) for commit messages. This enables automatic versioning and changelog generation.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples

```bash
feat: add maxLength option to limit slug length
fix: handle edge case with empty separator
docs: update README with new examples
test: add performance benchmarks
chore: update dependencies
```

## Pull Request Process

1. **Fork and Branch**: Create a fork and feature branch
2. **Implement**: Make your changes following the guidelines above
3. **Test**: Ensure all tests pass and coverage is maintained
4. **Document**: Update documentation if needed
5. **Commit**: Use conventional commit messages
6. **Pull Request**: Create a PR with a clear description

### Pull Request Template

When creating a pull request, please include:

- **Description**: What changes were made and why
- **Type**: Feature, bug fix, documentation, etc.
- **Testing**: How the changes were tested
- **Breaking Changes**: Any breaking changes (if applicable)
- **Related Issues**: Link to any related issues

### Example PR Description

```markdown
## Description

Add support for custom character replacements in slugify function.

## Type

- [x] Feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Other

## Changes

- Added `replacements` option to SlugifyOptions interface
- Updated slugify function to apply custom replacements
- Added comprehensive tests for replacement functionality
- Updated README with examples

## Testing

- Added 15+ new test cases covering various replacement scenarios
- All existing tests continue to pass
- Coverage remains at 100%

## Breaking Changes

None - this is a backward-compatible addition.

## Related Issues

Closes #123
```

## Performance Considerations

When contributing, please consider:

- **Efficiency**: Avoid unnecessary operations or memory allocations
- **Scalability**: Test with large inputs to ensure good performance
- **Benchmarks**: Add performance tests for new features
- **Memory**: Be mindful of memory usage, especially with large strings

## Documentation

### README Updates

When adding new features:

- Add examples to the README
- Update the API reference
- Include real-world use cases
- Update the feature comparison table if relevant

### Code Documentation

- Add JSDoc comments for all public functions
- Include parameter descriptions and examples
- Document any complex logic or algorithms
- Keep comments up-to-date with code changes

## Release Process

Releases are automated using semantic-release:

1. **Merge to main**: PRs are merged to the main branch
2. **Automatic analysis**: Semantic-release analyzes commit messages
3. **Version bump**: Version is automatically incremented based on changes
4. **Changelog**: CHANGELOG.md is automatically updated
5. **NPM publish**: Package is published to npm registry
6. **GitHub release**: Release notes are created on GitHub

## Getting Help

If you need help or have questions:

1. **Check existing issues**: Look for similar questions or problems
2. **Create an issue**: Open a new issue with a clear description
3. **Discussion**: Use GitHub Discussions for general questions
4. **Documentation**: Check the README and code comments

## Recognition

Contributors are recognized in several ways:

- Listed in the package.json contributors field
- Mentioned in release notes for significant contributions
- GitHub contributor statistics
- Special thanks in major releases

## License

By contributing to url-slugger, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing to url-slugger! Your help makes this project better for everyone.
