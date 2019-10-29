import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Conclusion from './Conclusion'
import {
  MuiPickersUtilsProvider, 
  KeyboardDatePicker,
} from '@material-ui/pickers';
const firebase = require('firebase'); 
require('firebase/firestore');


class Etapa1 extends React.Component{
   constructor(){
     let archivos=[] //aqui vamoh a jugar los archivos + nomvres de los archivos en variable
                     // antes de pasarlos al state
     super()
       this.state = {
        id: '', 
        created: false, 
        numSinsitro: '',
        fechaReclamo: null,
        coment1: '',
        fechaRespueRecl: null,
        coment2: '',
        fechaInfoAdici: null,
        coment3: '',
        fechaEntregInfAdi: null,
        coment4:'',
        fechaEntregInfFin: null,
        coment5:'',
        fechaRespFinalAseg: null,
        coment6: '',
        fechaInformeFinal: null,
        coment7: '',
        descr: '',
        open: false,
        archivoState: [{i:'cacahuete',j: ' nuez' }]

        
       };

       this.handleReclamo = this.handleReclamo.bind(this)
       this.handleRespRec = this.handleRespRec.bind(this)
       this.handleInfoAdic = this.handleInfoAdic.bind(this)
       this.handleEntregInfAdi =this.handleEntregInfAdi.bind(this)
       this.handleEntregInfFin =this.handleEntregInfFin.bind(this)
       this.handleRespFinAseg =this.handleRespFinAseg.bind(this)
       this.handleInfoFin = this.handleInfoFin.bind(this)
       
   }

componentDidMount = () => {
   
        if(this.props.selectedNote.fase1)
        this.fullFields(this.props.selectedNote.fase1)


        const storageRef = firebase.storage().ref(this.props.selectedNote.id);
        // Create a reference under which you want to list
        const listRef = storageRef.child('fechaReclamo/');
        // Find all the prefixes and items.
        const list = listRef.listAll().then((res) => {
           const data =res.items; 
           return data;
           res.items.forEach(function(itemRef) {
           itemRef.fullPath.getDownloadURL().then((url) => console.log('urls',url))
           console.log(items.fullPath)
           });
           }).catch(function(error) {
              console.log('algo salio mal.com! jajaja sayonara motherfucker')
  
           });

//this.init(list)
}
  

