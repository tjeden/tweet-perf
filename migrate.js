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
    }.bind(null,i));
  }
  
  var max = users.length;
  //getTweets(database, users, i, max);
});

function getTweets(database, users, i, max) {
    console.log(i);
    database.selectTweets(users[i].screen_name, function(tweets){
      // insert user into couchdb
      // TODO insert users[i] + tweets
      if (i < max) 
        getTweets(database, users, ++i, max);
      else
        console.log('Statuses migrated');
    });
  
}

