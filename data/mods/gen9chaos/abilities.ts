// @ts-nocheck
import { Utils } from '../../../lib';
import { Abilities as Base } from '../../abilities';
import { ModdedAbilityDataTable } from '../../../sim/dex-abilities';

const eeveelutions: {[k: string]: string} = {
	"Water": "vaporeon",
	"Fire": "flareon",
	"Grass": "leafeon",
	"Dark": "umbreon",
	"Fairy": "sylveon",
	"Psychic": "espeon",
	"Ice": "glaceon",
	"Electric": "jolteon",
	"Ghost": "omeon",
	"Fighting": "champeon",
	"Rock": "obsideon",
	"Ground": "sphynxeon",
	"Poison": "scorpeon",
	"Steel": "guardeon",
	"Dragon": "draconeon",
	"Bug": "lepideon",
	"Flying": "nimbeon",
	"Nuclear": "nucleon",
	"???": "vareon",
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
	"omeon": "moxie",
	"champeon": "scrappy",
	"obsideon": "rockhead",
	"sphynxeon": "technician",
	"scorpeon": "poisontouch",
	"guardeon": "bulletproof",
	"draconeon": "toughclaws",
	"lepideon": "tintedlens",
	"nimbeon": "galewings",
	"eeveemega": "proteanmaxima",
};

export const Abilities: ModdedAbilityDataTable = {
	// MODDED
	proteanmaxima: {
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== eeveelutions["Normal"] && pokemon.species.id in eeveeabilities) {
				pokemon.addVolatile('ability:' + eeveeabilities[pokemon.species.id]);
				this.add('-activate', pokemon, 'ability: ' + this.dex.abilities.get(eeveeabilities[pokemon.species.id]).name);
			}
		},
		onUpdate(pokemon) {
			const action = this.queue.willMove(pokemon);
			if (!action) return;
			const move = this.dex.getActiveMove(action.move.id);
			if (move.type in eeveelutions && pokemon.species.id !== eeveelutions[move.type]) {
				if (pokemon.species.id !== eeveelutions["Normal"]) {
					pokemon.removeVolatile('ability:' + eeveeabilities[eeveelutions[pokemon.species.types[0]]]);
				}
				pokemon.formeChange(eeveelutions[move.type], this.dex.abilities.get('Protean Maxima'), true);
				pokemon.addVolatile('ability:' + eeveeabilities[pokemon.species.id]);
				this.add('-activate', pokemon, 'ability: ' + this.dex.abilities.get(eeveeabilities[pokemon.species.id]).name);

				// In Insurgence, the action order is recalculated for a Protean Maxima transform.
				for (const [i, queuedAction] of this.queue.list.entries()) {
					if (queuedAction.pokemon === pokemon && queuedAction.choice === 'move') {
						this.queue.list.splice(i, 1);
						this.queue.insertChoice(queuedAction, true);
						break;
					}
				}

				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				if (pokemon.hp < 1) pokemon.hp = 1;
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Protean Maxima",
		shortDesc: "Transforms into the eeveelution corresponding to the type of the move used.",
		rating: 4.5,
		num: 0,
	},

	// COLLISIONS
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
			if (!pokemon.isActive || pokemon.transformed || !pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.name === 'Cherrim') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				}
				if (pokemon.fusion === 'Cherrim') {
					pokemon.fusionChange('Cherrim-Sunshine', this.effect);
				}
			} else {
				if (pokemon.species.name === 'Cherrim-Sunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				}
				if (pokemon.fusion === 'Cherrim-Sunshine') {
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
			if (!pokemon.hp || pokemon.transformed) return;
			const formeOrder = ['-Nine', '-Eight', '-Seven', '-Six', ''];
			const targetForme = Math.ceil((pokemon.hp / pokemon.maxhp) * 5) - 1;
			if (formeOrder.indexOf(pokemon.species.id) > targetForme) {
				for (const name of ['Hydreigon-Mega', 'Hydroupa']) {
					if (pokemon.species.name.startsWith(name)) {
						pokemon.formeChange(name + formeOrder[targetForme], this.effect, true);
					}
					if (pokemon.fusion?.startsWith(name)) {
						pokemon.fusionChange(name + formeOrder[targetForme], this.effect);
					}
				}
			}
		},
		onModifyMove(move, pokemon, target) {
			if (!['Hydreigon-Mega', 'Hydroupa'].some((name) => [pokemon.species.name, pokemon.fusion].includes(name)) || move.category === "Status" || !move.basePower) return;

			for (const name of ['Hydreigon-Mega', 'Hydroupa']) {
				const formes = [name + '', name + '-Six', name + '-Seven', name + '-Eight', name + '-Nine'];

				const index = formes.indexOf(pokemon.species.name);
				if (index >= 0) {
					move.multihit = 5 + index;
					if (move.secondaries) {
						// delete move.secondaries; // Secondaries should still trigger, but only once after all hits take place.
						// Technically not a secondary effect, but it is negated
						delete move.self;
						if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
					}
					break;
				}
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (!['Hydreigon-Mega', 'Hydroupa'].some((name) => [pokemon.species.name, pokemon.fusion].includes(name))) return;
			for (const name of ['Hydreigon-Mega', 'Hydroupa']) {
				const formes = [name + '', name + '-Six', name + '-Seven', name + '-Eight', name + '-Nine'];

				const index = formes.indexOf(pokemon.species.name);
				if (index >= 0) {
					const nhits = 5 + index;
					return this.chainModify((1.15 + (0.075 * (nhits - 5))) / nhits);
				}
			}
		},
		onSourceDamagingHit(damage, target, pokemon, move) { // onSourceDamagingHit activates after a hit, not before. Need to get secondaries from onModifyMove
			if (['Hydreigon-Mega', 'Hydroupa'].some((name) => [pokemon.species.name, pokemon.fusion].includes(name)) && move.secondaries) {
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
				(pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' && !pokemon.fusion?.includes('Wishiwashi')) &&
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
				(pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' && !pokemon.fusion?.includes('Wishiwashi')) &&
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
