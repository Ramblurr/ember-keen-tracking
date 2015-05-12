import Ember from 'ember';

export default Ember.Route.extend({
  keenTracking: Ember.inject.service(),
  actions: {
    trackGiggle: function() {
      var dataObject = {polo: 1, yolo: 2, cholo: 3};
      this.get('keenTracking').addEvent('giggle', dataObject).then(function(response) {
        console.log(response);
      });
    }
  }
});
