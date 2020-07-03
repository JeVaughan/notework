import { simplifyPusher } from "./simplifyPusher"
import { varPusher } from "./varPusher"

it('should get the value from the pusher', () => {
  const simp = simplifyPusher(varPusher(""));
  expect(simp()).toEqual("");
});

it('should update the value on pushes', () => {
  const simp = simplifyPusher(varPusher(""));
  simp("hello there world!");
  simp("it's been a while");
  expect(simp()).toEqual("it's been a while");
});