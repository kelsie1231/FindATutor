Meteor.publish('tutors', function(){
	return Tutors.find();
});