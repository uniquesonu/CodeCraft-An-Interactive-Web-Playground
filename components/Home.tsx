"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from './CodeEditor';
import CppEditor from './CppEditor';
import Preview from './Preview';
import Terminal from './Terminal';
import { Layout, Sun, Moon, Play, Code, FileText, Cpu } from 'lucide-react';

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

  const toggleLayout = () => setIsHorizontalLayout(!isHorizontalLayout);
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const runCppCode = () => {
    setRunCount(prevCount => prevCount + 1);
    setCppOutput("Compiling and running C++ code...\n\n" + 
                 "Output:\n" + 
                 cpp.split('\n').find(line => line.includes('std::cout'))?.replace('std::cout << ', '').replace(' << std::endl;', '') + "\n\n" +
                 "Process finished with exit code 0");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className={`flex flex-col h-screen overflow-hidden ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
    >
      <nav className="flex justify-between items-center p-4 bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <h1 className="text-2xl font-bold">CodeCraft</h1>
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedLanguage('web')}
            className={`p-2 rounded-md ${selectedLanguage === 'web' ? (isDarkTheme ? 'bg-blue-600' : 'bg-blue-500') : (isDarkTheme ? 'bg-gray-700' : 'bg-gray-300')}`}
          >
            <span className='flex gap-2 items-center justify-center'><Code size={20} /> Web</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedLanguage('cpp')}
            className={`p-2 rounded-md ${selectedLanguage === 'cpp' ? (isDarkTheme ? 'bg-green-600' : 'bg-green-500') : (isDarkTheme ? 'bg-gray-700' : 'bg-gray-300')}`}
          >
            <span className='flex gap-2 items-center justify-center'><FileText size={20} /> CPP</span>

          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLayout}
            className={`p-2 rounded-md ${isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            <Layout size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2 rounded-md ${isDarkTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          {selectedLanguage === 'cpp' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={runCppCode}
              className={`p-2 rounded-md ${isDarkTheme ? 'bg-green-600 hover:bg-green-500' : 'bg-green-500 hover:bg-green-400'}`}
            >
              <Play size={20} />
            </motion.button>
          )}
        </div>
      </nav>
      <motion.div 
        layout
        className={`flex flex-grow ${isHorizontalLayout ? 'flex-col' : 'flex-row'}`}
      >
        {selectedLanguage === 'web' ? (
          <>
            <motion.div layout className={`flex ${isHorizontalLayout ? 'h-1/2' : 'w-3/5'} ${isHorizontalLayout ? 'flex-row' : 'flex-col'}`}>
              <motion.div layout className={`flex ${isHorizontalLayout ? 'w-1/3' : 'h-1/3'}`}>
                <CodeEditor language="html" value={html} onChange={setHtml} theme={isDarkTheme ? 'vs-dark' : 'light'} />
              </motion.div>
              <motion.div layout className={`flex ${isHorizontalLayout ? 'w-1/3' : 'h-1/3'}`}>
                <CodeEditor language="css" value={css} onChange={setCss} theme={isDarkTheme ? 'vs-dark' : 'light'} />
              </motion.div>
              <motion.div layout className={`flex ${isHorizontalLayout ? 'w-1/3' : 'h-1/3'}`}>
                <CodeEditor language="javascript" value={js} onChange={setJs} theme={isDarkTheme ? 'vs-dark' : 'light'} />
              </motion.div>
            </motion.div>
            <motion.div layout className={isHorizontalLayout ? 'h-1/2' : 'w-2/5'}>
              <Preview files={files} theme={isDarkTheme ? 'dark' : 'light'} />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div layout className={`flex ${isHorizontalLayout ? 'h-1/2' : 'w-1/2'}`}>
              <CppEditor value={cpp} onChange={setCpp} theme={isDarkTheme ? 'vs-dark' : 'light'} />
            </motion.div>
            <motion.div layout className={isHorizontalLayout ? 'h-1/2' : 'w-1/2'}>
              <Terminal key={runCount} output={cppOutput} theme={isDarkTheme ? 'dark' : 'light'} />
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Homes;