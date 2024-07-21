import React from 'react';
import Editor from "@monaco-editor/react";

const CppEditor = ({ value, onChange, theme }: { value: string, onChange: (value: string | undefined) => void, theme: string }) => {
  return (
    <div className={`flex flex-col w-full p-2 ${theme === 'vs-dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
      <h2 className={`text-sm font-bold mb-1 ${theme === 'vs-dark' ? 'text-white' : 'text-black'}`}>C++</h2>
      <div className="flex-grow rounded-md overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="cpp"
          value={value}
          onChange={onChange}
          theme={theme}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
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

export default CppEditor;