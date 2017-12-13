'use strict';

app.service("GroupService", function ($http, $q, FIREBASE_CONFIG) {

  const createGroupObject = (unitInfo) => {
    return {
      "groupName": unitInfo.groupName,
      "uid": unitInfo.uid
    };
  };

  const createGroup = (newGroup) => {
    let newGroupObject = createGroupObject(newGroup);
    return $http.post(`${FIREBASE_CONFIG.databaseURL}/groups.json`, JSON.stringify(newGroupObject));
  };

  const getUserGroups = (userUid) => {
    let allGroups = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/groups.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
        let fbGroups = results.data;
        Object.keys(fbGroups).forEach((key) => {
          fbGroups[key].id = key;
          allGroups.push(fbGroups[key]);
        });
        resolve(allGroups);
      }).catch((error) => {
        reject(error);
      });
    });
    // return $http.get(`${FIREBASE_CONFIG.databaseURL}/groups/${uid}.json`);
  };

  return { createGroup, getUserGroups};
});