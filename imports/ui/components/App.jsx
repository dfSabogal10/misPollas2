import React, {Component, PropTypes} from "react";
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import {Projects} from "../../api/Projects.js"
import {Users} from "../../api/Users.js"
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import FacebookLogin from 'react-facebook-login';
import Project from "./Project.jsx";
import Fixture from "./Fixtures.jsx"
import { DateRange } from 'react-date-range';

//Mejor almacenar estas variables en el state
var moment = require('moment');
var datestart = new moment('2014-11-11');
var dateend = new moment('2014-11-11');


export class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      idLogueado: '',
      nombre:''
    };
  }

  onChange(state) {
    this.setState(state);
  }

  handleSelect(date){
    datestart = new moment(date.startDate);
    dateend = new moment(date.endDate);
  } 

  getGames() {
    var diasdiferencia = dateend.diff(datestart, 'days');
    var month = datestart.format('MM');
    var day = datestart.format('DD');
    var year = datestart.format('YYYY');
    var month2 = dateend.format('MM');
    var day2 = dateend.format('DD');
    var year2 = dateend.format('YYYY');
    console.log(diasdiferencia);
    
    if(diasdiferencia > 20)
    {
      alert("El maximo rango de fechas permitido es de 21 dias");
    }
    else {
    console.log("Query time");
    Meteor.call('getGame',
                   day: day,
                   month: month,
                   year: year,
                   day2: day2,
                   month2: month2,
                   year2: year2,

                  (err, res) =>{
                    if (err) { 
                      console.log(err); 
                    }
                    else {
                      console.log("made it!");
                      console.log(res.data.fixtures);
                      this.setState({fixtures: res.data.fixtures});
                    }
                });
      }
  }

  responseFacebook(response) {
    var user = Meteor.call('Users.buscarUsuario', response);
    console.log('siretorno:', user);
    console.log(response);
    this.setState({idLogueado: response.userID,
    nombre: response.name});
    console.log(this.state.idLogueado);
  }

  render() {
    if(this.state.idLogueado== '')
    {
      return (
        <section>
            <header>
                <div className="header-content">
                    <div className="header-content-inner">
                        <h1 id="homeHeading">Bienvenidos a Mis Pollas</h1>
                        <p>¿Estás cansado de tener que utilizar excel? ¿Gestionar los marcadores? ¿Determinar quien ha pagado, quien no? ¿Que tengas que usar cash? ¿Ademas no poder saber quien ha apostado? Vamos a crear una nueva forma de hacer tus pollas de manera social y utilizando las facilidades tecnológicas!</p>
                        <FacebookLogin appId="1298913943519790" autoLoad={true} fields="name,email,picture" callback={this.responseFacebook.bind(this)}/>
                    </div>
                </div>
            </header>
        </section>
      );
    }
    else {
      return(
        <div>
          <div className="fondo">
            <h1>Mis pollas</h1>
            <h3>Selecciona una fecha para hacer tu polla</h3>
            <br></br>
            <div className="container-fluid">
              <div className="row centered">
                <div className="col-xs-2 col-md-2">
                </div>
                  <div className="col-xs-8 col-md-8 ">
                    <DateRange onInit={this.handleSelect} onChange={this.handleSelect}/>
                  </div>
                <div className="col-xs-2 col-md-2">
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row centered">
                <div className="col-xs-6 col-md-3">
                </div>
                  <div className="col-xs-6 col-md-6 ">
                    <button onClick={this.getGames.bind(this)}  className="btn">Ver Partidos</button>
                  </div>
                <div className="col-xs-3 col-md-3">
                </div>
              </div>
            </div>
            <div> 
              {
                this.state&&this.state.fixtures&&this.state.fixtures.map(fixture => {
                    return <Fixture fixture={fixture} key={fixture.homeTeamName} name={this.state.nombre}/>
                })
              }
            </div>
          </div>
        </div>
      );
    }
  }
}


App.propTypes = {
  projects : PropTypes.array.isRequired
}


export default AppContainer = createContainer(()=>{
  Meteor.subscribe('projects');
  Meteor.subscribe('usuarios');

  return {
    projects: Projects.find({}).fetch(),
    top: Projects.find({}, {sort: {votes: -1}, limit:10}).fetch(),
    favourites: Projects.find({ FavouriteUsers: Meteor.userId() }),
  };
}, App);
