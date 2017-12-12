'use strict';

app.controller("EditUnitCtrl", function ($location, $routeParams, $scope, FoldersService, GearAndEquipmentService, UnitsService, WeaponsService) {

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
      console.log("error in getEquipment", error);
    });
  };
  getFolders();

  $scope.editUnit = (unitInfo) => {
    let editedUnit = $scope.unitInfo;
    UnitsService.updateUnitInfo(editedUnit, $routeParams.id).then((results) => {
      $location.path("/battlePage");
    }).catch((error) => {
      console.log("error in editUnit", error);
    });
  };

}); // END CONTROLLER