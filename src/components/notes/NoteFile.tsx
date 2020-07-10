import React from 'react';

import { useStore, useActions } from '../../store/MapStore';

import { getFilebody, NotebookStore, writeFile } from './NotebookStore';
import { BacklinkList } from './BacklinkList';
import { NoteBlock } from './NoteBlock';
import { NoteFileHeader } from './NoteFileHeader';

import './NoteFile.scss';

export function NoteFile() {
  const [ast] = useStore<NotebookStore>(getFilebody);
  const [setAst] = useActions<NotebookStore>(writeFile);

  return <div className='NoteFile'>
    <NoteFileHeader />
    <div className='NoteFileView'>
      <div className='NoteFileRoot'>
        <NoteBlock ast={ast} setAst={setAst} />
      </div>
      <hr />
      <BacklinkList />
    </div>
  </div>;
};