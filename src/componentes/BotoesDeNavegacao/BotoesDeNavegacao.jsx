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
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import MenuCategoria from '../menuCategorias/menuCategoria.jsx';
import { usuarioLogado } from '../../utils/global.js';

export default function BotoesDeNavegacao() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();  // Certifique-se de que useNavigate está importado corretamente



  return (
    <>

    
    <Container>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper
          sx={{
            padding: 2,
            textAlign: 'center',
            color: 'text.secondary',
            elevation: 3,
            alignItems: 'center',
          }}
        >
          <MenuCategoria />
        </Paper>
      </Grid>
    </Grid>
    
    
    <Box sx={{ width: '100%' ,marginTop:'10px'}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction id="principal"   onClick={() => navigate("/")} label="Principal" icon={<BallotRoundedIcon fontSize="large" />} />
        <BottomNavigationAction id="meus-videos" onClick={() => navigate(`/meus-videos/${usuarioLogado}`)}  label="Meus Videos" icon={<ManRoundedIcon fontSize="large" />} />
        <BottomNavigationAction id="meus-videos-favoritos" onClick={() => navigate("/meus-videos-favoritos")} label="Favoritos" icon={<FavoriteIcon fontSize="large" />} />
        <BottomNavigationAction id="listar_canais" onClick={() => navigate("/listar_canais")} label="Lista de canais" icon={<LocationOnIcon fontSize="large" />} />
        <BottomNavigationAction id="cadastrar-video" onClick={()=> navigate("/cadastrar-video")} label="Enviar Vídeo" icon={<SendRoundedIcon fontSize="large" />} />
      </BottomNavigation>
    </Box>

    </Container>
    </>
  );
}
