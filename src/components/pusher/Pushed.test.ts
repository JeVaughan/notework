import * as pushed from "./Pushed";

it('should test PushAccepted correctly', () => {
  const obj = pushed.pushAcc(1, 1);

  expect(pushed.wasAccepted(obj)).toBeTruthy();
  expect(pushed.wasModified(obj)).toBeFalsy();
  expect(pushed.wasRejected(obj)).toBeFalsy();
  expect(pushed.wasUpdated(obj)).toBeFalsy();
});

it('should test PushModified correctly', () => {
  const obj = pushed.pushMod(1, 1);

  expect(pushed.wasAccepted(obj)).toBeFalsy();
  expect(pushed.wasModified(obj)).toBeTruthy();
  expect(pushed.wasRejected(obj)).toBeFalsy();
  expect(pushed.wasUpdated(obj)).toBeTruthy();
});

it('should test PushRejected correctly', () => {
  const obj = pushed.pushRej(1, 1);

  expect(pushed.wasAccepted(obj)).toBeFalsy();
  expect(pushed.wasModified(obj)).toBeFalsy();
  expect(pushed.wasRejected(obj)).toBeTruthy();
  expect(pushed.wasUpdated(obj)).toBeTruthy();
});