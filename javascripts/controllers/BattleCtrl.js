'use strict';

app.controller("BattleCtrl", function ($location, $rootScope, $scope, BattleReadyUnitsService, StatesService) {

  const getMyBattleReadyUnits = () => {
    BattleReadyUnitsService.getMyBattleReadyUnits($rootScope.uid).then((results) => {
      $scope.units = results;
      getUnitStates();
    }).catch((error) => {
      console.log("error in getMyBattleReadyUnits", error);
    });
  }; // end getMyBattleReadyUnits()

  const getUnitStates = () => {
    BattleReadyUnitsService.getMyBattleReadyUnits($rootScope.uid).then((results) => {
      // $scope.units = results;
      // return getStates();
    }).then(() => {
      let units = $scope.units;
      units.forEach((unit) => {
        if (unit.statusEffects != "none") {
          $scope.states.forEach((state) => {
            if (unit.statusEffects === state.id) {
              unit.statusEffectNames = state.name;
              unit.statusEffectDescription = state.description;
              console.log("unit with state name", unit);
              console.log("units with state name", units);
            }
          });
        } else {
          unit.statusEffectNames = "none";
          unit.statusEffectDescription = undefined;
        }
      });
    }).catch((error) => {
      console.log("error in getUnitStates", error);
    });
  };

  const getStates = () => {
    StatesService.getAllStates().then((results) => {
      $scope.states = results;      
      return getMyBattleReadyUnits();
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

  $scope.toEditUnit = (unitId) => {
    $location.path(`/editUnit:unitId`);
  };

  $scope.toDetails = (unitId) => {
    $location.path(`/unitDetails:unitId`);
  };

}); // end controller