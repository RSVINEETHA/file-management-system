import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CustomAlert from './CustomAlert'; 

const FileList = ({ files }) => {
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

  const handleDownloadFile = async (fileId) => {
    try {
      const response = await fetch(`/files/download/${fileId}`);
      if (!response.ok) {
        throw new Error('Failed to download file.');
      }
      const blob = await response.blob();
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'downloaded-file';
      
      if (contentDisposition && contentDisposition.includes('filename=')) {
        filename = contentDisposition
          .split('filename=')[1]
          .split(';')[0]
          .replace(/['"]/g, '');
      }

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(downloadUrl);

      setAlert({
        message: 'File downloaded successfully!',
        type: 'success',
        visible: true,
      });
      setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 2000); 
    } catch (error) {
      setAlert({
        message: 'Error while downloading file.',
        type: 'error',
        visible: true,
      });
      console.error(error);
    }
  };

  const handleOpenFile = async (fileId) => {
    try {
      window.open(`http://localhost:8080/files/view/${fileId}`, '_blank'); 
    } catch (error) {
      setAlert({
        message: 'Error while viewing file.',
        type: 'error',
        visible: true,
      });
      console.error(error);
    }
  };

  const tableStyles = {
    container: {
      borderRadius: '8px',
      boxShadow: 3,
    },
    header: {
      color : 'white',
      fontWeight: 'bold',
    },
    cell: {
      padding: '8px 16px',  
    },
    actionIcon: {
      color: '#555',
    },
    nameCell: {
      color: 'blue',
      cursor: 'pointer'
    },
  };

  return (
    <Box>
      {files.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            All files
          </Typography>
          <TableContainer component={Paper} sx={tableStyles.container}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#708090' }}>
                  <TableCell sx={tableStyles.header}>Sr.No</TableCell>
                  <TableCell sx={tableStyles.header}>File Name</TableCell>
                  <TableCell sx={tableStyles.header}>File Size (bytes)</TableCell>
                  <TableCell sx={tableStyles.header}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file, index) => (
                  <TableRow key={file.id} sx={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff' }}>
                    <TableCell sx={tableStyles.cell}>{index + 1}</TableCell>
                    <TableCell
                      sx={[tableStyles.cell, tableStyles.nameCell]}
                      onClick={() => handleOpenFile(file.id)}
                    >
                      {file.name}
                    </TableCell>
                    <TableCell sx={tableStyles.cell}>{file.size}</TableCell>
                    <TableCell sx={tableStyles.cell}>
                      <IconButton
                        sx={tableStyles.actionIcon}
                        onClick={() => handleDownloadFile(file.id)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {alert.visible && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert((prev) => ({ ...prev, visible: false }))}
        />
      )}
    </Box>
  );
};

export default FileList;
