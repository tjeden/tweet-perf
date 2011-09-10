var database_module = require('./database-mysql.js');
var database = new database_module.Database();

console.log('Start migrate followers');

var users = [];
var limit = 0;

database.findUsers( function(users) {

  console.log('Users get. users.lenth:' + users.length);
  console.log('Start migrate followers');

  for (var i=0; i < users.length; i++) {
    database.findFollowers(users[i].screen_name, function(x,followers){
      console.log(x);
      //TODO migrate followers
      // x - numer usera
      // followers - tablca idików
    }.bind(null,i));
  }
  
  var max = users.length;
  //getTweets(database, users, i, max);
});

