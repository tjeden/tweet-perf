/*
 * Engine module responsible for almost all application logic.
 */

function Engine() {

    this.tweetId = 0;
    
};

exports.Engine = Engine;

var databaseModule = require('./database-couchdb');
var database = new databaseModule.Database();

Engine.prototype.getTweets = function (username, callback) {

	//console.log('getting tweets for user ' + username);

	database.selectTweets(username, function(tweets) {
		
		if (tweets) {
		
			tweets.sort(dateSorter);
			
			callback(tweets.slice(0, 19));
		
		} else callback([]);
	
	});

};

Engine.prototype.postTweet = function (username, status, callback) {

	//console.log('posting tweet for user ' + username + ' with status: ' + status);

	database.insertTweet(username, status, function(tweet) {
	
		callback(tweet);
	
	});

};

Engine.prototype.getTimeline = function (username, callback) {

	//console.log('getting timeline for user ' + username);

	database.selectTimeline(username, function(tweets) {
	
		if (tweets) {
	    var results = [];	
			tweets.sort(dateSorter);
      for (var i=0; i < tweets.slice(0,19).length; i++){
        results[i] = { 
          "created_at": tweets[i].created_at,
          "text": tweets[i].text,
          "id": tweets[i].id,
          "user": {
            "name": tweets[i].name,
            "id": tweets[i].id,
            "screen_name": tweets[i].screen_name
          }
        };
      };
			
			callback(results);
		
		} else callback([]);
	
	});

};

//------------------------------------------------------------------------------

// date sorting, needed for reducing tweets returned by home timeline
// we're passing it to sort() method
var dateSorter = function (a, b) {

  //console.log(a.created_at);
  //console.log(Date.parse(a.created_at));
  //console.log(b.created_at);
  //console.log(Date.parse(b.created_at));
	//console.log(Date.parse(a.created_at) > Date.parse(b.created_at));
	return Date.parse(a.created_at) > Date.parse(b.created_at) ? true : false;

};
