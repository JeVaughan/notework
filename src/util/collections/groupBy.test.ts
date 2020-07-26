import { groupBy } from "./groupBy";
import { range } from "./range";
import { writeJson } from "../json";
import { identity } from "../identity";

it('should group by the specified keys.', () => {

  const correctResult = new Map<string, number[]>();
  correctResult.set("0", [0, 3, 6]);
  correctResult.set("1", [1, 4, 7]);
  correctResult.set("2", [2, 5, 8]);

  expect(groupBy(range(9), i => writeJson(i % 3), identity))
    .toEqual(correctResult);
});