require('./database-mysql.js');
console.log('bb');

for (i = 0; i < 4; i++) {
  clients[i].query(
  'SELECT * FROM ' + USERS,
  function(err, results, fields) {
      console.log(results);
  });
}
