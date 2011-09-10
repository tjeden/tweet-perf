var database_module = require('./database-mysql.js');
var database = new database_module.Database();

console.log('Start migrate users');

var users = [];
var limit = 0;

database.findUsers( function(users) {

  console.log('Users migrated. users.lenth:' + users.length);
  console.log('Start migrate statuses');

  for (var i=0; i < users.length; i++) {
    database.selectTweets(users[i].screen_name, function(x,tweets){
      console.log(x);
      // insert user into couchdb
      // TODO insert users[x] + tweets
      // x - id usera 
      // tweets - tablica twittow
    }.bind(null,i));
  }
});

