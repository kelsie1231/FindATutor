var WIDTH = "currentWindowWidth";
var TAB_CLICK = "navTabClick";

Template.userHome.onCreated(function(){
  Session.set("resize", null);
  Session.set(WIDTH,$(window).width());
  Session.set(TAB_CLICK, "tutorPost");
});

Meteor.startup(function () {
  window.addEventListener('resize', function(){
    Session.set("resize", new Date());
  });
});


Template.userHome.helpers({
  resized: function(){
    var width = $(window).width();
    // console.log(width);

    Session.set(WIDTH, width);

    return Session.get('resize');
  },

  largeWindow: function(){
   // console.log($(window).width());
   return Session.get(WIDTH)>1000;
  },

  clickTutorPost: function(){
    return Session.get(TAB_CLICK) === "tutorPost";
  },

  tutorPost: function(){
    var tutorInfo = Tutors.find({"userId": Meteor.userId()});
    if (tutorInfo.count() === 0)
      return false;
    else
      return tutorInfo;
  },

  studentPost: function(){
    var studentInfo = Students.find({"userId": Meteor.userId()});
    if (studentInfo.count() === 0)
      return false;
    else
      return studentInfo;
  },
});

Template.userHome.events({
  'click #tutorPost': function(event){
    event.preventDefault();
    $(event.target).tab("show");

    Session.set(TAB_CLICK, "tutorPost");
  },

  'click #studentPost': function(event){
    event.preventDefault();
    $(event.target).tab("show");

    Session.set(TAB_CLICK, "studentPost");
  }
});