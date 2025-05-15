import React from 'react';
import './chatbox.css';
import './incomingMessage.css';
import parse from 'html-react-parser';

const executeCode = (codeString) => {
  (async () => {
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const asyncFunc = new AsyncFunction(codeString);
  
    await asyncFunc();
  })();
};

function parseMessage(message) {
  const parsedMessage = parse(message, {
    replace: domNode => {
      if (domNode.name === 'pre') {
        const codeNode = domNode.children?.find(child => child.name === 'code');
        console.log('data', codeNode?.children?.[0]?.data);
        return (
          <div style={{ position: 'relative' }}>
            <pre style={{ marginBottom: '8px' }}>
              <code>{codeNode?.children?.[0]?.data}</code>
            </pre>
            <button
              className="execute-inline"
              onClick={() => executeCode(codeNode?.children?.[0]?.data.toString())}
            >
              Execute Code
            </button>
          </div>
        );
      }
    }
  });
  return parsedMessage;
}

export default function IncomingMessage({ text }) {
  return (
    <div className="message-container">
      <div className="bot-icon">
        <img src="/assets/apryse-icon.png" alt="Bot Icon" />
      </div>
      <div className="message incoming">
      <div className="message-text">
        {parseMessage(text)}
      </div>
      </div>
    </div>
  );
}