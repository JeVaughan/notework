
export type JsonPrimitive = number | string | boolean | Date | undefined | null;

export type JsonArray = Json[];

export type JsonObject = { [key: string]: Json };

export type Json = JsonPrimitive | JsonArray | JsonObject;

export function parseJson<T extends Json>(jsonStr: string): T {
  return JSON.parse(jsonStr);
}

export function writeJson<T extends Json>(jsonObj: T): string {
  return JSON.stringify(jsonObj);
}