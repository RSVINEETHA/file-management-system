import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = ({ message, type, onClose }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '8px 16px', 
        backgroundColor: 'transparent',
        border: `2px solid ${type === 'success' ? 'green' : 'red'}`,
        color: type === 'success' ? 'green' : 'red',
        borderRadius: '5px',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '300px', 
      }}
    >
      <Typography variant="body2" sx={{ flexGrow: 1, paddingRight: '8px' }}>
        {message}
      </Typography>
      <IconButton
        onClick={onClose}
        sx={{
          color: type === 'success' ? 'green' : 'red',
          padding: 0,
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default CustomAlert;
