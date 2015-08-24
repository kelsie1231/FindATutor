Template.studentDetail.helpers({
    'time': function() {
        var time = Template.currentData().submitted;
        var month = time.getMonth() + 1;
        var returnTime = month + "/" + time.getDate() + "/" + time.getFullYear();
        return returnTime;
    },
    ownInfo: function(){
      return this.userId === Meteor.userId();
    }
});

Template.studentDetail.events({
    'click .deleteStudent': function(event){
        event.preventDefault();
        if(confirm("Are you sure to delete this student info message?")) {
            Students.remove(this._id);
            Router.go('studentList');
        }
    }
});
