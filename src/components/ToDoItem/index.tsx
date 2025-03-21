import { useState } from 'react';

export interface Todo {
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
    updateTodo(todo._id, { ...todo, task });
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.task}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;