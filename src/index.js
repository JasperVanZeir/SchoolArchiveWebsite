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
   return `
    <tr class="focus:outline-none h-14 bg-white border border-gray-100 text-gray-500 text-md font-medium hover:text-gray-800 hover:bg-gray-50" onclick="viewStudentButton(this)">
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
          <button onclick="editStudentButton(this); event.stopPropagation()" data-student='${JSON.stringify(
      student
   )}' class="mt-4 sm:mt-0 inline-flex items-start justify-start py-3 px-8 rounded-lg float-right">
            <p class="customcolorblue">Edit</p>
         </button>
      </div>
   </td>
</tr>
   `;
}

function editStudentButton(data) {
   // opens modal
   const addStudentModal = document.getElementById("editStudent");
   addStudentModal.classList.remove("hidden");
   addStudentModal.classList.add("flex");

   // fills input fields with student data
   const student = JSON.parse(data.getAttribute("data-student"));
   document.getElementById("edit_first_name").value = student.first_name;
   document.getElementById("edit_last_name").value = student.last_name;
   document.getElementById("edit_course").value = student.course;
   document.getElementById("edit_birthyear").value = student.birthyear;
   document.getElementById("edit_sex").value = student.sex;
   document.getElementById("edit_email").value = student.email;
   document.getElementById("edit_phone_number").value = student.phone_number;
   document.getElementById("edit_city").value = student.city;
   document.getElementById("edit_note").value = student.note;
   document.getElementById("edit_student_id").value = student.student_id;
}

function viewStudentButton(data) {
   // opens modal
   const addStudentModal = document.getElementById("viewStudent");
   addStudentModal.classList.remove("hidden");
   addStudentModal.classList.add("flex");
}

function deleteStudent() {
   let id = document.getElementById("edit_student_id").value;
   fetch(`http://104.131.62.197/api/students/id/${id} `, {
      method: "DELETE",
   })
      .then((data) => {
         console.log(data)
         if (data.status == 200) {
            loadStudents("api/students");
            closePopup("editStudent")
            setTimeout(() => {
               alert("Student deleted")
            }, 200);
         } else {
            alert("Something went wrong" + data.status);
         }
      })


}

function editStudent() {
   // Get the values from the form
   let first_name = document.getElementById("edit_first_name").value;
   let last_name = document.getElementById("edit_last_name").value;
   let course = document.getElementById("edit_course").value;
   let birthyear = document.getElementById("edit_birthyear").value;
   let sex = document.getElementById("edit_sex").value;
   let email = document.getElementById("edit_email").value;
   let phone_number = document.getElementById("edit_phone_number").value;
   let city = document.getElementById("edit_city").value;
   let note = document.getElementById("edit_note").value;
   let id = document.getElementById("edit_student_id").value;

   // Create the student object
   const student = {
      first_name: first_name,
      last_name: last_name,
      course: course,
      birthyear: birthyear,
      sex: sex,
      email: email,
      phone_number: phone_number,
      city: city,
      note: note,
   };

   // Send the student object to the server
   fetch(`http://104.131.62.197/api/students/id/${id}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
   })
      .then((response) => response.json())
      .then((data) => {
         console.log("Success:", data);
         loadStudents("api/students");

         closePopup("editStudent");
      })
      .catch((error) => {
         console.error("Error:", error);
      });
}

function closePopup(menu) {
   if (menu == "editStudent") {
      let modal = document.getElementById("editStudent");
      modal.classList.add("hidden");
   } else if (menu == "viewStudent") {
      let modal = document.getElementById("viewStudent");
      modal.classList.add("hidden");
   }
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