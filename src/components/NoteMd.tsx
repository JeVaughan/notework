import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

export type NoteMdProps = {
  rawMd: string
};

export function NoteMd({ rawMd }: NoteMdProps) {
  return <ReactMarkdown 
    source={rawMd}
  />
}