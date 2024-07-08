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
import { CenterFocusStrong } from '@mui/icons-material';
import ReactPlayer from 'react-player';
import { Link, useNavigate } from 'react-router-dom';
import{ useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api.js';
import { servidorBackendPlayVideo,servidorBackendEnviosImagemPerfil,servidorBackendDownloadArquivos } from '../../utils/global.js';



export default function Video() {

    //const navigate = useNavigate();
    
   // const openVideo = (id) => {
    //    navigate("/video/"+{id});
   // }
    const Item = styled(Grid)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }));
  

    const { id } = useParams();
    const [video, setVideo] = useState(null);
   
    //esses dados viram do GET DO BANCO DE DADOS
   /* const DadosdoVideo = [
        {
            id: 1,
            titulo: 'Título do vídeo 1',
            descricao: 'Em uma manhã ensolarada, Pedro decidiu explorar a vasta floresta ao redor de sua casa. Ele caminhou por trilhas estreitas, ouvindo o canto dos pássaros e sentindo o cheiro fresco da natureza. Enquanto seguia em frente, descobriu uma clareira mágica cercada por árvores centenárias e flores coloridas. Fascinado, decidiu montar acampamento ali mesmo. Ao entardecer, a luz dourada do sol criava um espetáculo de cores na paisagem. À noite, o céu estrelado parecia um tapete cintilante. Pedro sentiu-se conectado com o universo, refletindo sobre a importância da natureza em nossas vidas. Na manhã seguinte, após uma noite tranquila, partiu de volta para casa, carregando consigo memórias inesquecíveis e uma nova apreciação pela beleza natural que o cerca.',
            imagem: 'https://source.unsplash.com/random/300x200',
            iconeCanal: 'https://source.unsplash.com/random/300x203',
            Canal: '2ºSG-PD MARCO ANTONIO',
            visualizacao: 1000,
            url: 'https://youtu.be/wV1n1_E5AIQ',
        },
    ];*/
  
    const [listaVideo, setlistaVideo] = useState([]);

    useEffect(() => {
        
        api.get(`/video/${id}`)
                .then((response) => {
                    setlistaVideo(response.data);
                   
                })
                .catch((err) => {
                    console.error("Erro ao buscar outros dados:", err);
                });
    }, []);
        //Pega os arquivos anexo do video e divide 
    const arquivosArray = listaVideo.arquivos_complementares ? listaVideo.arquivos_complementares.split(', ') : [];




    useEffect(() => {
        const videoEncontrado = listaVideo.find((video) => video.id === parseInt(id));
        if (videoEncontrado) {
          setVideo(videoEncontrado);
        }
      }, []);
    
      if (!listaVideo) {
        return <div>Error Tente novamente na tela principal.</div>;
      }

      
    //esses videos viram do GET TAMBEM DO BANCO DE DADOS
    const DadosdoVideoRecomendados = [
        {
            id_recomendado: 2,
            titulo_recomendado: 'Adearfgr oqiadu qolmnj wrfardq wesdfr wqaqweokdfe oppwiqdkiW',
            descricao_recomendado: 'Descrição do vídeo 2',
            imagem_recomendado: 'https://source.unsplash.com/random/300x201',
            iconeCanal_recomendado: 'https://source.unsplash.com/random/300x204',
            Canal_recomendado: '3ºSG-PD ALPANDE',
            visualizacao_recomendado: 2000,
        },
        {
            id_recomendado: 3,
            titulo_recomendado: 'Aprenda a Fazer Origamis Criativos',
            descricao_recomendado: 'Descrição do vídeo 3',
            imagem_recomendado: 'https://source.unsplash.com/random/300x202',
            iconeCanal_recomendado: 'https://source.unsplash.com/random/300x205',
            Canal_recomendado: '1ºTEN-ENF MARIA',
            visualizacao_recomendado: 3000,
        },
        {
            id_recomendado: 4,
            titulo_recomendado: 'Descubra os Segredos da Natureza',
            descricao_recomendado: 'Descrição do vídeo 4',
            imagem_recomendado: 'https://source.unsplash.com/random/300x202',
            iconeCanal_recomendado: 'https://source.unsplash.com/random/300x206',
            Canal_recomendado: 'CMG(EN) FABIANO',
            visualizacao_recomendado: 4000,
        },
    ];
    //função para baixar arquivos
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
                        <Card id="video"
                        >
                            <CardHeader
                              avatar={
                                <Avatar  aria-label="recipe">
                                    <img src={`${servidorBackendEnviosImagemPerfil}${listaVideo.url_perfil}`} alt="Ícone do Canal" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                </Avatar>
                            }
                                
                                title={listaVideo.tratamento_formal+" "+listaVideo.nome_apelido}
                               
                                subheader={listaVideo.local_trabalho} 
                           
                            />
                            
                            <ReactPlayer
                                url= {`${servidorBackendPlayVideo}${listaVideo.url_video}`}
                                width='100%'
                                height='400px'
                                controls = {true}
                            />


                            {/*<CardMedia id="video_principal"
                                component="img"
                                height="400"
                                image={DadosdoVideo[0].imagem}
                                alt={DadosdoVideo[0].titulo}
                            /> */}
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
                                    //fazer o favorito
                                    style={{ color: listaVideo.favorito ? 'red' : 'inherit' }}
                                    />
                                </IconButton>
                                <IconButton aria-label="share" align='left'>
                                    <ShareIcon />
                                    
                                </IconButton>
                                <Typography align='right' variant="body1" color="text.secondary" style={{ marginLeft: 'auto' }}>
                                        <Link to={`/canal/${listaVideo.id_usuario}`} style={{ marginRight: '8px' }} >{"#"+listaVideo.nome_menu}</Link>

                                        <Link to={`/canal/${listaVideo.id_usuario}`} style={{ marginRight: '8px' }}>{"#"+listaVideo.nome_submenu}</Link>
                                        {listaVideo.views} Visualizações
                               </Typography>
                              

                            </CardActions>
                        </Card>

                        <Card id="Complemento"
                        
                        >
                          
                        <CardContent>
                                
                                <Typography variant="body2" color="textSecondary">
                                    Arquivos Complementares :  
                                    {arquivosArray.map((arquivo, index) => (
                                        //vamos criar um botão para baixar o arquivo
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
                        <Grid container spacing={2}>
                            {DadosdoVideoRecomendados.map((DadosdoVideoRecomendados) => (
                                <Grid item xs={12} key={DadosdoVideoRecomendados.id_recomendado}>
                                    <Card sx={{ maxWidth: '100%' }}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <Item alignContent={'flex-start'}>
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            width={50}
                                                            image={DadosdoVideoRecomendados.imagem_recomendado}
                                                            alt={DadosdoVideoRecomendados.titulo_recomendado}
                                                        />
                                                    </Item>
                                                </Grid>
                                                <Grid item xs={8}>
                                                <CardHeader sx={{m : 0 , p : 0}}
                                avatar={
                                    <Avatar
                                        aria-label="recipe"
                                        src={DadosdoVideoRecomendados.iconeCanal_recomendado}
                                        sx={{ width: 30, height: 30 }}
                                        
                                    />
                                }
                                title={DadosdoVideoRecomendados.Canal_recomendado}
                            />
                                                    <Typography gutterBottom variant="h9" pt={2} component="div">
                                                        {DadosdoVideoRecomendados.titulo_recomendado}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                    {DadosdoVideoRecomendados.visualizacao_recomendado + ' visualizações'}
                                                    </Typography>
                                                    <CardActions disableSpacing>
                                               
                                                    </CardActions>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>


            
        </React.Fragment>
    );
}
