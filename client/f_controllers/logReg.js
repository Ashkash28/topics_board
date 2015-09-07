myAppModule.controller('logRegController', function($scope, $location, userFactory, $routeParams, localStorageService)
{
	$scope.user = localStorageService.get('user');

	$scope.profile = $routeParams.id;

	$scope.addUser = function(isValid) 
	{
		if(isValid)
		{
			userFactory.registerUser($scope.newUser, function(res)
			{
				$scope.success = res;
			})
				// $scope.newUser = {};
		}
	}

	$scope.loginUser = function(isValid) 
	{
		if(isValid)
		{
			userFactory.loginUser($scope.returnUser, function(data)
			{
				if(data.error != undefined)
				{
					$scope.error = data.error;
				}
				else
				{
					localStorageService.set('user', data);
					$location.path('/dashboard');
				}
			})
		}
	}
})