Template.tutorListHeader.helpers({
    inList: function(){
      return Router.current().route.path(this) === '/tutorList';
    }
});


Template.tutorListHeader.events({
  'click #post-tutor-info':function(events) {

		event.preventDefault();

		//if user does not login, ask to login
		if(!Meteor.user()){
			throwError("Please login first");
			$('#loginform').modal('show');
			return;
		}
		console.log(Router.current().route.path(this));

		//else go to post tutor info page
		Router.go('/tutorPost');
	},

  'submit #tutor-search': function(event) {
    event.preventDefault();
    Router.go('/tutorSearch/' + $('[name=search]').val());
  },
});