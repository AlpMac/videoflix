import React from 'react';
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


export default function PrimarySearchAppBar() {
  // Dados do perfil 1 é administrador 0 normal 
  const arrayPerfil = {
    idUsuario: 1,
    //pegaremos do locate o nome 
    nome: '3º-PD-Alpande',
    fotoPerfil: 'https://avatars.githubusercontent.com/u/89029909?v=4',
    perfil: '1',
  };

  // Estados para os menus e drawer
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  // Estados para o menu
  const isMenuOpen = Boolean(anchorEl);
//  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const menuId = 'PerfilWEB';
  //MENU PERFIL
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
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
            >
              <Badge badgeContent={17} color="error">
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
      <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '64px', // altura da AppBar
          height: 'calc(100% - 64px)', // ajuste para altura total menos a AppBar
          display: 'flex', // Usar flexbox para o layout
          flexDirection: 'column', // Dispor os itens em coluna
        },
      }}
      variant="temporary"
      anchor="left"
      open={openDrawer}
      onClose={handleDrawerClose}
    >
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <Typography variant="h6" sx={{ padding: '10px' }}>
        </Typography>

        <Divider textAlign="left">Categorias</Divider>

        <MenuCategoria />

        <Divider textAlign="left">Você</Divider>

        <BotoesDeNavegacao onClose={handleDrawerClose} />
      </Box>
    </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '10px' }}>
       
      </Box>
    </Box>
  );
}
