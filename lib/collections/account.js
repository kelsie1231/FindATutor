
validateRegisteredUser = function(data){
  var errors = {};

  if (!data.role) {
    errors.role = 'Please select to register as either student or tutor';
  }
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

isEmpty = function(obj) {
  for(var o in obj){
    return false;
  }
  return true;
}