import React, { useState, useEffect, useMemo, ChangeEvent, KeyboardEvent, useRef } from 'react';

import { NoteMd } from './NoteMd';

import './NoteBlock.css';

export type UpdateParam = {
  
  // New markdown to replace the current content of this block.
  mdUpdated?: string,

  // The new caret position relative to the start of this block. 
  newCaretPos?: number,
};

export type NoteBlockProps = {
  rawMd?: string,
  onUpdate?: (param: UpdateParam) => void
};

export function NoteBlock({ rawMd, onUpdate }: NoteBlockProps) {
  const input = useRef(null);
  
  const [mdUpdated, setMd] = useState<string>();

  function onClick() {
    if (!mdUpdated) {
      console.log('NotePane: started edit')
      setMd(rawMd)
    }
  }

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMd(event.target.value);
    event.stopPropagation();
  }

  function finishEdit(update: boolean = true) {
    console.log('NotePane: finishing edit, updating = %s', update);

    setMd(undefined);
    if (update && onUpdate) 
      onUpdate({ mdUpdated });
  }
  
  function onBlur(event: ChangeEvent<HTMLTextAreaElement>) {
    finishEdit()
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && event.ctrlKey) {
      finishEdit();
      event.stopPropagation();

    } else if (event.key === "Escape") {
      finishEdit(false);
      event.stopPropagation();
    }
  }
  
  if (typeof mdUpdated === 'string') {
    return <textarea 
      ref={input}
      className='NoteEditor'
      defaultValue={rawMd}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus
    />;

  } else {
    return <div className='NoteBlock' onClick={onClick}>
      <NoteMd rawMd={rawMd} />
    </div>;
  }
}