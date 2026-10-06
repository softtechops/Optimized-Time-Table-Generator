// State variables
let departments = [];
let semesters = [];
let subjects = {}; // { [dept]: { [sem]: [subjectNames] } }
let faculties = [];
let venues = [];

// Default Sample Seed Data
const defaultData = {
    departments: [
        "Computer Science Engineering",
        "Electronics and Communication Engineering",
        "Information Technology"
    ],
    semesters: [
        { department: "Computer Science Engineering", semester: "1" },
        { department: "Computer Science Engineering", semester: "2" },
        { department: "Computer Science Engineering", semester: "3" },
        { department: "Electronics and Communication Engineering", semester: "1" },
        { department: "Electronics and Communication Engineering", semester: "2" },
        { department: "Information Technology", semester: "1" }
    ],
    subjects: {
        "Computer Science Engineering": {
            "1": ["Python Programming", "Data Structures", "Discrete Mathematics", "Digital Logic", "Technical English"],
            "2": ["Object Oriented Programming", "Computer Organization", "Operating Systems", "Probability & Statistics"],
            "3": ["Database Systems", "Design & Analysis of Algorithms", "Computer Networks", "Software Engineering"]
        },
        "Electronics and Communication Engineering": {
            "1": ["Electronic Devices & Circuits", "Circuit Theory", "Engineering Physics", "Calculus & Linear Algebra", "C Programming"],
            "2": ["Signals & Systems", "Digital Electronics", "Electromagnetic Fields", "Analog Circuits"]
        },
        "Information Technology": {
            "1": ["Python Programming", "Web Development Basics", "Computer Architecture", "Discrete Mathematics"]
        }
    },
    faculties: [
        { department: "Computer Science Engineering", semester: "1", subject: "Python Programming", name: "Dr. K. Sharma" },
        { department: "Computer Science Engineering", semester: "1", subject: "Data Structures", name: "Prof. Priya Nair" },
        { department: "Computer Science Engineering", semester: "1", subject: "Discrete Mathematics", name: "Dr. Rajesh Kumar" },
        { department: "Computer Science Engineering", semester: "1", subject: "Digital Logic", name: "Prof. Ananya Iyer" },
        { department: "Computer Science Engineering", semester: "1", subject: "Technical English", name: "Dr. John Doe" },
        { department: "Electronics and Communication Engineering", semester: "1", subject: "Electronic Devices & Circuits", name: "Dr. V. Karthik" },
        { department: "Electronics and Communication Engineering", semester: "1", subject: "Circuit Theory", name: "Prof. Lakshmi R." },
        { department: "Electronics and Communication Engineering", semester: "1", subject: "Engineering Physics", name: "Dr. Mohan Ram" }
    ],
    venues: [
        { name: "Lecture Hall 101", capacity: 60, department: "Computer Science Engineering" },
        { name: "Lecture Hall 102", capacity: 65, department: "Computer Science Engineering" },
        { name: "CS Software Lab 1", capacity: 40, department: "Computer Science Engineering" },
        { name: "ECE Seminar Hall", capacity: 120, department: "Electronics and Communication Engineering" },
        { name: "LH 201 (ECE)", capacity: 60, department: "Electronics and Communication Engineering" },
        { name: "IT Smart Classroom 1", capacity: 55, department: "Information Technology" }
    ]
};

// Storage Helpers
function loadData() {
    const storedDepts = localStorage.getItem('departments');
    if (storedDepts) {
        departments = JSON.parse(storedDepts);
        semesters = JSON.parse(localStorage.getItem('semesters')) || [];
        subjects = JSON.parse(localStorage.getItem('subjects')) || {};
        faculties = JSON.parse(localStorage.getItem('faculties')) || [];
        venues = JSON.parse(localStorage.getItem('venues')) || [];
    } else {
        // Load default seed data
        departments = JSON.parse(JSON.stringify(defaultData.departments));
        semesters = JSON.parse(JSON.stringify(defaultData.semesters));
        subjects = JSON.parse(JSON.stringify(defaultData.subjects));
        faculties = JSON.parse(JSON.stringify(defaultData.faculties));
        venues = JSON.parse(JSON.stringify(defaultData.venues));
        saveAllData();
    }
}

