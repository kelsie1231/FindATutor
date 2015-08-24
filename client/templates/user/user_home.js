var WIDTH = "currentWindowWidth";
var TAB_CLICK = "navTabClick";
var SIDE_CLICK = "navSidebarClick";

Template.userHome.onCreated(function(){
  Session.set("resize", null);
  Session.set(WIDTH,$(window).width());
  Session.set(TAB_CLICK, "tutorPost");
  Session.set(SIDE_CLICK, "account");
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

  clickAccount: function(){
    return Session.get(SIDE_CLICK) === "account";
  }
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
  },

  'click #account': function(event){
    event.preventDefault();
    $(event.target).tab("show");
    Session.set(SIDE_CLICK, "account");
  },

  'click #posts': function(event){
    event.preventDefault();
    $(event.target).tab("show");
    Session.set(SIDE_CLICK, "posts");
  },

  'mouseenter .course-display': function(event) {
    event.preventDefault();
    $(event.target).find('.course-panel').fadeIn(300);
  },

  'mouseleave .course-display': function(event) {
    event.preventDefault();
    $(event.target).find(".course-panel").fadeOut(300);
  },

});