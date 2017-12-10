import Backbone from 'backbone';

const Reservation = Backbone.Model.extend({
  url: function () {
    return `https://ada-backtrek-api.herokuapp.com/trips/${ this.get('trip_id') }/reservations`;
  },

  validate: function(attributes) {

    const errors = {};
    if (!attributes.name) {
      errors['name'] = ["Name cannot be blank"];
    }

    if (!attributes.email) {
      errors['email'] = ["Email cannot be blank"];
    }

    if (attributes.email) {
      if (!attributes.email.includes('@')) {
        errors['email'] = ["Enter valid email"];
      }
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return false;
  },
  
});

export default Reservation;
