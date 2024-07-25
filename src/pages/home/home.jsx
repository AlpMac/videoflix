import React, { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import CardPrincipal from '../../componentes/CardPrincipal/CardPrincipal.jsx';
import { useParams } from 'react-router-dom';
import api from '../../services/api.js';

function Home(props) {
  const  {id_categoria}  = useParams();
  const [categoriaId, setCategoriaId] = useState(null);
  const [nomeCategoria, setNomeCategoria] = useState({});
  let texto = 'em todos os canais';

  useEffect(() => {

    if (id_categoria) {      
       api.get('/categoria/' + id_categoria)
          .then((response) => {
            setNomeCategoria(response.data);
          })
          .catch((err) => {
            console.error("Erro ao buscar nome da categoria:", err);
          });

          setCategoriaId(id_categoria);
      } 
        
    else {
      console.log("Categoria não informada");
      setCategoriaId(null);
    }
  }, [id_categoria]);

  if (id_categoria && nomeCategoria.length > 0) {
    texto = "na categoria " + nomeCategoria[0].nome_menu + " - " + nomeCategoria[0].nome_submenu;
  }

  return (
    <>        
      <Container maxWidth='xl'>
        <CssBaseline />
        <Container>    
          <CardPrincipal
            canalId={null}
            categoriaId={categoriaId}
            favorito={null}
            searchQuery={''}
            caminho={texto}
          />
        </Container>
      </Container>
    </>
  );
}

export default Home;
