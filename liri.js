console.log ("liri loaded")

require("dotenv").config();


let request = require("request-promise");
let fs = require("fs");
let command = process.argv[2];
let keys = require("./keys.js");
var Twitter = require("Twitter");
//var Spotify = require("");
//var spotify = new Spotify(keys.spotify);

if (command === "my-tweets") {
var client = new Twitter(keys.twitter);

  console.log(true);
  var params = { count:20, include_rts: true };
  client.get("statuses/user_timeline", params, function(error,tweets,response) {
    if (!error) {
      for(var i=0; i< tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("")
        console.log(tweets[i].text);
      }
		}
	})
  }







