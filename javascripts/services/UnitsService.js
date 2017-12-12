'use strict';

app.service("UnitsService", function ($http, $q, FIREBASE_CONFIG) {

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
      "equipment": unitInfo.equipmentId,
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
      "statusEffectNames": "none",
      "statusEffectDescription": "none",
      "strainThreshold": unitInfo.strainThreshold,
      "talents": unitInfo.talents,
      "uid": unitInfo.uid,
      "weapon": unitInfo.weaponId,
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
      "equipment": unitInfo.equipmentId,
      "folder": unitInfo.folder,
      "unitsOfKind": unitInfo.unitCount,
      "groupId": unitInfo.groupId,
      "intellect": unitInfo.intellect,
      "isFavourite": unitInfo.isFavourite,
      "meleeDef": unitInfo.meleeDef,
      "name": unitInfo.name,
      "presence": unitInfo.presence,
      "rangeDef": unitInfo.rangeDef,
      "skills": unitInfo.skills,
      "soak": unitInfo.soak,
      "statusEffects": unitInfo.statusEffects,
      "statusEffectNames": unitInfo.statusEffectNames,
      "statusEffectDescription": unitInfo.statusEffectDescription,
      "strainThreshold": unitInfo.strainThreshold,
      "talents": unitInfo.talents,
      "uid": unitInfo.uid,
      "weapon": unitInfo.weaponId,
      "willpower": unitInfo.willpower,
      "woundThreshold": unitInfo.woundThreshold,
      "inBattle": unitInfo.inBattle
    };
  };

  const deleteSingleUnit = (unitId) => {
    return $http.delete(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits/${unitId}.json`);
  };

  const getUnit = (unitId) => {
    return $http.get(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits/${unitId}.json`);
  };

  const getAllMyUnits = (userUid) => {
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

  const updateUnitInfo = (editedUnit, unitId) => {
    let unitObject = updateUnit(editedUnit);
    return $http.put(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits/${unitId}.json`, JSON.stringify(unitObject));
  };

  const postNewUnit = (newUnit) => {
    return $http.post(`${FIREBASE_CONFIG.databaseURL}/battleReadyUnits.json`, JSON.stringify(newUnit));
  };

  return { createSingleUnitObject, deleteSingleUnit, getUnit, getAllMyUnits, updateUnitInfo, postNewUnit };
});