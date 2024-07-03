import React from 'react';
import { nomeSistema } from '../../utils/global.js';
import logo from '../../assets/img/logo.png';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

function Logotipo() {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <IconButton onClick={handleItemClick}>
        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' }, color: 'white' }}
        >
          {nomeSistema}
        </Typography>
      </IconButton>
    </Box>
  );
}

export default Logotipo;
