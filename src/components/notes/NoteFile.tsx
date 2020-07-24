import React from 'react';

import { Store } from '../../store/Store';
import { fromStore } from '../../store/fromStore';
import { bindAction } from '../../store/bindAction';
import { useStore } from '../../store/useStore';

import { getFilebody, NotebookStore, writeFile } from './NotebookStore';
import { BacklinkList } from './BacklinkList';
import { NoteNav } from './NoteNav';
import { NoteBlock } from './NoteBlock';
import { NoteFileHeader } from './NoteFileHeader';

import './NoteFile.scss';

export function NoteFile({ store }: { store: Store<NotebookStore> }) {
  const navStore = useStore<NoteNav>({});

  const ast = fromStore(store, getFilebody);
  const setAst = bindAction(store, writeFile);

  return <div className='NoteFile'>
    <NoteFileHeader store={store}/>
    <div className='NoteFileView'>
      <div className='NoteFileRoot'>
        <NoteBlock store={navStore} ast={ast} setAst={setAst} />
      </div>
      <hr />
      <BacklinkList store={navStore} />
    </div>
  </div>;
};