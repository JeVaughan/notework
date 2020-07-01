
import { testPusher } from "./testPusher";

it('should return a specified value', () => {
  const testP = testPusher({ newVersion: 1, newValue: 1 });

  expect(testP(1)).toEqual({ newVersion: 1, newValue: 1 });
  expect(testP(1)).toEqual({ newVersion: 1, newValue: 1 });
});

it('should cycle through a sequence', () => {
  const testP = testPusher(
    { newVersion: 1, newValue: 1 },
    { newVersion: 2, newValue: 2 },
    { newVersion: 3, newValue: 3 },
  );

  expect(testP(1)).toEqual({ newVersion: 1, newValue: 1 });
  expect(testP(1)).toEqual({ newVersion: 2, newValue: 2 });
  expect(testP(1)).toEqual({ newVersion: 3, newValue: 3 });
  expect(testP(1)).toEqual({ newVersion: 3, newValue: 3 });
});