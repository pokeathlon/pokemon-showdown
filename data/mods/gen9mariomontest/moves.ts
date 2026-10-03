import { Moves as Base } from '../../moves';

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	// Modded
	darkvoid: {
		inherit: true,
		accuracy: 80,
		onTry(source, target, move) {
			if (source.species.name === 'Antasma' || move.hasBounced) {
				return;
			}
			this.add('-fail', source, 'move: Dark Void');
			this.hint("Only a Pokemon whose form is Antasma can use this move.");
			return null;
		},
	},
	sizzlyslide: {
		inherit: true,
		isNonstandard: null,
	},
	bittermalice: {
		inherit: true,
		secondary: {
			chance: 30,
			status: 'frz',
		},
		shortDesc: "30% chance to frostbite the target.",
	},
	ragingbull: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Tauros-Paldea-Combat':
			case "Chargin' Chuck":
				move.type = 'Fighting';
				break;
			case 'Tauros-Paldea-Blaze':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Aqua':
				move.type = 'Water';
				break;
			}
		},
	},
	anchorshot: {
		inherit: true,
		basePower: 90,
	},
	appleacid: {
		inherit: true,
		basePower: 90,
	},
	astralbarrage: {
		inherit: true,
		basePower: 110,
	},
	banefulbunker: {
		inherit: true,
		pp: 5,
	},
	beakblast: {
		inherit: true,
		basePower: 120,
		pp: 5,
	},
	belch: {
		inherit: true,
		onDisableMove: undefined, // no inherit
	},
	bloodmoon: {
		inherit: true,
		basePower: 130,
	},
	boltbeak: {
		inherit: true,
		basePower: 80,
	},
	bonerush: {
		inherit: true,
		basePower: 30,
	},
	crabhammer: {
		inherit: true,
		accuracy: 95,
	},
	crushclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	curse: {
		inherit: true,
		volatileStatus: undefined, // no inherit
		onModifyMove(move, source, target) {
			this.debug('Curse onModifyMove triggered', source, target);
			if (!source.hasType('Ghost')) {
				move.target = 'self';
			} else if (!target || (source !== target && source.isAlly(target))) {
				move.target = 'randomNormal';
			}
		},
		onTryHit(target, source, move) {
			this.debug('Curse onTryHit triggered', target, source);
			if (source.hasType('Ghost') && target.volatiles['curse']) {
				return false;
			}
		},
		onHit(target, source) {
			this.debug('Curse onHit triggered', source, target);
			if (!source.hasType('Ghost')) {
				return !!this.boost({ spe: -1, atk: 1, def: 1 }, source, source);
			}
			this.directDamage(source.maxhp / 2, source, source);
			if (source.isAlly(target)) {
				const random = this.getRandomTarget(source, 'Curse');
				if (!random) return false;
				target = random;
			}
			delete target.volatiles['curse'];
			target.addVolatile('curse');
		},
	},
	direclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		secondary: {
			chance: 30,
			onHit(target, source) {
				const status = this.sample(['psn', 'par', 'slp']);
				target.trySetStatus(status, source);
			},
		},
	},
	disable: {
		inherit: true,
		condition: {
			inherit: true,
			onBeforeMove(attacker, defender, move) {
				if (!(move.isZ && move.isZOrMaxPowered) && move.id === this.effectState.move && !move.flags['cantusetwice']) {
					this.add('cant', attacker, 'Disable', move);
					return false;
				}
			},
		},
	},
	doubleshock: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
	},
	dragoncheer: {
		inherit: true,
		flags: { bypasssub: 1, allyanim: 1, metronome: 1, sound: 1 },
	},
	dragonclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	dragonhammer: {
		inherit: true,
		basePower: 100,
	},
	encore: {
		inherit: true,
		condition: {
			inherit: true,
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;

				// Encore only works on Max Moves if the base move is not itself a Max Move
				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
				const moveSlot = target.getMoveData(move.id);
				if (move.isZ || move.isMax || move.flags['failencore'] || !moveSlot || moveSlot.pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encore');
				const action = this.queue.willMove(target);
				if (!action) {
					this.effectState.duration!++;
				} else if (action.moveid !== move.id && !target.hasItem('mentalherb')) {
					this.queue.changeAction(target, {
						choice: 'move',
						// target: undefined,
						// targetLoc: undefined,
						moveid: move.id,
					});
				}
			},
			onOverrideAction: undefined, // no inherit
		},
	},
	fakeout: {
		inherit: true,
		onDisableMove(pokemon) {
			if (pokemon.activeMoveActions) {
				pokemon.disableMove('fakeout');
			}
		},
	},
	firstimpression: {
		inherit: true,
		basePower: 100,
		onDisableMove(pokemon) {
			if (pokemon.activeMoveActions) {
				pokemon.disableMove('firstimpression');
			}
		},
	},
	infernalparade: {
		inherit: true,
		basePower: 65,
	},
	ironhead: {
		inherit: true,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
	},
	howl: {
		inherit: true,
		flags: { snatch: 1, sound: 1, bypasssub: 1, metronome: 1 },
	},
	hyperdrill: {
		inherit: true,
		basePower: 120,
		isNonstandard: "Past",
	},
	growth: {
		inherit: true,
		type: "Grass",
	},
	gravapple: {
		inherit: true,
		basePower: 90,
	},
	geargrind: {
		inherit: true,
		accuracy: 90,
		basePower: 60,
	},
	freezedry: {
		inherit: true,
		secondary: undefined, // no inherit
	},
	fishiousrend: {
		inherit: true,
		basePower: 80,
	},
	kingsshield: {
		inherit: true,
		isNonstandard: null,
		pp: 5,
	},
	lightofruin: {
		inherit: true,
		isNonstandard: null,
	},
	metalclaw: {
		inherit: true,
		isNonstandard: "Past",
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	meteorassault: {
		inherit: true,
		basePower: 170,
		isNonstandard: null,
	},
	makeitrain: {
		inherit: true,
		accuracy: 95,
		self: {
			boosts: {
				spa: -2,
			},
		},
	},
	moonblast: {
		inherit: true,
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
	},
	mountaingale: {
		inherit: true,
		basePower: 120,
	},
	nightdaze: {
		inherit: true,
		basePower: 90,
	},
	nightslash: {
		inherit: true,
		pp: 20,
	},
	nihillight: {
		inherit: true,
		pp: 5,
	},
	obstruct: {
		inherit: true,
		pp: 5,
	},
	protect: {
		inherit: true,
		pp: 5,
	},
	purify: {
		inherit: true,
		pp: 5,
	},
	psyshieldbash: {
		inherit: true,
		basePower: 90,
	},
	revelationdance: {
		inherit: true,
		basePower: 100,
	},
	saltcure: {
		inherit: true,
		condition: {
			inherit: true,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / (pokemon.hasType(['Water', 'Steel']) ? 8 : 16));
			},
		},
	},
	sandstorm: {
		inherit: true,
		pp: 5,
	},
	shadowclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	shelltrap: {
		inherit: true,
		pp: 10,
	},
	slash: {
		inherit: true,
		basePower: 80,
	},
	snaptrap: {
		inherit: true,
		isNonstandard: null,
		type: "Steel",
	},
	snipeshot: {
		inherit: true,
		basePower: 85,
	},
	snowscape: {
		inherit: true,
		pp: 5,
	},
	spikyshield: {
		inherit: true,
		pp: 5,
	},
	spinout: {
		inherit: true,
		pp: 10,
	},
	spiritshackle: {
		inherit: true,
		basePower: 90,
	},
	stuffcheeks: {
		inherit: true,
		onDisableMove: undefined, // no inherit
	},
	syrupbomb: {
		inherit: true,
		accuracy: 90,
	},
	toxicthread: {
		inherit: true,
		boosts: {
			spe: -2,
		},
	},
	trickortreat: {
		inherit: true,
		isNonstandard: null,
	},
	tripledive: {
		inherit: true,
		basePower: 35,
	},
	tropkick: {
		inherit: true,
		basePower: 85,
	},
	wish: {
		inherit: true,
		pp: 5,
	},


	// Additions
	hammerthrow: {
		num: 0,
		accuracy: 85,
		basePower: 25,
		category: "Physical",
		name: "Hammer Throw",
		shortDesc: "Hits 2-5 times. Changes based on the weather.",
		multihit: [2, 5],
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1 },
		target: "normal",
		type: "Normal",
	},
	fireball: {
		num: 0,
		accuracy: 85,
		basePower: 25,
		category: "Special",
		name: "Fire Ball",
		shortDesc: "Hits 3 times. 15% chance to burn.",
		multihit: 3,
		secondary: {
			chance: 15,
			status: 'brn',
		},
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, nosketch: 1 },
		isNonstandard: "Unobtainable",
		target: "normal",
		type: "Fire",
	},
	boomerang: {
		num: 0,
		accuracy: 90,
		basePower: 45,
		category: "Physical",
		name: "Boomerang",
		shortDesc: "Hits 2 times. 15% chance to flinch.",
		multihit: 2,
		secondary: {
			chance: 15,
			volatileStatus: 'flinch',
		},
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, nosketch: 1 },
		isNonstandard: "Unobtainable",
		target: "normal",
		type: "Flying",
	},
	icetoss: {
		num: 0,
		accuracy: 85,
		basePower: 25,
		category: "Special",
		name: "Ice Toss",
		shortDesc: "Hits 3 times. 15% chance to frostbite.",
		multihit: 3,
		secondary: {
			chance: 15,
			status: 'frz',
		},
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, nosketch: 1 },
		isNonstandard: "Unobtainable",
		target: "normal",
		type: "Ice",
	},
};

for (const key in Base) {
	const id = key as keyof typeof Base;
	if (Moves[id]) continue;

	if (Base[id].isNonstandard && ["Past", "Unobtainable"].includes(Base[id].isNonstandard)) {
		Moves[id] = { inherit: true, isNonstandard: null };
	}
}
