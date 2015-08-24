Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

//Delete old errors from collection
Template.error.onRendered(function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 3000);
});



Template.successes.helpers({
  successes: function() {
    return Successes.find();
  }
});

//Delete old successes from collection
Template.success.onRendered(function() {
  var success = this.data;
  Meteor.setTimeout(function () {
    Successes.remove(success._id);
  }, 3000);
});