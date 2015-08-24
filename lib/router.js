Router.configure({
  layoutTemplate: 'layout',

  loadingTemplate: 'loading',

  //show 404 error message
  notFoundTemplate: 'notFound',

});

Router.route('/', {name: 'home'});

Router.route('/register', {name: 'register'});

Router.route('/tutorList', {name: 'tutorList'});

//route for tutorview
Router.route('/tutor/:_id', {
  name: 'tutorDetail',
  data: function() { return Tutors.findOne(this.params._id); }
});

//route for tutor post
Router.route('/tutorPost', {name: 'tutorPost'});

//route for tutor edit
Router.route('/tutor/:_id/edit', {
  name: 'tutorEdit',
  data: function() { return Tutors.findOne(this.params._id); }
});

// route for user homepage
Router.route('/homepage/:username', {
  name: 'userHome',
  data: function() { return Meteor.users.findOne({"username":this.params.username}); }
});

Router.route('/tutorSearch/:type/:value', {
  name: 'tutorSearch',
  // var single = this.params.value.split(' ');
  // data: function() { return Tutors.find({$or:[{"course.courseNumber": this.params.value}, {"course.courseTitle": /this.params.value.split(' ')/i}] }); }
  // Tutors.find({"course.courseNumber": "Econ 196", "course.courseTitle": "Econ 196"}) both
  // Tutors.find({$or:[{"course.courseNumber": "Econ 196"}, {"course.courseTitle": "test"}]}) either
  // Tutors.find({"course.courseNumber": {$in:[/math/i,"test"]}}) //vague
  data: function() { return {type: this.params.type, "value":this.params.value} }
  // data: function() { return Tutors.find({"course.courseNumber": {$in:[/math/i,"test"]}}) }
});



Router.route('/studentList', {name: 'studentList'});

//route for studentview
Router.route('/student/:_id', {
  name: 'studentDetail',
  data: function() { return Students.findOne(this.params._id); }
});

//route for student post
Router.route('/studentPost', {name: 'studentPost'});

//route for student edit
Router.route('/student/:_id/edit', {
  name: 'studentEdit',
  data: function() { return Students.findOne(this.params._id); }
});

Router.route('/studentSearch/:type/:value', {
  name: 'studentSearch',
  data: function() { return {type: this.params.type, "value":this.params.value} }
});




//deal with http://localhost:3000/tutor/random is a valid address problem
Router.onBeforeAction('dataNotFound', {only: ['tutorDetail', 'studentDetail']});

//route hook to deal with some pages that need to be login
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDeniedLogin');
    }
  } else {
    this.next();
  }
}
Router.onBeforeAction(requireLogin, {only: ['tutorPost', 'tutorDetail', 'studentPost', 'studentDetail']});

//prevent user from getting into other users' homepage
var sameUser = function(){
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDeniedLogin');
    }
  } else {
    // console.log(this.url);
    var urlUser = this.url.substring(10);
    if (Meteor.user().username === urlUser){
      this.next();
    } else {
      this.render('accessDenied');
    }
  }
}
Router.onBeforeAction(sameUser, {only: 'userHome'});
