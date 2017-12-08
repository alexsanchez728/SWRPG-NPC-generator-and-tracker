'use strict';

app.service("BattleReadyUnitsService", function ($http, $q, FIREBASE_CONFIG) {

  const getMyBattleReadyUnits = (userUid) => {
    let units = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
        let fbUnits = results.data;
        if (fbUnits != null) {
          Object.keys(fbUnits).forEach((key) => {
            fbUnits[key].id = key;
            units.push(fbUnits[key]);
            resolve(units);
          });
        }
      }).catch((error) => {
        console.log("error in getMyBattleReadyUnits", error);
      });
    });
  };

  return { getMyBattleReadyUnits };

});