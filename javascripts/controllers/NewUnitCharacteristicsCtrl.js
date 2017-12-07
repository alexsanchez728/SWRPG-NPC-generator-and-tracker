'use strict';

app.controller("NewUnitCharacteristicsCtrl", function ($scope) {
  $scope.create1 = "build-a-bad guy 1";
  $scope.master = {};

  $scope.addNew = (unitInfo) => {
    console.log("submitted", unitInfo);
  };


  $scope.reset = function () {
    $scope.unitInfo = angular.copy($scope.master);
  };

});