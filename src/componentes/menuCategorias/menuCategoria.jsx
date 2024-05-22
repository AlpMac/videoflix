import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
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

  const [anchorEls, setAnchorEls] = React.useState({});

  const handleClick = (event, id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleClose = (id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: null }));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Box display="flex" gap={2} alignItems="center">
        {Menus.map((menu) => (
          <Box key={menu.id} display="flex" justifyContent="center">
            <Button
              id={`demo-customized-button-${menu.id}`}
              aria-controls={anchorEls[menu.id] ? `demo-customized-menu-${menu.id}` : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEls[menu.id] ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={(event) => handleClick(event, menu.id)}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {menu.title}
            </Button>
            <StyledMenu
              id={`demo-customized-menu-${menu.id}`}
              MenuListProps={{
                'aria-labelledby': `demo-customized-button-${menu.id}`,
              }}
              anchorEl={anchorEls[menu.id]}
              open={Boolean(anchorEls[menu.id])}
              onClose={() => handleClose(menu.id)}
            >
              {menu.submenu && menu.submenu.map((submenuItem) => (
                <MenuItem key={submenuItem.id} onClick={() => handleClose(menu.id)} disableRipple>
                  <Link href="#" underline="hover">
                    {submenuItem.title}
                  </Link>
                </MenuItem>
              ))}
            </StyledMenu>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
