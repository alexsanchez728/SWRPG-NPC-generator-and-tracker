'use strict';

app.service("UnitsService", function ($http, FIREBASE_CONFIG) {

  const createSingleUnitObject = (unitInfo) => {
    return {
      "abilities": unitInfo.abilities,
      "agility": unitInfo.agility,
      "brawn": unitInfo.brawn,
      "cunning": unitInfo.cunning,
      "currentStrain": 0,
      "currentWound": 0,
      "description": unitInfo.description,
      "difficultyName": unitInfo.difficultyName,
      "folder": unitInfo.folder,
      "unitsOfKind": unitInfo.unitCount,
      "intellect": unitInfo.intellect,
      "isFavourite": false,
      "meleeDef": unitInfo.meleeDef,
      "name": unitInfo.name,
      "presence": unitInfo.presence,
      "rangeDef": unitInfo.rangeDef,
      "skills": unitInfo.skills,
      "soak": unitInfo.soak,
      "statusEffects": "none",
      "strainThreshold": 0,
      "talents": unitInfo.talents,
      "uid": unitInfo.uid,
      "willpower": unitInfo.willpower,
      "woundThreshold": unitInfo.woundThreshold
    };
  };

  const editUnit = (editedUnit, unitId) => {
    let unitObject = createSingleUnitObject(editedUnit);
    return $http.put(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits/${unitId}.json`, JSON.stringify(editedUnit));
  };


  const deleteSingleUnit = (unitId) => {
    return $http.delete(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits/${unitId}.json`);
  };

  const getUnit = (unitId) => {
    return $http.get(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits/${unitId}.json`);
  };

  const postNewUnit = (newUnit) => {
    return $http.post(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits.json`, JSON.stringify(newUnit));
  };

  return { createSingleUnitObject, deleteSingleUnit, editUnit, getUnit, postNewUnit };
});