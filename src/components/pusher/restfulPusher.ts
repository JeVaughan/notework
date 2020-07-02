
import { Json, writeJson } from "../../util/json";
import { PusherFn, Pushed } from "./Push";
import { VERSION } from "./pusherEndpoint";

export function restfulPusher<T extends Json>(
  endpointUrl: string,
): PusherFn<string, T> {

  return function(
    baseVersion: string, 
    update?: T
  ): Promise<Pushed<string, T>> {
    
    const version: string = encodeURIComponent(baseVersion);
    const method: string = update === undefined ? 'GET' : 'POST';

    const http = new XMLHttpRequest();
    http.open(method, `https://${endpointUrl}?${VERSION}=${version}`, true);
    http.setRequestHeader("Content-Type", "application/json");
    
    return new Promise<Pushed<string, T>>(
      function(resolve, reject): void {
        http.onload = _ => resolve(http.response);
        http.onerror = _ => reject();
        http.send(writeJson(update));
      }
    );
  };
}