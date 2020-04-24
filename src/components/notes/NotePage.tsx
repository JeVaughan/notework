import React, { useState, useMemo } from 'react';

import { cyrb53 } from '../../util/cyrb53';
import { mapStore } from '../../store/MapStore';
import { NoteBlock } from './NoteBlock';
import { NoteEditor } from './NoteEditor';
import { NotebookStore, writeFile, getFilebody } from './NotebookStore';

import './NotePage.css';

export type NotePageProps = {
  rawMd: string,
  writeFile?: (content?: string) => void,
};

function NotePage({ rawMd, writeFile }: NotePageProps) {
  const [[prev, active, rem], setBlocks] 
    = useState([ rawMd.split('\n#'), null, [] ]);
 
  const prevHashes: number[] = useMemo(
    () => prev.map(str => cyrb53(str)), [ prev ]
  );

  const remHashes: number[] = useMemo(
    () => rem.map(str => cyrb53(str)), [ rem ]
  );

  const activeArr: string[] = useMemo(
    () => active ? [ active ] : [], [ active ]
  );

  function onUpdate(updateMd?: string, navigate?: number) {
    const newBlocks: string[] = prev.concat(updateMd.split('\n#'));

    if (navigate) {
      const newActive = newBlocks.pop();
      setBlocks([ newBlocks, newActive, rem ]);

    } else {
      setBlocks([ newBlocks.concat(rem), null, [] ]);
    }
  }

  return <div className='NotePage'>
    {prev.map(
      function(val: string, idx: number) {
        function onClick(newCaret?: number) {
          setBlocks([
            prev.slice(0, idx),
            val,
            prev.slice(idx + 1)
              .concat(activeArr)
              .concat(rem)
          ]);
        }
        return <NoteBlock 
          key={prevHashes[idx]}
          rawMd={val} 
          onClick={onClick}
        />;
      }
    )}
    {active && <NoteEditor rawMd={active} onUpdate={onUpdate} />}
    {rem.map(
      function(val: string, idx: number) {
        function onClick(newCaret?: number) {
          setBlocks([
            prev.concat(activeArr)
              .concat(rem.slice(0, idx)),
            val,
            rem.slice(idx + 1)
          ]);
        }
        return <NoteBlock 
          key={remHashes[idx]}
          rawMd={val} 
          onClick={onClick}
        />;
      }
    )}
    
  </div>;
}

export default mapStore<NotebookStore, NotePageProps>(
  NotePage, { 
    selectors: {
      rawMd: getFilebody
    },

    actions: { 
      writeFile
    } 
  }
);