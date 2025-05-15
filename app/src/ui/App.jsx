import './App.css'
import WebViewerComponent from './WebViewer';
import Chatbox from './chatbox';
import CodeSnippetModal from './CodeSnippetModal';
import React, { useState } from 'react';

function App() {
  const [isCodeSnippetModalOpen, setCodeSnippetModalOpen] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState('');

  return (
    <div id="container">
      <CodeSnippetModal
        code={codeSnippet}
        isOpen={isCodeSnippetModalOpen}
        setIsOpen={setCodeSnippetModalOpen}
        setCodeSnippet={setCodeSnippet} />
      <WebViewerComponent />
      <Chatbox
        setCodeSnippetModalOpen={setCodeSnippetModalOpen}
        setCodeSnippet={setCodeSnippet} />
    </div>
  );
}

export default App;