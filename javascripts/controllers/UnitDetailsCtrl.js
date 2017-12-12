'use strict';

app.controller("UnitDetailsCtrl", function ($location, $rootScope, $routeParams, $scope, FoldersService, GearAndEquipmentService, UnitsService, WeaponsService) {

  const getFolders = () => {
    FoldersService.getAllMyFolders().then((results) => {
      $scope.folders = results;
    }).catch((error) => {
      console.log("error in getFolders", error);
    });
  };
  getFolders();

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

  const getSingleUnit = () => {
    UnitsService.getUnit($routeParams.id).then((results) => {
      $scope.unitInfo = results.data;
      if ($scope.unitInfo.folder != undefined) {
        $scope.folders.forEach((folder) => {
          if ($scope.unitInfo.folder === folder.id) {
            $scope.unitInfo.folderName = folder.name;
          }
        });
      }
      if ($scope.unitInfo.weapons != undefined) {
        $scope.weapons.forEach((weapon) => {
          if ($scope.unitInfo.weapons === weapon.id) {
            $scope.unitInfo.weaponName = weapon.name;
            $scope.unitInfo.weaponDescription = weapon.description;
          }
        });
      }
      if ($scope.unitInfo.equipment != undefined) {
        $scope.equipments.forEach((equipment) => {
          if ($scope.unitInfo.equipment === equipment.id) {
            $scope.unitInfo.equipmentName = equipment.name;
            $scope.unitInfo.equipmentDescription = equipment.description;
          }
        });
      }
    }).catch((error) => {
      console.log("error in getSingleUnit", error);
    });
  }; // END GETUNIT()
  getSingleUnit();

  $scope.toEditUnit = (id) => {
    $location.path(`/editUnit/${id}`);
  };

  $scope.toBattle = () => {
    $location.path(`/battlePage/`);
  };

});