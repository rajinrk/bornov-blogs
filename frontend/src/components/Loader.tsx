import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ text = 'Loading...', fullScreen = false }) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
    : 'flex flex-col items-center justify-center min-h-[200px]';

  return (
    <Box className={containerClasses}>
      <Box className="bg-blue-900 rounded-lg p-6 flex flex-col items-center gap-4">
        <CircularProgress size={40} className="text-white" />
        <Typography variant="body1" className="text-white">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Loader; 