const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const users = [];

app.get('/', (req, res) => {
  res.render('form', { errors: [], old: {} });
});

app.post('/register', (req, res) => {
  const { name, email, age, gender, country, terms } = req.body;
  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push('Name must be at least 3 characters');
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    errors.push('Enter a valid email');
  }
  if (!age || age < 18 || age > 60) {
    errors.push('Age must be between 18 and 60');
  }
  if (!gender) {
    errors.push('Select a gender');
  }
  if (!country) {
    errors.push('Select a country');
  }
  if (!terms) {
    errors.push('Accept the terms');
  }

  if (errors.length > 0) {
    return res.render('form', { errors: errors, old: req.body });
  }

  users.push({ name: name.trim(), email: email, age: age, gender: gender, country: country });
  res.redirect('/users');
});

app.get('/users', (req, res) => {
  res.render('users', { users: users });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
