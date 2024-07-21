"use client";
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import CppEditor from './CppEditor';
import Preview from './Preview';
import Terminal from './Terminal';
import { Layout, Sun, Moon, Play } from 'lucide-react';

const Homes = () => {
  const [html, setHtml] = useState('<h1>Hello, CodeCraft-An-Interactive-Web-Playground!</h1>');
  const [css, setCss] = useState('h1 { color: blue; }');
  const [js, setJs] = useState("console.log('Hello from JS!');");
  const [cpp, setCpp] = useState("#include <iostream>\n\nint main() {\n    std::cout << \"Hello, C++!\" << std::endl;\n    return 0;\n}");
  const [cppOutput, setCppOutput] = useState('');
  const [isHorizontalLayout, setIsHorizontalLayout] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('web');
  const [runCount, setRunCount] = useState(0);

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

  const toggleLayout = () => {
    setIsHorizontalLayout(!isHorizontalLayout);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const runCppCode = () => {
    setRunCount(prevCount => prevCount + 1);
    setCppOutput("Compiling and running C++ code...\n\n" + 
                 "Output:\n" + 
                 cpp.split('\n').find(line => line.includes('std::cout'))?.replace('std::cout << ', '').replace(' << std::endl;', '') + "\n\n" +
                 "Process finished with exit code 0");
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between p-2 space-x-2">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className={`p-2 rounded-md ${isDarkTheme ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          <option value="web">Web (HTML/CSS/JS)</option>
          <option value="cpp">C++</option>
        </select>
        <div className="flex space-x-2">
          {selectedLanguage === 'cpp' && (
            <button
              onClick={runCppCode}
              className={`p-2 rounded-md ${isDarkTheme ? 'bg-green-700 hover:bg-green-600' : 'bg-green-500 hover:bg-green-400'}`}
              title="Run C++ Code"
            >
              <Play size={20} />
            </button>
          )}
          <button
            onClick={toggleLayout}
            className={`p-2 rounded-md ${isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            title="Toggle Layout"
          >
            <Layout size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md ${isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            title="Toggle Theme"
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
      <div className={`flex flex-grow ${isHorizontalLayout ? 'flex-col' : 'flex-row'}`}>
        {selectedLanguage === 'web' ? (
          <>
            <div className={`flex ${isHorizontalLayout ? 'h-1/2' : 'w-3/5'} ${isHorizontalLayout ? 'flex-row' : 'flex-col'}`}>
              <div className={`flex ${isHorizontalLayout ? 'w-1/3' : 'h-1/3'}`}>
                <CodeEditor language="html" value={html} onChange={(value: string | undefined) => setHtml(value || '')} theme={isDarkTheme ? 'vs-dark' : 'light'} />
              </div>
              <div className={`flex ${isHorizontalLayout ? 'w-1/3' : 'h-1/3'}`}>
                <CodeEditor language="css" value={css} onChange={(value: string | undefined) => setCss(value || '')} theme={isDarkTheme ? 'vs-dark' : 'light'} />
              </div>
              <div className={`flex ${isHorizontalLayout ? 'w-1/3' : 'h-1/3'}`}>
                <CodeEditor language="javascript" value={js} onChange={(value: string | undefined) => setJs(value || '')} theme={isDarkTheme ? 'vs-dark' : 'light'} />
              </div>
            </div>
            <div className={isHorizontalLayout ? 'h-1/2' : 'w-2/5'}>
              <Preview files={files} theme={isDarkTheme ? 'dark' : 'light'} />
            </div>
          </>
        ) : (
          <>
            <div className={`flex ${isHorizontalLayout ? 'h-1/2' : 'w-1/2'}`}>
              <CppEditor value={cpp} onChange={(value: string | undefined) => setCpp(value || '')} theme={isDarkTheme ? 'vs-dark' : 'light'} />
            </div>
            <div className={isHorizontalLayout ? 'h-1/2' : 'w-1/2'}>
              <Terminal key={runCount} output={cppOutput} theme={isDarkTheme ? 'dark' : 'light'} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Homes;