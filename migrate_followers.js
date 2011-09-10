var database_module = require('./database-mysql.js');
var database = new database_module.Database();
var cradle = require('cradle');
var db = new(cradle.Connection)().database('tweet-couchdb');

db.exists(function (err, exists) {
	if (err) {
	  console.log('error', err);
	} else if (exists) {
	  console.log('the force is with you.');
	} else {
	  console.log('database does not exists.');
	}
});
console.log('Start migrate followers');

var users = [];
var limit = 0;

database.findUsers( function(users) {

  var data = users;
  console.log('Users get. users.length:' + users.length);
  console.log('Start migrate followers');

  for (var i=0; i < users.length; i++) {
    database.findFollowers(users[i].screen_name, function(x,followers){
      data[x].followers = followers;
      db.merge(data[x]);
      console.log(x);
    }.bind(null,i));
  }
  
  var max = users.length;
  //getTweets(database, users, i, max);
});

