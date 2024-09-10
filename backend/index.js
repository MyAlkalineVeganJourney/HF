const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, My Alkaline Vegan Journey!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


