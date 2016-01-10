'use strict';

/**
 * @ngdoc overview
 * @name slackerApp
 * @description
 * # slackerApp
 *
 * Main module of the application.
 */
angular
  .module('slackerChat', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('channels');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home'); //The .catch function is a shorthand for handling promises if we don't want to provide a success handler. 
            });
          },
          profile: function(Users, Auth){ //The profile dependency also ensures authentication, but resolves to the user's profile using the getProfile function we created in our Users service. 
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('channels', {
        url: '/channels',
        controller: 'ChannelsCtrl as channelsCtrl',
        templateUrl: 'channels/index.html',
        resolve: { //We're resolving two dependencies here: channels, which is promising our $firebaseArray of channels, and profile, which is a lot like the profile dependency in the profile state. We're making sure that the display name is set, otherwise reroute to the home state.
          channels: function (Channels){
            return Channels.$loaded();
          },
          profile: function ($state, Auth, Users){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile){
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error){
              $state.go('home');
            });
          }
        }
      })
      .state('channels.create', {
        url: '/create',
        templateUrl: 'channels/create.html',
        controller: 'ChannelsCtrl as channelsCtrl'
      })
    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://slackerapp.firebaseio.com/');
