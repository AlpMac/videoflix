import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Link from '@mui/material/Link';
import './MenuPrincipal.css'; // Importe o arquivo CSS aqui


// ATENÇÃO - MENU DESABILITADO PARA NOVO MENU FIXO ACIMA DOS BOTÕES
{/*Desabilitei o menu principal para criar o menu fixo acima dos botoes */} 

export default function MenuPrincipal() {
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

  return (
    <div className="menu-container">
      {Menus.map((menu, index) => (
        <Accordion key={menu.id} className="menu-item">
          <AccordionSummary 
            expandIcon={<ArrowDownwardIcon />}
            aria-controls={`panel${menu.id}-content`}
            id={`panel${menu.id}-header`}
            sx={{ backgroundColor: '#f0f0f0',
                   borderBottom: '1px solid #ccc',
                   padding: '0 16px',
                   '&.Mui-expanded': {
                     backgroundColor: '#f0f0f0',
                   }}
    
            }
          >
            <Typography className="menu-title">{menu.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="submenu-list">
              {menu.submenu &&
                menu.submenu.map((submenuItem, subIndex) => (
                  <li key={submenuItem.id} className="submenu-item">
                    <Link
                      href="#"
                      className="submenu-link"
                      underline="hover"
                    >
                      {submenuItem.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
