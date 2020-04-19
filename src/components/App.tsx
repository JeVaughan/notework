import React from 'react';
import { NotePane } from './NotePane';

const input = '# This is a header\n\nAnd __this__ is a paragraph'

export default function App() {
  return <NotePane rawMd={input} />
}