myAppModule.factory('userFactory', function($http){
	var users = [];
	var user = '';
	var topics = [];
	var posts = [];
	var comments = [];
	var upvote = '';
	var downvote = '';


	var factory = {};

	factory.registerUser = function(req, callback)
	{
		$http.post('/newUser', req).success(function(res)
		{
			callback(res);
		})
	}

	factory.loginUser = function(req, callback)
	{
		$http.post('/loginUser', req).success(function(res)
		{
			callback(res);
		})
	}

	factory.addTopic = function(req, req2, callback)
	{
		console.log(req, req2);
		$http.post('/addTopic/'+ req2, req).success(function(res)
		{
			console.log(res);
		})
	}

	factory.getTopics = function(callback)
	{
		$http.get('/getTopics').success(function(res)
		{
			callback(res);
		})
	}

	factory.getaTopic = function(req, callback)
	{
		$http.post('/getaTopic', req).success(function(res)
		{
			callback(res);
		})
	}

	factory.getPosts = function(req, callback)
	{
		$http.post('/getPosts', req).success(function(res)
		{
			callback(res);
		})
	}

	factory.getComments = function(callback)
	{
		$http.get('/getComments').success(function(res)
		{
			callback(res);
		})
	}

	factory.addPost = function(req1, req2, req3, callback)
	{
		$http.post('/addPost/' + req3, {id: req1, text: req2}).success(function(res)
		{

		})
	}

	factory.addComment = function(req1, req2, req3, callback)
	{
		$http.post('/addComment/'+ req3, {id: req1, text: req2}).success(function(res)
		{

		})
	}

	factory.upVote = function(req, callback)
	{
		$http.post('/upvote/'+ req).success(function(res)
		{

		})
	}

	factory.downVote = function(req, callback)
	{
		$http.post('/downvote/'+ req).success(function(res)
		{

		})
	}

	factory.incTopCt = function(req, callback)
	{
		$http.post('/inctopct', req).success(function(res)
		{

		})
	}

	factory.incUP = function(req, callback)
	{
		$http.post('/incup/' + req).success(function(res)
		{

		})
	}

	factory.incUC = function(req, callback)
	{
		$http.post('/incuc/' + req).success(function(res)
		{

		})
	}

	factory.incUT = function(req, callback)
	{
		$http.post('/incut/' + req).success(function(res)
		{

		})
	}

	factory.getCounters = function(req, callback)
	{
		$http.post('/getcounters/' + req).success(function(res)
		{
			callback(res);
		})
	}

	// OLD CODE BELOW!!!!!!!!!!!!!!!!!!!!!!!!!!!

	// factory.getUsers = function(callback){
	// 	$http.get('/users').success(function(data){
	// 		users = data;
	// 		callback(users);
	// 	})
	// }

	// factory.getoneUser = function(callback){
	// 	callback(user);
	// }

// 	factory.getTopics = function(callback){
// 		$http.get('/topics').success(function(data){
// 			topics = data;
// 			// console.log(data);
// 			callback(topics);
// 		})	
// 	}

// 	factory.updateUserTopic = function(data, callback){
// 		// console.log('hi from factory', data);
// 		$http.post('/user_topic', data).success(function(data){
// 			console.log('successfully updated user topic counter');
// 		})
// 	}

	

// 	factory.addUser = function(data, callback){
// 		$http.post('/user', data).success(function(data){
// 			users.push(data);
// 			user = data;
// 			callback(user);

// 		})
		
// 	}

// 	factory.addTopic = function(data, callback){
// 		$http.post('/topic', data).success(function(data){
// 			topics.push(data);
// 			topics = data;
// 			callback(topics);

// 		})
		
// 	}

	

// 	factory.getProfile = function(data, callback){
// 		$http.post('/profile/' + data).success(function(data){
// 			profile = data;
// 			callback(profile);
// 		})	
// 	}

// //to get information about one topic for the wall
// 	factory.getoneTopic = function(data, callback){
// 		$http.post('/single_topic/'+ data).success(function(data){
// 			callback(data);
// 		})
// 	}

// //adds a post to the wall
// 	factory.addPost = function(id, data, callback){
// 		console.log('factory', id);
// 		console.log('factory', data);
// 		$http.put('/post/'+ id, data).success(function(data){
// 			posts.push(data);
// 			callback(data);
// 		})
// 	}

// 	factory.getPosts = function(id, callback){
// 		// console.log(id);
// 		$http.get('/posts/'+ id).success(function(data){
// 			posts = data;
// 			// console.log(data);
// 			callback(posts);
// 		})	
// 	}

// 	factory.updateUSERPostCounter = function(data, callback){
// 		// console.log('HERIEHROIEHWOIJ', data);
// 		$http.post('/user_post', data).success(function(data){
// 			console.log('successfully updated user post count');
// 		})
// 	}

// 	factory.updateTOPICPostCounter = function(id, callback){
// 		// console.log('id', id);
// 		$http.post('/topic_post', {result: id}).success(function(data){
// 			console.log('successfully updated the topic post count');
// 		})
// 	}

// 	factory.upvote = function(id, data, callback){
// 		console.log(data);
// 		$http.post('/upvote', {result: id}).success(function(output){
// 			console.log(data);
// 			console.log(output);
// 			data++;
// 			// data++;
// 			upvote = output;
// 			console.log(data);
// 			callback(data);
// 		})
// 	}

// 	factory.downvote = function(id, data, callback){
// 		$http.post('/downvote', {result: id}).success(function(output){
// 			data++;
// 			downvote = output;
// 			callback(data);
// 		})
// 	}

// ///COMMENT STUFF

// 	factory.addComment = function(id, data, callback){
// 		console.log('factory', id);
// 		console.log('factory', data);
// 		$http.put('/comment/'+ id, data).success(function(data){
// 			comments.push(data);
// 			callback(data);
// 		})
// 	}

// 	factory.getComments = function(id, callback){
// 		// console.log(id);
// 		$http.get('/comments/'+ id).success(function(data){
// 			comments.push(data);
// 			console.log('COMMENTS', data);
// 			callback(comments);
// 		})	
// 	}

// 	factory.updateUSERCommentCounter = function(data, callback){
// 		// console.log('HERIEHROIEHWOIJ', data);
// 		$http.post('/user_comment', data).success(function(data){
// 			console.log('successfully updated user post count');
// 		})
// 	}




	return factory;
})