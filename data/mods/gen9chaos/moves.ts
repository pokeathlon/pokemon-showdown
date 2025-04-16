// @ts-nocheck
import { Utils } from '../../../lib';
import { Moves as Base } from '../../moves';
import { ModdedMoveDataTable } from '../../../sim/dex-moves';

const removeAllUniversal = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'hotcoals', 'permafrost', 'livewire'];
const removeTargetUniversal = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', ...removeAllUniversal];
const removeVolatileUniversal = ['Leech Seed', 'Zealous Flock'];

export const Moves: ModdedMoveDataTable = {
	// CLEARING MOVES
	courtchange: {
		inherit: true,
		onHitField(target, source) {
			const sideConditions = [
				'tailwind', 'waterpledge', 'firepledge', 'grasspledge', 'luckychant', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire', 'gmaxvolcalith',
			].concat(removeTargetUniversal);
			let success = false;
			if (this.gameType === "freeforall") {
				// random integer from 1-3 inclusive
				const offset = this.random(3) + 1;
				// the list of all sides in counterclockwise order
				const sides = [this.sides[0], this.sides[2]!, this.sides[1], this.sides[3]!];
				const temp: { [k: number]: typeof source.side.sideConditions } = { 0: {}, 1: {}, 2: {}, 3: {} };
				for (const side of sides) {
					for (const id in side.sideConditions) {
						if (!sideConditions.includes(id)) continue;
						temp[side.n][id] = side.sideConditions[id];
						delete side.sideConditions[id];
						const effectName = this.dex.conditions.get(id).name;
						this.add('-sideend', side, effectName, '[silent]');
						success = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					const sourceSideConditions = temp[sides[i].n];
					const targetSide = sides[(i + offset) % 4]; // the next side in rotation
					for (const id in sourceSideConditions) {
						targetSide.sideConditions[id] = sourceSideConditions[id];
						targetSide.sideConditions[id].target = targetSide;
						const effectName = this.dex.conditions.get(id).name;
						let layers = sourceSideConditions[id].layers || 1;
						for (; layers > 0; layers--) this.add('-sidestart', targetSide, effectName, '[silent]');
					}
				}
			} else {
				const sourceSideConditions = source.side.sideConditions;
				const targetSideConditions = source.side.foe.sideConditions;
				const sourceTemp: typeof sourceSideConditions = {};
				const targetTemp: typeof targetSideConditions = {};
				for (const id in sourceSideConditions) {
					if (!sideConditions.includes(id)) continue;
					sourceTemp[id] = sourceSideConditions[id];
					delete sourceSideConditions[id];
					success = true;
				}
				for (const id in targetSideConditions) {
					if (!sideConditions.includes(id)) continue;
					targetTemp[id] = targetSideConditions[id];
					delete targetSideConditions[id];
					success = true;
				}
				for (const id in sourceTemp) {
					targetSideConditions[id] = sourceTemp[id];
					targetSideConditions[id].target = source.side.foe;
				}
				for (const id in targetTemp) {
					sourceSideConditions[id] = targetTemp[id];
					sourceSideConditions[id].target = source.side;
				}
				this.add('-swapsideconditions');
			}
			if (!success) return false;
			this.add('-activate', source, 'move: Court Change');
		},
	},
	defog: {
		inherit: true,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({ evasion: -1 });
			const removeAll = removeAllUniversal;
			const removeTarget = removeTargetUniversal;
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', `[of] ${source}`);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', `[of] ${source}`);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
	},
	mortalspin: {
		inherit: true,
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				for (const volatile of removeVolatileUniversal) {
					if (pokemon.hp && pokemon.removeVolatile(this.dex.toID(volatile))) {
						this.add('-end', pokemon, volatile, '[from] move: Mortal Spin', `[of] ${pokemon}`);
					}
				}
				const sideConditions = removeAllUniversal;
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', `[of] ${pokemon}`);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				for (const volatile of removeVolatileUniversal) {
					if (pokemon.hp && pokemon.removeVolatile(this.dex.toID(volatile))) {
						this.add('-end', pokemon, volatile, '[from] move: Mortal Spin', `[of] ${pokemon}`);
					}
				}
				const sideConditions = removeAllUniversal;
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Mortal Spin', `[of] ${pokemon}`);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
	},
	rapidspin: {
		inherit: true,
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				for (const volatile of removeVolatileUniversal) {
					if (pokemon.hp && pokemon.removeVolatile(this.dex.toID(volatile))) {
						this.add('-end', pokemon, volatile, '[from] move: Rapid Spin', `[of] ${pokemon}`);
					}
				}
				const sideConditions = removeAllUniversal;
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', `[of] ${pokemon}`);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				for (const volatile of removeVolatileUniversal) {
					if (pokemon.hp && pokemon.removeVolatile(this.dex.toID(volatile))) {
						this.add('-end', pokemon, volatile, '[from] move: Rapid Spin', `[of] ${pokemon}`);
					}
				}
				const sideConditions = removeAllUniversal;
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', `[of] ${pokemon}`);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
	},
	tidyup: {
		inherit: true,
		onHit(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = removeAllUniversal;
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
						success = true;
					}
				}
			}
			if (success) this.add('-activate', pokemon, 'move: Tidy Up');
			return !!this.boost({ atk: 1, spe: 1 }, pokemon, pokemon, null, false, true) || success;
		},
	},

	// OTHER
	darkvoid: {
		inherit: true,
		onTry(source, target, move) {
			if ([source.species.name, source.fusion].some((name) => ['Darkrai', 'Antasma'].includes(name)) || move.hasBounced) {
				return;
			}
			this.add('-fail', source, 'move: Dark Void');
			this.hint("Only a Pokemon whose form or fusion is Darkrai can use this move.");
			return null;
		},
	},
	relicsong: {
		inherit: true,
		onHit(target, pokemon, move) {
			if ([pokemon.species.name, pokemon.fusion].some((name) => name?.includes('Meloetta')) && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				if (pokemon.species.baseSpecies.includes('Meloetta')) {
					let forme = '';
					if (pokemon.baseSpecies.baseSpecies === 'Meloetta') {
						forme = pokemon.species.id === 'meloettapirouette' ? '' : '-Pirouette';
					}
					if (pokemon.baseSpecies.baseSpecies === 'Meloetta-Delta') {
						forme = pokemon.species.id === 'meloettadeltamagician' ? '-Delta' : '-Delta-Magician';
					}
					pokemon.formeChange('Meloetta' + forme, this.effect, false, '[msg]');
				} if (pokemon.fusion?.includes('Meloetta')) {
					let forme = '';
					if (this.dex.species.get(pokemon.fusion).baseSpecies === 'Meloetta') {
						forme = this.dex.species.get(pokemon.fusion).id === 'meloettapirouette' ? '' : '-Pirouette';
					}
					if (this.dex.species.get(pokemon.fusion).baseSpecies === 'Meloetta-Delta') {
						forme = this.dex.species.get(pokemon.fusion).id === 'meloettadeltamagician' ? '-Delta' : '-Delta-Magician';
					}
					pokemon.fusionChange('Meloetta' + forme, this.effect);
				}
			}
		},
	},
};

const Manual = Utils.deepClone(Moves);
for (const mod in require('./mods.json')) {
	const ModMoves = require('../' + mod + '/moves').Moves as ModdedMoveDataTable;

	for (const key in ModMoves) {
		const id = key as keyof typeof ModMoves;

		if (!Moves[id]) Moves[id] = Base[id] ? {inherit: true} : {};
					
		for (const attr in ModMoves[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			if (Moves[id][attr] && (!Manual[id] || !Manual[id][attr])) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				Moves[id][attr] = ModMoves[id][attr];
			}
		}
	}
}
