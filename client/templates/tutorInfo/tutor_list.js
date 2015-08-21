Meteor.subscribe('tutors');

Template.tutorList.helpers({
  //sorted by time
  tutors: function() {
    return Tutors.find({}, {sort: {submitted: 1}});
  },
  ownInfo: function(){
  	return this.userId === Meteor.userId();
  }
});

Template.tutorList.events({
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

	'click .deleteTutor': function(event){
        event.preventDefault();
        if(confirm("Are you sure to delete this tutoring message?")) {
            Tutors.remove(this._id);
            Router.go('tutorList');
        }
    },

    'click #loginToSee': function(event) {
    	event.preventDefault();
    	$('#loginform').modal('show');
    }
});