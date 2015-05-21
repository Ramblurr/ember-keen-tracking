/* jshint node: true */
'use strict';
var path = require('path');

module.exports = {
  name: 'ember-keen-tracking',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    var keenPath = path.join(app.bowerDirectory, '/keen-js/dist');

    app.import(path.join(keenPath, 'keen-tracker.js'));
  }
};
