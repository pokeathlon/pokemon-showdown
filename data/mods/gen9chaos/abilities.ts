// @ts-nocheck
import { Utils } from '../../../lib';
import { Abilities as Base } from '../../abilities';
import { ModdedAbilityDataTable } from '../../../sim/dex-abilities';

export const Abilities: ModdedAbilityDataTable = {
	disguise: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (
				effect?.effectType === 'Move' &&
				(['mimikyu', 'mimikyutotem'].includes(target.species.id) || ['mimikyu', 'mimikyutotem'].includes(this.dex.toID(target.fusion)) ||
				['uproot'].includes(target.species.id) || ['uproot'].includes(this.dex.toID(target.fusion)))
			) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (
				!['mimikyu', 'mimikyutotem'].includes(target.species.id) && !['mimikyu', 'mimikyutotem'].includes(this.dex.toID(target.fusion)) &&
				!['uproot'].includes(target.species.id) && !['uproot'].includes(this.dex.toID(target.fusion))
			) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (
				!['mimikyu', 'mimikyutotem'].includes(target.species.id) && !['mimikyu', 'mimikyutotem'].includes(this.dex.toID(target.fusion)) &&
				!['uproot'].includes(target.species.id) && !['uproot'].includes(this.dex.toID(target.fusion))
			) {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (this.effectState.busted) {
				let valid = false;
				if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id)) {
					const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
					pokemon.formeChange(speciesid, this.effect, true);
					valid = true;
				} if (['mimikyu', 'mimikyutotem'].includes(this.dex.toID(pokemon.fusion))) {
					const fusionid = this.dex.toID(pokemon.fusion) === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
					pokemon.fusionChange(fusionid, this.effect);
					valid = true;
				} if (['uproot'].includes(pokemon.species.id)) {
					const speciesid = 'Uproot-Naked';
					pokemon.formeChange(speciesid, this.effect, true);
					valid = true;
				} if (['uproot'].includes(this.dex.toID(pokemon.fusion))) {
					const fusionid = 'Uproot-Naked';
					pokemon.fusionChange(fusionid, this.effect);
					valid = true;
				} if (valid) {
					this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
				}
			}
		},
	},
	flowergift: {
		inherit: true,
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || pokemon.transformed) return;
			if (!pokemon.hp) return;
			const fusionSpecies = this.dex.species.get(pokemon.fusion);
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine' && pokemon.baseSpecies.baseSpecies === 'Cherrim') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				} else if (pokemon.fusion !== 'Cherrim-Sunshine' && fusionSpecies.baseSpecies === 'Cherrim') {
					pokemon.fusionChange('Cherrim-Sunshine', this.effect);
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine' && pokemon.baseSpecies.baseSpecies === 'Cherrim') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				} else if (pokemon.fusion === 'Cherrim-Sunshine' && fusionSpecies.baseSpecies === 'Cherrim') {
					pokemon.fusionChange('Cherrim', this.effect);
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
	},
	forecast: {
		inherit: true,
		onWeatherChange(pokemon) {
			if (pokemon.transformed || !pokemon.isActive) return;
			let castforme = null;
			let broforme = null;
			switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					castforme = 'Castform-Sunny';
					broforme = 'Fire Bro';
					break;
				case 'raindance':
				case 'primordialsea':
					castforme = 'Castform-Rainy';
					broforme = 'Boomerang Bro';
					break;
				case 'hail':
				case 'snowscape':
					castforme = 'Castform-Snowy';
					broforme = 'Ice Bro';
					break;
				case 'sandstorm':
					castforme = 'Castform-Sandy';
					break;
				case 'newmoon':
					castforme = 'Castform-Cloudy';
					break;
				default:
					castforme = 'Castform';
					broforme = 'Hammer Bro';
					break;
			}
			if (castforme) {
				if (pokemon.baseSpecies.baseSpecies === 'Castform' && pokemon.species.name !== castforme) {
					pokemon.formeChange(castforme, this.effect, false, '[msg]');
				} 
				if (pokemon.fusion?.includes('Castform') && pokemon.fusion !== castforme) {
					pokemon.fusionChange(castforme, this.effect);
				}
			}
			if (broforme) {
				if (pokemon.baseSpecies.baseSpecies === 'Hammer Bro' && pokemon.species.name !== broforme) {
					pokemon.formeChange(broforme, this.effect, false, '[msg]');
				} 
				if (pokemon.fusion?.endsWith(' Bro') && pokemon.fusion !== broforme) {
					pokemon.fusionChange(broforme, this.effect);
				}
			}
		},
	},
	lernean: {
		onUpdate(pokemon) {
			if (!pokemon.species.id.startsWith('hydreigonmega') || !pokemon.hp || pokemon.transformed) return;
			const formeOrder = ['hydreigonmeganine', 'hydreigonmegaeight', 'hydreigonmegaseven', 'hydreigonmegasix', 'hydreigonmega'];
			const targetForme = Math.ceil((pokemon.hp / pokemon.maxhp) * 5) - 1;
			if (formeOrder.indexOf(pokemon.species.id) > targetForme) {
				pokemon.formeChange(formeOrder[targetForme], this.effect, true);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (!pokemon.species.id.startsWith('hydreigonmega')) return;
			if (move.category === "Status" || !move.basePower) return;
			const formes = ['hydreigonmega', 'hydreigonmegasix', 'hydreigonmegaseven', 'hydreigonmegaeight', 'hydreigonmeganine'];
			move.multihit = 5 + formes.indexOf(pokemon.species.id);
			if (move.secondaries) {
			   // delete move.secondaries; // Secondaries should still trigger, but only once after all hits take place.
			   // Technically not a secondary effect, but it is negated
			   delete move.self;
			   if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
		   }
		},
		onBasePower(basePower, pokemon, target, move) {
			if (!pokemon.species.id.startsWith('hydreigonmega')) return;
			const formes = ['hydreigonmega', 'hydreigonmegasix', 'hydreigonmegaseven', 'hydreigonmegaeight', 'hydreigonmeganine'];
			const nhits = 5 + formes.indexOf(pokemon.species.id);
			return this.chainModify((1.15 + (0.075 * (nhits - 5))) / nhits);
		},
		onSourceDamagingHit(damage, target, pokemon, move) { // onSourceDamagingHit activates after a hit, not before. Need to get secondaries from onModifyMove
			if (pokemon.species.id.startsWith('hydreigonmega') && move.secondaries) {
				delete move.secondaries;
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		name: "Lernean",
		shortDesc: "Grows heads when it loses HP. Moves become multihit.",
		rating: 4.5,
		num: 0,
	},
	noguard: {
		inherit: true,
		onAnyInvulnerability(target, source, move) {
			if (move && !move.ohko && (!source.hasItem('mankeyspaw')) && (source === this.effectState.target || target === this.effectState.target)) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && !move.ohko && (!source.hasItem('mankeyspaw')) && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
	},
	schooling: {
		inherit: true,
		onStart(pokemon) {
			if (
				(pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' && !pokemon.fusion?.includes('Wishiwashi')) ||
				(pokemon.baseSpecies.baseSpecies !== 'Fuzzy' && !pokemon.fusion?.includes('Fuzzy')) ||
				pokemon.level < 20 || pokemon.transformed
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
				if (pokemon.fusion === 'Wishiwashi') {
					pokemon.fusionChange('Wishiwashi-School');
				}
				if (pokemon.species.id === 'fuzzy') {
					pokemon.formeChange('Fuzzy-Swarm');
				}
				if (pokemon.fusion === 'Fuzzy') {
					pokemon.fusionChange('Fuzzy-Swarm');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
				if (pokemon.fusion === 'Wishiwashi-School') {
					pokemon.fusionChange('Wishiwashi');
				}
				if (pokemon.species.id === 'fuzzyswarm') {
					pokemon.formeChange('Fuzzy');
				}
				if (pokemon.fusion === 'Fuzzy-Swarm') {
					pokemon.fusionChange('Fuzzy');
				}
			}
		},
		onResidual(pokemon) {
			if (
				(pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' && !pokemon.fusion?.includes('Wishiwashi')) ||
				(pokemon.baseSpecies.baseSpecies !== 'Fuzzy' && !pokemon.fusion?.includes('Fuzzy')) ||
				pokemon.level < 20 || pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
				if (pokemon.fusion === 'Wishiwashi') {
					pokemon.fusionChange('Wishiwashi-School');
				}
				if (pokemon.species.id === 'fuzzy') {
					pokemon.formeChange('Fuzzy-Swarm');
				}
				if (pokemon.fusion === 'Fuzzy') {
					pokemon.fusionChange('Fuzzy-Swarm');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
				if (pokemon.fusion === 'Wishiwashi-School') {
					pokemon.fusionChange('Wishiwashi');
				}
				if (pokemon.species.id === 'fuzzyswarm') {
					pokemon.formeChange('Fuzzy');
				}
				if (pokemon.fusion === 'Fuzzy-Swarm') {
					pokemon.fusionChange('Fuzzy');
				}
			}
		},
	},
};

const Manual = Utils.deepClone(Abilities);
for (const mod in require('./mods.json')) {
	const ModAbilities = require('../' + mod + '/abilities').Abilities as ModdedAbilityDataTable;

	for (const key in ModAbilities) {
		const id = key as keyof typeof ModAbilities;

		if (!Abilities[id]) Abilities[id] = Base[id] ? {inherit: true} : {};

		for (const attr in ModAbilities[id]) {
			if (['inherit', 'isNonstandard', 'num', 'gen'].includes(attr)) continue;
			if (Abilities[id][attr] && (!Manual[id] || !Manual[id][attr])) console.log(`\nUnresolved collision at ${id}, ${attr}.`);
			else {
				Abilities[id][attr] = ModAbilities[id][attr];
			}
		}
	}
}
