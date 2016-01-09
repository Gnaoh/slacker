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
  .module('slackerApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html'
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl'
        templateUrl: 'auth/login.html'
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl'
        templateUrl: 'auth/register.html'
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://slackerapp.firebaseio.com/');
