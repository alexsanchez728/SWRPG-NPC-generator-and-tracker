'use strict';

app.controller("NewUnitCharacteristicsCtrl", function ($location, $scope, AuthService, FoldersService, GearAndEquipmentService, GroupService, UnitsService, WeaponsService) {

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

  // function to create multiple instances for a unit 
  const makeUnitCopies = ((unitInfo, howManyUnits) => {
    // gets the unit info from the model
    // gets the number value of 'unit count' so we know how many units to make


    // creates a group in the collection "groups" according to the user's input
      // and ties the name the user put in with that
    GroupService.createGroup(unitInfo).then((results) => {
      // Once it creates the group it gives the newly created groupId to the unit(s) being created
      unitInfo.groupId = results.data.name;
    }).catch((error) => {
      console.log("error in makeUnitCopies");
    }); // END CREATEGROUP

    //for however many there are, make a unit
    for (let i = 1; i < howManyUnits; i++) {
      console.log(unitInfo);

      let newUnit = UnitsService.createSingleUnitObject(unitInfo);
      newUnit.inBattle = true;
      UnitsService.postNewUnit(newUnit).then(() => {
      }); // END POSTNEWUNIT
    } // END FOR LOOP
    $location.path(`/battlePage`);
  }); // END MAKEUNITCOPIES


  $scope.addAndBattle = ((unitInfo) => {

    // sticks the uid in that unitInfo
    unitInfo.uid = AuthService.getCurrentUid();

    let howManyUnits = Math.floor(unitInfo.unitCount);

    // Runs only when unitCount is more than one,
      // giving a group of units a groupId to tie them to each other
    if (howManyUnits > 1) {
      makeUnitCopies(unitInfo, howManyUnits);
    }

    // runs every time
    // if there is only one then the makeUnitCopies function will not run, since 1 does not comprise a group
    let newUnit = UnitsService.createSingleUnitObject(unitInfo);
    newUnit.inBattle = true;
    UnitsService.postNewUnit(newUnit).then(() => {
      $location.path(`/battlePage`);
    });
  });

  $scope.addAndAgain = ((unitInfo) => {
    unitInfo.uid = AuthService.getCurrentUid();
    $scope.unitWithuid = angular.copy(unitInfo);
    let newUnit = UnitsService.createSingleUnitObject(unitInfo);
    newUnit.inBattle = false;
    UnitsService.postNewUnit(newUnit).then(() => {
      $location.path(`/newUnit1`);
      $scope.reset();
    });
  });

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

  $scope.checkModel = {
    isGroup: false
  };

  $scope.checkResults = [];

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