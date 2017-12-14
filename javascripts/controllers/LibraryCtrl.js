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
    UnitsService.getAllMyMasterUnits(AuthService.getCurrentUid()).then((results) => {
      let units = results;
      units.forEach((unit) => {
        $scope.MyFolders.forEach((folder) => {
          if (unit.folder === folder.id) {
            unit.folderName = folder.name;
          }
        });
      });
      $scope.units = units;
    }).catch((error) => {
      console.log("error in getMyBattleReadyUnits", error);
    });
  }; // end getMyBattleReadyUnits()
  getFolderNames();

  const createGrouping = ((unit, howManyUnits) => {
    GroupService.createGroup(unit).then((results) => {
      unit.groupId = results.data.name;
      return makeUnits(unit, howManyUnits);
    }).catch((error) => {
      console.log("error in makeUnitCopies");
    });
  });// END CREATEGROUPING

  const makeUnits = ((unit, howManyUnits) => {
    for (let i = 0; i < howManyUnits; i++) {
      unit.inBattle = true;
      if (i === 0) {
        unit.placeInGroup = Math.floor(i + 1);
        UnitsService.updateUnitInfo(unit, unit.id);
      } else {
        let newUnit = UnitsService.createSingleUnitObject(unit);
        newUnit.placeInGroup = Math.floor(i + 1);
        newUnit.isMaster = false;
        UnitsService.postNewUnit(newUnit).then(() => {
        }); // END POSTNEWUNIT
      }
    } // END FOR LOOP
    $location.path(`/battlePage`);
  }); // END MAKEUNITCOPIES

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

  $scope.toBattle = ((unit) => {
    let howManyUnits = Math.floor(unit.unitCount);
    if (howManyUnits > 1) {
      createGrouping(unit, howManyUnits);
    } else {
      // makeUnits(unit, howManyUnits);
      unit.inBattle = true;
      UnitsService.updateUnitInfo(unit, unit.id);
      $location.path(`/battlePage`);
    }
  });

}); // END CONTROLLER