import { List, Typography, Box } from '@mui/material';
import TodoItem from '../TodoItem';

interface Todo {
  _id: string;
  task: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  updateTodo: (id: string, updatedTask: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => void;
}

const TodoList = ({ todos, updateTodo, deleteTodo }: TodoListProps) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: { xs: 1, sm: 2 }, 
        mx: 'auto', 
      }}
    >
      {todos.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ py: { xs: 1, sm: 2 }, fontSize: { xs: '0.9rem', sm: '1rem' } }}
        >
          No tasks yet. Add one to get started!
        </Typography>
      ) : (
        <List sx={{ px: { xs: 0, sm: 1 } }}>
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </List>
      )}
    </Box>
  );
};

export default TodoList;