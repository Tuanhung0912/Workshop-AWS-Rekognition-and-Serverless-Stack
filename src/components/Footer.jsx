import React from 'react';
import { Box, Typography, Link, Stack, IconButton } from '@mui/material';
import { GitHub, Facebook, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 3,
        mt: 'auto',
        textAlign: 'center',
        boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.03)',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
        Simple Image Reconition Lab
      </Typography>
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 1 }}>
        <IconButton component={Link} href="https://github.com/" target="_blank" rel="noopener" color="primary">
          <GitHub />
        </IconButton>
        <IconButton component={Link} href="https://facebook.com/" target="_blank" rel="noopener" color="primary">
          <Facebook />
        </IconButton>
        <IconButton component={Link} href="https://twitter.com/" target="_blank" rel="noopener" color="primary">
          <Twitter />
        </IconButton>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Simple Image Reconition Lab. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer; 