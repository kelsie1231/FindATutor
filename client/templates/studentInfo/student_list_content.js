Meteor.subscribe('students');

Template.studentListContent.helpers({
  //sorted by time
  students: function() {
    var students = Students.find({}, {sort: {submitted: 1}}).fetch();
    _.each(students, function(value, key){
      value.index = key+1;
    });
    return students;
  }
});
