Meteor.publish('tutors', function(){
	return Tutors.find();
});

Meteor.publish('students', function(){
	return Students.find();
});