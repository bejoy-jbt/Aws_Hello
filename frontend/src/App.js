import React, { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');
  const [backendURL, setBackendURL] = useState('');

  // Detect public IP once
  useEffect(() => {
    async function fetchIP() {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setBackendURL(`http://${data.ip}:5000`);
      } catch (err) {
        console.error('Could not fetch public IP', err);
      }
    }

    fetchIP();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!backendURL) {
      setResponse('Waiting for backend URL...');
      return;
    }

    try {
      const res = await fetch(`${backendURL}/api/greet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to reach the server.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>React ↔ Node Full Stack Demo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Send
        </button>
      </form>
      {response && <p style={{ marginTop: '1rem' }}>{response}</p>}
    </div>
  );
}

export default App;
