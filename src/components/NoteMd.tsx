import React from 'react';
import ReactMarkdown from 'react-markdown';

export type NoteMdProps = {
  rawMd: string
};

export function NoteMd({ rawMd }: NoteMdProps) {
  return <ReactMarkdown source={rawMd} />
}