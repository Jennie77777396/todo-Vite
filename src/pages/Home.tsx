import { Typography, Box, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, mb: 2 }}
        >
          Welcome to the Todo App
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Start with logging in to your account, or register if you haven’t.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/register"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;