# url-slugger

[![npm version](https://img.shields.io/npm/v/url-slugger.svg)](https://www.npmjs.com/package/url-slugger)
[![npm downloads](https://img.shields.io/npm/dm/url-slugger.svg)](https://www.npmjs.com/package/url-slugger)
[![CI](https://github.com/amitx-npm/url-slugger/actions/workflows/ci.yml/badge.svg)](https://github.com/amitx-npm/url-slugger/actions)
[![license: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

Lightweight, dependency-free utility to convert strings to URL-friendly slugs with advanced customization options.

## Install

```bash
npm i url-slugger
# or
pnpm add url-slugger
# or
yarn add url-slugger
```

## Usage

ESM:

```ts
import slugify from 'url-slugger';

// Example usage
slugify('example');
```

CommonJS:

```js
const slugify = require('url-slugger');

// Example usage
slugify('example');
```

TypeScript:

```ts
import { slugify } from 'url-slugger';

const result: string = slugify('example');
```

## API

### `slugify(input: InputType): OutputType`

Converts a string into a URL-friendly slug

## Examples

```ts
// Basic usage
slugify('input'); // "output"

// Advanced usage
slugify('input', { option: true }); // "advanced output"
```

## Why this package?

- **Dependency-free** and **tiny**
- **Dual ESM/CJS** with TypeScript types
- **Robust edge-case handling**
- **100% test coverage**

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

ISC © Amit
