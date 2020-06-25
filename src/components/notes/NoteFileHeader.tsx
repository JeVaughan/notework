import React from 'react';

import { useStore, useActions } from '../../store/MapStore';
import { NotebookStore, setPinned, renameFile, getTargetFilename, isFilePinned } from './NotebookStore';

import StarFill from '../../images/remixicon/star-fill.svg';
import StarLine from '../../images/remixicon/star-line.svg';

import './NoteFileHeader.css';

export function NoteFileHeader() {

  const [ filename, isPinned ] = useStore<NotebookStore>(
    getTargetFilename, isFilePinned
  );

  const [ doRenameFile, doSetPinned ] 
    = useActions<NotebookStore>(renameFile, setPinned);
  
  return <div className='NoteFileHeader'>
    <img 
      onClick={() => doSetPinned(!isPinned)}
      src={isPinned ? StarFill : StarLine}
      alt={isPinned ? 'Pinned' : 'Unpinned'}
    />
    <span>{filename ? filename : 'New File'}</span>
    aka:
  </div>;
};
