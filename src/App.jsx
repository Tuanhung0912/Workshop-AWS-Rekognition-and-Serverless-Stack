import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  IconButton,
  Stack,
  Fade,
  Alert,
  Snackbar,
  ThemeProvider as MuiThemeProvider,
  Paper,
  useMediaQuery,
} from '@mui/material'
import { CloudUpload, Delete, Upload, RestartAlt, Search } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import ResultViewer from './components/ResultViewer'
import Header from './components/Header'
import getTheme from './theme'
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext'
import Footer from './components/Footer'

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`

const StyledDropZone = styled(Box)(({ theme, isDragging }) => ({
  border: `2px dashed ${isDragging ? theme.palette.primary.main : theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: isDragging 
    ? theme.palette.mode === 'dark' 
      ? 'rgba(96, 165, 250, 0.1)'
      : 'rgba(37, 99, 235, 0.1)'
    : theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.03)'
      : 'rgba(0, 0, 0, 0.02)',
  padding: theme.spacing(8),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: { xs: 300, sm: 400 },
  maxWidth: '100%',
  boxSizing: 'border-box',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(96, 165, 250, 0.1)'
      : 'rgba(37, 99, 235, 0.1)',
    borderColor: theme.palette.primary.main,
  },
}))

const FullHeightContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#000000',
})

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  height: 'calc(100vh - 70px)', // 70px is header height
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto',
  },
}))

const Section = styled(Box)(({ theme }) => ({
  flex: '0 0 50%', // Exactly 50% width
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(4),
  '&:first-of-type': {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.down('md')]: {
    flex: 'none',
    height: 'calc(100vh - 70px)',
    '&:first-of-type': {
      borderRight: 'none',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
}))

const ContentBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.1)',
}))

