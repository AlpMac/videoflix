import * as React from 'react';
import { useRef } from 'react';
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
import { useParams } from 'react-router-dom';
import { usuarioLogado } from '../../utils/global';
import { NineKOutlined, RepeatOneSharp } from '@mui/icons-material';


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
  const [videoId, setVideoId] = React.useState('');
  const [videoDescription, setVideoDescription] = React.useState('');
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState('');
  const [dadosCategoria, setDadosCategoria] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePDFName, setSelectedFilePDFName] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFilePDF, setSelectedFilePDF] = useState(null);
  const [selectedFileThumbnail, setSelectedFileThumbnail] = useState(null);
  const [selectedFileNameThumbnail, setSelectedFileNameThumbnail] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Enviando vídeo...');
  const [openLoadingModal, setOpenLoadingModal] = React.useState(false);
 



  
  const navigate = useNavigate();

  // iremos pegaro o parametro de id se existir para que os campos venham preenchidos
  let { id } = useParams();

 // Refs para armazenar os estados antigos
 const prevSelectedFileName = useRef(null);
 const prevSelectedFileNameThumbnail = useRef(null);
 const prevSelectedFileNamePDF = useRef(null);

    // Função para buscar dados do vídeo para edição
    useEffect(() => {
      if (id) {
      api.get(`/video/${id}`)
        .then((response) => {
          prevSelectedFileName.current = response.data.url_video;
          prevSelectedFileNameThumbnail.current = response.data.thumbnail;
          prevSelectedFileNamePDF.current = response.data.arquivos_complementares;
          setVideoId(response.data.id_video);
          setVideoTitle(response.data.titulo_video);
          setVideoDescription(response.data.descricao_video);
          setSelectedCategoryId(response.data.id_categoria);
          // Verifica se as variáveis de arquivo são URLs de string ou objetos de arquivo e ajusta conforme necessário
          setSelectedFile({ name: response.data.url_video });
          setSelectedFileName(response.data.url_video);
          setSelectedFileThumbnail({ name: response.data.thumbnail });
          setSelectedFileNameThumbnail(response.data.thumbnail);
          setSelectedFilePDF(response.data.arquivos_complementares);
          setSelectedFilePDFName({ name : response.data.arquivos_complementares}); // Atualize isso
          // Atualize isso
          console.log("arquivos_complementares"+response.data.arquivos_complementares);
        })
        .catch((err) => {
          console.error("Erro ao buscar dados do video para edição:", err);
        });
               }}, [id]);
 

  
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
      setSelectedFilePDFName(file);
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
    formData.append('filepdf', selectedFilePDF);

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
      const videoPDF = response.data.pdf;

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
        pdf: videoPDF,
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

  const handleUpdate = async () => {
    if ((!selectedFile && !selectedFileThumbnail ) || !videoTitle || !videoDescription || !selectedCategoryId) {
      setModalMessage("Preencha todos os campos antes de enviar.");
      setOpenModal(true);
      return;
    }

    setLoading(true);
    setOpenLoadingModal(true);
    setLoadingMessage('Atualizando vídeo...');

    try {
      const filenameAntigo = prevSelectedFileName.current;
      const filenameThumbnailAntigo = prevSelectedFileNameThumbnail.current;
      const filenamePDFAntigo = prevSelectedFileNamePDF.current;

      const formData = new FormData();

      if (selectedFile && prevSelectedFileName.current !== selectedFile.name) {
        formData.append('file', selectedFile);
      }

      if (selectedFileThumbnail && prevSelectedFileNameThumbnail.current !== selectedFileThumbnail.name) {
        formData.append('filethumbnail', selectedFileThumbnail);
      }

      if (selectedFilePDFName && selectedFilePDFName.current !== selectedFilePDFName.name) {
        formData.append('filepdf', selectedFilePDFName);
      }

      if (formData.has('file') || formData.has('filethumbnail') || formData.has('filepdf')) {
        const response = await api.post('/enviar-video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          },
        });

        let videoUrlUpdate = filenameAntigo;
        let videoThumbnailUpdate = filenameThumbnailAntigo;
        let videoPDFUpdate = filenamePDFAntigo;

        const videoVeioUpdate = response.data.video;
        const thumbnailVeioUpdate = response.data.thumbnail;
        const pdfVeioUpdate = response.data.pdf;

        if (videoVeioUpdate !== "0" && thumbnailVeioUpdate !== "0" && pdfVeioUpdate !== "0") {
          videoUrlUpdate = videoVeioUpdate;
          videoThumbnailUpdate = thumbnailVeioUpdate;
          videoPDFUpdate = pdfVeioUpdate;
        } else if (videoVeioUpdate !== "0" && thumbnailVeioUpdate === "0" && pdfVeioUpdate === "0") {
          videoUrlUpdate = videoVeioUpdate;
          videoThumbnailUpdate = selectedFileThumbnail.name;
          videoPDFUpdate = selectedFilePDF.name;
        } else if (videoVeioUpdate === "0" && thumbnailVeioUpdate !== "0" && pdfVeioUpdate === "0") {
          videoThumbnailUpdate = thumbnailVeioUpdate;
          videoUrlUpdate = selectedFile.name;
          videoPDFUpdate = selectedFilePDF.name;
        } else if (videoVeioUpdate === "0" && thumbnailVeioUpdate === "0" && pdfVeioUpdate !== "0") {
          videoPDFUpdate = pdfVeioUpdate;
          videoUrlUpdate = selectedFile.name;
          videoThumbnailUpdate = selectedFileThumbnail.name;
        } else if (videoVeioUpdate !== "0" && thumbnailVeioUpdate !== "0" && pdfVeioUpdate === "0") {
          videoUrlUpdate = videoVeioUpdate;
          videoThumbnailUpdate = thumbnailVeioUpdate;
          videoPDFUpdate = selectedFilePDF.name;
        }

        console.log({
          "Video Title": videoTitle,
          "Video Description": videoDescription,
          "Video URL": videoUrlUpdate,
          "Selected Category ID": selectedCategoryId,
          "Video Thumbnail": videoThumbnailUpdate,
          "Video PDF": videoPDFUpdate,
          "Video ID": videoId
        });

        await api.put(`/video/${id}`, {
          titulo: videoTitle,
          descricao: videoDescription,
          url: videoUrlUpdate,
          id_categoria: selectedCategoryId,
          thumbnail: videoThumbnailUpdate,
          pdf: videoPDFUpdate,
          id: videoId
        });

        setModalMessage("Vídeo atualizado com sucesso!");
        setOpenModal(true);
        setActiveStep(steps.length);
      }
    } catch (error) {
      console.error('Erro ao atualizar o vídeo:', error);
      setModalMessage('Ocorreu um erro ao atualizar o vídeo.');
      setOpenModal(true);
    } finally {
      setLoading(false);
      setOpenLoadingModal(false);
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

  const handleUpdateVideo = () => {
    handleUpdate();
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
                        fileName={selectedFilePDFName ? selectedFilePDFName.name : ''}
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
                        onClick={id ? handleUpdateVideo : handleSalvar}
                        disabled={loading}
                      >
                        {loading ? 'Enviando...' : id ? 'ATUALIZAR' : 'Salvar'}
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
