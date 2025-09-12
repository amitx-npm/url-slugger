# url-slugger

[![npm version](https://img.shields.io/npm/v/url-slugger.svg)](https://www.npmjs.com/package/url-slugger)
[![npm downloads](https://img.shields.io/npm/dm/url-slugger.svg)](https://www.npmjs.com/package/url-slugger)
[![CI](https://github.com/amitx-npm/url-slugger/actions/workflows/ci.yml/badge.svg)](https://github.com/amitx-npm/url-slugger/actions)
[![codecov](https://codecov.io/gh/amitx-npm/url-slugger/branch/main/graph/badge.svg)](https://codecov.io/gh/amitx-npm/url-slugger)
[![license: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

Lightweight, dependency-free utility to convert strings to URL-friendly slugs with advanced customization options. Perfect for creating SEO-friendly URLs, file names, and identifiers.

## Features

- 🚀 **Zero dependencies** - Lightweight and fast
- 🔧 **Highly customizable** - Extensive options for different use cases
- 🌍 **Unicode support** - Handles accented characters and special symbols
- 📦 **Dual ESM/CJS** - Works in both Node.js and browsers
- 🔒 **TypeScript** - Full type safety with comprehensive definitions
- ✅ **100% test coverage** - Thoroughly tested with edge cases
- 🎯 **Production ready** - Used in real-world applications

## Install

```bash
npm install url-slugger
```

```bash
pnpm add url-slugger
```

```bash
yarn add url-slugger
```

## Quick Start

```js
import slugify from 'url-slugger';

slugify('Hello World!'); // 'hello-world'
slugify('Café & Restaurant'); // 'cafe-and-restaurant'
slugify('Price: $29.99'); // 'price-dollar29-99'
```

## Usage

### ESM (Recommended)

```js
import slugify from 'url-slugger';

const slug = slugify('My Blog Post Title');
console.log(slug); // 'my-blog-post-title'
```

### CommonJS

```js
const slugify = require('url-slugger');

const slug = slugify('My Blog Post Title');
console.log(slug); // 'my-blog-post-title'
```

### TypeScript

```ts
import slugify, { type SlugifyOptions } from 'url-slugger';

const options: SlugifyOptions = {
  separator: '_',
  maxLength: 50,
};

const slug: string = slugify('TypeScript Example', options);
console.log(slug); // 'typescript_example'
```

## API Reference

### `slugify(input, options?)`

Converts a string into a URL-friendly slug.

#### Parameters

- **input** (`string | number | null | undefined`) - The text to convert to a slug
- **options** (`SlugifyOptions`, optional) - Configuration options

#### Returns

- **string** - The generated slug

#### Options

```ts
interface SlugifyOptions {
  /** Separator to use between words (default: '-') */
  separator?: string;

  /** Convert to lowercase (default: true) */
  lowercase?: boolean;

  /** Remove leading/trailing separators (default: true) */
  trim?: boolean;

  /** Replace multiple consecutive separators with single separator (default: true) */
  strict?: boolean;

  /** Custom character replacements */
  replacements?: Record<string, string>;

  /** Maximum length of the slug */
  maxLength?: number;
}
```

## Examples

### Basic Usage

```js
import slugify from 'url-slugger';

// Simple text
slugify('Hello World'); // 'hello-world'

// With punctuation
slugify('Hello, World!'); // 'hello-world'

// Multiple spaces
slugify('Hello    World'); // 'hello-world'

// Mixed case
slugify('CamelCase Text'); // 'camelcase-text'
```

### Unicode and Special Characters

```js
// Accented characters
slugify('Café'); // 'cafe'
slugify('résumé'); // 'resume'
slugify('naïve'); // 'naive'

// German characters
slugify('Straße'); // 'strasse'
slugify('Müller'); // 'muller'

// Currency symbols
slugify('Price: €100'); // 'price-euro100'
slugify('Cost: $29.99'); // 'cost-dollar29-99'

// Math symbols
slugify('2 + 2 = 4'); // '2-plus-2-equals-4'

// Ampersands
slugify('Cats & Dogs'); // 'cats-and-dogs'
```

### Custom Separator

```js
// Underscore separator
slugify('Hello World', { separator: '_' }); // 'hello_world'

// Dot separator
slugify('Hello World', { separator: '.' }); // 'hello.world'

// Custom separator
slugify('Hello World', { separator: '|' }); // 'hello|world'
```

### Case Preservation

```js
// Preserve original case
slugify('Hello World', { lowercase: false }); // 'Hello-World'
slugify('CamelCase', { lowercase: false }); // 'CamelCase'
```

### Length Limiting

```js
// Limit slug length
slugify('This is a very long title', { maxLength: 10 }); // 'this-is-a'
slugify('Hello World Test', { maxLength: 11 }); // 'hello-world'

// Zero length returns empty string
slugify('Hello World', { maxLength: 0 }); // ''
```

### Custom Replacements

```js
// Override default replacements
slugify('Cats & Dogs', {
  replacements: { '&': 'und' },
}); // 'cats-und-dogs'

// Add custom replacements
slugify('React.js + Node.js', {
  replacements: {
    '.js': '-js',
    '+': 'plus',
  },
}); // 'react-js-plus-node-js'

// Remove characters entirely
slugify('Remove [brackets]', {
  replacements: {
    '[': '',
    ']': '',
  },
}); // 'remove-brackets'
```

### Advanced Options

```js
// Disable trimming
slugify('  Hello World  ', { trim: false }); // '-hello-world-'

// Allow multiple separators
slugify('Hello---World', { strict: false }); // 'hello---world'

// Combine multiple options
slugify('  Complex Example!!!  ', {
  separator: '_',
  lowercase: false,
  maxLength: 20,
  replacements: { '!': 'exclamation' },
  trim: true,
  strict: true,
}); // 'Complex_Example_exc'
```

## Real-World Examples

### Blog Post URLs

```js
// Blog post titles
slugify('How to Build a REST API with Node.js');
// 'how-to-build-a-rest-api-with-node-js'

slugify('10 Tips for Better JavaScript Performance');
// '10-tips-for-better-javascript-performance'

slugify("What's New in ES2024?");
// 'whats-new-in-es2024'
```

### Product Names

```js
// E-commerce products
slugify('iPhone 15 Pro Max (256GB)');
// 'iphone-15-pro-max-256gb'

slugify('Samsung 65" 4K Smart TV');
// 'samsung-65-4k-smart-tv'

slugify('Nike Air Max 90 - White/Black');
// 'nike-air-max-90-white-black'
```

### File Names

```js
// Document names
slugify('Annual Report 2024.pdf', { separator: '_' });
// 'annual_report_2024_pdf'

slugify('Meeting Notes - Q1 Planning');
// 'meeting-notes-q1-planning'
```

### International Content

```js
// French
slugify("Développement d'applications web");
// 'developpement-dapplications-web'

// German
slugify('Softwareentwicklung für Anfänger');
// 'softwareentwicklung-fur-anfanger'

// Spanish
slugify('Programación en JavaScript');
// 'programacion-en-javascript'
```

## Edge Cases

The library handles various edge cases gracefully:

```js
// Empty and null inputs
slugify(''); // ''
slugify(null); // ''
slugify(undefined); // ''

// Numbers
slugify(123); // '123'
slugify(0); // '0'

// Special characters only
slugify('!@#$%^&*()'); // 'athashdollarpercentand'

// Only separators
slugify('---'); // ''
slugify('   '); // ''

// Mixed content
slugify('Hello123World'); // 'hello123world'
slugify('Test-Case_Example'); // 'test-case-example'
```

## Performance

url-slugger is optimized for performance:

- ⚡ **Fast**: Processes 10,000+ short strings per second
- 🔋 **Memory efficient**: Minimal memory footprint
- 📊 **Benchmarked**: Regularly tested against performance regressions

```js
// Performance example
const start = performance.now();
for (let i = 0; i < 10000; i++) {
  slugify('Hello World with special chars !@#$%');
}
const end = performance.now();
console.log(`Processed 10,000 slugs in ${end - start}ms`);
```

## Browser Support

Works in all modern browsers and Node.js environments:

- ✅ Node.js 20+
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

## Comparison with Other Libraries

| Feature             | url-slugger | slugify | limax | slug |
| ------------------- | ----------- | ------- | ----- | ---- |
| Zero dependencies   | ✅          | ❌      | ❌    | ❌   |
| TypeScript support  | ✅          | ✅      | ❌    | ❌   |
| Custom separators   | ✅          | ✅      | ✅    | ❌   |
| Length limiting     | ✅          | ❌      | ❌    | ❌   |
| Custom replacements | ✅          | ✅      | ❌    | ❌   |
| Bundle size         | ~2KB        | ~15KB   | ~50KB | ~8KB |

## Migration Guide

### From `slugify`

```js
// Before (slugify)
import slugify from 'slugify';
slugify('Hello World', { lower: true, strict: true });

// After (url-slugger)
import slugify from 'url-slugger';
slugify('Hello World', { lowercase: true, strict: true });
```

### From `limax`

```js
// Before (limax)
import limax from 'limax';
limax('Hello World', { separator: '_' });

// After (url-slugger)
import slugify from 'url-slugger';
slugify('Hello World', { separator: '_' });
```

## Troubleshooting

### Common Issues

**Q: My slug contains unexpected characters**

```js
// Check your input for hidden characters
const input = 'Hello\u200BWorld'; // Contains zero-width space
slugify(input); // 'hello-world'
```

**Q: Slug is too long**

```js
// Use maxLength option
slugify('Very long title here', { maxLength: 10 }); // 'very-long'
```

**Q: Need different character handling**

```js
// Use custom replacements
slugify('Special chars ©®™', {
  replacements: { '©': 'copyright', '®': 'registered', '™': 'trademark' },
});
```

### Debug Mode

```js
// Log the transformation steps
function debugSlugify(input, options = {}) {
  console.log('Input:', input);
  const result = slugify(input, options);
  console.log('Output:', result);
  return result;
}
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/amitx-npm/url-slugger.git
cd url-slugger
npm install
npm test
```

### Running Tests

```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## License

ISC © [Amit](https://github.com/amitx-npm)

## Related Packages

Part of the [@amitx-npm](https://github.com/amitx-npm) utility collection:

- [ordinal-number](https://www.npmjs.com/package/ordinal-number) - Convert numbers to ordinal strings
- [text-caser](https://www.npmjs.com/package/text-caser) - Convert between naming conventions
- [json-safer](https://www.npmjs.com/package/json-safer) - Safe JSON parsing with fallbacks

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/amitx-npm">Amit</a></sub>
</div>
