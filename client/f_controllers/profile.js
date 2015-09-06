myAppModule.controller('profileController', function($scope, $location, userFactory, $routeParams, localStorageService)
{
	$scope.user = '';
	$scope.profile = $routeParams.id;

	$scope.addUser = function(isValid) 
	{
		if(isValid)
		{
			userFactory.registerUser($scope.newUser, function(data)
			{
				$scope.success = data;
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
				
			})
		}
	}
})