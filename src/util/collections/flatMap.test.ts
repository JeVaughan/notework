import { identity } from "../identity"
import { flatMap } from "./flatMap"
import { Range } from "immutable";

it('should', () => {
  expect(flatMap([], identity)).toEqual([]);
});

it('should', () => {
  expect(flatMap(Range(1, 4), i => Range(1, i)))
    .toEqual([1, 1, 2, 1, 2, 3, 1, 2, 3, 4]);
})