 fullFields = (data) => {
  this.setState({
        id: data.id,
        created: data.created, 
        numSinsitro: data.numSinsitro,
        fechaReclamo: data.fechaReclamo ? data.fechaReclamo.toDate() : null,
        coment1: data.coment1,
        fechaRespueRecl: data.fechaRespueRecl ? data.fechaRespueRecl.toDate() : null,
        coment2: data.coment2,
        fechaInfoAdici: data.fechaInfoAdici ? data.fechaInfoAdici.toDate() : null,
        coment3: data.coment3,
        fechaEntregInfAdi: data.fechaEntregInfAdi ? data.fechaEntregInfAdi.toDate() : null,
        coment4: data.coment4,
        fechaEntregInfFin: data.fechaEntregInfFin ? data.fechaEntregInfFin.toDate() : null,
        coment5: data.coment5,
        fechaRespFinalAseg: data.fechaRespFinalAseg ? data.fechaRespFinalAseg.toDate() : null,
        coment6: data.coment6,
        fechaInformeFinal: data.fechaInformeFinal ? data.fechaInformeFinal.toDate() : null,
        coment7: data.coment7
        })
}



handleReclamo(date){
    this.setState({fechaReclamo: date})
}

handleRespRec(date){
  this.setState({fechaRespueRecl: date})
}

handleInfoAdic(date){
  this.setState({fechaInfoAdici: date})
}

handleEntregInfAdi(date){
  this.setState({fechaEntregInfAdi: date})
}

handleEntregInfFin(date){
  this.setState({fechaEntregInfFin: date})
}

handleRespFinAseg(date){
  this.setState({fechaRespFinalAseg: date})
}
handleInfoFin(date){
  this.setState({fechaInformeFinal: date})
}




render(){
  return(
    <div style={{}}>
       <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <Grid 
              direction="column"
              justify="flex-start"
              alignItems="flex-start">
            <TextField
               style={{display: 'felx-start'}}
               id="outlined-name"
               label="Numero del Siniestro"
               value={this.state.numSinsitro} 
               onChange={(e) => this.setState({numSinsitro: e.target.value})}
               margin="normal"
               variant="outlined"

               />
        <div >
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fecha de Reclamo ante..."
              value={this.state.fechaReclamo}
              onChange={this.handleReclamo}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <input
               accept="pdf/*"
               style={{display: 'none'}}
               id="fechaReclamo"
               key="fechaReclamo"
               multiple
               type="file"
               onChange={this.onChangeHandler}
               />
             <label htmlFor="fechaReclamo">
            <Button variant="contained" component="span" style={{margin: '20px'}}>
              Cargar archivo
             </Button>
             </label>
              <TextField
               id="outlined-name"
               label="Comentario"
               margin="normal"
               value={this.state.coment1}
               onChange={(e) => this.setState({coment1: e.target.value, descr:e.target.value})}
               variant="outlined"
               style={{width: '350px'}}
               />
       </div>
       <div >
             <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fecha de Resp. de Reclamo"
              value={this.state.fechaRespueRecl}
              onChange={this.handleRespRec}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            /> 
            <input
               accept="pdf/*"
               style={{display: 'none'}}
               id="contained-button-file"
               multiple
               type="file"
               />
             <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" style={{margin: '20px'}}>
              Cargar archivo
             </Button>
           </label>
              <TextField
               id="outlined-name"
               label="Comentario"
               margin="normal"
               value={this.state.coment2}
               onChange={(e) => this.setState({coment2: e.target.value, descr:e.target.value})}
               variant="outlined"
               style={{width: '350px'}}
               />
         </div>
         <div>
             <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fecha Info. Adicional"
              value={this.state.fechaInfoAdici}
              onChange={this.handleInfoAdic}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            /> 
            <input
               accept="pdf/*"
               style={{display: 'none'}}
               id="contained-button-file"
               multiple
               type="file"
               />
             <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" style={{margin: '20px'}}>
              Cargar archivo
             </Button>
           </label>
              <TextField
               id="outlined-name"
               label="Comentario"
               margin="normal"
               value={this.state.coment3}
               onChange={(e) => this.setState({coment3: e.target.value, descr:e.target.value})}
               variant="outlined"
               style={{width: '350px'}}
               />
        </div>




       <div>
             <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fecha Entrega Informe Adic."
              value={this.state.fechaEntregInfAdi}
              onChange={this.handleEntregInfAdi}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            /> 
            <input
               accept="pdf/*"
               style={{display: 'none'}}
               id="contained-button-file"
               multiple
               type="file"
               />
             <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" style={{margin: '20px'}}>
              Cargar archivo
             </Button>
           </label>
              <TextField
               id="outlined-name"
               label="Comentario"
               margin="normal"
               value={this.state.coment4}
               onChange={(e) => this.setState({coment4: e.target.value, descr:e.target.value})}
               variant="outlined"
               style={{width: '350px'}}
               />
         </div> 
         <div>
             <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fecha Entrega Informe Final"
              value={this.state.fechaEntregInfFin}
              onChange={this.handleEntregInfFin}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            /> 
            <input
               accept="pdf/*"
               style={{display: 'none'}}
               id="contained-button-file"
               multiple
               type="file"
               />
             <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" style={{margin: '20px'}}>
              Cargar archivo
             </Button>
           </label>
              <TextField
               id="outlined-name"
               label="Comentario"
               margin="normal"
               value={this.state.coment5}
               onChange={(e) => this.setState({coment5: e.target.value, descr:e.target.value})}
               variant="outlined"
               style={{width: '350px'}}
               />
         </div> 
         <div>
             <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fecha Respuesta Aseguradora"
              value={this.state.fechaRespFinalAseg}
              onChange={this.handleRespFinAseg}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            /> 
            <input
               accept="pdf/*"
               style={{display: 'none'}}
               id="contained-button-file"
               multiple
               type="file"
               />
             <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" style={{margin: '20px'}}>
              Cargar archivo
             </Button>
           </label>
              <TextField
               id="outlined-name"
               label="Comentario"
               margin="normal"
               value={this.state.coment6}
               onChange={(e) => this.setState({coment6: e.target.value, descr:e.target.value})}
               variant="outlined"
               style={{width: '350px'}}
               />
         </div> 



















        <div>
             <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fecha Info. Final"
              value={this.state.fechaInformeFinal}
              onChange={this.handleInfoFin}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            /> 
            <input
               accept="pdf/*"
               style={{display: 'none'}}
               id="contained-button-file"
               multiple
               type="file"
               />
             <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" style={{margin: '20px'}}>
              Cargar archivo
             </Button>
           </label>
              <TextField
               id="outlined-name"
               label="Comentario"
               margin="normal"
               value={this.state.coment7}
               onChange={(e) => this.setState({coment7: e.target.value, descr:e.target.value})}
               variant="outlined"
               style={{width: '350px'}}
               />
         </div>   
         </Grid>
       </MuiPickersUtilsProvider> 
       <Button 
          onClick={this.save}
          variant="contained" 
          color="primary">Guardar</Button>
       <Button 
          onClick={this.consluir}
          style={{ margin: "6px"}}
          variant="contained" 
          color="primary">Concluir</Button>
      <div>    
        <Dialog open={this.state.open} onClose={this.consluir} aria-labelledby="form-dialog-title"> 
           <Conclusion 
              consluir={this.consluir}
              descr={this.state.descr}
              guardarConclusion={this.guardarConclusion}
              setDescr={this.setDescr}/>
        </Dialog>  
     </div>
    </div>
  )
} 
consluir = () =>{
this.setState({open: !this.state.open})
}
guardarConclusion = async () => {
  await firebase.firestore().collection('notes').doc(this.props.selectedNote.id).update({
        estado: 3,
        descr: this.state.descr,
        etapa: '1-Directa',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    this.setState({open: !this.state.open})
}
setDescr = (e) =>{
    this.setState({descr:e.target.value})
}


save = async () =>{
  this.setState({archivoState:  archivos})
//const arr=[ ...this.archivoState, ...archivos]

await firebase.firestore().collection('notes').doc(this.props.selectedNote.id).update({
      'fase1': { 
        numSinsitro: this.state.numSinsitro,
        fechaReclamo: this.state.fechaReclamo,
        coment1: this.state.coment1,
        fechaRespueRecl: this.state.fechaRespueRecl,
        coment2: this.state.coment2,
        fechaInfoAdici: this.state.fechaInfoAdici,
        coment3: this.state.coment3,
        fechaEntregInfAdi: this.state.fechaEntregInfAdi,
        coment4: this.state.coment4,
        fechaEntregInfFin: this.state.fechaEntregInfFin,
        coment5:this.state.coment5,
        fechaRespFinalAseg: this.state.fechaRespFinalAseg,
        coment6: this.state.coment6,
        fechaInformeFinal: this.state.fechaInformeFinal,
        coment7: this.state.coment7
        },
        descr: this.state.descr,
        etapa: '1-Directa',
        archivos: this.archivoState,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
     await firebase.firestore()
    .collection('notificaciones')
    .add({
        text: `${this.props.selectedNote.name} ha actualizado el caso ${this.props.selectedNote.title}`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(doc => console.log('notificacion',doc))
   
}

onChangeHandler= async (event)=>{
    console.log('do yu een come here brp?')
    const gui=event.target.id
    console.log(event.target.files[0])
    console.log(this.state.archivo)

    await this.setState({archivo: event.target.files[0]})
    console.log(this.state.archivo)
    console.log(this.state.archivo.name)
    console.log(gui)
   
    const arch = this.state.archivo;
    const name=arch.name
    let metadata = {
  contentType: 'document/pdf'
                      };

  const storageRef = firebase.storage().ref(this.props.selectedNote.id);
  let uploadTask = storageRef.child(gui+'/' + arch.name).put(arch, metadata);


  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    ()=>{this.setState({open2: true})}
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        
      //setTimeout(function() {w.close();}, 5000)
        break;
    }
    ()=>{ this.setState({open2: false})}
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      console.log('User doesnt have permission to access the object');
      break;

    case 'storage/canceled':
      // User canceled the upload
       console.log('User canceled the upload');
      break;

    

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
       console.log('Unknown error occurred, inspect error.serverResponse');
      break;
  }
}, ()=> {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    console.log('antes del push', archivos)
    const b={downloadURL, gui,name}
    archivos.push(b)                                  //LLENADO DE LA VARIABLE CON LO QUE SE VA SUBIENDO AL MOMENTO
   console.log('llenando Archivos[]', archivos)
 });
   
});


}

}
export default Etapa1