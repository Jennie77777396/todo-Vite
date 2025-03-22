import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Todo App
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manage your tasks efficiently!
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/todos" sx={{ m: 2 }}>
        Go to Todos
      </Button>
    </Box>
  );
};

export default Home;