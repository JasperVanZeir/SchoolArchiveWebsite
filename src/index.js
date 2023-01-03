function elementFromHtml(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

function loadStudents(endpoint) {
    removeContent();
    fetch(`http://104.131.62.197/${endpoint}`)
        .then((response) => response.json())
        .then((data) => {
            fetch("http://104.131.62.197/api/students/count")
                .then((response) => response.json())
                .then((rcount) => {
                    appendStudents(rcount, data);
                });
        });
}


function createStudentElement(student) {
    const className = student.student_id % 2 == 0 ? "change_c" : "";

    return `<tr class="focus:outline-none h-14 bg-white border border-gray-100 text-gray-500 text-md font-medium hover:text-gray-800 hover:bg-gray-50">
    <td>
       <div class="flex items-center pl-5">
          <p>${student.first_name} ${student.last_name}</p>
       </div>
    </td>
    <td class="pl-24">
       <div class="flex items-center">
          <p class="ml-2">${student.email}</p>
       </div>
    </td>
    <td class="pl-5">
       <div class="flex items-center">
          <p class="ml-2">${student.course}</p>
       </div>
    </td>
    <td class="pl-5">
       <div class="flex items-center">
          <p class="ml-2">${student.sex}</p>
       </div>
    </td>
    <td class="pl-5">
       <div class="flex items-center">
          <p class="ml-2">${student.birthyear}</p>
       </div>
    </td>
    <td>
       <div class="pr-4">
          <button id="editstudentButton" data-modal-toggle="editstudent" class="mt-4 sm:mt-0 inline-flex items-start justify-start py-3 px-8 rounded-lg float-right">
             <p class="customcolorblue">Edit</p>
          </button>
       </div>
    </td>
 </tr>
    `;
}

function appendStudents(rcount, { count, students }) {
    document.getElementById("StudentCount").innerHTML = rcount.totalcount;
    document.getElementById("AITCount").innerHTML = rcount.AIT;
    document.getElementById("ITNCount").innerHTML = rcount.ITN;
    document.getElementById("MOCount").innerHTML = rcount.MO;
    document.getElementById("OMCCount").innerHTML = rcount.OMC;

    const tableBody = document.getElementById("tbody");

    for (const student of students) {
        const studentElement = createStudentElement(student);
        tableBody.appendChild(elementFromHtml(studentElement));
    }
}

function reverseTable() {
    const students = document.querySelectorAll(".student");

    students.forEach((student) => student.remove());
    studentsData.students.reverse();

    appendStudents(studentsData);
}

function removeContent() {
    // remove all content from the table
    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = "";
}

loadStudents("api/students");
