import React, { useState } from 'react'
import { Typography, Box, Fade, CircularProgress, useTheme, Dialog, DialogTitle, DialogContent, IconButton, Button } from '@mui/material'
import { AutoAwesome, Close } from '@mui/icons-material'

const ResultViewer = ({ result, loading }) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  if (!result && !loading) {
    return (
      <Box
        sx={{
          height: 260,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          minWidth: 0,
        }}
      >
        <AutoAwesome 
          sx={{ 
            fontSize: 40, 
            mb: 2, 
            opacity: 0.5,
            color: theme.palette.mode === 'dark' ? 'primary.main' : 'secondary.main',
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            opacity: 0.7,
            textAlign: 'center',
            fontSize: '1rem',
          }}
        >
          Upload an image to see the analysis
        </Typography>
      </Box>
    )
  }

  return (
    <Fade in={true} timeout={500}>
      <Box 
        sx={{ 
          height: 320,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {loading ? (
          <Box sx={{ 
            flex: 1,
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 2,
            p: 2,
          }}>
            <CircularProgress 
              size={40} 
              sx={{
                color: theme.palette.mode === 'dark' ? 'primary.main' : 'secondary.main',
              }}
            />
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{
                fontSize: '1rem',
                textAlign: 'center',
              }}
            >
              Analyzing your image...
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                flex: 1,
                p: 2,
                overflow: 'auto',
                minWidth: 0,
                maxHeight: 220,
                wordBreak: 'break-word',
                background: 'none',
                '&::-webkit-scrollbar': {
                  width: '8px',
                  height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.12)',
                  borderRadius: '4px',
                },
              }}
            >
              <pre style={{ 
                margin: 0, 
                fontSize: '0.95em',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                color: theme.palette.text.primary,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                maxHeight: 180,
                overflow: 'hidden',
                transition: 'max-height 0.3s',
              }}>
                {JSON.stringify(result, null, 2).split('\n').slice(0, 10).join('\n') + (JSON.stringify(result, null, 2).split('\n').length > 10 ? '\n... (Xem chi tiết)' : '')}
              </pre>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpenDialog(true)}
                size="small"
                sx={{ fontWeight: 600 }}
              >
                Xem chi tiết
              </Button>
            </Box>
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
                Chi tiết JSON Script
                <IconButton onClick={() => setOpenDialog(false)}>
                  <Close />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers sx={{ bgcolor: 'background.default' }}>
                <Box sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                  <pre style={{
                    margin: 0,
                    fontSize: '1em',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    color: theme.palette.text.primary,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </Box>
              </DialogContent>
            </Dialog>
          </>
        )}
      </Box>
    </Fade>
  )
}

export default ResultViewer; 