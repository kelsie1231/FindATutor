Meteor.subscribe('tutors');

$(document).ready(function(){

  // $(window).on("load", function(){
    console.log("tetest");
  // });

});

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