import React, { useEffect, useState, useMemo } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import api from '../../services/api.js';
import './CardPrincipal.css';
import { servidorBackendEnviosThumbnail, servidorBackendEnviosImagemPerfil, usuarioLogado } from '../../utils/global.js';

const CardPrincipal = ({ canalId, favorito, categoriaId, caminho }) => {
  const [listaVideos, setListaVideos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [keyForcingEffect, setKeyForcingEffect] = useState(0); // Key para forçar reexecução do useEffect

  useEffect(() => {
    setLoading(true); // Define loading como true quando a requisição começa
    api.get(`/listar_canais`)
        .then((response) => {
           
            if (favorito) {
                response = api.get(`/meus-videos-favoritos/${usuarioLogado}`);
            } else if (canalId) {
                response = api.get(`/meus-videos/${canalId}`);
            } else if (categoriaId) {
                response = api.get(`/categoria/${categoriaId}`);
            } else {
                response = api.get(`/`);
            }
            return response;
        })
        .then((response) => {
            setListaVideos(response.data);
            setLoading(false); // Define loading como false quando os dados são carregados
        })
        .catch((err) => {
            console.error("Erro ao buscar dados:", err);
            setLoading(false); // Define loading como false em caso de erro
        });
  }, [canalId, favorito, categoriaId, keyForcingEffect]);// Incluímos keyForcingEffect para forçar reexecução

  const navigate = useNavigate();

  const openVideo = (id) => {
    navigate(`/video/${id}`);
  };

  const handlePesquisaChange = (event) => {
    setPesquisa(event.target.value);
  };

  const listaFiltrada = useMemo(() =>
    listaVideos.filter(video =>
      video.titulo_video.toLowerCase().includes(pesquisa.toLowerCase())
    ), [listaVideos, pesquisa]);

  useEffect(() => {
    setKeyForcingEffect(prev => prev + 1); // Atualiza a key para forçar o useEffect
  }, [categoriaId]); // Dispara sempre que categoriaId mudar

  return (
    <Container>
      <TextField
        label={`Pesquisar ${caminho}`} 
        variant="outlined"
        fullWidth
        margin="normal"
        value={pesquisa}
        onChange={handlePesquisaChange}
      />
      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : listaFiltrada.length > 0 ? (
          listaFiltrada.map((video) => (
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
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">Nenhum vídeo encontrado.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CardPrincipal;
