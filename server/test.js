if (Tutors.find().count() === 0) {
	Tutors.insert({
		name: 'Introducting Telescope'
	});
	Tutors.insert({
        name: 'Meteor'
    });

    Tutors.insert({
        name: 'The Meteor Book'
    });
}