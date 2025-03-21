import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import TodoList from './components/ToDoList';
import { Todo } from './components/ToDoItem';
import './App.css'; 
interface FormData {
  task: string;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { task: '' },
  });

  useEffect(() => {
    const testAxios = async () => {
      try {
        const response = await axios.get<Todo[]>('http://localhost:5000/tasks');
        console.log('Axios test successful:', response.data);
        setTodos(response.data);
      } catch (error) {
        console.error('Axios test failed:', error);
      }
    };
    testAxios();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post<Todo>('http://localhost:5000/tasks', { task: data.task });
      setTodos([...todos, response.data]);
      reset();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id: string, updatedTask: Partial<Todo>) => {
    try {
      const response = await axios.put<Todo>(`http://localhost:5000/tasks/${id}`, updatedTask);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
        <input
          type="text"
          {...register('task', { required: true })}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;