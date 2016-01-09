angular.module('slackerApp') //factory will return the $firebaseAuth service associated with our Firebase.
	.factory ('Auth', function($firebaseAuth, FirebaseUrl){
		var ref = new Firebase(FirebaseUrl);
		var auth = $firebaseAuth(ref);

		return auth;
	});
