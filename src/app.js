// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

// Other components
import Trip from './app/models/trip';
import Reservation from './app/models/reservation';
import TripList from './app/collections/trip_list';

console.log('it loaded!');

let tripsTemplate;

$(document).ready(() => {
  tripsTemplate = _.template($('#trips-template').html());
});
