'use strict';

app.service("GearAndEquipmentService", function ($http, $q, FIREBASE_CONFIG) {

  const getAllGearAndEquipment = () => {
    let allEquipments = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/gearAndEquipment.json`).then((results) => {
        let fbEquipments = results.data;
        Object.keys(fbEquipments).forEach((key) => {
          fbEquipments[key].id = key;
          allEquipments.push(fbEquipments[key]);
        });
        resolve(allEquipments);
      }).catch((error) => {
        reject(error);
      });
    });
  };
  return { getAllGearAndEquipment };
});