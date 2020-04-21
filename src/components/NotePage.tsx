import React, { useState, useMemo } from 'react';

import { NoteBlock } from './NoteBlock';
import { NoteEditor } from './NoteEditor';
import { cyrb53 } from '../util/cyrb53';

import './NotePage.css';

export type NotePageProps = {
  title: string,
  rawMd: string,
  update?: (body?: string) => void,
};

export function NotePage({ title, rawMd, update }: NotePageProps) {
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
    <title>{title}</title>
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