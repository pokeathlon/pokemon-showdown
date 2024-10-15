const {Dex} = require('../../../sim/dex');
export const Learnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = Dex.deepClone(require('../gen9insurgence/learnsets').Learnsets);
