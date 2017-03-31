import React, {Component, PropTypes} from "react";
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import {Users} from "../../api/Users.js"
import AccountsUIWrapper from "./AccountsUIWrapper.jsx";
import FacebookLogin from "react-facebook-login";
import Fixture from "./Fixtures.jsx"
import MisPollas from "./MisPollas.jsx"

import { DateRange } from "react-date-range";
		var moment = require("moment");
		var datestart = new moment("2014-11-11");
		var dateend = new moment("2014-11-11");


export class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      idLogueado: "javier",
			nombre:"javier"    };
  }

  onChange(state) {
			    this.setState(state);
			  }
				handleSelect(date){
				datestart = new moment(date.startDate);
				dateend = new moment(date.endDate);
		}


		getGames() {
		var diasdiferencia =dateend.diff(datestart, "days");

		var month= datestart.format("MM");
		var day =datestart.format("DD");
		var year =datestart.format("YYYY");
		var month2= dateend.format("MM");
		var day2= dateend.format("DD");
		var year2 =dateend.format("YYYY");
		console.log(diasdiferencia);
		if(diasdiferencia> 20)
		{
		  alert("El maximo rango de fechas permitido es de 21 dias");
		}
		else {
console.log("Query time");
	 Meteor.call("getGame",
			 													   day: day,
			 													   month:month,
																	 year:year,
																	 day2: day2,
			 													   month2:month2,
																	 year2:year2,

			 													  (err, res) =>{
															      if (err) { console.log(err); }
	else {
		console.log("made it!");
		console.log(res.data.fixtures);
		this.setState({fixtures: res.data.fixtures});

	}

															    });
															  }
	}
  responseFacebook(response){
  var user = Meteor.call("Users.buscarUsuario",response);
  console.log("siretorno:",user);
  console.log(response);
  this.setState({idLogueado: response.userID,
	nombre:response.name});
  console.log(this.state.idLogueado);
  }
	mispollitas(){
		var aEnviar =this.state.nombre
	var response = Meteor.call("Pollas.vermispollas",aEnviar,(err, res) =>{
		if (err) { console.log(err); }
else {
	console.log("RESPUESTA:",res);
	this.setState({ mispollas: (res) });
	console.log("HOLA:",this.state.mispollas);

}

	});

}




	render() {
    if(this.state.idLogueado== "")
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
					    <div className="col-xs-3 col-md-3">
					    </div>
								<div className="col-xs-3 col-md-3 ">
									<button onClick={this.getGames.bind(this)}  className="btn">Ver Partidos</button>
								</div>
								<div className="col-xs-3 col-md-3 ">
								<button onClick={this.mispollitas.bind(this)} className="btn">Ver Mis Pollas</button>
							</div>


					    <div className="col-xs-3 col-md-3">
					    </div>
					  </div>
					</div>




					<div> {this.state&&this.state.fixtures&&this.state.fixtures.map(fixture => {
					  return <Fixture fixture={fixture} key={fixture.homeTeamName} name={this.state.nombre}/>
					                     })}
					      </div>


								<div> {this.state&&this.state.mispollas&&this.state.mispollas.map(mipolla => {
									return <MisPollas mipolla={mipolla} key={mipolla._id} />
																		 })}
											</div>


				</div>
			</div>

				);
  }

  }
}


App.propTypes = {
}


export default AppContainer = createContainer(()=>{
  Meteor.subscribe("usuarios");


	return {

	};
}, App);
