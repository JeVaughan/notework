
export default function removeDuplicates<T>(collection: Iterable<T>): T[] {
  return Array.from(new Set(collection));
};