import React from 'react';

import { Notebook } from './notes/Notebook';
import { debugNotebookStore } from './notes/stores/debugNoteStore';

import './App.scss';

export default function App() {
  const store = debugNotebookStore();
  return <Notebook store={store}/>;
}