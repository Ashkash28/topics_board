myAppModule.controller('usersController', function($scope, $location, userFactory, $routeParams, localStorageService)
{
	$scope.users = [];
	$scope.user = '';
	$scope.topics = [];
	$scope.topic = '';
	$scope.posts = [];
	$scope.person = localStorageService.get('name');



	// userFactory.getoneUser(function(data){
	// 	$scope.user = data;
	// })


	userFactory.getTopics(function(data){
			$scope.topics = data;
			// console.log(data);
		})

	$scope.addUser = function(){

		userFactory.addUser($scope.newUser, function(data)
		{	
			localStorageService.set('name', data.name);
			$scope.name = data.name;
			$scope.newUser = {};
			$location.path('/dashboard');
		})
	}

	$scope.addTopic = function(data){
		console.log('hello');
		data.username = localStorageService.get('name');
		console.log('hello');
		userFactory.addTopic(data, function(data)
		{	

			$scope.topics = data;
			$scope.topics = {};

			userFactory.getTopics(function(data){
				$scope.topics = data;
				console.log(data);
			})

		})

		userFactory.updateUserTopic(data, function(data)
		{	
			// console.log('hi1');

			$scope.topics = data;
			$scope.topics = {};

		})


	}

	



})