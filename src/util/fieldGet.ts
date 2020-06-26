
/**
 * Returns a getter function for the desired field.
 * 
 * @param field Name of field to return in getter function.
 */
export function fieldGet<T, f extends keyof T>(field: f) {
  return function(obj: T): T[f] {
    return obj[field];
  }
}