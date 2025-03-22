import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
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
        </Routes>
      </Container>
    </>
  );
};

export default App;