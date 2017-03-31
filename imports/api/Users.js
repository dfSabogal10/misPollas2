import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";



export const Users = new Mongo.Collection("usuarios");
if (Meteor.isServer) {

  // This code only runs on the server
  Meteor.publish("usuarios", function projectsPublication() {

    return Users.find();

  });
}

Meteor.methods({
	"Users.buscarUsuario"(usuario){
    var user=Users.find({"userID":usuario.userID}).fetch();
    console.log(user);
		if (user.length==0) {
      Users.insert(usuario);
      user=Users.find({"userID":usuario.userID}).fetch();
      // window.alert('You have been registered');
		}
    else {
    {
//      window.alert('login succesful');
    }
    }
    return user;
	},

	// 'Projects.añadirAFavoritos'(pid){
	// 	if (! Meteor.userId()) {
  //     window.alert('You must login to add to favourites');
	// 		throw new Meteor.Error('not-authorized');
	// 	}
	// 	console.log("añadido");
	// 	Projects.update(
	// 	   { _id: pid },
	// 	   { $push: { FavouriteUsers: Meteor.userId() } }
	// 	);
	// },
});
