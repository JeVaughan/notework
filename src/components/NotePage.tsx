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
  const initialState = useMemo(
    function() {
      const { blocks, idxSelected, newCaretPos } = parseBlocks(rawMd)
      const 

      return { blocks, }
    }, [ rawMd ]
  );

  const [blocks, setBlocks] = useState(initialSource);

  function 

  return <div className='NotePage'>
    {<NoteBlock 
      rawMd={content} 
      onSave={setContent}
    />
  </div>;
}