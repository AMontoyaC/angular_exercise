angular.module('userController', [])
	.controller('mainController', ['$scope','$http','Users', function($scope, $http, Users) {
		$scope.formData = {};
		$scope.showError = false;
		$scope.messageError = '';
		$scope.filter = '';

		$scope.getUsers = function () {
			$scope.users = null;
			$http.get('/api/users/'+$scope.val_checkbox)
				.then(function(response) {
					$scope.users =  response.data;
					$scope.showError = false;
			}).catch(function (error) {
				$scope.messageError = error.statusText;
				$scope.showError = true;
			});
		};

		//btn show users
		$scope.showUsers = function () {
			$scope.users = null;
			$http.get('/api/users/true')
				.then(function(response) {
					$scope.users =  response.data;
					$scope.showError = false;
			}).catch(function (error) {
				$scope.messageError = error.statusText;
				$scope.showError = true;
			});
		};

		$scope.setOptionDropdown = function (option){
			$scope.filter = option;
		}

		$scope.filterByOption = function (){
			console.log("with input:",$scope.filter_input);
			switch($scope.filter){
				case 'name':
					filterFunction('/api/users/name/',$scope.filter_input);
					break;
				case 'username':
					filterFunction('/api/users/username/',$scope.filter_input);
					break;
				case 'status':
					filterFunction('/api/users/status/',$scope.filter_input);
					break;
			}
		}

		function filterFunction(url, parameter){
			$http.get(url + parameter)
				.then(function(response) {
					$scope.users =  null;
					$scope.users =  response.data;
					$scope.showError = false;
			}).catch(function (error) {
				$scope.users =  null;
				$scope.messageError = error.statusText;
				$scope.showError = true;
			});
		}

		$scope.addUser = function() {
			$scope.formData = {name: $scope.add_name, username: $scope.add_username, status: $scope.add_status};
			if ($scope.formData.name != undefined && $scope.formData.username != undefined) {
				Users.create($scope.formData)
					.success(function(data) {
						$scope.formData = {};
						$scope.users = data;
						$scope.add_name = '';
						$scope.add_username = '';
						$scope.add_status = 'inactive';
					});
			}
		};
	}]);