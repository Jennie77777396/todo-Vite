import TodoItem from '../ToDoItem';
import { Todo } from '../ToDoItem';

interface TodoListProps {
  todos: Todo[];
  updateTodo: (id: string, updatedTask: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
}

const TodoList = ({ todos, updateTodo, deleteTodo }: TodoListProps) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;