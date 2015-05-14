'use strict';

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackagesToProject([{ name: 'keen-tracking', target: '3.2.4'}]);
  }
};
