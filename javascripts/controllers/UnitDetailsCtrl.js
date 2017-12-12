'use strict';

app.controller("UnitDetailsCtrl", function ($location, $rootScope, $routeParams, $scope, FoldersService, GearAndEquipmentService, UnitsService, WeaponsService) {

  const getSingleUnit = () => {
    UnitsService.getUnit($routeParams.id).then((results) => {
      $scope.unitInfo = results.data;
    }).catch((error) => {
      console.log("error in getSingleUnit", error);
    });
  }; // END GETUNIT()
  getSingleUnit();

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
      console.log("error in getFolders", error);
    });
  };
  getFolders();

  $scope.toEditUnit = (id) => {
    $location.path(`/editUnit/${id}`);
  };

  $scope.toBattle = () => {
    $location.path(`/battlePage/`);
  };

});