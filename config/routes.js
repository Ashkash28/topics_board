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
		console.log(sqlpost);
		var query = connection.query("SELECT * FROM users WHERE username = ?", mysql.escape(req.body.username), function(err, result)
		{
			if(err)
			{
				console.log(err);
			}
			else if(result[0] != undefined)
			{
				console.log(result)
				if(result[0].password === mysql.escape(req.body.password))
				{
					res.json(result[0]);
				}
				else
				{
					res.json({error:'A user with those credentials does not exist'});
				}
			}
			else
			{
				res.json({error:'A user with those credentials does not exist'});
			}
		})
	})

	app.post('/addTopic/:id', function(req, res)
	{
		var now = new Date();
		var jsonDate = now.toJSON();

		var sqlpost = {name: mysql.escape(req.body.name), description: mysql.escape(req.body.description), category: mysql.escape(req.body.category), user_id: req.params.id, post_counter: 0, created_at: jsonDate};

		var query = connection.query("INSERT INTO topics SET ?", sqlpost, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
		})
	})

	app.get('/getTopics', function(req,res)
	{
		var query = connection.query("SELECT topics.*, users.username FROM topics LEFT JOIN users ON users.id = topics.user_id", function(err, result)
		{
			if(err)
				console.log(err);
			else
				res.json(result);
		})
		console.log(query.sql);
	})

	app.post('/getaTopic', function(req, res)
	{
		// var sqlpost = {id: req.body.id};

		var query = connection.query("SELECT topics.*, users.username FROM topics LEFT JOIN users ON users.id = topics.user_id WHERE topics.id = " + req.body.id, 
									  function(err, result)
		{
			if(err)
				console.log(err);
			else
				res.json(result[0]);
		})
	})

	app.post('/getPosts', function(req, res)
	{
		var query = connection.query("SELECT posts.text, posts.id, posts.upvote, posts.downvote, users.username FROM posts LEFT JOIN users ON users.id = posts.user_id LEFT JOIN topics ON topics.id = posts.topic_id WHERE posts.topic_id = " + req.body.id, function(err, result)
		{
			if(err)
				console.log(err);
			else
				res.json(result);
		})
	})

	app.get('/getComments', function(req, res)
	{
		var query = connection.query("SELECT comments.text, comments.post_id, users.username FROM comments LEFT JOIN users ON users.id = comments.user_id LEFT JOIN posts ON posts.id = comments.post_id WHERE comments.post_id = posts.id", function(err, result)
		{
			if(err)
				console.log(err);
			else
				res.json(result);
		})
	})

	app.post('/addPost/:id', function(req, res)
	{
		var now = new Date();
		var jsonDate = now.toJSON();

		var sqlpost = {topic_id: req.body.id.id, text: req.body.text.text, user_id: req.params.id, upvote: 0, downvote: 0};

		var query = connection.query("INSERT INTO posts SET ?", sqlpost, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
		})
	})

	app.post('/addComment/:id', function(req, res)
	{
		console.log(req.params.id);
		console.log(req.body);
		var now = new Date();
		var jsonDate = now.toJSON();

		var sqlpost = {post_id: req.body.id, text: req.body.text.text, user_id: req.params.id};

		var query = connection.query("INSERT INTO comments SET ?", sqlpost, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
		})
	})

	app.post('/upvote/:id', function(req, res)
	{
		var query = connection.query("UPDATE posts SET upvote = upvote + 1 WHERE id = ?", req.params.id, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
		})
	})

	app.post('/downvote/:id', function(req, res)
	{
		var query = connection.query("UPDATE posts SET downvote = downvote - 1 WHERE id = ?", req.params.id, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
		})
	})

	app.post('/inctopct', function(req, res)
	{
		var query = connection.query('UPDATE topics SET post_counter = post_counter + 1 WHERE topics.id = ?', req.body.id, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
		})
	})

	app.post('/incup/:id', function(req, res)
	{
		var query = connection.query('UPDATE users SET post_counter = post_counter + 1 WHERE users.id = ?', req.params.id, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
		})
	})

	app.post('/incuc/:id', function(req, res)
	{
		var query = connection.query('UPDATE users SET comment_counter = comment_counter + 1 WHERE users.id = ?', req.params.id, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
		})
	})

	app.post('/incut/:id', function(req, res)
	{
		var query = connection.query('UPDATE users SET topic_counter = topic_counter + 1 WHERE users.id = ?', req.params.id, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
		})
	})

	app.post('/getcounters/:id', function(req, res)
	{
		var query = connection.query('SELECT * FROM users WHERE users.id = ?', req.params.id, function(err, result)
		{
			if(err)
				console.log(err);
			else
				res.json(result[0])
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