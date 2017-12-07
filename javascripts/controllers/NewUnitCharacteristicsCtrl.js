'use strict';

app.controller("NewUnitCharacteristicsCtrl", function ($rootScope, $scope, WeaponsService, GearAndEquipmentService) {

  const getWeapons = () => {
    WeaponsService.getAllWeapons().then((results) => {
      console.log("results from weapons", results);
      $scope.weapons = results;
    }).catch((error) => {
      console.log("error in getWeapons", error);
    });
  };
  console.log("results from weapons", $scope.weapons);
  getWeapons();

  const getEquipment = () => {
    GearAndEquipmentService.getAllGearAndEquipment().then((results) => {
      $scope.equipments = results;
    }).catch((error) => {
      console.log("error in getEquipment", error);
    });
  };
console.log("results from equipment", $scope.equipments);
  getEquipment();

  $scope.addNew = (unitInfo) => {
    console.log("submitted", unitInfo);
  };

  $scope.reset = function () {
    $scope.unitInfo = {};
  };



});