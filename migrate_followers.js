var database_module = require('./database-mysql.js');
var database = new database_module.Database();

var cradle = require('cradle');
var db = new(cradle.Connection)().database('tweet-couchdb');

console.log('Start migrate followers');

var users = [];
var limit = 0;

database.findUsers( function(users) {
  console.log('Users get. users.lenth:' + users.length);
  console.log('Start migrate followers');

  for (var i=0; i < users.length; i++) {
    database.findFollowers(users[i].screen_name, function(x,followers){
      db.merge(x+'', {"followers": followers},function(err, res){});
      console.log(x);
      //TODO migrate followers
      // x - numer usera
      // followers - tablca idików
    }.bind(null,i));
  }
  
  var max = users.length;
  //getTweets(database, users, i, max);
});