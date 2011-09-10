var database_module = require('./database-mysql.js');
var database = new database_module.Database();

console.log('Start migrate users');

var users = [];

database.findUsers( function(results) {
  users = results;
});

console.log('Users migrated');

console.log('Start migrate statuses');
console.log('Statuses migrated');
