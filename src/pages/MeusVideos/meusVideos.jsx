import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import CardPrincipal from '../../componentes/CardPrincipal/CardPrincipal.jsx';
import { useParams } from 'react-router-dom';
import { usuarioLogado } from '../../utils/global.js';


function MeusVideos(props) {
     
    const { id_usuario } = useParams();
    console.log ("id_usuario", id_usuario);
    //const id_usuario = props.id_usuario;
   /* let id_usuario;
    
    if (props.id_usuario !== undefined) {
        id_usuario = props.id_usuario;
    } else {
        id_usuario = usuarioLogado;
    }*/
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
          <CardPrincipal canalId = {id_usuario}
                         categoriaId ={null}
                         favorito={0}
                         searchQuery={''}
                         caminho="nos vídeos enviados do canal"
                         //link1={props.link1}
                         //link2={props.link2}
                         />
          {/* Outros componentes ou conteúdos aqui */}
        </Container>
        </CssBaseline>
      </Container>


        </>
        );
}

export default MeusVideos;
