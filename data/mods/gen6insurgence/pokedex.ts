const {Dex} = require('../../../sim/dex');
export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = Dex.deepClone(require('../gen9insurgence/pokedex').Pokedex);
