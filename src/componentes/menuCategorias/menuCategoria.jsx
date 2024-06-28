import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MenuButton = styled(Button)(({ theme }) => ({
  width: '100%',
  justifyContent: 'space-between',
  //padding: theme.spacing(1.0),
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

export default function MenuCategoria() {
  const Menus = [
    {
      id: 1,
      title: 'Sistemas',
      submenu: [
        {
          id: 1.1,
          title: 'SIGDEM',
        },
        {
          id: 1.2,
          title: 'LOTUS',
        },
        {
          id: 1.3,
          title: 'WINDOWS',
        },
      ],
    },
    {
      id: 2,
      title: 'SIC',
      submenu: [
        {
          id: 2.1,
          title: 'KAPESKY',
        },
        {
          id: 2.2,
          title: 'PALESTRAS',
        },
      ],
    },
    {
      id: 3,
      title: 'INFRA-ESTRUTURA',
    },
  ];

  const [expandedMenus, setExpandedMenus] = React.useState({});

  const handleClick = (id) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" p={2}>
      {Menus.map((menu) => (
        <Box key={menu.id} mb={2}>
          <MenuButton
            onClick={() => handleClick(menu.id)}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <Typography variant="h8" noWrap>
              {menu.title}
            </Typography>
          </MenuButton>
          {expandedMenus[menu.id] && (
            <Box ml={2} mt={1}>
              {menu.submenu && menu.submenu.map((submenuItem) => (
                <SubmenuItem key={submenuItem.id}>
                  <Typography variant="body1">{submenuItem.title}</Typography>
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
