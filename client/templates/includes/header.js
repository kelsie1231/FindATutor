Template.header.helpers({
	activeClass: function(field) {
		if(field === Router.current().route.path(this))
            return 'active';
        else
    		return '';
	},
	username: function(){
		return Meteor.user().username;
	}
});

Template.header.events({
	'click #logout': function (event, template) {
		event.preventDefault();
		Meteor.logout();
		Router.go('home');
		return false;
	}
});