Template.studentListHeader.helpers({
    inList: function(){
      return Router.current().route.path(this) === '/studentList';
    }
});


Template.studentListHeader.events({
  'click #post-student-info':function(events) {

		event.preventDefault();

		//if user does not login, ask to login
		if(!Meteor.user()){
			throwError("Please login first");
			$('#loginform').modal('show');
			return;
		}

		//else go to post student info page
		Router.go('/studentPost');
	},

  'click #exact-search': function(event) {
    event.preventDefault();
    var searchValue = $('[name=search]').val();
    
    if(searchValue)
      Router.go('/studentSearch/exactSearch/' + searchValue);
    else{
      throwError("You didn't enter anything for search, listing all students...");
      Router.go('/studentList');
    }
  },
  'click #vague-search': function(event) {
    event.preventDefault();
    var searchValue = $('[name=search]').val();
    if(searchValue)
      Router.go('/studentSearch/vagueSearch/' + searchValue);
    else{
      throwError("You didn't enter anything for search, listing all students...");
      Router.go('/studentList');
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