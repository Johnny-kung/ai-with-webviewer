import { useEffect, useState } from 'react';
import './chatbox.css';
import parse from 'html-react-parser';
import sampleResp from './assets/sample.json';

export default function Chatbox() {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you today?', type: 'incoming' },
    { text: 'I need to review a document.', type: 'outgoing' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, type: 'outgoing' }]);
    setInput('');
  };

  const executeCode = (codeString) => {
    (async () => {
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const asyncFunc = new AsyncFunction(codeString);
    
      await asyncFunc();
    })();
  };

  useEffect(() => {
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: parse(sampleResp.responseText, {
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
        }), type: 'incoming' },
      ]);
    }, 2000);
  }, [])

  return (
    <div className="chatbox">
      <h2>WebViewer Development Chat</h2>
      <div className="chat-content">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-controls">
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}