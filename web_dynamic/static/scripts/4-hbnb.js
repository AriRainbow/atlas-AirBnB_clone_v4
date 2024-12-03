$(document).ready(() => {
    const apiStatus = $('#api_status');
    
    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
      if (data.status === 'OK') {
        apiStatus.addClass('available');
      } else {
        apiStatus.removeClass('available');
      }
    });

    // Handle the search button click
    $('button[type="button"]').click(() => {
        const amenities = [];
        
        // Collect checked amenities
        $('input[type="checkbox"]:checked').each(function() {
            amenities.push($(this).data('id'));
        });

        // Send selected amenities in the request to filter places
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenities }),  // Send the selected amenities
            success: (data) => {
                // Clear the existing places
                $('.places').empty();

                // Populate places with the filtered data
                for (const place of data) {
                    $('.places').append(`
                        <article>
                          <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                          </div>
                          <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                          </div>
                          <div class="description">${place.description}</div>
                        </article>
                    `);
                }
            }
        });
    });
});
