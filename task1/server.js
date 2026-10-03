const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  res.render('result', { name: name, email: email, message: message });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
