Tutors = new Mongo.Collection('tutors');

Tutors.allow({

  remove: function(userId, tutor) {
    return tutor && tutor.userId === userId; 
  }
});


Meteor.methods({

  // insert tutor info into tutors collection
  tutorInfoInsert: function (tutorInfo, courseInfo, errors){

    check(Meteor.userId(), String);

    console.log(errors);
    if (!isEmpty(errors))
      throw new Meteor.Error('invalid-tutor', "Please check the fields that are marked as red");

    var user = Meteor.user();

    var tutor = _.extend(tutorInfo, {
      userId: user._id,
      name:    tutorInfo.name,
      sex:     tutorInfo.sex,
      studentCheck: tutorInfo.studentCheck,
      currentSchool: tutorInfo.currentSchool,
      level:    tutorInfo.level,
      year: tutorInfo.year,
      pastSchool: tutorInfo.pastSchool,
      graduateYear: tutorInfo.graduateYear,
      major: tutorInfo.major,
      email: tutorInfo.email,
      phone: tutorInfo.phone,
      course: courseInfo,
      salary: tutorInfo.salary,
      workload: tutorInfo.workload,
      hour: tutorInfo.hour,
      comment: tutorInfo.comment,
      submitted: new Date()
    });

    var tutorId = Tutors.insert(tutor);

    return {
      _id: tutorId
    };
  },

  // edit tutor info in the tutors collection
  tutorInfoEdit: function (infoId, infoUserId, tutorInfo, courseInfo, errors){

    check(Meteor.userId(), String);

    if(Meteor.userId() !== infoUserId)
      throw new Meteor.Error('access-denied', "You don't have permission to edit this tutoring info");

    console.log(errors);
    if (!isEmpty(errors))
      throw new Meteor.Error('invalid-tutor', "Please check the fields that are marked as red");

    var tutor = _.extend(tutorInfo, {
      name:    tutorInfo.name,
      sex:     tutorInfo.sex,
      studentCheck: tutorInfo.studentCheck,
      currentSchool: tutorInfo.currentSchool,
      level:    tutorInfo.level,
      year: tutorInfo.year,
      pastSchool: tutorInfo.pastSchool,
      graduateYear: tutorInfo.graduateYear,
      major: tutorInfo.major,
      email: tutorInfo.email,
      phone: tutorInfo.phone,
      course: courseInfo,
      salary: tutorInfo.salary,
      workload: tutorInfo.workload,
      hour: tutorInfo.hour,
      comment: tutorInfo.comment,
      // editTime: new Date()
    });

    Tutors.update(infoId, {$set: tutor}, function(error){
      if(error)
        throw new Meteor.Error('edit-fail', error.reason);
    });

  }
});

//check if the user fill in all the blanks
validateTutor = function(tutorInfo){
  var errors = {};

  if (!tutorInfo.name) {
    errors.name = 'Please fill in your name';
  }
  if (!tutorInfo.sex) {
    errors.sex = 'Please select either male or female.';
  }
  if (!tutorInfo.studentCheck) {
    errors.email = 'Please answer either yes or no.';
  }

  if (tutorInfo.studentCheck === "yes") {
    if (!tutorInfo.currentSchool) {
      errors.currentSchool = 'Please fill in your school.';
    }
  } else if (tutorInfo.studentCheck === "no") {
    if (!tutorInfo.pastSchool) {
      errors.pastSchool = 'Please fill in your school.';
    }
    if (!tutorInfo.graduateYear) {
      errors.graduateYear = 'Please fill in your year of graduation.';
    }
  }

  if (!tutorInfo.major) {
    errors.major = 'Please fill in your major.';
  }

  if (!tutorInfo.email) {
    errors.email = 'Please fill in your email.';
  }

  if (!tutorInfo.phone) {
    errors.phone = 'Please fill in your phone.';
  }

  if (!tutorInfo.salary) {
    errors.salary = 'Please fill in your expected salary.';
  } else if (isNaN(tutorInfo.salary)) {
    errors.salary = 'Please enter a number.'
  }

  if(!tutorInfo.workload){
    errors.workload = 'Please either enter a number or select to "no restriction".';
  } else if(tutorInfo.workload === "number"){

    if (!tutorInfo.hour) {
      errors.hour = 'Please fill in the maximum hours to work per week.';
    } else if (isNaN(tutorInfo.hour)) {
      errors.hour = 'Please enter a number (or select the other option).'
    }
  }

  return errors;
}

//check if the user fill in all the course info
validateCourseInfo = function(courseInfo){
  var errors = {};

  $.each(courseInfo, function(key,value){ //loop through the array
    if(!value.courseNumber) {
      errors['courseNumber'+value.order] = "notFilled";
    }
    if(!value.courseTitle) {
      errors['courseTitle'+value.order] = "notFilled";
    }
  });

console.log(errors);

  return errors;
}

