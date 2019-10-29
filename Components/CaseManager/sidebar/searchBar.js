import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { Divider, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,

  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  button: {
    marginLeft: 10,
  }
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();

  return (
    <div style={{display: 'flex', spacing: '15px'}}>
    <Paper className={classes.root}>
      
      <InputBase
        className={classes.input}
        placeholder="Buscar Caso"
        onChange={props.setSearchTerm}
        inputProps={{ 'aria-label': 'busca caso' }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
 
    </Paper>
    <Button 
            variant="contained" 
            color="secondary"
            className={classes.button}
            endIcon={<AddIcon />}
            onClick={props.newNote}>Nuevo</Button>
      <Button 
            className={classes.button}
            onClick={props.setCasosActivos}
            variant="contained">Activos</Button>       
      <Button 
            className={classes.button}
            onClick={props.setCasosInactivos}
            variant="contained">Inactivos</Button> 
      <Button 
            className={classes.button}
            onClick={props.setCasosConcluidos}
            variant="contained">Concluidos</Button>        
   </div> 
  );
}