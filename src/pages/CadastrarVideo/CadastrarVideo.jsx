import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import LoadingVideo from '../../componentes/LoadingVideo/LoadingVideo';
import NestedModal from '../../componentes/ModalComBotao/ModalComBotao';

// Dados viram do banco de dados
const categorias = [
  { Id: 1, Categoria: 'Sistemas' },
  { Id: 2, Categoria: 'Infraestrutura' },
  { Id: 3, Categoria: 'SIC' }
];

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

const steps = [
  {
    label: 'Dados do Vídeo',
    description: `Digite o título do seu vídeo.`,
  },
  {
    label: 'Descrição do Vídeo',
    description: '',
  },
  {
    label: 'Escolha a Categoria',
    description: ``,
  },
];

export default function CadastrarVideo() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [videoTitle, setVideoTitle] = React.useState('');
  const [videoDescription, setVideoDescription] = React.useState('');
  const [titleChars, setTitleChars] = React.useState(0);
  const [descChars, setDescChars] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const [openNestedModal, setOpenNestedModal] = React.useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCategoryChange = (event, value) => {
    setSelectedCategoryId(value ? value.Id : null);
  };

  const handleSalvar = () => {
    console.log('Salvando dados do vídeo');

    handleOpenNestedModal(); // Abre o modal aninhado
  };

  const handleOpenNestedModal = () => {
    setOpenNestedModal(true);
  };

  const handleTitleChange = (event) => {
    const value = event.target.value.slice(0, 60); // Limita a 60 caracteres
    setVideoTitle(value);
    setTitleChars(value.length);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value.slice(0, 500); // Limita a 500 caracteres
    setVideoDescription(value);
    setDescChars(value.length);
  };

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
                    <div>
                      <input
                        type="text"
                        placeholder="Digite o título do vídeo"
                        value={videoTitle}
                        onChange={handleTitleChange}
                        style={{ width: '100%', marginBottom: '10px' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="caption">{titleChars}/60 caracteres</Typography>
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    <div>
                      <textarea
                        placeholder="Digite a descrição do vídeo"
                        value={videoDescription}
                        onChange={handleDescriptionChange}
                        style={{ width: '100%', minHeight: '100px', resize: 'vertical', marginBottom: '10px' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="caption">{descChars}/500 caracteres</Typography>
                      </div>
                    </div>
                  )}

                  {index === 2 && (
                    <div>
                      <Autocomplete
                        id="filter-demo"
                        options={categorias}
                        getOptionLabel={(option) => option.Categoria}
                        filterOptions={filterOptions}
                        onChange={handleCategoryChange}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Categoria" />}
                      />
                    </div>
                  )}

                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                        {index === steps.length - 1 ? 'Enviar' : 'Continuar'}
                      </Button>
                      <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                        Voltar
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>Dados armazenados para SALVAR !</Typography>
              <Button onClick={handleSalvar} sx={{ mt: 1, mr: 1 }}>
                Salvar
              </Button>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reiniciar
              </Button>
            </Paper>
          )}
        </Box>

        <Box sx={{ display: { xs: '22', md: 'flex', marginLeft: 20 } }}>
          <LoadingVideo title={videoTitle} description={videoDescription} />
        </Box>
      </Box>
      <NestedModal open={openNestedModal} handleClose={() => setOpenNestedModal(false)} />

    </>
  );
}
