const {Dex} = require('../../../sim/dex');
export const Items: import('../../../sim/dex-items').ModdedItemDataTable = Dex.deepClone(require('../gen9insurgence/items').Items);