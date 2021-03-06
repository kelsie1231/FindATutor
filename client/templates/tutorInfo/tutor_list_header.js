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

  'click #exact-search': function(event) {
    event.preventDefault();
    var searchValue = $('[name=search]').val();
    // console.log(searchValue);
    if(searchValue)
      Router.go('/tutorSearch/exactSearch/' + searchValue);
    else{
      throwError("You didn't enter anything for search, listing all tutors...");
      Router.go('/tutorList');
    }
  },
  'click #vague-search': function(event) {
    event.preventDefault();
    var searchValue = $('[name=search]').val();
    if(searchValue)
      Router.go('/tutorSearch/vagueSearch/' + searchValue);
    else{
      throwError("You didn't enter anything for search, listing all tutors...");
      Router.go('/tutorList');
    }
  },
  'mouseenter .course-display': function(event) {
    event.preventDefault();
    $(event.target).find('.course-panel').fadeIn(300);
  },

  'mouseleave .course-display': function(event) {
    event.preventDefault();
    $(event.target).find(".course-panel").fadeOut(300);
  },
});