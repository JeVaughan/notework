import { markdown } from "./parseMarkdown";

it('should parse a bold node', () => {
  expect(markdown('** Hello world **')).toEqual([
    { type: 'bold', value: ' Hello world ' }
  ]);
});

it('should parse a emph node', () => {
  expect(markdown('Hello __world__')).toEqual([
    'Hello ',
    { type: 'emph', value: 'world' }
  ]);
});

it('should parse a strike node', () => {
  expect(markdown('my~~name~~is~~luka')).toEqual([
    'my', { type: 'strike', value: 'name' }, 'is~~luka',
  ]);
});

it('should parse a code node', () => {
  expect(markdown('my `name` luka')).toEqual([
    'my ', { type: 'code', value: 'name' }, ' luka',
  ]);
});

it('should parse a block node', () => {
  expect(markdown('my ```name``` luka')).toEqual([
    'my ', { type: 'codeblock', value: 'name' }, ' luka',
  ]);
});

it('should parse a ref node', () => {
  expect(markdown('my [[name]] luka')).toEqual([
    'my ', { type: 'ref', value: { text: 'name', url: 'name' } }, ' luka',
  ]);
  expect(markdown('[[name]](luka)')).toEqual([
    { type: 'ref', value: { text: 'name', url: 'luka' } }
  ]);
});

it('should parse a link node', () => {
  expect(markdown('[ahref](broken.url)')).toEqual([
    { type: 'link', value: { text: 'ahref', url: 'broken.url'} }
  ]);
});