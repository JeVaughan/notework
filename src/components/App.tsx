import React from 'react';

import { useStore } from '../store/useStore';
import { Notebook } from './notes/Notebook';
import { DEBUG_NOTEBOOK } from './notes/stores/debugNoteStore';

import './App.scss';

export default function App() {
  const store = useStore(DEBUG_NOTEBOOK);
  return <Notebook store={store}/>;
}