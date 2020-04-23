import React from 'react';

import NotePage from './NotePage';
import NoteFileHeader from './NoteFileHeader';

import './NoteFile.css';

export type NoteFileProps = {  };

export default function NoteFile(_: NoteFileProps) {
  return <div className='NoteFile'>
    <NoteFileHeader />
    <div className='NoteFileView'>
      <NotePage />
    </div>
  </div>;
};