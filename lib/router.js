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
  data: function() { return Meteor.users.findOne(this.params.username); }
});

Router.route('/studentList', {name: 'studentList'});


//deal with http://localhost:3000/tutor/random is a valid address problem
Router.onBeforeAction('dataNotFound', {only: 'tutorDetail'});

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
Router.onBeforeAction(requireLogin, {only: ['tutorPost', 'tutorDetail']});

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
