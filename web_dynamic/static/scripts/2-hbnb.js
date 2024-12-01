$(document).ready(function () {
    // Check the API status on page load
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
      if (data.status === "OK") {
        $("#api_status").addClass("available"); // Add 'available' class if status is OK
      } else {
        $("#api_status").removeClass("available"); // Remove 'available' class if status is not OK
      }
    });
  
    // Listen for changes on each amenity checkbox
    $("input[type='checkbox']").change(function () {
      let amenities = [];
      // Loop through all checked checkboxes and add their names to the amenities list
      $("input[type='checkbox']:checked").each(function () {
        amenities.push($(this).data("name"));
      });
  
      // Update the h4 tag with the selected amenities
      $(".amenities h4").text(amenities.join(", ") || "&nbsp;");
    });
  });
