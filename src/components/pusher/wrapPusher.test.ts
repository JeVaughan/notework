
import { wrapPusher } from "./wrapPusher";
import { testPusher } from "./testPusher";
import { PusherFn } from "./Push";

type TestT = { a: boolean, b: number, c: string };

it('should a value under a given field', () => {
  const pusher: PusherFn<number, number>
    = testPusher({ newValue: 1 });

  const testP = wrapPusher<number, { a: number }, 'a'>('a', pusher);
  
  expect(testP(1)).toEqual({ newValue: { a: 1 } });
});