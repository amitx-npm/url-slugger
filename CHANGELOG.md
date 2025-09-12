# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial release of url-slugger
- Core slugify functionality with comprehensive options
- Unicode support for accented characters and special symbols
- Customizable separators, case handling, and length limiting
- Custom character replacements
- TypeScript support with full type definitions
- Dual ESM/CJS exports
- Zero runtime dependencies
- 100% test coverage with comprehensive edge case handling
- Performance optimizations and benchmarks
- Automated CI/CD pipeline with semantic-release
- Comprehensive documentation and examples

### Features

- Convert strings to URL-friendly slugs
- Handle accented characters (café → cafe)
- Support for currency symbols ($ → dollar)
- Math symbols (+ → plus, = → equals)
- Ampersand replacement (& → and)
- Customizable word separators (-, \_, ., etc.)
- Case preservation options
- Maximum length limiting with smart truncation
- Custom character replacement rules
- Strict mode for separator normalization
- Trimming of leading/trailing separators

### Performance

- Optimized for high-frequency usage
- Memory efficient with large inputs
- Benchmarked against existing solutions
- Handles 10,000+ operations per second

### Developer Experience

- Full TypeScript support
- Comprehensive JSDoc documentation
- Extensive test suite with edge cases
- Real-world usage examples
- Migration guides from other libraries
- Troubleshooting documentation

## [1.0.0] - 2024-12-09

### Added

- Initial release
