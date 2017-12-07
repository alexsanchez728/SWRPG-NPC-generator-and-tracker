'use strict';

app.controller("BattleCtrl", function ($location, $rootScope, $scope, BattleReadyUnitsService) {

    const getMyBattleReadyUnits = () => {
      BattleReadyUnitsService.getMyBattleReadyUnits($rootScope.uid).then((results) => {
        $scope.units = results;
      }).catch((error) => {
        console.log("error in getMyBattleReadyUnits", error);
      });
    }; // end getMyBattleReadyUnits()

    getMyBattleReadyUnits();

  const toCreate = () => {
    $location.path(`/newUnit1`);
  };

  const toLibrary = () => {
    $location.path(`userLibrary`);
  };
}); // end controller