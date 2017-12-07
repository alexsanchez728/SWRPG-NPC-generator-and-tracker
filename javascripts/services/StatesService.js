'use strict';

app.service("StatesService", function ($http, $q, FIREBASE_CONFIG) {

  const getAllStates = () => {
    let allStates = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/states.json`).then((results) => {
        let fbStates = results.data;
        if (fbStates != null) {
          Object.keys(fbStates).forEach((key) => {
            fbStates[key].id = key;
            allStates.push(fbStates[key]);
            resolve(allStates);
          });
        }
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return { getAllStates };

});