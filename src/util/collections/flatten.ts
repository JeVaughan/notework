
export default function flatten<T>(arr: T[][]): T[] {
  return Array<T>().concat(...arr);
};