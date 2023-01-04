$(document).ready(function() {
    $('#submit-button').click(function() {
      // Get the values from the form
      var first_name = $('#first_name').val();
      var last_name = $('#last_name').val();
      var course = $('#course').val();
      var birthyear = $('#birthyear').val();
      var sex = $('#sex').val();
      var email = $('#email').val();
      var phone_number = $('#phone_number').val();
      var city = $('#city').val();
      var note = $('#note').val();
  
      // Create a new Student object
      var newStudent = {
        first_name: first_name,
        last_name: last_name,
        course: course,
        birthyear: birthyear,
        sex: sex,
        email: email,
        phone_number: phone_number,
        city: city,
        note: note
      };
  
      // Send the POST request to the server with the new Student object as the body
      $.ajax({
        type: 'POST',
        url: 'http://104.131.62.197/api/students',
        data: JSON.stringify(newStudent),
        contentType: 'application/json',
        success: function(result) {
           location.reload();
        }
      });
    });
  });
  