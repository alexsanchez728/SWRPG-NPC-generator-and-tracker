'use strict';

app.controller("NewUnitCharacteristicsCtrl", function ($location, $rootScope, $scope, FoldersService, GearAndEquipmentService, UnitsService, WeaponsService) {

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
    unitInfo.uid = $rootScope.uid;
    $scope.unitWithuid = angular.copy(unitInfo);
    let newUnit = UnitsService.createSingleUnitObject(unitInfo);
    UnitsService.postNewUnit(newUnit).then(() => {
      $location.path(`/battlePage`);
    });
  });

  $scope.addAndAgain = ((unitInfo) => {
    unitInfo.uid = $rootScope.uid;
    $scope.unitWithuid = angular.copy(unitInfo);
    let newUnit = UnitsService.createSingleUnitObject(unitInfo);
    UnitsService.postNewUnit(newUnit).then(() => {
      $location.path(`/newUnit1`);
      $scope.reset();
    });
  });

  $scope.reset = function () {
    $scope.unitInfo = {};
  };

  $scope.weaponDropDown = {
    isopen: false
  };
  $scope.equipmentDropDown = {
    isopen: false
  };
  $scope.foldersDropDown = {
    isopen: false
  };

});