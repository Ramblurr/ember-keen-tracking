/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-keen-tracking',

  contentFor: function(type) {
    if(type === 'head') {
      return '<script src="https://d26b395fwzu5fz.cloudfront.net/3.2.4/keen-tracker.min.js" type="text/javascript"></script>';
    }
  }
};
