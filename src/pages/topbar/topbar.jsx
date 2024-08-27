import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import api from '../../services/api.js';
import BotoesAdmin from '../../componentes/BotoesAdmin/BotoesAdmin.jsx';
import Relatorios from '../../componentes/Relatorios/Relatorios.jsx';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import MenuCategoria from '../../componentes/menuCategorias/menuCategoria.jsx';
import BotoesDeNavegacao from '../../componentes/BotoesDeNavegacao/BotoesDeNavegacao.jsx';
import Logotipo from '../../componentes/logotipo/logotipo.jsx';
import CloseIcon from '@mui/icons-material/Close';
import NotificationPopup from '../../componentes/notificacaPopUp/notificacaoPopUp.jsx'
import {  servidorBackendEnviosImagemPerfil } from '../../utils/global.js';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {ListItemIcon } from '@mui/material';

//buscar depois do banco
const arrayPerfil = {
  fotoPerfil: '031b68882265722dede1080a200f015a.jpg',
  nome: '3SG-PD ALPANDE',
};

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [listaNotificacao, setListaNotificacao] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    api.get(`/notificacao`)
      .then((response) => {
        setListaNotificacao(response.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar notificações:", err);
      });
  }, []);

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

  const handleRelatorioClick = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
   // Componente de Menu usuario 
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="PerfilWEB"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      sx={{ mt: 1, boxShadow: 3 }}
    >
      <MenuItem>
        <ListItemIcon>
          <Avatar
            src={`${servidorBackendEnviosImagemPerfil}${arrayPerfil.fotoPerfil}`}
            alt="Perfil"
            sx={{ width: 50, height: 50, mr: 2 }}
          />
        </ListItemIcon>
        <Typography variant="inherit" noWrap>
          {arrayPerfil.nome}
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <PhotoCameraIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Alterar foto</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <LockIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Alterar senha</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Sair</Typography>
      </MenuItem>
    </Menu>

  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {/*Butao do Menu*/ }
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
          {/*Icone logotipo*/}
          <Logotipo />
          {/*Espacamento necessario */}
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {/*Icone de Mensagem Sino  FAZER DEPOIS 
            <IconButton
              size="large"
              aria-label="Novas Mensagens"
              color="inherit"
            >
              <Badge badgeContent={5} color="error">
              <NotificationsIcon />
              </Badge>
            </IconButton>*/} 
            
            {/*Icone de atualização carta */}
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationsClick}
            >
              <Badge badgeContent={listaNotificacao.length} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            {/*Icone do avatar do usuario */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar 
              src={`${servidorBackendEnviosImagemPerfil}${arrayPerfil.fotoPerfil}`}
              alt="Ícone do Usuario" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/*Render Menu é o componente quando clicar no avatar vai abrir*/}
      {renderMenu}
      {/**Este elemento é o popup que abre assim que clica no icone de Carta */}
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
      <Box sx={{ p: 2, borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}>
        <Typography gutterBottom variant="h6">
          Mensagem do Administrador do Sistema
        </Typography>
      <Divider sx={{marginBottom:2}}/>
         {listaNotificacao.map((notification, id) => (
          
          <NotificationPopup
          key ={id} 
          id = {id}
          notification={notification.notificacao} 
          tratamentoFormal={notification.tratamento_formal} 
          nomeApelido={notification.nome_apelido}
          urlPerfil = {notification.url_perfil}    
          />
        ))}
      </Box>
      </Popover>

      {/*Este é o Menu que abre a esquerda com as opções de navegacao */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
      > <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 0.5 }}>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ overflow: 'auto' }}>
        
        <Divider textAlign="left"
        
        >Categorias </Divider>
          <MenuCategoria onClose={handleDrawerClose}/>
          <Divider textAlign="left">Navegação</Divider>

          <BotoesDeNavegacao onClose={handleDrawerClose} />
          <Divider textAlign="left">Administração</Divider>
          <BotoesAdmin onClose={handleDrawerClose} onRelatorioClick={handleRelatorioClick} />
          <Divider />
        </Box>
      </Drawer>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="relatorio-modal-title"
        aria-describedby="relatorio-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Relatorios />
        </Box>
      </Modal>
    </Box>
  );
}
