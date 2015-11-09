// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var WudApp = angular.module('WudApp', ['ionic', 'rzModule', 'ngIOS9UIWebViewPatch']);

WudApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

WudApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.results', {
      url: "/results",
      views: {
        'results-tab': {
          templateUrl: "templates/results.html",
          controller : 'SearchCtrl'
        }
      }
    })
    .state('tabs.details', {
      url: "/details/:id",
      views: {
        'results-tab': {
          templateUrl: "templates/detail.html",
          controller : 'DetailCtrl'
        }
      }
    })
    .state('tabs.options', {
      url: "/options",
      views: {
        'options-tab': {
          templateUrl: "templates/options.html",
          controller : 'OptionsCtrl'
        }
      }
    })
    .state('tabs.favorites', {
      url: "/favorites",
      views: {
        'favorites-tab': {
          templateUrl: "templates/favorites.html",
          controller : 'FavoritesCtrl'
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    });

    $urlRouterProvider.otherwise("tab/results");
    
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');

});