
import { wrapPusher } from "./wrapPusher";
import { testPusher } from "./testPusher";
import { pushAcc } from "./Pushed";
import { PusherFn } from "./Push";

type TestT = { a: boolean, b: number, c: string };

it('should a value under a given field', () => {
  const pusher: PusherFn<number, number>
    = testPusher(pushAcc(1, 1));

  const testP = wrapPusher<number, { a: number }, 'a'>('a', pusher);
  
  expect(testP(1)).toEqual(pushAcc(1, 1));
});