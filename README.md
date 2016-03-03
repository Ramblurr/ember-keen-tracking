[![Build Status](https://travis-ci.org/plyfe/ember-keen-tracking.svg?branch=master)](https://travis-ci.org/plyfe/ember-keen-tracking) [![Ember Observer Score](http://emberobserver.com/badges/ember-keen-tracking.svg)](http://emberobserver.com/addons/ember-keen-tracking)

# Ember Keen Tracking

An easy way to track events to Keen.io from your Ember CLI App.

---

ember-keen-querying is addon that provides an Ember service wrapping the [keen-js SDK](https://github.com/keen/keen-js). Since it is a service, it can injected and used anywhere in your application.

It exposes the event collection APIs to send events to Keen.io.

**Want to Query your Keen Data?**

To query Keen IO events in ember, see the sister addon: [ember-keen-querying](https://github.com/plyfe/ember-keen-querying)

## Installation

```sh
ember install ember-keen-tracking 
ember generate ember-keen-tracking
```


##  Updating

This project is new and the API is subject to change. When updating your project to a newer version of ember-keen-querying, please consult the [changelog](CHANGELOG.md) for any update notes.

## Setup

A Keen project id and write key is required to track events. You can set these api keys in one of 3 ways:

1. Set a `KEEN_PROJECT_ID` and `KEEN_WRITE_KEY` on `ENV` in `config/environment`. The [ember-cli-dotenv](https://github.com/fivetanley/ember-cli-dotenv) addon is a safe and easy way to do this.

2. A metatag of the form: `<meta property="keen:project_id" content="[KEEN_PROJECT_ID]" />`

3. Set a global `KEEN_PROJECT_ID`.

## Basic Usage

*The Ember.Service class is only supported in Ember 1.11+. If your application is on an older version of Ember, you can achieve the same effect of this addon by injecting the service as an Ember object through an initializer.*

You can inject and use the service anywhere like so:

```
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
```

You can track multiple events at once with `addEvents`. See the dummy app for more info.
