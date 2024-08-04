import * as React from 'react';
import LinearProgressWithLabel from '../LinearProgresWithLabel/LinearProgresWithLabel.jsx';
import Box from '@mui/material/Box';

export default function UploadProgress({ progress }) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}