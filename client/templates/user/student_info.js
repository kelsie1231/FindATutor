Template.studentInfo.helpers({
	studentPost: function(){
    var studentInfo = Students.find({"userId": Meteor.userId()});
    if (studentInfo.count() === 0)
      return false;
    else
      return studentInfo;
  },
});