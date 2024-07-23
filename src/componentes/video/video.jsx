import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import ReactPlayer from 'react-player';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { servidorBackendPlayVideo, servidorBackendEnviosImagemPerfil, servidorBackendDownloadArquivos, servidorBackendEnviosThumbnail } from '../../utils/global.js';

export default function Video() {
    const Item = styled(Grid)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const { id } = useParams();
    const [listaVideo, setlistaVideo] = useState({});
    const [listaComplemento, setlistaComplemento] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Primeiro, obtemos os dados do vídeo
                const videoResponse = await api.get(`/video/${id}`);
                const videoData = videoResponse.data;
                setlistaVideo(videoData);
                
                // Em seguida, obtemos os dados da categoria, se disponível
                if (videoData && videoData.id_categoria) {
                    const categoriaResponse = await api.get(`/categoria/${videoData.id_categoria}`);
                    const categoriaData = categoriaResponse.data;

                    // Atualiza a lista de complementos filtrando os vídeos com id diferente
                    const categoriaDataFiltrada = categoriaData.filter(video => video.id_video !== id);
                    setlistaComplemento(categoriaDataFiltrada);
                }
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
            }
        };

        fetchData();
    }, [id]);

    const navigate = useNavigate();

    const openVideo = (id) => {
        navigate(`/video/${id}`);
    };

    const arquivosArray = listaVideo.arquivos_complementares ? listaVideo.arquivos_complementares.split(', ') : [];

    const handleDownload = async (arquivo) => {
        const response = await fetch(`${servidorBackendDownloadArquivos}${arquivo}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = arquivo;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <Grid container spacing={3} mt={2}>
                    <Grid item xs={12} md={8}>
                        <Card id="video">
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe">
                                        <img src={`${servidorBackendEnviosImagemPerfil}${listaVideo.url_perfil}`} alt="Ícone do Canal" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                    </Avatar>
                                }
                                title={listaVideo.tratamento_formal + " " + listaVideo.nome_apelido}
                                subheader={listaVideo.local_trabalho}
                            />
                            <ReactPlayer
                                url={`${servidorBackendPlayVideo}${listaVideo.url_video}`}
                                width='100%'
                                height='400px'
                                controls={true}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {listaVideo.titulo_video}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {listaVideo.descricao_video}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton aria-label="add to favorites" align='left'>
                                    <FavoriteIcon
                                        label="Favorito"
                                        style={{ color: listaVideo.favorito ? 'red' : 'inherit' }}
                                    />
                                </IconButton>
                                <IconButton aria-label="share" align='left'>
                                    <ShareIcon />
                                </IconButton>
                                <Typography align='right' variant="body1" color="text.secondary" style={{ marginLeft: 'auto' }}>
                                    <Link to={`/canal/${listaVideo.id_usuario}`} style={{ marginRight: '8px' }} >{"#" + listaVideo.nome_menu}</Link>
                                    <Link to={`/canal/${listaVideo.id_usuario}`} style={{ marginRight: '8px' }}>{"#" + listaVideo.nome_submenu}</Link>
                                    {listaVideo.views} Visualizações
                                </Typography>
                            </CardActions>
                        </Card>

                        <Card id="Complemento">
                            <CardContent>
                                <Typography variant="body2" color="textSecondary">
                                    Arquivos Complementares :
                                    {arquivosArray.map((arquivo, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleDownload(arquivo)}
                                            style={{ marginRight: '8px', background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                        >
                                            {arquivo}
                                        </button>
                                    ))}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2} style={{ maxHeight: '600px', overflowY: 'auto' }}>
                            {listaComplemento.map((DadosdoVideoRecomendados) => (
                                DadosdoVideoRecomendados.id_video !== Number(id) ? (
                                    <Grid item xs={12} key={DadosdoVideoRecomendados.id_video}>
                                        <Card sx={{ maxWidth: '90%', maxHeight: '90%', cursor: 'pointer' }}
                                            onClick={() => openVideo(DadosdoVideoRecomendados.id_video)}
                                        >
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Item alignContent={'flex-start'}>
                                                            <CardMedia
                                                                component="img"
                                                                height="140"
                                                                width={100}
                                                                image={`${servidorBackendEnviosThumbnail}${DadosdoVideoRecomendados.thumbnail}`}
                                                                alt={DadosdoVideoRecomendados.titulo_video}
                                                            />
                                                        </Item>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <CardHeader sx={{ m: 0, p: 0 }}
                                                            avatar={
                                                                <Avatar
                                                                    aria-label="recipe"
                                                                    src={`${servidorBackendEnviosImagemPerfil}${DadosdoVideoRecomendados.url_perfil}`}
                                                                    sx={{ width: 30, height: 30 }}
                                                                />
                                                            }
                                                            subheader={DadosdoVideoRecomendados.local_trabalho}
                                                            title={`${DadosdoVideoRecomendados.tratamento_formal} ${DadosdoVideoRecomendados.nome_apelido}`}
                                                        />
                                                        <Typography gutterBottom variant="h9" pt={2} component="div">
                                                            {DadosdoVideoRecomendados.titulo_video}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {DadosdoVideoRecomendados.views + ' visualizações'}
                                                        </Typography>
                                                        <CardActions disableSpacing>
                                                        </CardActions>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ) : null
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}
