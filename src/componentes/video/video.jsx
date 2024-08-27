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
import { servidorBackendPlayVideo,servidorBackendPdf,usuarioLogado, servidorBackendEnviosImagemPerfil, servidorBackendDownloadArquivos, servidorBackendEnviosThumbnail } from '../../utils/global.js';
import PDFViewer from '../../componentes/PdfViewer/PdfViewer.jsx';
import { pdfjs } from 'react-pdf';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();
  

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
    const [isFavorito, setIsFavorito] = useState(listaVideo.favorito);
    const [successMessage, setSuccessMessage] = useState('');
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Primeiro, obtemos os dados do vídeo
                const videoResponse = await api.get(`/video/${id}`);
                const videoData = videoResponse.data;
                setlistaVideo(videoData);
                setIsFavorito(videoData.curtido);
                
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

    const arquivosArray = listaVideo.arquivos_complementares && listaVideo.arquivos_complementares !== '0' 
    ? listaVideo.arquivos_complementares.split(', ') 
    : [];
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

   
      
    const handleFavoriteClick = async () => {
        const newFavorito = !isFavorito;
        setIsFavorito(newFavorito);
    
        try {
            const route = newFavorito ? '/salvar-favorito' : '/deletar-favorito';
            let response;  // Use "let" para permitir reatribuição
            
            console.log("route: " + route);
            
            if (route === '/deletar-favorito') {
                response = await api.delete(route, {
                    data: {
                        id_video: listaVideo.id_video,
                        id_logado: usuarioLogado,
                    }
                });
            } else {
                response = await api.post(route, {
                    id_video: listaVideo.id_video,
                    id_logado: usuarioLogado,
                    curtido: newFavorito,
                });
            }
    
            if (response && response.data.message) {
                setSuccessMessage(response.data.message);
                setOpen(true);
            }
        } catch (err) {
            console.error('Erro ao atualizar favorito:', err);
            // Reverter o estado se a requisição falhar
            setIsFavorito(!newFavorito);
        }
    };         

    const handleClose = () => {
        setOpen(false);
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
                             
                            {listaVideo.url_video && listaVideo.url_video.endsWith('.pdf') ? 
                            (
                                <Grid container justifyContent="center" alignItems="center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <PDFViewer pdfUrl={`${servidorBackendPdf}${listaVideo.url_video}`} />
                              </Grid>
                                
                            )  : 

                            <ReactPlayer
                                url={`${servidorBackendPlayVideo}${listaVideo.url_video}`}
                                width='100%'
                                height='400px'
                                controls={true}
                            />}
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {listaVideo.titulo_video}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {listaVideo.descricao_video}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton aria-label="add to favorites" align='left'
                                 onClick={handleFavoriteClick}>
                                    <FavoriteIcon
                                        label="Favorito"
                                        style={{ color: isFavorito ? 'red' : 'inherit' }}
                                       
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
                        {successMessage && (
                             <>
                             <Stack sx={{ width: '100%', paddingTop: '20px' }} spacing={2}>
                                 <Snackbar
                                     open={open}
                                     autoHideDuration={2000}
                                     onClose={handleClose}
                                 >
                                     <Alert onClose={handleClose} severity="success">
                                         {successMessage}
                                     </Alert>
                                 </Snackbar>
                             </Stack>
                             {/* Resto do seu componente */}
                         </>
                        )}
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
