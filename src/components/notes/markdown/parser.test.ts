import { from, remaining, matches, oneOf, allOf } from "./parser";

it('from should yield the input value', () => {
  expect(from('hello world')('meh', 0))
    .toEqual({ value: 'hello world', index: 0 });
});

it('remaininig should consume the rest of the input', () => {
  expect(remaining('hello world', 5))
    .toEqual({ value: ' world', index: 11 });
});

it('matches should consume a single matching character', () => {
  expect(matches('e')('hell', 1))
    .toEqual({ value: 'e', index: 2 });

  expect(matches('x')('hell', 0)).toBeUndefined();
});

it('matches should consume a matching string', () => {
  expect(matches('hell')('hello', 0))
    .toEqual({ value: 'hell', index: 4 });

  expect(matches('shell')('hello', 0)).toBeUndefined();
});

it('oneOf should consume the first matching parser', () => {
  expect(
    oneOf(matches('meh'), matches('hell'))('hello', 0)
  ).toEqual({ value: 'hell', index: 4 });
});

it('allOf should consume the all parsers in order', () => {
  expect(
    allOf(matches('m'), matches('e'), matches('h'))('3meh', 1)
  ).toEqual({ value: ['m', 'e', 'h'], index: 4 });
});