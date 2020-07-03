import { areDefined } from "./areDefined"

it('should detect undefined variables', () => {
  expect(areDefined(undefined)).toBeFalsy();
  expect(areDefined(1, undefined)).toBeFalsy();
});

it('should verify defined variables', () => {
  expect(areDefined(1)).toBeTruthy()
  expect(areDefined(1, {})).toBeTruthy();
})