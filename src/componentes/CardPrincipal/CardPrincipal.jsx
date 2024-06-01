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
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../services/api.js'
import { useState } from 'react';
import './CardPrincipal.css';
import { servidorBackendEnviosThumbnail,servidorBackendEnviosImagemPerfil,usuarioLogado } from '../../utils/global.js';


export default function CardPrincipal(props) {

    const [listaVideos, setlistaVideos] = useState([]);
    //se estiver usando o filtro MEU CANAL
    
    useEffect(() => {
        if (props.favorito) {
            api.get(`/meus-videos-favoritos/${usuarioLogado}`)
                .then((response) => {
                    setlistaVideos(response.data);
                })
                .catch((err) => {
                    console.error("Erro ao buscar outros dados:", err);
                });
        } else if (props.canalId) {

            //vamos prender com a variavel global que armazena o login para nao deixar o usuario ver os videos de outro usuario
            api.get(`/meus-videos/${usuarioLogado}`)
           
                .then((response) => {
                    setlistaVideos(response.data);
                })
                .catch((err) => {
                    console.error("Erro ao buscar outros dados:", err);
                });
        } else  {
            api.get(`/`)
                .then((response) => {
                    setlistaVideos(response.data);
                })
                .catch((err) => {
                    console.error("Erro ao buscar outros dados:", err);
                });
        } 
    }, [props.canalId]); // Adicione `props.canalId` como dependência

    const [isFavorito, setIsFavorito] = React.useState(false);
   
   
    const navigate = useNavigate();
    
    const openVideo = (id) => {
        navigate("/video/"+id);
    }


    
    const handleClickFavorito = (id) => {
        setIsFavorito(listaVideos.map(video => 
            video.id === id ? { ...video, favorito: !video.favorito } : video
        ));
    };
    
           
    return (
        <Container>
        <Grid container spacing={3}>
            {listaVideos.map((video) => (
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
                        <CardMedia sx={{ maxWidth: 345, cursor: 'pointer' }} onClick ={() => openVideo(video.id_video)}
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
                        {/*
                           <div>
                            <IconButton aria-label="Favorito" onClick={() => handleClickFavorito(video.id)}>
                                        <FavoriteIcon style={{ color: video.favorito ? 'red' : 'inherit' }} />
                                    </IconButton>
                                <IconButton aria-label="Compartilhar">
                                    <ShareIcon />
                                </IconButton>
                            </div> */}
                            <Container  sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end', // Alinha itens à direita
                                    }}
                                    >
                                <IconButton aria-label="Visualizações" disableRipple>
                                    <VisibilityRoundedIcon fontSize="small" sx={{ marginRight: 0.5 }} />

                                    <Typography variant="body2" color="text.secondary">

                                        {video.views} Visualizações
                                    </Typography>
                                </IconButton>
                            </Container>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
    );
}
