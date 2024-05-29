import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import CadastrarVideo from './pages/CadastrarVideo/CadastrarVideo.jsx';
import Video from './pages/Video/Video.jsx';
import CardPrincipal from './componentes/CardPrincipal/CardPrincipal.jsx';
import VerCanais from './pages/VerCanais/verCanais.jsx';


function Rotas(){

    return (
            <BrowserRouter>

                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastrar-video" element={<CadastrarVideo />} />
                <Route path="/video/:id" element={<Video />} />
                <Route path="/meus-videos" element={<CardPrincipal canalId={1} categoriaId={null} favorito={0} />} />
                <Route path="/meus-videos-favoritos" element={<CardPrincipal canalId={null} categoriaId={null} favorito={1} />} />
                <Route path="/lista-de-canais" element={<VerCanais />} />
                </Routes>

            </BrowserRouter>
            );
}

export default Rotas;