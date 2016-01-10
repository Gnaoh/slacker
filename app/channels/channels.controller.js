angular.module('slackerChat')
  .controller('ChannelsCtrl', function($state, Auth, Users, profile, channels){
    var channelsCtrl = this;

    channelsCtrl.profile = profile //Set channels and profile to the resolved dependencies from the router
    channelsCtrl.channels = channels;

    channelsCtrl.logout = function(){ //allow our users to log out, returning them to the home state.
    	Auth.$unauth();
    	$state.go('home');
    };

    channelsCtrl.newChannel = {
    	name: ''
    };

		channelsCtrl.createChannel = function(){
		  channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(){ //The $add function on the channels $firebaseArray provides similar functionality to the .push() function on a Javascript Array
		    channelsCtrl.newChannel = {
		      name: ''
		    };
		  });
		};
  });