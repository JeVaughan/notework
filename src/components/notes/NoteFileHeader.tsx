import React from 'react';

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

  return <div className='NoteFile'>
    <div className='NoteFileHeader'>
      <button onClick={() => setPinned(!isPinned)}>
        {isPinned ? 'pinned' : 'unpinned'}
      </button>
      <h1>{filename ? filename : 'New File'}</h1>
      <span>aka: </span>
    </div>
    <div className='NoteFileView'>
      <NotePage />
    </div>
  </div>;
}


export default mapStore<NotebookStore, NoteFileHeaderProps>(
  NoteFileHeader, {
    filename: getTargetFilename,
    renameFile,
    isPinned: isFilePinned,
    setPinned,
  }
);