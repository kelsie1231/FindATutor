var ERRORS = "studentPostErrors";
var COURSE = "numberOfCourse";
var COURSENO = "actualNumberOfCourse";

Template.studentPost.onCreated(function() {
  Session.set(ERRORS, {});
  Session.set(COURSE, 1);
  Session.set(COURSENO, 1);
});

Template.studentPost.helpers({
  errorMessage: function(field) { //error message itself
    return Session.get(ERRORS)[field];
  },
  errorClass: function (field) { //check if error message exists
    return !!Session.get(ERRORS)[field] ? 'has-error' : '';
  },
  studentEmail: function() {
    return Meteor.user().emails[0].address;
  },
});

Template.studentPost.events({
  'submit form': function(event) {
    event.preventDefault();

    var studentInfo = {
      name: $('#student-name').val(),
      sex: $("input[name='sex']:checked").val(),
      school: $('#student-school').val(),
      level: $('#select-level option:selected').text(),
      year: $('#select-year option:selected').text(),
      major: $('#student-major').val(),
      email: $('#student-email').val(),
      phone: $('#student-phone').val(),
      salary: $('#student-salary').val(),
      hour: $('#student-hour').val(),
      comment: $('#student-comment').val()
    };
    
    var courseInfo = [];
    var courseInfo2 = [];
    $('.courses').each(function(){
      var order = $(this).attr("id").substring(6);
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
      // console.log(key+"--"+value);
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
    
    Meteor.call('studentInfoInsert', studentInfo, courseInfo2, errors, function(error, result) {
      if (error) {
        return throwError(error.reason);
      }

      Router.go('studentDetail', {_id: result._id});
    });

  },

  'click #add-icon': function(event){
    event.preventDefault();
    var number = Session.get(COURSE)+1;
    
    var text = '<div class="row courses" id="course'+number+'">'
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
      throwError("Please enter at least one course that you need help with");
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