import { useState } from 'react';
import { ListItem, Checkbox, TextField, Button, Typography } from '@mui/material';

interface Todo {
  _id: string;
  task: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  updateTodo: (id: string, updatedTask: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem = ({ todo, updateTodo, deleteTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [task, setTask] = useState<string>(todo.task);

  const handleToggle = () => {
    updateTodo(todo._id, { ...todo, completed: !todo.completed });
  };

  const handleUpdate = () => {
    updateTodo(todo._id, { ...todo, task }); // Triggers dialog in TodoPage
    setIsEditing(false);
  };

  return (
    <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid #ddd' }}>
      {isEditing ? (
        <>
          <TextField
            value={task}
            onChange={(e) => setTask(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save
          </Button>
        </>
      ) : (
        <>
          <Checkbox checked={todo.completed} onChange={handleToggle} />
          <Typography
            sx={{ textDecoration: todo.completed ? 'line-through' : 'none', flexGrow: 1 }}
          >
            {todo.task}
          </Typography>
          <Button variant="outlined" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => deleteTodo(todo._id)}>
            Delete
          </Button>
        </>
      )}
    </ListItem>
  );
};

export default TodoItem;