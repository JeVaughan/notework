import React, { useState, useMemo } from "react";
import { NoteBlock } from "./NoteBlock";
import './NotePage.css';

export type ParseBlocksResult = {
  blocks: string[],
  idxSelected: number,
  newCaretPos: number,
};

export function parseBlocks(rawMd: string, caretPos: number = 0): ParseBlocksResult {

  // TODO reimpliment with react-markdown?
  const blocks: string[] = rawMd.split('\n#');
  
  // TODO remove Array.from
  const index: [number, string][] = Array.from(blocks.entries());

  for (const [idxSelected, str] of index) {
    const newCaretPos = caretPos;
    caretPos -= str.length;

    if (caretPos < 0)
      return { blocks, idxSelected, newCaretPos };
  }

  return { blocks, idxSelected: 0, newCaretPos: 0 };
}


export type NotePageProps = {
  rawMd: string;  
};

export type NotePageState = {
  blocks: string[],
  idxSelected: number,
  caretPos: number,
};

export function NotePage({ rawMd }: NotePageProps) {
  const [[prev, active, rem], setBlocks] 
    = useState([ rawMd.split('\n#'), null, [] ]);
 
  const activeArr: string[] = useMemo(
    () => active ? [ active ] : [], [ active ]
  );

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
    <pre>{active}</pre>
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