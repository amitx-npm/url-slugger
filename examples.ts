/**
 * TypeScript Examples for url-slugger
 * 
 * This file demonstrates various usage patterns and TypeScript integration
 * for the url-slugger package.
 */

import slugify, { type SlugifyOptions, type SlugifyInput } from './src/index';

// Basic usage examples
console.log('=== Basic Usage ===');
console.log(slugify('Hello World')); // 'hello-world'
console.log(slugify('Café & Restaurant')); // 'cafe-and-restaurant'
console.log(slugify('Price: $29.99')); // 'price-dollar29-99'

// TypeScript type safety examples
console.log('\n=== TypeScript Type Safety ===');

// Valid inputs
const validInputs: SlugifyInput[] = [
  'Hello World',
  123,
  null,
  undefined,
];

validInputs.forEach((input) => {
  console.log(`Input: ${input} -> Output: ${slugify(input)}`);
});

// Options with full type safety
console.log('\n=== Options with Type Safety ===');

const options: SlugifyOptions = {
  separator: '_',
  lowercase: false,
  maxLength: 20,
  replacements: {
    '&': 'and',
    '@': 'at',
  },
  trim: true,
  strict: true,
};

console.log(slugify('Hello & World @ 2024', options)); // 'Hello_and_World_at_2024'

// Real-world usage patterns
console.log('\n=== Real-World Usage Patterns ===');

// Blog post URL generation
function createBlogPostUrl(title: string): string {
  const slug = slugify(title, { maxLength: 50 });
  return `https://blog.example.com/posts/${slug}`;
}

console.log(createBlogPostUrl('How to Build a REST API with Node.js'));
// https://blog.example.com/posts/how-to-build-a-rest-api-with-node-js

// Product URL generation
function createProductUrl(name: string, id: number): string {
  const slug = slugify(name, { maxLength: 30 });
  return `https://shop.example.com/products/${slug}-${id}`;
}

console.log(createProductUrl('iPhone 15 Pro Max (256GB)', 12345));
// https://shop.example.com/products/iphone-15-pro-max-256gb-12345

// File name generation
function createFileName(title: string, extension: string = 'txt'): string {
  const slug = slugify(title, {
    separator: '_',
    maxLength: 50,
  });
  return `${slug}.${extension}`;
}

console.log(createFileName('Meeting Notes - Q1 Planning', 'pdf'));
// meeting_notes_q1_planning.pdf

// Internationalization examples
console.log('\n=== Internationalization ===');

const internationalTexts = [
  'Café Français',
  'Straße München',
  'Åse Øst Æble',
  'Ñoño niño',
  'İstanbul Ğüzel',
];

internationalTexts.forEach((text) => {
  console.log(`${text} -> ${slugify(text)}`);
});

// Advanced customization
console.log('\n=== Advanced Customization ===');

// Custom replacement for specific domain
const seoOptions: SlugifyOptions = {
  replacements: {
    '&': 'and',
    '+': 'plus',
    '#': 'number',
    '%': 'percent',
    '©': 'copyright',
    '®': 'registered',
    '™': 'trademark',
  },
  maxLength: 60,
  separator: '-',
};

console.log(slugify('React.js + Vue.js: A Comparison © 2024', seoOptions));
// react-js-plus-vue-js-a-comparison-copyright-2024

// Error handling and edge cases
console.log('\n=== Error Handling ===');

const edgeCases: SlugifyInput[] = [
  '',
  null,
  undefined,
  0,
  false as any,
  [] as any,
  {} as any,
  '!@#$%^&*()',
  '   ',
  '---',
];

edgeCases.forEach((input) => {
  try {
    const result = slugify(input);
    console.log(`Input: ${JSON.stringify(input)} -> Output: "${result}"`);
  } catch (error) {
    console.error(`Error with input ${JSON.stringify(input)}:`, error);
  }
});

// Performance demonstration
console.log('\n=== Performance Test ===');

const performanceTest = () => {
  const testString = 'Hello World with special chars !@#$%^&*()';
  const iterations = 10000;
  
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    slugify(testString);
  }
  const end = performance.now();
  
  const avgTime = (end - start) / iterations;
  console.log(`Processed ${iterations} slugs in ${(end - start).toFixed(2)}ms`);
  console.log(`Average time per slug: ${avgTime.toFixed(4)}ms`);
};

performanceTest();

// Generic function example
console.log('\n=== Generic Function Usage ===');

function processItems<T>(
  items: T[],
  getName: (item: T) => string,
  options?: SlugifyOptions
): Array<{ item: T; slug: string }> {
  return items.map((item) => ({
    item,
    slug: slugify(getName(item), options),
  }));
}

interface BlogPost {
  id: number;
  title: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  { id: 1, title: 'Getting Started with TypeScript', author: 'John Doe' },
  { id: 2, title: 'Advanced React Patterns', author: 'Jane Smith' },
  { id: 3, title: 'Node.js Best Practices', author: 'Bob Johnson' },
];

const processedPosts = processItems(
  blogPosts,
  (post) => post.title,
  { maxLength: 30 }
);

processedPosts.forEach(({ item, slug }) => {
  console.log(`Post: "${item.title}" -> Slug: "${slug}"`);
});

// Class-based usage
console.log('\n=== Class-based Usage ===');

class UrlGenerator {
  private baseUrl: string;
  private defaultOptions: SlugifyOptions;

  constructor(baseUrl: string, options: SlugifyOptions = {}) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.defaultOptions = options;
  }

  generateUrl(path: string, customOptions?: SlugifyOptions): string {
    const options = { ...this.defaultOptions, ...customOptions };
    const slug = slugify(path, options);
    return `${this.baseUrl}/${slug}`;
  }

  generateProductUrl(name: string, category: string, id: number): string {
    const categorySlug = slugify(category, this.defaultOptions);
    const nameSlug = slugify(name, { ...this.defaultOptions, maxLength: 40 });
    return `${this.baseUrl}/${categorySlug}/${nameSlug}-${id}`;
  }
}

const urlGen = new UrlGenerator('https://example.com', {
  separator: '-',
  maxLength: 50,
});

console.log(urlGen.generateUrl('About Us & Contact Information'));
// https://example.com/about-us-and-contact-information

console.log(urlGen.generateProductUrl('MacBook Pro 16"', 'Laptops & Computers', 12345));
// https://example.com/laptops-and-computers/macbook-pro-16-12345

console.log('\n=== Examples Complete ===');