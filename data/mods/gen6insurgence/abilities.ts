const {Dex} = require('../../../sim/dex');

const eeveelutions: {[k: string]: string} = {
	"Water": "vaporeon",
	"Fire": "flareon",
	"Grass": "leafeon",
	"Dark": "umbreon",
	"Fairy": "sylveon",
	"Psychic": "espeon",
	"Ice": "glaceon",
	"Electric": "jolteon",
	"Normal": "eeveemega",
};

const eeveeabilities: {[k: string]: string} = {
	"vaporeon": "waterabsorb",
	"flareon": "flashfire",
	"leafeon": "chlorophyll",
	"umbreon": "synchronize",
	"sylveon": "cutecharm",
	"espeon": "magicbounce",
	"glaceon": "snowcloak",
	"jolteon": "voltabsorb",
	"eeveemega": "proteanmaxima",
};

export const Abilities: {[k: string]: ModdedAbilityData} = {
	...Dex.deepClone(require('../gen9insurgence/abilities').Abilities),
	intoxicate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Poison';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Intoxicate",
		desc: "This Pokemon's Normal-type moves become Poison-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type.",
		shortDesc: "This Pokemon's Normal-type moves become Poison type and have 1.3x power.",
		rating: 4,
		num: 0,
	},
	foundry: {
		onTryMovePriority: -2,
		onTryMove(pokemon, target, move) {
			if (move.id === 'stealthrock') {
				this.actions.useMove('hotcoals', pokemon, target);
				return null;
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Rock' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fire';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Foundry",
		desc: "This Pokemon's Rock-type moves become Fire-type moves and have their power multiplied by 1.3. This effect comes after other effects that change a move's type. Stealth Rock sets a Fire-type variant instead.",
		shortDesc: "This Pokemon's Rock-type moves become Fire type and have 1.3x power.",
		rating: 4,
		num: 0,
	},
};