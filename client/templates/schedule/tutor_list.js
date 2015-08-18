Meteor.subscribe('tutors');

Template.tutorList.helpers({
  //sorted by time
  tutors: function() {
    return Tutors.find({}, {sort: {submitted: -1}});
  }
});