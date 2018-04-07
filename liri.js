//Test Page Load
console.log ("liri loaded")

//Per instructions, read and set any environment variables with the dotenv package
require("dotenv").config();

//Import keys
var keys = require("./keys.js");

//Import Packages
var Twitter = require("Twitter");
var request = require("request");
let fs = require("fs-extra");

//var Spotify = require("");
//var spotify = new Spotify(keys.spotify);

//-----------------------------------------Twitter-------------------------------------------------//

var callTweets = function () {
   
var client = new Twitter(keys.twitter);
  console.log(true);

  var params = {count:20, include_rts: true };
  client.get("statuses/user_timeline", params, function(error,tweets,response, body) {
    if (!error) {
      for(var i=0; i< tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("")
        console.log(tweets[i].text);
      }
		}
	})
}

//------------------------------------------OMDB API-------------------------------------------------//

var callMovie= function(movieTitle){

  if (movieTitle === undefined) {
    movieTitle = "Mr Nobody";
  }

   request(
     request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=full&tomatoes=true&apikey=trilogy"),
     function(error, response, body) {
       console.log("error:", error);
       console.log("statusCode:", response && response.statusCode); 
      
       var data = JSON.parse(body);

       console.log("Title: " + data.Title);
       console.log("Year: " + data.Year);
       console.log("IMDB Rating: " + data.imdbRating);
       console.log("Rated: " + data.Rated);
       console.log("Country: " + data.Country);
       console.log("Language: " + data.Language);
       console.log("Plot: " + data.Plot);
       console.log("Actors: " + data.Actors);
    
     }
   );
}

//------------------------------------------Random Text---------------------------------------------//

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
  });
};

//------------------------------------------Main Functions-------------------------------------------//

var command = function(caseData, functionData) {
  switch (caseData) {

    case "my-tweets":
      callTweets(functionData);
      break;
      console.log("callTweets");

    case "movie-this":
      callMovie(functionData);
      break;
      console.log("callMovie");

    case "do-what-it-says":
      doWhatItSays();
      break;
      console.log("callDoWhatItSays");
  }
};

var runCommand = function(argOne, argTwo) {
  command(argOne, argTwo);
};

runCommand(process.argv[2], process.argv[3]);
