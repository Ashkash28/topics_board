myAppModule.controller('wallController', function($scope, $location, userFactory, $routeParams, localStorageService)
{
	$scope.topic = '';
	$scope.user = localStorageService.get('user');

	$scope.wall = $routeParams.id;


	userFactory.getaTopic($routeParams, function(res)
	{
		$scope.topic = res;
	})

	userFactory.getPosts($routeParams, function(res)
	{
		$scope.posts = res;
	})

	userFactory.getComments(function(res)
	{
		$scope.comments = res;
	})

	$scope.addPost = function(data)
	{
		userFactory.addPost($routeParams, data, $scope.user.id, function(res)
		{

		})

		userFactory.getPosts($routeParams, function(res)
		{
			$scope.posts = res;
		})

		userFactory.incTopCt($routeParams, function(res)
		{
			
		})

		userFactory.incUP($scope.user.id, function(res)
		{

		})
	}

	$scope.addComment = function(id, data)
	{
		console.log('cont', id, data);
		userFactory.addComment(id, data, $scope.user.id, function(res)
		{

		})

		userFactory.getComments(function(res)
		{
			$scope.comments = res;
		})

		userFactory.incUC($scope.user.id, function(res)
		{
			
		})
	}

	$scope.upVote = function(postId)
	{
		userFactory.upVote(postId, function(res)
		{

		})

		userFactory.getPosts($routeParams, function(res)
		{
			$scope.posts = res;
		})
	}

	$scope.downVote = function(postId)
	{
		userFactory.downVote(postId, function(res)
		{
			
		})

		userFactory.getPosts($routeParams, function(res)
		{
			$scope.posts = res;
		})
	}

	$scope.logout = function(){
		if(confirm("Are you sure about that?") == true)
		{
			localStorageService.remove('user')
			$location.path('/');
		}
	}

})