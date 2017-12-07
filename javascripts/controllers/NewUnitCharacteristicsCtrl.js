'use strict';

app.controller("NewUnitCharacteristicsCtrl", function ($rootScope, $scope, FoldersService, WeaponsService, GearAndEquipmentService) {

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

  $scope.addNew = (unitInfo) => {
    console.log("submitted", unitInfo);
  };

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