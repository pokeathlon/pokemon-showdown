const {Dex} = require('../../../sim/dex');
export const Moves: {[k: string]: ModdedMoveData} = Dex.deepClone(require('../gen9uranium/moves').Moves);