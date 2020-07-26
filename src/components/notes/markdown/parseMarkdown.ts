import { flatten } from "../../../util/collections/flatten";
import { filter } from "../../../util/collections/filter";

import { 
  matches, thenMap, repeat, takeUntil, oneOf, markType,
  wrap, allOf, remaining, parseFn
} from "./parser";

export type MdNode = 
  string |
  { type: string, value: string } |
  { type: string, value: { text: string, url: string } };

function toLinkValue(args: string | string[]): { text: string, url: string } {
  if (args instanceof Array) {
    if (args.length === 2) {
      const [text, url] = args;
      return { text, url };

    } else if (args.length === 1) {
      const [text] = args;
      return { text, url: text };
    }

  } else if (typeof args === 'string') {
    return { text: args, url: args };
  }

  return { text: 'Malformed Link', url: 'help/page' };
}

export const markdown = parseFn(
  thenMap(
    repeat<MdNode[]>(
      takeUntil<MdNode>(
        oneOf<MdNode>(
          markType('crlf', matches('\n')),

          markType('bold', wrap('**')),
          markType('emph', wrap('__')),
          markType('strike', wrap('~~')),
          markType('highlight', wrap('^^')),

          markType('mathblock', wrap('$$$')),
          markType('math', wrap('$$')),

          markType('codeblock', wrap('```')),
          markType('code', wrap('`')),

          markType('ref', 
            oneOf(
              thenMap(
                allOf(wrap('[[', ']]'), wrap('(', ')')), 
                toLinkValue
              ),
              thenMap(
                wrap('[[', ']]'),
                toLinkValue
              )
            )
          ),

          markType('link', thenMap(
              allOf(wrap('[', ']'), wrap('(', ')')), 
              toLinkValue
            )
          ),

          markType('img', thenMap(
              allOf(wrap('![', ']'), wrap('(', ')')), 
              toLinkValue
            )
          ),
        )
      ), thenMap(remaining, str => [str])
    ), list => filter(flatten(list))
  )
);