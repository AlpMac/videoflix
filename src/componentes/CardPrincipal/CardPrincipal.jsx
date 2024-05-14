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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardPrincipal() {

    const DadosdoVideo = [
        {
            id: 1,
            titulo: 'Título do vídeo 1',
            descricao: 'Descrição do vídeo 1',
            imagem: 'https://source.unsplash.com/random/300x200',
            iconeCanal : 'https://source.unsplash.com/random/300x203',
            Canal : 'Canal 1',
            visualizacao: 1000,
        },
        {
            id: 2,
            titulo: 'Título do vídeo 2',
            descricao: 'Descrição do vídeo 2',
            imagem: 'https://source.unsplash.com/random/300x201',
            iconeCanal : 'https://source.unsplash.com/random/300x204',
            Canal : 'Canal 2',
            visualizacao: 2000,
        },
        {
            id: 3,
            titulo: 'Título do vídeo 3',
            descricao: 'Descrição do vídeo 3',
            imagem: 'https://source.unsplash.com/random/300x202',
            iconeCanal : 'https://source.unsplash.com/random/300x205',
            Canal : 'Canal 3',
            visualizacao: 3000,
        },
        {
          id: 4,
          titulo: 'Título do vídeo 4',
          descricao: 'Descrição do vídeo 4',
          imagem: 'https://source.unsplash.com/random/300x202',
          iconeCanal : 'https://source.unsplash.com/random/300x206',
          Canal : 'Canal 4',
          visualizacao: 4000,
      },
    ];

    return (
        <Grid container spacing={3}>
            {DadosdoVideo.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video.id}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    <img src={video.iconeCanal} alt="Ícone do Canal" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                  {/*  <MoreVertIcon / > */}
                                </IconButton>
                            }
                            title={video.titulo}
                            subheader={video.Canal}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={video.imagem}
                            alt={video.titulo}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {video.descricao}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
                            <div>
                                <IconButton aria-label="Favorito">
                                    <FavoriteIcon />
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
    );
}
