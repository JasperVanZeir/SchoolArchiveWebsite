$(document).ready(function() {
    $('#submit-button').click(function() {
      // Get the values from the form
      var voornaam = $('#voornaam').val();
      var achternaam = $('#achternaam').val();
      var richting = $('#richting').val();
      var geboortejaar = $('#geboortejaar').val();
      var geslacht = $('#geslacht').val();
      var email = $('#email').val();
      var telefoon = $('#telefoon').val();
      var woonplaats = $('#woonplaats').val();
      var notitie = $('#notitie').val();
  
      // Create a new user object
      var newUser = {
        voornaam: voornaam,
        achternaam: achternaam,
        richting: richting,
        geboortejaar: geboortejaar,
        geslacht: geslacht,
        email: email,
        telefoon: telefoon,
        woonplaats: woonplaats,
        notitie: notitie
      };
  
      // Send the POST request to the server with the new user object as the body
      $.ajax({
        type: 'POST',
        url: 'http://104.131.62.197/api/leerlingen',
        data: JSON.stringify(newUser),
        contentType: 'application/json',
        success: function(result) {
           location.reload();
        }
      });
    });
  });
  
  