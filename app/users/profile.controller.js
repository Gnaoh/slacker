angular.module('slackerChat')
	.controller('ProfileCtrl', function($state, md5, auth, profile){
		var profileCtrl = this;

		profileCtrl.profile = profile;

		profileCtrl.updateProfile = function(){ //getting the current user's email from the auth data that was resolved from our router, hashing it and setting to emailHash on profile
			profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
			profileCtrl.profile.$save().then(function(){
				$state.go('channels');//send the user to the channels state after a successful save.
			});
		};
	})