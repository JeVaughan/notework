
import fs from 'fs';
import { Reducer } from "./Store";
import { Action } from "./Actions";
import { StoreWrapper } from './StoreSpec';
import { Json, writeJson, parseJson } from '../util/json';

export function fileWrapper(filepath: fs.PathLike): StoreWrapper<string | null> {
  return function(reducer: Reducer<string | null>): Reducer<string | null> {
    
    // Attempt to read the current file contents into the provided reducer.
    fs.readFile(
      filepath, { encoding: 'utf8', flag: 'r' }, 
      function(error: NodeJS.ErrnoException, content: string) {
        if (!error)
          reducer(() => content);
      }
    );
    
    return function(action: Action<string | null>): void {
      fs.readFile(
        filepath, { encoding: 'utf8', flag: 'r' }, 
        function(error: NodeJS.ErrnoException, content: string) {
          if (!error) {
            const contentToWrite = action(content);
            
            fs.writeFile(
              filepath, { encoding: 'utf8', flag: 'w' },
              contentToWrite,
              () => reducer(() => contentToWrite)
            )
          }
        }
      )
    }
  }
}

export function jsonFileWrapper<T extends Json>(filepath: fs.PathLike): StoreWrapper<T> {
  const baseWrapper: StoreWrapper<string | null> = fileWrapper(filepath);


  return function(baseReducer: Reducer<T>): Reducer<T> {
    const fileReducer: Reducer<string | null> = baseWrapper(
      
      function(action: Action<string>): void {
        function fileAction(jsonContent: T): T {
          return parseJson(action(writeJson(jsonContent)));
        }
        baseReducer(fileAction);
      }
    );

    return function(action: Action<T>): void {

      function fileAction(rawContent: string): string {
        return writeJson(action(parseJson(rawContent)));
      }

      fileReducer(fileAction);
    }
  }
}
