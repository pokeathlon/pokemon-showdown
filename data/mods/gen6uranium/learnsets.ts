const {Dex} = require('../../../sim/dex');
export const Learnsets: {[k: string]: ModdedLearnsetData} = Dex.deepClone(require('../gen9uranium/learnsets').Learnsets);
