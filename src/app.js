// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

// Other components
import Trip from './app/models/trip';
import TripList from './app/collections/trip_list';

console.log('it loaded!');

const TRIP_FIELDS = ['name', 'continent', 'category', 'weeks', 'cost'];
let tripsTemplate;

const renderTrips = function renderTrips(tripList) {
  const tripsTableElement = $('#trip-list');
  tripsTableElement.html('');

  tripList.forEach((trip) => {
    const generatedHTML = $(tripsTemplate(trip.attributes));
    generatedHTML.on('click', (event) => {
      $('#trips').hide();
    });
    tripsTableElement.append(generatedHTML);
  });
};


$(document).ready( () => {
  tripsTemplate = _.template($('#trips-template').html());

  const tripList = new TripList();
  tripList.on('update', renderTrips);

  $('#search-trips').on('click', function() {
    tripList.fetch({
      success: function() {
        $('#trips').show();
      }
    });
  });
});
