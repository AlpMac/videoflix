import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';
import { useEffect, useState } from 'react';

const MenuButton = styled(Button)(({ theme }) => ({
  width: '100%',
  justifyContent: 'space-between',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  border: `0px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SubmenuItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
  cursor: 'pointer',
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function MenuCategoria({ onClose }) {
  const navigate = useNavigate();

  const [listaMenu, setListaMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/listar-menu`);
        const data = response.data;

        // Transformar os dados para agrupar submenus sob menus principais
        const menuMap = {};

        data.forEach(item => {
          const { id, id_menu_principal, descricao_menu, id_sub_menu, descricao_submenu } = item;

          if (!menuMap[id_menu_principal]) {
            menuMap[id_menu_principal] = {
              id_menu_principal,
              descricao_menu,
              submenu: []
            };
          }

          if (id && descricao_submenu) {
            menuMap[id_menu_principal].submenu.push({
              id,
              descricao_submenu
            });
          }
        });

        const listaMenuTransformed = Object.values(menuMap);
        setListaMenu(listaMenuTransformed);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };
    fetchData();
  }, []);

  const [expandedMenus, setExpandedMenus] = useState({});

  const handleClick = (id) => {
    setExpandedMenus((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      return newState;
    });
  };

  const handleCategoriaClick = (id) => {
    navigate(`/categoria/${id}`);
    onClose(); // Chama o evento onClose vindo das props
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" p={2}>
      {listaMenu.map((menu) => (
        <Box key={menu.id_menu_principal} mb={1}>
          <MenuButton
            onClick={() => handleClick(menu.id_menu_principal)}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <Typography variant="body2">
              {menu.descricao_menu}
            </Typography>
          </MenuButton>
          {expandedMenus[menu.id_menu_principal] && (
            <Box ml={2} mt={1}>
              {menu.submenu.map((submenuItem) => (
                <SubmenuItem key={submenuItem.id}
                  onClick={() => handleCategoriaClick(submenuItem.id)}
                >
                  <Typography variant="body1">{submenuItem.descricao_submenu}</Typography>
                  <ArrowRightIcon />
                </SubmenuItem>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
