import React from 'react';

import { Store } from '../../store/Store';
import { fromStore } from '../../store/fromStore';
import { bindAction } from '../../store/bindAction';

import { NotebookStore, setPinned, renameFile, getTargetFilename, isFilePinned } from './NotebookStore';

import StarFill from '../../images/remixicon/star-fill.svg';
import StarLine from '../../images/remixicon/star-line.svg';

import './NoteFileHeader.scss';

export function NoteFileHeader(
  { store }: { store: Store<NotebookStore> }
) {

  const filename = fromStore(store, getTargetFilename);
  const isPinned = fromStore(store, isFilePinned);
  const doRenameFile = bindAction(store, renameFile);
  const doSetPinned = bindAction(store, setPinned);

  return <div className='NoteFileHeader'>
    <img 
      className="PinNoteButton"
      src={isPinned ? StarFill : StarLine}
      alt={isPinned ? 'Pinned' : 'Unpinned'}
      onClick={() => doSetPinned(!isPinned)}
    />
    <span>{filename ? filename : 'New File'}</span>
    aka:
  </div>;
};
