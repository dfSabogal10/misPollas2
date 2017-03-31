import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export const Pollas = new Mongo.Collection("pollas");
if (Meteor.isServer) {

  // This code only runs on the server
  Meteor.publish("pollas", function projectsPublication() {

    return Pollas.find();

  });
}
Meteor.methods({
"Pollas.agregarPolla"(pola){
  var polla = JSON.parse(pola)
    Pollas.insert({ "userName":polla.name ,
                   "local": polla.local,
                   "visitante": polla.visitante,
                   "equipolocal":polla.equipol,
                   "equipovisitante":polla.equipov
                   });
                   return "Agregado";


    // window.alert('You have been registered');
  },
  "Pollas.vermispollas"(usuario){
    this.unblock();

    var polla=Pollas.find({"userName":usuario}).fetch();
    console.log(polla)
    if (polla.length==0) {
      return "NO";
    }
    else {
      return polla;
    }


    }
  });
