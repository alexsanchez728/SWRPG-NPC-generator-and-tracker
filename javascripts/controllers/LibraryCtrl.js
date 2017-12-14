'use strict';

app.controller("LibraryCtrl", function ($location, $scope, AuthService, BattleReadyUnitsService, FoldersService, GroupService, UnitsService) {

  const getFolderNames = () => {
    FoldersService.getAllMyFolders().then((results) => {
      $scope.MyFolders = results;
      return getMyUnitsWithFolderNames();
    }).catch((error) => {
      console.log("error in getFolderNames", error);
    });
  };

  const getMyUnitsWithFolderNames = () => {
    UnitsService.getAllMyUnits(AuthService.getCurrentUid()).then((results) => {
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







  $scope.checkModel = {
    isGroup: false
  };

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

  const createGrouping = ((unit, howManyUnits) => {
    GroupService.createGroup(unit).then((results) => {
      unit.groupId = results.data.name;
      return makeUnitCopies(unit, howManyUnits);
    }).catch((error) => {
      console.log("error in makeUnitCopies");
    }); 
  });// END CREATEGROUPING

  const makeUnitCopies = ((unit, howManyUnits) => {
    for (let i = 0; i < howManyUnits; i++) {
      unit.inBattle = true;
      if (i === 0) {
        UnitsService.updateUnitInfo(unit, unit.id);
      } else {
        let newUnit = UnitsService.createSingleUnitObject(unit);
        newUnit.isMaster = false;
        UnitsService.postNewUnit(newUnit).then(() => {
        }); // END POSTNEWUNIT
      }
    } // END FOR LOOP
    $location.path(`/battlePage`);
  }); // END MAKEUNITCOPIES

  $scope.toBattle = ((unit) => {
    let howManyUnits = Math.floor(unit.unitCount);
    createGrouping(unit, howManyUnits);
  }); // END TOBATTLE
}); // END CONTROLLER