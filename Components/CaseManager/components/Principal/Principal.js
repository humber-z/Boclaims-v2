import React, { Component } from 'react';
import { render } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BigCalendar from 'react-big-calendar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import 'react-big-calendar/lib/css/react-big-calendar.css';
require('moment/locale/es.js');
 const firebase = require('firebase');
  
require('firebase/firestore');



const localizer = BigCalendar.momentLocalizer(moment);
//array de eventos
const myEventsList= [{
 title: "Hoy Juicio",
 start: new Date('2019-10-24 10:22:00'),
 end: new Date('2019-10-24 10:42:00')
},
{
 title: "Reclamacion directa",
 start: new Date('2019-10-09 12:22:00'),
 end: new Date('2019-10-09 13:42:00')
}]

class Principal extends React.Component {
  constructor() {
    super();
    this.state = {
        notes: null
    };
  }

componentDidMount = () => {
    firebase
      .firestore()
      .collection('notificaciones')
      .orderBy("timestamp", "desc")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log( 'dashboard notification',notes);
        this.setState({ notes: notes });
      });

  }
 


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.header}>
            <Grid item xs={12}>
               <Paper className={classes.paper}>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Total de Casos
                  </Button>
                  <Button variant="contained" color="primary" className={classes.button}>
                    R. Directa
                  </Button>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Condusef
                  </Button>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Tribunales
                  </Button>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Juridica
                  </Button>
               </Paper>
           </Grid>
        </div>
        
        <div className={classes.content}>
           <Paper className={classes.paper}>
            <Grid item xs={12} sm={12}>
               <div style={{height:'100vh'}} className="bigCalendar-container">
                  <BigCalendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={moment().toDate()}
                    view="month"
                    messages={{
                    next: "sig",
                    previous: "ant",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día"
                    }}
                    />
                </div>
            </Grid>
            </Paper>
        </div>
        <div className={classes.notification}>
            <Paper className={classes.paperNotCont}>
             <Grid item xs={12} sm={12}>
              <List>
                {this.state.notes ? 
                this.state.notes.map((item,id) =>{
                  return(
                    <Card key={item.id} className={classes.card}>
                       <div>
                          <ListItem
                              alignItems='flex-start'>
                                <div className={classes.textSection}>
                                    <Typography variant="subtitle2" gutterBottom>
                                       {item.text}
                                    </Typography>
                                 </div>
                                  {/*<Paper key={id} className={classes.paperN}>{item.text}</Paper>*/}
                               <DeleteIcon className={classes.deleteIcon}
                                           onClick={() => this.deleteNoti(item.id)}
                               ></DeleteIcon>
                          </ListItem>
                      </div>
                    </Card>
                    )
                })
                :
                null
                }
               </List> 
              </Grid>
             </Paper>
        </div>
      </div>
    );
  }
  deleteNoti = (id) => {
    //alert(`Confirmacion para eliminar caso:${id}`)
     firebase
      .firestore()
      .collection('notificaciones')
      .doc(id)
      .delete();
  }
}
 
export default withStyles(styles)(Principal)