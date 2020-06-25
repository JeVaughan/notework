
import { selectPusher } from "./selectPusher";
import { testPusher } from "./testPusher";
import { pushAcc } from "./Pushed";

it('should a value under a given field', () => {
  const testP = selectPusher('a', testPusher(pushAcc(1, { a: 1 })));
  expect(testP(1)).toEqual(pushAcc(1, 1));
});

it('should return undefined if that field doesn\'t exist', () => {
  const testP = selectPusher('b', testPusher(pushAcc(1, {})));
  expect(testP(1)).toEqual(pushAcc(1, undefined));
});