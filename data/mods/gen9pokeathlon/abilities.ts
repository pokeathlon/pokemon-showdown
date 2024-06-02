const {Dex} = require('../../../sim/dex');
const InsgAbilities = Dex.deepClone(require('../gen9insurgence/abilities').Abilities);

export const treasures: {[k: string]: string} = {
	abilityshield: 'klutz',
	absorbbulb: 'waterabsorb',
	adrenalineorb: 'defiant',
	airballoon: 'windrider',
	amuletcoin: 'goodasgold',
	assaultvest: 'bulletproof',
	bigroot: 'sapsipper',
	bindingband: 'suctioncups',
	blackbelt: 'unseenfist',
	blackglasses: 'darkaura',
	blacksludge: 'liquidooze',
	blunderpolicy: 'hustle',
	brightpowder: 'dazzling',
	cellbattery: 'lightningrod',
	charcoal: 'drought',
	choiceband: 'toughclaws',
	choicescarf: 'bushido',
	choicespecs: 'hubris',
	clearamulet: 'unaware',
	covertcloak: 'sheerforce',
	damprock: 'swiftswim',
	destinyknot: 'perishbody',
	dragonfang: 'dragonsmaw',
	ejectbutton: 'regenerator',
	ejectpack: 'clearbody',
	electricseed: 'electricsurge',
	eviolite: 'imposter',
	expertbelt: 'neuroforce',
	flameorb: 'flareboost',
	floatstone: 'levitate',
	focusband: 'stamina',
	focussash: 'angershell',
	fullincense: 'neutralizinggas',
	grassyseed: 'grassysurge',
	gripclaw: 'persistent',
	heatrock: 'chlorophyll',
	heavydutyboots: 'mountaineer',
	icyrock: 'slushrush',
	ironball: 'slowlight',
	kingsrock: 'stench',
	laggingtail: 'stall',
	leftovers: 'harvest',
	lifeorb: 'magicguard',
	lightclay: 'filter',
	loadeddice: 'technician',
	luminousmoss: 'stormdrain',
	magnet: 'magnetpull',
	mail: 'consumerexchange',
	mentalherb: 'oblivious',
	metalcoat: 'filter',
	metronome: 'skilllink',
	miracleseed: 'overcoat',
	mirrorherb: 'opportunist',
	mistyseed: 'mistysurge',
	mysticwater: 'drizzle',
	nevermeltice: 'snowwarning',
	poisonbarb: 'toxicchain',
	powerherb: 'soulheart',
	protectivepads: 'rockhead',
	psychicseed: 'pyschicsurge',
	punchingglove: 'ironfist',
	quickclaw: 'quickdraw',
	razorclaw: 'sharpness',
	redcard: 'fairylaw',
	ringtarget: 'mummy',
	rockyhelmet: 'ironbarbs',
	roomservice: 'inertia',
	safetygoggles: 'keeneye',
	scopelens: 'sniper',
	sharpbeak: 'galewings',
	shedshell: 'shedskin',
	shellbell: 'healer',
	silkscarf: 'adaptability',
	silverpowder: 'swarm',
	smoothrock: 'sandrush',
	softsand: 'sandstream',
	spelltag: 'cursedbody',
	stickybarb: 'fluffy',
	terrainextender: 'cloudnine',
	throatspray: 'punkrock',
	toxicorb: 'poisonheal',
	twistedspoon: 'analytic',
	utilityumbrella: 'cloudnine',
	weaknesspolicy: 'weakarmor',
	whiteherb: 'unburden',
	widelens: 'compoundeyes',
	wiseglasses: 'innerfocus',
	zoomlens: 'sniper',
	bignugget: 'goodasgold',
	pomegberry: 'eartheater',
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
};

export const Abilities: {[k: string]: ModdedAbilityData} = {
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
			this.field.addPseudoWeather('gravity');
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
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'laserpulse'
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
			}
			else {
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
		onStart(pokemon) {
			pokemon.addVolatile('item:heavydutyboots');
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
			let log = this.dex.deepClone(this.log);
			log.reverse();
			for (let line of log) {
				if (zombie) break;
				if (line.includes('|faint|')) {
					let faintName = line.slice(12);
					let player = line.slice(7, 9);
					const side = player === 'p1' ? this.p1 : player === 'p2' ? this.p2 : player === 'p3' ? this.p3 : this.p4;
					if (side) {
						for (let mon of side.pokemon) {
							if (mon.name === faintName) zombie = mon;
						}
					}
				}
			}
			if (zombie) {
				const species = this.runEvent('ModifySpecies', this, null, this.effect, zombie.species);
				let newSpecies: Species = this.dex.deepClone(species);

				let moves = zombie.moveSlots;
				
				this.add('-activate', target, 'ability: Necromancy');
				this.add('-message', `${target.name} has gained control over the body of ${zombie.name}!`);

				let newType: string[] = [];

				for (let type of [...target.getTypes(), ...zombie.getTypes()]) {
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
			breakable: 1, notransform: 1,},
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
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
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
	vaporization: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				this.add('-immune', target, '[from] ability: Vaporization');
				return null;
			}
		},
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of this.getAllActive()) {
				if (!target || !target.hp) continue;
				if (target.hasType('Water')) {
					this.damage(target.maxhp / 8, target, pokemon);
				}
			}
		},
		name: "Vaporization",
		shortDesc: "Vaporizes Water-Type attacks and damages water types.",
		flags: {breakable: 1},
		rating: 3.5,
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
			if (move.category === "Physical") move.overrideDefensiveStat = 'def';
			if (move.category === "Special") move.overrideDefensiveStat = 'spd';
			move.category = 'Special';
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
				move.category = 'Physical';
			}
		},
		name: "Multitasker",
		shortDesc: "Pokemon will always use highest attacking stat.",
		rating: 4,
		num: 0,
	},
};