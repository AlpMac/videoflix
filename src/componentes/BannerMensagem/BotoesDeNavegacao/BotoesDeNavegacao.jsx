import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import { useNavigate } from 'react-router-dom';

export default function BotoesDeNavegacao() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();  // Certifique-se de que useNavigate está importado corretamente

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction onClick={() => navigate("/")} label="Principal" icon={<BallotRoundedIcon fontSize="large" />} />
        <BottomNavigationAction onClick={() => navigate("/meus-videos")} label="Meus Videos" icon={<ManRoundedIcon fontSize="large" />} />
        <BottomNavigationAction onClick={() => navigate("/meus-videos-favoritos")} label="Favoritos" icon={<FavoriteIcon fontSize="large" />} />
        <BottomNavigationAction onClick={() => navigate("/lista-de-canais")} label="Lista de canais" icon={<LocationOnIcon fontSize="large" />} />
        <BottomNavigationAction onClick={()=> navigate("/cadastrar-video")} label="Enviar Vídeo" icon={<SendRoundedIcon fontSize="large" />} />
      </BottomNavigation>
    </Box>
  );
}
