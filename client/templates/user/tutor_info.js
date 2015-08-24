Template.tutorInfo.helpers({
	tutorPost: function(){
    var tutorInfo = Tutors.find({"userId": Meteor.userId()});
    if (tutorInfo.count() === 0)
      return false;
    else{
      tutorInfo = tutorInfo.fetch();
      _.each(tutorInfo, function(value, key){
        value.index = key+1;
      });
      return tutorInfo;
    }
  }
})