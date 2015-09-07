myAppModule.controller('profileController', function($scope, $location, userFactory, $routeParams, localStorageService)
{
	$scope.user = localStorageService.get('user');

	userFactory.getCounters($scope.user.id, function(data)
	{
		$scope.user = data;
	})

	$scope.logout = function(){
		if(confirm("Are you sure about that?") == true)
		{
			localStorageService.remove('user')
			$location.path('/');
		}
	}

})