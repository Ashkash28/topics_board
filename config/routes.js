var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'topics_board',
  dateStrings: false,

});

connection.connect(function(err){
  if(!err)
    console.log('connection worked!');
  else
    console.log('connection failed', err);
});

module.exports = function(app){

	app.post('/newUser', function(req, res)
	{
		var now = new Date();
		var jsonDate = now.toJSON();


		var sqlpost = {username: mysql.escape(req.body.username), password: mysql.escape(req.body.password), created_at: jsonDate};

		var query = connection.query("INSERT INTO users SET ?", sqlpost, function(err, result)
		{
			if(err)
				throw err;
			else
				res.json("User has been registered!")
		})
		
	})

	app.post('/loginUser', function(req, res)
	{
		var sqlpost = {username: mysql.escape(req.body.username)};

		var query = connection.query("SELECT * FROM users WHERE ?", sqlpost, function(err, result)
		{
			if(err)
				res.json({error:'A user with those credentials does not exist'});
			else
				if(result[0].password === mysql.escape(req.body.password))
					res.json(result[0]);
				else
					res.json({error:'A user with those credentials does not exist'});
		})
	})



// OLD CODE BELOW!!!!!!!!!!!!!!!!!!!!

// //get all users
// 	app.get('/users', function(req, res){
// 		// console.log('hello2');
// 		user_controller.getUsers(req, res);
// 	})

// // //add a new user 
// 	app.post('/user', function(req, res)
// 	{
// 		user_controller.addUser(req, res);
// 	})

// //add a new topic
// 	app.post('/topic', function(req, res){
// 		// console.log('in the routes', req.body.username);

// 		user_controller.addTopic(req, res);

// 		// user_controller.updateUserpost(req, res);
// 	})

// 	app.post('/user_topic', function(req, res){
// 		user_controller.updateUsertopic(req, res);

// 	})

// 	app.get('/topics', function(req, res){
// 		user_controller.getTopics(req, res);
// 	})

// //profile page
// 	app.post('/profile/:id', function(req, res){
// 		user_controller.getProfile(req, res);
// 	})

// //wall page
// 	app.post('/single_topic/:id', function(req, res){
// 		user_controller.getoneTopic(req, res);
// 	})

// // post stuff

// 	app.put('/post/:id', function(req, res){
// 		// console.log(req.body);
// 		user_controller.addPost(req, res);
// 	})


// 	app.get('/posts/:id', function(req, res){
// 		user_controller.getPosts(req, res);
// 	})

// 	app.post('/user_post', function(req, res){
// 		console.log('IN ROUTE', req.body);
// 		user_controller.updateUserpost(req, res);
// 	})

// 	app.post('/topic_post', function(req, res){
// 		console.log('hihiihihih');
// 		user_controller.updateTopicpost(req, res);
// 	})

// 	app.post('/upvote', function(req, res){
// 		user_controller.upvote(req, res);
// 	})

// 	app.post('/downvote', function(req, res){
// 		user_controller.downvote(req, res);
// 	})

// 	//COMMENT STUFF

// 	app.put('/comment/:id', function(req, res){
// 		user_controller.addComment(req, res);
// 	})

// 	app.get('/comments/:id', function(req, res){
// 		user_controller.getComments(req, res);
// 	})

// 	app.post('/user_comment', function(req, res){
// 		user_controller.updateUsercomment(req, res);

// 	})
}