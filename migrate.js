var database_module = require('./database-mysql.js');
var database = new database_module.Database();

console.log('Start migrate users');

var users = [];

database.findUsers( function(users) {

  console.log('Users migrated. users.lenth:' + users.length);
  console.log('Start migrate statuses');

  for (var i=0; i < users.length; i++) {
    database.selectTweets(users[i].screen_name, function(){
      // insert user into couchdb
      console.log('Statuses migrated');
      process.exit();
    });
  }
});
