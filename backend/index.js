const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid')
const app = express();
app.use(express.json());
const port = 8080;

let todos = [];

app.use(cors({
  origin: 'http://localhost:3000',
}))
app.get('/health', (req, res) => {
  res.send('Status: up')
})

app.get('/api/todos', (req, res) => {
  res.send(JSON.stringify({ items: todos }));
});
app.post('/api/todo', (req, res) => {
  todos.push({ id: uuidv4(), name: req.body.name, completed: false });
  res.sendStatus(201);
})
app.delete('/api/todo/:todo', (req, res) => {
  todos = todos.filter((todo) => todo.name !== req.params.todo)
  res.sendStatus(200);
})
app.post('/api/todo/:todo/complete', (req, res) => {
  todos.filter((todo) => todo.id === req.params.todo).map((todo) => todo.completed = true);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})