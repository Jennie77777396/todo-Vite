import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '../utils/api';
import TodoList from '../components/TodoList';
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Alert,
} from '@mui/material';

interface Todo {
  _id: string;
  task: string;
  completed: boolean;
  userId: string;
}

interface FormData {
  task: string;
}

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [pendingTask, setPendingTask] = useState<string | null>(null);
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [deleteTodoId, setDeleteTodoId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { task: '' },
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get<Todo[]>('/tasks');
        setTodos(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError('Failed to fetch tasks. Please try logging in again.');
      }
    };
    fetchTodos();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.task.trim()) return;
    try {
      const response = await api.post<Todo>('/tasks', { task: data.task });
      setTodos([...todos, response.data]);
      reset();
      setError('');
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add task. Please check your login status.');
    }
  };

  const updateTodo = async (id: string, updatedTask: Partial<Todo>) => {
    try {
      // If updating task text, trigger confirmation dialog
      if (updatedTask.task !== undefined) {
        setEditTodoId(id);
        setPendingTask(updatedTask.task);
        setOpenEditDialog(true);
        return;
      }
      // If only updating completed status, proceed directly
      const response = await api.put<Todo>(`/tasks/${id}`, {
        task: todos.find(t => t._id === id)?.task,
        completed: updatedTask.completed ?? todos.find(t => t._id === id)?.completed,
      });
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      setError('');
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update task.');
      throw error; // Re-throw to let TodoItem handle errors if needed
    }
  };

  const confirmEdit = async () => {
    if (!editTodoId || !pendingTask) return;
    try {
      const response = await api.put<Todo>(`/tasks/${editTodoId}`, {
        task: pendingTask,
        completed: todos.find(t => t._id === editTodoId)?.completed ?? false,
      });
      setTodos(todos.map(todo => (todo._id === editTodoId ? response.data : todo)));
      setOpenEditDialog(false);
      setEditTodoId(null);
      setPendingTask(null);
      setError('');
    } catch (error) {
      console.error('Error confirming edit:', error);
      setError('Failed to update task.');
    }
  };

  const deleteTodo = (id: string) => {
    setDeleteTodoId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteTodoId) return;
    try {
      await api.delete(`/tasks/${deleteTodoId}`);
      setTodos(todos.filter(todo => todo._id !== deleteTodoId));
      setOpenDeleteDialog(false);
      setDeleteTodoId(null);
      setError('');
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete task.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          {...register('task', { required: true })}
          label="Add a new task"
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />

      {/* Edit Confirmation Dialog (for task text) */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Confirm Edit Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to update to: "{pendingTask}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmEdit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete Task</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this task: "
            {todos.find(t => t._id === deleteTodoId)?.task || 'Unknown'}"
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoPage;