
/**
 * Returns a getter function for the desired field.
 * 
 * @param field Name of field to return in getter function.
 */
export function fieldSet<T, f extends keyof T>(field: f) {
  return function(obj: T, val: T[f]): T {
    return { ...obj, [field]: val };
  }
}