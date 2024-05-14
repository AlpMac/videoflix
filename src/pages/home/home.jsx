import React from 'react';
import { Container } from '@mui/material';
import CardPrincipal from '../../componentes/CardPrincipal/CardPrincipal';
import BotoesDeNavegacao from '../../componentes/BannerMensagem/BotoesDeNavegacao/BotoesDeNavegacao';

function Home() {
  return (
    <Container sx={{ paddingTop: '40px' }}>

      <CardPrincipal />
      {/* Outros componentes ou conteúdos aqui */}
    </Container>
  );
}

export default Home;
