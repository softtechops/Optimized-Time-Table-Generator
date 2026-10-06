function generateTimetableData(subjects) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = [
        { time: '09:00 - 10:00', name: 'Period 1' },
        { time: '10:00 - 11:00', name: 'Period 2' },
        { time: '11:00 - 11:15', name: 'Break' },
        { time: '11:15 - 12:15', name: 'Period 3' },
        { time: '12:15 - 01:00', name: 'Lunch Break' },
        { time: '01:00 - 02:00', name: 'Period 4' },
        { time: '02:00 - 03:00', name: 'Period 5' },
        { time: '03:00 - 04:00', name: 'Period 6' }
    ];

    const timetable = {};

    days.forEach(day => {
        timetable[day] = [];
        const shuffledSubjects = shuffleArray(subjects.slice()); // Shuffle subjects for the day
        let subjectIndex = 0;

        periods.forEach(period => {
            if (period.name.includes('Period')) {
                const subject = shuffledSubjects[subjectIndex % shuffledSubjects.length];
                timetable[day].push({
                    period: period.time,
                    periodName: period.name,
                    subject: subject.name,
                    faculty: getFacultyForSubject(subject)
                });
                subjectIndex++;
            } else {
                timetable[day].push({
                    period: period.time,
                    periodName: period.name,
                    subject: '',
                    faculty: ''
                });
            }
        });
    });

    return timetable;
}

function getFacultyForSubject(subject) {
    const faculty = faculties.find(faculty => faculty.department === subject.department && faculty.semester === subject.semester && faculty.subject === subject.name);
    return faculty ? faculty.name : 'Not Assigned';
}
