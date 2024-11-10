const {Dex} = require('../../../sim/dex');
const baseLearnsets = require('../../learnsets').Learnsets;

export const ModLearnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = {
};
export const Learnsets: import('../../../sim/dex-species').ModdedLearnsetDataTable = Dex.deepClone(ModLearnsets);
