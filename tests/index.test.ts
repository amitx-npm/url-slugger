import { describe, it, expect } from 'vitest';
import slugify, { type SlugifyOptions } from '../src/index';

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
        expect(slugify('Hello   World', { separator: '_' })).toBe('hello_world');
      });
    });

    describe('lowercase', () => {
      it('should preserve case when lowercase is false', () => {
        expect(slugify('Hello World', { lowercase: false })).toBe('Hello-World');
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
        expect(slugify('  Hello World  ', { trim: false })).toBe('-hello-world-');
      });
    });

    describe('strict', () => {
      it('should collapse multiple separators by default', () => {
        expect(slugify('Hello---World')).toBe('hello-world');
      });

      it('should preserve multiple separators when strict is false', () => {
        expect(slugify('Hello---World', { strict: false })).toBe('hello---world');
      });
    });

    describe('replacements', () => {
      it('should use custom replacements', () => {
        const options: SlugifyOptions = {
          replacements: { '&': 'und', '$': 'dollar' }
        };
        expect(slugify('Cats & Dogs $5', options)).toBe('cats-und-dogs-dollar5');
      });

      it('should override default replacements', () => {
        const options: SlugifyOptions = {
          replacements: { '&': 'y' }
        };
        expect(slugify('Cats & Dogs', options)).toBe('cats-y-dogs');
      });
    });

    describe('maxLength', () => {
      it('should truncate to max length', () => {
        expect(slugify('This is a very long string', { maxLength: 10 })).toBe('this-is-a');
      });

      it('should trim separators after truncation', () => {
        expect(slugify('Hello World Test', { maxLength: 11 })).toBe('hello-world');
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
      expect(slugify('How to Build a REST API with Node.js')).toBe('how-to-build-a-rest-api-with-node-js');
    });

    it('should handle product names', () => {
      expect(slugify('iPhone 15 Pro Max (256GB)')).toBe('iphone-15-pro-max-256gb');
    });

    it('should handle article titles with punctuation', () => {
      expect(slugify(`What's New in JavaScript ES2024?`)).toBe('whats-new-in-javascript-es2024');
    });

    it('should handle international content', () => {
      expect(slugify('Développement d\'applications web')).toBe('developpement-dapplications-web');
    });

    it('should handle business names', () => {
      expect(slugify('Smith & Associates, LLC')).toBe('smith-and-associates-llc');
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
        replacements: { 'a': 'b', 'b': 'a' }
      };
      expect(slugify('abc', options)).toBe('aac');
    });
  });
});
