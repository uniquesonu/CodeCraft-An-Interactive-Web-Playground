import React from 'react';

interface TerminalProps {
  output: string;
  theme: 'light' | 'dark';
}

const Terminal: React.FC<TerminalProps> = ({ output, theme }) => {
  return (
    <div className={`h-full p-4 font-mono text-sm overflow-auto ${
      theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-black border border-gray-300'
    }`}>
      <pre>{output}</pre>
    </div>
  );
};

export default Terminal;