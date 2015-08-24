
Template.studentListContentItem.helpers({
  ownInfo: function(){
    return this.userId === Meteor.userId();
  }
});


Template.studentListContentItem.events({

	'click .deleteStudent': function(event){
        event.preventDefault();
        if(confirm("Are you sure to delete this student info message?")) {
            Students.remove(this._id);
            Router.go('studentList');
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