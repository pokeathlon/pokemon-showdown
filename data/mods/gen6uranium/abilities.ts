import { Utils } from '../../../lib';
import { Abilities as Base } from '../../abilities';
import { Abilities as Parent} from '../gen9uranium/abilities';

export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	...Utils.deepClone(Parent),
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
	
	aftermath: {
		// Aftermath deals damage even if the target doesn't faint
		// This is a bug present in the game
		inherit: true,
		desc: "Pokemon making contact with this Pokemon lose 1/4 of their maximum HP, rounded down.",
		shortDesc: "Pokemon making contact with this Pokemon lose 1/4 of their max HP.",
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 4, source, target);
			}
		},
	},
};
