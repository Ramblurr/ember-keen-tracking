/* global Keen */

import Ember from 'ember';
import config from 'ember-get-config';


const {
  Service,
  Logger,
  RSVP,
  computed,
  isBlank
  } = Ember;

/**
 * A service for Keen.io that exposes the tracking APIs from keen.js
 *
 * See [keen-js SDK's docs](https://github.com/keen/keen-js) for more info.
 *
 * @module keen-tracking
 * @namespace Service
 * @class KeenTracking
 * @extends Ember.Service
 */
export default Service.extend({
  env: computed(function() {
    return config;
  }),

  /**
   * The Keen Project ID
   *
   * Read from the conifig object or the window object.
   * @required
   * @property
   * @type String
   */
  projectId: computed('env', function() {   // String (required always)
    var projectId = this.get('env').KEEN_PROJECT_ID || Ember.$('meta[property="keen:project_id"]').attr('content') || window.KEEN_PROJECT_ID;
    if (isBlank(projectId)) {
      Logger.info('Ember Keen Tracking: Missing Keen project id, please set ENV.KEEN_PROJECT_ID in config.environment.js');
    }
    return projectId;
  }),

  writeKey: computed('env', function() {    // String (required always)
    var writeKey = this.get('env').KEEN_WRITE_KEY || Ember.$('meta[property="keen:write_key"]').attr('content') || window.KEEN_WRITE_KEY;
    if (isBlank(writeKey)) {
      Logger.info('Ember Keen Tracking: Missing Keen write key, please set ENV.KEEN_WRITE_KEY in config.environment.js');
    }
    return writeKey;
  }),

  /**
   * Allowed values: https | http | auto
   * @property protocol
   * @default "auto"
   * @optional
   * @type String
   */
  protocol: "auto",

  /**
   * @property host
   * @default "api.keen.io/3.0"
   * @optional
   * @type String
   */
  host: "api.keen.io/3.0",

  /**
   * Allowed values: null, jsonp, xhr, beacon
   * @property requestType
   * @default null, decided by the Keen library
   * @optional
   * @type null|String
   */
  requestType: null,

  /**
   * The Keen client object, configured and ready to go.
   * @property client
   */
  client: computed('projectId', 'writeKey', 'protocol', 'host', 'requestType', function() {
    return new Keen({
      projectId: this.get('projectId'),
      writeKey: this.get('writeKey'),
      protocol: this.get('protocol'),
      host: this.get('host'),
      requestType: this.get('requestType')
    });
  }),

  /**
   * Records an event
   *
   * See [Keen.js documentation](https://github.com/keen/keen-js/blob/master/README.md#record-a-single-event)
   * @param eventName
   * @param eventProperties
   * @returns {RSVP.Promise|*}
     */
  addEvent: function(eventName, eventProperties) {
    var self = this;
    return new RSVP.Promise(function(resolve, reject) {
      self.get('client').addEvent(eventName, eventProperties, function(err, res) {
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  /**
   * Record multiple events
   *
   * Expects an object of events keyed by event name, and a list containing the properties.
   * See [Keen.js record multiple documentation](https://github.com/keen/keen-js/blob/master/README.md#record-multiple-events)
   *
   * @param eventsData
   * @returns {RSVP.Promise|*}
     */
  addEvents: function(eventsData) {
    var self = this;
    return new RSVP.Promise(function(resolve, reject) {
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
