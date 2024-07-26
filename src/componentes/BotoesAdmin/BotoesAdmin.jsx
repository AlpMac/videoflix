import React from 'react';
import { Box, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const navigate = (path) => {
  // Implementação da navegação
  console.log(`Navegando para: ${path}`);
};

const usuarioLogado = '123'; // Defina o usuário logado corretamente

export default function BotoesAdmin({ onClose, onRelatorioClick }) {
  const menuItems = [
    { id: 'Enviar Mensagem', label: 'Enviar Mensagem', icon: <AddCommentIcon fontSize="medium" />, onClick: () => navigate("/") },
    { id: 'Relatorios', label: 'Relatórios', icon: <AutoGraphIcon fontSize="medium" />, onClick: onRelatorioClick },
    { id: 'Gerenciar Usuarios', label: 'Gerenciar Usuários', icon: <ManageAccountsIcon fontSize="medium" />, onClick: () => navigate(`/meus-videos-favoritos/${usuarioLogado}`) },
  ];

  const handleItemClick = (onClick) => {
    onClick();
    if (onClose) onClose();
  };

  return (
    <Container>
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
              <ListItemText variant="body2" primary={item.label} /> {/* Tamanho da fonte do texto */}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
