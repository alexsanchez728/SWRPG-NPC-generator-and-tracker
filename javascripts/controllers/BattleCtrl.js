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

  // const getUnitStates = () => {
  //   BattleReadyUnitsService.getMyBattleReadyUnits($rootScope.uid).then((results) => {
  //     let units = results;
  //     console.log("units", units);
  //     $scope.units.forEach((unit) => {
  //       console.log("unit", unit);
  //     });
  //   });
  // };

  // getUnitStates();

  const toCreate = () => {
    $location.path(`/newUnit1`);
  };

  const toLibrary = () => {
    $location.path(`userLibrary`);
  };

  $scope.toEditUnit = (unitId) => {
    $location.path(`/editUnit:unitId`);
  };

  $scope.toDetails = (unitId) => {
    $location.path(`/unitDetails:unitId`);
  };

  $scope.statesDropDown = {
    isopen: false
  };
}); // end controller