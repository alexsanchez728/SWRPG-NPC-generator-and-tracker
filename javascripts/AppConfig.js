'use strict';




app.config(function ($routeProvider) {

  $routeProvider
    .when("/battlePage", {
      templateUrl: "partials/battle/battlePage.html",
      controller: "BattleCtrl"
    })
    .when("/pastBattles", {
      templateUrl: "partials/battle/pastBattles/html",
      controller: "PastBattleCtrl"
    })
    .when("/userLibrary", {
      templateUrl: "partials/profile/userLibrary.html",
      controller: "LibraryCtrl"
    })
    .when("/userProfile", {
      templateUrl: "partials/profile/userProfile.html",
      controller: "ProfileCtrl"
    })
    .when("/editUnit:id", {
      templateUrl: "partials/units/editUnit.html",
      controller: "EditUnitCtrl"
    })
    .when("/newUnit1", {
      templateUrl: "partials/units/newUnitCharacteristics.html",
      controller: "NewUnitCharacteristicsCtrl"
    })
    .when("/newUnit2", {
      templateUrl: "partials/units/NewUnitDescription.html",
      controller: "NewUnitDescriptionCtrl"
    })
    .when("/unitDetails:id", {
      templateUrl: "partials/unitDetails.html",
      controller: "UnitDetailsCtrl"
    })
    .when("/auth", {
      templateUrl: "partials/auth.html",
      controller: "AuthCtrl"
    })
    .otherwise("/auth");
});

