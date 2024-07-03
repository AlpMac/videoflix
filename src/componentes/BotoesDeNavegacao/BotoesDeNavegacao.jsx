import * as React from 'react';
import { Box, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import ManRoundedIcon from '@mui/icons-material/ManRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { usuarioLogado } from '../../utils/global.js';

export default function BotoesDeNavegacao({ onClose }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'principal', label: 'Principal', icon: <BallotRoundedIcon fontSize="medium" />, onClick: () => navigate("/") },
    { id: 'meus-videos', label: 'Meus Videos', icon: <ManRoundedIcon fontSize="medium" />, onClick: () => navigate(`/meus-videos/${usuarioLogado}`) },
    { id: 'meus-videos-favoritos', label: 'Favoritos', icon: <FavoriteIcon fontSize="medium" />, onClick: () => navigate(`/meus-videos-favoritos/${usuarioLogado}`) },
    { id: 'listar_canais', label: 'Lista de canais', icon: <LocationOnIcon fontSize="medium" />, onClick: () => navigate("/listar_canais") },
    { id: 'cadastrar-video', label: 'Enviar Vídeo', icon: <SendRoundedIcon fontSize="medium" />, onClick: () => navigate("/cadastrar-video") }
  ];

  const handleItemClick = (onClick) => {
    onClick();
    if (onClose) onClose();
  };

  return (
    <Container >
      <Box sx={{ width: '100%' }}>
        <List 
          sx={{ width: '100%', bgcolor: 'white' }}
          component="nav"
        >
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              component="button"
              onClick={() => handleItemClick(item.onClick)}
              sx={{
                textAlign: 'left',
                paddingTop :'2px',
                fontSize: '6px', // Tamanho da fonte ajustado
                backgroundColor: 'transparent', // Remove o fundo cinza
                border: 'none', // Remove a borda
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)', // Cor de fundo ao passar o mouse
                },
                cursor: 'pointer', // Adiciona cursor de ponteiro ao passar o mouse
              }}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText variant="body2" primary={item.label}  /> {/* Tamanho da fonte do texto */}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
