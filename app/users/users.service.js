angular.module('slackerChat')// this factory will provide us with the ability to get either a specific user's data, or to get a list of all of our users.
	.factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){
		var usersRef = new Firebase(FirebaseUrl+'users');
		var users = $firebaseArray(usersRef);

		var Users = {
			getProfile: function(uid){ //getProfile(uid) allows us to get a $firebaseObject of a specific user's profile, while all returns a $firebaseArray of all the users.
				return $firebaseObject(usersRef.child(uid));
			},
			getDisplayName: function(uid){ //getDisplayName(uid) is a helper function that returns a user's displayName when given a uid
				channelsCtrl.getDisplayName = Users.getDisplayName;
				return users.$getRecord(uid).displayName;
			},
			getGravatar: function(uid){ //return the url to a user's gravatar image when provided a uid.
				channelsCtrl.getGravatar = Users.getGravatar;
				return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
			},
			all: users
		};


		return Users;
	});