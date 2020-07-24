import React from 'react';

import { Store } from '../../store/Store';
import { fromStore } from '../../store/fromStore';
import { bindAction } from '../../store/bindAction';
import { useStore } from '../../store/useStore';

import { NoteEditor, getContent, setContent } from './stores/NoteEditor';
import { FileHistory } from './stores/FileHistory';
import { PinnedFiles } from './stores/PinnedFiles';
import { BacklinkList } from './BacklinkList';
import { NoteNav } from './NoteNav';
import { NoteBlock } from './NoteBlock';
import { NoteFileHeader } from './NoteFileHeader';

import './NoteFile.scss';

export type NoteFileData =
  FileHistory &
  PinnedFiles &
  NoteEditor

export type NoteFileProps = {
  store: Store<NoteFileData>
};

export function NoteFile({ store }: NoteFileProps) {
  const navStore = useStore<NoteNav>({});

  const ast = fromStore(store, getContent);
  const setAst = bindAction(store, setContent);

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