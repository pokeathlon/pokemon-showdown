import { Utils } from '../../../lib';
import { Moves as Base } from '../../moves';
import { Moves as Parent} from '../gen9infinitefusion/moves';

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	...Utils.deepClone(Parent),
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	geomancy: {
		inherit: true,
		isNonstandard: null,
	},
	oblivionwing: {
		inherit: true,
		isNonstandard: null,
	},
	moongeistbeam: {
		inherit: true,
		isNonstandard: null,
	},
	doubleironbash: {
		inherit: true,
		isNonstandard: null,
	},
	thousandwaves: {
		inherit: true,
		isNonstandard: null,
	},
	destinybond: {
		inherit: true,
		onPrepareHit(pokemon) {
			pokemon.removeVolatile('destinybond');
		},
	},
	relicsong: {
		num: 547,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Relic Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme = pokemon.species.id === 'meloettapirouette' ? '' : '-Pirouette';
				pokemon.formeChange('Meloetta' + meloettaForme, this.effect, false, '[msg]');
			}
		},
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Beautiful",
	},
	photongeyser: {
		inherit: true,
		onPrepareHit(target, source, move) {
			if (source.hasItem('Necrozium')) {
				if (source.species.name === 'Necrozma') {
					var abil = source.getAbility();
					source.formeChange('Necrozma-Ultra', this.effect, true, '[msg]');
					if (abil && abil.id !== 'prismarmor') source.setAbility(abil, null, true);
				} if (source.m.fusion && source.m.fusion === 'Necrozma') {
					var abil = source.getAbility();
					source.fusionChange('Necrozma-Ultra', this.effect);
					if (abil && abil.id !== 'prismarmor') source.setAbility(abil, null, true);
				}
			}
		},
	},
};
