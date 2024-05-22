import React from 'react';
import { Container } from '@mui/material';
import CardPrincipal from '../../componentes/CardPrincipal/CardPrincipal.jsx';
import BotoesDeNavegacao from '../../componentes/BannerMensagem/BotoesDeNavegacao/BotoesDeNavegacao';

function Home() {
  return (
    <Container >
      
      {/* Passe canalId = {1} para mostrar apenas o video do canal 1 */}
      <CardPrincipal canalId = {null} categoriaId ={null} favorito={0} searchQuery={''}/>
      {/* Outros componentes ou conteúdos aqui */}
    </Container>
  );
}

export default Home;
