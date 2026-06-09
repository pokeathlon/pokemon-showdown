import { Moves as Base } from '../../moves';

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	// Modded
	dive: {
		inherit: true,
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool', 'tidalwave'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'surf' || move.id === 'whirlpool' || move.id === 'tidalwave') {
					return this.chainModify(2);
				}
			},
		},
	},
	fly: {
		inherit: true,
		accuracy: 100,
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['gust', 'twister', 'skyuppercut', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'gust' || move.id === 'twister' || move.id === 'dragongale') {
					return this.chainModify(2);
				}
			},
		},
	},
	bounce: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		pp: 10,
		condition: {
			duration: 2,
			onInvulnerability(target, source, move) {
				if (['gust', 'twister', 'skyuppercut', 'thunder', 'hurricane', 'smackdown', 'thousandarrows'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceBasePower(basePower, target, source, move) {
				if (move.id === 'gust' || move.id === 'twister' || move.id === 'dragongale') {
					return this.chainModify(2);
				}
			},
		},
	},
	geomancy: {
		inherit: true,
		isNonstandard: undefined,
		flags: {nonsky: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1 },
		volatileStatus: 'ingrain',
		boosts: {
			def: 1,
			spd: 1,
		},
		desc: "Raises the user's Defense and Sp. Def by 1. Ingrains User.",
		shortDesc: "Raises the user's Defense and Sp. Def by 1. Ingrains User.",
	},
	purify: {
		inherit: true,
		type: "Light",
	},
	aurasphere: {
		inherit: true,
		basePower: 90,
		type: "Light",
	},
	aurawheel: {
		inherit: true,
		basePower: 90,
		onTry(source) {},
		onModifyType(move, pokemon) {},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Dark', type);
		},
		type: "Light",
		desc: "Combines Dark in its type effectiveness.",
		shortDesc: "Combines Dark in its type effectiveness.",
	},
	aurorabeam: {
		inherit: true,
		basePower: 55,
		flags: { protect: 1, mirror: 1, metronome: 1, pulse: 1 },
		type: "Light",
	},
	auroraveil: {
		inherit: true,
		type: "Light",
	},
	dazzlinggleam: {
		inherit: true,
		pp: 15,
		type: "Light",
	},
	extremespeed: {
		inherit: true,
		basePower: 70,
		type: "Light",
		self: {
			boosts: {
				def: -1,
			},
		},
		shortDesc: "Lowers the user's Defense by 1 stage. Nearly always goes first.",
	},
	flash: {
		inherit: true,
		basePower: 60,
		category: "Special",
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
		boosts: undefined,
		type: "Light",
		desc: "Has a 20% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "20% chance to lower the target's accuracy by 1.",
	},
	flashcannon: {
		inherit: true,
		basePower: 90,
		pp: 15,
		type: "Light",
		flags: { protect: 1, mirror: 1, metronome: 1, pulse: 1 },
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 20% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Sp. Def by 1.",
	},
	mirrorshot: {
		inherit: true,
		accuracy: 100,
		basePower: 70,
		pp: 20,
		isNonstandard: undefined,
		selfSwitch: true,
		secondary: undefined,
		type: "Light",
		desc: "User switches out after damaging the target.",
		shortDesc: "User switches out after damaging the target.",
	},
	laserfocus: {
		inherit: true,
		isNonstandard: undefined,
		name: "Laser Focus",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, metronome: 1 },
		sideCondition: 'laserfocus',
		condition: {
			duration: 4,
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Laser Focus');
			},
			onModifyCritRatio(critRatio) {
				return 5;
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Laser Focus');
			},
		},
		target: "self",
		type: "Light",
		desc: "For 4 turns, allies have increased crit ratio.",
		shortDesc: "For 4 turns, allies have increased crit ratio.",
	},
	morningsun: {
		inherit: true,
		pp: 10,
		type: "Light",
	},
	photongeyser: {
		inherit: true,
		type: "Light",
	},
	safeguard: {
		inherit: true,
		type: "Light",
	},
	signalbeam: {
		inherit: true,
		pp: 20,
		secondary: {
			chance: 50,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Light",
		desc: "50% chance to confuse the target.",
		shortDesc: "50% chance to confuse the target.",
	},
	spotlight: {
		inherit: true,
		type: "Light",
	},
	tailglow: {
		inherit: true,
		boosts: {
			spa: 1,
			accuracy: 1,
		},
		type: "Light",
		desc: "Raises the user's Sp. Atk and Accuracy by 1 stage.",
		shortDesc: "Raises the user's Sp. Atk and Accuracy by 1 stage.",
	},
	lusterpurge: {
		inherit: true,
		basePower: 140,
		secondary: undefined,
		onTry(source) {
			if (source.moveSlots.length < 2) return false; // Last Resort fails unless the user knows at least 2 moves
			let hasLastResort = false; // User must actually have Last Resort for it to succeed
			for (const moveSlot of source.moveSlots) {
				if (moveSlot.id === 'lastresort') {
					hasLastResort = true;
					continue;
				}
				if (!moveSlot.used) return false;
			}
			return hasLastResort;
		},
		type: "Light",
		desc: "Fails unless each known move has been used.",
		shortDesc: "Fails unless each known move has been used.",
	},
	prismaticlaser: {
		inherit: true,
		basePower: 80,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		self: undefined,
		secondary: {
			chance: 20,
			onHit(target, source) {
				const status = this.sample(['brn', 'par', 'frz']);
				target.trySetStatus(status, source);
			},
		},
		target: "normal",
		type: "Light",
		desc: "20% chance to paralyze or burn or frostbite target.",
		shortDesc: "20% chance to paralyze or burn or frostbite target.",
	},
	hyperspacehole: {
		inherit: true,
		type: "Cosmic",
	},
	cometpunch: {
		inherit: true,
		accuracy: 100,
		type: "Cosmic",
	},
	cosmicpower: {
		inherit: true,
		type: "Cosmic",
	},
	gravity: {
		inherit: true,
		pp: 10,
		type: "Cosmic",
	},
	lunardance: {
		inherit: true,
		flags: { snatch: 1, metronome: 1 },
		boosts: {
			spa: 1,
			spd: 1,
		},
		onTryHit(source) {},
		selfdestruct: undefined,
		slotCondition: undefined,
		condition: undefined,
		type: "Cosmic",
		desc: "Raises the user's Sp. Atk and Sp. Def by 1.",
		shortDesc: "Raises the user's Sp. Atk and Sp. Def by 1.",
	},
	meteorassault: {
		inherit: true,
		accuracy: 90,
		basePower: 110,
		pp: 10,
		isNonstandard: undefined,
		flags: { protect: 1, mirror: 1, failinstruct: 1, gravity: 1 },
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Meteor Assault'));
		},
		self: undefined,
		type: "Cosmic",
		desc: "User is hurt by 50% of its max HP if it misses.",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
	},
	meteorbeam: {
		inherit: true,
		accuracy: 80,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			status: 'brn',
		},
		onTryMove(attacker, defender, move) {},
		type: "Cosmic",
		desc: "20% chance to burn the target.",
		shortDesc: "20% chance to burn the target.",
	},
	swift: {
		inherit: true,
		accuracy: 100,
		basePower: 50,
		pp: 30,
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Cosmic",
		desc: "30% chance to raise the user's Sp. Atk by 1.",
		shortDesc: "30% chance to raise the user's Sp. Atk by 1.",
	},
	wish: {
		inherit: true,
		type: "Cosmic",
	},
	healingwish: {
		inherit: true,
		pp: 5,
		type: "Cosmic",
	},
	meteormash: {
		inherit: true,
		accuracy: 100,
		type: "Cosmic",
	},
	moonblast: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		type: "Cosmic",
	},
	moonlight: {
		inherit: true,
		pp: 10,
		type: "Cosmic",
	},
	astralbarrage: {
		inherit: true,
		basePower: 70,
		pp: 20,
		ignoreEvasion: true,
		ignoreDefensive: true,
		target: "normal",
		type: "Cosmic",
		desc: "Ignores the target's stat stage changes, including evasiveness.",
		shortDesc: "Ignores the target's stat stage changes.",
	},
	bellydrum: {
		inherit: true,
		type: "Sound",
	},
	boomburst: {
		inherit: true,
		accuracy: 90,
		basePower: 110,
		pp: 10,
		self: {
			boosts: {
				spa: -1,
			},
		},
		type: "Sound",
		desc: "Lowers the user's Sp. Atk by 1. Hits adjacent Pokemon.",
		shortDesc: "Lowers the user's Sp. Atk by 1. Hits adjacent Pokemon.",
	},
	chatter: {
		inherit: true,
		basePower: 50,
		category: "Special",
		isNonstandard: undefined,
		secondary: {
			chance: 25,
			volatileStatus: 'confusion',
		},
		type: "Sound",
		desc: "Has a 25% chance to confuse the target.",
		shortDesc: "25% chance to confuse the target.",
	},
	disarmingvoice: {
		inherit: true,
		accuracy: 100,
		basePower: 65,
		pp: 20,
		target: "normal",
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		type: "Sound",
		desc: "Has a 100% chance to lower the target's Special Attack by 1 stage.",
		shortDesc: "100% chance to lower the target's Sp. Atk by 1.",
	},
	drumbeating: {
		inherit: true,
		type: "Sound",
	},
	echoedvoice: {
		inherit: true,
		pp: 25,
		type: "Normal",
	},
	growl: {
		inherit: true,
		type: "Sound",
	},
	healbell: {
		inherit: true,
		pp: 10,
		type: "Sound",
	},
	hypervoice: {
		inherit: true,
		type: "Sound",
	},
	instruct: {
		inherit: true,
		type: "Sound",
	},
	metalsound: {
		inherit: true,
		pp: 25,
		type: "Sound",
	},
	nobleroar: {
		inherit: true,
		basePower: 65,
		category: "Physical",
		name: "Noble Roar",
		pp: 20,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1 },
		boosts: undefined,
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		type: "Sound",
		desc: "Has a 100% chance to lower the target's Attack by 1 stage.",
		shortDesc: "100% chance to lower the target's Attack by 1.",
	},
	overdrive: {
		inherit: true,
		pp: 15,
		target: "normal",
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		type: "Sound",
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to make the target flinch.",
	},
	perishsong: {
		inherit: true,
		type: "Sound",
	},
	relicsong: {
		inherit: true,
		basePower: 80,
		secondary: undefined,
		onAfterMoveSecondarySelf(pokemon) {},
		target: "normal",
		type: "Sound",
		desc: "No additional effect.",	
		shortDesc: "No additional effect.",
	},
	roar: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		pp: 30,
		priority: 0,
		flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1 },
		boosts: undefined,
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Sound",
		desc: "Has a 10% chance to lower the target's Attack by 1 stage.",
		shortDesc: "10% chance to lower the target's Attack by 1.",
	},
	round: {
		inherit: true,
		pp: 20,
		type: "Sound",
	},
	screech: {
		inherit: true,
		accuracy: 90,
		pp: 25,
		type: "Sound",
	},
	sing: {
		inherit: true,
		accuracy: 75,
		type: "Sound",
	},
	sleeptalk: {
		inherit: true,
		type: "Sound",
	},
	sonicboom: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
		damage: undefined,
		isNonstandard: undefined,
		pp: 30,
		flags: { protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1 },
		secondary: {
			chance: 10,
			status: 'par',
		},
		type: "Sound",
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
	},
	supersonic: {
		inherit: true,
		pp: 15,
		type: "Sound",
	},
	uproar: {
		inherit: true,
		basePower: 120,
		self: {
			volatileStatus: 'lockedmove',
		},
		onTryHit(target) {},
		condition: {},
		type: "Sound",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
	},
	clangingscales: {
		inherit: true,
		basePower: 120,
		type: "Sound",
	},
	clangoroussoul: {
		inherit: true,
		type: "Sound",
	},
	howl: {
		inherit: true,
		type: "Sound",
	},
	darkvoid: {
		inherit: true,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 10,
			status: 'slp',
		},
		onTry(source, target, move) {},
	},
	fakeout: {
		inherit: true,
		type: "Dark",
	},
	swagger: {
		inherit: true,
		type: "Dark",
	},
	trick: {
		inherit: true,
		type: "Dark",
	},
	attract: {
		inherit: true,
		type: "Fairy",
	},
	covet: {
		inherit: true,
		type: "Fairy",
	},
	dizzypunch: {
		inherit: true,
		type: "Fairy",
	},
	mistball: {
		inherit: true,
		pp: 15,
		type: "Fairy",
	},
	leechlife: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, bite: 1 },
	},
	fellstinger: {
		inherit: true,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({ atk: 2 }, pokemon, pokemon, move);
		},
		desc: "Raises the user's Attack by 2 stages if this move knocks out the target.",
		shortDesc: "Raises user's Attack by 2 if this KOes the target.",
	},
	skittersmack: {
		inherit: true,
		accuracy: 100,
	},
	nightdaze: {
		inherit: true,
		accuracy: 100,
		basePower: 85,
	},
	feintattack: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, minimize: 1 },
	},
	snarl: {
		inherit: true,
		accuracy: 100,
	},
	wickedblow: {
		inherit: true,
		basePower: 80,
	},
	spacialrend: {
		inherit: true,
		accuracy: 100,
	},
	dualchop: {
		inherit: true,
		accuracy: 100,
	},
	plasmafists: {
		inherit: true,
		pseudoWeather: undefined,
		pp: 10,
		shortDesc: "No additional effect.",
	},
	thunderfang: {
		inherit: true,
		accuracy: 100,
	},
	electroweb: {
		inherit: true,
		accuracy: 100,
	},
	magneticflux: {
		inherit: true,
		onHitSide(side, source, move) {
			const targets = side.allies().filter(ally => (
				ally.hasType(['Steel', 'Electric']) &&
				(!ally.volatiles['maxguard'] || this.runEvent('TryHit', ally, source, move))
			));
			if (!targets.length) return false;

			let didSomething = false;
			for (const target of targets) {
				didSomething = this.boost({ def: 1, spd: 1 }, target, source, move, false, true) || didSomething;
			}
			return didSomething;
		},
		desc: "Raises the Defense and Special Defense of Steel and Electric-type Pokemon on the user's side by 1 stage.",
		shortDesc: "Raises Def, Sp. Def of allies with Steel or Electric-type by 1.",
	},
	boltbeak: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Bolt Beak damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Bolt Beak NOT boosted');
			return move.basePower;
		},
		desc: "1.5x power if the user moves before the target.",
		shortDesc: "1.5x power if user moves before the target.",
	},
	flyingpress: {
		inherit: true,
		accuracy: 100,
	},
	submission: {
		inherit: true,
		accuracy: 100,
	},
	vcreate: {
		inherit: true,
		accuracy: 100,
	},
	firefang: {
		inherit: true,
		accuracy: 100,
	},
	vitalthrow: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
		pp: 20,
		priority: 0,
		ignoreEvasion: true,
		ignoreDefensive: true,
		desc: "Ignores the target's stat stage changes, including evasiveness.",
		shortDesc: "Ignores the target's stat stage changes.",
	},
	dualwingbeat: {
		inherit: true,
		accuracy: 100,
	},
	leaftornado: {
		inherit: true,
		accuracy: 100,
	},
	grasswhistle: {
		inherit: true,
		accuracy: 75,
	},
	grassyglide: {
		inherit: true,
		basePower: 65,
	},
	drillrun: {
		inherit: true,
		accuracy: 100,
	},
	mudshot: {
		inherit: true,
		accuracy: 100,
	},
	sandtomb: {
		inherit: true,
		accuracy: 90,
	},
	icefang: {
		inherit: true,
		accuracy: 100,
	},
	icywind: {
		inherit: true,
		accuracy: 100,
	},
	magnitude: {
		inherit: true,
		pp: 15,
		isNonstandard: undefined,
		onModifyMove(move, pokemon) {
			move.basePower = pokemon.level;
		},
		onUseMoveMessage(pokemon, target, move) {},
		desc: "Base Power equal to the user's level.",
		shortDesc: "Base Power equal to the user's level.",
	},
	glaciate: {
		inherit: true,
		accuracy: 100,
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 20% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "20% chance to lower the target's Sp. Def by 1.",
	},
	glaciallance: {
		inherit: true,
		accuracy: 90,
		basePower: 130,
		self: {
			boosts: {
				atk: -2,
			},
		},
		desc: "Lowers the user's Attack by 2 stages.",
		shortDesc: "Lowers the user's Attack by 2.",
	},
	multiattack: {
		inherit: true,
		basePower: 90,
		isNonstandard: undefined,
	},
	takedown: {
		inherit: true,
		accuracy: 100,
	},
	razorwind: {
		inherit: true,
		basePower: 140,
		isNonstandard: undefined,
	},
	triattack: {
		inherit: true,
		basePower: 140,
		isNonstandard: undefined,
	},
	cut: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	furyswipes: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	barrage: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	doubleslap: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	furyattack: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	wrap: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	return: {
		inherit: true,
		basePower: 100,
		pp: 10,
		basePowerCallback(pokemon, target, move) {return move.basePower},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) < pokemon.getStat('spa', false, true)) move.category = 'Special';
		},
		isNonstandard: undefined,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
	},
	frustration: {
		inherit: true,
		basePower: 100,
		pp: 10,
		category: "Special",
		basePowerCallback(pokemon, target, move) {return move.basePower},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		isNonstandard: undefined,
		shortDesc: "Physical if user's Atk > Sp. Atk.",
	},
	recover: {
		inherit: true,
		pp: 10,
	},
	milkdrink: {
		inherit: true,
		pp: 10,
	},
	roost: {
		inherit: true,
		pp: 10,
	},
	slackoff: {
		inherit: true,
		pp: 10,
	},
	softboiled: {
		inherit: true,
		pp: 10,
	},
	belch: {
		inherit: true,
		basePower: 65,
		onDisableMove(pokemon) {},
		onTry(source) {},
		basePowerCallback(pokemon, target, move) {
			if (pokemon.ateBerry) {
				this.debug('BP doubled from berry eaten');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		shortDesc: "Power doubles if the user ate a berry.",
	},
	smog: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
		isNonstandard: undefined,
	},
	dreameater: {
		inherit: true,
		basePower: 50,
		flags: { protect: 1, mirror: 1, heal: 1, metronome: 1 },
		onTryImmunity(target) {},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			if (target.status === "slp") {
				move.drain = [1,2];
			}
		},
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) {
				this.debug('BP doubled from sleep');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		shortDesc: "If target asleep; 2x Power and recovers 50% of damage dealt."
	},
	zenheadbutt: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	rocktomb: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	smartstrike: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		isNonstandard: undefined,
	},
	geargrind: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	gearup: {
		inherit: true,
		onHitSide(side, source, move) {
			const targets = side.allies().filter(ally => (
				ally.hasType(['Steel', 'Electric']) &&
				(!ally.volatiles['maxguard'] || this.runEvent('TryHit', ally, source, move))
			));
			if (!targets.length) return false;

			let didSomething = false;
			for (const target of targets) {
				didSomething = this.boost({ atk: 1, spa: 1 }, target, source, move, false, true) || didSomething;
			}
			return didSomething;
		},
		desc: "Raises the Attack and Special Attack of Steel and Electric-type Pokemon on the user's side by 1 stage.",
		shortDesc: "Raises Atk, Sp. Atk of allies with Steel or Electric-type by 1.",
	},
	steelbeam: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	steameruption: {
		inherit: true,
		accuracy: 85,
		isNonstandard: undefined,
	},
	razorshell: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	octazooka: {
		inherit: true,
		accuracy: 100,
		pp: 15,
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		isNonstandard: undefined,
		desc: "Has a 30% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "30% chance to lower the target's accuracy by 1.",
	},
	fishiousrend: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Fish Rend damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Fish Rend NOT boosted');
			return move.basePower;
		},
		desc: "1.5x power if the user moves before the target.",
		shortDesc: "1.5x power if user moves before the target.",
	},
	surgingstrikes: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1 },
		isNonstandard: undefined,
	},
	attackorder: {
		inherit: true,
		basePower: 20,
		pp: 10,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * pokemon.positiveBoosts();
			this.debug(`BP: ${bp}`);
			return bp;
		},
		critRatio: undefined,
		desc: "Power is equal to 20+(X*20), where X is the user's total stat stage changes that are greater than 0.",
		shortDesc: " + 20 power for each of the user's stat boosts.",
	},
	firstimpression: {
		inherit: true,
		basePower: 40,
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("First Impression only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		desc: "Has a 100% chance to make the target flinch. Fails unless it is the user's first turn on the field.",
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
	},
	furycutter: {
		inherit: true,
		accuracy: 90,
		isNonstandard: undefined,
	},
	infestation: {
		inherit: true,
		basePower: 35,
		pp: 15,
		isNonstandard: undefined,
	},
	pinmissile: {
		inherit: true,
		accuracy: 95,
		pp: 15,
		isNonstandard: undefined,
	},
	strugglebug: {
		inherit: true,
		basePower: 55,
		isNonstandard: undefined,
	},
	twineedle: {
		inherit: true,
		basePower: 40,
		pp: 10,
		isNonstandard: undefined,
		secondary: undefined,
		shortDesc: "Hits twice."
	},
	xscissor: {
		inherit: true,
		critRatio: 2,
		isNonstandard: undefined,
	},
	fierywrath: {
		inherit: true,
		basePower: 70,
		secondary: {
			chance: 10,
			status: 'brn',
		},
		isNonstandard: undefined,
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "10% chance to burn.",
	},
	breakingswipe: {
		inherit: true,
		basePower: 55,
		isNonstandard: undefined,
	},
	twister: {
		inherit: true,
		pp: 25,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Has a 10% chance to make the target flinch. Power doubles if the target is using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop.",
		shortDesc: "10% chance to make the foe(s) flinch.",
	},
	chargebeam: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
		pp: 20,
		flags: { protect: 1, mirror: 1, metronome: 1, pulse: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		desc: "Has a 100% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
	},
	paraboliccharge: {
		inherit: true,
		accuracy: 100,
		basePower: 60,
		drain: [3, 4],
		desc: "The user recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 75% of the damage dealt.",
	},
	shockwave: {
		inherit: true,
		flags: { protect: 1, mirror: 1, metronome: 1, minimize: 1 },
		isNonstandard: undefined,
	},
	spark: {
		inherit: true,
		basePower: 60,
		isNonstandard: undefined,
	},
	thundercage: {
		inherit: true,
		basePower: 35,
		isNonstandard: undefined,
	},
	drainingkiss: {
		inherit: true,
		basePower: 60,
		isNonstandard: undefined,
	},
	fairywind: {
		inherit: true,
		pp: 25,
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		isNonstandard: undefined,
		desc: "Has a 10% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "10% chance to raise the user's Sp. Atk by 1.",
	},
	heartstamp: {
		inherit: true,
		type: "Fairy",
	},
	lovelykiss: {
		inherit: true,
		accuracy: 70,
		type: "Fairy",
	},
	strangesteam: {
		inherit: true,
		accuracy: 90,
		basePower: 95,
		flags: { protect: 1, mirror: 1, defrost: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		desc: "Has a 10% chance to confuse the foe(s).",
		shortDesc: "10% chance to confuse the foe(s).",
	},
	sweetkiss: {
		inherit: true,
		accuracy: 90,
		isNonstandard: undefined,
	},
	armthrust: {
		inherit: true,
		basePower: 20,
		pp: 15,
		isNonstandard: undefined,
	},
	block: {
		inherit: true,
		pp: 20,
		type: "Fighting",
	},
	doublekick: {
		inherit: true,
		basePower: 40,
		pp: 20,
		isNonstandard: undefined,
	},
	rollingkick: {
		inherit: true,
		accuracy: 90,
		basePower: 40,
		pp: 20,
		secondary: undefined,
		isNonstandard: undefined,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			const rollingkickData = pokemon.volatiles['rollingkick'];
			if (rollingkickData?.hitCount) {
				bp *= 2 ** rollingkickData.contactHitCount;
			}
			if (rollingkickData && pokemon.status !== 'slp') {
				rollingkickData.hitCount++;
				rollingkickData.contactHitCount++;
				if (rollingkickData.hitCount < 5) {
					rollingkickData.duration = 2;
				}
			}
			if (pokemon.volatiles['defensecurl']) {
				bp *= 2;
			}
			this.debug(`BP: ${bp}`);
			return bp;
		},
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, failinstruct: 1, noparentalbond: 1 },
		onModifyMove(move, pokemon, target) {
			if (pokemon.volatiles['rollingkick'] || pokemon.status === 'slp' || !target) return;
			pokemon.addVolatile('rollingkick');
			if (move.sourceEffect) pokemon.lastMoveTargetLoc = pokemon.getLocOf(target);
		},
		onAfterMove(source, target, move) {
			const rollingkickData = source.volatiles["rollingkick"];
			if (
				rollingkickData &&
				rollingkickData.hitCount === 5 &&
				rollingkickData.contactHitCount < 5
				// this conditions can only be met in gen7 and gen8dlc1
				// see `disguise` and `iceface` abilities in the resp mod folders
			) {
				source.addVolatile("rolloutstorage");
				source.volatiles["rolloutstorage"].contactHitCount =
					rollingkickData.contactHitCount;
			}
		},
		condition: {
			duration: 1,
			onLockMove: 'rollingkick',
			onStart() {
				this.effectState.hitCount = 0;
				this.effectState.contactHitCount = 0;
			},
			onResidual(target) {
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['rollingkick'];
				}
			},
		},
		desc: "If this move is successful, the user is locked into this move and cannot make another move until it misses, 5 turns have passed, or the attack cannot be used. Power doubles with each successful hit of this move and doubles again if Defense Curl was used previously by the user. If this move is called by Sleep Talk, the move is used for one turn.",
		shortDesc: "Power doubles with each hit. Repeats for 5 turns.",
	},
	skyuppercut: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	thunderouskick: {
		inherit: true,
		pp: 15,
		secondary: {
			chance: 30,
			volatileStatus: 'par',
		},
		desc: "Has a 30% chance to paralyze the target.",
		shortDesc: "30% chance to paralyze the target.",
	},
	triplekick: {
		inherit: true,
		basePower: 20,
		isNonstandard: undefined,
	},
	blazekick: {
		inherit: true,
		accuracy: 100,
		basePower: 90,
		pp: 15,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, defrost: 1 },
		isNonstandard: undefined,
	},
	accuracy: {
		inherit: true,
		accuracy: 90,
		isNonstandard: undefined,
	},
	flameburst: {
		inherit: true,
		accuracy: true,
		isNonstandard: undefined,
		name: "Flame Burst",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1, defrost: 1 },
		onHit(target, source, move) {},
		onAfterSubDamage(damage, target, source, move) {},
		target: "allAdjacentFoes",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	sacredfire: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	willowisp: {
		inherit: true,
		accuracy: 90,
		isNonstandard: undefined,
	},
	aircutter: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	airslash: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	aeroblast: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		pp: 15,
		flags: { protect: 1, mirror: 1, distance: 1, metronome: 1, wind: 1 },
		condition: {
			duration: 4,
			onStart(target) {
				this.add('-start', target, 'Aeroblast', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['sound']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZOrMaxPowered && move.flags['sound']) {
					this.add('cant', pokemon, 'move: Aeroblast');
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (!move.isZOrMaxPowered && move.flags['sound']) {
					this.add('cant', pokemon, 'move: Aeroblast');
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd(target) {
				this.add('-end', target, 'Aeroblast', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('aeroblast');
			},
		},
		critRatio: undefined,
		desc: "For 4 turns, the target cannot use sound-based moves.",
		shortDesc: "For 4 turns, the target cannot use sound moves.",
	},
	drillpeck: {
		inherit: true,
		basePower: 90,
		critRatio: 2,
		isNonstandard: undefined,
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
	},
	peck: {
		inherit: true,
		basePower: 40,
		pp: 25,
		isNonstandard: undefined,
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 10% chance to lower the target's Defense by 1 stage.",
		shortDesc: "10% chance to lower the target's Defense by 1.",
	},
	astonish: {
		inherit: true,
		basePower: 40,
		pp: 20,
		isNonstandard: undefined,
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		desc: "Has a 10% chance to make the target flinch.",
		shortDesc: "10% chance to make the target flinch.",
	},
	confuseray: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	meanlook: {
		inherit: true,
		type: "Ghost",
		isNonstandard: undefined,
	},
	memento: {
		inherit: true,
		type: "Ghost",
		isNonstandard: undefined,
	},
	silverwind: {
		inherit: true,
		pp: 5,
		isNonstandard: undefined,
	},
	ominouswind: {
		inherit: true,
		pp: 5,
		isNonstandard: undefined,
	},
	ancientpower: {
		inherit: true,
		pp: 5,
		isNonstandard: undefined,
	},
	shadowbone: {
		inherit: true,
		basePower: 90,
		pp: 15,
		isNonstandard: undefined,
	},
	shadowclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		isNonstandard: undefined,
	},
	bulletseed: {
		inherit: true,
		pp: 15,
		isNonstandard: undefined,
	},
	floralhealing: {
		inherit: true,
		type: "Grass",
		isNonstandard: undefined,
	},
	flowershield: {
		inherit: true,
		type: "Grass",
		isNonstandard: undefined,
	},
	growth: {
		inherit: true,
		type: "Grass",
		isNonstandard: undefined,
	},
	sweetscent: {
		inherit: true,
		type: "Grass",
		isNonstandard: undefined,
	},
	leafage: {
		inherit: true,
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		isNonstandard: undefined,
		desc: "Has a 10% chance to lower the target's Defense by 1 stage.",
		shortDesc: "10% chance to lower the target's Def by 1.",
	},
	magicalleaf: {
		inherit: true,
		basePower: 70,
		flags: { protect: 1, mirror: 1, metronome: 1, minimize: 1 },
		isNonstandard: undefined,
	},
	razorleaf: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
	},
	sleeppowder: {
		inherit: true,
		accuracy: 70,
		isNonstandard: undefined,
	},
	tropkick: {
		inherit: true,
		basePower: 80,
		isNonstandard: undefined,
	},
	boneclub: {
		inherit: true,
		accuracy: 100,
		basePower: 70,
		pp: 15,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		isNonstandard: undefined,
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to make the target flinch.",
	},
	bonerush: {
		inherit: true,
		pp: 15,
		isNonstandard: undefined,
	},
	highhorsepower: {
		inherit: true,
		accuracy: 100,
		basePower: 55,
		pp: 15,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.item) {
				this.debug("BP doubled for no item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		desc: "Power doubles if the user has no held item.",
		shortDesc: "Power doubles if the user has no held item.",
	},
	horndrill: {
		inherit: true,
		type: "Ground",
		isNonstandard: undefined,
	},
	mudslap: {
		inherit: true,
		basePower: 40,
		pp: 25,
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		isNonstandard: undefined,
		desc: "Has a 10% chance to lower the target's Speed by 1 stage.",
		shortDesc: "10% chance to lower the foe(s) Speed by 1.",
	},
	steamroller: {
		inherit: true,
		basePower: 60,
		type: "Ground",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		isNonstandard: undefined,
		desc: "Has a 100% chance to raise the user's Speed by 1 stage.",
		shortDesc: "100% chance to raise the user's Speed by 1.",
	},
	iceball: {
		inherit: true,
		basePower: 40,
		isNonstandard: undefined,
	},
	iciclecrash: {
		inherit: true,
		basePower: 80,
		accuracy: 90,
		pp: 15,
		isNonstandard: undefined,
	},
	iciclespear: {
		inherit: true,
		pp: 15,
		isNonstandard: undefined,
	},
	coil: {
		inherit: true,
		type: "Normal",
		isNonstandard: undefined,
	},
	rest: {
		inherit: true,
		pp: 10,
		type: "Normal",
		isNonstandard: undefined,
	},
	crushclaw: {
		inherit: true,
		accuracy: 100,
		basePower: 90,
		pp: 15,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		secondary: {
			chance: 40,
			boosts: {
				def: -1,
			},
		},
		desc: "Has a 40% chance to lower the target's Defense by 1 stage.",
		shortDesc: "40% chance to lower the target's Defense by 1.",
	},
	doublehit: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
		pp: 20,
		isNonstandard: undefined,
	},
	freezingglare: {
		inherit: true,
		basePower: 80,
		pp: 15,
		secondary: {
			chance: 20,
			status: 'frz',
		},
		isNonstandard: undefined,
		type: "Rock",
		desc: "Has a 20% chance to frostbite the target.",
		shortDesc: "20% chance to frostbite the target.",
	},
	hyperfang: {
		inherit: true,
		accuracy: 100,
		isNonstandard: undefined,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to make the target flinch.",
	},
	megapunch: {
		inherit: true,
		basePower: 75,
		accuracy: 100,
		pp: 15,
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		isNonstandard: undefined,
		desc: "Has a 10% chance to raise the user's Attack by 1 stage.",
		shortDesc: "10% chance to raise the user's Attack by 1.",
	},
	pound: {
		inherit: true,
		isNonstandard: undefined,
		pp: 25,
		secondary: {
			chance: 10,
			boosts: {
				def: -1
			}
		},
		desc: "Has a 10% chance to lower target's Defense by 1.",
		shortDesc: "10% chance to lower target's Defense by 1.",
	},
	slash: {
		inherit: true,
		pp: 15,
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		isNonstandard: undefined,
		desc: "Has a 50% chance to raise the user's Attack by 1 stage.",
		shortDesc: "50% chance to raise the user's Attack by 1.",
	},
	tailslap: {
		inherit: true,
		accuracy: 90,
		pp: 15,
		isNonstandard: undefined,
	},
	crosspoison: {
		inherit: true,
		pp: 15,
		secondary: {
			chance: 30,
			status: 'psn',
		},
		isNonstandard: undefined,
		desc: "Has a 30% chance to poison the target and a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio. 30% chance to poison.",
	},
	poisonsting: {
		inherit: true,
		basePower: 40,
		isNonstandard: undefined,
	},
	poisonfang: {
		inherit: true,
		basePower: 65,
		isNonstandard: undefined,
	},
	poisontail: {
		inherit: true,
		basePower: 60,
		priority: -6,
		pp: 10,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		forceSwitch: true,
		critRatio: undefined,
		secondary: undefined,
		desc: "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target used Ingrain previously, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "Forces the target to switch to a random ally.",
	},
	sludge: {
		inherit: true,
		basePower: 60,
		isNonstandard: undefined,
	},
	smokescreen: {
		inherit: true,
		type: "Poison",
		isNonstandard: undefined,
	},
	confusion: {
		inherit: true,
		basePower: 40,
		isNonstandard: undefined,
	},
	hypnosis: {
		inherit: true,
		flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1, sound: 1 },
		isNonstandard: undefined,
	},
	diamondstorm: {
		inherit: true,
		basePower: 75,
		accuracy: 100,
		pp: 15,
		self: {
			chance: 100,
			boosts: {
				def: 1,
			},
		},
		isNonstandard: undefined,
		desc: "Has a 100% chance to raise the user's Defense by 1 stages.",
		shortDesc: "100% chance to raise user's Defense by 1.",
	},
	harden: {
		inherit: true,
		type: "Rock",
		isNonstandard: undefined,
	},
	rockblast: {
		inherit: true,
		accuracy: 90,
		pp: 15,
		isNonstandard: undefined,
	},
	rockclimb: {
		inherit: true,
		accuracy: 100,
		basePower: 80,
		pp: 10,
		type: "Rock",
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		isNonstandard: undefined,
		desc: "Has a 30% chance to confuse the target.",
		shortDesc: "30% chance to confuse the target.",
	},
	rockthrow: {
		inherit: true,
		accuracy: 100,
		basePower: 40,
		pp: 25,
		self: {
			chance: 10,
			boosts: {
				def: 1,
			},
		},
		isNonstandard: undefined,
		desc: "Has a 10% chance to raise the user's Defense by 1 stages.",
		shortDesc: "10% chance to raise user's Defense by 1.",
	},
	rollout: {
		inherit: true,
		basePower: 40,
		isNonstandard: undefined,
	},
	guillotine: {
		inherit: true,
		type: "Steel",
		isNonstandard: undefined,
	},
	magnetbomb: {
		inherit: true,
		basePower: 70,
		isNonstandard: undefined,
	},
	metalclaw: {
		inherit: true,
		basePower: 40,
		accuracy: 100,
		pp: 20,
		self: {
			chance: 30,
			boosts: {
				atk: 1,
			},
		},
		isNonstandard: undefined,
		desc: "Has a 30% chance to raise the user's Attack by 1 stages.",
		shortDesc: "30% chance to raise user's Attack by 1.",
	},
	snaptrap: {
		inherit: true,
		basePower: 40,
		pp: 20,
		isNonstandard: undefined,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		volatileStatus: undefined,
		type: "Steel",
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Snap Trap damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		beforeTurnCallback(pokemon) {
			for (const target of pokemon.foes()) {
				target.addVolatile('snaptrap');
				const data = target.volatiles['snaptrap'];
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Snap Trap start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Snap Trap');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst || source.canTerastallize) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source) {
								if (action.choice === 'megaEvo') {
									this.actions.runMegaEvo(source);
								} else if (action.choice === 'terastallize') {
									// Also a "forme" change that happens before moves, though only possible in NatDex
									this.actions.terastallize(source);
								} else {
									continue;
								}
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('snaptrap', source, source.getLocOf(pokemon));
				}
			},
		},
		desc: "If an opposing Pokemon switches out this turn, this move hits that Pokemon before it leaves the field, even if it was not the original target. If the user moves after an opponent using Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch, but not Baton Pass, it will hit that opponent before it leaves the field. Power doubles and no accuracy check is done if the user hits an opponent switching out, and the user's turn is over; if an opponent faints from this, the replacement Pokemon does not become active until the end of the turn.",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
	},
	steelwing: {
		inherit: true,
		accuracy: 100,
		self: {
			chance: 20,
			boosts: {
				def: 1,
			},
		},
		isNonstandard: undefined,
		desc: "Has a 20% chance to raise the user's Defense by 1 stages.",
		shortDesc: "20% chance to raise user's Defense by 1.",
	},
	swordsdance: {
		inherit: true,
		pp: 10,
		type: "Steel",
		isNonstandard: undefined,
	},
	visegrip: {
		inherit: true,
		basePower: 60,
		accuracy: 100,
		pp: 25,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		type: "Steel",
		isNonstandard: undefined,
		desc: "Has a 10% chance to make the target flinch.",
		shortDesc: "10% chance to make the target flinch.",
	},
	clamp: {
		inherit: true,
		accuracy: 90,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1 },
		isNonstandard: undefined,
	},
	flipturn: {
		inherit: true,
		basePower: 70,
		isNonstandard: undefined,
	},
	hydropump: {
		inherit: true,
		accuracy: 85,
		self: {
			chance: 10,
			boosts: {
				spa: 1,
			},
		},
		isNonstandard: undefined,
		desc: "Has a 10% chance to raise the user's Special Attack by 1 stages.",
		shortDesc: "10% chance to raise user's Sp. Atk by 1.",
	},
	liquidation: {
		inherit: true,
		basePower: 90,
		pp: 15,
		isNonstandard: undefined,
	},
	muddywater: {
		inherit: true,
		basePower: 95,
		accuracy: 90,
		pp: 15,
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
		isNonstandard: undefined,
		desc: "Has a 10% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "10% chance to lower the foe(s) accuracy by 1.",
	},
	octolock: {
		inherit: true,
		type: "Water",
		isNonstandard: undefined,
	},
	spikecannon: {
		inherit: true,
		type: "Water",
		flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
		isNonstandard: undefined,
	},
	teatime: {
		inherit: true,
		type: "Water",
		isNonstandard: undefined,
	},
	watergun: {
		inherit: true,
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		isNonstandard: undefined,
		desc: "Has a 10% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "10% chance to lower the target's Sp. Def by 1.",
	},
	whirlpool: {
		inherit: true,
		accuracy: 90,
		isNonstandard: undefined,
	},
	dragonclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	mudbomb: {
		inherit: true,
		accuracy: 100,
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
		desc: "Has a 20% chance to lower the target's accuracy by 1 stage.",
		shortDesc: "20% chance to lower the target's accuracy by 1.",
	},
	eggbomb: {
		inherit: true,
		isNonstandard: undefined,
		accuracy: 100,
		basePower: 90,
		onTryHit(target, source, move) {
			if (source.isAlly(target)) {
				move.basePower = 0;
				move.infiltrates = true;
			}
		},
		onTryMove(source, target, move) {
			if (source.isAlly(target) && source.volatiles['healblock']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Heal Block', move);
				return false;
			}
		},
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
					return this.NOT_FAIL;
				}
			}
		},
		desc: "If the target is an ally, this move restores 1/2 of its maximum HP, rounded down, instead of dealing damage.",
		shortDesc: "If the target is an ally, heals 50% of its max HP.",
	},
	toxicthread: {
		inherit: true,
		isNonstandard: undefined,
		boosts: {
			spe: -2,
		},
		desc: "Lowers the target's Speed by 2 stages and poisons it.",
		shortDesc: "Lowers the target's Speed by 2 and poisons it.",
	},
	dragonrush: {
		inherit: true,
		isNonstandard: undefined,
		accuracy: 90,
	},
	irontail: {
		inherit: true,
		isNonstandard: undefined,
		accuracy: 90,
	},
	slam: {
		inherit: true,
		isNonstandard: undefined,
		accuracy: 90,
	},
	poltergeist: {
		inherit: true,
		isNonstandard: undefined,
		onTry(source, target) {},
		onTryHit(target, source, move) {},
		onBasePower(basePower, source, target, move) {
			if (!target.getItem().id) return this.chainModify(0.5)
		},
		shortDesc: "0.5x power if the target has no held item.",
	},
	steelroller: {
		inherit: true,
		isNonstandard: undefined,
		onTry() {},
		onHit() {
			this.field.clearTerrain();
		},
		onAfterSubDamage() {
			this.field.clearTerrain();
		},
		onBasePower(basePower, source, target, move) {
			if (!!this.field.terrain) return this.chainModify(0.5)
		},
		desc: "Half power if there is no terrain active. Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain.",
		shortDesc: "0.5x power if there is no terrain active. Ends the terrain.",
	},
	shoreup: {
		inherit: true,
		pp: 10,
		isNonstandard: undefined,
	},
	scaleshot: {
		inherit: true,
		pp: 15,
		isNonstandard: undefined,
	},
	burningjealousy: {
		inherit: true,
		pp: 10,
		isNonstandard: undefined,
	},
	gust: {
		inherit: true,
		pp: 25,
		isNonstandard: undefined,
	},
	psychocut: {
		inherit: true,
		pp: 15,
		isNonstandard: undefined,
	},
	burningbulwark: {
		inherit: true,
		pp: 5,
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (this.checkMoveBypassesProtect(move, source, target, false)) return;
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.category === 'Physical') {
					source.trySetStatus('brn', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.category === 'Physical') {
					source.trySetStatus('brn', target);
				}
			},
		},
		isNonstandard: undefined,
		desc: "The user is protected from most attacks made by other Pokemon during this turn, and Pokemon using physical moves against the user become burned. Non-damaging moves go through this protection. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Burning Bulwark, Detect, Endure, King's Shield, Max Guard, Obstruct, Protect, Quick Guard, Silk Trap, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "Protects from damaging attacks. Physical: burn.",
	},
	kingsshield: {
		inherit: true,
		pp: 5,
		isNonstandard: undefined,
	},
	obstruct: {
		inherit: true,
		pp: 5,
		isNonstandard: undefined,
	},
	spikyshield: {
		inherit: true,
		pp: 5,
		isNonstandard: undefined,
	},
	banefulbunker: {
		inherit: true,
		pp: 5,
		isNonstandard: undefined,
	},
	
	// Additions
		tidalwave: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Tidal Wave",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	cascade: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Cascade",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "20% chance to make the target flinch.",
	},

	submerge: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Submerge",
		pp: 10,
		priority: 0,
		flags: {contact: 1, charge: 1, protect: 1, mirror: 1,
			nonsky: 1, allyanim: 1, metronome: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			if (attacker.hasAbility('gulpmissile') && attacker.species.name === 'Cramorant' && !attacker.transformed) {
				const forme = attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				attacker.formeChange(forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		condition: {
			duration: 2,
			onImmunity(type, pokemon) {
				if (type === 'sandstorm' || type === 'hail') return false;
			},
			onInvulnerability(target, source, move) {
				if (['surf', 'whirlpool', 'tidalwave'].includes(move.id)) {
					return;
				}
				return false;
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (move.id === 'surf' || move.id === 'whirlpool' || move.id === 'tidalwave') {
					return this.chainModify(2);
				}
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "Dives underwater turn 1, strikes turn 2.",
	},

	spiritbarrage: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Spirit Barrage",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug(`BP doubled for getting hit by ${target}`);
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Power doubles if user is damaged by the target.",
	},

	arcticparasite: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Arctic Parasite",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "10% chance to frostbite the target.",
	},

	butterflykiss: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Butterfly Kiss",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 , heal: 1},
		drain: [1,2],
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	dragonflycharge: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Dragonfly Charge",
		pp: 5,
		priority: 2,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1},
		recoil: [1, 4],
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "Has 1/4 recoil.",
	},

	flutter: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Flutter",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, snatch: 1},
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		target: "self",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "User cures its burn, poison, or paralysis.",
	},

	hivemind: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Special",
		name: "Hivemind",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: 'lockedmove',
		},
		target: "randomNormal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
	},

	infection: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Special",
		name: "Infection",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "Power doubles if the target has a status ailment.",
	},

	nectartap: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Nectar Tap",
		pp: 10,
		priority: 0,
		flags: {metronome: 1,  snatch: 1, heal: 1},
		heal: [1, 2],
		target: "self",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "Heals the user by 50% of its max HP.",
	},

	pheromonestream: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Pheromone Stream",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "20% chance to confuse the target.",
	},

	pollenblast: {
		num: 0,
		basePower: 130,
		accuracy: 90,
		category: "Special",
		name: "Pollen Blast",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
	},

	strafe: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Strafe",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1 },
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	swarmoverload: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Swarm Overload",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'par',
		},
		recoil: [1, 3],
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "Has 1/3 recoil. 10% chance to paralyze target.",
	},

	antimatter: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Antimatter",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Resets all of the target's stat stages to 0.",
	},

	asteroidbelt: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Asteroid Belt",
		pp: 5,
		priority: 4,
		flags: {metronome: 1,  },
		stallingMove: true,
		volatileStatus: 'asteroidbelt',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (this.checkMoveBypassesProtect(move, source, target)) return;
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					this.damage(source.baseMaxhp / 8, source, target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.damage(source.baseMaxhp / 8, source, target);
				}
			},
		},
		target: "self",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Protects from moves. Contact: loses 1/8 max HP.",
	},

	blackhole: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Black Hole",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		volatileStatus: 'blackhole',
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = false;
				if (pokemon.hasType('Flying') || pokemon.hasAbility('levitate')) applies = true;
				if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] ||
					this.field.getPseudoWeather('gravity')) applies = false;
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				if (!applies) return false;
				this.add('-start', pokemon, 'Black Hole');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
					this.add('-start', pokemon, 'Black Hole');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		target: "allAdjacentFoes",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Grounds target.",
	},

	comet: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Comet",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "30% chance to confuse the target.",
	},

	corecollapse: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Core Collapse",
		pp: 15,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		boosts: {
			def: -1,
			spd: -1,
			atk: 2,
			spa: 2,
			spe: 2,
		},
		target: "self",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Lowers Def, SpD by 1; raises Atk, SpA, Spe by 2.",
	},

	dimensionwarp: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Dimension Warp",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "User switches out after damaging the target.",
	},

	dimensionalrush: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Dimensional Rush",
		pp: 30,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		boosts: {
			spe: 2,
		},
		target: "self",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Raises the user's Speed by 2.",
	},

	icecomet: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Ice Comet",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "10% chance to frostbite the target.",
	},

	innervate: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Innervate",
		pp: 10,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		volatileStatus: 'healblock',
		target: "allAdjacentFoes",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Foe(s)'s healing moves are disabled.",
	},

	meteordrive: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Meteor Drive",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Speed by 1.",
	},

	orbitalstrike: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Orbital Strike",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze the target.",
	},

	quantumstar: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Quantum Star",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	shootingstar: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Shooting Star",
		pp: 5,
		priority: 1,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
	},

	solareclipse: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Solar Eclipse",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's accuracy by 1.",
	},

	solarmeteor: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Solar Meteor",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, defrost: 1 },
		secondary: {
			chance: 20,
			status: 'brn',
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "20% chance to burn the target.",
	},

	spaceinvaders: {
		num: 0,
		basePower: 1,
		basePowerCallback(pokemon, target, move) {
			const setSpecies = this.dex.species.get(move.allies!.shift()!.set.species);
			const bp = 5 + Math.floor(setSpecies.baseStats.atk / 10);
			this.debug(`BP for ${setSpecies.name} hit: ${bp}`);
			return bp;
		},
		accuracy: 100,
		category: "Physical",
		name: "Space Invaders",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, allyanim: 1},
		onModifyMove(move, pokemon) {
			move.allies = pokemon.side.pokemon.filter(ally => ally === pokemon || !ally.fainted && !ally.status);
			move.multihit = move.allies.length;
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "All healthy allies aid in damaging the target.",
	},

	spatialgrip: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Special",
		name: "Spatial Grip",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
	},

	stardash: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Star Dash",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	stardust: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Stardust",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, powder: 1, reflectable: 1},
		boosts: {
			accuracy: -1,
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Lowers the target's accuracy by 1.",
	},

	stardustreverie: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Stardust Reverie",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "20% chance to confuse the target.",
	},

	starfall: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Starfall",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	starsaligned: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Special",
		name: "Stars Aligned",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * pokemon.positiveBoosts();
			this.debug(`BP: ${bp}`);
			return bp;
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: " + 20 power for each of the user's stat boosts.",
	},

	stellarrush: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Stellar Rush",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		recoil: [1,3],
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Has 1/3 recoil.",
	},

	supernova: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Supernova",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "30% chance to burn the target.",
	},

	trivega: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Physical",
		name: "Tri-Vega",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		willCrit: true,
		multihit: 3,
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Always results in a critical hit. Hits 3 times.",
	},

	twinstars: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Twin Stars",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		multihit: 2,
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Hits 2 times.",
	},

	uranometria: {
		num: 0,
		basePower: 150,
		accuracy: 90,
		category: "Special",
		name: "Urano Metria",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 , recharge: 1},
		self: {
			volatileStatus: 'mustrecharge',
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "User cannot move next turn.",
	},

	voiddrift: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Void Drift",
		pp: 40,
		priority: 0,
		flags: {metronome: 1,  reflectable: 1},
		boosts: {
			spe: -2,
		},
		target: "allAdjacentFoes",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Lower foe(s) speed by 2 stages.",
	},

	backstabbing: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Backstabbing",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	blackout: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Blackout",
		pp: 15,
		priority: 0,
		flags: {metronome: 1,  },
		pseudoWeather: 'blackout',
		condition: {
			duration: 5,
			onFieldStart(field, source) {
				this.add('-fieldstart', 'move: Blackout', `[of] ${source}`);
			},
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Light') {
					this.debug('blackout weaken');
					return this.chainModify([1352, 4096]);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 3,
			onFieldEnd() {
				this.add('-fieldend', 'move: Blackout');
			},
		},
		target: "all",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "For 5 turns, Light-type attacks have 1/3 power.",
	},

	cheapshot: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Cheap Shot",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "User switches out after damaging the target.",
	},

	darkrecital: {
		num: 0,
		basePower: 110,
		accuracy: 100,
		category: "Special",
		name: "Dark Recital",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp. Def by 1.",
	},

	deathgate: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Death Gate",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Sp. Def by 1.",
	},

	deathreap: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Death Reap",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Def by 1.",
	},

	evilthorn: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Evil Thorn",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Fairy') return 1;
		},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "10% chance to sleep target. Supereffective on Fairy.",
	},

	feign: {
		num: 0,
		basePower: 70,
		accuracy: true,
		category: "Special",
		name: "Feign",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	heartbreak: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Heartbreak",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		boosts: {
			def: -1,
			spd: -1,
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Lowers target's Def and Sp. Def by 1.",
	},

	obfuscate: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Obfuscate",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's accuracy by 1.",
	},

	prankcall: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Prank Call",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "30% chance to confuse the target.",
	},

	scoresettler: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Score Settler",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon) {
			if (pokemon.side.faintedLastTurn) {
				this.debug('Boosted for a faint last turn');
				return this.chainModify(2);
			}
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Power doubles if an ally fainted last turn.",
	},

	sinfulsmite: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Sinful Smite",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Resets all of the target's stat stages to 0.",
	},

	vendetta: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Vendetta",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		ignoreEvasion: true,
		ignoreDefensive: true,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Ignores the target's stat stage changes.",
	},

	frenzy: {
		num: 0,
		basePower: 100,
		accuracy: 100,
		category: "Physical",
		name: "Frenzy",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	execution: {
		num: 0,
		basePower: 130,
		accuracy: 90,
		category: "Physical",
		name: "Execution",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				atk: -2,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Lowers the user's Attack by 2.",
	},

	vitalitydrain: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Vitality Drain",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, heal: 1 },
		drain: [1, 2],
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	wickedstrike: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Physical",
		name: "Wicked Strike",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze the target.",
	},

	ancientglare: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Ancient Glare",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Attack by 1.",
	},

	dracarys: {
		num: 0,
		basePower: 120,
		accuracy: 85,
		category: "Special",
		name: "Dracarys",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "10% chance to burn the target.",
	},

	dracoshred: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Draco Shred",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Defense by 1.",
	},

	dragonblood: {
		num: 0,
		basePower: 0,
		accuracy: 90,
		category: "Status",
		name: "Dragon Blood",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		status: 'psn',
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Poisons the foe(s).",
	},

	dragongale: {
		num: 0,
		basePower: 95,
		accuracy: 90,
		category: "Special",
		name: "Dragon Gale",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "10% to flinch. 2x power if foe in sky.",
	},

	dragongnaw: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Dragon Gnaw",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1, heal: 1 },
		drain: [3, 4],
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "User recovers 75% of the damage dealt.",
	},

	dragonmagic: {
		num: 0,
		basePower: 0,
		accuracy: 75,
		category: "Status",
		name: "Dragon Magic",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, sound: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			onHit(target, source) {
				const status = this.sample(['psn', 'par', 'slp', 'brn', 'frz']);
				target.trySetStatus(status, source);
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "100% to inflict random status condition",
	},

	draconiccrash: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Draconic Crash",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		recoil: [33, 100],
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Has 1/3 recoil. 10% chance to paralyze target.",
	},

	dragonwing: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Dragon Wing",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Defense by 1.",
	},

	dracosurge: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Draco Surge",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Sp.Def by 1.",
	},

	endershock: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Special",
		name: "Ender Shock",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	nagaskin: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Naga Skin",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, heal: 1 },
		heal: [1, 2],
		target: "self",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Heals the user by 50% of its max HP.",
	},

	salamandertoss: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Salamander Toss",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "User switches out after damaging the target.",
	},

	wyvernslash: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Wyvern Slash",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	batteryacid: {
		num: 0,
		basePower: 120,
		accuracy: 80,
		category: "Special",
		name: "Battery Acid",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'psn',
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "30% chance to poison target",
	},

	chainlightning: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Chain Lightning",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "allAdjacentFoes",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Sp. Atk by 1.",
	},

	electroncrush: {
		num: 0,
		basePower: 100,
		accuracy: 100,
		category: "Physical",
		name: "Electron Crush",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	magnetforce: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Magnet Force",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Sp. Def by 1.",
	},

	protoncrash: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Proton Crash",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Speed by 1.",
	},

	shortfuse: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Short Fuse",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	staticshock: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Static Shock",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Speed by 1.",
	},

	aphroditesmirror: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Special",
		name: "Aphrodite's Mirror",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp. Atk by 1.",
	},

	changelings: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Changelings",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onHit(target, source) {
			const targetBoosts: SparseBoostsTable = {};
			const sourceBoosts: SparseBoostsTable = {};

			const statIDs: BoostID[] = ['atk', 'def', 'spa', 'spd', 'spe'];
			for (const stat of statIDs) {
				targetBoosts[stat] = target.boosts[stat];
				sourceBoosts[stat] = source.boosts[stat];
			}

			source.setBoost(targetBoosts);
			target.setBoost(sourceBoosts);

			this.add('-swapboost', source, target, 'atk, def, spa, spd, spe', '[from] move: Changelings');
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "Swaps stat stages with target.",
	},

	cupidsarrow: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Cupid's Arrow",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	etherealburst: {
		num: 0,
		basePower: 100,
		accuracy: 90,
		category: "Special",
		name: "Ethereal Burst",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, pulse: 1 },
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	fabledrush: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Fabled Rush",
		pp: 5,
		priority: 2,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "Lowers the user's Defense by 1.",
	},

	faesblessing: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Fae's Blessing",
		pp: 20,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		boosts: {
			spa: 2,
		},
		target: "self",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "Raises the user's Sp. Atk by 2.",
	},

	fairyring: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Fairy Ring",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
	},

	fairytale: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Fairy Tale",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onHit(target) {
			if (target.getTypes().join() === 'Fairy' || !target.setType('Fairy')) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Fairy');
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
				shortDesc: "Changes the target's type to Fairy.",
	},

	goblinstrike: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Goblin Strike",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Attack by 1.",
	},

	loveburst: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Love Burst",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "10% chance to confuse target",
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
	},

	mysticpulse: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Mystic Pulse",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, pulse: 1 },
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	nymphsspell: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Nymph's Spell",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Attack by 1.",
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
	},

	oberonswrath: {
		num: 0,
		basePower: 150,
		accuracy: 100,
		category: "Physical",
		name: "Oberon's Wrath",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower * pokemon.hp / pokemon.maxhp;
			this.debug(`BP: ${bp}`);
			return bp;
		},
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "Less power as user's HP decreases. Hits foe(s).",
	},

	peekaboo: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Peekaboo",
		pp: 10,
		priority: 3,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Peekaboo only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
	},

	pixiewave: {
		num: 0,
		basePower: 40,
		accuracy: true,
		category: "Special",
		name: "Pixie Wave",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	sirenssong: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Siren's Song",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},

	sylphshorn: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Sylph's Horn",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, heal: 1 },
		drain: [1,2],
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	titaniaslaw: {
		num: 0,
		basePower: 110,
		accuracy: 85,
		category: "Special",
		name: "Titania's Law",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Sp. Def by 1.",
	},

	valkyriechariot: {
		num: 0,
		basePower: 110,
		accuracy: 90,
		category: "Physical",
		name: "Valkyrie Chariot",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, gravity: 1 },
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Valkyrie Chariot'));
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
	},

	wildimagination: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Wild Imagination",
		pp: 30,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		onHit(pokemon) {
			
			// This is literally the function for getBestStat, but I didn't want to add another function to the sim
			let badStat: StatIDExceptHP = 'atk';
			let badStatVal = 0;
			const stats: StatIDExceptHP[] = ['atk', 'def', 'spa', 'spd', 'spe'];
			for (const i of stats) {
				if (pokemon.getStat(i, true, true) < badStatVal) {
					badStat = i;
					badStatVal = pokemon.getStat(i, true, true);
				}
			}

			const goodStat = pokemon.getBestStat(true, true);
			if (pokemon.boosts[goodStat] >= 6 && pokemon.boosts[badStat] <= -6) return false;
			this.boost({ [goodStat]: 1, [badStat]: 1 }, pokemon);
		},
		target: "adjacentAllyOrSelf",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "Raises user's lowest and highest stats by 1 stage.",
	},

	wooinghug: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Wooing Hug",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Defense by 1.",
	},

	athenaswisdom: {
		num: 0,
		basePower: 110,
		accuracy: 85,
		category: "Special",
		name: "Athena's Wisdom",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Sp. Def by 1.",
	},

	battleofwits: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Battle of Wits",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Psychic') return 1;
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "Super effective on Psychic.",
	},

	bruteforce: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Brute Force",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	chakrablast: {
		num: 0,
		basePower: 130,
		accuracy: 90,
		category: "Special",
		name: "Chakra Blast",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		self: {
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
	},

	chidori: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Chidori",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, defrost: 1 },
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze the target.",
	},

	chiorb: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Chi Orb",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "10% chance to confuse target",
	},

	deadlyreach: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Deadly Reach",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, punch: 1 },
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	edgestrike: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Edge Strike",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		critRatio: 2,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "10% chance to raise the user's Attack by 1.",
	},

	gigasmash: {
		num: 0,
		basePower: 150,
		accuracy: 90,
		category: "Physical",
		name: "Giga Smash",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, recharge: 1 },
		self: {
			volatileStatus: 'mustrecharge',
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "User cannot move next turn.",
	},

	magicpalm: {
		num: 0,
		basePower: 70,
		accuracy: true,
		category: "Special",
		name: "Magic Palm",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, minimize: 1 },
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "Damage doubles and no accuracy check is done if the target has used Minimize while active.",
	},

	parry: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Parry",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon) {
			if (pokemon.side.faintedLastTurn) {
				this.debug('Boosted for a faint last turn');
				return this.chainModify(2);
			}
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "Power doubles if an ally fainted last turn.",
	},

	sweepingwind: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Sweeping Wind",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Speed by 1.",
	},

	ancientfire: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Ancient Fire",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, defrost: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "10% chance to confuse target",
	},

	crimsongate: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Crimson Gate",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, defrost: 1 },
		boosts: {
			atk: 1,
			spd: 1,
		},
		target: "self",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Raises the user's Atk and Sp. Def by 1.",
	},

	flamevolley: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Physical",
		name: "Flame Volley",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, defrost: 1 },
		multihit: [2,5],
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times in one turn.",
	},

	flaresweep: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Physical",
		name: "Flare Sweep",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, defrost: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
	},

	heatsiphon: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Heat Siphon",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, defrost: 1, heal: 1 },
		drain: [1,2],
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	meltinghorn: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Melting Horn",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, defrost: 1 },
		recoil: [1,4],
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Has 1/4 recoil.",
	},

	sizzle: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Special",
		name: "Sizzle",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, defrost: 1 },
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "10% chance to burn the target.",
	},

	boreasbreath: {
		num: 0,
		basePower: 100,
		accuracy: 90,
		category: "Special",
		name: "Boreas Breath",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'frz',
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "10% chance to frostbite target",
	},

	deathvortex: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Death Vortex",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	erosion: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Erosion",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Rock') return 1;
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Super effective on Rock.",
	},

	flock: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Physical",
		name: "Flock",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		multihit: [2,5],
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times in one turn.",
	},

	galehold: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Gale Hold",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Attack by 1.",
	},

	glide: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Glide",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Speed by 1.",
	},

	jetdive: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Jet Dive",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	skydive: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Sky Dive",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		ignoreEvasion: true,
		ignoreDefensive: true,
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Ignores the target's stat stage changes.",
	},

	streamrush: { //ASK - assuming electroball bps for now, dk exact formula
		num: 0,
		basePower: 1,
		accuracy: 100,
		category: "Physical",
		name: "Stream Rush",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target) {
			let ratio = Math.floor(pokemon.getStat('spe') / target.getStat('spe'));
			if (!isFinite(ratio)) ratio = 0;
			const bp = [40, 60, 80, 120, 150][Math.min(ratio, 4)];
			this.debug(`BP: ${bp}`);
			return bp;
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "More power the faster the user is than the target.",
	},

	swansong: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Swan Song",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 10,
				boosts: {
					atk: -1,
					def: -1,
					spa: -1,
					spd: -1,
					spe: -1,
				},
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "10% chance to lower all foe stats by 1 (not acc/eva).",
	},

	tornado: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Tornado",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	turbulence: { //ASK - knock boost?
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Special",
		name: "Turbulence",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Turbulence', `[of] ${source}`);
			}
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
	},

	burningofuda: {
		num: 0,
		basePower: 20,
		accuracy: 90,
		category: "Special",
		name: "Burning Ofuda",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, defrost: 1 },
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		multihit: 3,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
	},

	deathwaltz: {
		num: 0,
		basePower: 120,
		accuracy: 85,
		category: "Special",
		name: "Death Waltz",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, dance: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "10% chance to confuse target",
	},

	ectoplasm: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Ectoplasm",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp.Def by 1.",
	},

	goosebump: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Goosebump",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "10% chance to make the target flinch.",
	},

	grimreaper: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Grim Reaper",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({ atk: 2 }, pokemon, pokemon, move);
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Raises user's Attack by 2 if this KOes the target.",
	},

	haunt: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Haunt",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Speed by 1.",
	},

	necrophagy: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Necrophagy",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1, heal: 1 },
		drain: [3,4],
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "User recovers 75% of the damage dealt.",
	},

	macabredance: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Macabre Dance",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, dance: 1 },
		boosts: {
			spa: 1,
			spe: 1,
		},
		target: "self",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Raises the user's Sp. Atk and Speed by 1.",
	},

	possession: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Possession",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		recoil: [33, 100],
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Has 1/3 recoil.",
	},

	shadowray: {
		num: 0,
		basePower: 85,
		accuracy: 90,
		category: "Special",
		name: "Shadow Ray",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, mirror: 1, pulse: 1 },
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	soulshield: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Soul Shield",
		pp: 15,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		boosts: {
			def: 1,
			spd: 1,
		},
		target: "self",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Raises the user's Defense and Sp. Def by 1.",
	},

	edenfruit: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Eden Fruit",
		pp: 10,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		volatileStatus: 'ingrain',
		boosts: {
			def: 1,
			spd: 1,
		},
		target: "self",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "Raises the user's Defense and Sp. Def by 1. Ingrains User.",
	},

	flytrap: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Fly Trap",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Bug') return 1;
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "Super effective on Bug.",
	},

	forestleap: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Forest Leap",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Speed by 1.",
	},

	mossypunch: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Mossy Punch",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'slp',
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "10% chance to sleep target",
	},

	natureswrath: {
		num: 0,
		basePower: 100,
		accuracy: 50,
		category: "Special",
		name: "Nature's Wrath",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "100% chance to confuse target",
	},

	pepperburst: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Pepper Burst",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'brn',
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "30% chance to burn target",
	},

	strandingroots: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Stranding Roots",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
	},

	thornprison: {
		num: 0,
		basePower: 35,
		accuracy: 90,
		category: "Physical",
		name: "Thorn Prison",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		volatileStatus: 'partiallytrapped',
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "Traps and damages the target for 4-5 turns.",
	},

	vexingvines: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Vexing Vines",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		target: "allAdjacentFoes",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "Traps foe(s).",
	},

	continentalrift: {
		num: 0,
		basePower: 100,
		accuracy: 90,
		category: "Physical",
		name: "Continental Rift",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical < special || (physical === special && this.randomChance(1, 2))) {
				move.category = 'Special';
			}
		},
		ignoreAbility: true,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Ignores the Abilities of other Pokemon. Special if would be stronger.",
	},

	gaiapulse: {
		num: 0,
		basePower: 120,
		accuracy: 90,
		category: "Special",
		name: "Gaia Pulse",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, pulse: 1 },
		self: {
			boosts: {
				spa: -1
			}
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Lowers user's Sp. Atk by 1.",
	},

	goldrush: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Gold Rush",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Resets all of the target's stat stages to 0.",
	},

	mudshackles: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Special",
		name: "Mud Shackles",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},

	sandjet: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Sand Jet",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	seismicshift: {
		num: 0,
		basePower: 1,
		accuracy: 100,
		category: "Special",
		name: "Seismic Shift",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			let bp;
			if (targetWeight >= 2000) {
				bp = 120;
			} else if (targetWeight >= 1000) {
				bp = 100;
			} else if (targetWeight >= 500) {
				bp = 80;
			} else if (targetWeight >= 250) {
				bp = 60;
			} else if (targetWeight >= 100) {
				bp = 40;
			} else {
				bp = 20;
			}
			this.debug(`BP: ${bp}`);
			return bp;
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "More power the heavier the target.",
	},

	stampede: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Stampede",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: 'lockedmove',
		},
		target: "randomNormal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
	},

	wildroots: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Wild Roots",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Attack by 1.",
	},

	frostbite: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Frostbite",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1 },
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Defense by 1.",
	},

	frozenheart: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Frozen Heart",
		pp: 10,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		onHit(target, source, move) {
			this.add('-activate', source, 'move: Aromatherapy');
			let success = false;
			const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
			for (const ally of allies) {
				if (ally !== source && !this.suppressingAbility(ally)) {
					if (ally.hasAbility('goodasgold')) {
						this.add('-immune', ally, '[from] ability: Good as Gold');
						continue;
					}
					if (ally.volatiles['substitute'] && !move.infiltrates) continue;
				}
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		target: "allySide",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Cures the user's party of all status conditions.",
	},

	hypothermia: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Special",
		name: "Hypothermia",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Power doubles if the target has a status ailment.",
	},

	icetomb: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Ice Tomb",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "10% chance to frostbite target",
	},

	icevortex: {
		num: 0,
		basePower: 40,
		accuracy: 90,
		category: "Special",
		name: "Ice Vortex",
		pp: 10,
		priority: -6,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "User switches out after damaging the target.",
	},

	liquidnitrogen: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Liquid Nitrogen",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'frz',
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "10% chance to frostbite target",
	},

	loveloop: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Love Loop",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, dance: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "30% chance to confuse target",
	},

	polarspear: {
		num: 0,
		basePower: 100,
		accuracy: 50,
		category: "Physical",
		name: "Polar Spear",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 50,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "50% chance to frostbite the target.",
	},

	snowflakes: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Snowflakes",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		boosts: {
			accuracy: -1,
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Lowers the target's accuracy by 1.",
	},

	wintershowl: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Winter's Howl",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		self: {
			boosts: {
				atk: -1,
				def: -1,
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Lowers the user's Attack and Defense by 1.",
	},

	cleanse: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Cleanse",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1 },
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({ evasion: -1 });
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			const removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', ...removeAll];
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
		target: "normal",
		type: "Light",
		contestType: "Tough",
		desc: "Lowers the target's evasiveness by 1 stage. If this move is successful and whether or not the target's evasiveness was affected, the effects of Reflect, Light Screen, Aurora Veil, Safeguard, Mist, Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the target's side, and the effects of Spikes, Toxic Spikes, Stealth Rock, and Sticky Web end for the user's side. Ignores a target's substitute, although a substitute will still block the lowering of evasiveness. If there is a terrain active and this move is successful, the terrain will be cleared.",
		shortDesc: "-1 evasion; ends user and target hazards/terrain.",
	},

	consecrate: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Consecrate",
		pp: 20,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		boosts: {
			atk: 1,
			def: 1,
		},
		target: "self",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Raises the user's Attack and Defense by 1.",
	},

	coupdegrace: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Coup de Grace",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon, target) {
			if (target.hp * 2 <= target.maxhp) {
				return this.chainModify(2);
			}
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Power doubles if the target's HP is 50% or less.",
	},

	divinepunishment: {
		num: 0,
		basePower: 130,
		accuracy: 90,
		category: "Special",
		name: "Divine Punishment",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
	},

	divinevision: {
		num: 0,
		basePower: 120,
		accuracy: 90,
		category: "Special",
		name: "Divine Vision",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, futuremove: 1},
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'futuresight',
				source,
				moveData: {
					id: 'divinevision',
					name: "Divine Vision",
					accuracy: 90,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Light',
				},
			});
			this.add('-start', source, 'move: Divine Vision');
			return this.NOT_FAIL;
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Hits two turns after being used.",
	},

	finalstand: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Final Stand",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		recoil: [1, 3],
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Has 1/3 recoil.",
	},

	guardianangel: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Guardian Angel",
		pp: 10,
		priority: 3,
		flags: {metronome: 1},
		sideCondition: 'guardianangel',
		onTry() {
			return !!this.queue.willAct();
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Guardian Angel');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (['self', 'all'].includes(move.target) || move.category !== 'Status') return;
				this.add('-activate', target, 'move: Guardian Angel');
				return this.NOT_FAIL;
			},
		},
		target: "allySide",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Protects allies from Status moves this turn.",
	},

	hallowedground: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Hallowed Ground",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, nonsky: 1, noassist: 1, failcopycat: 1 },
		stallingMove: true,
		sideCondition: 'hallowedground',
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Hallowed Ground only works on your first turn out.");
				return false;
			}
			return !!this.queue.willAct();
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Hallowed Ground');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (move.target === 'self') return;
				if (this.checkMoveBypassesProtect(move, source, target, false)) return;
				this.add('-activate', target, 'move: Hallowed Ground', move.name);
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		target: "allySide",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Protects allies from damaging attacks. Turn 1 only.",
	},

	holybolt: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Holy Bolt",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	holyfire: {
		num: 0,
		basePower: 0,
		accuracy: 90,
		category: "Status",
		name: "Holy Fire",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		status: 'brn',
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Burns the target.",
	},

	lightsaber: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Lightsaber",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, defrost: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "10% chance to burn the target.",
	},

	lostheaven: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Lost Heaven",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, mirror: 1 },
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "10% chance to raise the user's Attack by 1.",
	},

	luminousblade: {
		num: 0,
		basePower: 125,
		accuracy: 100,
		category: "Physical",
		name: "Luminous Blade",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather(true))) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Charges turn 1. Hits turn 2. No charge in sunlight.",
	},

	luminousscales: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Luminous Scales",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Accuracy by 1.",
	},

	purge: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Purge",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Power doubles if the target has a status ailment.",
	},

	rainbowbeam: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Rainbow Beam",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, pulse: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
	},

	rayoflight: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Ray of Light",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, snatch: 1, heal: 1 },
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		target: "allies",
		type: "Light",
		contestType: "Tough",
		shortDesc: "User and allies: healed 1/4 max HP, status cured.",
	},

	rebuke: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Rebuke",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug(`BP doubled for getting hit by ${target}`);
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Power doubles if user is damaged by the target.",
	},

	rejuvenate: {
		num: 0,
		basePower: 25,
		accuracy: 100,
		category: "Special",
		name: "Rejuvenate",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, heal: 1 },
		drain: [1,2],
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	renewal: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Renewal",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, heal:1 },
		drain: [1,2],
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	repentance: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Repentance",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, sound: 1, snatch: 1},
		onHit(target) {
			if (target.hp <= target.maxhp / 2 || target.boosts.spa >= 6 || target.maxhp === 1) { // Shedinja clause
				return false;
			}
			this.directDamage(target.maxhp / 2);
			this.boost({ spa: 12 }, target);
		},
		target: "self",
		type: "Light",
		contestType: "Tough",
		shortDesc: "User loses 50% max HP. Maximizes Sp. Atk.",
	},

	revitalize: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Revitalize",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, heal: 1 },
		drain: [1,2],
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	shinyplumes: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Shiny Plumes",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "allAdjacentFoes",
		type: "Light",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	skyblessing: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Sky Blessing",
		pp: 20,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		boosts: {
			def: 1,
			spd: 1,
		},
		target: "self",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Raises the user's Defense and Sp. Def by 1.",
	},

	sparkle: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Sparkle",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, defrost: 1 },
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "10% chance to burn the target.",
		secondary: {
			chance: 10,
			status: 'brn',
		},
	},

	strobelight: {
		num: 0,
		basePower: 0,
		accuracy: 90,
		category: "Status",
		name: "Strobe Light",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		volatileStatus: 'confusion',
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Confuses the target.",
	},

	sweetnothings: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Sweet Nothings",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, sound: 1 },
		boosts: {
			spa: -1,
			spd: -1,
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Lowers the target's Sp. Atk and Sp. Def by 1.",
	},

	zeal: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Zeal",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Speed by 1.",
	},

	bearhug: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Bear Hug",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, mirror: 1 },
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},

	clonesurge: { 
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Clone Surge",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['furycutter'] || move.hit === 1) {
				pokemon.addVolatile('furycutter');
			}
			const bp = this.clampIntRange(move.basePower * pokemon.volatiles['furycutter'].multiplier, 1, 160);
			this.debug(`BP: ${bp}`);
			return bp;
		},
		condition: {
			duration: 2,
			onStart() {
				this.effectState.multiplier = 1;
			},
			onRestart() {
				if (this.effectState.multiplier < 4) {
					this.effectState.multiplier <<= 1;
				}
				this.effectState.duration = 2;
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Power doubles with each hit, up to 160.",
	},

	curbstomp: {
		num: 0,
		basePower: 1,
		accuracy: 100,
		category: "Physical",
		name: "Curb Stomp",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			let bp;
			if (pokemonWeight >= targetWeight * 5) {
				bp = 120;
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100;
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80;
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60;
			} else {
				bp = 40;
			}
			this.debug(`BP: ${bp}`);
			return bp;
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "More power the heavier the user than the target.",
	},

	determination: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Special",
		name: "Determination",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: 'lockedmove',
		},
		target: "randomNormal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
	},

	fantasyseal: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Fantasy Seal",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Ghost') return 1;
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Super effective on Ghost.",
	},

	genesis: {
		num: 0,
		basePower: 100,
		accuracy: 90,
		category: "Special",
		name: "Genesis",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) {
				if (this.field.weather && this.field.weatherState.duration) this.field.weatherState.duration += 1;
				if (this.field.terrain && this.field.terrainState.duration) this.field.terrainState.duration += 1;
			};
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Extends weather/terrain duration by 1 turn on KO.",
	},

	lazybreak: {
		num: 0,
		basePower: 0,
		accuracy: 70,
		category: "Status",
		name: "Lazy Break",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		status: 'slp',
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Causes the target to fall asleep.",
	},

	powernap: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Power Nap",
		pp: 5,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		onHit(target, source) {
			this.add('-activate', source, 'move: Heal Bell');
			let success = false;
			const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
			for (const ally of allies) {
				if (ally !== source && !this.suppressingAbility(ally)) {
					if (ally.hasAbility('goodasgold')) {
						this.add('-immune', ally, '[from] ability: Good as Gold');
						continue;
					}
				}
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		target: "allyTeam",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Cures the user's party of all status conditions.",
	},

	primalwave: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Primal Wave",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, pulse: 1 },
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	pulse: {
		num: 0,
		basePower: 70,
		accuracy: true,
		category: "Special",
		name: "Pulse",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, pulse: 1 },
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	maim: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Maim",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Attack by 1.",
	},

	rapidstrike: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Rapid Strike",
		pp: 5,
		priority: 2,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	shutdown: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Shutdown",
		pp: 10,
		priority: 3,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Shutdown only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
	},

	slicingtail: {
		num: 0,
		basePower: 20,
		accuracy: 90,
		category: "Physical",
		name: "Slicing Tail",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
	},

	weaponmastery: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Weapon Mastery",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, dance: 1, snatch: 1},
		boosts: {
			atk: 1,
			spa: 1,
			spe: 1,
		},
		target: "self",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Raises the user's Attack, Sp. Atk, Speed by 1.",
	},

	acidrain: {
		num: 0,
		basePower: 100,
		accuracy: 90,
		category: "Special",
		name: "Acid Rain",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	allergy: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Special",
		name: "Allergy",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "Power doubles if the target has a status ailment.",
	},

	neurotoxin: {
		num: 0,
		basePower: 85,
		accuracy: 90,
		category: "Physical",
		name: "Neurotoxin",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			volatileStatus: 'psn',
		},
		critRatio: 2,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "100% chance to poison target",
	},

	plague: {
		num: 0,
		basePower: 110,
		accuracy: 100,
		category: "Physical",
		name: "Plague",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	poisonspit: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Physical",
		name: "Poison Spit",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			volatileStatus: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "100% chance to poison target",
	},

	spoil: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Spoil",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Spoil', `[of] ${source}`);
			}
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
	},

	venomdrain: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Venom Drain",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1, heal: 1 },
		drain: [1,2],
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	vilefumes: { //ASK if negate or ignore
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Vile Fumes",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		volatileStatus: 'gastroacid',
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "Nullifies the target's Ability.",
	},

	arcaneenergy: {
		num: 0,
		basePower: 110,
		accuracy: 85,
		category: "Special",
		name: "Arcane Energy",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "10% chance to raise the user's Sp. Atk by 1.",
	},

	bloodritual: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Blood Ritual",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		recoil: [1,3],
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "Has 1/3 recoil.",
	},

	checkmate: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Checkmate",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({ spa: 2 }, pokemon, pokemon, move);
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "Raises user's Sp. Atk by 2 if this KOes the target.",
	},

	karmaspell: {
		num: 0,
		basePower: 60,
		accuracy: 90,
		category: "Special",
		name: "Karma Spell",
		pp: 10,
		priority: -6,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "User switches out after damaging the target.",
	},

	manicoverload: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Manic Overload",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				atk: -1,
				spd: -1,
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "Lowers the user's Attack and Sp. Defense by 1.",
	},

	memoryblock: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Memory Block",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "30% chance to lower the target's accuracy by 1.",
	},

	mindblast: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Mind Blast",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	minddrain: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Mind Drain",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1, heal: 1 },
		drain: [1,2],
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	mindspasm: {
		num: 0,
		basePower: 30,
		accuracy: 100,
		category: "Physical",
		name: "Mind Spasm",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "100% chance to confuse target",
	},

	nurturingchant: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Nurturing Chant",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, sound: 1, heal: 1 },
		heal: [1, 4],
		target: "allies",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "Heals the user and its allies by 1/4 their max HP.",
	},

	pyrokinesis: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Pyrokinesis",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, defrost: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'brn',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "30% chance to burn target",
	},

	quickspell: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Quick Spell",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	amberwave: {
		num: 0,
		basePower: 95,
		accuracy: 90,
		category: "Special",
		name: "Amber Wave",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "10% chance to burn the target.",
	},

	bejeweled: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Bejeweled",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			onHit(target, source) {
				const status = this.sample(['brn', 'par', 'frz']);
				target.trySetStatus(status, source);
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "20% chance to burn, freezs, or paralyze target.",
	},

	boulderhurl: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Boulder Hurl",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		overrideOffensiveStat: 'def',
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "Uses user's Def stat as Atk in damage calculation.",
	},

	catapult: {
		num: 0,
		basePower: 85,
		accuracy: 90,
		category: "Physical",
		name: "Catapult",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bullet: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Speed by 1.",
	},

	crystaldust: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Crystal Dust",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Accuracy by 1.",
	},

	diamondblade: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Diamond Blade",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		critRatio: 2,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Attack by 1.",
	},

	diamondshard: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Diamond Shard",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	gemstorm: {
		num: 0,
		basePower: 110,
		accuracy: 70,
		category: "Special",
		name: "Gem Storm",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onModifyMove(move) {
			if (this.field.isWeather('sandstorm')) move.accuracy = true;
		},
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "Can't miss in Sandstorm.",
	},

	glisten: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Glisten",
		pp: 15,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		boosts: {
			spa: 1,
			spd: 1,
		},
		target: "self",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "Raises the user's Sp. Atk and Sp. Def by 1.",
	},

	mineralwave: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Special",
		name: "Mineral Wave",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
	},

	moonstoneray: {
		num: 0,
		basePower: 120,
		accuracy: 90,
		category: "Special",
		name: "Moonstone Ray",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, charge: 1 },
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({ spa: 1 }, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "Raises user's Sp. Atk by 1 on turn 1. Hits turn 2.",
	},

	battlecry: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Battle Cry",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},

	boombox: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Boombox",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	crescendo: {
		num: 0,
		basePower: 40,
		accuracy: 90,
		category: "Special",
		name: "Crescendo",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['crescendo'] || move.hit === 1) {
				pokemon.addVolatile('crescendo');
			}
			const bp = this.clampIntRange(move.basePower * pokemon.volatiles['crescendo'].multiplier, 1, 160);
			this.debug(`BP: ${bp}`);
			return bp;
		},
		condition: {
			duration: 2,
			onStart() {
				this.effectState.multiplier = 1;
			},
			onRestart() {
				if (this.effectState.multiplier < 4) {
					this.effectState.multiplier <<= 1;
				}
				this.effectState.duration = 2;
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Power doubles with each hit, up to 160.",
	},

	darkwhispers: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Dark Whispers",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		boosts: {
			spa: -1,
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Lowers the target's Sp. Atk by 1.",
	},

	fortissimo: {
		num: 0,
		basePower: 130,
		accuracy: 90,
		category: "Physical",
		name: "Fortissimo",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, sound: 1 },
		self: {
			boosts: {
				atk: -2,
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Lowers the user's Attack by 2.",
	},

	gentlechimes: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Gentle Chimes",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'slp',
		},
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "20% chance to sleep target",
	},

	gossip: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Gossip",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		boosts: {
			spa: -1,
			spd: -1,
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Lowers the target's Sp. Atk and Sp. Def by 1.",
	},

	hallelujah: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Hallelujah",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Sp. Def by 1.",
	},

	hyperacusis: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Hyperacusis",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Sp.Def by 1.",
	},

	lullaby: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Lullaby",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		volatileStatus: 'yawn',
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Puts the target to sleep after 1 turn.",
	},

	megaphone: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Megaphone",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Attack by 1.",
	},

	noisepollution: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Noise Pollution",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'psn',
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "30% chance to poison target",
	},

	odetojoy: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Ode to Joy",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, sound: 1, heal: 1 },
		heal: [1, 2],
		target: "self",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Heals the user by 50% of its max HP.",
	},

	perfectpitch: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Perfect Pitch",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "10% chance to raise all stats by 1 (not acc/eva).",
	},

	philharmonic: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Philharmonic",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, sound: 1, heal: 1 },
		onHit(pokemon) {
			const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
			return pokemon.cureStatus() || success;
		},
		target: "allies",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "User and allies: healed 1/4 max HP, status cured.",
	},

	rallentando: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Rallentando",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1, reflectable: 1 },
		onHit(target, source, move) {
			const success = this.boost({ atk: -1, spa: -1 }, target, source);
			if (!success && !target.hasAbility('mirrorarmor')) {
				delete move.selfSwitch;
			}
		},
		selfSwitch: true,
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Lowers target's Atk, Sp. Atk by 1. User switches.",
	},

	reverb: {
		num: 0,
		basePower: 25,
		accuracy: 90,
		category: "Special",
		name: "Reverb",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		multihit: [2,5],
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times in one turn.",
	},

	schizophrenia: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Schizophrenia",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, sound: 1, snatch: 1 },
		onHit(pokemon) {
			let badStat: StatIDExceptHP = 'atk';
			let badStatVal = 0;
			const stats: StatIDExceptHP[] = ['atk', 'def', 'spa', 'spd', 'spe'];
			for (const i of stats) {
				if (pokemon.getStat(i, true, true) < badStatVal) {
					badStat = i;
					badStatVal = pokemon.getStat(i, true, true);
				}
			}

			const goodStat = pokemon.getBestStat(true, true);
			if (pokemon.boosts[goodStat] >= 6 && pokemon.boosts[badStat] <= -6) return false;
			this.boost({ [goodStat]: 1, [badStat]: 1 }, pokemon);
		},
		target: "adjacentAllyOrSelf",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Raises user's lowest and highest stats by 1 stage.",
	},

	songofpassion: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Song of Passion",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Sp. Atk by 1.",
	},

	songofsilence: {
		num: 0,
		basePower: 60,
		accuracy: true,
		category: "Special",
		name: "Song of Silence",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Resets all of the target's stat stages to 0.",
	},

	soniccrash: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Sonic Crash",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, sound: 1 },
		recoil: [1,3],
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Has 1/3 recoil.",
	},

	sonicpunch: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Sonic Punch",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, punch: 1 },
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	staccato: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Staccato",
		pp: 30,
		priority: 3,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Staccato only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
	},

	talksmack: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Talk Smack",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Defense by 1.",
	},

	wail: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Wail",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		onBasePower(basePower, source) {
			if (source.statsLoweredThisTurn) {
				this.debug('wail buff');
				return this.chainModify(2);
			}
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "2x power if the user had a stat lowered this turn.",
	},

	chromeray: {
		num: 0,
		basePower: 120,
		accuracy: 80,
		category: "Special",
		name: "Chrome Ray",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'par',
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze target",
	},

	goldenbullet: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Golden Bullet",
		pp: 5,
		priority: 1,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
	},

	hellbullet: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Hell Bullet",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		tracksTarget: true,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Cannot be redirected.",
	},

	magneticcannon: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Magnetic Cannon",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, pulse: 1 },
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Sp.Def by 1.",
	},

	missileshot: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Missile Shot",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		overrideDefensiveStat: 'def',
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Damages target based on Defense, not Sp. Def.",
	},

	nervesofsteel: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Nerves of Steel",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, snatch: 1},
		sideCondition: 'mist',
		target: "allySide",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "For 5 turns, protects user's party from stat drops.",
	},

	quicksilver: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Quicksilver",
		pp: 30,
		priority: 1,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	shieldbash: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Shield Bash",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		overrideOffensiveStat: 'def',
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Uses user's Def stat as Atk in damage calculation.",
	},

	smartblade: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Smart Blade",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	swordstrike: {
		num: 0,
		basePower: 95,
		accuracy: 90,
		category: "Physical",
		name: "Sword Strike",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack by 1.",
	},

	timebomb: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Time Bomb",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		onBasePower(basePower, pokemon) {
			if (pokemon.side.faintedLastTurn) {
				this.debug('Boosted for a faint last turn');
				return this.chainModify(2);
			}
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Power doubles if an ally fainted last turn.",
	},

	titanhammer: {
		num: 0,
		basePower: 130,
		accuracy: 90,
		category: "Physical",
		name: "Titan Hammer",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				atk: -2,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Lowers the user's Attack by 2.",
	},

	coralbomb: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Coral Bomb",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bullet: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'brn',
		},
		critRatio: 2,
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "30% chance to burn target",
	},

	hypertorrent: {
		num: 0,
		basePower: 90,
		accuracy: 90,
		category: "Special",
		name: "Hyper Torrent",
		pp: 10,
		priority: -6,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "User switches out after damaging the target.",
	},

	oceanblast: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Ocean Blast",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		tracksTarget: true,
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "Cannot be redirected.",
	},

	oceanwrath: {
		num: 0,
		basePower: 100,
		accuracy: 80,
		category: "Physical",
		name: "Ocean Wrath",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	surgingblow: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Surging Blow",
		pp: 5,
		priority: 1,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, punch: 1 },
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
	},

	waterpressure: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Water Pressure",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		recoil: [1,3],
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "Has 1/3 recoil.",
	},

	waterwhip: {
		num: 0,
		basePower: 60,
		accuracy: 90,
		category: "Physical",
		name: "Water Whip",
		pp: 10,
		priority: -6,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "User switches out after damaging the target.",
	},

	quicksand: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Quicksand",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		boosts: {
			spe: -2,
		},
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Lowers the target's Speed by 2.",
	},

	dragonfury: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Dragon Fury",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Attack by 1.",
	},

	sweepingtalon: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Sweeping Talon",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	satelliteray: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Satellite Ray",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Cosmic') return 1;
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Super effective on Cosmic.",
	},

	holyward: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Holy Ward",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		overrideOffensiveStat: 'spd',
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Uses user's Sp. Def stat as Sp. Atk in damage calculation.",
	},

	bewitch: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Bewitch",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		overrideDefensiveStat: 'spd',
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
	},

	alkalinebomb: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Alkaline Bomb",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		overrideDefensiveStat: 'spd',
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
	},

	mixedwaves: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Mixed Waves",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		overrideDefensiveStat: 'spd',
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
	},

	concoction: {
		num: 0,
		basePower: 100,
		accuracy: 90,
		category: "Physical",
		name: "Concoction",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical < special || (physical === special && this.randomChance(1, 2))) {
				move.category = 'Special';
			}
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "Special if would be stronger.",
	},

	cruelwhip: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Cruel Whip",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Power doubles if the target has a status ailment.",
	},

	bombardment: {
		num: 0,
		basePower: 100,
		accuracy: 90,
		category: "Physical",
		name: "Bombardment",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bullet: 1 },
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical < special || (physical === special && this.randomChance(1, 2))) {
				move.category = 'Special';
			}
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Special if would be stronger.",
	},

	scentedshield: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Scented Shield",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		overrideOffensiveStat: 'spd',
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "Uses user's Sp. Def stat as Sp. Atk in damage calculation.",
	},

	ironsparks: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Special",
		name: "Iron Sparks",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'brn',
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "30% chance to burn target",
	},

	shrapnel: {
		num: 0,
		basePower: 70,
		accuracy: true,
		category: "Special",
		name: "Shrapnel",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		target: "allAdjacentFoes",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	clusterrockets: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Special",
		name: "Cluster Rockets",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	powerdrill: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Power Drill",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Destroys screens, unless the target is immune.",
	},

	overclock: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Overclock",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Speed by 1.",
	},

	sonicblast: {
		num: 0,
		basePower: 70,
		accuracy: true,
		category: "Physical",
		name: "Sonic Blast",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1, sound: 1 },
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	sonicwave: {
		num: 0,
		basePower: 1,
		accuracy: 100,
		category: "Physical",
		name: "Sonic Wave",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		damageCallback(pokemon) {
			return (this.random(50, 151) * pokemon.level) / 100;
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Random damage equal to 0.5x-1.5x user's level.",
	},

	deafen: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Physical",
		name: "Deafen",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Defense by 1.",
	},

	shatter: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Shatter",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, sound: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Destroys screens, unless the target is immune.",
	},

	penance: {
		num: 0,
		basePower: 60,
		accuracy: 90,
		category: "Special",
		name: "Penance",
		pp: 10,
		priority: -6,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "User switches out after damaging the target.",
	},

	stargaze: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Star Gaze",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, snatch: 1},
		boosts: {
			atk: 1,
			spa: 1,
		},
		target: "self",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Raises the user's Attack and Sp. Atk by 1.",
	},

	gravitypress: {
		num: 0,
		basePower: 1,
		accuracy: 100,
		category: "Physical",
		name: "Gravity Press",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target) {
			const targetWeight = target.getWeight();
			const pokemonWeight = pokemon.getWeight();
			let bp;
			if (pokemonWeight >= targetWeight * 5) {
				bp = 120;
			} else if (pokemonWeight >= targetWeight * 4) {
				bp = 100;
			} else if (pokemonWeight >= targetWeight * 3) {
				bp = 80;
			} else if (pokemonWeight >= targetWeight * 2) {
				bp = 60;
			} else {
				bp = 40;
			}
			this.debug(`BP: ${bp}`);
			return bp;
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "More power the heavier the user than the target.",
	},

	meteorshower: {
		num: 0,
		basePower: 18,
		accuracy: 100,
		category: "Special",
		name: "Meteor Shower",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		multihit: [2,5],
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times in one turn.",
	},

	celestialfury: {
		num: 0,
		basePower: 100,
		accuracy: 100,
		category: "Physical",
		name: "Celestial Fury",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	radiowaves: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Special",
		name: "Radio Waves",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'psn',
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "30% chance to poison target",
	},

	radiation: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Radiation",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp.Def by 1.",
	},

	cosmicavatar: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Cosmic Avatar",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				atk: -1,
				def: -1,
			},
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "Lowers the user's Attack and Defense by 1.",
	},

	astralwind: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Astral Wind",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "10% chance to raise all stats by 1 (not acc/eva).",
	},

	soundbarrier: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Sound Barrier",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		overrideOffensiveStat: 'spd',
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Uses user's Sp. Def stat as Sp. Atk in damage calculation.",
	},

	flatulence: {
		num: 0,
		basePower: 50,
		accuracy: 90,
		category: "Physical",
		name: "Flatulence",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1 },
		basePowerCallback(pokemon, target, move) {
			if (pokemon.ateBerry) {
				this.debug('BP doubled from berry eaten');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "Power doubles if the user ate a berry.",
	},

	darkomen: {
		num: 0,
		basePower: 120,
		accuracy: 90,
		category: "Special",
		name: "Dark Omen",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'darkomen',
				source,
				moveData: {
					id: 'darkomen',
					name: "Dark Omen",
					accuracy: 90,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Dark',
				},
			});
			this.add('-start', source, 'move: Dark Omen');
			return this.NOT_FAIL;
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Hits two turns after being used.",
	},

	duneblast: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Dune Blast",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({ spa: 2 }, pokemon, pokemon, move);
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Raises user's Sp. Atk by 2 if this KOes the target.",
	},

	sandsnare: {
		num: 0,
		basePower: 100,
		accuracy: 75,
		category: "Special",
		name: "Sand Snare",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		volatileStatus: 'partiallytrapped',
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Traps and damages the target for 4-5 turns.",
	},

	rattletail: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Rattle Tail",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		boosts: {
			def: -1,
			spd: -1,
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Lowers the target's Def and Sp. Def by 1.",
	},

	stonegaze: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Stone Gaze",
		pp: 10,
		priority: 3,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onTry(source) {
			if (source.activeMoveActions > 1) {
				this.hint("Stone Gaze only works on your first turn out.");
				return false;
			}
		},
		secondary: {
			chance: 100,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "Hits first. First turn out only. 100% flinch chance.",
	},

	boil: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Boil",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onEffectiveness(typeMod, target, type) {
			if (type === 'Water') return 1;
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Super effective on Water.",
	},

	meltaway: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Melt Away",
		pp: 15,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		onTryHit(pokemon) {
			const hasContrary = pokemon.hasAbility('contrary');
			if ((!hasContrary && pokemon.boosts.spe === 6) || (hasContrary && pokemon.boosts.spe === -6)) {
				return false;
			}
		},
		boosts: {
			spe: 2,
		},
		onHit(pokemon) {
			if (pokemon.weighthg > 1) {
				pokemon.weighthg = Math.max(1, pokemon.weighthg - 1000);
				this.add('-start', pokemon, 'Autotomize');
			}
		},
		target: "self",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Raises the user's Speed by 2; user loses 100 kg.",
	},

	kindle: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Kindle",
		pp: 40,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		boosts: {
			atk: 1,
		},
		target: "self",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Raises the user's Attack by 1.",
	},

	hotsprings: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Hot Springs",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onHit(target, source) {
			if (!target.cureStatus()) {
				this.add('-fail', source);
				this.attrLastMove('[still]');
				return this.NOT_FAIL;
			}
			this.heal(Math.ceil(source.maxhp * 0.5), source);
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Cures target's status; heals user 1/2 max HP if so.",
	},

	ignite: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Ignite",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, snatch: 1},
		boosts: {
			atk: 1,
		},
		target: "self",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Raises the user's Sp. Atk by 1.",
	},

	heatstroke: {
		num: 0,
		basePower: 0,
		accuracy: 90,
		category: "Status",
		name: "Heat Stroke",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		volatileStatus: 'confusion',
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Confuses the target.",
	},

	chaosblast: {
		num: 0,
		basePower: 25,
		accuracy: 100,
		category: "Special",
		name: "Chaos Blast",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		willCrit: true,
		multihit: 3,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Always results in a critical hit. Hits 3 times.",
	},

	phobia: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Special",
		name: "Phobia",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Power doubles if the target has a status ailment.",
	},

	siphon: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Siphon",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, heal: 1 },
		drain: [1,2],
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	manipulation: {
		num: 0,
		basePower: 70,
		accuracy: true,
		category: "Special",
		name: "Manipulation",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Sp.Def by 1.",
	},

	judoflip: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Judo Flip",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onHit(target) {
			let success = false;
			let i: BoostID;
			for (i in target.boosts) {
				if (target.boosts[i] === 0) continue;
				target.boosts[i] = -target.boosts[i];
				success = true;
			}
			if (!success) return false;
			this.add('-invertboost', target, '[from] move: Judo Flip');
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "Inverts the target's stat stages.",
	},

	elegy: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Elegy",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 10,
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "10% chance to lower all of target's stats by 1 (not acc/eva).",
	},

	boomingbeats: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Special",
		name: "Booming Beats",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * pokemon.positiveBoosts();
			this.debug(`BP: ${bp}`);
			return bp;
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: " + 20 power for each of the user's stat boosts.",
	},

	psychobreak: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Psycho Break",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Defense by 1.",
	},

	bonechill: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Bone Chill",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'frz',
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "10% chance to frostbite target",
	},

	refraction: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Refraction",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		ignoreEvasion: true,
		ignoreDefensive: true,
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Ignores the target's stat stage changes.",
	},

	zephyrpurge: {
		num: 0,
		basePower: 140,
		accuracy: 100,
		category: "Special",
		name: "Zephyr Purge",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onTry(source) {
			if (source.moveSlots.length < 2) return false; // Last Resort fails unless the user knows at least 2 moves
			let hasZephyrSurge = false; // User must actually have Last Resort for it to succeed
			for (const moveSlot of source.moveSlots) {
				if (moveSlot.id === 'zephyrsurge') {
					hasZephyrSurge = true;
					continue;
				}
				if (!moveSlot.used) return false;
			}
			return hasZephyrSurge;
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Fails unless each known move has been used.",
	},

	glitch: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Special",
		name: "Glitch",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onEffectiveness(typeMod, target, type) {
			return -1*typeMod
		},
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "Inverts type chart for damage calculation.",
	},

	sonicnova: {
		num: 0,
		basePower: 100,
		accuracy: 100,
		category: "Physical",
		name: "Sonic Nova",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	luminescence: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Luminescence",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Accuracy by 1.",
	},

	bouldercrush: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Boulder Crush",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				atk: -1,
				def: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "Lowers the user's Attack and Defense by 1.",
	},

	stonesurge: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Stone Surge",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, defrost: 1 },
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "20% chance to burn target",
		secondary: {
			chance: 20,
			volatileStatus: 'brn',
		},
	},

	plasmaforge: {
		num: 0,
		basePower: 95,
		accuracy: 90,
		category: "Special",
		name: "Plasma Forge",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "10% chance to burn the target.",
		secondary: {
			chance: 10,
			status: 'brn',
		},
	},

	cobaltray: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Cobalt Ray",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Resets all of the target's stat stages to 0.",
	},

	mudblast: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Special",
		name: "Mud Blast",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	mudsurge: {
		num: 0,
		basePower: 110,
		accuracy: 85,
		category: "Special",
		name: "Mud Surge",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spd: 1,
				},
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Sp. Def by 1.",
	},

	grabandgo: { //TEST - didn't do the "go" part of "grab and go"
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Physical",
		name: "Grab and Go!",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onHit(target) {
			if (!this.canSwitch(target.side) || target.volatiles['commanded']) {
				this.attrLastMove('[still]');
				this.add('-fail', target);
				return this.NOT_FAIL;
			}
		},
		self: {
			onHit(source) {
				source.skipBeforeSwitchOutEventFlag = true;
			},
		},
		selfSwitch: 'copyvolatile',
		stealsBoosts: true,
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Steals foe's stat stage changes before hitting. Passes the boosts to an ally."
	},

	aquafang: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Aqua Fang",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	powerwash: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Power Wash",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Power Wash', `[of] ${source}`);
			}
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
	},

	energysurge: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Energy Surge",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack by 1.",
	},

	dirtybomb: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Dirty Bomb",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'psn',
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "20% chance to poison target",
	},

	tempestflare: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Special",
		name: "Tempest Flare",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Lowers the user's Defense and Sp. Def by 1.",
	},

	sacredstrike: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Physical",
		name: "Sacred Strike",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Defense by 1.",
	},

	rainbowscales: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Rainbow Scales",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "30% chance to lower the target's accuracy by 1.",
	},

	scorch: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Scorch",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Attack by 1.",
	},

	aerialpulse: {
		num: 0,
		basePower: 90,
		accuracy: true,
		category: "Special",
		name: "Aerial Pulse",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, pulse: 1 },
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	arrowflurry: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Physical",
		name: "Arrow Flurry",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		multihit: [2,5],
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times.",
	},

	piddle: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Piddle",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onHit(target, source, move) {
			const success = this.boost({ def: -1, spd: -1 }, target, source);
			if (!success && !target.hasAbility('mirrorarmor')) {
				delete move.selfSwitch;
			}
		},
		selfSwitch: true,
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "Lowers target's Def, Sp. Def by 1. User switches.",
	},

	overflow: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Overflow",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Overflow', `[of] ${pokemon}`);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Overflow', `[of] ${pokemon}`);
					}
				}
				if (pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Overflow', `[of] ${pokemon}`);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Overflow', `[of] ${pokemon}`);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "Free user from hazards/bind/Leech Seed; +1 Spe.",
	},

	quakeslam: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Quake Slam",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Quake Slam', `[of] ${source}`);
			}
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
	},

	throwingstar: {
		num: 0,
		basePower: 25,
		accuracy: 90,
		category: "Physical",
		name: "Throwing Star",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		multihit: [2,5],
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times.",
	},

	tremor: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Physical",
		name: "Tremor",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	trample: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Trample",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'par',
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze target",
	},

	wraithpulse: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Wraith Pulse",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, pulse: 1 },
		onTry(source, target) {
			const action = this.queue.willMove(target);
			const move = action?.choice === 'move' ? action.move : null;
			if (!move || (move.category === 'Status' && move.id !== 'mefirst') || target.volatiles['mustrecharge']) {
				return false;
			}
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Usually goes first. Fails if target is not attacking.",
	},

	chitinousstrike: {
		num: 0,
		basePower: 100,
		accuracy: 90,
		category: "Physical",
		name: "Chitinous Strike",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "Lowers the user's Speed by 1.",
	},

	radiantlance: {
		num: 0,
		basePower: 100,
		accuracy: 95,
		category: "Physical",
		name: "Radiant Lance",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, gravity: 1 },
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Radiant Lance'));
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
	},

	fabledslam: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Physical",
		name: "Fabled Slam",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		recoil: [1,3],
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "Has 1/3 recoil.",
	},

	doublescoop: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Double Scoop",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, punch: 1 },
		multihit: 2,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Hits twice. 30% chance to make the target flinch.",
	},

	slurp: {
		num: 0,
		basePower: 25,
		accuracy: 100,
		category: "Physical",
		name: "Slurp",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1, heal: 1 },
		drain: [1,2],
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	suckblood: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Suck Blood",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1, heal: 1  },
		drain: [1,2],
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	bugsting: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Bug Sting",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Defense by 1.",
	},

	irritant: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Irritant",
		pp: 35,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp. Atk by 1.",
	},

	clackaclack: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Clack-a-clack",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
	},

	signaloverload: {
		num: 0,
		basePower: 100,
		accuracy: 100,
		category: "Special",
		name: "Signal Overload",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	gloom: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Gloom",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp.Def by 1.",
	},

	darkprism: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Dark Prism",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Sp. Atk by 1.",
	},

	umbralwave: {
		num: 0,
		basePower: 120,
		accuracy: 90,
		category: "Special",
		name: "Umbral Wave",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -1
			}
		},
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "Lowers user's Sp. Atk by 1.",
	},

	dracotempest: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Special",
		name: "Draco Tempest",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon, target) {
			if (target.hp * 2 <= target.maxhp) {
				return this.chainModify(2);
			}
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Power doubles if the target's HP is 50% or less.",
	},

	wyrmsrage: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Wyrm's Rage",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (pokemon.moveLastTurnResult === false) {
				this.debug('doubling BP due to previous move failure');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Power doubles if the user's last move failed.",
	},

	draconicwave: {
		num: 0,
		basePower: 75,
		accuracy: 90,
		category: "Physical",
		name: "Draconic Wave",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	draconicmight: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Draconic Might",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		boosts: {
			atk: -2,
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Lowers the target's Attack by 2.",
	},

	draconicmajesty: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Draconic Majesty",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		boosts: {
			spa: -2,
		},
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Lowers the target's Sp. Atk by 2.",
	},

	dragonsoul: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Dragon Soul",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, snatch: 1},
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		target: "self",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "User cures its burn, poison, or paralysis.",
	},

	stormshield: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Storm Shield",
		pp: 5,
		priority: 4,
		flags: { failinstruct: 1 },
		stallingMove: true,
		volatileStatus: 'obstruct',
		target: "self",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "Protects from damaging attacks. Contact: -2 Def.",
	},

	enchantment: {
		num: 0,
		basePower: 85,
		accuracy: 90,
		category: "Special",
		name: "Enchantment",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Speed by 1.",
	},

	pixiedust: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Special",
		name: "Pixie Dust",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "100% chance to lower the foe(s) Sp. Atk by 1.",
	},

	fleetingblow: {
		num: 0,
		basePower: 60,
		accuracy: true,
		category: "Physical",
		name: "Fleeting Blow",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, minimize: 1  },
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "Damage doubles and no accuracy check is done if the target has used Minimize while active.",
	},

	gracefulstrike: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Physical",
		name: "Graceful Strike",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'par',
		},
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze target",
	},

	unlockchi: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Special",
		name: "Unlock Chi",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower + 20 * pokemon.positiveBoosts();
			this.debug(`BP: ${bp}`);
			return bp;
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: " + 20 power for each of the user's stat boosts.",
	},

	chiwave: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Chi Wave",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Speed by 1.",
	},

	rasengan: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Rasengan",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, defrost: 1 },
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze the target.",
	},

	kamehameha: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Special",
		name: "Kamehameha",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp.Def by 1.",
	},

	aurablock: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Aura Block",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		volatileStatus: 'torment',
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "Target can't select the same move twice in a row.",
	},

	suppressaura: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Suppress Aura",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1 },
		volatileStatus: 'gastroacid',
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "Nullifies the target's Ability.",
	},

	flamepillar: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Flame Pillar",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	firewall: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Fire Wall",
		pp: 10,
		priority: 3,
		flags: { snatch: 1 },
		sideCondition: 'firewall',
		onTry() {
			return !!this.queue.willAct();
		},
		onHitSide(side, source) {
			source.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onSideStart(target, source) {
				this.add('-singleturn', source, 'Fire Wall');
			},
			onTryHitPriority: 4,
			onTryHit(target, source, move) {
				// Wide Guard blocks all spread moves
				if (move?.target !== 'allAdjacent' && move.target !== 'allAdjacentFoes') {
					return;
				}
				if (this.checkMoveBypassesProtect(move, source, target)) return;
				this.add('-activate', target, 'move: Fire Wall');
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		target: "allySide",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Protects allies from multi-target moves this turn.",
	},

	huntdown: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Hunt Down",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the huntdown succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Hunt Down damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		beforeTurnCallback(pokemon) {
			for (const target of pokemon.foes()) {
				target.addVolatile('huntdown');
				const data = target.volatiles['huntdown'];
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Hunt Down start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Hunt Down');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Hunt Down user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst || source.canTerastallize) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source) {
								if (action.choice === 'megaEvo') {
									this.actions.runMegaEvo(source);
								} else if (action.choice === 'terastallize') {
									// Also a "forme" change that happens before moves, though only possible in NatDex
									this.actions.terastallize(source);
								} else {
									continue;
								}
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('huntdown', source, source.getLocOf(pokemon));
				}
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
	},

	swoopattack: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Swoop Attack",
		pp: 5,
		priority: 2,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Lowers the user's Defense by 1.",
	},

	divebomb: {
		num: 0,
		basePower: 75,
		accuracy: 90,
		category: "Physical",
		name: "Dive Bomb",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	quillvolley: {
		num: 0,
		basePower: 20,
		accuracy: 90,
		category: "Physical",
		name: "Quill Volley",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
	},

	stalkprey: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Stalk Prey",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		boosts: {
			def: -1,
			spd: -1,
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Lowers the target's Def, Sp. Def by 1.",
	},

	encircle: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Encircle",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},

	birdofprey: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Bird of Prey",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, snatch: 1},
		boosts: {
			atk: 1,
			accuracy: 1,
		},
		target: "self",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Raises the user's Attack and accuracy by 1.",
	},

	soulrip: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Soul Rip",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		overrideDefensiveStat: 'spd',
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
	},

	soulflay: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Soul Flay",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		overrideDefensiveStat: 'spd',
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
	},

	disturb: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Disturb",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Disturb', `[of] ${source}`);
			}
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
	},

	maleficact: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Malefic Act",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		ignoreEvasion: true,
		ignoreDefensive: true,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Ignores the target's stat stage changes.",
	},

	seance: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Special",
		name: "Seance",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		multihit: [2,5],
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times.",
	},

	shiver: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Special",
		name: "Shiver",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
	},

	spitefulchant: {
		num: 0,
		basePower: 90,
		accuracy: 90,
		category: "Special",
		name: "Spiteful Chant",
		pp: 10,
		priority: -6,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		selfSwitch: true,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "User switches out after damaging the target.",
	},

	ghastlyflood: {
		num: 0,
		basePower: 95,
		accuracy: 90,
		category: "Special",
		name: "Ghastly Flood",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Accuracy by 1.",
	},

	dirge: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Dirge",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, sound: 1 },
		boosts: {
			spa: 1,
			accuracy: 1,
		},
		target: "self",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Raises the user's Sp. Atk and accuracy by 1.",
	},

	spectrallash: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Spectral Lash",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon, target) {
			if (target.hp * 2 <= target.maxhp) {
				return this.chainModify(2);
			}
		},
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Power doubles if the target's HP is 50% or less.",
	},

	essencearrow: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Essence Arrow",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "10% chance to raise the user's Sp. Atk by 1.",
	},

	essencebloom: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Special",
		name: "Essence Bloom",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
	},

	autumnblast: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Special",
		name: "Autumn Blast",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "Destroys screens, unless the target is immune.",
	},

	primordialbeam: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Special",
		name: "Primordial Beam",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "30% chance to lower the target's Sp. Atk by 1.",
	},

	petaltempest: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Petal Tempest",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "10% chance to confuse target",
	},

	dustdevils: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Dust Devils",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "10% chance to confuse the target.",
	},

	sandwave: {
		num: 0,
		basePower: 15,
		accuracy: 100,
		category: "Special",
		name: "Sand Wave",
		pp: 20,
		priority: 1,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		multihit: [2,5],
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times.",
	},

	sandspray: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Sand Spray",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Sp. Def by 2.",
	},

	sandflurry: {
		num: 0,
		basePower: 95,
		accuracy: 90,
		category: "Special",
		name: "Sand Flurry",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "10% chance to burn the target.",
	},

	sandpit: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Sand Pit",
		pp: 20,
		priority: -6,
		flags: { reflectable: 1, mirror: 1, bypasssub: 1, allyanim: 1, metronome: 1, noassist: 1, failcopycat: 1},
		forceSwitch: true,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Forces the target to switch to a random ally.",
	},

	sandshroud: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Sand Shroud",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, snatch: 1 },
		boosts: {
			spd: 3,
		},
		target: "self",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Raises the user's Sp. Def by 3.",
	},

	snowball: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Snowball",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	iciclestrike: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Physical",
		name: "Icicle Strike",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	tundrarush: {
		num: 0,
		basePower: 85,
		accuracy: 90,
		category: "Physical",
		name: "Tundra Rush",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Speed by 1.",
	},

	polarpummel: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Physical",
		name: "Polar Pummel",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack by 1.",
	},

	icydeluge: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Icy Deluge",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Icy Deluge damage boost');
				return move.basePower * 2;
			}
			this.debug('Icy Deluge NOT boosted');
			return move.basePower;
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Power doubles if user moves before the target.",
	},

	chillingblast: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Chilling Blast",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({ spa: 2 }, pokemon, pokemon, move);
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Raises user's Sp. Atk by 2 if this KOes the target.",
	},

	numbingwind: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Numbing Wind",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},

	coldsnap: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Special",
		name: "Cold Snap",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "30% chance to lower the target's Sp. Atk by 1.", 
	},

	winterwarning: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Special",
		name: "Winter Warning",
		pp: 10,
		priority: 0,
		flags: { allyanim: 1, metronome: 1, futuremove: 1 },
		ignoreImmunity: true,
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'winterwarning',
				source,
				moveData: {
					id: 'winterwarning',
					name: "Winter Warning",
					accuracy: 100,
					basePower: 120,
					category: "Special",
					priority: 0,
					flags: { allyanim: 1, metronome: 1, futuremove: 1 },
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Ice',
				},
			});
			this.add('-start', source, 'move: Winter Warning');
			return this.NOT_FAIL;
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Hits two turns after being used.",
	},

	coldfront: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Cold Front",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, snatch: 1},
		boosts: {
			atk: 1,
			spa: 1,
		},
		target: "self",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Raises the user's Attack and Sp. Atk by 1.",
	},

	wintersgrasp: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Winter's Grasp",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		boosts: {
			spe: -2,
		},
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Lowers the target's Speed by 2.",
	},

	rapture: {
		num: 0,
		basePower: 130,
		accuracy: 85,
		category: "Physical",
		name: "Rapture",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'brn',
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "20% chance to burn target",
	},

	blessedhammer: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Blessed Hammer",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		multihit: [2,5],
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times in one turn.",
	},

	fanaticism: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Fanaticism",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (pokemon.moveLastTurnResult === false) {
				this.debug('doubling BP due to previous move failure');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Power doubles if the user's last move failed.",
	},

	blindingflash: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Special",
		name: "Blinding Flash",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'par',
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze target",
	},

	willpower: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Special",
		name: "Willpower",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spa: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "100% chance to lower the foe(s) Sp. Atk by 1.",
	},

	kineticblast: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Special",
		name: "Kinetic Blast",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	harness: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Harness",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, heal: 1 },
		drain: [1,2],
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "User recovers 50% of the damage dealt.",
	},

	balancedbeam: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Balanced Beam",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	fluxwave: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Flux Wave",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "20% chance to confuse the target.",
	},

	manablast: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Special",
		name: "Mana Blast",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "30% chance to lower the target's Sp. Atk by 1.",
	},

	septicstrike: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Septic Strike",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Defense by 1.",
	},

	malady: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Malady",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Speed by 1.",
	},

	virus: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Virus",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Atk, Sp. Atk by 1.",
	},

	contagion: {
		num: 0,
		basePower: 95,
		accuracy: 90,
		category: "Physical",
		name: "Contagion",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	miasma: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Special",
		name: "Miasma",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "50% chance to raise the user's Sp. Atk by 1.",
	},

	blight: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Special",
		name: "Blight",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "Destroys screens, unless the target is immune.",
	},

	causticacid: {
		num: 0,
		basePower: 120,
		accuracy: 80,
		category: "Special",
		name: "Caustic Acid",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'par',
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze target",
	},

	mindcrush: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Mind Crush",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target) {
			let power = 60 + 20 * target.positiveBoosts();
			if (power > 200) power = 200;
			this.debug(`BP: ${power}`);
			return power;
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "60 power +20 for each of the target's stat boosts.",
	},

	mindmeld: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Mind Meld",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, source, target, move) {
			const item = target.getItem();
			if (!this.singleEvent('TakeItem', item, target.itemState, target, target, move, item)) return;
			if (item.id) {
				return this.chainModify(1.5);
			}
		},
		onAfterHit(target, source) {
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Mind Meld', `[of] ${source}`);
			}
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "1.5x damage if foe holds an item. Removes item.",
	},

	scramblemind: {
		num: 0,
		basePower: 95,
		accuracy: 90,
		category: "Physical",
		name: "Scramble Mind",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "10% chance to confuse target",
	},

	arcaneblast: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Special",
		name: "Arcane Blast",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
				spa: -1,
			},
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Atk, Sp. Atk by 1.",
	},

	arcanebarrage: {
		num: 0,
		basePower: 15,
		accuracy: 100,
		category: "Special",
		name: "Arcane Barrage",
		pp: 20,
		priority: 1,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		multihit: [2,5],
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "Hits 2-5 times.",
	},

	hexbolt: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Hex Bolt",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		ignoreEvasion: true,
		ignoreDefensive: true,
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "Ignores the target's stat stage changes.",
	},

	psyblast: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Special",
		name: "Psyblast",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	fortify: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Fortify",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, snatch: 1 },
		boosts: {
			def: 1,
			spd: 1,
		},
		target: "self",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "Raises the user's Defense and Sp. Def by 1.",
	},

	weardown: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Wear Down",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onTryImmunity(target) {
			return this.dex.getImmunity('trapped', target);
		},
		volatileStatus: 'weardown',
		condition: {
			onStart(pokemon, source) {
				this.add('-start', pokemon, 'move: Wear Down', `[of] ${source}`);
			},
			onResidualOrder: 14,
			onResidual(pokemon) {
				const source = this.effectState.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['weardown'];
					this.add('-end', pokemon, 'Wear Down', '[partiallytrapped]', '[silent]');
					return;
				}
				this.boost({ def: -1, spd: -1 }, pokemon, source, this.dex.getActiveMove('octolock'));
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source?.isActive) pokemon.tryTrap();
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "Traps target, lowers Def and SpD by 1 each turn.",
	},

	vibrato: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Vibrato",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		critRatio: 2,
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	percussionblast: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Physical",
		name: "Percussion Blast",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, sound: 1 },
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack by 1.",
	},

	gutturalroar: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Special",
		name: "Guttural Roar",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		overrideDefensiveStat: 'def',
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Damages target based on Defense, not Sp. Def.",
	},

	glorioushymn: {
		num: 0,
		basePower: 130,
		accuracy: 90,
		category: "Special",
		name: "Glorious Hymn",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		self: {
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "Lowers the user's Sp. Atk by 2.",
	},

	shotput: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Shotput",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	bulletcharge: {
		num: 0,
		basePower: 60,
		accuracy: 100,
		category: "Physical",
		name: "Bullet Charge",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Speed by 1.",
	},

	chainsweep: {
		num: 0,
		basePower: 65,
		accuracy: 100,
		category: "Physical",
		name: "Chain Sweep",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
	},

	spikedram: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Physical",
		name: "Spiked Ram",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Defense by 1.",
	},

	vanguard: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Vanguard",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, snatch: 1},
		volatileStatus: 'vanguard',
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Vanguard');
			},
			onResidualOrder: 7,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 16);
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onDragOut(pokemon) {
				this.add('-activate', pokemon, 'move: Vanguard');
				return null;
			},
		},
		target: "self",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Traps/grounds user; heals 1/16 max HP per turn.",
	},

	refurbish: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Refurbish",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, snatch: 1 },
		onHit(pokemon) {
			let badStat: StatIDExceptHP = 'atk';
			let badStatVal = 0;
			const stats: StatIDExceptHP[] = ['atk', 'def', 'spa', 'spd', 'spe'];
			for (const i of stats) {
				if (pokemon.getStat(i, true, true) < badStatVal) {
					badStat = i;
					badStatVal = pokemon.getStat(i, true, true);
				}
			}

			const goodStat = pokemon.getBestStat(true, true);
			if (pokemon.boosts[goodStat] >= 6 && pokemon.boosts[badStat] <= -6) return false;
			this.boost({ [goodStat]: 1, [badStat]: 1 }, pokemon);
		},
		target: "adjacentAllyOrSelf",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Raises user's lowest and highest stats by 1 stage.",
	},

	weld: {
		num: 0,
		basePower: 0,
		accuracy: 90,
		category: "Status",
		name: "Weld",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		status: 'brn',
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Burns the target.",
	},

	drench: {
		num: 0,
		basePower: 75,
		accuracy: 90,
		category: "Special",
		name: "Drench",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
		shortDesc: "30% chance to make the target flinch.",
	},

	crashingwave: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Physical",
		name: "Crashing Wave",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack by 1.",
	},

	tidalshift: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Tidal Shift",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, snatch: 1},
		boosts: {
			spe: 2,
		},
		target: "self",
		type: "Water",
		contestType: "Tough",
		shortDesc: "Raises the user's Speed by 2.",
	},

	swarmattack: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Swarm Attack",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onHit(target, source, move) {
			return target.addVolatile('trapped', source, move, 'trapper');
		},
		target: "allAdjacentFoes",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "Prevents the target from switching out.",
	},

	dragonfear: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Dragon Fear",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "10% chance to raise the user's Sp. Atk by 1.",
	},

	arcingblow: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Physical",
		name: "Arcing Blow",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Defense by 1.",
	},

	overwhelm: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Physical",
		name: "Overwhelm",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Defense by 1.",
	},

	cursedtouch: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Physical",
		name: "Cursed Touch",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	metallicgleam: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Metallic Gleam",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Accuracy by 1.",
	},

	ironimpact: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Iron Impact",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Defense by 1.",
	},
	torrent: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Physical",
		name: "Torrent",
		pp: 40,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
	},

	riptide: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Physical",
		name: "Riptide",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Attack by 1.",
	},
	mudslide: {
		num: 0,
		accuracy: 90,
		basePower: 75,
		category: "Special",
		name: "Mudslide",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			boosts: {
				accuracy: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Accuracy by 1.",
	},
	gammaray: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Gamma Ray",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		critRatio: 2,
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "High Crit ratio.",
	},
	heavensknuckle: {
		num: 0,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Heaven's Knuckle",
		pp: 25,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({ atk: 3 }, pokemon, pokemon, move);
		},
		target: "normal",
		type: "Light",
		contestType: "Cool",
		shortDesc: "Raises user's Attack by 2 if this KOes the target.",
	},
	solarflare: {
		num: 0,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		name: "Solar Flare",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1, defrost: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Cosmic",
		contestType: "Cool",
		shortDesc: "10% chance to burn per hit.",
	},
	deadsilence: {
		num: 0,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Dead Silence",
		pp: 15,
		priority: 0,
		flags: {
			protect: 1, mirror: 1, contact: 1
		},
		condition: {
			duration: 2,
			onStart(target) {
				this.add('-start', target, 'Dead Silence', '[silent]');
			},
			onDisableMove(pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.dex.moves.get(moveSlot.id).flags['sound']) {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove(pokemon, target, move) {
				if (!move.isZOrMaxPowered && move.flags['sound']) {
					this.add('cant', pokemon, 'move: Dead Silence');
					return false;
				}
			},
			onModifyMove(move, pokemon, target) {
				if (!move.isZOrMaxPowered && move.flags['sound']) {
					this.add('cant', pokemon, 'move: Dead Silence');
					return false;
				}
			},
			onResidualOrder: 22,
			onEnd(target) {
				this.add('-end', target, 'Dead Silence', '[silent]');
			},
		},
		secondary: {
			chance: 100,
			onHit(target) {
				target.addVolatile('deadsilence');
			},
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		desc: "For 2 turns, the target cannot use sound-based moves.",
		shortDesc: "For 2 turns, the target cannot use sound moves.",
	},
	ambush: {
		num: 0,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Ambush",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Dark",
		contestType: "Cute",
		shortDesc: "100% chance to lower the target's Attack by 1.",
	},

	wildfire: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Physical",
		name: "Wildfire",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Attack by 1.",
	},

	hellbrand: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Physical",
		name: "Hellbrand",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "Destroys screens, unless the target is immune.",
	},

	nebulastrike: {
		num: 0,
		basePower: 75,
		accuracy: 100,
		category: "Physical",
		name: "Nebula Strike",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		basePowerCallback(pokemon, target, move) {
			if (pokemon.moveLastTurnResult === false) {
				this.debug('doubling BP due to previous move failure');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Power doubles if the user's last move failed.",
	},

	earthenlance: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Physical",
		name: "Earthen Lance",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, slicing: 1 },
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Defense by 1.",
	},

	cataclysm: {
		num: 0,
		basePower: 110,
		accuracy: 90,
		category: "Physical",
		name: "Cataclysm",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Lowers the user's Speed by 1.",
	},

	weakspot: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Physical",
		name: "Earthen Lance",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Attack by 1.",
	},

	radiantburst: {
		num: 0,
		basePower: 85,
		accuracy: 90,
		category: "Physical",
		name: "Radiant Burst",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		self: {
			chance: 30,
			boosts: {
				spe: 1,
			},
		},
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "30% chance to raise the users's Speed by 1.",
	},

	prismaticfury: {
		num: 0,
		basePower: 95,
		accuracy: 90,
		category: "Physical",
		name: "Prismatic Fury",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "Light",
		contestType: "Tough",
		shortDesc: "10% chance to burn. Hits adjacent foes.",
	},

	neutralize: {
		num: 0,
		basePower: 40,
		accuracy: 100,
		category: "Special",
		name: "Neutralize",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "Resets all of the target's stat stages to 0.",
	},

	savagery: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Savagery",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		self: {
			chance: 30,
			boosts: {
				def: 1,
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "30% chance to raise the users's Defense by 1.",
	},

	obsidianshards: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Physical",
		name: "Obsidian Shards",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			boosts: {
				spa: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "30% chance to lower the target's Sp. Atk by 1.",
	},

	ironcascade: {
		num: 0,
		basePower: 110,
		accuracy: 100,
		category: "Physical",
		name: "Iron Cascade",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacent",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Hits adjacent pokemon.",
	},

	eclipsenova: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Special",
		name: "Eclipse Nova",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, bullet: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'psn',
		},
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "10% chance to poison target(s). Hits adjacent foes.",
	},

	scalestorm: {
		num: 0,
		basePower: 85,
		accuracy: 100,
		category: "Physical",
		name: "Scale Storm",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, slicing: 1 },
		critRatio: 2,
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "High Crit ratio. Hits adjacent foes.",
	},

	wyrmbeam: {
		num: 0,
		basePower: 80,
		accuracy: 100,
		category: "Special",
		name: "Wyrm Beam",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "Resets all of the target(s)'s stat stages to 0. Hits adjacent foes.",
	},

	seismicchant: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Seismic Chant",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		boosts: {
			spa: -2,
		},
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Lowers the target's Attack by 2. Hits adjacent foes.",
	},

	blastfrostbite: {
		num: 0,
		basePower: 100,
		accuracy: 100,
		category: "Special",
		name: "Blast frostbite",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacent",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "Hits adjacent pokemon.",
	},

	boltcrash: {
		num: 0,
		basePower: 100,
		accuracy: 90,
		category: "Special",
		name: "Bolt Crash",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "Lowers the users's Speed by 1.",
	},

	balllightning: {
		num: 0,
		basePower: 85,
		accuracy: 90,
		category: "Physical",
		name: "Ball Lightning",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		self: {
			chance: 30,
			boosts: {
				spe: 1,
			},
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Speed by 1.",
	},

	divinejudgement: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Divine Judgement",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Light",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp. Defense by 1. Hits adjacent foes.",
	},

	holynova: {
		num: 0,
		basePower: 110,
		accuracy: 90,
		category: "Special",
		name: "Holy Nova",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		self: {
			boosts: {
				spa: -1,
			},
		},
		target: "allAdjacent",
		type: "Light",
		contestType: "Tough",
		shortDesc: "Lowers the users's Sp. Atk by 1. Hits adjacent pokemon.",
	},

	crystalshower: {
		num: 0,
		basePower: 70,
		accuracy: 100,
		category: "Special",
		name: "Crystal Shower",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			boosts: {
				accuracy: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "30% chance to lower the target's accuracy by 1.",
	},

	crystallinebeam: {
		num: 0,
		basePower: 95,
		accuracy: 100,
		category: "Special",
		name: "Crystalline Beam",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: "frz",
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "10% chance to frostbite.",
	},

	beatdrop: {
		num: 0,
		basePower: 110,
		accuracy: 90,
		category: "Physical",
		name: "Beat Drop",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, gravity: 1},
		hasCrashDamage: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get('Beat Drop'));
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "User is hurt by 50% of its max HP if it misses.",
	},

	tapdance: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Physical",
		name: "Tap Dance",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, dance: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "10% chance to confuse target",
	},

	irontempest: {
		num: 0,
		basePower: 100,
		accuracy: 90,
		category: "Special",
		name: "Iron Tempest",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "allAdjacent",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "Hits adjacent pokemon.",
	},

	chillingtouch: {
		num: 0,
		basePower: 0,
		accuracy: 90,
		category: "Status",
		name: "Chilling Touch",
		pp: 15,
		priority: 0,
		flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1 },
		status: 'frz',
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
		shortDesc: "Frostbites the target.",
	},

	frostnip: {
		num: 0,
		basePower: 20,
		accuracy: 100,
		category: "Physical",
		name: "Frostnip",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1},
		secondary: {
			chance: 100,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "100% chance to frostbite",
	},
	bitterbastion: {
		num: 908,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bitter Bastion",
		pp: 5,
		priority: 4,
		flags: { metronome: 1, noassist: 1, failcopycat: 1 },
		stallingMove: true,
		volatileStatus: 'bitterbastion',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (this.checkMoveBypassesProtect(move, source, target, false)) return;
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (move.category === 'Special') {
					source.trySetStatus('frz', target);
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && move.category === 'Special') {
					source.trySetStatus('frz', target);
				}
			},
		},
		target: "self",
		type: "Ice",
		shortDesc: "Protects from damaging attacks. Special move: frostbite.",
	},
	powercycle: {
		num: 0,
		basePower: 90,
		accuracy: 100,
		category: "Special",
		name: "Power Cycle",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		onTry(source) {
			if (source.species.baseSpecies === 'Morpeko-Soulstones') {
				return;
			}
			this.attrLastMove('[still]');
			this.add('-fail', source, 'move: Power Cycle');
			this.hint("Only a Pokemon whose form is Morpeko-Soulstones or Morpeko-Soulstones-Unpowered can use this move.");
			return null;
		},
		onModifyType(move, pokemon) {
			if (pokemon.species.name === 'Morpeko-Soulstones-Unpowered') {
				move.type = 'Dark';
			} else {
				move.type = 'Light';
			}
		},
		target: "normal",
		type: "Light",
		desc: "Has a 100% chance to raise the user's Speed by 1 stage. If the user is a Morpeko-Soulstones in Powered Mode, this move is Light type. If the user is a Morpeko-Soulstones in Unpowered Mode, this move is Dark type. This move cannot be used successfully unless the user's current form, while considering Transform, is Powered or Unpowered Mode Morpeko-Soulstones.",
		shortDesc: "Morpeko-Soulstones: Light; Unpowered: Dark; 100% +1 Spe.",
	},

};

for (const key in Base) {
	const id = key as keyof typeof Base;
	if (Moves[id]) continue;

	if (Base[id].isNonstandard && ["Past", "Unobtainable"].includes(Base[id].isNonstandard)) {
		Moves[id] = { inherit: true, isNonstandard: null };
	}
}
