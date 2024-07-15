"use client";
import React from 'react';
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";

const Preview = ({ files }: { files: any }) => {
  return (
    <div className="h-full p-2 bg-gray-800">
      <h2 className="text-lg font-bold mb-2">Preview</h2>
      <div className="h-full border border-gray-00 rounded-md overflow-hidden">
        <SandpackProvider files={files} template="static">
          <SandpackPreview />
        </SandpackProvider>
      </div>
    </div>
  );
};

export default Preview;
