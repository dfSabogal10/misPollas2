import {Mongo} from "meteor/mongo";

export const Projects = new Mongo.Collection("projects");
if (Meteor.isServer) {

  // This code only runs on the server
  Meteor.publish('projects', function projectsPublication() {

    return Projects.find();

  });
}
Meteor.methods({
	'Projects.votarPorProyecto'(pid){
		if (! Meteor.userId()) {
      		window.alert('You must login to vote');
			throw new Meteor.Error('not-authorized');
		}
		console.log("voto");
		Projects.update({_id:pid}, { $inc: { votes: 1,}} );
	},
	'Projects.añadirAFavoritos'(pid){
		if (! Meteor.userId()) {
     		 window.alert('You must login to add to favourites');
			throw new Meteor.Error('not-authorized');
		}
		console.log("añadido");
		Projects.update(
		   { _id: pid },
		   { $push: { FavouriteUsers: Meteor.userId() } }
		);
	},
});
