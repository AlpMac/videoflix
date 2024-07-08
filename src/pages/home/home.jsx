import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import CardPrincipal from '../../componentes/CardPrincipal/CardPrincipal.jsx';
import { useParams } from 'react-router-dom';


function Home(props) {
  const { id } = useParams();
  console.log("teste"+id);
  return (
    <>        
        <Container maxWidth='xl'>
        <CssBaseline>

        {/* <PrimarySearchAppBar sfsfsfsf/>
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
        </div> */}
        <Container >    
          {/* Passe canalId = {1} para mostrar apenas o video do canal 1 */}
          <CardPrincipal canalId = {null}
                         categoriaId ={id}
                         favorito={0}
                         searchQuery={''}
                         caminho="em todos os vídeos"

                         />
          {/* Outros componentes ou conteúdos aqui */}
        </Container>
        </CssBaseline>
      </Container>


        </>
        );
}

export default Home;
