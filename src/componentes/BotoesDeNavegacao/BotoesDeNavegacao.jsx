import * as React from 'react';
import { Box, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { usuarioLogado } from '../../utils/global.js';
import CaminhoNavegacao from '../CaminhoNavegacao/CaminhoNavegacao.jsx';

export default function BotoesDeNavegacao() {
  const navigate = useNavigate();


  const menuItems = [
    { id: 'principal', label: 'Principal', icon: <BallotRoundedIcon fontSize="medium" />, onClick: () => navigate("/") },
    { id: 'meus-videos', label: 'Meus Videos', icon: <ManRoundedIcon fontSize="medium" />, onClick: () => navigate(`/meus-videos/${usuarioLogado}`) },
    { id: 'meus-videos-favoritos', label: 'Favoritos', icon: <FavoriteIcon fontSize="medium" />, onClick: () => navigate(`/meus-videos-favoritos/${usuarioLogado}`) },
    { id: 'listar_canais', label: 'Lista de canais', icon: <LocationOnIcon fontSize="medium" />, onClick: () => navigate("/listar_canais") },
    { id: 'cadastrar-video', label: 'Enviar Vídeo', icon: <SendRoundedIcon fontSize="medium" />, onClick: () => navigate("/cadastrar-video") }
  ];

  return (
    <Container>
      <Box sx={{ width: '100%', marginTop: '10px' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              component="button"
              onClick={item.onClick}
              sx={{
                textAlign: 'left',
                fontSize: '1rem', // Tamanho da fonte ajustado
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ fontSize: '0.875rem' }} /> {/* Tamanho da fonte do texto */}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
