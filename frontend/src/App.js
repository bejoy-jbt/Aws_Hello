import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://13.60.220.5:5000/api/greet', {
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
    <div style={{ padding: '2rem' }}>
      <h2>React ↔ Node Full Stack Demo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
