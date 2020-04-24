import React from 'react';

import { useStore, useActions } from '../../store/MapStore';
import { NotebookStore, setPinned, renameFile, getTargetFilename, isFilePinned } from './NotebookStore';

import './NoteFileHeader.css';

export function NoteFileHeader() {

  const [ filename, isPinned ] = useStore<NotebookStore>(
    getTargetFilename, isFilePinned
  );

  const [ doRenameFile, doSetPinned ] 
    = useActions<NotebookStore>(renameFile, setPinned);
  
  return <div className='NoteFileHeader'>
    <button onClick={() => doSetPinned(!isPinned)}>
      {isPinned ? 'pinned' : 'unpinned'}
    </button>
    <h1>{filename ? filename : 'New File'}</h1>
    <span>aka: </span>
  </div>;
};
