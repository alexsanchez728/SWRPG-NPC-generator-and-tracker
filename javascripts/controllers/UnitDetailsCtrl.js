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

  const getSingleUnit = () => {
    UnitsService.getUnit($routeParams.id).then((results) => {
      $scope.unitInfo = results.data;
      console.log("folder", $scope.unitInfo.folder);
      console.log("folders in firebase", $scope.folders);
      if ($scope.unitInfo.folder != undefined) {
        $scope.folders.forEach((folder) => {
          if ($scope.unitInfo.folder === folder.id) {
            $scope.unitInfo.folderName = folder.name;
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