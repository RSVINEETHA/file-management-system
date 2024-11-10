
import { Container, Typography, Box } from '@mui/material';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [files, setFiles] = useState([]);

    const fetchFiles = async () => {
      try {
        const response = await axios.get('/files');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
  
    useEffect(() => {
      fetchFiles();
    }, []);
  
    const handleUploadSuccess = () => {
      fetchFiles();
    };

  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: { xs: 2, md: 2 },
    backgroundColor: '#f4f6f8',
    borderRadius: 1,
    boxShadow: 1,
  };

  const headerBoxStyle = {
    marginBottom: 4,
  };

  const uploadBoxStyle = {
    border: '2px solid #708090',
    padding: 3,
    borderRadius: 2,
    marginBottom: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  };

  const fileListBoxStyle = {
    width: '100%',
  };

  return (
    <Container sx={containerStyle}>
      <Box sx={headerBoxStyle}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          File Manager
        </Typography>
        <Typography variant="h7" sx={{ color: 'gray' }}>
          Effortlessly store and view your files
        </Typography>
      </Box>

      <Box sx={uploadBoxStyle}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Upload a new file
        </Typography>
        <FileUpload onUploadSuccess={handleUploadSuccess} />
      </Box>

      <Box sx={fileListBoxStyle}>
        <FileList files={files} />
      </Box>
    </Container>
  );
};

export default HomePage;
