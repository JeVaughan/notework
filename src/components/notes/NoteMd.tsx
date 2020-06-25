import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

export type NoteMdProps = {
  className?: string,
  rawMd: string
};

export function NoteMd({ className, rawMd }: NoteMdProps) {
  return <ReactMarkdown 
    className={className}
    source={rawMd}
  />
}