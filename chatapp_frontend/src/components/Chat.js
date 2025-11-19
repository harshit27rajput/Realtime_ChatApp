import React, { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import echo from '../utils/echo';
import { AuthContext } from '../auth/AuthContext';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchMessages();
    if (user) {
      echo.private(`chat`)
        .listen('MessageSent', (e) => {
          setMessages((prev) => [...prev, e.message]);
        });
    }

    return () => {
      echo.leave(`chat`);
    };
  }, [user]);

  const fetchMessages = async () => {
    const { data } = await API.get('/messages');
    setMessages(data);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await API.post('/messages', { message: input });
    setInput('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.user.name}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
