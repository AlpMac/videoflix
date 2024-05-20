import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { AlignHorizontalRight } from '@mui/icons-material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const DadosDeCanais = [
    {
        id: 1,
        nome: 'Canal 1',
        descricao: 'Descrição do canal 1',
        imagem: 'https://source.unsplash.com/random/300x200',
        totalViews: 1000,
        totalVideos: 10,
        totalLikes: 100,
    },
    {
        id: 2,
        nome: 'Canal 2',
        descricao: 'Descrição do canal 2',
        imagem: 'https://source.unsplash.com/random/300x201',
        totalViews: 423,
        totalVideos: 5,
        totalLikes: 580,

    },
    {
        id: 3,
        nome: 'Canal 3',
        descricao: 'Descrição do canal 3',
        imagem: 'https://source.unsplash.com/random/300x202',
        totalViews: 5032,
        totalVideos: 15,
        totalLikes: 1000,


    },
    {
        id: 4,
        nome: 'Canal 4',
        descricao: 'Descrição do canal 4',
        imagem: 'https://source.unsplash.com/random/300x203',
        totalViews: 23,
        totalVideos: 1,
        totalLikes: 10,

    },
    ];

export default function VerCanais() {
  return (
    <Container>
    <Grid container spacing={3}>     
    {DadosDeCanais.map((video) => (
        <Grid item xs={12} sm={6} md={4} key={video.id}>
                        <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                        
                            <CardMedia
                            component="img"
                            height="140"
                            image={video.imagem}
                            alt={video.nome}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {video.nome}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {video.descricao}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                            Acessar 
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
                                        {video.totalViews} visualizações
                                    </Typography>
                                    
                                    <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ display: 'flex', alignItems: 'center' }}  // Garantir alinhamento vertical
                                        > 
                                         <PlayCircleFilledRoundedIcon fontSize="small" sx={{ marginRight: 0.5 }} />
                                        {video.totalVideos} Vídeos
                                    </Typography>
                                    <Typography 
                                            variant="body2" 
                                            color="text.secondary" 
                                            sx={{ display: 'flex', alignItems: 'center' }}  // Garantir alinhamento vertical
                                        > 
                                         <FavoriteRoundedIcon fontSize="small" sx={{ marginRight: 0.5 }} />

                                        {video.totalLikes} Likes
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