import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ManRoundedIcon from '@mui/icons-material/ManRounded';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 600 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Principal" icon={<BallotRoundedIcon fontSize="large"  />} />
        <BottomNavigationAction label="Meus Videos" icon={<ManRoundedIcon fontSize="large" />} /> 
        <BottomNavigationAction label="Favoritos" icon={<FavoriteIcon fontSize="large"/>} />
        <BottomNavigationAction label="Lista de canais" icon={<LocationOnIcon fontSize="large" />} />
        <BottomNavigationAction label="Enviar Vídeo" icon={<SendRoundedIcon fontSize="large" />} />

      </BottomNavigation>
    </Box>
  );
}