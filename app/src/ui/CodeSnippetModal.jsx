import React from 'react';
import './CodeSnippetModal.css';

const CodeSnippetModal = ({
  isOpen,
  onClose,
  code,
  language = 'text',
  setIsOpen,
  setCodeSnippet,
}) => {
  if (!isOpen) return null;

  return (
    <div className="code-modal-overlay" onClick={onClose}>
      <div className="code-modal" onClick={(e) => e.stopPropagation()}>
        <button className="code-modal-close" onClick={() => {
          setIsOpen(false);
          setCodeSnippet('');
        }}>
          ×
        </button>
        <div className="code-modal-content">
          <pre>
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippetModal;