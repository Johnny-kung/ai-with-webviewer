import { useState } from 'react';
import { queryOpenAI, streamOpenAI } from '../core/openAIService';
import './chatbox.css';

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
    const response = await streamOpenAI(input);
    let accumulated = '';
    for await (const event of response) {
      if (event.type === 'response.output_text.delta') {
        accumulated += event.delta;
        setMessageFromStream(accumulated, event.delta.length);
      }
    }
  };

  return (
    <div className="chatbox">
      <h2>Chatbox</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
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