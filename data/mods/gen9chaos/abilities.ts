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

export const treasures: {[k: string]: string} = {
	dracoplate: 'protean',
	dreadplate: 'protean',
	earthplate: 'protean',
	fistplate: 'protean',
	flameplate: 'protean',
	icicleplate: 'protean',
	insectplate: 'protean',
	ironplate: 'protean',
	meadowplate: 'protean',
	mindplate: 'protean',
	pixieplate: 'protean',
	skyplate: 'protean',
	splashplate: 'protean',
	spookyplate: 'protean',
	stoneplate: 'protean',
	toxicplate: 'protean',
	zapplate: 'protean',
	choiceband: 'toughclaws',
	muscleband: 'toughclaws',
	choicespecs: 'analytic',
	wiseglasses: 'analytic',
	choicescarf: 'bushido',
	lifeorb: 'magicguard',
	flameorb: 'flareboost',
	toxicorb: 'poisonheal',
	mirrorherb: 'opportunist',
	whiteherb: 'opportunist',
	vigorherb: 'opportunist',
	silverpowder: 'adaptability',
	blackglasses: 'adaptability',
	dragonfang: 'adaptability',
	magnet: 'adaptability',
	fairyfeather: 'adaptability',
	charcoal: 'adaptability',
	sharpbeak: 'adaptability',
	spelltag: 'adaptability',
	miracleseed: 'adaptability',
	softsand: 'adaptability',
	nevermeltice: 'adaptability',
	silkscarf: 'adaptability',
	poisonbarb: 'adaptability',
	twistedspoon: 'adaptability',
	hardstone: 'adaptability',
	metalcoat: 'adaptability',
	mysticwater: 'adaptability',
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

	// POA
	///////////////////////////////////////////////////////////////////

	// Additions
	consumerexchange: {
		onSourceDamagingHit(damage, target, source, move) {
			if (this.effectState.exchange !== false) {
				const yourItem = target.takeItem(source);
				const myItem = source.takeItem();

				if (target.item || source.item || (!yourItem && !myItem)) {
					if (yourItem) target.item = yourItem.id;
					if (myItem) source.item = myItem.id;
					return false;
				}
				if (
					(myItem && !this.singleEvent('TakeItem', myItem, source.itemState, target, source, move, myItem)) ||
					(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem))
				) {
					if (yourItem) target.item = yourItem.id;
					if (myItem) source.item = myItem.id;
					return false;
				}
				this.add('-activate', source, 'ability: Consumer Exchange', '[of] ' + target);
				if (myItem) {
					target.setItem(myItem);
					this.add('-item', target, myItem, '[from] ability: Consumer Exchange');
				} else {
					this.add('-enditem', target, yourItem, '[silent]', '[from] ability: Consumer Exchange');
				}
				if (yourItem) {
					source.setItem(yourItem);
					this.add('-item', source, yourItem, '[from] ability: Consumer Exchange');
				} else {
					this.add('-enditem', source, myItem, '[silent]', '[from] ability: Consumer Exchange');
				}

				this.effectState.exchange = false;
			}
		},
		onStart(pokemon) {
			this.effectState.exchange = true;
		},
		flags: {},
		name: "Consumer Exchange",
		desc: "The first successful attack used by this Pokémon every time it is sent out onto the field will cause it to switch items with its opponent. Fails if the move misses, has no effect, or if the target's item cannot be removed.",
		shortDesc: "First successful attack after switching in swaps items.",
		rating: 3,
		num: 0,
	},
	windywall: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying') {
				this.add('-immune', target, '[from] ability: Windy Wall');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Windy Wall",
		shortDesc: "This Pokemon is immune to Flying-type moves.",
		rating: 3.5,
		num: 0,
	},
	fairylaw: {
		onStart(target) {
			this.add('-activate', target, 'ability: Fairy Law');
			target.addVolatile('imprison');
		},
		flags: {},
		name: "Fairy Law",
		shortDesc: "The effect of Imprison begins when this Pokemon enters the field.",
		rating: 4,
		num: 0,
	},
	musclememory: {
		onBeforeSwitchOut(pokemon) {
			this.effectState.muscleStats = pokemon.boosts;
		},
		onStart(pokemon) {
			if (this.effectState.muscleStats) {
				this.boost(this.effectState.muscleStats, pokemon, pokemon);
			}
		},
		flags: {},
		name: "Muscle Memory",
		shortDesc: "This Pokemon's stat boosts remain after switching.",
		rating: 4,
		num: 0,
	},
	bushido: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (defender.newlySwitched || this.queue.willMove(defender)) {
				this.debug('Bushido damage boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (defender.newlySwitched || this.queue.willMove(defender)) {
				this.debug('Bushido damage boost');
				return this.chainModify(1.3);
			}
		},
		flags: {},
		name: "Bushido",
		shortDesc: "When this Pokemon moves first, its attacks have 1.3x power.",
		rating: 4,
		num: 0,
	},
	slowlight: {
		onStart(source) {
			this.add('-activate', source, 'ability: Slow Light');
			if (this.field.pseudoWeather.gravity) {
				this.field.removePseudoWeather('gravity');
			} else {
				this.field.addPseudoWeather('gravity');
			}
		},
		flags: {},
		name: "Slow Light",
		shortDesc: "On Switch-in, this Pokemon summons Gravity; if Gravity is active its effects are removed.",
		rating: 4.5,
		num: 0,
	},
	sandydefense: {
		onModifySpD(spd, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onModifyDef(def, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		flags: {breakable: 1},
		name: "Sandy Defense",
		shortDesc: "This Pokemon's Defense and Special Defense are boosted 1.5 in sandstorm.",
		rating: 3,
		num: 0,
	},
	inertia: {
		onAnyModifyPriority(priority, pokemon) {
			if (pokemon.activeMoveActions === 0) return priority - 1;
		},
		flags: {},
		name: "Inertia",
		shortDesc: "On every Pokemon's first turn, its moves have -1 priority. Includes user.",
		rating: 4.5,
		num: 0,
	},
	multishot: {
		onModifyMove(move, pokemon, target) {
			if (move.category !== "Special" || !move.basePower) return;
			move.multihit = [2, 5];
		},
		onBasePower(basePower, pokemon, target, move) {
			if (move.category === "Special") return this.chainModify([3, 10]);
		},
		flags: {},
		name: "Multishot",
		shortDesc: "This Pokemon's special moves become multihit with 0.3x power.",
		rating: 4.5,
		num: 0,
	},
	sacredtreasures: {
		onUpdate(pokemon) {
			const curItem = pokemon.getItem();
			if (curItem.id in treasures && pokemon.species.id === 'lunachibestowed' && pokemon.baseAbility !== treasures[curItem.id] as ID) {
				const ability = this.dex.abilities.get(treasures[curItem.id]);
				pokemon.baseAbility = ability.id;
				pokemon.ability = ability.id;
				this.add('-item', pokemon, pokemon.getItem());
				this.add('-ability', pokemon, ability);
			}
		},
		flags: {},
		name: "Sacred Treasures",
		shortDesc: "This Pokemon's ability depends on its item.",
		rating: 4.5,
		num: 0,
	},
	ivywall: {
		onImmunity(type, pokemon) {
			if (type === 'powder') return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Ivy Wall');
				return null;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass' || move.type === 'Water' || move.type === 'Electric' || move.type === 'Ground') {
				this.debug('Ivy Wall weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Ivy Wall",
		shortDesc: "This Pokémon takes on the resistances and immunities of the Grass type.",
		rating: 3,
		num: 0,
	},
	kablooey: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'laserpulse',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.volatiles["mustrecharge"]) {
				pokemon.removeVolatile("mustrecharge");
				this.add("cant", pokemon, "recharge");
				return;
			} else {
				this.actions.useMove("Self-Destruct", pokemon);
			}
		},
		flags: {},
		name: "Kablooey",
		shortDesc: "This Pokemon attempts to Self-Destruct at the end of each turn.",
		rating: 3,
		num: 0,
	},
	sanctuary: {
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Sanctuary');
			pokemon.side.addSideCondition('safeguard');
		},
		flags: {},
		name: "Sanctuary",
		shortDesc: "This Pokemon's summons Safeguard on switch-in.",
		rating: 4.5,
		num: 0,
	},
	counterclockwise: {
		onChangeBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			[boost.atk, boost.spa] = [boost.spa, boost.atk];
		},
		flags: {},
		name: "Counterclockwise",
		shortDesc: "This Pokemon's SpA boosts are swapped with its Atk boosts.",
		rating: 4,
		num: 0,
	},
	undeterred: {
		onDamage(damage, target, source, effect) {
			if (effect && ['stealthrock', 'spikes', 'gmaxsteelsurge', 'hotcoals'].includes(effect.id)) {
				return false;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (effect && effect.id !== 'stickyweb') return;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if (effect && ['toxicspikes', 'permafrost', 'livewire'].includes(effect.id)) {
				return false;
			}
		},
		flags: {},
		name: "Undeterred",
		shortDesc: "This Pokemon is immune to all entry hazards.",
		rating: 4,
		num: 0,
	},
	necromancy: {
		onStart(target) {
			let zombie;
			const log = this.dex.deepClone(this.log);
			log.reverse();
			for (const line of log) {
				if (zombie) break;
				if (line.includes('|faint|')) {
					const faintName = line.slice(12);
					const player = line.slice(7, 9);
					const side = player === 'p1' ? this.p1 : player === 'p2' ? this.p2 : player === 'p3' ? this.p3 : this.p4;
					if (side) {
						for (const mon of side.pokemon) {
							if (mon.name === faintName) zombie = mon;
						}
					}
				}
			}
			if (zombie) {
				const species = this.runEvent('ModifySpecies', this, null, this.effect, zombie.species);
				const newSpecies: Species = this.dex.deepClone(species);

				const moves = zombie.moveSlots;

				this.add('-activate', target, 'ability: Necromancy');
				this.add('-message', `${target.name} has gained control over the body of ${zombie.name}!`);

				const newType: string[] = [];

				for (const type of [...target.getTypes(), ...zombie.getTypes()]) {
					if (!newType.includes(type)) {
						newType.push(type);
					}
				}

				while (target.moveSlots.length < 4 && moves[target.moveSlots.length]) {
					target.moveSlots.push(moves[target.moveSlots.length]);
				}

				newSpecies.baseStats['atk'] += target.species.baseStats['atk'];
				newSpecies.baseStats['def'] += target.species.baseStats['def'];
				newSpecies.baseStats['spa'] += target.species.baseStats['spa'];
				newSpecies.baseStats['spd'] += target.species.baseStats['spd'];
				newSpecies.baseStats['spe'] += target.species.baseStats['spe'];

				target.setSpecies({...newSpecies, types: [...newType]});
				this.add('-start', target, 'typechange', target.types.join('/'));
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			breakable: 1, notransform: 1},
		name: "Necromancy",
		shortDesc: "This Pokemon can control the body of the last Pokemon who fainted.",
		rating: 4,
		num: 0,
	},
	cleansweep: {
		onStart(pokemon) {
			let success = false;
			for (const active of this.getAllActive()) {
				if (active.removeVolatile('substitute')) success = true;
			}
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'hotcoals', 'permafrost', 'livewire'];
			const sides = [pokemon.side, ...pokemon.side.foeSidesWithConditions()];
			for (const side of sides) {
				for (const sideCondition of removeAll) {
					if (side.removeSideCondition(sideCondition)) {
						this.add('-sideend', side, this.dex.conditions.get(sideCondition).name);
						success = true;
					}
				}
			}
			if (success) this.add('-activate', pokemon, 'ability: Clean Sweep');
			return success;
		},
		name: "Clean Sweep",
		shortDesc: "This Pokemon clears all hazards on switch-in.",
		rating: 4,
		num: 0,
	},
	starfall: {
		onBeforeSwitchIn(pokemon) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'livewire', 'permafrost', 'hotcoals', 'stickyweb', 'gmaxsteelsurge'];
			this.prng.shuffle(sideConditions);
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] ability: Starfall', '[of] ' + pokemon);
					return;
				}
			}
		},
		name: "Starfall",
		shortDesc: "Clears one random hazard on switch-in.",
		rating: 4,
		num: 0,
	},
	zealousflock: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!source.getVolatile('zealousflock')) source.addVolatile('zealousflock', target);
		},
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'Zealous Flock', '[of] ' + source);
			},
			onResidualOrder: 12,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 16);
			},
		},
		name: "Zealous Flock",
		shortDesc: "If the User is hit by an attack, the attacker loses 1/16 HP per turn until switched out.",
		rating: 4,
		num: 0,
	},
	multitasker: {
		onModifyMove(move, pokemon) {
			if (move.category === "Status") return;
			move.overrideDefensiveStat = move.category === "Physical" ? 'def' : 'spd';
			move.category = pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true) ? 'Physical' : 'Special';
		},
		name: "Multitasker",
		shortDesc: "Pokemon will always use highest attacking stat.",
		rating: 4,
		num: 0,
	},
	glutinousrice: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting') {
				this.debug("Glutinous Rice reduction");
				return this.chainModify(0.25);
			}
		},
		flags: {breakable: 1},
		name: "Glutinous Rice",
		shortDesc: "Takes 1/4 damage from Fighting-type attacks.",
		rating: 2,
		num: 0,
	},
	clairvoyance: {
		onChargeMove(pokemon, target, move) {
			this.debug('clairvoyance - remove charge turn for ' + move.id);
			this.attrLastMove('[still]');
			this.addMove('-anim', pokemon, move.name, target);
			return false; // skip charge turn
		},
		flags: {breakable: 1},
		name: "Clairvoyance",
		shortDesc: "Charge moves do not require a charge turn",
		rating: 5,
		num: 0,
	},
	cannoneer: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		name: "Cannoneer",
		desc: "This Pokemon's bullet-based attacks have their power multiplied by 1.5.",
		shortDesc: "This Pokemon's bullet-based attacks have 1.5x power. Pollen Puff heals 50% more.",
		rating: 3,
		num: 0,
	},
	psychoslider: {
		onModifySpe(spe) {
			if (this.field.isTerrain('psychicterrain')) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Psycho Slider",
		shortDesc: "If Psychic Terrain is active, this Pokemon's Speed is doubled.",
		rating: 3,
		num: 0,
	},
	spittingfire: {
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.type === 'Fire') {
				move.flags.sound = 1;
				move.flags.bypasssub = 1;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.flags.sound) return this.chainModify([4915, 4096]);
		},
		flags: {breakable: 1},
		name: "Spitting Fire",
		shortDesc: "Fire-type moves are now sound-based. Sound-based moves have 1.2x power.",
		rating: 3,
		num: 0,
	},
	hueshift: {
		onPrepareHit(source, target, move) {
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch') return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] ability: Hue Shift');
			}
		},
		onSwitchIn() {},
		flags: {},
		name: "Hue Shift",
		desc: "This Pokemon's type changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type.",
		shortDesc: "This Pokemon's type changes to match the type of the move it is about to use.",
		rating: 4,
		num: 0,
	},
	burstingspores: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
				this.heal(source.baseMaxhp / 8, target, source, 'drain');

			}
		},
		flags: {},
		name: "Bursting Spores",
		shortDesc: "Pokemon making contact with this Pokemon take 1/8 max HP recoil. User is healed for same amount.",
		rating: 2,
		num: 0,
	},
	belligerentquills: {
		onSourceDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true) && !move.multihit) {
				this.damage(target.baseMaxhp / 16, target, source);
			}
		},
		flags: {},
		name: "Belligerent Quills",
		shortDesc: "When dealing contact-based damage, deals an additional 1/16 max HP.",
		rating: 4,
		num: 0,
	},
	fullplate: {
		onTryBoost(boost, target, source, effect) {
			if (this.effectState.fullplate) return;
			let fullPlate = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					fullPlate = true;
				}
			}
			if (fullPlate && !target.getVolatile('fullPlate')) {
				target.addVolatile('fullPlate'); // to break recursion
				this.effectState.fullplate = true; // once per switch
				this.boost({def: 1}, target, target);
			} else {
				if (target.getVolatile('fullPlate')) target.removeVolatile('fullPlate'); // to reset for next move
			}
		},
		onSwitchIn(pokemon) {
			delete this.effectState.fullplate;
		},
		flags: {},
		name: "Full Plate",
		desc: "This Pokemon's Defense is raised by 1 stage for each of its stat stages that is raised.",
		shortDesc: "This Pokemon's Defense is raised by 1 for each of its stats that is raised",
		rating: 3,
		num: 0,
	},
	aquaguard: {
		onFoeBeforeMove(source, target, move) {
			if (source !== target && move.category !== "Status") {
				source.addVolatile('gastroacid');
			}
		},
		onFoeAfterMove(source, target, move) {
			source.removeVolatile('gastroacid');
			this.add('-ability', source, source.getAbility(), '[silent]');
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			source.removeVolatile('gastroacid');
			this.add('-ability', source, source.getAbility(), '[silent]');
		},
		flags: {},
		name: "Aqua Guard",
		shortDesc: "Ignores opposing Pokemon's abilities when taking damage.",
		rating: 3,
		num: 0,
	},
	sweettooth: {
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target || !item.isBerry) return;
			if (pokemon.species.id === 'caramitti') pokemon.formeChange('Caramitti-Crazed', this.effect, true);
			if (this.dex.toID(pokemon.fusion) === 'caramitti') pokemon.fusionChange('Caramitti-Crazed', this.effect);
		},
		onEatItem(item, pokemon) {
			if (pokemon.species.id === 'caramitti') pokemon.formeChange('Caramitti-Crazed', this.effect, true);
			if (this.dex.toID(pokemon.fusion) === 'caramitti') pokemon.fusionChange('Caramitti-Crazed', this.effect);
		},
		flags: {},
		name: "Sweet Tooth",
		shortDesc: "After consuming berry, x1.3 to Attack and Sp. Attack.",
		rating: 2.5,
		num: 0,
	},
	luckycharm: { // condition implemented in conditions.ts
		onStart(pokemon) {
			this.add('-activate', pokemon, 'ability: Lucky Charm');
			pokemon.side.addSideCondition('luckycharm');
		},
		onSwitchOut(pokemon) {
			pokemon.side.removeSideCondition('luckycharm');
		},
		flags: {breakable: 1},
		name: "Lucky Charm",
		shortDesc: "User's side is protected from critical hits and move secondaries.",
		rating: 2.5,
		num: 0,
	},
	crystalmana: {
		onTerrainChange(pokemon) {
			if (this.field.terrain) {
				this.add('-activate', pokemon, 'ability: Crystal Mana');
				this.boost({def: 1, spd: 1})
			}
		},
		onStart(pokemon) {
			if (this.field.terrain) {
				this.add('-activate', pokemon, 'ability: Crystal Mana');
				this.boost({def: 1, spd: 1})
			}
		},
		flags: {},
		name: "Crystal Mana",
		shortDesc: "Raises Def and Sp.Def by 1 stage upon terrain change.",
		rating: 2.5,
		num: 0,
	},
	kleptomancy: {
		onUpdate(pokemon) { // This method is stupid and awful, but onAllySideCondition only triggers when the foe uses Pay Day for some reason
			if (!pokemon.side.sideConditions['scatteredcoins']) pokemon.abilityState.coins = false;
			if (pokemon.side.sideConditions['scatteredcoins'] && !pokemon.abilityState.coins) {
				pokemon.abilityState.coins = true;
				if (pokemon.hasItem('amuletcoin')) {
					this.heal(pokemon.maxhp * 2 / 3, pokemon, pokemon);
				} else {
					this.heal(pokemon.maxhp / 3, pokemon, pokemon);
				}
				
			}
		},
		flags: {},
		name: "Kleptomancy",
		shortDesc: "When coins are scattered, recovers 1/3 max HP. 2/3 if holding Amulet Coin.",
		rating: 2.5,
		num: 0,
	},
	adaptivearmor: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (target.abilityState.type === undefined) {
				target.abilityState.type = move.type;
				this.add('-activate', target, 'ability: Adaptive Armor');
				this.add('-start', target, `adaptive${target.abilityState.type}`, '[from] ability: Adaptive Armor');
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === target.abilityState.type) {
				this.debug('Adaptive Armor neutralize');
				return this.chainModify(0.5);
			}
		},
		onSwitchOut(pokemon) {
			this.add('-end', pokemon, `adaptive${pokemon.abilityState.type}`, '[from] ability: Adaptive Armor');
			pokemon.abilityState.type = undefined;
		},
		flags: {breakable: 1},
		name: "Adaptive Armor",
		shortDesc: "Takes half damage from moves with the type of first move user is hit by.",
		rating: 2.5,
		num: 0,
	},
	momentum: {
		onStart(target) {
			target.abilityState.boostArray = [];
		},
		onAfterBoost(boost, target, source, effect) {
			for (const stat in boost) {
				const statBoost = boost[stat as keyof BoostsTable];
				if (statBoost && statBoost !== 0) {
					boost[stat as keyof BoostsTable] = statBoost / Math.abs(statBoost);
				}
			}
			
			target.abilityState.boost = boost; // Ensure only the last boost carries over before onResidual
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.abilityState.boostArray[0]) pokemon.abilityState.boostArray.push({});
			if (pokemon.statsLoweredThisTurn || pokemon.statsRaisedThisTurn) {
				pokemon.abilityState.boostArray.push(pokemon.abilityState.boost);
			} else {
				pokemon.abilityState.boostArray.push({})
			}
			let boost = pokemon.abilityState.boostArray[0]
			this.boost(boost, pokemon, pokemon)
			pokemon.abilityState.boostArray.shift()
		},
		flags: {breakable: 1},
		name: "Momentum",
		shortDesc: "The last stat changes in a turn are repeated next turn at 1 stage.",
		rating: 2.5,
		num: 0,
	},
	pixelperfect: { // implemented in scripts.ts
		flags: {},
		name: "Pixel Perfect",
		shortDesc: "+1 accuracy when missing a move.",
		rating: 2.5,
		num: 0,
	},
	pixiepower: {
		onBasePowerPriority: 19,
		onBasePower(basePower, source, target, move) {
			if (move.type === 'Fairy') {
				this.debug('Pixie Power Boost');
				return this.chainModify(1.5)
			}
		},
		flags: {},
		name: "Pixie Power",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's Fairy-Type moves have 1.5x power.",
	},
	windyspirit: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags.wind) {
				return this.chainModify(1.2);
			}
		},
		flags: {},
		name: "Windy Spirit",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's wind-based attacks have 1.2x power.",
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
