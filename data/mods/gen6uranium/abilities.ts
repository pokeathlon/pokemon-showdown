const {Dex} = require('../../../sim/dex');
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	...Dex.deepClone(require('../gen9uranium/abilities').ModAbilities),
	atomizate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Nuclear';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Atomizate",
		desc: "This Pokemon's Normal-type moves become Nuclear-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type.",
		shortDesc: "This Pokemon's Normal-type moves become Nuclear type and have 1.3x power.",
		rating: 4,
		num: 0,
	},
	energizate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Energizate",
		desc: "This Pokemon's Normal-type moves become Electric-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type.",
		shortDesc: "This Pokemon's Normal-type moves become Electric type and have 1.3x power.",
		rating: 4,
		num: 0,
	},
};
