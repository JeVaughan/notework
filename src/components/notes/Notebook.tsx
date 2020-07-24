import React from 'react';
import { List } from 'immutable';

import { Store } from '../../store/Store';
import { fromStore } from '../../store/fromStore';
import { bindAction } from '../../store/bindAction';

import { AdjustableWidthColumns } from '../generic/AdjustableWidthColumns';
import { setOpenFile, NotebookStore, getTargetFilename } from './NotebookStore';
import { NoteFile } from './NoteFile';

import './Notebook.scss';

const META_PAGES: List<string> = List([
  'Diary', 
  'Stats',
  'Network', 
  'Index'
]);

type NavButtonProps = {
  name: string,
  store: Store<NotebookStore>,
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
  store: Store<NotebookStore>
};

export function Notebook({ store }: NotebookProps) {

  const { pinned, history } = store.state;
  const filename = fromStore(store, getTargetFilename);
  
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
        <NoteFile store={store}/> :
        "Please open a page."
    }
  />;  
}