import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, useTheme } from '@mui/material';
import { AutoAwesome, DarkMode, LightMode } from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const Header = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar 
        disableGutters 
        sx={{ 
          height: 70, 
          px: { xs: 2, sm: 4 },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AutoAwesome 
            sx={{ 
              color: 'primary.main',
              fontSize: { xs: 24, sm: 28 },
              filter: theme.palette.mode === 'dark'
                ? 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.3))'
                : 'drop-shadow(0 0 8px rgba(37, 99, 235, 0.2))',
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              textDecoration: 'none',
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            AI Vision Lab
          </Typography>
        </Box>

        <IconButton
          onClick={toggleTheme}
          sx={{
            color: 'primary.main',
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark'
                ? 'rgba(96, 165, 250, 0.1)'
                : 'rgba(37, 99, 235, 0.1)',
            },
          }}
        >
          {isDarkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 