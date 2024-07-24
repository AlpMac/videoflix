import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { AlignHorizontalRight, Padding } from '@mui/icons-material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import {servidorBackendEnviosImagemPerfil } from '../../utils/global.js';
import { useNavigate } from 'react-router-dom';

export default function ListarCanais() {

    const navigate = useNavigate();

    const openVideo = (id) => {
      navigate(`/meus-videos/${id}`);
    };
    const [listaDadosUsuario, setlistaDadosUsuario] = useState([]);

    useEffect(() => {

        api.get(`/listar_canais`)
                .then((response) => {
                    setlistaDadosUsuario(response.data);
                })
                .catch((err) => {
                    console.error("Erro ao buscar outros dados:", err);
                });
    }, []);

  return (
    <Container 
    sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: '20px', 
        marginBottom: '20px' 
    }}
    
    >


    <Grid container spacing={3}>     
    {listaDadosUsuario.map((dadosUsuario) => (
        <Grid item xs={12} sm={6} md={4} key={dadosUsuario.id_usuario}>
                        <Card sx={{ maxWidth: 345 }}
                         onClick={() => openVideo(dadosUsuario.id_usuario)}
                        >
                       

                        <CardActionArea>
                        
                            <CardMedia
                            component="img"
                            height="140"
                            image={`${servidorBackendEnviosImagemPerfil}${dadosUsuario.url_perfil}`}
                            alt={dadosUsuario.url_perfil}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {dadosUsuario.tratamento_formal+" "+dadosUsuario.nome_apelido}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {dadosUsuario.local_trabalho}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Acessar Canal
                            </Button>
                            <Container
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end', // Alinha itens à direita
                                    }}
                                    >
                                    <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ display: 'flex', alignItems: 'center' }}  // Garantir alinhamento vertical
                                        >   
                                        <VisibilityRoundedIcon fontSize="small" sx={{ marginRight: 0.5 }} />
                                        {dadosUsuario.total_views} visualizações
                                    </Typography>
                                    
                                    <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ display: 'flex', alignItems: 'center' }}  // Garantir alinhamento vertical
                                        > 
                                         <PlayCircleFilledRoundedIcon fontSize="small" sx={{ marginRight: 0.5 }} />
                                        {dadosUsuario.total_videos} Vídeos
                                    </Typography>
                                    <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ display: 'flex', alignItems: 'center' }}  // Garantir alinhamento vertical
                                        > 
                                         <FavoriteRoundedIcon fontSize="small" sx={{ marginRight: 0.5 }} />

                                        {dadosUsuario.total_likes} Likes
                                    </Typography>
                                    </Container>
                        </CardActions>
                        </Card>
                        </Grid>
    ))}
</Grid>
    </Container>

  );
}