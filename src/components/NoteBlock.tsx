import React, { useState, useEffect, useMemo, ChangeEvent, KeyboardEvent } from 'react';

import { NoteMd } from './NoteMd';

import './NoteBlock.css';

export type NoteBlockProps = {
  rawMd?: string,
  onSave?: (md: string) => void
};

export function NoteBlock({ rawMd, onSave }: NoteBlockProps) {
  const [newMd, setMd] = useState<string>();

  function onClick() {
    if (!newMd) {
      console.log('NotePane: started edit')
      setMd(rawMd)
    }
  }

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMd(event.target.value);
    event.stopPropagation();
  }

  function finishEdit(save: boolean = true) {
    console.log('NotePane: finishing edit, saving = %s', save);

    setMd(undefined);
    if (save && onSave) 
      onSave(newMd);
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
  
  if (typeof newMd === 'string') {
    return <textarea 
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