const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let books = [
  { id: 1, title: 'Wings of Fire', author: 'APJ Abdul Kalam' },
  { id: 2, title: 'Let Us C', author: 'Yashavant Kanetkar' }
];
let nextId = 3;

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }
  const book = { id: nextId++, title: title, author: author };
  books.push(book);
  res.status(201).json(book);
});

app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  books.splice(index, 1);
  res.json({ message: 'Book deleted' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
