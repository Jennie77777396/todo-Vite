import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '../utils/api';
import TodoList from '../components/ToDoList';
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';

interface Todo {
  _id: string;
  task: string;
  completed: boolean;
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
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { task: '' },
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get<Todo[]>('/tasks'); // Use api instead of axios
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
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
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id: string, updatedTask: Partial<Todo>) => {
    setEditTodoId(id);
    setPendingTask(updatedTask.task || '');
    setOpenEditDialog(true);
  };

  const confirmEdit = async () => {
    if (!editTodoId || !pendingTask) return;
    try {
      const response = await api.put<Todo>(`/tasks/${editTodoId}`, {
        task: pendingTask,
        completed: todos.find(t => t._id === editTodoId)?.completed || false,
      });
      setTodos(todos.map(todo => (todo._id === editTodoId ? response.data : todo)));
      setOpenEditDialog(false);
      setEditTodoId(null);
      setPendingTask(null);
    } catch (error) {
      console.error('Error updating todo:', error);
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
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
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

      {/* Edit Confirmation Dialog */}
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