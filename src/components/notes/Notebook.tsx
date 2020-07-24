import React, { useMemo } from 'react';
import { List } from 'immutable';

import { Store } from '../../store/Store';
import { fromStore } from '../../store/fromStore';
import { bindAction } from '../../store/bindAction';
import { joinStores } from '../../store/joinStores';

import { AdjustableWidthColumns } from '../generic/AdjustableWidthColumns';
import { FileHistory, getOpenFilename, setOpenFile } from './stores/FileHistory';
import { PinnedFiles } from './stores/PinnedFiles';
import { NoteEditorSource } from './stores/NoteEditor';
import { NoteFile, NoteFileData } from './NoteFile';

import './Notebook.scss';

export type NotebookData =
  FileHistory &
  PinnedFiles &
  NoteEditorSource

const META_PAGES: List<string> = List([
  'Diary', 
  'Stats',
  'Network', 
  'Index'
]);

type NavButtonProps = {
  name: string,
  store: Store<NotebookData>,
};

function NavButton({ name, store }: NavButtonProps) {
  const doSetOpenFile = bindAction(store, setOpenFile);

  return <button 
    key={name} 
    className='NavButton'
    onClick={() => doSetOpenFile(name)}>

      {name}
  </button>;
}

export type NotebookProps = {
  store: Store<NotebookData>
};

export function Notebook({ store }: NotebookProps) {

  const { pinned, history, noteEditorSrc } = store.state;
  const filename = fromStore(store, getOpenFilename);

  const noteStore: Store<NoteFileData> = useMemo(
    () => joinStores(
      store,
      noteEditorSrc(filename)

    ), [ noteEditorSrc, filename ]
  );
  
  return <AdjustableWidthColumns 
    className='Notebook'
    defaultWidth={120}

    left={<div className='Navigator'>
      <span>Project</span>
      {META_PAGES.map(name => <NavButton {...{name, store}}/>)}

      <hr/><span>Pinned</span>
      {pinned.map(name => <NavButton {...{name, store}}/>)}

      <hr/><span>Recent</span>
      {history.map(name => <NavButton {...{name, store}}/>)}
    </div>}

    right={
      filename ?
        <NoteFile store={noteStore}/> :
        "Please open a page."
    }
  />;  
}