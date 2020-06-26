
import { selectPusher } from "./selectPusher";
import { testPusher } from "./testPusher";
import { pushAcc } from "./Pushed";
import { PusherFn } from "./Push";

type TestT = { a: boolean, b: number, c: string };

it('should a value under a given field', () => {
  const pusher: PusherFn<number, TestT>
    = testPusher(pushAcc(1, { a: true, b: 1, c: 'hi' }));

  const testP = selectPusher('a', pusher);
  
  expect(testP(1, false)).toEqual(pushAcc(1, true));
});