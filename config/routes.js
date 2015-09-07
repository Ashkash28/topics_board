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
//Creates a new User
	app.post('/newUser', function(req, res)
	{
		var now = new Date();
		var jsonDate = now.toJSON();

		var sqlpost = {username: req.body.username, password: req.body.password, created_at: jsonDate, post_counter: 0, topic_counter: 0, comment_counter: 0};

		var query = connection.query("INSERT INTO users SET ?", sqlpost, function(err, result)
		{
			if(err)
				throw err;
			else
				res.json("User has been registered!")
		})
		
	})
//Returns Login user info
	app.post('/loginUser', function(req, res)
	{
		var sqlpost = {username: req.body.username};
		console.log(sqlpost);
		var query = connection.query("SELECT * FROM users WHERE username = ?", req.body.username, function(err, result)
		{
			if(err)
			{
				console.log(err);
			}
			else if(result[0] != undefined)
			{
				console.log(result)
				if(result[0].password === req.body.password)
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
//Creates a topic
	app.post('/addTopic/:id', function(req, res)
	{
		var now = new Date();
		var jsonDate = now.toJSON();

		var sqlpost = {name: req.body.name, description: req.body.description, category: req.body.category, user_id: req.params.id, post_counter: 0, created_at: jsonDate};

		var query = connection.query("INSERT INTO topics SET ?", sqlpost, function(err, result)
		{
			if(err)
				console.log(err);
			else
				console.log(result);
		})
	})
//Retrieves all topic info
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
//Retrieves single topic info
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
//Retrieves all posts
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
//Retrieves all comments
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
//Creates a post
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
//Creates a comment
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
//Adds upvote
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
//Adds downvote
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
//Increases topic's post counter
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
//Increases user's post counter
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
//Increases user's comment counter
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
//Increases user's topic counter
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
//Retrieves all user's counters
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

}