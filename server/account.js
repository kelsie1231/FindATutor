Meteor.methods({

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
    Roles.addUsersToRoles(userId, [data.role]);
  }
});
