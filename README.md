[![Build Status](https://travis-ci.org/plyfe/ember-keen-tracking.svg?branch=master)](https://travis-ci.org/plyfe/ember-keen-tracking) [![Ember Observer Score](http://emberobserver.com/badges/ember-keen-tracking.svg)](http://emberobserver.com/addons/ember-keen-tracking)

# ember-keen-tracking

ember-keen-tracking is an easy way to use Keen IO for event tracking in your ember-cli project. A simple Ember service wraps the [keen-js SDK](https://github.com/keen/keen-js) and can be injected anywhere in your application.

To query Keen IO events in ember, see the sister addon: [ember-keen-querying](https://github.com/plyfe/ember-keen-querying)

We welcome contributions!

## Installation

`npm install --save-dev ember-keen-tracking`

## Setup

A Keen project id and write key is required to track events. You can set these api keys in one of 3 ways:

1. Set a `KEEN_PROJECT_ID` and `KEEN_WRITE_KEY` on `ENV` in `config/environment`. The [ember-cli-dotenv](https://github.com/fivetanley/ember-cli-dotenv) addon is a safe and easy way to do this.

2. A metatag of the form: `<meta property="keen:project_id" content="[KEEN_PROJECT_ID]" />`

3. Set a global `KEEN_PROJECT_ID`.

## Usage

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
