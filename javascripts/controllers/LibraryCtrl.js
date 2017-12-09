'use strict';

app.controller("LibraryCtrl", function ($location, $rootScope, $scope, BattleReadyUnitsService, FoldersService, UnitsService) {

  const getFolderNames = () => {
    FoldersService.getAllMyFolders().then((results) => {
      $scope.MyFolders = results;
      return getMyUnitsWithFolderNames();
    }).catch((error) => {
      console.log("error in getFolderNames", error);
    });
  };

  const getMyUnitsWithFolderNames = () => {
    UnitsService.getAllMyUnits($rootScope.uid).then((results) => {
      $scope.units = results;
      let units = $scope.units;
      let folders = $scope.MyFolders;
      units.forEach((unit) => {
        folders.forEach((folder) => {
          if (unit.folder === folder.id) {
            unit.folderName = folder.name;
          }
        });
      });
    }).catch((error) => {
      console.log("error in getMyBattleReadyUnits", error);
    });
  }; // end getMyBattleReadyUnits()
  getFolderNames();

  $scope.deleteUnit = ((unitId) => {
    UnitsService.deleteSingleUnit(unitId).then(() => {
      getFolderNames();
    });
  });

  $scope.toEditUnit = ((unitId) => {
    $location.path(`/editUnit/${unitId}`);
  });

  $scope.toDetails = ((unitId) => {
    $location.path(`/unitDetails/${unitId}`);
  });

  $scope.toBattle = ((unit) => {
    unit.inBattle = true;
    UnitsService.updateUnitInfo(unit, unit.id).then(() => {
      getFolderNames();
    }).catch((error) => {
      console.log("error in toBattle", error);
    });
  });
  
});