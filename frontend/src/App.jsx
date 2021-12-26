import './App.css';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Delete } from '@mui/icons-material';

const fetchTodos = async () => {
  const response = await fetch('http://localhost:8080/api/todos');
  const body = await response.json();
  return body.items;
};

function App() {
  const [todos, setTodos] = useState();
  const [todo, setTodo] = useState('');
  useEffect(() => {
    const getTodos = async () => {
      setTodos(await fetchTodos());
    };

    getTodos();
  }, []);
  return (
    <>
      <Card>
        <CardHeader title="Todos" />
        <CardContent>
          <List>
            {todos && todos.length > 0 ? todos.map((item) => (
              <Fragment key={item.id}>
                <ListItem secondaryAction={(
                  <IconButton onClick={async () => {
                    await fetch(`http://localhost:8080/api/todo/${item.name}`, {
                      method: 'DELETE',
                    });
                    setTodos(await fetchTodos());
                  }}
                  >
                    <Delete />
                  </IconButton>
                )}
                >
                  <ListItemButton onClick={async () => {
                    await fetch(`http://localhost:8080/api/todo/${item.id}/complete`, {
                      method: 'POST',
                    });
                    setTodos(await fetchTodos());
                  }}
                  >
                    <ListItemIcon>
                      <Checkbox data-testid="todo-checkbox" checked={item.completed} />
                    </ListItemIcon>
                    <ListItemText data-testid="todo-item">
                      {item.name}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Fragment>
            )) : 'No Todos'}
          </List>
        </CardContent>
      </Card>
      <form onSubmit={async (event) => {
        event.preventDefault();
        await fetch('http://localhost:8080/api/todo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: todo }),
        });
        setTodos(await fetchTodos());
        setTodo('');
      }}
      >
        <Grid container spacing={2} alignItems="center" style={{ paddingTop: '20px' }}>
          <Grid item>
            <TextField
              id="task-input"
              variant="outlined"
              label="Todo"
              value={todo}
              onChange={((event) => setTodo(event.target.value))}
            />
          </Grid>
          <Grid item>
            <Button id="submit-button" variant="contained" type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default App;
