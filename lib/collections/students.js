Students = new Mongo.Collection('students');


Students.allow({

  remove: function(userId, student) {
    return student && student.userId === userId; 
  }
});


Meteor.methods({

  // insert student info into students collection
  studentInfoInsert: function (studentInfo, courseInfo, errors){

    check(Meteor.userId(), String);

    // console.log(errors);
    if (!isEmpty(errors))
      throw new Meteor.Error('invalid-student', "Please check the fields that are marked as red");

    var user = Meteor.user();

    var student = _.extend(studentInfo, {
      userId: user._id,
      name:   studentInfo.name,
      sex:    studentInfo.sex,
      school: studentInfo.school,
      level:  studentInfo.level,
      year:  studentInfo.year,
      major: studentInfo.major,
      email: studentInfo.email,
      phone: studentInfo.phone,
      course: courseInfo,
      salary: studentInfo.salary,
      hour: studentInfo.hour,
      comment: studentInfo.comment,
      submitted: new Date()
    });

    var studentId = Students.insert(student);

    return {
      _id: studentId
    };
  },

  // edit student info in the students collection
  studentInfoEdit: function (infoId, infoUserId, studentInfo, courseInfo, errors){

    if(Meteor.userId() !== infoUserId)
      throw new Meteor.Error('access-denied', "You don't have permission to edit this tutoring info");

    check(Meteor.userId(), String);

    console.log(errors);
    if (!isEmpty(errors))
      throw new Meteor.Error('invalid-student', "Please check the fields that are marked as red");

    var student = _.extend(studentInfo, {
      name:    studentInfo.name,
      sex:     studentInfo.sex,
      currentSchool: studentInfo.currentSchool,
      level:    studentInfo.level,
      year: studentInfo.year,
      major: studentInfo.major,
      email: studentInfo.email,
      phone: studentInfo.phone,
      course: courseInfo,
      salary: studentInfo.salary,
      hour: studentInfo.hour,
      comment: studentInfo.comment,
      // editTime: new Date()
    });

    Students.update(infoId, {$set: student}, function(error){
      if(error)
        throw new Meteor.Error('edit-fail', error.reason);
    });
  }
});


//check if the user fill in all the blanks
validateStudent = function(studentInfo){
  var errors = {};

  if (!studentInfo.name) {
    errors.name = 'Please fill in your name';
  }
  if (!studentInfo.sex) {
    errors.sex = 'Please select either male or female.';
  }

  if (!studentInfo.school) {
    errors.currentSchool = 'Please fill in your school.';
  }

  if (!studentInfo.major) {
    errors.major = 'Please fill in your major.';
  }

  if (!studentInfo.email) {
    errors.email = 'Please fill in your email.';
  }

  if (!studentInfo.phone) {
    errors.phone = 'Please fill in your phone.';
  }

  if (!studentInfo.salary) {
    errors.salary = 'Please fill in the salary that you are willing to pay.';
  } else if (isNaN(studentInfo.salary)) {
    errors.salary = 'Please enter a number.'
  }

  if (!studentInfo.hour) {
    errors.hour = 'Please fill in the hours that you would need help per week.';
  } else if (isNaN(studentInfo.hour)) {
    errors.hour = 'Please enter a number (or select the other option).'
  }

  return errors;
}

//check if the user fill in all the course info
validateStudentCourseInfo = function(courseInfo){
  var errors = {};

  $.each(courseInfo, function(key,value){ //loop through the array

      errors['#student-course-number'+value.order] = value.courseNumber ? false:true;
      errors['#student-course-title'+value.order] = value.courseTitle ? false:true;
  });
  return errors;
}


