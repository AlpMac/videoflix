import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Drawer from '@mui/material/Drawer';
import BannerMensagem from '../../componentes/BannerMensagem/BannerMensagem.jsx';
import Avatar from '@mui/material/Avatar';
import MenuCategoria from '../../componentes/menuCategorias/menuCategoria.jsx';
import BotoesDeNavegacao from '../../componentes/BotoesDeNavegacao/BotoesDeNavegacao.jsx';
import Logotipo from '../../componentes/logotipo/logotipo.jsx';
import NotificationPopup from '../../componentes/notificacaPopUp/notificacaoPopUp.jsx'; // Verifique se o caminho do componente está correto
import Popover from '@mui/material/Popover'; // Importe o Popover do Material-UI
import api from '../../services/api.js'; // Importe a instância do Axios ou fetch
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Button } from '@mui/material';

export default function PrimarySearchAppBar() {
  const arrayPerfil = {
    idUsuario: 1,
    nome: '3º-PD-Alpande',
    fotoPerfil: 'https://avatars.githubusercontent.com/u/89029909?v=4',
    perfil: '1',
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null);
  const [listaNotificacao, setListaNotificacao] = useState([]); // Corrigido para setListaNotificacao

  useEffect(() => {
    // Exemplo de uso do useEffect para buscar notificações
    // Supondo que 'api' seja a instância correta do Axios ou fetch
    api.get(`/notificacao`)
      .then((response) => {
        setListaNotificacao(response.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar notificações:", err);
      });
  }, []); // Array vazio indica que useEffect será executado apenas uma vez, após a montagem

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const menuId = 'PerfilWEB';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <img
          src={arrayPerfil.fotoPerfil}
          alt="Perfil"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            marginRight: '10px',
          }}
        />
        {arrayPerfil.nome}
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Alterar foto</MenuItem>
      <MenuItem onClick={handleMenuClose}>Alterar senha</MenuItem>
      <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Logotipo />
          <Box sx={{ flexGrow: 1 }} />
          <BannerMensagem />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={5} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationsClick}
            >
              <Badge badgeContent={listaNotificacao.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={arrayPerfil.fotoPerfil} alt="Ícone do Canal" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Popover
        open={Boolean(notificationsAnchorEl)}
        anchorEl={notificationsAnchorEl}
        onClose={handleNotificationsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >

      <Box sx={{ p: 2 }}>
        
            {listaNotificacao.map((notification, id) => (
              <> <Divider orientation="horizontal"  />
               <Box key={id} sx={{ display: 'flex', alignItems: 'center', mb:2 ,mt:2 }}>
                <Avatar src={arrayPerfil.fotoPerfil} sx={{ mr: 2 }}></Avatar> {/* Ícone da esquerda, você pode substituir pela imagem que quiser */}
                <Box>
                  <Typography>{notification.notificacao}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Enviado por: TESTE
                  </Typography>
                  <Typography variant="body1" color="textTerciario">
                  <Button variant="contained" size="small" endIcon={<AnnouncementIcon />}>
                      Ler 
                    </Button>
                  </Typography>
                 
                </Box>
               
              
              </Box></>
            ))}
       </Box>
      
      
      </Popover>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            marginTop: '64px',
            height: 'calc(100% - 64px)',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
      >
        <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <Typography variant="h6" sx={{ padding: '10px' }}>
            {/* Conteúdo do cabeçalho do Drawer */}
          </Typography>
          <Divider textAlign="left">Categorias</Divider>
          <MenuCategoria onClose={handleDrawerClose} />
          <Divider textAlign="left">Você</Divider>
          <BotoesDeNavegacao onClose={handleDrawerClose} />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '10px' }}>
        {/* Conteúdo principal da página */}
      </Box>
    </Box>
  );
}