function saveAllData() {
    localStorage.setItem('departments', JSON.stringify(departments));
    localStorage.setItem('semesters', JSON.stringify(semesters));
    localStorage.setItem('subjects', JSON.stringify(subjects));
    localStorage.setItem('faculties', JSON.stringify(faculties));
    localStorage.setItem('venues', JSON.stringify(venues));
    updateStats();
}

function resetToDefaultSeedData() {
    if (confirm("Reset all scheduling data (Departments, Semesters, Subjects, Faculty, Venues) to initial sample data?")) {
        departments = JSON.parse(JSON.stringify(defaultData.departments));
        semesters = JSON.parse(JSON.stringify(defaultData.semesters));
        subjects = JSON.parse(JSON.stringify(defaultData.subjects));
        faculties = JSON.parse(JSON.stringify(defaultData.faculties));
        venues = JSON.parse(JSON.stringify(defaultData.venues));
        saveAllData();
        renderAllTables();
        updateSelectOptions();
        alert("Sample dataset loaded successfully!");
    }
}

function updateStats() {
    let totalSubj = 0;
    for (let dept in subjects) {
        for (let sem in subjects[dept]) {
            totalSubj += subjects[dept][sem].length;
        }
    }
    const statDepts = document.getElementById('stat-depts');
    const statSubj = document.getElementById('stat-subjects');
    const statFac = document.getElementById('stat-faculty');
    const statVen = document.getElementById('stat-venues');

    if (statDepts) statDepts.textContent = departments.length;
    if (statSubj) statSubj.textContent = totalSubj;
    if (statFac) statFac.textContent = faculties.length;
    if (statVen) statVen.textContent = venues.length;
}

// Function to show the selected section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    document.querySelectorAll('.menu button').forEach(btn => {
        btn.classList.remove('active');
    });

    const targetBtn = document.getElementById(`tab-btn-${sectionId}`);
    if (targetBtn) targetBtn.classList.add('active');

    const selectedSection = document.getElementById(`${sectionId}-section`);
    if (selectedSection) {
        selectedSection.classList.add('active');
        selectedSection.style.display = 'block';
    }
}

// ========================
// Department Management
// ========================
function addDepartment() {
    const deptInput = document.getElementById('department-name');
    const deptName = deptInput.value.trim();
    if (deptName) {
        if (!departments.includes(deptName)) {
            departments.push(deptName);
            saveAllData();
            updateDepartmentTable();
            updateSelectOptions();
            deptInput.value = '';
        } else {
            alert('This department already exists.');
        }
    } else {
        alert('Please enter a department name.');
    }
}

function editDepartment(index) {
    const oldName = departments[index];
    const newDeptName = prompt("Edit Department Name:", oldName);
    if (newDeptName && newDeptName.trim() !== '') {
        const trimmed = newDeptName.trim();
        departments[index] = trimmed;

        // Cascade rename in semesters
        semesters.forEach(s => {
            if (s.department === oldName) s.department = trimmed;
        });

        // Cascade in subjects
        if (subjects[oldName]) {
            subjects[trimmed] = subjects[oldName];
            delete subjects[oldName];
        }

        // Cascade in faculties
        faculties.forEach(f => {
            if (f.department === oldName) f.department = trimmed;
        });

        // Cascade in venues
        venues.forEach(v => {
            if (v.department === oldName) v.department = trimmed;
        });

        saveAllData();
        renderAllTables();
        updateSelectOptions();
    }
}

function deleteDepartment(index) {
    const deptName = departments[index];
    if (confirm(`Are you sure you want to delete "${deptName}" and all associated data?`)) {
        departments.splice(index, 1);
        semesters = semesters.filter(s => s.department !== deptName);
        delete subjects[deptName];
        faculties = faculties.filter(f => f.department !== deptName);
        venues = venues.filter(v => v.department !== deptName);

        saveAllData();
        renderAllTables();
        updateSelectOptions();
    }
}

