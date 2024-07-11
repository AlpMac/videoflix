import React, { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import CardPrincipal from '../../componentes/CardPrincipal/CardPrincipal.jsx';
import { useParams } from 'react-router-dom';

function Home() {
  const { id_categoria } = useParams();
  const [categoriaId, setCategoriaId] = useState(null);

  useEffect(() => {
    setCategoriaId(id_categoria || null);
  }, [id_categoria]);

  console.log("categoriaId" + categoriaId);

  // Render only after categoriaId is set
  if (categoriaId === null && id_categoria) {
    return null;
  }

  return (
    <>        
      <Container maxWidth='xl'>
        <CssBaseline />
        <Container>    
          <CardPrincipal
            canalId={null}
            categoriaId={categoriaId}
            favorito={0}
            searchQuery={''}
            caminho="em todos os vídeos"
          />
        </Container>
      </Container>
    </>
  );
}

export default Home;
