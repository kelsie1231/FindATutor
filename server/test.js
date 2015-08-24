if (Tutors.find().count() === 0) {
	Tutors.insert({
		name: 'Milk',
        sex: 'Male',
        studentCheck: 'yes',
        currentSchool: 'ucsd',
        level: 'Graduate',
        year: 'Junior',
        major: 'Math',
        email: 'test@test.com',
        phone: '858-777-0909',
        course: [
            {'courseNumber':'Econ 196', 'courseTitle':'Introducing to econ'},
            {'courseNumber':'Math 109', 'courseTitle':'Introducing to stat'}, 
            {'courseNumber':'Muir 50', 'courseTitle':'Muir writing'},
            {'courseNumber':'CSE 30', 'courseTitle':'Assembly'},
            {'courseNumber':'CSE 8B', 'courseTitle':'Introduce to Java'}],
        // course: ['Econ 196', 'Math 109', 'Muir 50'],
        // courseTitle: ['Introducting to econ', 'Introducting to stat', 'Muir writing'],
        salary: 20,
        workload: 'number',
        hour: 5,
        comment: 'A student loves to teach and willing to help others',
        submitted: new Date()
	});
	Tutors.insert({
        name: 'Yoyo',
        sex: 'Female',
        studentCheck: 'no',
        pastSchool: 'uiuc',
        graduateYear: '2013',
        major: 'Math',
        email: 'test@test.com',
        phone: '858-777-7739',
        course: [
            {'courseNumber':'Econ 196', 'courseTitle':'Introducing to econ'},
            {'courseNumber':'Math 109', 'courseTitle':'Introducing to stat'}, 
            {'courseNumber':'Muir 50', 'courseTitle':'Muir writing'}],
        // course: ['Econ 196', 'Math 109', 'Muir 50'],
        // courseTitle: ['Introducting to econ', 'Introducting to stat', 'Muir writing'],
        salary: 40,
        workload: 'any',
        comment: 'A student loves to teach and willing to help others',
        submitted: new Date()
    });

    Tutors.insert({
        name: 'Tom',
        sex: 'Male',
        studentCheck: 'no',
        pastSchool: 'ucla',
        graduateYear: '2015',
        major: 'Math',
        email: 'test@test.com',
        phone: '858-777-9909',
        course: [
            {'courseNumber':'Econ 196', 'courseTitle':'Introducing to econ'},
            {'courseNumber':'Math 109', 'courseTitle':'Introducing to stat'}, 
            {'courseNumber':'Muir 50', 'courseTitle':'Muir writing'}],
        // course: ['Econ 196', 'Math 109', 'Muir 50'],
        // courseTitle: ['Introducting to econ', 'Introducting to stat', 'Muir writing'],
        salary: 30,
        workload: 'number',
        hour: 8,
        comment: 'A student loves to teach and willing to help others',
        submitted: new Date()
    });
}


if (Students.find().count() === 0) {
    Students.insert({
        name: 'Peter',
        sex: 'Male',
        school: 'ucsd',
        level: 'Graduate',
        year: 'Freshman',
        major: 'Math',
        email: 'test@test.com',
        phone: '858-777-0909',
        course: [
            {'courseNumber':'Econ 196', 'courseTitle':'Introducing to econ'},
            {'courseNumber':'Math 109', 'courseTitle':'Introducing to stat'}, 
            {'courseNumber':'Muir 50', 'courseTitle':'Muir writing'},
            {'courseNumber':'CSE 30', 'courseTitle':'Assembly'},
            {'courseNumber':'CSE 8B', 'courseTitle':'Introduce to Java'}],
        // course: ['Econ 196', 'Math 109', 'Muir 50'],
        // courseTitle: ['Introducting to econ', 'Introducting to stat', 'Muir writing'],
        salary: 20,
        hour: 5,
        comment: 'A student loves to teach and willing to help others',
        submitted: new Date()
    });
    Students.insert({
        name: 'Kel',
        sex: 'Female',
        school: 'ucsd',
        level: 'Graduate',
        year: 'Junior',
        major: 'Math',
        email: 'test@test.com',
        phone: '858-777-7739',
        course: [
            {'courseNumber':'Econ 196', 'courseTitle':'Introducing to econ'},
            {'courseNumber':'Math 109', 'courseTitle':'Introducing to stat'}, 
            {'courseNumber':'Muir 50', 'courseTitle':'Muir writing'}],
        // course: ['Econ 196', 'Math 109', 'Muir 50'],
        // courseTitle: ['Introducting to econ', 'Introducting to stat', 'Muir writing'],
        salary: 40,
        comment: 'A student loves to teach and willing to help others',
        submitted: new Date()
    });

    Students.insert({
        name: 'Micky',
        sex: 'Male',
        school: 'ucsd',
        level: 'Undergraduate',
        year: 'Junior',
        major: 'Math',
        email: 'test@test.com',
        phone: '858-777-9909',
        course: [
            {'courseNumber':'Econ 196', 'courseTitle':'Introducing to econ'},
            {'courseNumber':'Math 109', 'courseTitle':'Introducing to stat'}, 
            {'courseNumber':'Muir 50', 'courseTitle':'Muir writing'}],
        // course: ['Econ 196', 'Math 109', 'Muir 50'],
        // courseTitle: ['Introducting to econ', 'Introducting to stat', 'Muir writing'],
        salary: 30,
        hour: 8,
        comment: 'A student loves to teach and willing to help others',
        submitted: new Date()
    });
}


