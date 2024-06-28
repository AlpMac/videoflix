import React from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
// faremos aqui depois uma barra infinita com todos os menus 

export default function CaminhoNavegacao({ link1, link2 }) {
  return (
    <Box sx={{ display: 'flex', paddingTop: '20px', paddingLeft: '20px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Tudo</Typography>
        {link1 && (
          <Typography color="text.primary">{link1}</Typography>
        )}
        {link2 && (
          <Typography color="text.primary">{link2}</Typography>
        )}
      </Breadcrumbs>
    </Box>
  );
}
