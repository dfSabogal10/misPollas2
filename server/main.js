import { Meteor } from 'meteor/meteor';

import {Projects} from '../imports/api/Projects'

import {Users} from "../imports/api/Users"
import {Pollas} from "../imports/api/Pollas"

import {HTTP} from 'meteor/http'

//José Felipe Quiroga: Aunque funcione como se encuentra ahora mismo, puede que sea mas util tener un modulo especificamente dedicado para llamados al api de football data.
//Estoy seria bueno en caso de que quisieran agregar mas funcionalidades que solamente puedan ser resueltas por este api. Sin embargo, si por ahora
//solo se necesita este, no veo problemas ni nada por el estilo.

Meteor.startup(() => {
Meteor.methods({
  getGame:function(day,month,year,day2,month2,year2)
    {
      this.unblock();
      var apiUrl = 'http://api.football-data.org/v1/competitions/440/fixtures?timeFrameStart='+year+'-'+month+'-'+day+'&timeFrameEnd='+year2+'-'+month2+'-'+day2
      return   Meteor.http.call("GET",apiUrl);
}
}
);
});
