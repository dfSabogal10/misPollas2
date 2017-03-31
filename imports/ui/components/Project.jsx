import React, {Component, PropTypes} from "react";
import {Meteor} from "meteor/meteor";
import {Projects} from "../../api/Projects.js"



export default class Project extends Component {

votarPorProyecto(){
	Meteor.call("Projects.votarPorProyecto",this.props.project._id);
}
añadirAFavoritos(){
	Meteor.call("Projects.añadirAFavoritos",this.props.project._id);
}
	render() {
		if (!this.props.project) {
			return (<div>Loading!</div>);
		}

		return (
			<div className="row">
				<br></br>
				<div>{this.props.project.Nombres}</div>
				<div>{this.props.project.Apellidos}</div>
				<a href={this.props.project["Repositorio de github"]}>{this.props.project["Repositorio de github"]}</a>
				<div>Votes: {this.props.project.votes}</div>
				<div>
					<button type="button" className="btn btn-primary" onClick={this.votarPorProyecto.bind(this)	} >Vote!</button>
					<button type="button" className="btn btn-primary" onClick={this.añadirAFavoritos.bind(this)	} >Add to favourites</button>
				</div>
				<br></br>

			</div>
		);
	}
}



Project.propTypes = {
	project: PropTypes.object.isRequired
}
