import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { Markdown } from './markdown/Markdown';

export type NoteMdProps = {
  className?: string,
  rawMd: string
};

export function NoteMd({ className, rawMd }: NoteMdProps) {
  return <Markdown source={rawMd} />
}