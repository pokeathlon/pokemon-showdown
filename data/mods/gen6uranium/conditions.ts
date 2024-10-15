const {Dex} = require('../../../sim/dex');
export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = Dex.deepClone(require('../gen9uranium/conditions').Conditions);
