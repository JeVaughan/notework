
type Parser<T> = 
  (input: string, i: number) =>
    { value: T, index: number } | undefined;

export function from<T>(value: T): Parser<T> {
  return function(_: string, i: number) {
    return { value, index: i };
  }
}

export const remaining: Parser<string> 
  = function(input: string, i: number) {
    return { 
      value: input.substr(i), 
      index: input.length 
    };
  }

export function matches(value: string | RegExp): Parser<string> {
  if (typeof value === 'string') {
    if (value.length === 0)
      return from('');

    if (value.length === 1)
      return function(input: string, i: number) {
        if (input[i] === value)
          return { value, index: i + 1 };
      }

    return function(input: string, i: number) {
      if (input.substr(i, value.length) === value)
        return { value, index: i + value.length };
    }
  }
  const regex: RegExp = value.compile();
  return function(input: string, i: number) {
    regex.lastIndex = i;
    regex.test(input);
    if (regex.lastIndex > i) {
      const index = regex.lastIndex;
      return { value: input.substring(i, index), index };
    }
  }
}

export function oneOf<T>(...parsers: Parser<T>[]): Parser<T> {
  return function(input: string, i: number) {
    for (const parser of parsers) {
      const result = parser(input, i);
      if (result) 
        return result
    }
  }
}

export function allOf<T>(...parsers: Parser<T>[]): Parser<T[]> {
  return function(input: string, i: number) {
    var j: number = i;

    const value: T[] = [];
    for (const parser of parsers) {
      const result = parser(input, j);

      if (result) {
        j = result.index;
        value.push(result.value);

      } else return undefined;
    }
    return { value, index: j };
  }
}

export function takeUntil<T>(base: Parser<T>): Parser<[string, T]> {
  return function(input: string, i: number) {
    for (var j = i; j < input.length; j += 1) {
      const result = base(input, j);
      if (result) { 
        const { value, index } = result;

        return { 
          value: [ input.substring(i, j), value ], 
          index
        };
      }
    }
  }
}

export function repeat<T>(...parsers: Parser<T>[]): Parser<T[]> {
  const child = oneOf<T>(...parsers);

  return function(input: string, i: number) {
    let j: number;
    const value: T[] = [];

    for (j = i; j < input.length;) {
      const result = child(input, j);

      if (result) {
        j = result.index;
        value.push(result.value)

      } else return undefined;
    }
    return { value, index: j };
  }
}

export function markType<T, V>(
  type: T, parser: Parser<V>
): Parser<{ type: T, value: V }> {

  return function(input: string, i: number) {
    const result = parser(input, i);
    if (result) {
      const { value, index } = result;
      return { value: { type, value }, index };
    }
  }
}

export function thenMap<I, O>(parser: Parser<I>, func: (t: I) => O): Parser<O> {
  return function(input: string, i: number) {
    const result = parser(input, i);
    if (result) {
      const { value, index } = result;
      return { value: func(value), index };
    }
  }
}

export function wrap(start: string, end: string = start): Parser<string> {
  return thenMap(
    allOf<string | string[]>(
      matches(start), 
      takeUntil(matches(end))
    ), ([_r1, r2]) => r2[0]
  );
}

export function parseFn<T>(parser: Parser<T>) {
  return function(source: string, index: number = 0): T {
    const result = parser(source, index);

    if (result)
      return result.value;
  }
}

export default Parser;