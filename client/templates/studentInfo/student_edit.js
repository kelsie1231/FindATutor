var ERRORS = "studentEditErrors";
var COURSE = "numberOfCourse";
var COURSENO = "actualNumberOfCourse";

Template.studentEdit.onCreated(function() {
  Session.set(ERRORS, {});
  console.log(Template.currentData());
});

Template.studentEdit.onRendered(function() {
  console.log(Template.currentData());
  Session.set(COURSE, Template.currentData().course.length);
  Session.set(COURSENO, Template.currentData().course.length);
});

Template.studentEdit.helpers({
  errorMessage: function(field) { //error message itself
    return Session.get(ERRORS)[field];
  },
  errorClass: function (field) { //check if error message exists
    return !!Session.get(ERRORS)[field] ? 'has-error' : '';
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

Template.studentEdit.events({
  'submit form': function(event) {
    event.preventDefault();

    var studentInfo = {
      name: $('#student-edit-name').val(),
      sex: $("input[name='sex']:checked").val(),
      school: $('#student-edit-school').val(),
      level: $('#select-level option:selected').text(),
      year: $('#select-year option:selected').text(),
      major: $('#student-edit-major').val(),
      email: $('#student-edit-email').val(),
      phone: $('#student-edit-phone').val(),
      salary: $('#student-edit-salary').val(),
      workload: $("input[name='workload']:checked").val(),
      hour: $('#student-edit-hour').val(),
      comment: $('#student-edit-comment').val()
    };
    // console.log(studentInfo);

    var courseInfo = [];
    var courseInfo2 = [];
    $('.courses').each(function(){
      var order = $(this).attr("id").substring(11);
      courseInfo.push({
        order: order,
        courseNumber: $('#student-course-number'+order).val(),
        courseTitle: $('#student-course-title'+order).val()
      });
      courseInfo2.push({
        courseNumber: $('#student-course-number'+order).val(),
        courseTitle: $('#student-course-title'+order).val()
      });
    });

    //check if the student misses anything
    var errors = validateStudent(studentInfo); //lib/student.js

    var courseErrors = validateStudentCourseInfo(courseInfo);
    var hasCourseError = false;

    _.each(courseErrors,function(value, key){
      if(value){
        $(key).parent().addClass("has-error");
        hasCourseError = true;
      } else {
        $(key).parent().removeClass("has-error");
      }
    });
    if(hasCourseError){
      errors.course = "Please fill in all the blanks (or delete the blank one).";
    }

    Session.set(ERRORS, errors);

    var infoId = this._id;
    var infoUserId = this.userId;
    Meteor.call('studentInfoEdit', infoId, infoUserId, studentInfo, courseInfo2, errors, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }

      Router.go('studentDetail', {_id: infoId});
    });

  },

  'click #add-icon': function(event){
    event.preventDefault();
    var number = Session.get(COURSE)+1;

    
    var text = '<div class="row courses" id="course-edit'+number+'">'
          +'<div class="col-sm-3 col-xs-9">'
          +'  <input type="text" class="form-control" id="student-course-number'+number+'" placeholder="i.e. Math109">'
          +'</div>'
          +'<div class="col-sm-1 col-xs-3" id="direct-icon">'
          +'  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'
          +'</div>'
          +'<div class="controls col-sm-7 col-xs-11">'
          +'  <input type="text" class="form-control" id="student-course-title'+number+'" placeholder="i.e. Mathematical Reasoning">'
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
      throwError("Please enter at least one course that you need help with");
      return;
    }
    var id = $(event.currentTarget).attr('id');
    var number = id.substring(11);
    $('#course-edit'+number).remove();
    Session.set(COURSENO,Session.get(COURSENO)-1);
  }
});
