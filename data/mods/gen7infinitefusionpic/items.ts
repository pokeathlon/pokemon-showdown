const {Dex} = require('../../../sim/dex');
export const Items: {[k: string]: ModdedItemData} = {
	...Dex.deepClone(require('../gen9infinitefusion/items').Items),
	buggem: {inherit: true, isNonstandard: null},
	darkgem: {inherit: true, isNonstandard: null},
	dragongem: {inherit: true, isNonstandard: null},
	electricgem: {inherit: true, isNonstandard: null},
	fairygem: {inherit: true, isNonstandard: null},
	fightinggem: {inherit: true, isNonstandard: null},
	firegem: {inherit: true, isNonstandard: null},
	flyinggem: {inherit: true, isNonstandard: null},
	ghostgem: {inherit: true, isNonstandard: null},
	grassgem: {inherit: true, isNonstandard: null},
	groundgem: {inherit: true, isNonstandard: null},
	icegem: {inherit: true, isNonstandard: null},
	poisongem: {inherit: true, isNonstandard: null},
	psychicgem: {inherit: true, isNonstandard: null},
	rockgem: {inherit: true, isNonstandard: null},
	steelgem: {inherit: true, isNonstandard: null},
	watergem: {inherit: true, isNonstandard: null},
	leppaberry: {
		inherit: true,
		onEat(pokemon) {
			const moveSlot = pokemon.moveSlots.find(move => move.pp === 0) ||
				pokemon.moveSlots.find(move => move.pp < move.maxpp);
			if (!moveSlot) return;
			moveSlot.pp += 10;
			if (moveSlot.pp > moveSlot.maxpp) moveSlot.pp = moveSlot.maxpp;
			if (!pokemon.m.curMoves.includes(moveSlot.id) && pokemon.m.trackPP.get(moveSlot.id)) {
				pokemon.m.trackPP.set(moveSlot.id, moveSlot.maxpp - moveSlot.pp);
			}
			this.add('-activate', pokemon, 'item: Leppa Berry', moveSlot.move, '[consumed]');
		},
	},
};
