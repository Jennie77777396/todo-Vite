import { List, Typography, Box } from '@mui/material';
import TodoItem from '../TodoItem';

interface Todo {
  _id: string;
  task: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  updateTodo: (id: string, updatedTask: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
}

const TodoList = ({ todos, updateTodo, deleteTodo }: TodoListProps) => {
  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 2 }}>
      {todos.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 2 }}>
          No tasks yet. Add one to get started!
        </Typography>
      ) : (
        <List>
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