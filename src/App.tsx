import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ mt: 4, pt: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;