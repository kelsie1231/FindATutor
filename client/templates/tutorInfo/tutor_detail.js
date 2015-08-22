Template.tutorDetail.helpers({
    'time': function() {
        var time = Template.currentData().submitted;
        var month = time.getMonth() + 1;
        var returnTime = month + "/" + time.getDate() + "/" + time.getFullYear();
        return returnTime;
    },
    ownInfo: function(){
      return this.userId === Meteor.userId();
    }
    // 'commentCheck': function() {
    //     return !isEmpty(Template.currentData().comment);
    // }
});

Template.tutorDetail.events({
    'click .deleteTutor': function(event){
        event.preventDefault();
        if(confirm("Are you sure to delete this tutoring message?")) {
            Tutors.remove(this._id);
            Router.go('tutorList');
        }
    }
});
