
import fs from 'fs';
import { useState, useMemo, useEffect } from "react";

import { Store, store } from "./Store";
import { Action } from "./Actions";

export function useStore(filepath: fs.PathLike): Store<string | null> {
  const [state, setState] = useState<string>(undefined);
  
  // Read the file contents into the store when the path changes.
  useEffect(
    () => {
      fs.readFile(
        filepath, { encoding: 'utf8', flag: 'r' }, 
        function(error: NodeJS.ErrnoException, data: string) {
          if (!error)
            setState(data);
        }
      )
    }, [ filepath ]
  );

  function fileReducer(action: Action<string | null>): void {
    fs.writeFile(filepath, action(state));
  }

  return useMemo(
    () => store(state, fileReducer),
    [state, setState]
  );
}