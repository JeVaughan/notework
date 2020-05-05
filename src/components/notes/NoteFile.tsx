import React from 'react';

import { useStore } from '../../store/MapStore';

import { getFilebody, NotebookStore } from './NotebookStore';
import { NoteBlock } from './NoteBlock';
import { NoteFileHeader } from './NoteFileHeader';

import './NoteFile.css';

export function NoteFile() {
  const [ast] = useStore<NotebookStore>(getFilebody);

  return <div className='NoteFile'>
    <NoteFileHeader />
    <div className='NoteFileView'>
      <NoteBlock ast={ast} />
    </div>
  </div>;
};