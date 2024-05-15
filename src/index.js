import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home/home.jsx';
import Topbar from './pages/topbar/topbar.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadastrarVideo from './pages/CadastrarVideo/CadastrarVideo.jsx';
import MenuPrincipal from './componentes/MenuPrincipal/MenuPrincipal.jsx';
import BotoesDeNavegacao from './componentes/BannerMensagem/BotoesDeNavegacao/BotoesDeNavegacao.jsx';
import Video from './pages/Video/Video.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Topbar />
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth='xl'>
        <div
            id="BotoesDeNavegacao"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px', // Ajuste conforme necessário
            }}
          >
            <BotoesDeNavegacao />
          </div>         
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cadastrar-video" element={<CadastrarVideo />} />
              <Route path="/video" element={<Video />} />

            </Routes>
          </BrowserRouter>
        </Container>
      </React.Fragment>
    </>
  );
};

root.render(<App />);
