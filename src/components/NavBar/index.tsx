import { AppBar, Toolbar, Typography, Button, IconButton, Tooltip, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/themeSlice';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: { xs: 'center', sm: 'center' },
          py: { xs: 1, sm: 0 }, 
          justifyContent: { xs: 'center', sm: 'space-between' },
        }}
      >
        <Link to="/home" style={{ textDecoration: 'none', color: mode === 'light' ? 'white' : 'inherit' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: { sm: 1 }, 
              fontSize: { xs: '1.1rem', sm: '1.25rem' }, 
              mb: { xs: 1, sm: 0 }, 
            }}
          >
            Todo App
          </Typography>
        </Link>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: { xs: 1, sm: 2 }, 
            alignItems: 'center',
            ml: { sm: 'auto' },
            justifyContent: { xs: 'center', sm: 'flex-end' },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          {isAuthenticated ? (
            <>
              <Link to="/home" style={{ textDecoration: 'none', color: mode === 'light' ? 'white' : 'inherit' }}>
                <Button
                  color="inherit"
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link to="/todos" style={{ textDecoration: 'none', color: mode === 'light' ? 'white' : 'inherit' }}>
                <Button
                  color="inherit"
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  Todo
                </Button>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none', color: mode === 'light' ? 'white' : 'inherit' }}>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: mode === 'light' ? 'white' : 'inherit' }}>
                <Button
                  color="inherit"
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none', color: mode === 'light' ? 'white' : 'inherit' }}>
                <Button
                  color="inherit"
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
          <Tooltip title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
            <IconButton
              color="inherit"
              onClick={() => dispatch(toggleTheme())}
              sx={{ ml: { sm: 1 }, mt: { xs: 1, sm: 0 } }} 
            >
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;