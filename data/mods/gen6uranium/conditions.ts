const {Dex} = require('../../../sim/dex');
export const Conditions: {[k: string]: ModdedConditionData} = Dex.deepClone(require('../gen9uranium/conditions').Conditions);
