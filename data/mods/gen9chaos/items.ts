// @ts-nocheck
import { Utils } from '../../../lib';
import { Items as Base } from '../../items';
import { ModdedItemDataTable } from '../../../sim/dex-items';

export const Items: ModdedItemDataTable = {
	lightball: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if ((pokemon.species.name.includes('Pikachu') || pokemon.fusion?.includes('Pikachu'))) {
				return this.chainModify(2);
			}
		},
		onModifySpA(spa, pokemon) {
			if ((pokemon.species.name.includes('Pikachu') || pokemon.fusion?.includes('Pikachu'))) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pikachu", "Pikachu-Cosplay", "Pikachu-Rock-Star", "Pikachu-Belle", "Pikachu-Pop-Star", "Pikachu-PhD", "Pikachu-Libre", "Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner", "Pikachu-Starter", "Pikachu-World", "Pikachu-Delta"],
	},
	luckypunch: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {
			if (user.species.name.includes('Chansey') || user.fusion?.includes('Chansey')) {
				return critRatio + 2;
			}
		},
		itemUser: ["Chansey", "Chansey-Egho"],
	},
	metalpowder: {
		inherit: true,
		onModifyDef(def, pokemon) {
			if ((pokemon.species.name.includes('Ditto') || pokemon.fusion?.includes('Ditto')) && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Ditto", "Ditto-Delta"],
	},
	quickpowder: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if ((pokemon.species.name.includes('Ditto') || pokemon.fusion?.includes('Ditto')) && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Ditto", "Ditto-Delta"],
	},
};

const Manual = Utils.deepClone(Items);
for (const mod in require('./mods.json')) {
	const ModItems = require('../' + mod + '/items').Items as ModdedItemDataTable;

	for (const key in ModItems) {
		const id = key as keyof typeof ModItems;

		if (!Items[id]) Items[id] = Base[id] ? {inherit: true} : {};

		for (const attr in ModItems[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			if (Items[id][attr] && (!Manual[id] || !Manual[id][attr])) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				Items[id][attr] = ModItems[id][attr];
			}
		}
	}
}
