import React, { useReducer } from 'react';

import { useStore, useActions, MapStore } from '../../store/MapStore';

import { getFilebody, NotebookStore, writeFile } from './NotebookStore';
import { BacklinkList } from './BacklinkList';
import { NoteBlock } from './NoteBlock';
import { NoteFileHeader } from './NoteFileHeader';

import './NoteFile.scss';

export function NoteFile({ store }: { store: NotebookStore }) {
  const [ast] = useStore<NotebookStore>(getFilebody);
  const [setAst] = useActions<NotebookStore>(writeFile);

  return <div className='NoteFile'>
    <MapStore>
      <NoteFileHeader />
      <div className='NoteFileView'>
        <div className='NoteFileRoot'>
          <NoteBlock ast={ast} setAst={setAst} />
        </div>
        <hr />
        <BacklinkList />
      </div>
    </MapStore>
  </div>;
};