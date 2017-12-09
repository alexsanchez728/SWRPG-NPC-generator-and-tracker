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
      "strainThreshold": unitInfo.strainThreshold,
      "talents": unitInfo.talents,
      "uid": unitInfo.uid,
      "willpower": unitInfo.willpower,
      "woundThreshold": unitInfo.woundThreshold,
      "inBattle": unitInfo.inBattle
    };
  };
  const updateUnit = (unitInfo) => {
    return {
      "abilities": unitInfo.abilities,
      "agility": unitInfo.agility,
      "brawn": unitInfo.brawn,
      "cunning": unitInfo.cunning,
      "currentStrain": unitInfo.currentStrain,
      "currentWound": unitInfo.currentWound,
      "description": unitInfo.description,
      "difficultyName": unitInfo.difficultyName,
      "folder": unitInfo.folder,
      "unitsOfKind": unitInfo.unitCount,
      "intellect": unitInfo.intellect,
      "isFavourite": unitInfo.isFavourite,
      "meleeDef": unitInfo.meleeDef,
      "name": unitInfo.name,
      "presence": unitInfo.presence,
      "rangeDef": unitInfo.rangeDef,
      "skills": unitInfo.skills,
      "soak": unitInfo.soak,
      "statusEffects": "none",
      "strainThreshold": unitInfo.strainThreshold,
      "talents": unitInfo.talents,
      "uid": unitInfo.uid,
      "willpower": unitInfo.willpower,
      "woundThreshold": unitInfo.woundThreshold,
      "inBattle": unitInfo.inBattle
    };
  };

  const editUnit = (editedUnit, unitId) => {
    let unitObject = createSingleUnitObject(editedUnit);
    return $http.put(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits/${unitId}.json`, JSON.stringify(unitObject));
  };

  const deleteSingleUnit = (unitId) => {
    return $http.delete(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits/${unitId}.json`);
  };

  const getUnit = (unitId) => {
    return $http.get(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits/${unitId}.json`);
  };

  const markUnitDead = (editedUnit, unitId) => {
    let unitObject = updateUnit(editedUnit);
    return $http.put(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits/${unitId}.json`, JSON.stringify(unitObject));
  };
  
  const postNewUnit = (newUnit) => {
    return $http.post(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits.json`, JSON.stringify(newUnit));
  };

  return { createSingleUnitObject, deleteSingleUnit, editUnit, getUnit, markUnitDead, postNewUnit };
});