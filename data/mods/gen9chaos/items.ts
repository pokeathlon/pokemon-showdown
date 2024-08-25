export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// IF
	deepseascale: {
		inherit: true,
		isNonstandard: null,
		onModifySpD(spd, pokemon) {
			if (pokemon.fusion && (['Clamperl', 'Clamperl-Delta'].includes(pokemon.baseSpecies.name) || ['Clamperl', 'Clamperl-Delta'].includes(pokemon.fusion))) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl", "Clamperl-Delta"],
	},
	deepseatooth: {
		inherit: true,
		isNonstandard: null,
		onModifySpA(spa, pokemon) {
			if (pokemon.fusion && (['Clamperl', 'Clamperl-Delta'].includes(pokemon.baseSpecies.name) || ['Clamperl', 'Clamperl-Delta'].includes(pokemon.fusion))) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl", "Clamperl-Delta"],
	},
	eviolite: {
		inherit: true,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.nfe || this.dex.species.get(pokemon.fusion).nfe || pokemon.baseSpecies.id === 'dipplin') {
				return this.chainModify(1.5);
			}
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.baseSpecies.nfe || this.dex.species.get(pokemon.fusion).nfe || pokemon.baseSpecies.id === 'dipplin') {
				return this.chainModify(1.5);
			}
		},
	},
	leek: {
		inherit: true,
		isNonstandard: null,
		onModifyCritRatio(critRatio, user) {
			if (["farfetchd", "sirfetchd"].includes(this.toID(user.baseSpecies.baseSpecies)) ||
				["farfetchd", "sirfetchd", "farfetchdgalar"].includes(this.toID(user.fusion))) {
				return critRatio + 2;
			}
		},
	},
	stick: {
		inherit: true,
		onModifyCritRatio(critRatio, user) {
			if (this.toID(user.baseSpecies.baseSpecies) === 'farfetchd' || this.toID(this.dex.species.get(user.fusion).baseSpecies) === 'farfetchd') {
				return critRatio + 2;
			}
		},
	},
	lightball: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (['Pikachu', 'Pikachu-Delta'].includes(pokemon.baseSpecies.baseSpecies) || ['Pikachu', 'Pikachu-Delta'].includes(Dex.species.get(pokemon.fusion).baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpA(spa, pokemon) {
			if (['Pikachu', 'Pikachu-Delta'].includes(pokemon.baseSpecies.baseSpecies) || ['Pikachu', 'Pikachu-Delta'].includes(Dex.species.get(pokemon.fusion).baseSpecies)) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pikachu", "Pikachu-Cosplay", "Pikachu-Rock-Star", "Pikachu-Belle", "Pikachu-Pop-Star", "Pikachu-PhD", "Pikachu-Libre", "Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner", "Pikachu-Starter", "Pikachu-World", "Pikachu-Delta"],
	},
	luckypunch: {
		inherit: true,
		isNonstandard: null,
		onModifyCritRatio(critRatio, user) {
			if (user.baseSpecies.name === 'Chansey' || user.fusion === 'Chansey') {
				return critRatio + 2;
			}
		},
	},
	metalpowder: {
		inherit: true,
		isNonstandard: null,
		onModifyDef(def, pokemon) {
			if (pokemon.fusion && (['Ditto', 'Ditto-Delta'].includes(pokemon.species.name) || ['Ditto', 'Ditto-Delta'].includes(pokemon.fusion)) && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Ditto", "Ditto-Delta"],
	},
	quickpowder: {
		inherit: true,
		isNonstandard: null,
		onModifySpe(spe, pokemon) {
			if (pokemon.fusion && (['Ditto', 'Ditto-Delta'].includes(pokemon.species.name) || ['Ditto', 'Ditto-Delta'].includes(pokemon.fusion)) && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Ditto", "Ditto-Delta"],
	},
	thickclub: {
		inherit: true,
		isNonstandard: null,
		onModifyAtk(atk, pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies === 'Cubone' ||
				pokemon.baseSpecies.baseSpecies === 'Marowak' ||
				Dex.species.get(pokemon.fusion).baseSpecies === 'Cubone' ||
				Dex.species.get(pokemon.fusion).baseSpecies === 'Marowak'
			) {
				return this.chainModify(2);
			}
		},
	},
};
