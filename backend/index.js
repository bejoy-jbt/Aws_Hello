const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/greet', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}! 👋` });
});

app.listen(5000, '0.0.0.0', () => {
  console.log("Server running on http://0.0.0.0:5000");
});
