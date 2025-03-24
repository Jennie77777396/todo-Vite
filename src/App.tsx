import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import Start from './pages/Start'
import TodoPage from './pages/TodoPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]); 

  const noNavBarRoutes = ['/', '/login', '/register'];

  return (
    <>
      {isAuthenticated && !noNavBarRoutes.includes(location.pathname) && <NavBar />}
      <Container sx={{ mt: 4, pt: 2 }}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/home" element={<Home />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;