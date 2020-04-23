import React, { useState, useMemo, ChangeEvent, KeyboardEvent, useEffect } from 'react';

import './NoteEditor.css';

export type NoteEditorProps = {
  rawMd?: string,
  onUpdate?: (updateMd?: string, navigate?: number) => void
};

function calcRows(text: string): number {
  return 1 + Math.max(3, text.split('\n').length);
}

export function NoteEditor({ rawMd, onUpdate }: NoteEditorProps) {
  const [updateMd, setMd] = useState<string>(rawMd);

  useEffect(() => setMd(rawMd), [ rawMd ]);

  const rows = useMemo(() => calcRows(updateMd), [ updateMd ]);

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMd(event.target.value);
    event.stopPropagation();
  }

  function finishEdit(update: boolean = true) {
    console.log('NotePane: finishing edit, updating = %s', update);

    if (update && onUpdate) 
      onUpdate(updateMd);
  }

  function onBlur(_: ChangeEvent<HTMLTextAreaElement>) {
    // finishEdit();
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

  return <textarea
    className='NoteEditor'
    rows={rows}
    value={updateMd}
    onChange={onChange}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    autoFocus
  />;
}