const AppContent = () => {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode ? 'dark' : 'light');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [leftHeight, setLeftHeight] = useState(undefined);
  const [uploadingS3, setUploadingS3] = useState(false);
  const [s3Success, setS3Success] = useState(false);
  const [s3Error, setS3Error] = useState(null);
  const leftBoxRef = useRef();

  useEffect(() => {
    if (leftBoxRef.current) {
      setLeftHeight(leftBoxRef.current.offsetHeight);
    }
  }, [preview, image, loading]);

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        setImage(file)
        setPreview(URL.createObjectURL(file))
        setResult(null)
        setError(null)
      } else {
        setError('Please upload an image file')
      }
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
    } else {
      setError('Please upload an image file')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleUpload = async () => {
    if (!image) return

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', image)

    try {
      const res = await axios.post('https://httpbin.org/post', formData)
      setResult(res.data)
    } catch (error) {
      setError('Upload failed. Please try again.')
      console.error('Upload failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setImage(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }

  const handleUploadToS3 = async () => {
    if (!image || !result) return;
    setUploadingS3(true);
    setS3Error(null);
    setS3Success(false);

    const formData = new FormData();
    formData.append('file', image);
    formData.append('result', JSON.stringify(result));

    try {
      // Thay URL này bằng endpoint backend của bạn
      await axios.post('https://your-backend/upload-to-s3', formData);
      setS3Success(true);
    } catch (err) {
      setS3Error('Upload to S3 failed. Please try again.');
    } finally {
      setUploadingS3(false);
    }
  };

  // Responsive: stack vertically on mobile, side by side on desktop
  const showSideBySide = !!preview && !isMobile;

  return (
    <MuiThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.default',
        transition: 'background-color 0.3s ease',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <Header />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            py: { xs: 2, md: 6 },
            boxSizing: 'border-box',
            gap: { xs: 3, md: 6 },
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* Left: Upload/Preview/Buttons */}
          <Box
            ref={leftBoxRef}
            sx={{
              maxWidth: 480,
              width: '100%',
              boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 4,
              boxShadow: 3,
              minHeight: 420,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 2, sm: 3, md: 4 },
              mb: { xs: 3, md: 0 },
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                mb: { xs: 2, sm: 4 },
                color: 'primary.main',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Image Analysis
            </Typography>
            {preview ? (
              <Box sx={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3, alignItems: 'flex-start', justifyContent: 'center', maxWidth: '100%' }}>
                {/* Preview + Buttons */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%' }}>
                  <CardMedia
                    component="img"
                    image={preview}
                    alt="Preview"
                    sx={{
                      width: '100%',
                      maxWidth: 320,
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: 2,
                      mb: 2,
                      boxShadow: 2,
                      maxWidth: '100%',
                    }}
                  />
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                    mb: 1,
                  }}>
                    <Button
                      variant="contained"
                      onClick={handleUpload}
                      startIcon={<Search />}
                      disabled={loading}
                      fullWidth
                      sx={{
                        background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
                        color: 'white',
                        borderRadius: 3,
                        fontWeight: 600,
                        boxShadow: 3,
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
                          boxShadow: 6,
                        },
                      }}
                    >
                      {loading ? 'Analyzing...' : 'Analyze Image'}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleUploadToS3}
                      startIcon={<CloudUpload />}
                      disabled={uploadingS3}
                      fullWidth
                      sx={{
                        background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
                        color: 'white',
                        borderRadius: 3,
                        fontWeight: 600,
                        boxShadow: 3,
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #16a34a 0%, #22d3ee 100%)',
                          boxShadow: 6,
                        },
                      }}
                    >
                      {uploadingS3 ? 'Uploading...' : 'Upload to S3'}
                    </Button>
                  </Stack>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClear}
                    startIcon={<Delete />}
                    fullWidth
                    sx={{
                      borderRadius: 3,
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderWidth: 2,
                      borderColor: '#ef4444',
                      color: '#ef4444',
                      background: 'rgba(239,68,68,0.08)',
                      mb: 1,
                      '&:hover': {
                        background: '#ef4444',
                        color: 'white',
                        borderColor: '#ef4444',
                      },
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    component="label"
                    variant="text"
                    color="secondary"
                    startIcon={<RestartAlt />}
                    sx={{
                      mt: 2,
                      fontWeight: 500,
                      color: '#38bdf8',
                      textTransform: 'none',
                      fontSize: '1rem',
                      '&:hover': {
                        color: '#0ea5e9',
                        textDecoration: 'underline',
                        background: 'transparent',
                      },
                    }}
                  >
                    Choose another image
                    <VisuallyHiddenInput type="file" accept="image/*" onChange={handleChange} />
                  </Button>
                </Box>
              </Box>
            ) : (
              <StyledDropZone
                isDragging={isDragging}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                component="label"
                sx={{ width: '100%', maxWidth: 420, maxWidth: '100%' }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                <Upload sx={{ fontSize: { xs: 50, sm: 80 }, color: 'primary.main', mb: 3, opacity: 0.8 }} />
                <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 600, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                  Drop your image here
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  or click to browse
                </Typography>
              </StyledDropZone>
            )}
          </Box>

          {/* Right: ResultViewer (only show if image is selected) */}
          {image && (
            <Box
              sx={{
                maxWidth: 480,
                width: '100%',
                boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 4,
                boxShadow: 3,
                minHeight: 420,
                height: leftHeight ? leftHeight : 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  mb: { xs: 2, sm: 4 },
                  color: 'secondary.main',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                Results
              </Typography>
              <Box sx={{ width: '100%', maxWidth: 420, flex: 1 }}>
                <ResultViewer result={result} loading={loading} />
              </Box>
            </Box>
          )}
        </Box>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ 
            vertical: 'bottom', 
            horizontal: isMobile ? 'center' : 'right'
          }}
        >
          <Alert 
            severity="error" 
            onClose={() => setError(null)}
            sx={{ 
              bgcolor: theme.palette.mode === 'dark' ? 'error.dark' : 'error.light',
              color: theme.palette.mode === 'dark' ? 'white' : 'error.dark',
            }}
          >
            {error}
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!s3Success}
          autoHideDuration={4000}
          onClose={() => setS3Success(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: isMobile ? 'center' : 'right'
          }}
        >
          <Alert
            severity="success"
            onClose={() => setS3Success(false)}
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? 'success.dark' : 'success.light',
              color: theme.palette.mode === 'dark' ? 'white' : 'success.dark',
            }}
          >
            Upload to S3 successful!
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!s3Error}
          autoHideDuration={6000}
          onClose={() => setS3Error(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: isMobile ? 'center' : 'right'
          }}
        >
          <Alert
            severity="error"
            onClose={() => setS3Error(null)}
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? 'error.dark' : 'error.light',
              color: theme.palette.mode === 'dark' ? 'white' : 'error.dark',
            }}
          >
            {s3Error}
          </Alert>
        </Snackbar>
        <Footer />
      </Box>
    </MuiThemeProvider>
  )
}

const App = () => {
  React.useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.body.style.maxWidth = '100vw';
  }, []);
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  )
}

export default App
