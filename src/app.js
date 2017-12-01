// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

// Other components
import Trip from './app/models/trip';
import TripList from './app/collections/trip_list';
//
const TRIP_FIELDS = ['name', 'continent', 'category', 'weeks', 'cost'];
console.log('it loaded!');

//
// // Starts undefined - we'll set this in $(document).ready
// // once we know the template is available
let tripTemplate;

const renderTrips = function renderTrips(tripList) {
  const tripsTableElement = $('#trip-list');  //check w/Dan if it acts like a global variable
  tripsTableElement.html('');  //ensure empty prior to populating


  tripList.forEach((trip) => {
    const generatedHTML = $(tripTemplate(trip.attributes)); // check w/Dan on attributes
    generatedHTML.on('click', (event) => {
      renderTrip(trip)
      $('#trips').hide();
      $('#trip').show();
    });
    tripsTableElement.append(generatedHTML);
  });
};

const renderTrip = function renderTrip(trip){
    const tripTableElement = $('#trip');
    tripTableElement.html('');

    const generatedHTML = $(tripTemplate(trip.attributes));
    tripTableElement.html(generatedHTML);
};

$(document).ready(() => {
  tripTemplate = _.template($('#trips-template').html());

  const tripList = new TripList();
  tripList.on('update',renderTrips);

  $('#search-trips').on('click', function() {
    tripList.fetch({
      success: function () {
        $('#trips').show();
      }
    });
  });

  $('#add-trip-form').on('submit', function(event) {
    event.preventDefault();  //prevents page from refreshing
    let tripData = {};

    TRIP_FIELDS.forEach((field) => {
      tripData[field] = $(`#add-trip-form input[name="${ field }"]`).val();  //loop through
    });

    let trip = new Trip(tripData); // backbone trip model

    trip.save({}, {
      success: function (model, response) {
        tripList.add(model);
      }
    });
  });
});
