import React, { useMemo } from 'react';
import { List } from 'immutable';

import { Store } from '../../store/Store';
import { fromStore } from '../../store/fromStore';
import { bindAction } from '../../store/bindAction';

import { AdjustableWidthColumns } from '../generic/AdjustableWidthColumns';
import { setOpenFile, NotebookStore, getTargetFilename } from './NotebookStore';
import { NoteFile } from './NoteFile';

import './Notebook.scss';

export type NavButtonProps = {
  name: string,
  onClick?: () => void,
};

function NavButton({ name, onClick }: NavButtonProps) {
  return <button 
    key={name} 
    className='NavButton'
    onClick={onClick}>

      {name}
  </button>
}

const META_PAGES: List<string> = List([
  'Diary', 
  'Stats',
  'Network', 
  'Index'
]);

export function Notebook({ store }: { store: Store<NotebookStore> }) {

  const { pinned, history } = store.state;
  const filename = fromStore(store, getTargetFilename);
  const doSetOpenFile = bindAction(store, setOpenFile);

  const navButton = useMemo(
    () => (name: string) => 
      <NavButton
        key={name} 
        name={name} 
        onClick={() => doSetOpenFile(name)}
      />,
  
    [ doSetOpenFile ]
  );
  
  return <AdjustableWidthColumns 
    className='Notebook'
    defaultWidth={120}

    left={<div className='Navigator'>
      <span>Project</span>
      {META_PAGES.map(navButton)}

      <hr/><span>Pinned</span>
      {pinned.map(navButton)}

      <hr/><span>Recent</span>
      {history.map(navButton)}
    </div>}

    right={
      filename ?
        <NoteFile store={store}/> :
        "Please open a page."
    }
  />;  
}