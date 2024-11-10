import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import CustomAlert from './CustomAlert'; 

const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain', 'application/json'];

    if (file && !allowedTypes.includes(file.type)) {
      setAlert({
        message: 'Unsupported file type. Choose a valid file (JPG, PNG, PDF, TXT, JSON).',
        type: 'error',
        visible: true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, 2000);
      setSelectedFile(null);
      return;
    }

  const maxSizeInBytes = 15 * 1024 * 1024;

  if (file && file.size > maxSizeInBytes) {
    setAlert({
      message: 'File size exceeds 15MB limit. Please select a file with size less than 15MB.',
      type: 'error',
      visible: true,
    });
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, visible: false }));
    }, 2000);
    setSelectedFile(null);
    return;
  }

    setSelectedFile(file);
    handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploadSuccess();
      setAlert({
        message: 'File uploaded successfully!',
        type: 'success',
        visible: true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, 2000);
    } catch (error) {
      setAlert({
        message: 'Error uploading file.',
        type: 'error',
        visible: true,
      });
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, 2000);
      console.error(error);
    }
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, visible: false }));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
      <label htmlFor="file-upload">
        <input
          id="file-upload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
          size='medium'
        >
          Click to Upload
        </Button>
      </label>
      {alert.visible && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
        />
      )}
    </Box>
  );
};

export default FileUpload;
