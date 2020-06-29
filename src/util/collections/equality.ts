/**
 * File used to consoladate the `===` type, and provide
 * common equality functions to be used as parameters.
 */

/**
 * Type definition of an equality function.
 */
export type EqFunc<T> = (a: T, b: T) => boolean;

/**
 * JavaScript triple equals.
*/
export function dfltEquals(a: any, b: any): boolean {
  return a === b;
}

/**
 * Triple equals for basic types, though uses string
 * equality for object types.
 */
export function stdEquals<T>(a: T, b: T): boolean {
  return typeof a === 'object' ? 
    JSON.stringify(a) === JSON.stringify(b) :
    a === b;
};