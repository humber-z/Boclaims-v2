import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    props.consluir()
  };

  return (
    <div>

        <DialogTitle id="form-dialog-title">Actualizacion del Caso</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Agregue una breve descripcion para el caso.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={props.setDescr}
            label="Descripcion"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={props.guardarConclusion} color="primary">
            Guardar
          </Button>
        </DialogActions>

    </div>
  );
}
