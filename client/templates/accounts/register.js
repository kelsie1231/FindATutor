var ERRORS = "registerErrors";
// var REGISTER_TYPE = "registerType";

Template.register.onCreated(function() {
  Session.set(ERRORS, {});
  // Session.set(REGISTER_TYPE, {});
});

Template.register.helpers({
  errorMessage: function(field) { //error message itself
    return Session.get(ERRORS)[field];
  },
  errorClass: function (field) { //check if error message exists
    return !!Session.get(ERRORS)[field] ? 'has-error' : '';
  }
});

Template.register.events({
  'submit': function(event, template){

    event.preventDefault();

    // Get the email and password from the register template
    var user = {
      username:   template.$('[id=register-username]').val(),
      email:      template.$('[id=register-email]').val(),
      password:   template.$('[id=register-password]').val(),
      repassword: template.$('[id=register-password-repeat]').val(),
      // role:       Session.get(REGISTER_TYPE).type
    };

    //check if the field has any problem
    var errors = validateRegisterUser(user);
    Session.set(ERRORS, errors);

    Meteor.call("createAccout", user, function (error, result){

        if(error){
          console.log(error);
          if(error.reason === "Username already exists.") {
            errors.username = "Username already exists. Please choose another name.";
            Session.set(ERRORS, errors);
          } else if(error.reason === "Email already exists.") {
            errors.email = "Email already exists. Please choose another email address or login with this email.";
            Session.set(ERRORS, errors);
          } else {
            throwError(error.reason);
          }
        }
        else{
          //login use Meteor package
          Meteor.loginWithPassword(user.username, user.password, function (error){
            if(error){
              console.log(error);
              throwError(error.reason);
            }
          });
          Router.go('/');
        }

    });

    // Return false to prevent a browser refresh
    return false;

  },

  // 'click .registerType': function(event, template){
  //   Session.set(REGISTER_TYPE, {'type': event.currentTarget.value});
  // }

});