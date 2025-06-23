import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#60a5fa' : '#2563eb',
      light: mode === 'dark' ? '#93c5fd' : '#60a5fa',
      dark: mode === 'dark' ? '#2563eb' : '#1e40af',
    },
    secondary: {
      main: mode === 'dark' ? '#a78bfa' : '#7c3aed',
      light: mode === 'dark' ? '#c4b5fd' : '#a78bfa',
      dark: mode === 'dark' ? '#7c3aed' : '#5b21b6',
    },
    background: {
      default: mode === 'dark' ? '#000000' : '#f8fafc',
      paper: mode === 'dark' ? '#111111' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#1e293b',
      secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: 'clamp(2rem, 5vw, 2.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          transition: 'all 0.2s ease-in-out',
          '@media (max-width: 600px)': {
            padding: '8px 16px',
            fontSize: '0.875rem',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: mode === 'dark' 
            ? 'linear-gradient(45deg, #2563eb 30%, #7c3aed 90%)'
            : 'linear-gradient(45deg, #1e40af 30%, #6d28d9 90%)',
          boxShadow: mode === 'dark'
            ? '0 3px 15px 0 rgba(96, 165, 250, 0.2)'
            : '0 3px 15px 0 rgba(37, 99, 235, 0.2)',
          '&:hover': {
            background: mode === 'dark'
              ? 'linear-gradient(45deg, #1e40af 30%, #6d28d9 90%)'
              : 'linear-gradient(45deg, #1e3a8a 30%, #5b21b6 90%)',
            boxShadow: mode === 'dark'
              ? '0 5px 20px 0 rgba(96, 165, 250, 0.3)'
              : '0 5px 20px 0 rgba(37, 99, 235, 0.3)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default getTheme; 