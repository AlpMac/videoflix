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
const arrayPerfil = {
  fotoPerfil: 'url_da_foto_perfil',
  nome: 'Nome do Usuário',
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

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="PerfilWEB"
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
            
          </IconButton>      <Logotipo />

          <Box sx={{ flexGrow: 1 }} />
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
            <Box key={id} sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 2 }}>
              <Avatar src={arrayPerfil.fotoPerfil} sx={{ mr: 2 }} />
              <Box>
                <Typography>{notification.notificacao}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Enviado por: TESTE
                </Typography>
                <Button variant="contained" size="small" endIcon={<AnnouncementIcon />}>
                  Ler
                </Button>
              </Box>
            </Box>
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
