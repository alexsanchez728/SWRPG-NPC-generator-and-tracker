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
        if (unit.statusEffects != "none" || unit.statusEffects === undefined) {
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

  $scope.toCreate = () => {
    $location.path(`/newUnit1`);
  };

  $scope.toLibrary = () => {
    $location.path(`userLibrary`);
  };

  $scope.removeState = (unit) => {
    if (unit.statusEffects != "none") {
      let updatedUnit = unit;
      updatedUnit.statusEffects = "none";
      UnitsService.updateUnitInfo(updatedUnit, unit.id).then(() => {
        getStates();
      }).catch((error) => {
        console.log("error in removeState", error);
      });
    }
  };

  $scope.addState = (unit, stateId) => {
    let updatedUnit = unit;
    updatedUnit.statusEffects = stateId;
    UnitsService.updateUnitInfo(updatedUnit, updatedUnit.id).then(() => {
      getStates();
    }).catch((error) => {
      console.log("error in updateUnitWound", error);
    });
  };

  $scope.toEditUnit = (id) => {
    $location.path(`/editUnit/${id}`);
  };

  $scope.toDetails = (id) => {
    $location.path(`/unitDetails/${id}`);
  };

  $scope.isDead = (unitInfo) => {
    unitInfo.inBattle = false;
    unitInfo.statusEffects = "none";
    UnitsService.updateUnitInfo(unitInfo, unitInfo.id).then(() => {
      getStates();
    }).catch((error) => {
      console.log("error in isDead", error);
    });
  };

  $scope.updateUnitWound = (unit) => {
    let updatedUnit = unit;
    UnitsService.updateUnitInfo(updatedUnit, unit.id).then(() => {
      getStates();
    }).catch((error) => {
      console.log("error in updateUnitWound", error);
    });
  };

  $scope.updateUnitStrain = (unit) => {
    let updatedUnit = unit;
    UnitsService.updateUnitInfo(updatedUnit, unit.id).then(() => {
      getStates();
    }).catch((error) => {
      console.log("error in updateUnitStrain", error);
    });
  };

}); // end controller