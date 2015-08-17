Router.configure({
  layoutTemplate: 'layout',

  loadingTemplate: 'loading',

  //show 404 error message
  notFoundTemplate: 'notFound',

});

Router.route('/', {name: 'home'});

Router.route('/register', {name: 'register'});


Router.route('/test', {name: 'modal'});