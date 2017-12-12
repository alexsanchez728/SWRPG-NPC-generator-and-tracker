'use strict';

app.controller("AuthCtrl", function ($location, $rootScope, $scope, AuthService) {
  $scope.controller = "AuthCtrl";
  $scope.authenticate = () => {
    AuthService.authenticateGoogle().then((result) => {
      $rootScope.navbar = true;
      $scope.$apply(() => {
        $location.path("/battlePage");
      });
    }).catch((err) => {
      console.log("error in authenticateGoogle", err);
    });
  };
});
