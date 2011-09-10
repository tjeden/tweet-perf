var cradle = require('cradle');

var db = new(cradle.Connection)().database('tweet-couchdb');

db.exists(function (err, exists) {
	if (err) {
	  console.log('error', err);
	} else if (exists) {
	  console.log('the force is with you.');
	} else {
	  console.log('database does not exists.');
	  db.create();
	}
});

var users = [
	{
		user_id: {},
		screen_name: {},
		statuses: {},
		followers: {},
		created_at: {},
		updated_at: {}
	},
	{
		user_id: {},
		screen_name: {},
		statuses: {},
		followers: {},
		created_at: {},
		updated_at: {}
	}
];

db.save(users, function(err, res){
	if(!err){
		console.log('users saved');
	} else {
		console.log('error', err);
	}
});
