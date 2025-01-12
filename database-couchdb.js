var cradle = require('cradle');

var db = new(cradle.Connection)().database('tweet-couchdb');

db.exists(function (err, exists) {
	if (err) {
	  console.log('error', err);
	} else if (exists) {
	  console.log('the force is with you.');
    db.save('_design/user', {
      views: {
        byUsername: {
          map: 'function (doc) { emit(doc.screen_name, doc); }'
        },
        byId: {
          map: 'function(doc) { emit(doc.id, doc); }'
        }
      }
    });
	} else {
	  console.log('database does not exists.');
	  db.create();
	}
});

function Database() {
};
exports.Database = Database;

Database.prototype.selectTweets = function (username, callback) {
  db.view('user/byUsername', { key: username }, function (err, doc) {
    callback(doc[0].value.statuses);
  }); 
}

Database.prototype.insertTweet = function (username, status, callback) {
  db.view('user/byUsername', { key: username }, function (err, doc) {
  	var now = new Date();
  	doc[0].value.statuses.push({id: doc[0].value.id, name: doc[0].value.name, screen_name: doc[0].value.screen_name, text: status, created_at: now});
  	db.save(doc[0].value.id + '', doc[0].value, function(err, res) {
  		//console.log(res);
  		callback ({'created_at': now, 'id': doc[0].value.statuses.length - 1});
  	});
  });
}

Database.prototype.selectTimeline = function (username, callback) {
  db.view('user/byUsername', { key: username }, function (err, doc) {
    var followers = doc[0].value.followers;
    console.log(followers);
    var all_tweets = [];  
    var counter = 0;
    var joinTweets= function(tweets) {
      
      all_tweets = all_tweets.concat(tweets);

      counter++;
      if (counter == followers.length) {
        callback (all_tweets);
      }
    }
    for (var j = 0; j < followers.length; j++) {
      db.view('user/byId', { key: followers[j]}, function (err, doc) {
        tweets = doc[0].value.statuses;
        joinTweets(tweets);
      });
    };
  });
}
