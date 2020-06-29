
import { allOf, anyOf } from './allOf';

it('should correctly evaluate with default truthiness', () => {

  expect(allOf([])).toBe(true);

  expect(anyOf([])).toBe(false);

  expect(allOf([1, 2, 3])).toBe(true);

  expect(allOf([1, 2, undefined])).toBe(false);

  expect(anyOf([1, 2, undefined])).toBe(true);

  expect(allOf([undefined])).toBe(false);

  expect(anyOf([undefined])).toBe(false);

});