'use strict';

app.controller("NewUnitCharacteristicsCtrl", function ($location, $scope, AuthService, FoldersService, GearAndEquipmentService, UnitsService, WeaponsService) {

  $scope.unitInfo = {};

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

  const getFolders = () => {
    FoldersService.getAllMyFolders().then((results) => {
      $scope.folders = results;
    }).catch((error) => {
      console.log("error in getEquipment", error);
    });
  };
  getFolders();

  $scope.addAndBattle = ((unitInfo) => {
    $scope.unitInfo.uid = AuthService.getCurrentUid();
    let newUnit = UnitsService.createSingleUnitObject($scope.unitInfo);
    newUnit.inBattle = true;
    UnitsService.postNewUnit(newUnit).then(() => {
      $location.path(`/battlePage`);
    });
  });

  $scope.addAndAgain = ((unitInfo) => {
    $scope.unitInfo.uid = AuthService.getCurrentUid();
    let newUnit = UnitsService.createSingleUnitObject($scope.unitInfo);
    newUnit.inBattle = false;
    UnitsService.postNewUnit(newUnit).then(() => {
      $location.path(`/newUnit1`);
      $scope.reset();
    });
  });

  $scope.addWeapon = (weapon) => {
    $scope.unitInfo.weapons = weapon;
  };
  $scope.addEquipment = (equipment) => {
    $scope.unitInfo.equipment = equipment;
  };
  $scope.addFolder = (folder) => {
    $scope.unitInfo.folder = folder;
  };

  $scope.reset = function () {
    $scope.unitInfo = {};
  };

  $scope.equipmentDropDown = {
    isopen: false
  };
  $scope.foldersDropDown = {
    isopen: false
  };

  $scope.weaponDropDown = {
    isopen: false
  };

  const characteristicsByDifficulty = (difficultyName) => {
    if (difficultyName === "Minion") {
      let min = Math.ceil(1);
      let max = Math.floor(3);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (difficultyName === "Rival") {
      let min = Math.ceil(1);
      let max = Math.floor(5);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (difficultyName === "Nemesis") {
      let min = Math.ceil(1);
      let max = Math.floor(7);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  const soakByDifficulty = (difficultyName) => {
    if (difficultyName === "Minion") {
      let min = Math.ceil(1);
      let max = Math.floor(5);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (difficultyName === "Rival") {
      let min = Math.ceil(2);
      let max = Math.floor(6);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (difficultyName === "Nemesis") {
      let min = Math.ceil(3);
      let max = Math.floor(12);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  const strainThresholdByDifficulty = (difficultyName) => {
    if (difficultyName === "Minion" || "Rival") {
      return 0;
    } else if (difficultyName === "Nemesis") {
      let min = Math.ceil(12);
      let max = Math.floor(30);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  const woundThresholdByDifficulty = (difficultyName) => {
    if (difficultyName === "Minion") {
      let min = Math.ceil(3);
      let max = Math.floor(9);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (difficultyName === "Rival") {
      let min = Math.ceil(4);
      let max = Math.floor(12);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if (difficultyName === "Nemesis") {
      let min = Math.ceil(15);
      let max = Math.floor(30);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  const meleeDefenseByDifficulty = (difficultyName) => {
    if (difficultyName === "Minion") {
      return 0;
    } else if (difficultyName === "Rival" || "Nemesis") {
      let min = Math.ceil(0);
      let max = Math.floor(1);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  const rangeDefenseByDifficulty = (difficultyName) => {
    if (difficultyName === "Minion") {
      return 0;
    } else if (difficultyName === "Rival" || "Nemesis") {
      let min = Math.ceil(0);
      let max = Math.floor(1);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  $scope.randomStatsForDifficulty = ((difficultyName) => {
    if (difficultyName != undefined) {
      $scope.userError = null;
      $scope.unitInfo.brawn = characteristicsByDifficulty(difficultyName);
      $scope.unitInfo.agility = characteristicsByDifficulty(difficultyName);
      $scope.unitInfo.intellect = characteristicsByDifficulty(difficultyName);
      $scope.unitInfo.cunning = characteristicsByDifficulty(difficultyName);
      $scope.unitInfo.willpower = characteristicsByDifficulty(difficultyName);
      $scope.unitInfo.presence = characteristicsByDifficulty(difficultyName);
      $scope.unitInfo.soak = soakByDifficulty(difficultyName);
      $scope.unitInfo.woundThreshold = woundThresholdByDifficulty(difficultyName);
      $scope.unitInfo.strainThreshold = strainThresholdByDifficulty(difficultyName);
      $scope.unitInfo.meleeDef = meleeDefenseByDifficulty(difficultyName);
      $scope.unitInfo.rangeDef = rangeDefenseByDifficulty(difficultyName);
    } else if (!difficultyName) {
      $scope.userError = "Select a Difficulty First";
    }

  }); // END RANDOMSTATESFORDIFFICULTY

}); // END CONTROLLER