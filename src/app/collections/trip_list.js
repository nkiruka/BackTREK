import Backbone from 'backbone';
import Trip from '../models/trip';

const TripList = Backbone.Collection.extend({
  model: Trip,
  url: 'https://ada-backtrek-api.herokuapp.com/trips',
  // parse returns an array of js objects
  parse: function(response) {
    return response['trips'];
  }
});

export default TripList;
