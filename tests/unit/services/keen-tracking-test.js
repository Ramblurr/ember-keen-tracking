import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import env from 'dummy/config/environment';
import QUnit from 'qunit';
import keenClientStub from '../../helpers/stubs';

moduleFor('service:keen-tracking', 'KeenTrackingService', {
  setup: function() {
    env.KEEN_PROJECT_ID = "project321";
    env.KEEN_WRITE_KEY = "write321";
    this.container.register('config:environment', env);
  }
});

test('project id uses ENV variable', function() {
  expect(1);
  var service = this.subject();
  equal(service.get('projectId'), "project321");
});

test('project id defaults to global if no env variable or meta tag exists', function(){
  expect(1);
  env.KEEN_PROJECT_ID = null;
  window.KEEN_PROJECT_ID = "123project";
  var service = this.subject();
  equal(service.get('projectId'), "123project");
});

test('write key uses ENV variable', function() {
  expect(1);
  var service = this.subject();
  equal(service.get('writeKey'), "write321");
});

test('write key defaults to global if no env variable or meta tag exists', function(){
  expect(1);
  env.KEEN_WRITE_KEY = null;
  window.KEEN_WRITE_KEY = "123write";
  var service = this.subject();
  equal(service.get('writeKey'), "123write");
});

/**
 * @todo change ENV variables and meta tag at runtime, and test them
 */

test('addEvent returns a promise that resolves if success', function() {
  var service = this.subject({
    client: keenClientStub.create({successMsg: "Yay"})
  });
  var promise = service.addEvent('eventName', {});
  promise.then(function(response) {
    equal(response, "Yay");
  });
});

test('addEvent returns a promise to catch if there\'s an error', function() {
  var service = this.subject({
    client: keenClientStub.create({failing: true, failureMsg: "Womp"})
  });
  var promise = service.addEvent('eventName', {});
  promise.catch(function(reason) {
    equal(reason, "Womp");
  });
});

test('addEvents returns a promise that resolves if success', function() {
  var service = this.subject({
    client: keenClientStub.create({successMsg: "Hoorah"})
  });
  var promise = service.addEvents({});
  promise.then(function(response) {
    equal(response, "Hoorah");
  });
});

test('addEvents returns a promise to catch if there\'s an error', function() {
  var service = this.subject({
    client: keenClientStub.create({failing: true, failureMsg: "Boo"})
  });
  var promise = service.addEvents({});
  promise.catch(function(reason) {
    equal(reason, "Boo");
  });
});

