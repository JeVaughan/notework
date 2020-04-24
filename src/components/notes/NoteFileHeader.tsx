import React from 'react';

import { mapStore } from '../../store/MapStore';
import NotePage from './NotePage';
import { NotebookStore, setPinned, renameFile, getTargetFilename, isFilePinned } from './NotebookStore';

import './NoteFileHeader.css';

export type NoteFileHeaderProps = { 
  filename?: string | null | undefined, 
  renameFile?: (newTitle: string) => string,
  isPinned?: boolean, 
  setPinned?: (pin: boolean) => void,
};

function NoteFileHeader({ 
  filename, renameFile, 
  isPinned, setPinned
}: NoteFileHeaderProps) {

  return <div className='NoteFileHeader'>
    <button onClick={() => setPinned(!isPinned)}>
      {isPinned ? 'pinned' : 'unpinned'}
    </button>
    <h1>{filename ? filename : 'New File'}</h1>
    <span>aka: </span>
  </div>;
}

export default mapStore<NotebookStore, NoteFileHeaderProps>(
  NoteFileHeader, {

    selectors: {
      filename: getTargetFilename,
      isPinned: isFilePinned,
    },

    actions: {
      renameFile,
      setPinned,
    }
  }
);