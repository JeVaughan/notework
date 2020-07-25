import React from 'react';

import { useStore } from '../store/useStore';
import { Notebook, NotebookData } from './notes/Notebook';

import { debugNoteStore } from './notes/stores/debugNoteStore';
import { EMPTY_HISTORY } from './notes/stores/FileHistory';
import { EMPTY_PINS, setPinned } from './notes/stores/PinnedFiles';

import './App.scss';

const DEBUG_NOTEBOOK: NotebookData = {
  ...EMPTY_HISTORY,
  ...setPinned(true, 'page2')(EMPTY_PINS),
  ...debugNoteStore('test'),
}

export default function App() {
  const store = useStore(DEBUG_NOTEBOOK);
  return <Notebook store={store}/>;
}