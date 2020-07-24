import React from 'react';

import { Store } from '../../store/Store';
import { fromStore } from '../../store/fromStore';
import { bindAction } from '../../store/bindAction';

import StarFill from '../../images/remixicon/star-fill.svg';
import StarLine from '../../images/remixicon/star-line.svg';

import { getOpenFilename } from './stores/FileHistory';
import { isFilePinned, setPinned } from './stores/PinnedFiles';

import { NoteFileData } from './NoteFile';

import './NoteFileHeader.scss';

export function NoteFileHeader(
  { store }: { store: Store<NoteFileData> }
) {

  const filename = fromStore(store, getOpenFilename);
  const isPinned = fromStore(store, isFilePinned(filename));
  //const doRenameFile = bindAction(store, renameFile);
  const doSetPinned = bindAction(store, setPinned);

  return <div className='NoteFileHeader'>
    <img 
      className="PinNoteButton"
      src={isPinned ? StarFill : StarLine}
      alt={isPinned ? 'Pinned' : 'Unpinned'}
      onClick={() => doSetPinned(!isPinned, filename)}
    />
    <span>{filename ? filename : 'New File'}</span>
    aka:
  </div>;
};
