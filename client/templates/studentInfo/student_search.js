var NOT_FOUND = "searchNotFound";
var TYPE = "searchType";

Template.studentSearch.onCreated(function(){
  Session.set(NOT_FOUND, null);
  Session.set(TYPE, null);
});


Template.studentSearch.helpers({
  exist: function(type){
    return (type === "exactSearch" || type === "vagueSearch");
  },

	students: function(value, type){
    if(type === "exactSearch") {
      var regex = new RegExp(["^", value, "$"].join(""), "i");
      var results = Students.find({ $or:[{"course.courseNumber":regex}, {"course.courseTitle": regex}] });
      if(results.count() !== 0){
        Session.set(NOT_FOUND, null);
        results = results.fetch();
        _.each(results, function(value, key){
          value.index = key+1;
        });
        return results;
      }
      else{
        Session.set(NOT_FOUND, value);
        Session.set(TYPE, type);
        return;
      }
    }

    else if(type === "vagueSearch") {
      var strings = value.split(" ");
      // console.log(strings);
      var regex = [];
      _.each(strings,function(val, index){
        regex.push(new RegExp([val].join(""), "i"));
      });
      
      var results = Students.find({ $or:[{"course.courseNumber":{$in:regex} }, {"course.courseTitle": {$in:regex} }] });
      if(results.count() !== 0){
        Session.set(NOT_FOUND, null);
        results = results.fetch();
        _.each(results, function(value, key){
          value.index = key+1;
        });
        return results;
      }
      else{
        Session.set(NOT_FOUND, value);
        Session.set(TYPE, type);
        return;
      }
    }
	},

  notFound: function(){
    return Session.get(NOT_FOUND);
  },

  isExact: function(){
    return Session.get(TYPE) === "exactSearch";
  },
  allStudents: function(){
    var students = Students.find({}, {sort: {submitted: 1}}).fetch();
    _.each(students, function(value, key){
      value.index = key+1;
    });
    return students;
  }
});


Template.studentSearch.events({
  'click #changeSearch': function(event){
    event.preventDefault();
    Router.go('/studentSearch/vagueSearch/'+this.value);
  }
});