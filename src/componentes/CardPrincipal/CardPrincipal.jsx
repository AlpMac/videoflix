import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api.js';
import './CardPrincipal.css';
import { servidorBackendEnviosThumbnail, servidorBackendEnviosImagemPerfil, usuarioLogado } from '../../utils/global.js';
import { Box } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import CaminhoNavegacao from '../CaminhoNavegacao/CaminhoNavegacao.jsx';

export default function CardPrincipal(props) {

  const [listaVideos, setListaVideos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (props.favorito) {
          response = await api.get(`/meus-videos-favoritos/${usuarioLogado}`);
        } else if (props.canalId) {
          response = await api.get(`/meus-videos/${usuarioLogado}`);
        } else if (props.categoriaId) {
          
          response = await api.get(`/categoria/${props.categoriaId}`);
        } 
        
          else if (!props.favorito || !props.canalId || !props.categoriaId){
          response = await api.get(`/`);
        }
        //console.log("favorito" + props.favorito);
        //console.log("canalID" + props.canaId);
        
        console.log("entrou no if "+response.data);
        setListaVideos(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };
    fetchData();
  }, [props.canalId, props.favorito, props.categoria]);

  const navigate = useNavigate();

  const openVideo = (id) => {
    navigate(`/video/${id}`);
  };

  const handlePesquisaChange = (event) => {
    setPesquisa(event.target.value);
  };

  const listaFiltrada = listaVideos.filter(video => 
    video.titulo_video.toLowerCase().includes(pesquisa.toLowerCase())
  );

 
  return (
    <Container>
    {/*  <Box>
      <CaminhoNavegacao link1={props.link1} link2={props.link2}/>
      </Box> FAREI DEPOIS UM CARD INFINITO COM OS MENUS IGUAL YOUTUBE*/}
     
      <TextField
        label={`Pesquisar ${props.caminho}`} 
        variant="outlined"
        fullWidth
        margin="normal"
        value={pesquisa}
        onChange={handlePesquisaChange}
      />
      <Grid container spacing={3}>
        <Card id="nothing-alert" sx={{ display: 'none' }}>
          Não encontrado
        </Card>
        {listaFiltrada.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id_video}>
            <Card className="Card-principal" sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    <img
                      src={`${servidorBackendEnviosImagemPerfil}${video.url_perfil}`}
                      alt="Ícone do Canal"
                      style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                    />
                  </Avatar>
                }
                title={
                  <Typography
                    className="titulo"
                    style={{
                      maxHeight: '100px',
                      height: '50px',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {video.titulo_video}
                  </Typography>
                }
                subheader={`${video.tratamento_formal} ${video.nome_apelido}`}
              />
              <CardMedia
                sx={{ maxWidth: 345, cursor: 'pointer' }}
                onClick={() => openVideo(video.id_video)}
                component="img"
                height="194"
                image={`${servidorBackendEnviosThumbnail}${video.thumbnail}`}
                alt={video.thumbnail}
              />
              <CardContent>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  style={{
                    wordWrap: 'break-word',
                    maxHeight: '400px',
                    height: '90px',
                    overflow: 'auto',
                  }}
                >
                  {video.descricao_video}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
                <Container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
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
