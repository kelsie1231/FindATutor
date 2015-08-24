Meteor.subscribe('tutors');

Template.tutorListContent.helpers({
  //sorted by time
  tutors: function() {
    var tutors = Tutors.find({}, {sort: {submitted: 1}}).fetch();
    _.each(tutors, function(value, key){
      value.index = key+1;
    });
    return tutors;
  }
});
