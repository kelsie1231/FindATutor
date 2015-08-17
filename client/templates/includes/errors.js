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