'use strict';

app.controller("LibraryCtrl", function ($rootScope, $scope, BattleReadyUnitsService, FoldersService) {

const getFolderNames = () => {
  FoldersService.getAllMyFolders().then((results) => {
    $scope.MyFolders = results;
    return getMyBattleReadyUnitsWithFolderNames();
  }).catch((error) => {
    console.log("error in getFolderNames", error);
  });
};

  const getMyBattleReadyUnitsWithFolderNames = () => {
    BattleReadyUnitsService.getMyBattleReadyUnits($rootScope.uid).then((results) => {
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

});