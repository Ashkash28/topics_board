myAppModule.controller('loggedInController', function($scope, $location, userFactory, $routeParams, localStorageService)
{
	$scope.user = localStorageService.get('user');

	userFactory.getCounters($scope.user.id, function(data)
	{
		$scope.user = data;
	})

	$scope.logout = function(){
		console.log('hi');
		localStorageService.remove('user')
		$location.path('/');
	}

})