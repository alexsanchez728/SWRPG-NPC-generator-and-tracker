'use strict';

app.controller("BattleCtrl", function ($location, $scope, AuthService, BattleReadyUnitsService, GearAndEquipmentService, UnitsService, StatesService, WeaponsService) {

  const getStates = () => {
    StatesService.getAllStates().then((results) => {
      $scope.states = results;
      return getUnitStates();
    }).catch((error) => {
      console.log("error in getWeapons", error);
    });
  };
  getStates();

  const getWeapons = () => {
    WeaponsService.getAllWeapons().then((results) => {
      $scope.weapons = results;
    }).catch((error) => {
      console.log("error in getWeapons", error);
    });
  };
  getWeapons();

  const getEquipment = () => {
    GearAndEquipmentService.getAllGearAndEquipment().then((results) => {
      $scope.equipments = results;
    }).catch((error) => {
      console.log("error in getEquipment", error);
    });
  };
  getEquipment();



  const getUnitStates = () => {
    BattleReadyUnitsService.getMyBattleReadyUnits(AuthService.getCurrentUid()).then((results) => {
      $scope.units = results;
      let units = $scope.units;
      units.forEach((unit) => {
        if (unit.statusEffects != "none" || unit.statusEffects === undefined) {
          $scope.states.forEach((state) => {
            if (unit.statusEffects === state.id) {
              unit.statusEffectNames = state.name;
              unit.statusEffectDescription = state.description;
            }
          });
        } else if (unit.statusEffects === "none") {
          unit.statusEffectNames = "none";
          unit.statusEffectDescription = undefined;
        }
        if (unit.weapons != undefined) {
          $scope.weapons.forEach((weapon) => {
            if (unit.weapons === weapon.id) {
              unit.weaponName = weapon.name;
              unit.weaponDescription = weapon.description;
            }
          });
        }
        if (unit.equipment != undefined) {
          $scope.equipments.forEach((equipment) => {
            if (unit.equipment === equipment.id) {
              unit.equipmentName = equipment.name;
              unit.equipmentDescription = equipment.description;
            }
          });
        }
      });

    }).catch((error) => {
      console.log("error in getUnitStates", error);
    });
  };

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

  $scope.endBattle = () => {
    let units = $scope.units;
    units.forEach((unit) => {
      $scope.isDead(unit);
    });
  };

  $scope.toEditUnit = (id) => {
    $location.path(`/editUnit/${id}`);
  };

  $scope.toDetails = (id) => {
    $location.path(`/unitDetails/${id}`);
  };

  $scope.isDead = (unit) => {
    if (!unit.isMaster) {
      UnitsService.deleteSingleUnit(unit.id).then(() => {
        getUnitStates();
      });
    } else {
      let updatedUnit = unit;
      updatedUnit.inBattle = false;
      updatedUnit.groupId = undefined;
      updatedUnit.groupName = undefined;
      updatedUnit.placeInGroup = undefined;
      updatedUnit.currentWound = 0;
      updatedUnit.currentStrain = 0;
      updatedUnit.statusEffects = "none";
      updatedUnit.statusEffectNames = "none";
      updatedUnit.statusEffectDescription = "none";
      UnitsService.updateUnitInfo(updatedUnit, unit.id).then(() => {

        getUnitStates();
      });
    }
  };

  $scope.updateUnitWound = (unit) => {
    let updatedUnit = unit;
    UnitsService.updateUnitInfo(updatedUnit, unit.id).then(() => {
      getUnitStates();
    }).catch((error) => {
      console.log("error in updateUnitWound", error);
    });
  };

  $scope.updateUnitStrain = (unit) => {
    let updatedUnit = unit;
    UnitsService.updateUnitInfo(updatedUnit, unit.id).then(() => {
      getUnitStates();
    }).catch((error) => {
      console.log("error in updateUnitStrain", error);
    });
  };


}); // end controller