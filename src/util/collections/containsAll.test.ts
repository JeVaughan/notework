
import { Set, List } from 'immutable';
import { containsAll } from './containsAll';

it('should handle empty array', () => {
  expect(containsAll([], [])).toBe(true);
});

it('should handle empty collections', () => {
  expect(containsAll(Set(), Set())).toBe(true);
  expect(containsAll(List(), List())).toBe(true);
});

it('should handle single element arrays', () => {
  expect(containsAll([1], [1])).toBe(true);
  expect(containsAll(["hi"], ["hi"])).toBe(true);
  
  expect(containsAll([1], [2])).toBe(false);
  expect(containsAll(["hi"], ["there"])).toBe(false);
});

it('should handle single element collections', () => {
  expect(containsAll(List([1]), List([1]))).toBe(true);
  expect(containsAll(Set([1]), Set([1, 1]))).toBe(true);
  expect(containsAll("a", "a")).toBe(true);
  
  expect(containsAll(List([1]), List([2]))).toBe(false);
  expect(containsAll(List(["hi"]), List(["there"]))).toBe(false);
  expect(containsAll("a", "b")).toBe(false);
});

it('should handle same length multi-element arrays', () => {
  expect(containsAll([1, 2, 3], [1, 2, 3])).toBe(true);
  expect(containsAll([1, 2], [1, 2])).toBe(true);
  expect(containsAll(["h", "t2"], ["h", "t2"])).toBe(true);
  
  expect(containsAll([1, 2], [4, 5])).toBe(false);
  expect(containsAll(["h", "t2"], ["y", "!"])).toBe(false);
});

it('should handle supersets and disordering', () => {
  expect(containsAll([1, 2, 3, 4], [1, 2])).toBe(true);
  expect(containsAll(["a", "b", "c"], ["a", "b"])).toBe(true);

  expect(containsAll([1, 2, 3, 4], [4, 2, 1, 3])).toBe(true);
});

it('should handle collections containing objects', () => {
  expect(containsAll([{a: 1}], [{a: 1}])).toBe(true);
  expect(containsAll([{a: 2}], [{a: 3}])).toBe(false);
  expect(containsAll([{a: 2}, {b: "hi"}], [{a: 2}])).toBe(true);
});