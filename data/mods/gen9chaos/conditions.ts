import { Utils } from '../../../lib';
import { Conditions as Base } from '../../conditions';
import { type ModdedConditionDataTable } from '../../../sim/dex-conditions';

export const Conditions: ModdedConditionDataTable = {
	frz: Base.frz,
	confusion: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {
			if (move.id === 'ringtrue') return;
			pokemon.volatiles['confusion'].time--;
			if (!pokemon.volatiles['confusion'].time) {
				pokemon.removeVolatile('confusion');
				return;
			}
			this.add('-activate', pokemon, 'confusion');
			if (!this.randomChance(33, 100)) {
				return;
			}
			this.activeTarget = pokemon;
			const damage = this.actions.getConfusionDamage(pokemon, 40);
			if (typeof damage !== 'number') throw new Error("Confusion damage not dealt");
			const activeMove = { id: this.toID('confused'), effectType: 'Move', type: '???' };
			this.damage(damage, pokemon, pokemon, activeMove as ActiveMove);
			return false;
		},
	},
	choicelock: {
		inherit: true,
		onBeforeMove(pokemon, target, move) {
			if (!pokemon.getItem().isChoice) {
				pokemon.removeVolatile('choicelock');
				return;
			}
			if (
				!pokemon.ignoringItem() && !pokemon.volatiles['dynamax'] &&
				move.id !== this.effectState.move && move.id !== 'struggle' && move.id !== 'ringtrue'
			) {
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Choice item lock");
				this.add('-fail', pokemon);
				return false;
			}
		},
	},
	arceus: {
		inherit: true,
		onType(types, pokemon) {
			if (pokemon.m.fusion || pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	partiallytrapped: { // modified because of great bind
		name: 'partiallytrapped',
		duration: 5,
		durationCallback(target, source) {
			if (source?.lastMoveUsed?.id === 'greatbind') return source?.hasItem('gripclaw') ? 6 : 5; // always 4 turns, 5 if grip claw
			if (source?.hasItem('gripclaw')) return 8;
			return this.random(5, 7);
		},
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, `[of] ${source}`);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			// G-Max Centiferno and G-Max Sandblast continue even after the user leaves the field
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}
			this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
		},
		onTrapPokemon(pokemon) {
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (this.effectState.source?.isActive || gmaxEffect) pokemon.tryTrap();
		},
	},

	// POA
	///////////////////////////////////////////////////////////////////

	// Additions
	scatteredcoins: {
		name: 'Scattered Coins',
		noCopy: true,
		onSideStart(side, source, sourceEffect) {
			this.add('-sidestart', side, 'move: Scattered Coins');
		},
		onSideEnd(side) {
			this.add('-sideend', side, 'move: Scattered Coins');
		},
	},
	luckycharm: {
		name: 'Lucky Charm',
		noCopy: true,
		onSideStart(side, source, sourceEffect) {
			this.add('-sidestart', side, 'ability: Lucky Charm');
		},
		onModifySecondaries(secondaries) {
			this.debug('Lucky Charm prevent secondary');
			return secondaries.filter(effect => !!effect.self);
		},
		onSideEnd(side) {
			this.add('-sideend', side, 'ability: Lucky Charm');
		},
		onCriticalHit: false,
	},
};

export const Manual = Utils.deepClone(Conditions);
const mods = require('./mods.json');
for (const mod in mods) {
	const ModConditions: AnyObject = require('../' + mod + '/conditions').Conditions;

	for (const key in ModConditions) {
		const id = key as IDEntry;

		if (Manual[id] || (mods[mod]["Conditions"]?.includes(id))) continue;

		if (!Conditions[id]) Conditions[id] = Base[id] ? { inherit: true } : {};
		const condition: AnyObject = Conditions[id];

		for (const attr in ModConditions[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			if (condition[attr]) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				condition[attr] = ModConditions[id][attr];
			}
		}
	}
}
