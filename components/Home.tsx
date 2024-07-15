"use client";
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';

const Homes = () => {
  const [html, setHtml] = useState('<h1>Hello, CodePen Clone!</h1>');
  const [css, setCss] = useState('h1 { color: blue; }');
  const [js, setJs] = useState("console.log('Hello from JS!');");

  const files = {
    "/index.html": {
      code: `
<!DOCTYPE html>
<html>
  <head>
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>${js}</script>
  </body>
</html>
      `,
    },
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-1/2">
        <CodeEditor language="html" value={html} onChange={(value: string | undefined) => setHtml(value || '')} />
        <CodeEditor language="css" value={css} onChange={(value: string | undefined) => setCss(value || '')} />
        <CodeEditor language="javascript" value={js} onChange={(value: string | undefined) => setJs(value || '')} />
      </div>
      <Preview files={files} />
    </div>
  );
};

export default Homes;