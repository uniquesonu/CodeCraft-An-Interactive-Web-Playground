"use client";
import React, { useState } from 'react';
import Editor, { OnChange } from "@monaco-editor/react";
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";

const CodepenClone = () => {
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
        <div className="w-1/3 p-2">
          <h2 className="text-lg font-bold mb-2">HTML</h2>
          <Editor
            height="300px"
            defaultLanguage="html"
            value={html}
            onChange={setHtml as OnChange}
            options={{ minimap: { enabled: false } }}
          />
        </div>
        <div className="w-1/3 p-2">
          <h2 className="text-lg font-bold mb-2">CSS</h2>
          <Editor
            height="300px"
            defaultLanguage="css"
            value={css}
            onChange={setCss as OnChange}
            options={{ minimap: { enabled: false } }}
          />
        </div>
        <div className="w-1/3 p-2">
          <h2 className="text-lg font-bold mb-2">JavaScript</h2>
          <Editor
            height="300px"
            defaultLanguage="javascript"
            value={js}
            onChange={setJs as OnChange}
            options={{ minimap: { enabled: false } }}
          />
        </div>
      </div>
      <div className="h-1/2 p-2 bg-gray-100">
        <h2 className="text-lg font-bold mb-2">Preview</h2>
        <div className="h-full border border-gray-300 rounded-md overflow-hidden">
          <SandpackProvider
            files={files}
            template="static"
          >
            <SandpackPreview />
          </SandpackProvider>
        </div>
      </div>
    </div>
  );
};

export default CodepenClone;