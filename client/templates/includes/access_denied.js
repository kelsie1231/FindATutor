Template.accessDenied.helpers({
	username: function(){
		return Meteor.user().username;
	}
});