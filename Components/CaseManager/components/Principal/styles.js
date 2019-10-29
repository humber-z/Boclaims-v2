const styles = theme => ({
container:{
  boxSizing: 'border-box',
  height: '100%',
  width: '100%',
},
header:{

  padding: '5px'
}, 
content:{
  width: '75%',
  height: '100%',
  float: 'left',
  padding: '5px',

},
notification:{
  width: '25%',
  height: '100%',
  float: 'left',
  padding: '5px',

},
 paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperNotCont: {
    height: '100vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflow: 'scroll'
  },
  paperN: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
  textSection: {
    display: 'flex',
    flex: '1',
    padding: '3px'
  }, 
  card:{
    marginBottom: '12px'
  },
  deleteIcon: {
    cursor: 'pointer',
    position: 'absolute',
    right: '3px',
    top: 'calc(50% - 15px)',
    '&:hover': {
      color: 'red'
    }
  }
});

export default styles;