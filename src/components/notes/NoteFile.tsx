import React from 'react';

import { useStore, useActions } from '../../store/MapStore';

import { getFilebody, NotebookStore, writeFile } from './NotebookStore';
import { NoteBlock } from './NoteBlock';
import { NoteFileHeader } from './NoteFileHeader';

import './NoteFile.css';

export function NoteFile() {
  const [ast] = useStore<NotebookStore>(getFilebody);
  const [setAst] = useActions<NotebookStore>(writeFile);

  return <div className='NoteFile'>
    <NoteFileHeader />
    <div className='NoteFileView'>
      <NoteBlock ast={ast} setAst={setAst} />
    </div>
  </div>;
};