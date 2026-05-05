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
		shortDesc: "10% chance to freeze the target.",
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
		// FUNCTION CODE: MultiTurnAttackConfuseUserAtEnd
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
		// FUNCTION CODE: DoublePowerIfTargetStatusProblem
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
		shortDesc: "Has 33% recoil. 10% chance to paralyze target.",
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
		pp: 10,
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
		shortDesc: "10% chance to freeze the target.",
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
		// FUNCTION CODE: DisableTargetHealingMoves
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
		// FUNCTION CODE: FailsIfTargetActed
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
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTargetDoublePowerIfTargetInSky, CHANCE: 10
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
		shortDesc: "Has 33% recoil. 10% chance to paralyze target.",
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

	changelings: { //TEST
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
				this.hint("Fake Out only works on your first turn out.");
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

	valkyriechariot: { //TEST
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

	wildimagination: { //TEST
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
		accuracy: 90,
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
		shortDesc: "10% chance to freeze target",
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
		accuracy: 90,
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
		onAfterHit(target, source) {
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Knock Off', `[of] ${source}`);
			}
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "Removes item.",
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
			spd: 1,
		},
		target: "self",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "Raises the user's Sp. Atk and Sp. Def by 1.",
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
		shortDesc: "Has 33% recoil.",
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

	edenfruit: { //TEST
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
		shortDesc: "Raises the user's Defense and Sp. Def by 1.",
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

	thornprison: { //TEST
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
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "10% chance to make the target flinch.",
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
		stealsBoosts: true,
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "Steals target's boosts before dealing damage.",
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
		shortDesc: "10% chance to freeze target",
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
		shortDesc: "10% chance to freeze target",
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
		shortDesc: "50% chance to freeze the target.",
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
		pp: 20,
		priority: 0,
		flags: {metronome: 1,  snatch: 1},
		onHit(pokemon) {
			if (['', 'slp', 'frz'].includes(pokemon.status)) return false;
			pokemon.cureStatus();
		},
		target: "self",
		type: "Light",
		contestType: "Tough",
		shortDesc: "User cures its burn, poison, or paralysis.",
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

	genesis: { //TEST
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
				this.hint("Fake Out only works on your first turn out.");
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
		onAfterHit(target, source) {
			const item = target.takeItem();
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Knock Off', `[of] ${source}`);
			}
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "Removes item.",
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

	vilefumes: { // ASK if negate or ignore //TEST
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
				shortDesc: "Raises user's Sp. Attack by 2 if this KOes the target.",
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
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: ParalyzeBurnOrFreezeTarget, CHANCE: 20
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
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseUserBaseDefenseInsteadOfUserBaseAttack
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
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Speed by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
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
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Accuracy by 1.",
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
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
		critRatio: 2,
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Attack by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
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
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: AlwaysHitsInSandstorm
	},

	glisten: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Glisten",
		pp: 15,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserSpAtkSpDef1
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
		target: "allAdjacentFoes",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
	},

	moonstoneray: {
		num: 0,
		basePower: 120,
		accuracy: 90,
		category: "Special",
		name: "Moonstone Ray",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: TwoTurnAttackChargeRaiseUserSpAtk1
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
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: TrapTargetInBattle
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: MultiTurnAttackPowersUpEachTurn
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpAtk1
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerUserAttack2
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
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "20% chance to sleep target",
		secondary: {
			chance: 20,
			volatileStatus: 'slp',
		},
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpAtkSpDef1
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Sp. Def by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spd: 1,
				},
			},
		},
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Sp.Def by 1.",
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: SleepTargetNextTurn
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Attack by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "30% chance to poison target",
		secondary: {
			chance: 30,
			volatileStatus: 'psn',
		},
	},

	odetojoy: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Ode to Joy",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, sound: 1 },
		target: "self",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HealUserHalfOfTotalHP
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserMainStats1, CHANCE: 10
	},

	philharmonic: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Philharmonic",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, sound: 1 },
		target: "allySide",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HealallySideQuarterOfTotalHPCureStatus
	},

	rallentando: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Rallentando",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1, sound: 1 },
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetAtkSpAtk1SwitchOutUser
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitTwoToFiveTimes
	},

	schizophrenia: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Schizophrenia",
		pp: 30,
		priority: 0,
		flags: {metronome: 1, sound: 1 },
		target: "adjacentAllyOrSelf",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseMinMaxStat1
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Sp. Atk by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: ResetTargetStatStages
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RecoilThirdOfDamageDealt
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTargetFailsIfNotUserFirstTurn, CHANCE: 100
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfUserStatsLoweredThisTurn
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze target",
		secondary: {
			chance: 10,
			volatileStatus: 'par',
		},
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FailsIfTargetActed
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: CannotBeRedirected
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Sp.Def by 1.",
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseTargetDefenseInsteadOfTargetSpDef
	},

	nervesofsteel: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Nerves of Steel",
		pp: 10,
		priority: 0,
		flags: {metronome: 1,  },
		target: "allySide",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: StartallySideImmunityToStatStageLowering
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseUserBaseDefenseInsteadOfUserBaseAttack
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack by 1.",
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfAllyFaintedLastTurn
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerUserAttack2
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
		critRatio: 2,
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "30% chance to burn target",
		secondary: {
			chance: 30,
			volatileStatus: 'brn',
		},
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
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: SwitchOutTargetDamagingMove
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
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: CannotBeRedirected
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
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FailsIfTargetActed
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
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RecoilThirdOfDamageDealt
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
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: SwitchOutTargetDamagingMove
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
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpeed2
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
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Attack by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
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
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTarget, CHANCE: 30
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: SuperEffectiveAgainstCosmic
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
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseUserBaseSpDefInsteadOfUserBaseSpAtk
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
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseTargetSpDefInsteadOfTargetDefense
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
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseTargetSpDefInsteadOfTargetDefense
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
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseTargetSpDefInsteadOfTargetDefense
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
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: CategoryDependsOnHigherDamageIgnoreTargetAbility
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
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfTargetStatusProblem
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: CategoryDependsOnHigherDamageIgnoreTargetAbility
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
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseUserBaseSpDefInsteadOfUserBaseSpAtk
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "30% chance to burn target",
		secondary: {
			chance: 30,
			volatileStatus: 'brn',
		},
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTarget, CHANCE: 30
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RemoveScreens
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FixedDamageUserLevelRandom
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RemoveScreens
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
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: SwitchOutTargetDamagingMove
	},

	stargaze: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Star Gaze",
		pp: 30,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserAtkSpAtk1
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
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: PowerHigherWithUserHeavierThanTarget
	},

	meteorshower: {
		num: 0,
		basePower: 18,
		accuracy: 90,
		category: "Special",
		name: "Meteor Shower",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitTwoToFiveTimes
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
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "30% chance to poison target",
		secondary: {
			chance: 30,
			volatileStatus: 'psn',
		},
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
		target: "allAdjacentFoes",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp.Def by 1.",
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
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
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerUserAtkDef1
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
		target: "normal",
		type: "Cosmic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserMainStats1, CHANCE: 10
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseUserBaseSpDefInsteadOfUserBaseSpAtk
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
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfUserConsumedBerry
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
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: AttackTwoTurnsLater
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
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserSpAtk2IfTargetFaints
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
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: BindTarget
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetDefSpDef1
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
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTargetFailsIfNotUserFirstTurn, CHANCE: 100
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
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: SuperEffectiveAgainstWater
	},

	meltaway: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Melt Away",
		pp: 15,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserSpeed2LowerUserWeight
	},

	kindle: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Kindle",
		pp: 40,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserAttack1
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
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: CureTargetStatusHealUserHalfOfTotalHP
	},

	ignite: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Ignite",
		pp: 40,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserSpAtk1
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
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: ConfuseTarget
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
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitThreeTimesAlwaysCriticalHit
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
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfTargetStatusProblem
	},

	siphon: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Special",
		name: "Siphon",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HealUserByHalfOfDamageDone
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
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Sp.Def by 1.",
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
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
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: InvertTargetStatStages
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetMainStats1, CHANCE: 10
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: PowerHigherWithUserPositiveStatStages
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
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
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
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "10% chance to freeze target",
		secondary: {
			chance: 10,
			volatileStatus: 'frz',
		},
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
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: IgnoreTargetDefSpDefEvaStatStages
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
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FailsIfUserHasUnusedMove
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
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: GlitchMove
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
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Accuracy by 1.",
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
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
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerUserAtkDef1
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
		accuracy: 90,
		category: "Special",
		name: "Cobalt Ray",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: ResetTargetStatStages
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
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTarget, CHANCE: 30
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
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Sp. Def by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spd: 1,
				},
			},
		},
	},

	grabandgo: {
		num: 0,
		basePower: 55,
		accuracy: 100,
		category: "Physical",
		name: "Grab and Go!",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: StealStatsAndPassToAlly
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
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTarget, CHANCE: 30
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
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RemoveTargetItem
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
		target: "normal",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack by 1.",
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
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
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "20% chance to poison target",
		secondary: {
			chance: 20,
			volatileStatus: 'psn',
		},
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
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerUserDefSpDef1
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
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
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
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetAccuracy1, CHANCE: 30
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
		target: "normal",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Attack by 1.",
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitTwoToFiveTimes
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
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetDefSpDef1SwitchOutUser
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
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RemoveUserBindingAndEntryHazards, CHANCE: 100
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
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RemoveTargetItem
	},

	throwingstar: {
		num: 0,
		basePower: 25,
		accuracy: 100,
		category: "Physical",
		name: "Throwing Star",
		pp: 15,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitTwoToFiveTimes
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
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze target",
		secondary: {
			chance: 10,
			volatileStatus: 'par',
		},
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
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfTargetNotActed
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
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerUserSpeed1
	},

	radiantlance: {
		num: 0,
		basePower: 100,
		accuracy: 95,
		category: "Physical",
		name: "Radiant Lance",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: CrashDamageIfFailsUnusableInGravity
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
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RecoilThirdOfDamageDealt
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
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitTwoTimesFlinchTarget, CHANCE: 30
	},

	slurp: {
		num: 0,
		basePower: 25,
		accuracy: 100,
		category: "Physical",
		name: "Slurp",
		pp: 25,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1 },
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HealUserByHalfOfDamageDone
	},

	suckblood: {
		num: 0,
		basePower: 50,
		accuracy: 100,
		category: "Physical",
		name: "Suck Blood",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1, bite: 1 },
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HealUserByHalfOfDamageDone
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
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
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
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpAtk1, CHANCE: 10
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
		target: "normal",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Sp. Atk by 1.",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
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
		target: "allAdjacentFoes",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp.Def by 1.",
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
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
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpAtk1, CHANCE: 100
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
		target: "normal",
		type: "Dark",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTarget, CHANCE: 10
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
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfTargetHPLessThanHalf
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
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfUserLastMoveFailed
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
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTarget, CHANCE: 30
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
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetAttack2
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
		target: "allAdjacentFoes",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpAtk2
	},

	dragonsoul: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Dragon Soul",
		pp: 20,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: CureUserBurnPoisonParalysis
	},

	stormshield: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Storm Shield",
		pp: 10,
		priority: 4,
		flags: {metronome: 1,  },
		target: "self",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: ProtectUserFromDamagingMovesObstruct
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
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Speed by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
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
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpAtk1, CHANCE: 100
	},

	fleetingblow: {
		num: 0,
		basePower: 60,
		accuracy: true,
		category: "Physical",
		name: "Fleeting Blow",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: ExtraPowerIfEvasion
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
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze target",
		secondary: {
			chance: 10,
			volatileStatus: 'par',
		},
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
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: PowerHigherWithUserPositiveStatStages
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
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "100% chance to raise the user's Speed by 1.",
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
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
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		secondary: {
			chance: 10,
			status: 'par',
		},
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
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Sp.Def by 1.",
		secondary: {
			chance: 10,
			boosts: {
				spd: -1,
			},
		},
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
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DisableTargetUsingSameMoveConsecutively
	},

	suppressaura: {
		num: 0,
		basePower: 0,
		accuracy: 100,
		category: "Status",
		name: "Suppress Aura",
		pp: 20,
		priority: 0,
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DisableTargetStatusMoves
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
		flags: {metronome: 1,  },
		target: "allySide",
		type: "Fire",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: ProtectallySideFromMultiTargetDamagingMoves
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
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: PursueSwitchingFoe
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
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerUserDefense1
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
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTarget, CHANCE: 30
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
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitThreeTimesPowersUpWithEachHit
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
		target: "normal",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetDefSpDef1
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
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: TrapTargetInBattle
	},

	birdofprey: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Bird of Prey",
		pp: 15,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Flying",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserAtkAcc1
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
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseTargetSpDefInsteadOfTargetDefense
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
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseTargetSpDefInsteadOfTargetDefense
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
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RemoveTargetItem
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
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: IgnoreTargetDefSpDefEvaStatStages
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
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitTwoToFiveTimes
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
		target: "allAdjacentFoes",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
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
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: SwitchOutTargetDamagingMove
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
		target: "allAdjacentFoes",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Accuracy by 1.",
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
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
		target: "self",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserSpAtkAcc1
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
		target: "normal",
		type: "Ghost",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfTargetHPLessThanHalf
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
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserSpAtk1, CHANCE: 10
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
		target: "allAdjacentFoes",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
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
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RemoveScreens
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
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpAtk1, CHANCE: 30
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
		target: "normal",
		type: "Grass",
		contestType: "Tough",
		shortDesc: "10% chance to confuse target",
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
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
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: ConfuseTarget, CHANCE: 20
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
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitTwoToFiveTimes
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
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpDef2, CHANCE: 100
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
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "10% chance to burn the target.",
		secondary: {
			chance: 10,
			status: 'brn',
		},
	},

	sandpit: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Sand Pit",
		pp: 20,
		priority: -6,
		flags: {metronome: 1, mirror: 1 },
		target: "normal",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: SwitchOutTargetStatusMove
	},

	sandshroud: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Sand Shroud",
		pp: 20,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Ground",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserSpDef3
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
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Speed by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
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
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack by 1.",
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
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
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfTargetNotActed
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
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserSpAtk2IfTargetFaints
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
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: TrapTargetInBattle, CHANCE: 100
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
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpAtk1, CHANCE: 30
	},

	winterwarning: {
		num: 0,
		basePower: 120,
		accuracy: 100,
		category: "Special",
		name: "Winter Warning",
		pp: 10,
		priority: 0,
		flags: {metronome: 1,  },
		target: "normal",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: AttackTwoTurnsLater
	},

	coldfront: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Cold Front",
		pp: 30,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserAtkSpAtk1
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
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpeed2
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
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "20% chance to burn target",
		secondary: {
			chance: 20,
			volatileStatus: 'brn',
		},
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
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitTwoTimes
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
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: DoublePowerIfUserLastMoveFailed
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
		target: "normal",
		type: "Light",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze target",
		secondary: {
			chance: 10,
			volatileStatus: 'par',
		},
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
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpAtk1, CHANCE: 100
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
		flags: {metronome: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HealUserByHalfOfDamageDone
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
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: ConfuseTarget, CHANCE: 20
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
		target: "normal",
		type: "Normal",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetSpAtk1, CHANCE: 30
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
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
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
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Speed by 1.",
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
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
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetAtkSpAtk1, CHANCE: 10
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
		target: "allAdjacentFoes",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTarget, CHANCE: 30
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
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "50% chance to raise the user's Sp. Atk by 1.",
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
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
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RemoveScreens
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
		target: "normal",
		type: "Poison",
		contestType: "Tough",
		shortDesc: "10% chance to paralyze target",
		secondary: {
			chance: 10,
			volatileStatus: 'par',
		},
	},

	mindcrush: {
		num: 0,
		basePower: 1,
		accuracy: 100,
		category: "Physical",
		name: "Mind Crush",
		pp: 5,
		priority: 0,
		flags: {metronome: 1, contact: 1, protect: 1, mirror: 1 },
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: PowerHigherWithTargetPositiveStatStages
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
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RemoveTargetItem
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
		target: "allAdjacentFoes",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "10% chance to confuse target",
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
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
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: LowerTargetAtkSpAtk1, CHANCE: 10
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
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: HitTwoToFiveTimes
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
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: IgnoreTargetDefSpDefEvaStatStages
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
		target: "normal",
		type: "Psychic",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTarget, CHANCE: 30
	},

	fortify: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Fortify",
		pp: 20,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserDefSpDef1
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
		target: "normal",
		type: "Rock",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: TrapTargetInBattleLowerTargetDefSpDef1EachTurn
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack by 1.",
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
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
		target: "normal",
		type: "Sound",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: UseTargetDefenseInsteadOfTargetSpDef
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Speed by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Speed by 1.",
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "100% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
	},

	vanguard: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Vanguard",
		pp: 20,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: StartHealUserEachTurnTrapUserInBattle
	},

	refurbish: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Refurbish",
		pp: 30,
		priority: 0,
		flags: {metronome: 1,  },
		target: "adjacentAllyOrSelf",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseMinMaxStat1
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: BurnTarget
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
		target: "allAdjacentFoes",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: FlinchTarget, CHANCE: 30
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
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "20% chance to raise the user's Attack by 1.",
		secondary: {
			chance: 20,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
	},

	tidalshift: {
		num: 0,
		basePower: 0,
		accuracy: true,
		category: "Status",
		name: "Tidal Shift",
		pp: 30,
		priority: 0,
		flags: {metronome: 1,  },
		target: "self",
		type: "Water",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserSpeed2
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
		target: "allAdjacentFoes",
		type: "Bug",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: TrapTargetInBattle
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
		target: "normal",
		type: "Dragon",
		contestType: "Tough",
		shortDesc: "No additional effect.",
		// FUNCTION CODE: RaiseUserSpAtk1, CHANCE: 10
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
		target: "allAdjacentFoes",
		type: "Electric",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 10,
			boosts: {
				def: -1,
			},
		},
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
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Defense by 1.",
		secondary: {
			chance: 20,
			boosts: {
				def: -1,
			},
		},
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "10% chance to lower the target's Accuracy by 1.",
		secondary: {
			chance: 10,
			boosts: {
				accuracy: -1,
			},
		},
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
		target: "normal",
		type: "Steel",
		contestType: "Tough",
		shortDesc: "30% chance to raise the user's Defense by 1.",
		secondary: {
			chance: 30,
			self: {
				boosts: {
					def: 1,
				},
			},
		},
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
		target: "normal",
		type: "Water",
		contestType: "Tough",
		shortDesc: "20% chance to lower the target's Attack by 1.",
		secondary: {
			chance: 20,
			boosts: {
				atk: -1,
			},
		},
	},

};

for (const key in Base) {
	const id = key as keyof typeof Base;
	if (Moves[id]) continue;

	if (Base[id].isNonstandard && ["Past", "Unobtainable"].includes(Base[id].isNonstandard)) {
		Moves[id] = { inherit: true, isNonstandard: null };
	}
}
