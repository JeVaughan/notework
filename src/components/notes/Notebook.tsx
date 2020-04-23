import React, { useState, useMemo } from 'react';
import { Map, OrderedSet, List } from 'immutable';

import { AdjustableWidthColumns } from '../generic/AdjustableWidthColumns';
import { mapStore } from '../../store/MapStore';
import { setOpenFile, NotebookStore, getTargetFilename } from './NotebookStore';
import NoteFile from './NoteFile';

import './Notebook.css';

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

const META_PAGES: List<string> = List(['Diary', 'Network', 'Index']);

export type NotebookProps = {
  filename: string,
  pinned: OrderedSet<string>,
  history: OrderedSet<string>,
  setOpenFile: (filename?: string) => void,
};

function Notebook({ filename, pinned, history, setOpenFile }: NotebookProps) {

  const navButton = useMemo(
    () => (name: string) => 
      <NavButton
        key={name} 
        name={name} 
        onClick={() => setOpenFile(name)}
      />,
  
    [ setOpenFile ]
  );

  return <AdjustableWidthColumns 
    className='Notebook'
    defaultWidth={120}

    left={<div className='Navigator'>
      {META_PAGES.map(navButton)}

      <hr/><span>Pinned</span>
      {pinned.map(navButton)}

      <hr/><span>Recent</span>
      {history.map(navButton)}
    </div>}

    right={
      filename ?
        <NoteFile /> :
        "Please open a page."
    }
  />;  
}

export default mapStore<NotebookStore, NotebookProps>(
  Notebook, {
    selectors: {
      filename: getTargetFilename,
      pinned: ({ pinned }: NotebookStore) => pinned,
      history: ({ history }: NotebookStore) => history,
    },

    actions: { setOpenFile, }
  }
);
