'use strict';

app.service("FoldersService", function ($http, $q, FIREBASE_CONFIG) {

  const getAllMyFolders = () => {
    let allFolders = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/folders.json`).then((results) => {
        let fbFolders = results.data;
        Object.keys(fbFolders).forEach((key) => {
          fbFolders[key].id = key;
          allFolders.push(fbFolders[key]);
        });
        resolve(allFolders);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return { getAllMyFolders };
});