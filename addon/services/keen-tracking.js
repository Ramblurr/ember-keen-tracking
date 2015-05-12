/* global Keen */

import Ember from 'ember';

export default Ember.Service.extend({
  env: function() {
    return this.container.lookupFactory('config:environment');
  }.property(),
  projectId: function() {   // String (required always)
    var projectId = this.get('env').KEEN_PROJECT_ID || Ember.$('meta[property="keen:project_id"]').attr('content') || window.KEEN_PROJECT_ID;
    if (!projectId) {
      Ember.Logger.info('Ember Keen Tracking: Missing Keen project id, please set `ENV.KEEN_PROJECT_ID` in config.environment.js');
    }
    return projectId;
  }.property('env'),
  writeKey: function() {    // String (required always)
    var writeKey = this.get('env').KEEN_WRITE_KEY || Ember.$('meta[property="keen:write_key"]').attr('content') || window.KEEN_WRITE_KEY;
    if (!writeKey) {
      Ember.Logger.info('Ember Keen Tracking: Missing Keen write key, please set `ENV.KEEN_WRITE_KEY` in config.environment.js');
    }
    return writeKey;
  }.property('env'),
  protocol: "auto",         // String (optional: https | http | auto)
  host: "api.keen.io/3.0",  // String (optional)
  requestType: null,        // String (optional: jsonp, xhr, beacon)

  client: function() {
    return new Keen({
      projectId: this.get('projectId'),
      writeKey: this.get('writeKey'),
      protocol: this.get('protocol'),
      host: this.get('host'),
      requestType: this.get('requestType')
    });
  }.property('projectId', 'writeKey', 'protocol', 'host', 'requestType'),

  addEvent: function(eventName, eventProperties) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      self.get('client').addEvent(eventName, eventProperties, function(err, res) {
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  // eventsData structure should match the keen-js SDK
  // https://github.com/keen/keen-js#record-multiple-events
  addEvents: function(eventsData) {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      self.get('client').addEvents(eventsData, function(err, res) {
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
});
