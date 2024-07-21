import React, { useState } from 'react';
import { SandpackProvider, SandpackPreview, SandpackConsole, SandpackThemeProp } from "@codesandbox/sandpack-react";
import { Terminal } from "lucide-react";

const Preview = ({ files, theme }: { files: any, theme: string }) => {
  const [showConsole, setShowConsole] = useState(true);

  const toggleConsole = () => {
    setShowConsole(!showConsole);
  };

  return (
    <div className={`h-full flex flex-col p-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="flex justify-between items-center mb-2">
        <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Preview</h2>
        <button
          onClick={toggleConsole}
          className={`px-3 py-1 text-sm rounded-md flex items-center transition-colors ${
            theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-300 text-black hover:bg-gray-400'
          }`}
        >
          <Terminal size={16} className="mr-2" />
          {showConsole ? 'Hide Console' : 'Show Console'}
        </button>
      </div>
      <div className={`flex-grow border rounded-md overflow-hidden flex flex-col ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
      }`}>
        <SandpackProvider files={files} theme={theme as SandpackThemeProp} template="static" className="!h-full !overflow-x-auto">
        <div className={`${showConsole ? 'h-2/3' : 'h-full'}`}>
            <SandpackPreview className="!w-full !h-full" />
          </div>
          {showConsole && (
            <div className={`h-1/3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
              <SandpackConsole className="!w-full !h-full" />
            </div>
          )}
        </SandpackProvider>
      </div>
    </div>
  );
};

export default Preview;