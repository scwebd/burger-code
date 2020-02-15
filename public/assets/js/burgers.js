// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    // NICK:
    // added this click event to trigger deletion from the db when the user
    // clicks on the delete button
    $(".delete-burg").on("click", function() {
      var id = $(this).data("id");

      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger with id", id);
          location.reload();
        }
      );
    });

    $(".devour-burg").on("click", function(event) {
      var id = $(this).data("id");
      var newDevour = $(this).data("devoured");
  
      var newDevouredState = {
        devoured: newDevour
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevouredState
      }).then(
        function() {
          console.log("changed devour to", newDevour);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

  
      var newBurger = {
        burger_name: $("#ca").val().trim()
      };
  
      console.log(newBurger);
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
});
  