import { useState } from 'react';
import { queryOpenAI, streamOpenAI } from '../core/openAIService';
import './chatbox.css';
import IncomingMessage from './incomingMessage';

const initialPrompt = {
  text: 'Hi! How can I help you today?',
  type: 'incoming'
};

export default function Chatbox() {
  const [messages, setMessages] = useState([initialPrompt]);
  const [input, setInput] = useState('');

  function setMessageFromStream(accumulated, deltaLength) {
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last?.type === 'incoming' && last.text === accumulated.slice(0, -deltaLength)) {
        return [
          ...prev.slice(0, -1),
          { ...last, text: accumulated }
        ];
      } else {
        return [...prev, { text: accumulated, type: 'incoming' }];
      }
    });
  }

  async function handleSendMessage() {
    if (!input.trim()) return;
    setInput('');
    setMessages(prev => [...prev, { text: input, type: 'outgoing' }]);
  
    const responseStream = await streamOpenAI(input);
    let accumulated = '';
  
    for await (const chunk of responseStream) {
      const delta = chunk.choices?.[0]?.delta?.content;
      if (delta) {
        accumulated += delta;
        setMessageFromStream(accumulated, delta.length);
      }
    }
  }

  return (
    <div className="chatbox">
      <h2>WebViewer Development Chat</h2>
      <div className="chat-messages">
      {messages.map((msg, index) => (
        msg.type === 'incoming' ? (
          <IncomingMessage key={index} text={msg.text} />
        ) : (
          <div key={index} className="message outgoing">
            <div className="message-text">
              {msg.text}
            </div>
          </div>
        )
      ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}