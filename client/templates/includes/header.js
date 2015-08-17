Template.header.events({
	'click #logout': function (event, template) {
		event.preventDefault();
		Meteor.logout();
		Router.go('home');
		return false;
	}
});