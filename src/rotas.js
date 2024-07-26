import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import CadastrarVideo from './pages/CadastrarVideo/CadastrarVideo.jsx';
import Video from './pages/Video/Video.jsx';
import VerCanais from './pages/VerCanais/verCanais.jsx';
import MeusVideos from './pages/MeusVideos/meusVideos.jsx'

import PrimarySearchAppBar from './pages/topbar/topbar.jsx';
import MeusVideosFavoritos from './pages/meusVideosFavoritos/meusVideosFavoritos.jsx';
import NotificationPopup from '../src/componentes/notificacaPopUp/notificacaoPopUp.jsx';
import { Container } from '@mui/material';

function Rotas(props){

    return (
            <BrowserRouter>
                        <PrimarySearchAppBar />
                    {/*<div OS BOTOES FORAM PARA O MENU 
                    id="BotoesDeNavegacao"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                        paddingBottom: '20px',
                    }}
                    >
                <BotoesDeNavegacao /></div>*/}
                <Container maxWidth='xl' sx={{ paddingTop: '60px' }}>
                <Routes>
                
                <Route path="/" element={<Home />} />
                <Route path="/categoria/:id_categoria" element={<Home />} />
               
                 
                <Route path="/cadastrar-video" element={<CadastrarVideo />} />
                <Route path="/video/:id" element={<Video />} />          {/*link1="Seus Videos" link2=' ' usaremos depois para barra infinita*/ }  
                <Route path="/meus-videos/:id_usuario" element={<MeusVideos />  } />
                <Route path="/meus-videos-favoritos/:id_usuario" element={<MeusVideosFavoritos />} />
                <Route path="/listar_canais" element={<VerCanais />} />
                </Routes>
                </Container> 


            </BrowserRouter>
            );
}

export default Rotas;