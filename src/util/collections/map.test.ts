
import { writeJson } from "../json";
import { map } from "./map";
import { range } from "./range";

it('should return the empty list unchanged', () => {
  expect(map<number, number>([], i => i + 1)).toEqual([]);
});

it('should iterate over the input in the correct direction', () => {
  expect(map<number, string>(range(5), i => writeJson(i * 2)))
    .toEqual(["0", "2", "4", "6", "8"]);
});