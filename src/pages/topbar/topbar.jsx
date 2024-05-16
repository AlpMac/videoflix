import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Drawer from '@mui/material/Drawer';
import MenuPrincipal from '../../componentes/MenuPrincipal/MenuPrincipal.jsx';
import BannerMensagem from '../../componentes/BannerMensagem/BannerMensagem.jsx';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';

// Estilos para os componentes
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '30%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  // Estados para o WEB
  const [anchorElNotificacao, setAnchorElNotificacao] = React.useState(null);
  const [anchorElMensagem, setAnchorElMensagem] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  // Estados para o WEB
  const isMenuOpenNotificacao = Boolean(anchorElNotificacao);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMenuOpeMensagem = Boolean(anchorElMensagem);

  // Estados para o WEB - "MOBILE MENU"
  const isMenuOpen = Boolean(anchorEl);

  // Funções de abertura dos menus
  const handleProfileMenuOpenNotificacao = (event) => {
    setAnchorElNotificacao(event.currentTarget);
  };

  const handleProfileMenuOpenMensagem = (event) => {
    setAnchorElMensagem(event.currentTarget);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseNotificacao = () => {
    setAnchorElNotificacao(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseMensagem = () => {
    setAnchorElMensagem(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  // Menu de perfil para o WEB
  const menuId = 'PerfilWEB';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  // Menu de notificação para o WEB
  const menuIdNotificacao = 'Notificação';
  const renderMenuNotificacao = (
    <Menu
      anchorEl={anchorElNotificacao}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpenNotificacao}
      onClose={handleMenuCloseNotificacao}
      display= 'flex'
    >
      <MenuItem onClick={handleMenuCloseNotificacao}
       sx= {{
        borderBottom: `1px solid`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%', // Adiciona largura máxima para o MenuItem
        maxWidth: '600px', // Define a largura máxima do menu
        
       }}
      >
      
      <Badge badgeContent={'New'}
       color="error"
       sx={{ transform: 'scale(0.8)', pb: '5px'}}
       >
                <PlayCircleOutlineRoundedIcon   sx={{ transform: 'scale(1.8)' }} />
              </Badge>
       <Typography variant="inherit" noWrap sx={{ marginLeft: 1.5 }} > 
       Como Instalar o Windows usando um cd de instalação e um pendrive
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  // Menu de mensagem para o WEB
  const menuIdMensagem = 'Mensagem';
  const renderMenuMensagem = (
    <Menu
      anchorEl={anchorElMensagem}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpeMensagem}
      onClose={handleMenuCloseMensagem}
    >
      <MenuItem onClick={handleMenuCloseMensagem}>Profile</MenuItem>
      <MenuItem onClick={handleMenuCloseMensagem}>My account</MenuItem>
    </Menu>
  );

  // Menu móvel
  const mobileMenuId = 'PerfilMobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpenMensagem}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpenNotificacao}>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" aria-label="account of current user" aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Ícone de menu para abrir o Drawer */}
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

          {/* Título do site */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>

          {/* Barra de pesquisa */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {/* Elementos do WEB */}
          <Box sx={{ flexGrow: 1 }} />
          <BannerMensagem />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="4 novas Mensagem"
              aria-controls={menuIdMensagem}
              aria-haspopup="true"
              onClick={handleProfileMenuOpenMensagem}
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              aria-controls={menuIdNotificacao}
              aria-haspopup="true"
              onClick={handleProfileMenuOpenNotificacao}
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
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {/* Ícone de menu "Mais" para dispositivos móveis */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para dispositivos móveis */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
      >
        <MenuPrincipal />
      </Drawer>

      {/* Renderização dos menus */}
      {renderMobileMenu}
      {renderMenu}
      {renderMenuNotificacao}
      {renderMenuMensagem}
    </Box>
  );
}
