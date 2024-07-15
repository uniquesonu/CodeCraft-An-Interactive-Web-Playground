"use client";
import React from 'react';
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, value, onChange }: { language: string, value: string, onChange: (value: string | undefined) => void }) => {
  return (
    <div className="w-1/3 p-2">
      <h2 className="text-lg font-bold mb-2">{language.toUpperCase()}</h2>
      <Editor
        height="300px"
        defaultLanguage={language}
        value={value}
        onChange={onChange}
        options={{ minimap: { enabled: false } }}
      />
    </div>
  );
};

export default CodeEditor;
