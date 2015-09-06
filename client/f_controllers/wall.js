myAppModule.controller('wallController', function($scope, $location, userFactory, $routeParams, localStorageService)
{
	$scope.topic = '';

	$scope.wall = $routeParams.id;


	// console.log($scope.wall);

	userFactory.getoneTopic($routeParams.id, function(data){
		// console.log(data);
		$scope.topic = data;
		// console.log(data);
	})

	userFactory.getPosts($routeParams.id, function(data){
		$scope.posts = data;
		console.log('POST STUFF', data);
		// console.log(data[0]._id);
		for(var i = 0; i<data.length; i++){
			// console.log(data[1]);

			userFactory.getComments(data[i]._id, function(output){
				console.log('here is the output', output);
				$scope.comments = output;
				// console.log('POST UPDATE', data);
			})
		}

		// $scope.comments = output;
	})

	$scope.addPost = function(id, data){
		// console.log(data);
		// console.log(id)
		data.username = localStorageService.get('name');
		// console.log('hi', data);
		// console.log('why', data2);
		userFactory.addPost(id, data, function(data)
		{
			$scope.posts = data;
			$scope.posts = {};
			// console.log('POST STUFF', data);

			userFactory.getPosts(id, function(data){
				$scope.posts = data;
				// console.log('POST UPDATE', data);
			})
		})
		// console.log(data);
		userFactory.updateUSERPostCounter(data, function(data)
		{
			$scope.posts = data;
			$scope.posts = {};
		})

		// console.log(id);

		userFactory.updateTOPICPostCounter(id, function(data)
		{
			$scope.posts = data;
			$scope.posts = {};
		})

	}

	//UPVOTE

	$scope.upvote = function(id, data){
		console.log(id);
		console.log('data', data);

		userFactory.upvote(id, data, function(data)
		{
			$scope.posts = data;

			userFactory.getPosts($routeParams.id, function(data){
				$scope.posts = data;

			})

		})
	}

	//DOWNVOTE

	$scope.downvote = function(id, data){
		console.log(id);
		userFactory.downvote(id, data, function(data)
		{
			$scope.posts = data;

			userFactory.getPosts($routeParams.id, function(data){
				$scope.posts = data;

			})

		})
	}


	$scope.addComment = function(id, data){
		// console.log(data);
		// console.log(id)
		data.username = localStorageService.get('name');
		// console.log('hi', data);
		// console.log('why', data2);
		userFactory.addComment(id, data, function(data)
		{
			$scope.comments = data;
			$scope.comments = {};
			// console.log('POST STUFF', data);

			userFactory.getComments(id, function(data){
				$scope.comments = data;
				// console.log('POST UPDATE', data);
			})
		})
		// console.log(data);
		userFactory.updateUSERCommentCounter(data, function(data)
		{
			$scope.comments = data;
			$scope.comments = {};
		})

		// console.log(id);

	}

	$scope.logout = function(){
		localStorageService.remove()
	}




})