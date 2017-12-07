'use strict';

app.controller("BattleCtrl", function ($location, $rootScope, $scope, BattleReadyUnitsService, StatesService) {

  const getMyBattleReadyUnits = () => {
    BattleReadyUnitsService.getMyBattleReadyUnits($rootScope.uid).then((results) => {
      $scope.units = results;
    }).catch((error) => {
      console.log("error in getMyBattleReadyUnits", error);
    });
  }; // end getMyBattleReadyUnits()


  const getStates = () => {
    StatesService.getAllStates().then((results) => {
      $scope.states = results;
      getMyBattleReadyUnits();
    }).catch((error) => {
      console.log("error in getWeapons", error);
    });
  };
  getStates();


  const toCreate = () => {
    $location.path(`/newUnit1`);
  };

  const toLibrary = () => {
    $location.path(`userLibrary`);
  };
  
  $scope.statesDropDown = {
    isopen: false
  };
}); // end controller