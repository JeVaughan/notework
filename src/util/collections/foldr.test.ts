import { foldr } from "./foldr";

it('should return the init value for empty inputs', () => {
  expect(foldr([], 0, (a, b) => a + b)).toEqual(0);
});

it('should iterate over the input in the correct direction', () => {
  expect(foldr("abcde", "", (a, b) => a + b)).toEqual("edcba");
});