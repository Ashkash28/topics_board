myAppModule.controller('topicsController', function($scope, $location, userFactory, $routeParams, localStorageService)
{
	$scope.users = [];
	$scope.user = '';
	$scope.topics = [];
	$scope.topic = '';
	$scope.posts = [];
	$scope.user = localStorageService.get('user');


	userFactory.getTopics(function(res)
	{
		$scope.topics = res;
	})

	$scope.addTopic = function(req)
	{
		userFactory.addTopic(req, $scope.user.id, function(res)
		{

		})

		userFactory.getTopics(function(res)
		{
			$scope.topics = res;
		})

		userFactory.incUT($scope.user.id, function(res)
		{
			
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