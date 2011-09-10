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
  // TODO
  callback(['dupa']);
}

Database.prototype.selectTimeline = function (username, callback) {
  db.view('user/byUsername', { key: username }, function (err, doc) {
    var followers = doc[0].value.followers;
    console.log(followers);
    db.view('user/byId', { key: followers}, function (err, doc) {
      console.log(err);
      console.log(doc);
      callback(doc);
    });
  });
}
