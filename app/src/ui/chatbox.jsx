import { useState } from 'react';
import { queryOpenAI } from '../core/openAIService';
import './chatbox.css';

export default function Chatbox() {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you today?', type: 'incoming' },
    { text: 'I need to review a document.', type: 'outgoing' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    setInput('');
    setMessages([...messages, { text: input, type: 'outgoing' }]);
    const response = await queryOpenAI(input);
    setMessages([...messages, { text: response.output_text, type: 'incoming' }]);
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
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}