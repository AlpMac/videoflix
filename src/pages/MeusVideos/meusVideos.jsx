import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import CardPrincipal from '../../componentes/CardPrincipal/CardPrincipal.jsx';
import BotoesDeNavegacao from '../../componentes/BotoesDeNavegacao/BotoesDeNavegacao';
import PrimarySearchAppBar from '../topbar/topbar.jsx'
import { useParams } from 'react-router-dom';


function MeusVideos() {
    const { id_usuario } = useParams();

  return (
    <>        
        <Container maxWidth='xl'>
        <CssBaseline>

        {/*<PrimarySearchAppBar />
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
        </div>*/}
        <Container >    
          {/* Passe canalId = {1} para mostrar apenas o video do canal 1 */}
          <CardPrincipal canalId = {id_usuario} categoriaId ={null} favorito={0} searchQuery={''}/>
          {/* Outros componentes ou conteúdos aqui */}
        </Container>
        </CssBaseline>
      </Container>


        </>
        );
}

export default MeusVideos;
