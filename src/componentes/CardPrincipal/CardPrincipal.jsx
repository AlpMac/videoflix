import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../services/api.js'
import { useState } from 'react';
import './CardPrincipal.css';
import { servidorBackendEnviosThumbnail,servidorBackendEnviosImagemPerfil } from '../../utils/global.js';


export default function CardPrincipal(props) {

    const [listaVideos, setlistaVideos] = useState([]);

    useEffect(() => {

        api.get(`/`)
                .then((response) => {
                    setlistaVideos(response.data);
                })
                .catch((err) => {
                    console.error("Erro ao buscar outros dados:", err);
                });
    }, []);
    

    const [isFavorito, setIsFavorito] = React.useState(false);
   
   
    const navigate = useNavigate();
    
    const openVideo = (id) => {
        navigate("/video/"+id);
    }

   /* const DadosdoVideo = [
        {
            id: 1,
            titulo: 'Título do vídeo 1',
            descricao: 'Descrição do vídeo 1',
            imagem: 'https://source.unsplash.com/random/300x200',
            iconeCanal : 'https://source.unsplash.com/random/300x203',
            Canal : 'Canal 1',
            visualizacao: 1000,
            canalId: 1,
            categoriaId: 1,
            favorito : 0,
        },

        {
            id: 6,
            titulo: 'Título do vídeo 6',
            descricao: 'Descrição do vídeo 6',
            imagem: 'https://source.unsplash.com/random/300x200',
            iconeCanal : 'https://source.unsplash.com/random/300x203',
            Canal : 'Canal 1',
            visualizacao: 1000,
            canalId: 1,
            categoriaId: 1,
            favorito : 1,
        },
        {
            id: 2,
            titulo: 'Título do vídeo 2',
            descricao: 'Descrição do vídeo 2',
            imagem: 'https://source.unsplash.com/random/300x201',
            iconeCanal : 'https://source.unsplash.com/random/300x204',
            Canal : 'Canal 2',
            visualizacao: 2000,
            canalId: 2,
            categoriaId: 1,
            favorito : 1,

        },
        {
            id: 3,
            titulo: 'Título do vídeo 3',
            descricao: 'Descrição do vídeo 3',
            imagem: 'https://source.unsplash.com/random/300x202',
            iconeCanal : 'https://source.unsplash.com/random/300x205',
            Canal : 'Canal 3',
            visualizacao: 3000,
            canalId: 3,
            categoriaId: 3,
            favorito : 1,

        },
        {
          id: 4,
          titulo: 'Título do vídeo 4',
          descricao: 'Descrição do vídeo 4',
          imagem: 'https://source.unsplash.com/random/300x202',
          iconeCanal : 'https://source.unsplash.com/random/300x206',
          Canal : 'Canal 1',
          visualizacao: 4000,
          canalId: 1,
          categoriaId: 4,
          favorito : 1,

      },
    ]; */
    
    const idParaFiltrar = props.canalId; // Altere para null ou undefined para mostrar todos
    const idParaFiltrarCategoria = props.categoriaId; // Altere para null ou undefined para mostrar todos
    const favorito = props.favorito; // Altere para null ou undefined para mostrar todos
    //const query = props.searchQuery;
    
    const handleClickFavorito = (id) => {
        setIsFavorito(listaVideos.map(video => 
            video.id === id ? { ...video, favorito: !video.favorito } : video
        ));
    };
    
    const videosFiltrados = listaVideos.filter(video => {
        
        return (idParaFiltrar === null || video.canalId === idParaFiltrar) &&
               (idParaFiltrarCategoria === null || video.categoriaId === idParaFiltrarCategoria) &&
               (favorito === 0 || video.favorito === favorito) //&&
              // (video.titulo.toLowerCase().includes(query) || video.descricao.toLowerCase().includes(query))

    });
    
            
    return (
        <Container>
        <Grid container spacing={3}>
            {videosFiltrados.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video.id_video}>
                    <Card sx={{ maxWidth: 345}}>
                      
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    <img src={`${servidorBackendEnviosImagemPerfil}${video.url_perfil}`} alt="Ícone do Canal" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                  {/*  <MoreVertIcon / > */}
                                </IconButton>
                            }

                            title={
                                <Typography 
                                  style={{ 
                                    maxHeight: '100px',
                                    height: '50px',
                                    textAlign: 'left', // Adiciona alinhamento ao centro
                                    display: 'flex', // Garante que o texto esteja centralizado verticalmente
                                    alignItems: 'center', // Alinha o texto verticalmente ao centro
                                  }}
                                >
                                  {video.titulo_video}
                                </Typography>
                              }
                            subheader={video.tratamento_formal+" "+video.nome_apelido}
                        />
                        <CardMedia sx={{ maxWidth: 345, cursor: 'pointer' }} onClick ={() => openVideo(video.id)}
                            component="img"
                            height="194"
                            image={`${servidorBackendEnviosThumbnail}${video.thumbnail}`}
                            alt={video.thumbnail}
                        />
                        <CardContent>
                            <Typography variant="body1" color="text.secondary"
                            style={{ 
                                wordWrap: 'break-word',
                                maxHeight: '400px',
                                height: '90px',
                                overflow: 'auto',
                              }}>
                                {video.descricao_video}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
                            <div>
                            <IconButton aria-label="Favorito" onClick={() => handleClickFavorito(video.id)}>
                                        <FavoriteIcon style={{ color: video.favorito ? 'red' : 'inherit' }} />
                                    </IconButton>
                                <IconButton aria-label="Compartilhar">
                                    <ShareIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton aria-label="Visualizações" disableRipple>
                                    <Typography variant="body2" color="text.secondary">
                                        {video.visualizacao} Visualizações
                                    </Typography>
                                </IconButton>
                            </div>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
    );
}
