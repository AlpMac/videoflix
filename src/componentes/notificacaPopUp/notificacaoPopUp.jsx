// NotificationPopup.jsx

import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import api from '../../services/api.js';





export default function NotificationPopup({ anchorEl, open, onClose, notifications }) {
    const [listaNotificacao, setlistaNotificacao] = useState([]);

  
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Typography sx={{ p: 2 }}>
          <div>
            {notifications}
          </div>
        
      </Typography>
    </Popover>
  );
}
