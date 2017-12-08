'use strict';

let isAuth = (AuthService) => new Promise((resolve, reject) => {
  if (AuthService.isAuthenticated()) {
    resolve();
  } else {
    reject();
  }
});

app.run(function ($location, $rootScope, FIREBASE_CONFIG, AuthService) {
  firebase.initializeApp(FIREBASE_CONFIG);

  //watch method that fires on change of a route.  3 inputs. 
  //event is a change event
  //currRoute is information about your current route
  //prevRoute is information about the route you came from
  $rootScope.$on('$routeChangeStart', function (event, currRoute, prevRoute) {
    // checks to see if there is a current user
    var logged = AuthService.isAuthenticated();

    var appTo;

    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
      // appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }

    //if not on /auth page AND not logged in redirect to /auth
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
      // $location.path('/login');
    }
  });
});


app.config(function ($routeProvider) {

  $routeProvider
    .when("/battlePage", {
      templateUrl: "partials/battle/battlePage.html",
      controller: "BattleCtrl",
      resolve: { isAuth }
    })
    .when("/pastBattles", {
      templateUrl: "partials/battle/pastBattles/html",
      controller: "PastBattleCtrl",
      resolve: { isAuth }
    })
    .when("/userLibrary", {
      templateUrl: "partials/profile/userLibrary.html",
      controller: "LibraryCtrl",
      resolve: { isAuth }
    })
    .when("/userProfile", {
      templateUrl: "partials/profile/userProfile.html",
      controller: "ProfileCtrl",
      resolve: { isAuth }
    })
    .when("/editUnit/:id", {
      templateUrl: "partials/units/editUnit.html",
      controller: "EditUnitCtrl",
      resolve: { isAuth }
    })
    .when("/newUnit1", {
      templateUrl: "partials/units/newUnitCharacteristics.html",
      controller: "NewUnitCharacteristicsCtrl",
      resolve: { isAuth }
    })
    .when("/newUnit2", {
      templateUrl: "partials/units/NewUnitDescription.html",
      controller: "NewUnitDescriptionCtrl",
      resolve: { isAuth }
    })
    .when("/unitDetails/:id", {
      templateUrl: "partials/units/unitDetails.html",
      controller: "UnitDetailsCtrl",
      resolve: { isAuth }
    })
    .when("/auth", {
      templateUrl: "partials/auth.html",
      controller: "AuthCtrl"
    })
    
    .otherwise("/auth");
});

