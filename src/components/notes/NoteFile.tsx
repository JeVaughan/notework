import React from 'react';

import NotePage from './NotePage';
import { NoteFileHeader } from './NoteFileHeader';

import './NoteFile.css';

export function NoteFile() {
  return <div className='NoteFile'>
    <NoteFileHeader />
    <div className='NoteFileView'>
      <NotePage />
    </div>
  </div>;
};