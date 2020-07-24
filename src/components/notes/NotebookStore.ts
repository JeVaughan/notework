
import { Map, OrderedSet } from 'immutable';

import { Action } from '../../store/Actions';

import { NoteAst } from './NoteAst';

type NotebookStore = {
  // user information
  // - name, email, 
  // user app preferences
  // - language, display, hot-keys, 
  // UI / display data
  history: OrderedSet<string | undefined>,
  pinned: OrderedSet<string>,
  // statistical project data
  // - network data
  // files and image metadata
  // noteEditorFn: (noteID: string) => Store<NoteAst>,
  // references: Map<string, List<string>>
};
