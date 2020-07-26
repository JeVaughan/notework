import { identity } from "../identity"
import { flatMap } from "./flatMap"
import { Range } from "immutable";

it('should handle an empty list', () => {
  expect(flatMap([], identity)).toEqual([]);
});

it('should always return a flattened list', () => {
  expect(flatMap(Range(1, 6), i => Range(1, i)))
    .toEqual([1, 1, 2, 1, 2, 3, 1, 2, 3, 4]);
})