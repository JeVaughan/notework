import flatten from "../../../util/collections/flatten";
import { filter } from "../../../util/collections/filter";

import { 
  thenMap, repeat, takeUntil, oneOf, markType,
  wrap, allOf, remaining, parseFn
} from "./parser";

export type MdNode = 
  string |
  { type: string, value: string } |
  { type: string, value: { text: string, url: string } } |
  { type: string, value: [string, string] };

export const markdown = parseFn(
  thenMap(
    repeat<MdNode[]>(
      takeUntil<MdNode>(
        oneOf<MdNode>(
          markType('bold', wrap('**')),
          markType('emph', wrap('__')),
          markType('strike', wrap('~~')),

          markType('block', wrap('```')),
          markType('code', wrap('`')),

          markType('ref', wrap('[[', ']]')),

          markType('link', thenMap(
              allOf(wrap('[', ']'), wrap('(', ')')), 
              ([text, url]) => ({text, url})
            )
          ),

          markType('img', thenMap(
            allOf(wrap('![', ']'), wrap('(', ')')), 
              ([text, url]) => ({text, url})
            )
          ),
        )
      ), thenMap(remaining, str => [str])
    ), list => filter(flatten(list))
  )
);