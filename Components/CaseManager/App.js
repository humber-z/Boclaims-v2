import React from 'react';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import TabsRoutes from './editor/TabsRoutes';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import './App.css';
import MultiStep from './editor/stepMenu';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

const firebase = require('firebase');
   
require('firebase/firestore');
/*if (!firebase.apps.length) {
firebase.initializeApp({
     apiKey: "AIzaSyBBPqtPbU7LmRi9ApiRMH3l4jdx9_MJbYI",
    authDomain: "boclaims-app.firebaseapp.com",
    databaseURL: "https://boclaims-app.firebaseio.com",
    projectId: "boclaims-app",
    storageBucket: "boclaims-app.appspot.com",
    messagingSenderId: "685620593148",
    appId: "1:685620593148:web:b2d4af92e9b020ce"
  });
}*/

class App extends React.Component {

  constructor(props) {
    super()
    this.state = {
      activo: true,
      selectedNoteIndex: null,
      selectedNote: null,
      onSelect: true,
      notes: null
    }
  }


  render() {

    return (
      <div className="app-container">
       {
          !this.state.selectedNote ?
          (<SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote} />)
            :
         ( <> 
          <Box component="span" m={0}>
          <Button 
            style={{ margin: "6px"}}
            onClick={() => this.setState({selectedNoteIndex: null, selectedNote: null})}
            variant="contained" 
            color="primary">Casos</Button> 
 
         </Box>
           <MultiStep 
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              noteUpdate={this.noteUpdate}/> 
             </>   
           )
        }          
      </div>
    )
  }
  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .orderBy("timestamp", "desc")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          data['name']= this.props.name;
          return data;
        });
        console.log( 'App.js componentDidMount',notes);
        this.setState({ notes: notes });
      });
     console.log('nombreeee',this.props.name)
  }

 
  selectNote = async (note, index)  =>{ 

  await this.setState({ selectedNoteIndex: index, selectedNote: note, onSelect: false})
   console.log(this.state.selectedNote.id);
    };
 
  noteUpdate = async (id, noteObj) => {
  await  firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        domicilio: noteObj.domicilio,
        telefono: noteObj.telefono,
        celular: noteObj.celular,
        email: noteObj.email,
        curp: noteObj.curp,
        rfc: noteObj.rfc,
        aseguradora: noteObj.aseguradora,
        ramo: noteObj.ramo,
        tiposeguro:noteObj.tiposeguro,
        monto: noteObj.monto,
        descripcion: noteObj.descripcion,
        contrato: noteObj.contrato,
        honorarios: noteObj.honorarios,
        anticipo: noteObj.anticipo,
        asignadoA: noteObj.asignadoA,
        recomendado: noteObj.recomendado,
        estado: noteObj.estado,
        descr: noteObj.descr,
        actualizado: noteObj.actualizado, 
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      await firebase.firestore()
    .collection('notificaciones')
    .add({
        text: `${this.props.name} ha actualizado el caso ${noteObj.title}`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(doc => console.log('notificacion',doc))
  }
  newNote = async (title) => {
    const note = {
      title: title,
      body: '',
      domicilio:'',
      telefono:'',
      celular:'',
      email:'',
      curp:'',
      rfc:'',
      aseguradora:'',
      ramo:'',
      tiposeguro:'',
      monto:'',
      descripcion: '',
      contrato: '',
      honorarios: '',
      anticipo: '',
      asignadoA: '',
      recomendado: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        domicilio: note.domicilio,
        telefono: note.telefono,
        celular: note.celular,
        email: note.email,
        curp: note.curp,
        rfc: note.rfc,
        aseguradora: note.aseguradora,
        ramo: note.ramo,
        tiposeguro:note.tiposeguro,
        monto: note.monto,
        descripcion: note.descripcion,
        contrato: note.contrato,
        honorarios: note.honorarios,
        anticipo: note.anticipo,
        asignadoA: note.asignadoA,
        recomendado: note.recomendado,
        creado: this.props.name,
        fase1: null,
        fase2: null,
        fase3M: null,
        fase3O: null,
        estado: 1,
        etapa: '1-Directa',
        descr: 'Caso Creado',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    const notificacion = await firebase.firestore()
    .collection('notificaciones')
    .add({
        text: `${this.props.name} ha creado el caso ${note.title}`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(doc => console.log('notificacion',doc))
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }



  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
        this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
      
      firebase
      .firestore()
      .collection('casos')
      .doc(note.idLite)
      .delete();
  }
}
export default App