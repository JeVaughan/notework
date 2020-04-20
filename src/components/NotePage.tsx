import React, { useState, useMemo } from 'react';
import { NoteBlock } from './NoteBlock';
import { NoteEditor } from './NoteEditor';
import './NotePage.css';

export type NotePageProps = {
  rawMd: string;  
};

export function NotePage({ rawMd }: NotePageProps) {
  const [[prev, active, rem], setBlocks] 
    = useState([ rawMd.split('\n#'), null, [] ]);
 
  const activeArr: string[] = useMemo(
    () => active ? [ active ] : [], [ active ]
  );

  function onUpdate(updateMd?: string, navigate?: number) {
    const newBlocks: string[] = updateMd.split('\n#');
    const newActive = prev.pop();
    setBlocks([ prev.concat(newBlocks), newActive, rem ]);
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
        return <NoteBlock rawMd={val} onClick={onClick} />;
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
        return <NoteBlock rawMd={val} onClick={onClick} />;
      }
    )}
    
  </div>;
}