'use strict';

app.controller("AuthCtrl", function ($location, $rootScope, $scope, AuthService) {
  $scope.controller = "AuthCtrl";
  $scope.authenticate = () => {
    AuthService.authenticateGoogle().then((result) => {
      $rootScope.uid = result.user.uid;
      $scope.$apply(() => {
        $location.url("/battlePage");
      });
    }).catch((err) => {
      console.log("error in authenticateGoogle", err);
    });
  };
});
