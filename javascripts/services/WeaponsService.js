'use strict';

app.service("WeaponsService", function ($http, $q, FIREBASE_CONFIG) {

  const getAllWeapons = () => {
    let allWeapons = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/weapons.json`).then((results) => {
        let fbWeapons = results.data;
        Object.keys(fbWeapons).forEach((key) => {
          fbWeapons[key].id = key;
          allWeapons.push(fbWeapons[key]);
        });
        resolve(allWeapons);
      }).catch((error) => {
        reject(error);
      });
    });
  };
  
  return { getAllWeapons};
});