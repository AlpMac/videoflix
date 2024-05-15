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


export default function Video() {

    const Item = styled(Grid)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const DadosdoVideo = [
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
    ];

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

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <Grid container spacing={3} mt={2}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label="recipe"
                                        src={DadosdoVideo[0].iconeCanal}
                                    />
                                }
                                title={DadosdoVideo[0].Canal}
                            />
                            <ReactPlayer
                                url= {DadosdoVideo[0].url}
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
                                    {DadosdoVideo[0].titulo} 
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {DadosdoVideo[0].descricao}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                    
                                </IconButton>
                                <Typography>
                                {DadosdoVideo[0].visualizacao + ' visualizações'}
                                </Typography>
                            </CardActions>
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
