import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import CadastrarVideo from './pages/CadastrarVideo/CadastrarVideo.jsx';
import Video from './pages/Video/Video.jsx';
import CardPrincipal from './componentes/CardPrincipal/CardPrincipal.jsx';
import VerCanais from './pages/VerCanais/verCanais.jsx';
import MeusVideos from './pages/MeusVideos/meusVideos.jsx'
import {usuarioLogado} from './utils/global.js';
import BotoesDeNavegacao from './componentes/BotoesDeNavegacao/BotoesDeNavegacao.jsx';
import PrimarySearchAppBar from './pages/topbar/topbar.jsx';

function Rotas(){

    return (
            <BrowserRouter>
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
                <BotoesDeNavegacao /></div>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastrar-video" element={<CadastrarVideo />} />
                <Route path="/video/:id" element={<Video />} />
                <Route path="/meus-videos/:id_usuario" element={<MeusVideos />} />
                <Route path="/meus-videos-favoritos" element={<CardPrincipal canalId={null} categoriaId={null} favorito={1} />} />
                <Route path="/listar_canais" element={<VerCanais />} />
                </Routes>

            </BrowserRouter>
            );
}

export default Rotas;