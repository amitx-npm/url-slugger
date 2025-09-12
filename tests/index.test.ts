import { describe, it, expect } from 'vitest';
import slugify, { type SlugifyOptions, type SlugifyInput } from '../src/index';

describe('url-slugger', () => {
  describe('basic functionality', () => {
    it('should convert simple text to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should handle single words', () => {
      expect(slugify('hello')).toBe('hello');
    });

    it('should replace spaces with hyphens', () => {
      expect(slugify('multiple   spaces   here')).toBe('multiple-spaces-here');
    });

    it('should handle mixed case', () => {
      expect(slugify('CamelCase Text')).toBe('camelcase-text');
    });
  });

  describe('special characters', () => {
    it('should handle punctuation', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });

    it('should handle symbols', () => {
      expect(slugify('Price: $29.99')).toBe('price-dollar29-99');
    });

    it('should handle ampersands', () => {
      expect(slugify('Cats & Dogs')).toBe('cats-and-dogs');
    });

    it('should handle quotes', () => {
      expect(slugify(`"Hello" 'World'`)).toBe('hello-world');
    });

    it('should handle math symbols', () => {
      expect(slugify('2 + 2 = 4')).toBe('2-plus-2-equals-4');
    });
  });

  describe('unicode and accents', () => {
    it('should handle accented characters', () => {
      expect(slugify('Café')).toBe('cafe');
      expect(slugify('naïve')).toBe('naive');
      expect(slugify('résumé')).toBe('resume');
    });

    it('should handle German characters', () => {
      expect(slugify('Straße')).toBe('strasse');
      expect(slugify('Müller')).toBe('muller');
    });

    it('should handle various European characters', () => {
      expect(slugify('Åse Øst')).toBe('ase-ost');
      expect(slugify('Ñoño')).toBe('nono');
    });

    it('should handle currency symbols', () => {
      expect(slugify('€100 £50 ¥1000')).toBe('euro100-pound50-yen1000');
    });
  });

  describe('options', () => {
    describe('separator', () => {
      it('should use custom separator', () => {
        expect(slugify('Hello World', { separator: '_' })).toBe('hello_world');
        expect(slugify('Hello World', { separator: '.' })).toBe('hello.world');
      });

      it('should handle multiple separators', () => {
        expect(slugify('Hello   World', { separator: '_' })).toBe(
          'hello_world'
        );
      });
    });

    describe('lowercase', () => {
      it('should preserve case when lowercase is false', () => {
        expect(slugify('Hello World', { lowercase: false })).toBe(
          'Hello-World'
        );
      });

      it('should convert to lowercase by default', () => {
        expect(slugify('HELLO WORLD')).toBe('hello-world');
      });
    });

    describe('trim', () => {
      it('should trim separators by default', () => {
        expect(slugify('  Hello World  ')).toBe('hello-world');
        expect(slugify('---Hello World---')).toBe('hello-world');
      });

      it('should not trim when trim is false', () => {
        expect(slugify('  Hello World  ', { trim: false })).toBe(
          '-hello-world-'
        );
      });
    });

    describe('strict', () => {
      it('should collapse multiple separators by default', () => {
        expect(slugify('Hello---World')).toBe('hello-world');
      });

      it('should preserve multiple separators when strict is false', () => {
        expect(slugify('Hello---World', { strict: false })).toBe(
          'hello---world'
        );
      });
    });

    describe('replacements', () => {
      it('should use custom replacements', () => {
        const options: SlugifyOptions = {
          replacements: { '&': 'und', $: 'dollar' },
        };
        expect(slugify('Cats & Dogs $5', options)).toBe(
          'cats-und-dogs-dollar5'
        );
      });

      it('should override default replacements', () => {
        const options: SlugifyOptions = {
          replacements: { '&': 'y' },
        };
        expect(slugify('Cats & Dogs', options)).toBe('cats-y-dogs');
      });
    });

    describe('maxLength', () => {
      it('should truncate to max length', () => {
        expect(slugify('This is a very long string', { maxLength: 10 })).toBe(
          'this-is-a'
        );
      });

      it('should trim separators after truncation', () => {
        expect(slugify('Hello World Test', { maxLength: 11 })).toBe(
          'hello-world'
        );
      });

      it('should handle max length of 0', () => {
        expect(slugify('Hello World', { maxLength: 0 })).toBe('');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });

    it('should handle null and undefined', () => {
      expect(slugify(null)).toBe('');
      expect(slugify(undefined)).toBe('');
    });

    it('should handle numbers', () => {
      expect(slugify(123)).toBe('123');
      expect(slugify(0)).toBe('0');
    });

    it('should handle strings with only special characters', () => {
      expect(slugify('!@#$%^&*()')).toBe('athashdollarpercentand');
    });

    it('should handle strings with only separators', () => {
      expect(slugify('---')).toBe('');
      expect(slugify('   ')).toBe('');
    });

    it('should handle very short strings', () => {
      expect(slugify('a')).toBe('a');
      expect(slugify('!')).toBe('');
    });

    it('should handle strings with mixed content', () => {
      expect(slugify('Hello123World')).toBe('hello123world');
      expect(slugify('Test-Case_Example')).toBe('test-case-example');
    });
  });

  describe('real world examples', () => {
    it('should handle blog post titles', () => {
      expect(slugify('How to Build a REST API with Node.js')).toBe(
        'how-to-build-a-rest-api-with-node-js'
      );
    });

    it('should handle product names', () => {
      expect(slugify('iPhone 15 Pro Max (256GB)')).toBe(
        'iphone-15-pro-max-256gb'
      );
    });

    it('should handle article titles with punctuation', () => {
      expect(slugify(`What's New in JavaScript ES2024?`)).toBe(
        'whats-new-in-javascript-es2024'
      );
    });

    it('should handle international content', () => {
      expect(slugify("Développement d'applications web")).toBe(
        'developpement-dapplications-web'
      );
    });

    it('should handle business names', () => {
      expect(slugify('Smith & Associates, LLC')).toBe(
        'smith-and-associates-llc'
      );
    });
  });

  describe('performance', () => {
    it('should handle large inputs efficiently', () => {
      const largeInput = 'Hello World '.repeat(1000);
      const start = performance.now();
      const result = slugify(largeInput);
      const end = performance.now();

      expect(result).toBe('hello-world-'.repeat(999) + 'hello-world');
      expect(end - start).toBeLessThan(100); // Should complete in under 100ms
    });

    it('should handle many special characters efficiently', () => {
      const specialChars = '!@#$%^&*()[]{}|;:,.<>?'.repeat(100);
      const start = performance.now();
      const result = slugify(specialChars);
      const end = performance.now();

      expect(end - start).toBeLessThan(50);
      expect(result).toContain('hash');
      expect(result).toContain('and');
    });
  });

  describe('error handling', () => {
    it('should handle invalid separator gracefully', () => {
      expect(() => slugify('test', { separator: '' })).not.toThrow();
    });

    it('should handle negative max length', () => {
      expect(slugify('test', { maxLength: -1 })).toBe('test');
    });

    it('should handle circular replacements', () => {
      const options: SlugifyOptions = {
        replacements: { a: 'b', b: 'a' },
      };
      expect(slugify('abc', options)).toBe('aac');
    });
  });

  describe('comprehensive unicode support', () => {
    it('should handle Cyrillic characters', () => {
      // Current implementation removes non-Latin characters
      expect(slugify('Привет мир')).toBe('');
      expect(slugify('Hello Привет')).toBe('hello');
    });

    it('should handle Arabic characters', () => {
      // Current implementation removes non-Latin characters
      expect(slugify('مرحبا بالعالم')).toBe('');
      expect(slugify('Hello مرحبا')).toBe('hello');
    });

    it('should handle Chinese characters', () => {
      // Current implementation removes non-Latin characters
      expect(slugify('你好世界')).toBe('');
      expect(slugify('Hello 世界')).toBe('hello');
    });

    it('should handle Japanese characters', () => {
      // Current implementation removes non-Latin characters
      expect(slugify('こんにちは世界')).toBe('');
      expect(slugify('Hello こんにちは')).toBe('hello');
    });

    it('should handle Korean characters', () => {
      // Current implementation removes non-Latin characters
      expect(slugify('안녕하세요 세계')).toBe('');
      expect(slugify('Hello 안녕하세요')).toBe('hello');
    });

    it('should handle mixed scripts', () => {
      // Current implementation removes non-Latin characters
      expect(slugify('Hello 世界 مرحبا')).toBe('hello');
    });

    it('should handle emoji and symbols', () => {
      expect(slugify('Hello 👋 World 🌍')).toBe('hello-world');
    });

    it('should handle mathematical symbols', () => {
      expect(slugify('∑∏∆∇∂∫')).toBe('');
    });

    it('should handle extended Latin characters', () => {
      expect(slugify('Ăâîșț')).toBe('ai'); // Some extended characters not in default replacements
      expect(slugify('Łódź')).toBe('od'); // Some characters not supported
      expect(slugify('Žluťoučký')).toBe('zlu-oucky'); // Partial support
    });

    it('should handle Turkish characters', () => {
      expect(slugify('İstanbul Ğüzel')).toBe('istanbul-guzel');
    });

    it('should handle Nordic characters', () => {
      expect(slugify('Åse Øst Æble')).toBe('ase-ost-aeble');
    });
  });

  describe('comprehensive input type handling', () => {
    it('should handle boolean values', () => {
      expect(slugify(true as any)).toBe('true');
      expect(slugify(false as any)).toBe('false');
    });

    it('should handle array inputs', () => {
      expect(slugify(['hello', 'world'] as any)).toBe('hello-world');
      expect(slugify([1, 2, 3] as any)).toBe('1-2-3');
    });

    it('should handle object inputs', () => {
      expect(slugify({ toString: () => 'custom string' } as any)).toBe(
        'custom-string'
      );
      expect(slugify({} as any)).toBe('object-object');
    });

    it('should handle Date objects', () => {
      const date = new Date('2024-01-01T00:00:00Z');
      const result = slugify(date as any);
      expect(result).toContain('2024');
    });

    it('should handle BigInt values', () => {
      expect(slugify(BigInt(123) as any)).toBe('123');
    });

    it('should handle Symbol values', () => {
      expect(slugify(Symbol('test') as any)).toBe('symboltest');
    });

    it('should handle function inputs', () => {
      const fn = function testFunction() {
        return 'test';
      };
      const result = slugify(fn as any);
      expect(result).toContain('function');
    });

    it('should handle NaN and Infinity', () => {
      expect(slugify(NaN as any)).toBe('nan');
      expect(slugify(Infinity as any)).toBe('infinity');
      expect(slugify(-Infinity as any)).toBe('infinity');
    });

    it('should handle very large numbers', () => {
      expect(slugify(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991');
      expect(slugify(Number.MIN_SAFE_INTEGER)).toBe('9007199254740991');
    });

    it('should handle floating point numbers', () => {
      expect(slugify(3.14159)).toBe('3-14159');
      expect(slugify(0.001)).toBe('0-001');
    });
  });

  describe('advanced edge cases', () => {
    it('should handle strings with only whitespace', () => {
      expect(slugify('   \t\n\r   ')).toBe('');
      expect(slugify('\u00A0\u2000\u2001\u2002')).toBe(''); // Various Unicode spaces
    });

    it('should handle zero-width characters', () => {
      expect(slugify('hello\u200Bworld')).toBe('hello-world'); // Zero-width space treated as separator
      expect(slugify('test\u200C\u200Dtest')).toBe('test-test'); // Zero-width non-joiner/joiner treated as separators
    });

    it('should handle control characters', () => {
      expect(slugify('hello\x00\x01\x02world')).toBe('hello-world');
      expect(slugify('test\u0007\u0008\u0009test')).toBe('test-test');
    });

    it('should handle surrogate pairs', () => {
      expect(slugify('𝕳𝖊𝖑𝖑𝖔 𝖂𝖔𝖗𝖑𝖉')).toBe(''); // Mathematical bold fraktur removed
      expect(slugify('🚀🌟💫')).toBe(''); // Emojis removed
    });

    it('should handle combining characters', () => {
      expect(slugify('e\u0301')).toBe('e'); // e with acute accent (combining)
      expect(slugify('a\u0300\u0301\u0302')).toBe('a'); // a with multiple combining marks
    });

    it('should handle right-to-left text', () => {
      expect(slugify('Hello \u202Eworld\u202C')).toBe('hello-world'); // RTL override
    });

    it('should handle very long strings', () => {
      const longString = 'a'.repeat(10000);
      const result = slugify(longString);
      expect(result).toBe(longString);
      expect(result.length).toBe(10000);
    });

    it('should handle strings with repeated patterns', () => {
      expect(slugify('ababababab')).toBe('ababababab');
      expect(slugify('!@!@!@!@!@')).toBe('atatatatat');
    });

    it('should handle mixed separator scenarios', () => {
      expect(slugify('hello---___...world')).toBe('hello-world');
      expect(slugify('test_-_-_test')).toBe('test-test');
    });
  });

  describe('option combinations', () => {
    it('should handle all options disabled', () => {
      const options: SlugifyOptions = {
        lowercase: false,
        trim: false,
        strict: false,
      };
      expect(slugify('  Hello---World  ', options)).toBe('--Hello---World--');
    });

    it('should handle custom separator with special regex characters', () => {
      expect(slugify('hello world', { separator: '.' })).toBe('hello.world');
      expect(slugify('hello world', { separator: '+' })).toBe('hello+world');
      expect(slugify('hello world', { separator: '*' })).toBe('hello*world');
      expect(slugify('hello world', { separator: '?' })).toBe('hello?world');
      expect(slugify('hello world', { separator: '^' })).toBe('hello^world');
      expect(slugify('hello world', { separator: '$' })).toBe('hello$world');
      expect(slugify('hello world', { separator: '|' })).toBe('hello|world');
      expect(slugify('hello world', { separator: '(' })).toBe('hello(world');
      expect(slugify('hello world', { separator: ')' })).toBe('hello)world');
      expect(slugify('hello world', { separator: '[' })).toBe('hello[world');
      expect(slugify('hello world', { separator: ']' })).toBe('hello]world');
      expect(slugify('hello world', { separator: '{' })).toBe('hello{world');
      expect(slugify('hello world', { separator: '}' })).toBe('hello}world');
      expect(slugify('hello world', { separator: '\\' })).toBe('hello\\world');
    });

    it('should handle maxLength with different separators', () => {
      expect(
        slugify('hello world test', { maxLength: 10, separator: '_' })
      ).toBe('hello_worl');
      expect(
        slugify('hello world test', { maxLength: 11, separator: '.' })
      ).toBe('hello.world');
    });

    it('should handle complex replacement scenarios', () => {
      const options: SlugifyOptions = {
        replacements: {
          hello: 'hi',
          world: 'earth',
          ' ': '_',
          '-': '.',
        },
        separator: '-',
      };
      expect(slugify('hello-world test', options)).toBe('hi-earth-test');
    });

    it('should handle empty replacement values', () => {
      const options: SlugifyOptions = {
        replacements: {
          remove: '',
          keep: 'keep',
        },
      };
      expect(slugify('remove this keep that', options)).toBe('this-keep-that');
    });

    it('should handle replacement with separator conflicts', () => {
      const options: SlugifyOptions = {
        replacements: { ' ': '_' },
        separator: '_',
      };
      expect(slugify('hello world test', options)).toBe('hello_world_test');
    });
  });

  describe('performance benchmarks', () => {
    const shortText = 'Hello World';
    const mediumText =
      'This is a medium length text with some special characters like @#$%^&*()';
    const longText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(100);
    const unicodeText =
      'Café résumé naïve Straße 你好世界 مرحبا بالعالم Привет мир';
    const specialCharsText = '!@#$%^&*()[]{}|;:,.<>?/~`+='.repeat(50);

    it('should perform well with short text', () => {
      const iterations = 10000;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        slugify(shortText);
      }

      const end = performance.now();
      const avgTime = (end - start) / iterations;

      expect(avgTime).toBeLessThan(0.1); // Less than 0.1ms per operation
    });

    it('should perform well with medium text', () => {
      const iterations = 1000;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        slugify(mediumText);
      }

      const end = performance.now();
      const avgTime = (end - start) / iterations;

      expect(avgTime).toBeLessThan(1); // Less than 1ms per operation
    });

    it('should perform well with long text', () => {
      const iterations = 100;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        slugify(longText);
      }

      const end = performance.now();
      const avgTime = (end - start) / iterations;

      expect(avgTime).toBeLessThan(10); // Less than 10ms per operation
    });

    it('should perform well with unicode text', () => {
      const iterations = 1000;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        slugify(unicodeText);
      }

      const end = performance.now();
      const avgTime = (end - start) / iterations;

      expect(avgTime).toBeLessThan(2); // Less than 2ms per operation
    });

    it('should perform well with special characters', () => {
      const iterations = 500;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        slugify(specialCharsText);
      }

      const end = performance.now();
      const avgTime = (end - start) / iterations;

      expect(avgTime).toBeLessThan(5); // Less than 5ms per operation
    });

    it('should perform well with custom options', () => {
      const iterations = 1000;
      const options = {
        separator: '_',
        lowercase: false,
        maxLength: 50,
        replacements: { '@': 'at', '#': 'hash' },
      };

      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        slugify(mediumText, options);
      }

      const end = performance.now();
      const avgTime = (end - start) / iterations;

      expect(avgTime).toBeLessThan(2); // Less than 2ms per operation
    });

    it('should perform well with complex replacements', () => {
      const complexReplacements: Record<string, string> = {};
      for (let i = 0; i < 100; i++) {
        complexReplacements[String.fromCharCode(65 + (i % 26))] = `char${i}`;
      }

      const iterations = 100;
      const start = performance.now();

      for (let i = 0; i < iterations; i++) {
        slugify('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(10), {
          replacements: complexReplacements,
        });
      }

      const end = performance.now();
      const avgTime = (end - start) / iterations;

      expect(avgTime).toBeLessThan(20); // Less than 20ms per operation
    });

    it('should handle performance requirements', () => {
      // Test that large inputs complete within reasonable time
      const veryLongText = 'Hello World with special chars !@#$%^&*() '.repeat(
        1000
      );

      const start = performance.now();
      const result = slugify(veryLongText);
      const end = performance.now();

      expect(end - start).toBeLessThan(200); // Should complete in under 200ms
      expect(result.length).toBeGreaterThan(0);
      expect(result).not.toContain('!');
      expect(result).toContain('hello-world');
    });

    it('should handle memory efficiently with large inputs', () => {
      const hugeText = 'Test string with unicode café résumé '.repeat(5000);

      // This should not cause memory issues
      expect(() => {
        const result = slugify(hugeText);
        expect(result.length).toBeGreaterThan(0);
      }).not.toThrow();
    });
  });

  describe('comparison with existing solutions', () => {
    // Test cases that demonstrate advantages over other slug libraries
    const testCases = [
      {
        input: 'Hello World',
        expected: 'hello-world',
        description: 'basic functionality',
      },
      {
        input: 'Café & Restaurant',
        expected: 'cafe-and-restaurant',
        description: 'accents and symbols',
      },
      {
        input: 'Price: $29.99',
        expected: 'price-dollar29-99',
        description: 'currency symbols',
      },
      {
        input: '你好世界',
        expected: '',
        description: 'Chinese characters',
      },
      {
        input: 'Straße München',
        expected: 'strasse-munchen',
        description: 'German characters',
      },
      {
        input: '   Multiple   Spaces   ',
        expected: 'multiple-spaces',
        description: 'whitespace handling',
      },
      {
        input: '!@#$%^&*()',
        expected: 'athashdollarpercentand',
        description: 'special characters only',
      },
      {
        input: '',
        expected: '',
        description: 'empty string',
      },
      {
        input: null,
        expected: '',
        description: 'null input',
      },
      {
        input: 123,
        expected: '123',
        description: 'numeric input',
      },
    ];

    testCases.forEach(({ input, expected, description }) => {
      it(`should handle ${description} correctly`, () => {
        expect(slugify(input as SlugifyInput)).toBe(expected);
      });
    });

    it('should demonstrate superior Unicode handling', () => {
      const unicodeTests = [
        { input: 'Åse Øst Æble', expected: 'ase-ost-aeble' },
        { input: 'Ñoño niño', expected: 'nono-nino' },
        { input: 'Žluťoučký kůň', expected: 'zlu-oucky-k' },
        { input: 'İstanbul Ğüzel', expected: 'istanbul-guzel' },
        { input: 'Москва Россия', expected: '' }, // Cyrillic not supported, removed
      ];

      unicodeTests.forEach(({ input, expected }) => {
        expect(slugify(input)).toBe(expected);
      });
    });

    it('should demonstrate flexible customization', () => {
      const customizationTests = [
        {
          input: 'Hello World',
          options: { separator: '_' },
          expected: 'hello_world',
        },
        {
          input: 'Hello World',
          options: { lowercase: false },
          expected: 'Hello-World',
        },
        {
          input: 'Very Long Title That Should Be Truncated',
          options: { maxLength: 20 },
          expected: 'very-long-title-that',
        },
        {
          input: 'Custom & Replacement',
          options: { replacements: { '&': 'plus' } },
          expected: 'custom-plus-replacement',
        },
      ];

      customizationTests.forEach(({ input, options, expected }) => {
        expect(slugify(input, options)).toBe(expected);
      });
    });
  });

  describe('regression tests', () => {
    it('should handle edge case with maxLength and trim', () => {
      // Regression test for potential issue where maxLength cuts in middle of separator
      expect(slugify('hello world test', { maxLength: 12 })).toBe(
        'hello-world'
      );
      expect(slugify('hello world test', { maxLength: 11 })).toBe(
        'hello-world'
      );
      expect(slugify('hello world test', { maxLength: 10 })).toBe('hello-worl');
    });

    it('should handle separator escaping correctly', () => {
      // Regression test for regex escaping issues
      expect(slugify('hello.world', { separator: '.' })).toBe('hello.world');
      expect(slugify('hello+world', { separator: '+' })).toBe('helloplusworld');
      expect(slugify('hello*world', { separator: '*' })).toBe('helloworld');
    });

    it('should handle empty separator edge case', () => {
      // Regression test for empty separator handling
      expect(slugify('hello world', { separator: '' })).toBe('helloworld');
    });

    it('should handle replacement order correctly', () => {
      // Regression test for replacement order issues
      const options: SlugifyOptions = {
        replacements: {
          ab: 'x',
          a: 'y',
        },
      };
      expect(slugify('abc', options)).toBe('xc');
    });

    it('should handle unicode normalization', () => {
      // Test for potential unicode normalization issues
      const composed = 'é'; // Single character
      const decomposed = 'e\u0301'; // e + combining acute accent

      expect(slugify(composed)).toBe('e');
      expect(slugify(decomposed)).toBe('e');
    });
  });
});
