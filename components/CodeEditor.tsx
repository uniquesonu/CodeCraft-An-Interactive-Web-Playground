"use client";
import React from 'react';
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, value, onChange, theme }: { language: string, value: string, onChange: (value: string | undefined) => void, theme: string }) => {
  return (
    <div className={`flex flex-col w-full p-1 ${theme === 'vs-dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <h2 className={`text-sm font-bold mb-1 ${theme === 'vs-dark' ? 'text-white' : 'text-black'}`}>{language.toUpperCase()}</h2>
      <div className="flex-grow">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={value}
          onChange={onChange}
          theme={theme}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 12,
            lineNumbers: 'off',
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            glyphMargin: false,
            wordWrap: 'on'
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;