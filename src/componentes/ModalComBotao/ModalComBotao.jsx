import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import LinearBuffer from '../LoadingVideo/LinearProgress/LinearProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


  
  function ChildModal(props) {
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      props.handleCloseParent(); // Chama a função do componente pai para fechar o modal aninhado
    };
  
    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Cancelar Envio</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2 id="child-modal-title">Você cancelou a ação !</h2>
            <p id="child-modal-description" sx={{ mt: 2, marginBottom: 20 }}>
              Operação não executada
            </p>
            <Button onClick={handleClose}>Fechar</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

export default function NestedModal(props) {
    const handleClose = () => {
      props.handleClose(); // Chama a função de fechar do componente pai
    };
  
    return (
      <div>
        <Modal
          open={props.open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2 id="parent-modal-title">Aguarde Enviando Video </h2>
            <div id="parent-modal-description">
              <LinearBuffer />
            </div>
            <ChildModal handleCloseParent={handleClose} /> {/* Passa a função handleClose como propriedade */}
          </Box>
        </Modal>
      </div>
    );
  }
