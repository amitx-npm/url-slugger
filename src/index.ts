// Main package export types
export type SlugifyInput = string | number | null | undefined;

export interface SlugifyOptions {
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

// Default character replacements for common special characters
const DEFAULT_REPLACEMENTS: Record<string, string> = {
  // Currency symbols
  '€': 'euro',
  '£': 'pound',
  '¥': 'yen',
  $: 'dollar',
  '¢': 'cent',

  // Math symbols
  '±': 'plus-minus',
  '×': 'times',
  '÷': 'divide',
  '∞': 'infinity',

  // Common symbols
  '&': 'and',
  '@': 'at',
  '#': 'hash',
  '%': 'percent',
  '+': 'plus',
  '=': 'equals',

  // Quotes and punctuation
  '"': '',
  "'": '',
  '`': '',
  '\u2018': '', // Left single quotation mark
  '\u2019': '', // Right single quotation mark
  '\u201C': '', // Left double quotation mark
  '\u201D': '', // Right double quotation mark
  '\u2026': '', // Horizontal ellipsis

  // Additional symbols
  '!': '',
  '?': '',
  '*': '',
  '(': '',
  ')': '',
  '^': '',

  // Accented characters (Latin)
  à: 'a',
  á: 'a',
  â: 'a',
  ã: 'a',
  ä: 'a',
  å: 'a',
  æ: 'ae',
  ç: 'c',
  è: 'e',
  é: 'e',
  ê: 'e',
  ë: 'e',
  ì: 'i',
  í: 'i',
  î: 'i',
  ï: 'i',
  ñ: 'n',
  ò: 'o',
  ó: 'o',
  ô: 'o',
  õ: 'o',
  ö: 'o',
  ø: 'o',
  œ: 'oe',
  ù: 'u',
  ú: 'u',
  û: 'u',
  ü: 'u',
  ý: 'y',
  ÿ: 'y',

  // Uppercase variants
  À: 'A',
  Á: 'A',
  Â: 'A',
  Ã: 'A',
  Ä: 'A',
  Å: 'A',
  Æ: 'AE',
  Ç: 'C',
  È: 'E',
  É: 'E',
  Ê: 'E',
  Ë: 'E',
  Ì: 'I',
  Í: 'I',
  Î: 'I',
  Ï: 'I',
  Ñ: 'N',
  Ò: 'O',
  Ó: 'O',
  Ô: 'O',
  Õ: 'O',
  Ö: 'O',
  Ø: 'O',
  Œ: 'OE',
  Ù: 'U',
  Ú: 'U',
  Û: 'U',
  Ü: 'U',
  Ý: 'Y',
  Ÿ: 'Y',

  // German
  ß: 'ss',

  // Slavic
  č: 'c',
  Č: 'C',
  š: 's',
  Š: 'S',
  ž: 'z',
  Ž: 'Z',

  // Other common characters
  ı: 'i',
  İ: 'I',
  ğ: 'g',
  Ğ: 'G',
  ş: 's',
  Ş: 'S',
};

/**
 * Converts a string into a URL-friendly slug
 *
 * @param input - The string to convert to a slug
 * @param options - Configuration options for slug generation
 * @returns A URL-friendly slug string
 *
 * @example
 * ```ts
 * slugify('Hello World!'); // 'hello-world'
 * slugify('Café & Restaurant', { separator: '_' }); // 'cafe_restaurant'
 * slugify('Price: $29.99', { replacements: { '$': 'usd' } }); // 'price-usd29-99'
 * ```
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

  // Return empty string for empty input
  if (str.length === 0) {
    return '';
  }

  // Merge options with defaults
  const {
    separator = '-',
    lowercase = true,
    trim = true,
    strict = true,
    replacements = {},
    maxLength,
  } = options;

  // Combine default and custom replacements
  const allReplacements = { ...DEFAULT_REPLACEMENTS, ...replacements };

  // Apply character replacements
  for (const [char, replacement] of Object.entries(allReplacements)) {
    str = str.replace(new RegExp(escapeRegExp(char), 'g'), replacement);
  }

  // Convert to lowercase if requested
  if (lowercase) {
    str = str.toLowerCase();
  }

  // Replace any remaining non-alphanumeric characters with separator
  // Also replace existing separators (hyphens and underscores) to normalize
  str = str.replace(/[^a-zA-Z0-9]/g, separator);

  // Handle strict mode - replace multiple consecutive separators
  if (strict) {
    const separatorRegex = new RegExp(`[${escapeRegExp(separator)}]+`, 'g');
    str = str.replace(separatorRegex, separator);
  }

  // Trim separators from start and end
  if (trim) {
    const trimRegex = new RegExp(
      `^[${escapeRegExp(separator)}]+|[${escapeRegExp(separator)}]+$`,
      'g'
    );
    str = str.replace(trimRegex, '');
  }

  // Apply maximum length if specified
  if (maxLength !== undefined && maxLength > 0) {
    str = str.substring(0, maxLength);

    // Re-trim if we cut off in the middle of a word
    if (trim) {
      const trimRegex = new RegExp(`[${escapeRegExp(separator)}]+$`, 'g');
      str = str.replace(trimRegex, '');
    }
  } else if (maxLength === 0) {
    return '';
  }

  return str;
}

/**
 * Escapes special regex characters in a string
 * @param str - String to escape
 * @returns Escaped string safe for use in RegExp
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Default export for convenience
export default slugify;
