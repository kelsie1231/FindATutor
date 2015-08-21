var ERRORS = "tutorEditErrors";
var STUDENT = "studentCheck";
var COURSE = "numberOfCourse";
var COURSENO = "actualNumberOfCourse";
var COURSE_ERROR = "courseInfoError";

Template.tutorEdit.onCreated(function() {
  Session.set(ERRORS, {});
  console.log(Template.currentData());
  Session.set(COURSE_ERROR, {});
});

Template.tutorEdit.onRendered(function() {
  console.log(Template.currentData());
  Session.set(STUDENT,{'bool':Template.currentData().studentCheck});
  Session.set(COURSE, Template.currentData().course.length);
  Session.set(COURSENO, Template.currentData().course.length);
});

Template.tutorEdit.helpers({
  errorMessage: function(field) { //error message itself
    return Session.get(ERRORS)[field];
  },
  errorClass: function (field) { //check if error message exists
    return !!Session.get(ERRORS)[field] ? 'has-error' : '';
  },
  checkIs: function(check) {
    return check === Session.get(STUDENT).bool;
  },
  equals: function(check1, check2) {
    return check1 === check2;
  },
  courseInfo: function(context) {
    var result = [];
    _.each(context, function(value, key,list){
      result.push({
        key:key+1, 
        courseNumber:value.courseNumber, 
        courseTitle:value.courseTitle
      });
    });
    return result;
  },
});

Template.tutorEdit.events({
  'submit form': function(event) {
    event.preventDefault();

    var tutorInfo = {
      name: $('#tutor-edit-name').val(),
      sex: $("input[name='sex']:checked").val(),
      studentCheck: $("input[name='studentCheck']:checked").val(),
      currentSchool: $('#tutor-edit-school').val(),
      level: $('#select-level option:selected').text(),
      year: $('#select-year option:selected').text(),
      pastSchool: $('#tutor-edit-past-school').val(),
      graduateYear: $('#tutor-edit-graduate-year').val(),
      major: $('#tutor-edit-major').val(),
      email: $('#tutor-edit-email').val(),
      phone: $('#tutor-edit-phone').val(),
      salary: $('#tutor-edit-salary').val(),
      workload: $("input[name='workload']:checked").val(),
      hour: $('#tutor-edit-hour').val(),
      comment: $('#tutor-edit-comment').val()
    };
    // console.log(tutorInfo);

    var courseInfo = [];
    var courseInfo2 = [];
    $('.courses').each(function(){
      var order = $(this).attr("id").substring(11);
      courseInfo.push({
        order: order,
        courseNumber: $('#tutor-course-number-edit'+order).val(),
        courseTitle: $('#tutor-course-title-edit'+order).val()
      });
      courseInfo2.push({
        courseNumber: $('#tutor-course-number-edit'+order).val(),
        courseTitle: $('#tutor-course-title-edit'+order).val()
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

    // console.log(courseErrors);
    // console.log(errors);

    var infoId = this._id;
    var infoUserId = this.userId;
    Meteor.call('tutorInfoEdit', infoId, infoUserId, tutorInfo, courseInfo2, errors, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }

      Router.go('tutorDetail', {_id: infoId});
    });

  },


  'click .studentCheck-edit': function(event){
    var check = {};
    check.bool = event.currentTarget.value;
    Session.set(STUDENT, check);
  },

  'click #tutor-edit-hour': function(event){
    $("input[type='radio'][name='workload'][value='number']").prop("checked",true);
  },


  'click #add-icon': function(event){
    event.preventDefault();
    var number = Session.get(COURSE)+1;

    
    var text = '<div class="row courses" id="course-edit'+number+'">'
          +'<div class="col-sm-3 col-xs-9">'
          +'  <input type="text" class="form-control" id="tutor-course-number-edit'+number+'" placeholder="i.e. Math109">'
          +'</div>'
          +'<div class="col-sm-1 col-xs-3" id="direct-icon">'
          +'  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'
          +'</div>'
          +'<div class="controls col-sm-7 col-xs-11">'
          +'  <input type="text" class="form-control" id="tutor-course-title-edit'+number+'" placeholder="i.e. Mathematical Reasoning">'
          +'</div>'
          +'<div class="col-sm-1 col-xs-1 delete-icon">'
          +'  <a href="#" id="delete-edit'+number+'" class="delete-course"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>'
          +'</div>'
        +'</div>';
    $('#add-icon').before(text);
    Session.set(COURSE, number);
    Session.set(COURSENO,Session.get(COURSENO)+1);
  },

  'click .delete-course': function(event){
    event.preventDefault();
    if (Session.get(COURSENO) === 1){
      throwError("Please keep at least one course that you want to tutor for");
      return;
    }
    var id = $(event.currentTarget).attr('id');
    var number = id.substring(11);
    $('#course-edit'+number).remove();
    Session.set(COURSENO,Session.get(COURSENO)-1);
  }
});
