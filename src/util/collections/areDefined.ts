import { allOf } from "./allOf";

export function areDefined(...vars: any[]): boolean {
  return allOf(vars, elem => elem !== undefined);
}