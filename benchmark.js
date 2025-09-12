#!/usr/bin/env node

/**
 * Simple benchmark script to compare url-slugger performance
 * Run with: node benchmark.js
 */

const { performance } = require('perf_hooks');
const slugify = require('./dist/index.js').default;

// Test data
const testCases = [
  'Hello World',
  'This is a longer string with special characters !@#$%^&*()',
  'Café & Restaurant - Price: $29.99',
  'How to Build a REST API with Node.js in 2024',
  'Straße München Ñoño niño',
  '   Multiple   Spaces   and---Separators___Here   ',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10),
];

function benchmark(name, fn, iterations = 10000) {
  // Warmup
  for (let i = 0; i < 100; i++) {
    testCases.forEach(fn);
  }

  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    testCases.forEach(fn);
  }

  const end = performance.now();
  const totalTime = end - start;
  const avgTime = totalTime / (iterations * testCases.length);

  console.log(`${name}:`);
  console.log(`  Total time: ${totalTime.toFixed(2)}ms`);
  console.log(`  Average per operation: ${avgTime.toFixed(4)}ms`);
  console.log(`  Operations per second: ${(1000 / avgTime).toFixed(0)}`);
  console.log('');
}

console.log('URL-Slugger Performance Benchmark');
console.log('=================================');
console.log(`Test cases: ${testCases.length}`);
console.log(`Iterations per test: 10,000`);
console.log(`Total operations: ${testCases.length * 10000}`);
console.log('');

// Benchmark our implementation
benchmark('url-slugger (default options)', (text) => slugify(text));

benchmark('url-slugger (custom options)', (text) =>
  slugify(text, {
    separator: '_',
    lowercase: false,
    maxLength: 50,
    replacements: { '&': 'and', $: 'dollar' },
  })
);

// Simple baseline comparison (basic string operations)
benchmark('baseline (simple replace)', (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
});

console.log('Performance Summary:');
console.log(
  '- url-slugger provides comprehensive Unicode and special character handling'
);
console.log('- Flexible options for customization');
console.log('- Consistent performance across different input types');
console.log('- Zero dependencies');
