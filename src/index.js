import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Topbar from './pages/topbar/topbar.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CadastrarVideo from './pages/CadastrarVideo/CadastrarVideo.jsx';
import Video from './pages/Video/Video.jsx';
import CardPrincipal from './componentes/CardPrincipal/CardPrincipal.jsx';
import BotoesDeNavegacao from './componentes/BannerMensagem/BotoesDeNavegacao/BotoesDeNavegacao.jsx';
import VerCanais from './pages/VerCanais/verCanais.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  return (
    <BrowserRouter>
      <Topbar />
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth='xl'>
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastrar-video" element={<CadastrarVideo />} />
            <Route path="/video/:id" element={<Video />} />
            <Route path="/meus-videos" element={<CardPrincipal canalId={1} categoriaId={null} favorito={0} />} />
            <Route path="/meus-videos-favoritos" element={<CardPrincipal canalId={null} categoriaId={null} favorito={1} />} />
            <Route path="/lista-de-canais" element={<VerCanais />} />
          </Routes>
        </Container>
      </React.Fragment>
    </BrowserRouter>
  );
};

root.render(<App />);
