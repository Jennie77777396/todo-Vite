import { useEffect, useState } from 'react';
import { Typography, Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import api from '../utils/api';

interface Todo {
  _id: string;
  task: string;
  completed: boolean;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get<Todo[]>('/tasks');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, [location.pathname]);

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', py: 4, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, mb: 2 }}>
          Hello! Get Started with the Todo App
        </Typography>
        <Button variant="contained" component={Link} to="/todos" sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Manage Todos
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {todos.length > 0 ? (
          <Table sx={{ minWidth: { xs: 300, sm: 400 } }}>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <TableRow key={todo._id}>
                  <TableCell>{todo.task}</TableCell>
                  <TableCell align="right">{todo.completed ? 'Done' : 'Pending'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No todos yet—add some!</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Home;