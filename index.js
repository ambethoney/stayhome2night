'use strict';

const path = require('path'),
      express = require('express'),
      app = express(),
      Twit = require('twit'),
      adjs = require('./word_lists/adjs.js'),
      blame = require('./word_lists/blame.js'),
      verb = require('./word_lists/verbs.js'),
      config = {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    };

const T = new Twit(config);
const stream = T.stream('user');


Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

let tweet = "Sorry, not tonight bc my " + adjs.pick() + " " + blame.pick() + " is " + verb.pick()

app.all("/" + process.env.BOT_ENDPOINT, function (request, response) {
  var resp = response;
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    if (err){
      resp.sendStatus(500);
      console.log('Error!');
      console.log(err);
    }
    else{
      resp.sendStatus(200);
    }
  });
});
