const {Dex} = require('../../../sim/dex');
export const Items: {[k: string]: ModdedItemData} = Dex.deepClone(require('../gen9uranium/items').Items);