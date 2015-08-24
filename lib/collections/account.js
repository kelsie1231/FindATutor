Meteor.methods({

  //create user account using meteor's Account method
  createAccout: function (data){

    var errors = validateRegisterUser(data);

    if (!isEmpty(errors))
      throw new Meteor.Error('invalid-user', "Please check the fields that are marked as red");

    var userId =  Accounts.createUser({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    });

    // Set the role
    // Roles.addUsersToRoles(userId, [data.role]);
  }
});

//check if the user fill in all the blanks when register
validateRegisterUser = function(data){
  var errors = {};

  // if (!data.role) {
  //   errors.role = 'Please select to register as either student or tutor';
  // }
  if (!data.username) {
    errors.username = 'Please fill in your username.';
  }
  if (!data.email) {
    errors.email = 'Please fill in your email.';
  }
  if (!data.password) {
    errors.password = 'Please fill in your password.';
  }
  if (!data.repassword) {
    errors.repassword = 'Please repeat your password again.';
  }

  if (data.password.localeCompare(data.repassword) != 0) {
    errors.repassword = 'The repeated password does not match your original one';
  }
  return errors;
}

//check if the user fill in all the blanks when login
validateLoginUser = function(data){
  var errors = {};

  if (!data.username) {
    errors.username = 'Please fill in your username or email address.';
  }
  if (!data.password) {
    errors.password = 'Please fill in your password.';
  }
  return errors;
}

// check if an object is empty
isEmpty = function(obj) {
  for(var o in obj){
    return false;
  }
  return true;
}

validateChangePassword = function(passwords){
  var errors = {};

  if (!passwords.oldPassword) {
    errors.oldPassword = 'Please fill in your old password.';
  }
  if (!passwords.newPassword) {
    errors.newPassword = 'Please fill in your new password.';
  }
  if(!passwords.re_NewPassword) {
    errors.reNewPassword = 'Please re-enter your new password to confirm';
  }
  if (passwords.newPassword.localeCompare(passwords.re_NewPassword) != 0) {
    errors.reNewPassword = 'The repeated password does not match previous one';
  }
  if(passwords.oldPassword === passwords.newPassword) {
    errors.newPassword = 'Your new password is the same as your old one.';
  }
  return errors;
}