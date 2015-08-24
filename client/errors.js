// Errors local (client only) collection
// only exist in current browser, this collection would not sync to the server
Errors = new Mongo.Collection(null);
Successes = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message});
};

throwSuccess = function(message) {
  Successes.insert({message: message});
}