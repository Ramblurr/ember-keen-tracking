import Ember from 'ember';

export default Ember.Object.extend({
  failing: false,
  successMsg: "Success",
  failureMsg: "Failure",
  addEvent: function(eventName, eventProperties, callback) {
    if(this.get('failing')) {
      callback.call(this, this.get('failureMsg'), this.get('successMsg'));
    } else {
      callback.call(this, null, this.get('successMsg'));
    }
  },
  addEvents: function(eventsData, callback) {
    if(this.get('failing')) {
      callback.call(this, this.get('failureMsg'), this.get('successMsg'));
    } else {
      callback.call(this, null, this.get('successMsg'));
    }
  }
});
