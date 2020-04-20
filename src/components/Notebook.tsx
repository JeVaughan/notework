import React, { useState } from 'react';
import { NotePage } from './NotePage';

import './Notebook.css';

export type NotebookProps = {
  shortcuts: string[],
  notes: Map<string, string>,
  update?: (name: string, body?: string) => void,
};

export function Notebook({ shortcuts, notes, update }: NotebookProps) {
  const [open, setOpen] = useState<string>();
  
  function updatePage(body?: string) {
    if (open && update) update(open, body)
  }

  return <div className='Notebook'>
    <div className='Navigator'>
      {shortcuts.map(
        (name) =>
          <button key={name} onClick={() => setOpen(name)}>
            {name}
          </button>
      )}
    </div>
    <div className='EditPanel'>
      {open && <NotePage key={open} rawMd={notes.get(open)} update={updatePage} />}
    </div>
  </div>;
  
}