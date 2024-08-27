import React from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { servidorBackendEnviosImagemPerfil } from '../../utils/global.js';
import PreviewIcon from '@mui/icons-material/Preview';



export default function NotificationPopup({ id, notification, tratamentoFormal, nomeApelido, urlPerfil }) {
  // Limitar a notificação a 50 caracteres e adicionar "... leia tudo" se for maior
  const maxLength = 50;
  const truncatedText =
    notification.length > maxLength
      ? `${notification.slice(0, maxLength)}... `
      : notification;

  return (
    <Box
      key={id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: 'grey.300',
        boxShadow: 1,
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 3,
        },
      }}
    >
      <Avatar
      src={`${servidorBackendEnviosImagemPerfil}${urlPerfil}`}
      sx={{ mr: 2, width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1,
                 paddingRight:8
       }}>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          {truncatedText}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Enviado por : {tratamentoFormal} {nomeApelido}
        </Typography>
      </Box>
      <IconButton
        color="primary"
        aria-label="Ler mensagem"
        sx={{
          bgcolor: 'primary.light',
          '&:hover': {
            bgcolor: 'primary.main',
            color: 'white',
            paddingLeft:'10px'
          },
        }}
      >
        <PreviewIcon />
      </IconButton>
    </Box>
  );
}
