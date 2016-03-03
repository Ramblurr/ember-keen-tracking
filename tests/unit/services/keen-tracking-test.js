import { moduleFor, test } from 'ember-qunit';
import config from 'ember-get-config';

import keenClientStub from '../../helpers/stubs';

moduleFor('service:keen-tracking', 'Unit | Service | keen tracking', {
  beforeEach: function() {
    config.KEEN_PROJECT_ID = "project321";
    config.KEEN_WRITE_KEY = "write321";
  }
});

test('project id uses ENV variable', function(assert) {
  assert.expect(1);
  var service = this.subject();
  assert.equal(service.get('projectId'), "project321");
});

test('project id defaults to global if no config variable or meta tag exists', function(assert){
  assert.expect(1);
  config.KEEN_PROJECT_ID = null;
  window.KEEN_PROJECT_ID = "123project";
  var service = this.subject();
  assert.equal(service.get('projectId'), "123project");
});

test('write key uses ENV variable', function(assert) {
  assert.expect(1);
  var service = this.subject();
  assert.equal(service.get('writeKey'), "write321");
});


test('write key defaults to global if no env variable or meta tag exists', function(assert){
  assert.expect(1);
  config.KEEN_WRITE_KEY = null;
  window.KEEN_WRITE_KEY = "123write";
  var service = this.subject();
  assert.equal(service.get('writeKey'), "123write");
});


test('addEvent returns a promise that resolves if success', function(assert) {
  var service = this.subject({
    client: keenClientStub.create({successMsg: "Yay"})
  });
  var promise = service.addEvent('eventName', {});
  promise.then(function(response) {
    assert.equal(response, "Yay");
  });
});

test('addEvent returns a promise to catch if there\'s an error', function(assert) {
  var service = this.subject({
    client: keenClientStub.create({failing: true, failureMsg: "Womp"})
  });
  var promise = service.addEvent('eventName', {});
  promise.catch(function(reason) {
    assert.equal(reason, "Womp");
  });
});

test('addEvents returns a promise that resolves if success', function(assert) {
  var service = this.subject({
    client: keenClientStub.create({successMsg: "Hoorah"})
  });
  var promise = service.addEvents({});
  promise.then(function(response) {
    assert.equal(response, "Hoorah");
  });
});

test('addEvents returns a promise to catch if there\'s an error', function(assert) {
  var service = this.subject({
    client: keenClientStub.create({failing: true, failureMsg: "Boo"})
  });
  var promise = service.addEvents({});
  promise.catch(function(reason) {
    assert.equal(reason, "Boo");
  });
});
