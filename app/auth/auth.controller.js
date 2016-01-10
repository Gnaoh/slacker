angular.module('slackerChat') //controller to use with our login and registration forms.
	.controller('AuthCtrl', function(Auth, $state){
		var authCtrl = this;

		authCtrl.user = {
			email: '',
			password: '',
		};

		authCtrl.login = function() {
			Auth.$authWithPassword(authCtrl.user).then(function (auth){
				$state.go('home'); //When authentication is successful, send  user to the home state. When fails, set the error on our controller to display the error message.
			}, function (error){
				authCtrl.error = error;
			});
		};

		authCtrl.register = function (){
			Auth.$createUser(authCtrl.user).then(function (user){
				authCtrl.login();
			}, function (error){
				authCtrl.error = error;
			});
		};

	});

