'use strict';

/**
 * Compares performance of standard Promise vs Bluebird promise.
 */

var Bluebird = require('bluebird');
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite(); // jshint ignore:line

var func = () => Math.random();
var callbackFunc = (val, cb) => {
  cb(val);
};

suite
  .add('Bluebird.resolve().then()', {
    defer: true,
    fn: df => Bluebird.resolve(func()).then(() => {
      df.resolve();
    })
  })
  .add('Promise.resolve().then()', {
    defer: true,
    fn: df => Promise.resolve(func()).then(() => {
      df.resolve();
    })
  })
  .add('Callback', () => callbackFunc(func(), () => {}))
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });