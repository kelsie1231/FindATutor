var ERRORS = "loginErrors";

Template.login.onCreated(function() {
  Session.set(ERRORS, {});
});

Template.login.helpers({
  errorMessage: function(field) { //error message itself
    return Session.get(ERRORS)[field];
  },
  errorClass: function (field) { //check if error message exists
    return !!Session.get(ERRORS)[field] ? 'has-error' : '';
  }
});

Template.login.events({
  'submit': function(event, template){

    event.preventDefault();

    // Get the email and password from the login template
    var user = {
      username: template.$('[id=login-username]').val(),
      password: template.$('[id=login-password]').val()
    };

    //check if the field has any problem
    var errors = validateLoginUser(user);
    if(!isEmpty(errors))
      return Session.set(ERRORS, errors);

    //login use Meteor package
    Meteor.loginWithPassword(user.username, user.password, function (error){

      if(error){
        console.log(error);
        Session.set(ERRORS, {'username':' ', 'password':' '});
        throwError(error.reason);
      }
      else{
        //successfully login, close the login form
        $('#overlay').fadeOut(200);
        $('#loginform').css({'display':'none'});

        Router.go('/');
      }

    });

    // Return false to prevent a browser refresh
    return false;

  }

});