import React, {Component, PropTypes} from "react";
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";

export default class MisPollas extends Component {




    render(){



      return (
                <table className="fixes">
                <thead>
                 <tr>
                     <th>Equipo Local</th>
                     <th>Goles</th>
                     <th>Equipo Visitante</th>

                     <th>Goles</th>

                 </tr>
             </thead>
             <tbody>
                 <tr>
                     <td>{this.props.mipolla.equipolocal} </td>
                     <td>{this.props.mipolla.local} </td>
                     <td>{this.props.mipolla.equipovisitante} </td>

                     <td>{this.props.mipolla.visitante} </td>



                 </tr>

             </tbody>

          </table>
          );
        }










    }
