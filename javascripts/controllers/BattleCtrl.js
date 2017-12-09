'use strict';

app.controller("BattleCtrl", function ($location, $rootScope, $scope, BattleReadyUnitsService, UnitsService, StatesService) {

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
    }).then(() => {
      let units = $scope.units;
      units.forEach((unit) => {
        if (unit.statusEffects != "none") {
          $scope.states.forEach((state) => {
            if (unit.statusEffects === state.id) {
              unit.statusEffectNames = state.name;
              unit.statusEffectDescription = state.description;
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

  $scope.toEditUnit = (id) => {
    $location.path(`/editUnit/${id}`);
  };

  $scope.toDetails = (id) => {
    $location.path(`/unitDetails/${id}`);
  };

$scope.isDead = (unitInfo) => {
  unitInfo.inBattle = false;
  UnitsService.markUnitDead(unitInfo, unitInfo.id).then(() => {
    getStates();
  }).catch((error) => {
    console.log("error in isDead", error);
  });
};

}); // end controller