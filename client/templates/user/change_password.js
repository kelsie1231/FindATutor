var ERRORS = "errorsWhenChangingPW";
var CLICK = "clickChangePassword";

Template.changePassword.onCreated(function() {
  Session.set(ERRORS, {});
  Session.set(CLICK, false);
});

Template.changePassword.helpers({
  errorMessage: function(field) { //error message itself
    return Session.get(ERRORS)[field];
  },
  errorClass: function (field) { //check if error message exists
    return !!Session.get(ERRORS)[field] ? 'has-error' : '';
  },
  notClick: function(){
    return !Session.get(CLICK);
  }
});

Template.changePassword.events({
  'click #changeButton': function(event){
    event.preventDefault();
    Session.set(CLICK, true);
  },

  'submit': function(event){
    event.preventDefault();
    var passwords = {
      oldPassword: $('#old-password').val(),
      newPassword: $('#new-password').val(),
      re_NewPassword: $('#re-new-password').val()
    };
    
    var errors = validateChangePassword(passwords);
    if(!isEmpty(errors)){
      Session.set(ERRORS, errors);
      throwError("Please check the fields that are marked as red");
      return;
    }

    Accounts.changePassword(passwords.oldPassword, passwords.newPassword, function(err){
      if(err){
        throwError(err.reason);
      } else {
        throwSuccess("Password changed successfully");
        Session.set(CLICK, false);
      }
    });

    Session.set(ERRORS, {});
  }
});