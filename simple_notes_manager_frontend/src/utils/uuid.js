const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * PUBLIC_INTERFACE
 * nanoid-like small ID generator for local use (not cryptographically secure).
 */
export function nanoid(size = 12) {
  let id = '';
  for (let i = 0; i < size; i += 1) {
    id += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return id;
}
