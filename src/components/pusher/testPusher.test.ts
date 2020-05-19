
import { testPusher } from "./testPusher";
import { pushAcc } from "./Pushed";

it('should return a specified value', () => {
  const testP = testPusher(pushAcc(1, 1));

  expect(testP.pull(1)).toEqual(pushAcc(1, 1));
  expect(testP.pull(1)).toEqual(pushAcc(1, 1));
});

it('should cycle through a sequence', () => {
  const testP = testPusher(
    pushAcc(1, 1), pushAcc(2, 2), pushAcc(3, 3),
  );

  expect(testP.pull(1)).toEqual(pushAcc(1, 1));
  expect(testP.pull(1)).toEqual(pushAcc(2, 2));
  expect(testP.pull(1)).toEqual(pushAcc(3, 3));
  expect(testP.pull(1)).toEqual(pushAcc(3, 3));
});