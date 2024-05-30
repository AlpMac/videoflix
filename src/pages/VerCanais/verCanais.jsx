import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import ListarCanais from '../../componentes/listarCanais/listarCanais.jsx'; 
import BotoesDeNavegacao from '../../componentes/BotoesDeNavegacao/BotoesDeNavegacao';
import PrimarySearchAppBar from '../topbar/topbar.jsx'

function listarCanais() {
  return (
    <>        
        <Container maxWidth='xl'>
        <CssBaseline>

        <PrimarySearchAppBar />
        <div
          id="BotoesDeNavegacao"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            paddingBottom: '20px',
          }}
        >
          <BotoesDeNavegacao />
        </div>
        <Container >    
          {/* Passe canalId = {1} para mostrar apenas o video do canal 1 */}
         <ListarCanais />
          {/* Outros componentes ou conteúdos aqui */}
        </Container>
        </CssBaseline>
      </Container>


        </>
        );
}

export default listarCanais;
