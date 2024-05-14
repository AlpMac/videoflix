import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { radioClasses } from '@mui/material';

export default function BannerMensagem() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Stack direction="row" spacing={1} pr={8}>
        <Chip 
          label="Conheça o Rede marinha para mais manuais e tutoriais !"
          component="a"
          color="primary"
          href="#basic-chip"
          icon={<TravelExploreIcon />}
          clickable
          
        />
      </Stack>
    </div>
  );
}
