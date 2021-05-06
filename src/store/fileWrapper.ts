
import fs from 'fs';

import { Json, writeJson, parseJson } from '../util/json';
import { identity } from '../util/identity';

import { Reducer } from "./Store";
import { Action } from "./Actions";
import { StoreBinding } from './useStore';

export function fileStoreBinding<S>(
  filepath: fs.PathLike,
  serialiser: (state: S) => string,
  deserialiser: (body: string | null) => S,
): StoreBinding<S> {
 
  return function(reducer: Reducer<S>): Reducer<S> {
    
    // Attempt to read the current file contents into the provided reducer.
    fs.readFile(
      filepath, { encoding: 'utf8', flag: 'r' }, 
      function(error: NodeJS.ErrnoException, content: string) {
        if (!error)
          reducer(() => deserialiser(content));
      }
    );
    
    return function(action: Action<S>): void {
      fs.readFile(
        filepath, { encoding: 'utf8', flag: 'r' }, 
        function(error: NodeJS.ErrnoException, content: string) {
          if (!error) {
            const contentToWrite = 
              action(deserialiser(content));
            
            fs.writeFile(
              filepath, { encoding: 'utf8', flag: 'w' },
              serialiser(contentToWrite),
              () => reducer(() => contentToWrite)
            )
          }
        }
      )
    }
  }
}

export function rawFileBinding(filepath: fs.PathLike): StoreBinding<string | null> {
  return fileStoreBinding(filepath, identity, identity);
}

export function jsonFileWrapper<T extends Json>(filepath: fs.PathLike): StoreBinding<T> {
  return fileStoreBinding(filepath, writeJson, parseJson);
}
