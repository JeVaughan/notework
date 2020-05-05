
/**
 * Returns a 32 bit hash of an input string.
 * 
 * https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * 
 * @param str String to hash.
 * @param seed Seed value.
 */
export function cyrb53(...sources: any[]): number {
  var h1 = 0xdeadbeef, h2 = 0x41c6ce57;

  function hash(str: string): void {
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
  }

  for (const obj of sources) {
    hash(
      typeof obj === 'string' ?
      obj : JSON.stringify(obj)
    );
  }

  h1 = Math.imul(h1 ^ h1>>>16, 2246822507) ^ Math.imul(h2 ^ h2>>>13, 3266489909);
  h2 = Math.imul(h2 ^ h2>>>16, 2246822507) ^ Math.imul(h1 ^ h1>>>13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1>>>0);
};