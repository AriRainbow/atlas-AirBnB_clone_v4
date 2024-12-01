$(document).ready(function () {
    const selectedAmenities = {};

    // Listen for changes on each checkbox
    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).data('id');       // Get Amenity ID
        const amenityName = $(this).data('name');   // Get Amenity Name

        if (this.checked) {
            // Add Amenity ID to selectedAmenities if checked
            selectedAmenities[amenityId] = amenityName;
        } else {
            // Remove Amenity ID from selectedAmenities if unchecked
            delete selectedAmenities[amenityId];
        }

        // Update the h4 tag inside div Amenities
        const amenityList = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenityList || '\u00A0'); // Use non-breaking space if empty
    });
});