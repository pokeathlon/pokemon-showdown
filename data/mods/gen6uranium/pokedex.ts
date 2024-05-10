const {Dex} = require('../../../sim/dex');
export const Pokedex: {[k: string]: ModdedSpeciesData} = Dex.deepClone(require('../gen9uranium/pokedex').Pokedex);
