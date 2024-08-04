import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FormControl, InputLabel } from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// Componente FileUpload estilizado
const Input = styled('input')({
  display: 'none',
});

const FileUpload = ({ onFileChange, fileName, accept, label }) => {
  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{ marginBottom: '20px' }}>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept={accept}
      />
      <Button variant="contained" onClick={handleClick} component="span">
        {label}
      </Button>
      {fileName && (
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          {fileName}
        </Typography>
      )}
    </Box>
  );
};

// Função principal
export default function CadastrarVideo() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [videoTitle, setVideoTitle] = React.useState('');
  const [videoDescription, setVideoDescription] = React.useState('');
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');
  const [dadosCategoria, setDadosCategoria] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePDF, setSelectedFilePDF] = useState(null);
  const [selectedFileThumbnail, setSelectedFileThumbnail] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Enviando vídeo...');
  const [openLoadingModal, setOpenLoadingModal] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/listar-menu')
      .then((response) => {
        setDadosCategoria(response.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar Categoria:", err);
      });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'video/mp4') {
      setSelectedFile(file);
    } else {
      alert('Por favor, selecione um arquivo de vídeo MP4.');
    }
  };

  const handleFileChangethumbnail = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setSelectedFileThumbnail(file);
    } else {
      alert('Por favor, selecione um arquivo de imagem JPEG.');
    }
  };

  const handleFileChangePdf = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFilePDF(file);
    } else {
      alert('Por favor, selecione um arquivo PDF.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedFileThumbnail || !videoTitle || !videoDescription || !selectedCategoryId) {
      setModalMessage("Preencha todos os campos antes de enviar.");
      setOpenModal(true);
      return;
    }

    setLoading(true);
    setOpenLoadingModal(true); // Abrir modal de carregamento
    setLoadingMessage('Enviando vídeo...');

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('filethumbnail', selectedFileThumbnail);
    formData.append('title', videoTitle);
    formData.append('description', videoDescription);
    formData.append('categoryId', selectedCategoryId);

    try {
      const response = await api.post('/enviar-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      const videoUrl = response.data.video;
      const videoThumbnail = response.data.thumbnail;

      if (!videoUrl || !videoThumbnail) {
        throw new Error('URL do vídeo ou thumbnail não recebidos.');
      }

      await api.post('/enviar-video-dados', {
        titulo: videoTitle,
        descricao: videoDescription,
        url: videoUrl,
        id_enviado: 1,
        id_categoria: selectedCategoryId,
        thumbnail: videoThumbnail,
      });

      setModalMessage("Vídeo enviado com sucesso!");
      setOpenModal(true);
      setActiveStep(steps.length); // Mover para a etapa final
    } catch (error) {
      console.error('Erro ao enviar o vídeo:', error);
      setModalMessage('Ocorreu um erro ao enviar o vídeo.');
      setOpenModal(true);
    } finally {
      setLoading(false);
      setOpenLoadingModal(false); // Fechar modal de carregamento
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setVideoTitle('');
    setVideoDescription('');
    setSelectedCategoryId(null);
    setSelectedFile(null);
    setSelectedFileThumbnail(null);
    setSelectedFilePDF(null);
    setUploadProgress(0);
    navigate("/");
  };

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleSalvar = () => {
    handleUpload();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTitleChange = (event) => {
    const value = event.target.value.slice(0, 60); // Limita a 60 caracteres
    setVideoTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value.slice(0, 500); // Limita a 500 caracteres
    setVideoDescription(value);
  };

  const steps = [
    {
      label: 'Dados do Vídeo',
      description: 'Digite o título do seu vídeo.',
    },
    {
      label: 'Descrição do Vídeo',
      description: '',
    },
    {
      label: 'Escolha a Categoria',
      description: '',
    },
    {
      label: 'Enviar o Vídeo e Thumbnail',
      description: '',
    },
    {
      label: 'Arquivos Complementares',
      description: '',
    }
  ];

  return (
    <>
      <Box sx={{ display: 'flex', maxWidth: 1200, marginTop: 10 }}>
        <Box sx={{ flex: 1 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  {index === 0 && (
                    <Box sx={{ margin: '20px' }}>
                      <TextField
                        label="Digite o título do vídeo"
                        variant="outlined"
                        fullWidth
                        value={videoTitle}
                        onChange={handleTitleChange}
                        inputProps={{ maxLength: 60 }}
                        sx={{ marginBottom: '10px' }}
                      />
                    </Box>
                  )}

                  {index === 1 && (
                    <Box sx={{ margin: '20px' }}>
                      <TextareaAutosize
                        placeholder="Digite a descrição do vídeo"
                        value={videoDescription}
                        onChange={handleDescriptionChange}
                        minRows={5}
                        maxRows={10}
                        style={{
                          width: '100%',
                          padding: '10px',
                          fontSize: '15px',
                          resize: 'vertical',
                          marginBottom: '10px',
                          borderColor: 'rgba(0, 0, 0, 0.23)',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                  )}

                  {index === 2 && (
                    <div style={{ margin: '20px' }}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="categoria-label">Categoria</InputLabel>
                        <Select
                          labelId="categoria-label"
                          value={selectedCategoryId}
                          onChange={handleCategoryChange}
                          label="Categoria"
                        >
                          {dadosCategoria.map((categoria) => (
                            <MenuItem key={categoria.id} value={categoria.id}>
                            {`${categoria.descricao_menu} > ${categoria.descricao_submenu}`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  )}

                  {index === 3 && (
                    <div style={{ margin: '20px' }}>
                      <FileUpload
                        onFileChange={handleFileChange}
                        fileName={selectedFile ? selectedFile.name : ''}
                        accept="video/mp4"
                        label="Escolher Vídeo"
                      />
                      <FileUpload
                        onFileChange={handleFileChangethumbnail}
                        fileName={selectedFileThumbnail ? selectedFileThumbnail.name : ''}
                        accept="image/jpeg"
                        label="Escolher Thumbnail"
                      />
                    </div>
                  )}

                  {index === 4 && (
                    <div style={{ margin: '20px' }}>
                      <FileUpload
                        onFileChange={handleFileChangePdf}
                        fileName={selectedFilePDF ? selectedFilePDF.name : ''}
                        accept="application/pdf"
                        label="Escolher PDF"
                      />
                    </div>
                  )}

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      sx={{ marginRight: 1 }}
                    >
                      Voltar
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSalvar}
                        disabled={loading}
                      >
                        {loading ? 'Enviando...' : 'Salvar'}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        Próximo
                      </Button>
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>

      {/* Modal de carregamento */}
      <Dialog open={openLoadingModal} onClose={() => setOpenLoadingModal(false)}>
        <DialogTitle>Carregando</DialogTitle>
        <DialogContent>
          <Typography>{loadingMessage}</Typography>
          <Box sx={{ width: '100%', marginTop: 2 }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography variant="body2" align="center" sx={{ marginTop: 1 }}>
              {uploadProgress}%
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLoadingModal(false)} disabled={loading}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de mensagem */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Mensagem</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
