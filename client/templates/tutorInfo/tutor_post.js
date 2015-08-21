var ERRORS = "tutorPostErrors";
var STUDENT = "studentCheck";
var COURSE = "numberOfCourse";
var COURSENO = "actualNumberOfCourse";
var COURSE_ERROR = "courseInfoError";

Template.tutorPost.onCreated(function() {
  Session.set(ERRORS, {});
  Session.set(STUDENT,{'bool':'yes'});
  Session.set(COURSE, 1);
  Session.set(COURSENO, 1);
  Session.set(COURSE_ERROR, {});
});

Template.tutorPost.helpers({
  errorMessage: function(field) { //error message itself
    return Session.get(ERRORS)[field];
  },
  errorClass: function (field) { //check if error message exists
    return !!Session.get(ERRORS)[field] ? 'has-error' : '';
  },
  checkIs: function(check) {
    return check === Session.get(STUDENT).bool;
  },
  tutorEmail: function() {
    return Meteor.user().emails[0].address;
  },
  courseErrorClass: function (field) { //check if error message for course exists
    return !!Session.get(COURSE_ERROR)[field] ? 'has-error' : '';
  },
});

Template.tutorPost.events({
  'submit form': function(event) {
    event.preventDefault();

    var tutorInfo = {
      name: $('#tutor-name').val(),
      sex: $("input[name='sex']:checked").val(),
      studentCheck: $("input[name='studentCheck']:checked").val(),
      currentSchool: $('#tutor-school').val(),
      level: $('#select-level option:selected').text(),
      year: $('#select-year option:selected').text(),
      pastSchool: $('#tutor-past-school').val(),
      graduateYear: $('#tutor-graduate-year').val(),
      major: $('#tutor-major').val(),
      email: $('#tutor-email').val(),
      phone: $('#tutor-phone').val(),
      salary: $('#tutor-salary').val(),
      workload: $("input[name='workload']:checked").val(),
      hour: $('#tutor-hour').val(),
      comment: $('#tutor-comment').val()
    };
    
    var courseInfo = [];
    var courseInfo2 = [];
    $('.courses').each(function(){
      var order = $(this).attr("id").substring(6);
      courseInfo.push({
        order: order,
        courseNumber: $('#tutor-course-number'+order).val(),
        courseTitle: $('#tutor-course-title'+order).val()
      });
      courseInfo2.push({
        courseNumber: $('#tutor-course-number'+order).val(),
        courseTitle: $('#tutor-course-title'+order).val()
      });
    });

    //check if the tutor misses anything
    var errors = validateTutor(tutorInfo); //lib/tutor.js

    var courseErrors = validateCourseInfo(courseInfo);
    if(!isEmpty(courseErrors)){
      Session.set(COURSE_ERROR, courseErrors);
      errors.course = "Please fill in all the blanks (or delete the blank one).";
    }

    Session.set(ERRORS, errors);


    Meteor.call('tutorInfoInsert', tutorInfo, courseInfo2, errors, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }

      Router.go('tutorDetail', {_id: result._id});
    });

  },

  'click .studentCheck': function(event){
    var check = {};
    check.bool = event.currentTarget.value;
    // console.log(check.bool);
    Session.set(STUDENT, check)
  },

  'click #tutor-hour': function(event){
    $("input[type='radio'][name='workload'][value='number']").prop("checked",true);
  },

  'click #add-icon': function(event){
    event.preventDefault();
    var number = Session.get(COURSE)+1;
    
    var text = '<div class="row courses" id="course'+number+'">'
          +'<div class="col-sm-3 col-xs-9 {{courseErrorClass \'courseNumber'+number+'\'}}">'
          +'  <input type="text" class="form-control" id="tutor-course-number'+number+'" placeholder="i.e. Math109">'
          +'</div>'
          +'<div class="col-sm-1 col-xs-3" id="direct-icon">'
          +'  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'
          +'</div>'
          +'<div class="controls col-sm-7 col-xs-11 {{courseErrorClass \'courseTitle'+number+'\'}}">'
          +'  <input type="text" class="form-control" id="tutor-course-title'+number+'" placeholder="i.e. Mathematical Reasoning">'
          +'</div>'
          +'<div class="col-sm-1 col-xs-1 delete-icon">'
          +'  <a href="#" id="delete'+number+'" class="delete-course"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>'
          +'</div>'
        +'</div>';
    $('#add-icon').before(text);
    Session.set(COURSE, number);
    Session.set(COURSENO,Session.get(COURSENO)+1);
  },

  'click .delete-course': function(event){
    event.preventDefault();
    if (Session.get(COURSENO) === 1){
      throwError("Please enter at least one course that you want to tutor for");
      return;
    }
    var id = $(event.currentTarget).attr('id');
    var number = id.substring(6);
    // console.log(number);
    $('#course'+number).remove();
    Session.set(COURSENO,Session.get(COURSENO)-1);
    // console.log(Session.get(COURSENO));
  }
  
});