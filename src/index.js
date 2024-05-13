import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home/home.jsx';
import Topbar from './pages/topbar/topbar.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadastrarVideo from './pages/CadastrarVideo/CadastrarVideo.jsx';
import MenuPrincipal from './componentes/MenuPrincipal/MenuPrincipal.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<>
  <Topbar />
  <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <BrowserRouter>
         <Routes>
          <Route path="/" element={<Home />} />
         
          <Route path="/cadastrar-video" element={<CadastrarVideo />} />  
         </Routes>
        </BrowserRouter>
      </Container>
    </React.Fragment> 
  
 </>
);