function updateDepartmentTable() {
    const tbody = document.querySelector('#department-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    departments.forEach((department, index) => {
        const row = `
            <tr>
                <td style="font-weight:600;">${department}</td>
                <td>
                    <button class="btn-edit" onclick="editDepartment(${index})">Edit</button>
                    <button class="btn-danger" onclick="deleteDepartment(${index})">Delete</button>
                </td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

// ========================
// Semester Management
// ========================
function addSemester() {
    const deptSelect = document.getElementById('department-select').value;
    const semesterNumber = document.getElementById('semester-number').value.trim();
    if (deptSelect && semesterNumber) {
        const exists = semesters.some(s => s.department === deptSelect && s.semester === semesterNumber);
        if (!exists) {
            semesters.push({ department: deptSelect, semester: semesterNumber });
            saveAllData();
            updateSemesterTable();
            updateSelectOptions();
            document.getElementById('semester-number').value = '';
        } else {
            alert('This semester is already configured for this department.');
        }
    } else {
        alert('Please select a department and enter a semester number.');
    }
}

function editSemester(index) {
    const s = semesters[index];
    const newSemesterNumber = prompt(`Edit Semester Number for ${s.department}:`, s.semester);
    if (newSemesterNumber && newSemesterNumber.trim() !== '') {
        const oldSem = s.semester;
        s.semester = newSemesterNumber.trim();

        // Update subjects key if exists
        if (subjects[s.department] && subjects[s.department][oldSem]) {
            subjects[s.department][s.semester] = subjects[s.department][oldSem];
            delete subjects[s.department][oldSem];
        }

        faculties.forEach(f => {
            if (f.department === s.department && f.semester === oldSem) {
                f.semester = s.semester;
            }
        });

        saveAllData();
        renderAllTables();
        updateSelectOptions();
    }
}

function deleteSemester(index) {
    if (confirm("Delete this semester?")) {
        const s = semesters[index];
        if (subjects[s.department] && subjects[s.department][s.semester]) {
            delete subjects[s.department][s.semester];
        }
        faculties = faculties.filter(f => !(f.department === s.department && f.semester === s.semester));
        semesters.splice(index, 1);

        saveAllData();
        renderAllTables();
        updateSelectOptions();
    }
}

function updateSemesterTable() {
    const tbody = document.querySelector('#semester-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    semesters.forEach((s, index) => {
        const row = `
            <tr>
                <td>${s.department}</td>
                <td><span class="badge" style="background:#eef2ff; color:var(--primary); font-size:12px;">Semester ${s.semester}</span></td>
                <td>
                    <button class="btn-edit" onclick="editSemester(${index})">Edit</button>
                    <button class="btn-danger" onclick="deleteSemester(${index})">Delete</button>
                </td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

// ========================
// Subject Management
// ========================
function addSubject() {
    const department = document.getElementById('subject-department-select').value;
    const semester = document.getElementById('subject-semester-select').value;
    const subjectName = document.getElementById('subject-name').value.trim();

    if (department && semester && subjectName) {
        if (!subjects[department]) subjects[department] = {};
        if (!subjects[department][semester]) subjects[department][semester] = [];

        if (!subjects[department][semester].includes(subjectName)) {
            subjects[department][semester].push(subjectName);
            saveAllData();
            updateSubjectTable();
            updateFacultySubjectSelect();
            document.getElementById('subject-name').value = '';
        } else {
            alert("Subject already exists for this semester.");
        }
    } else {
        alert('Please fill in all fields before adding the subject.');
    }
}

function editSubject(department, semester, subjectName) {
    const newSubjectName = prompt("Edit Subject Name:", subjectName);
    if (newSubjectName && newSubjectName.trim() !== '') {
        const trimmed = newSubjectName.trim();
        const index = subjects[department][semester].indexOf(subjectName);
        if (index > -1) {
            subjects[department][semester][index] = trimmed;
            faculties.forEach(f => {
                if (f.department === department && f.semester === semester && f.subject === subjectName) {
                    f.subject = trimmed;
                }
            });
            saveAllData();
            updateSubjectTable();
            updateFacultyTable();
            updateFacultySubjectSelect();
        }
    }
}

function deleteSubject(department, semester, subjectName) {
    if (confirm(`Are you sure you want to delete subject "${subjectName}"?`)) {
        const index = subjects[department][semester].indexOf(subjectName);
        if (index > -1) {
            subjects[department][semester].splice(index, 1);
            faculties = faculties.filter(f => !(f.department === department && f.semester === semester && f.subject === subjectName));
            saveAllData();
            updateSubjectTable();
            updateFacultyTable();
            updateFacultySubjectSelect();
        }
    }
}

function updateSubjectTable() {
    const tbody = document.querySelector('#subject-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    for (let department in subjects) {
        for (let semester in subjects[department]) {
            subjects[department][semester].forEach(subject => {
                const row = `
                    <tr>
                        <td>${department}</td>
                        <td>Semester ${semester}</td>
                        <td style="font-weight:600; color:var(--primary);">${subject}</td>
                        <td>
                            <button class="btn-edit" onclick="editSubject('${department}', '${semester}', '${subject}')">Edit</button>
                            <button class="btn-danger" onclick="deleteSubject('${department}', '${semester}', '${subject}')">Delete</button>
                        </td>
                    </tr>`;
                tbody.innerHTML += row;
            });
        }
    }
}

// ========================
// Faculty Management
// ========================
function addFaculty() {
    const dept = document.getElementById('faculty-department-select').value;
    const sem = document.getElementById('faculty-semester-select').value;
    const subj = document.getElementById('faculty-subject-select').value;
    const name = document.getElementById('faculty-name').value.trim();

    if (dept && sem && subj && name) {
        faculties.push({ department: dept, semester: sem, subject: subj, name: name });
        saveAllData();
        updateFacultyTable();
        document.getElementById('faculty-name').value = '';
    } else {
        alert('Please fill in all faculty fields.');
    }
}

function editFaculty(index) {
    const current = faculties[index];
    const newName = prompt("Edit Faculty Name:", current.name);
    if (newName && newName.trim() !== '') {
        current.name = newName.trim();
        saveAllData();
        updateFacultyTable();
    }
}

function deleteFaculty(index) {
    if (confirm("Remove this faculty assignment?")) {
        faculties.splice(index, 1);
        saveAllData();
        updateFacultyTable();
    }
}

function updateFacultyTable() {
    const tbody = document.querySelector('#faculty-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    faculties.forEach((f, index) => {
        const row = `
            <tr>
                <td>${f.department}</td>
                <td>Sem ${f.semester}</td>
                <td><strong>${f.subject}</strong></td>
                <td><span class="badge badge-faculty">${f.name}</span></td>
                <td>
                    <button class="btn-edit" onclick="editFaculty(${index})">Edit</button>
                    <button class="btn-danger" onclick="deleteFaculty(${index})">Delete</button>
                </td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

function updateFacultySubjectSelect() {
    const deptSelect = document.getElementById('faculty-department-select');
    const semSelect = document.getElementById('faculty-semester-select');
    const subjSelect = document.getElementById('faculty-subject-select');
    if (!deptSelect || !semSelect || !subjSelect) return;

    const dept = deptSelect.value;
    const sem = semSelect.value;
    subjSelect.innerHTML = '';

    if (dept && sem && subjects[dept] && subjects[dept][sem]) {
        subjects[dept][sem].forEach(subj => {
            const opt = document.createElement('option');
            opt.value = subj;
            opt.textContent = subj;
            subjSelect.appendChild(opt);
        });
    }
}

// ========================
// Venue Management
// ========================
function addVenue() {
    const name = document.getElementById('venue-name').value.trim();
    const capacity = document.getElementById('venue-capacity').value;
    const dept = document.getElementById('venue-department-select').value;

    if (name && capacity && dept) {
        venues.push({ name: name, capacity: parseInt(capacity, 10), department: dept });
        saveAllData();
        updateVenueTable();
        document.getElementById('venue-name').value = '';
        document.getElementById('venue-capacity').value = '';
    } else {
        alert('Please fill in all venue fields.');
    }
}

function removeVenue(index) {
    if (confirm("Remove this venue?")) {
        venues.splice(index, 1);
        saveAllData();
        updateVenueTable();
    }
}

function updateVenueTable() {
    const tbody = document.querySelector('#venue-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    venues.forEach((v, index) => {
        const row = `
            <tr>
                <td style="font-weight:600;">${v.name}</td>
                <td>${v.capacity} Seats</td>
                <td>${v.department}</td>
                <td>
                    <button class="btn-danger" onclick="removeVenue(${index})">Remove</button>
                </td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

// ========================
// Timetable Generation
// ========================
function generateTimetable() {
    const department = document.getElementById('timetable-department-select').value;
    const semester = document.getElementById('timetable-semester-select').value;

    if (!department || !semester) {
        alert('Please select both department and semester.');
        return;
    }

    const subjectList = subjects[department] ? subjects[department][semester] : [];
    if (!subjectList || subjectList.length === 0) {
        alert(`No subjects found for ${department} - Semester ${semester}. Please add subjects first in the 'Subject' tab.`);
        return;
    }

    const timetableData = generateTimetableData(subjectList, department, semester);
    const timetableHTML = generateTimetableHTML(timetableData, department, semester);

    // Save under multiple keys so Admin, Student, and Staff dashboards can access seamlessly
    localStorage.setItem('timetable', timetableHTML);
    localStorage.setItem(`timetable_${department}_${semester}`, timetableHTML);
    localStorage.setItem(`timetable_${department}`, timetableHTML);

    // Render preview inside dashboard
    const displayContainer = document.getElementById('timetable');
    if (displayContainer) {
        displayContainer.innerHTML = `
            <div style="margin-top: 24px; padding: 20px; background: #ffffff; border-radius: var(--radius-md); border: 1.5px solid var(--border);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div>
                        <h3 style="color:var(--primary); margin:0;">Generated Timetable: ${department} (Sem ${semester})</h3>
                        <span style="font-size:12px; color:var(--text-secondary);">Saved to database & published to Student and Staff portals</span>
                    </div>
                    <button onclick="window.location.href='timetable_display.html'" class="btn-primary" style="padding:8px 16px;">View Full / Print Sheet →</button>
                </div>
                ${timetableHTML}
            </div>`;
    }
}

function generateTimetableData(subjList, department, semester) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = [
        { time: '09:00 - 10:00', name: 'Period 1' },
        { time: '10:00 - 11:00', name: 'Period 2' },
        { time: '11:00 - 11:15', name: 'Short Break' },
        { time: '11:15 - 12:15', name: 'Period 3' },
        { time: '12:15 - 01:00', name: 'Lunch Break' },
        { time: '01:00 - 02:00', name: 'Period 4' },
        { time: '02:00 - 03:00', name: 'Period 5' },
        { time: '03:00 - 04:00', name: 'Period 6' },
    ];

    const timetable = {};
    const deptVenues = venues.filter(v => v.department === department);
    const fallbackVenues = deptVenues.length > 0 ? deptVenues : venues;

    days.forEach(day => {
        // Balanced shuffle of subjects for the day
        const shuffled = [...subjList].sort(() => 0.5 - Math.random());
        let subjIdx = 0;

        timetable[day] = periods.map(p => {
            if (p.name.includes('Break')) {
                return { subject: p.name, isBreak: true };
            }

            const subject = shuffled[subjIdx % shuffled.length];
            subjIdx++;

            const faculty = faculties.find(f => f.department === department && f.semester === semester && f.subject === subject);
            const venue = fallbackVenues.length > 0 ? fallbackVenues[Math.floor(Math.random() * fallbackVenues.length)] : null;

            return {
                subject: subject,
                faculty: faculty ? faculty.name : 'Faculty Assigned',
                venue: venue ? venue.name : 'Room 101',
                isBreak: false
            };
        });
    });

    return timetable;
}

function generateTimetableHTML(timetableData, department, semester) {
    let html = `
        <table class="timetable-table">
            <thead>
                <tr>
                    <th style="width: 110px;">Day</th>
                    <th>09:00 - 10:00<br><small style="font-weight:400; color:var(--text-muted);">Period 1</small></th>
                    <th>10:00 - 11:00<br><small style="font-weight:400; color:var(--text-muted);">Period 2</small></th>
                    <th style="background:#f1f5f9; width:70px;">11:00 - 11:15<br><small style="font-weight:400; color:var(--text-muted);">Break</small></th>
                    <th>11:15 - 12:15<br><small style="font-weight:400; color:var(--text-muted);">Period 3</small></th>
                    <th style="background:#f1f5f9; width:80px;">12:15 - 01:00<br><small style="font-weight:400; color:var(--text-muted);">Lunch</small></th>
                    <th>01:00 - 02:00<br><small style="font-weight:400; color:var(--text-muted);">Period 4</small></th>
                    <th>02:00 - 03:00<br><small style="font-weight:400; color:var(--text-muted);">Period 5</small></th>
                    <th>03:00 - 04:00<br><small style="font-weight:400; color:var(--text-muted);">Period 6</small></th>
                </tr>
            </thead>
            <tbody>`;

    for (const day in timetableData) {
        html += `<tr><td style="font-weight:700; color:#0f172a; background:#f8fafc;">${day}</td>`;
        timetableData[day].forEach(period => {
            if (period.isBreak) {
                html += `<td class="break">${period.subject}</td>`;
            } else {
                html += `
                    <td>
                        <div class="subject-cell">
                            <span class="subject-name">${period.subject}</span>
                            <span class="badge badge-faculty">${period.faculty}</span>
                            <span class="badge badge-venue">${period.venue}</span>
                        </div>
                    </td>`;
            }
        });
        html += '</tr>';
    }

    html += '</tbody></table>';
    return html;
}

// ========================
// Dynamic Dropdown Updates
// ========================
function updateSelectOptions() {
    const deptSelects = document.querySelectorAll(
        '#department-select, #subject-department-select, #faculty-department-select, #timetable-department-select, #venue-department-select'
    );
    deptSelects.forEach(select => {
        const curVal = select.value;
        select.innerHTML = departments.map(d => `<option value="${d}">${d}</option>`).join('');
        if (departments.includes(curVal)) select.value = curVal;
    });

    const semSelects = document.querySelectorAll('#subject-semester-select, #faculty-semester-select, #timetable-semester-select');
    semSelects.forEach(select => {
        const curVal = select.value;
        const uniqueSems = [...new Set(semesters.map(s => s.semester))].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
        select.innerHTML = uniqueSems.map(s => `<option value="${s}">Semester ${s}</option>`).join('');
        if (curVal) select.value = curVal;
    });

    updateFacultySubjectSelect();
}

function renderAllTables() {
    updateDepartmentTable();
    updateSemesterTable();
    updateSubjectTable();
    updateFacultyTable();
    updateVenueTable();
    updateStats();
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderAllTables();
    updateSelectOptions();
    showSection('department');

    // Attach change listeners to update dependent selects
    const facDeptSelect = document.getElementById('faculty-department-select');
    const facSemSelect = document.getElementById('faculty-semester-select');
    if (facDeptSelect) facDeptSelect.addEventListener('change', updateFacultySubjectSelect);
    if (facSemSelect) facSemSelect.addEventListener('change', updateFacultySubjectSelect);
});
