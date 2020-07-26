import { getIterator } from "./getIterator";

export function first<T>(iter: Iterable<T>): T | undefined {
  const result = getIterator(iter).next();
  
  if (!result.done) 
    return result.value
}