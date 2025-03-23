import { useState } from 'react';
import {
  ListItem,
  Checkbox,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from '@mui/material';

interface Todo {
  _id: string;
  task: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  updateTodo: (id: string, updatedTask: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => void;
}

const TodoItem = ({ todo, updateTodo, deleteTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [task, setTask] = useState<string>(todo.task);
  const [confirmToggleOpen, setConfirmToggleOpen] = useState<boolean>(false);
  const [newCompletedStatus, setNewCompletedStatus] = useState<boolean>(todo.completed);

  const handleToggle = () => {
    setNewCompletedStatus(!todo.completed);
    setConfirmToggleOpen(true);
  };

  const confirmToggle = async () => {
    try {
      await updateTodo(todo._id, { completed: newCompletedStatus });
      setConfirmToggleOpen(false);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleUpdate = () => {
    updateTodo(todo._id, { task });
    setIsEditing(false);
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 1, sm: 2 },
        borderBottom: '1px solid #ddd',
        py: { xs: 1.5, sm: 1 },
        width: '100%'
      }}
    >
      {isEditing ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
            width: '100%',
          }}
        >
          <TextField
            value={task}
            onChange={(e) => setTask(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ width: { xs: '100%', sm: 'auto' } }} // Full width on iPhone
          >
            Save
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              mb: { xs: 1, sm: 0 }, // Margin bottom on iPhone
            }}
          >
            <Checkbox checked={todo.completed} onChange={handleToggle} />
            <Typography
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                flexGrow: 1,
                fontSize: { xs: '0.9rem', sm: '1rem' }, // Smaller on iPhone
              }}
            >
              {todo.task}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'row' },
              gap: 1,
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'space-between', sm: 'flex-start' },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setIsEditing(true)}
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, flexGrow: 1 }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteTodo(todo._id)}
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, flexGrow: 1 }}
            >
              Delete
            </Button>
          </Box>
        </>
      )}

      {/* Confirmation Dialog for Toggling Completed Status */}
      <Dialog open={confirmToggleOpen} onClose={() => setConfirmToggleOpen(false)}>
        <DialogTitle>Confirm Task Status Change</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Are you sure you want to mark this task as{' '}
            {newCompletedStatus ? 'complete' : 'incomplete'}?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Button
            onClick={() => setConfirmToggleOpen(false)}
            color="secondary"
            fullWidth={true}
            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmToggle}
            color="primary"
            fullWidth={true}
            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
};

export default TodoItem;