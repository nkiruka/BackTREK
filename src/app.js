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
let tripTemplate;

// Trip list
const renderTrips = function renderTrips(tripList) {
  const tripsTableElement = $('#trip-list');
  tripsTableElement.html('');

  tripList.forEach((trip) => {
    const generatedHTML = $(tripsTemplate(trip.attributes));
    generatedHTML.on('click', (event) => {
      trip.fetch({
        success: function(model, response) {
          $('#trips').hide();
          $('#trip').show();
        }
      });
    });
    tripsTableElement.append(generatedHTML);
  });

// Visual feedback for sorting
  $('th.sort').removeClass('current-sort-field');
  $(`th.sort.${ tripList.comparator }`).addClass('current-sort-field');
};

// Trip
const renderTrip = function renderTrip(trip) {
  const tripTableElement = $('#trip');
  tripTableElement.html('');

  const generatedHTML = $(tripTemplate(trip.attributes));
  tripTableElement.html(generatedHTML);
};


$(document).ready( () => {
  tripsTemplate = _.template($('#trips-template').html());
  tripTemplate = _.template($('#trip-template').html());

  const tripList = new TripList();
  tripList.on('update', renderTrips);
  tripList.on('sort', renderTrips);

// Sort table headings
TRIP_FIELDS.forEach((field) => {
    const headerElement = $(`th.sort.${ field }`);
    headerElement.on('click', (event) => {
      console.log(`sorting table by ${ field }`);
      tripList.comparator = field; //property; meta data
      tripList.sort();
    });
  });

// Retrieve all trips
  $('#search-trips').on('click', function() {
    tripList.fetch({
      success: function(collection, response) {
        $('#trips').show();
        $('#trip').hide();
      }
    });
  });
});
