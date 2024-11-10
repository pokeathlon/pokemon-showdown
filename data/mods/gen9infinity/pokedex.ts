const {Dex} = require('../../../sim/dex');
export const ModPokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
};
export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = Dex.deepClone(ModPokedex);
