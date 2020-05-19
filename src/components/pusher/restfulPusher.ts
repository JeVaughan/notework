
import { PusherFn } from "./Push";
import { Pushed } from "./Pushed";

export function restfulPusher(
  endpointUrl: string,
): PusherFn<string, any> {

  return function(
    baseVersion: string, 
    update?: string
  ): Pushed<string, any> {
    
    const ver: string = encodeURIComponent(baseVersion);
    const method: string = update ? 'POST' : 'GET';

    const http = new XMLHttpRequest();
    http.open(method, `${endpointUrl}?ver=${ver}`, true);
    http.setRequestHeader("Content-Type", "application/json");
    
    return new Promise(
      function(resolve, reject): void {
        http.onload = _ => resolve(JSON.parse(http.response));
        http.onerror = _ => reject();

        http.send(
          update ? 
            JSON.stringify(update) :
            undefined
        );
      }
    );
  };
}