export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	// Modded - most of these need type changed to Sound + bypasssub + sound flags
	chatter: {
		inherit: true,
		type: "Sound",
	},
	hypervoice: {
		inherit: true,
		type: "Sound",
	},
	uproar: {
		inherit: true,
		type: "Sound",
	},
	relicsong: {
		inherit: true,
		type: "Sound",
	},
	round: {
		inherit: true,
		type: "Sound",
	},
	echoedvoice: {
		inherit: true,
		type: "Sound",
	},
	snore: {
		inherit: true,
		type: "Sound",
	},
	sonicboom: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1},
		type: "Sound",
	},
	bellydrum: {
		inherit: true,
		flags: {protect: 1, metronome: 1, sound: 1, bypasssub: 1},
		type: "Sound",
	},
	growl: {
		inherit: true,
		type: "Sound",
	},
	healbell: {
		inherit: true,
		type: "Sound",
	},
	howl: {
		inherit: true,
		flags: {snatch: 1, sound: 1, metronome: 1, bypasssub: 1},
		type: "Sound",
	},
	perishsong: {
		inherit: true,
		type: "Sound",
	},
	roar: {
		inherit: true,
		type: "Sound",
	},
	screech: {
		inherit: true,
		type: "Sound",
	},
	sing: {
		inherit: true,
		type: "Sound",
	},
	sleeptalk: {
		inherit: true,
		type: "Sound",
	},
	supersonic: {
		inherit: true,
		type: "Sound",
	},
	synchronoise: {
		inherit: true,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1, bypasssub: 1},
		type: "Sound",
	},
	nobleroar: {
		inherit: true,
		type: "Sound",
	},
	boomburst: {
		inherit: true,
		type: "Sound",
	},
	confide: {
		inherit: true,
		type: "Sound",
	},
	minimize: {
		inherit: true,
		volatileStatus: 'minimize',
		condition: {
			noCopy: true,
			onRestart: () => null,
			onSourceModifyDamage(damage, source, target, move) {
				const boostedMoves = [
					'stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'flavortest',
				];
				if (boostedMoves.includes(move.id)) {
					return this.chainModify(2);
				}
			},
			onAccuracy(accuracy, target, source, move) {
				const boostedMoves = [
					'stomp', 'steamroller', 'bodyslam', 'flyingpress', 'dragonrush', 'heatcrash', 'heavyslam', 'maliciousmoonsault', 'flavortest,'
				];
				if (boostedMoves.includes(move.id)) {
					return true;
				}
				return accuracy;
			},
		},
		boosts: {
			evasion: 2,
		},
	},
	rapidspin: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'scorchedashes', 'velvetscales'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				const foesideConditions = ['hawthorns'];
				for (const condition of foesideConditions) {
					if (pokemon.hp && target.side.removeSideCondition(condition)) {
						this.add('-sideend', target.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'scorchedashes', 'velvetscales'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				const foesideConditions = ['hawthorns'];
				for (const condition of foesideConditions) {
					if (pokemon.hp && target.side.removeSideCondition(condition)) {
						this.add('-sideend', target.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
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
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'scorchedashes', 'velvetscales', 'hawthorns'];
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
			return !!this.boost({atk: 1, spe: 1}, pokemon, pokemon, null, false, true) || success;
		},
	},
	mortalspin: {
		inherit: true,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onAfterHit(target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'scorchedashes', 'velvetscales'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				const foesideConditions = ['hawthorns'];
				for (const condition of foesideConditions) {
					if (pokemon.hp && target.side.removeSideCondition(condition)) {
						this.add('-sideend', target.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
		onAfterSubDamage(damage, target, pokemon, move) {
			if (!move.hasSheerForce) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Mortal Spin', '[of] ' + pokemon);
				}
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'scorchedashes', 'velvetscales'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				const foesideConditions = ['hawthorns'];
				for (const condition of foesideConditions) {
					if (pokemon.hp && target.side.removeSideCondition(condition)) {
						this.add('-sideend', target.side, this.dex.conditions.get(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			}
		},
	},
	defog: {
		inherit: true,
		flags: {protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1},
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({evasion: -1});
			const removeTarget = [
				'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
				'velvetscales', 'scorchedashes', 'hawthorns', 'soundbarrier', 'dragonendurance', 'soundbarrier', 'benevolence'
			];
			const removeAll = [
				'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge', 'velvetscales', 'scorchedashes', 'hawthorns'
			];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', '[of] ' + source);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
	},
	psychicfangs: {
		inherit: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
			pokemon.side.removeSideCondition('soundbarrier');
			pokemon.side.removeSideCondition('magicwall');
			pokemon.side.removeSideCondition('dragonendurance');
			pokemon.side.removeSideCondition('benevolence');
		},
	},
	brickbreak: {
		inherit: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
			pokemon.side.removeSideCondition('soundbarrier');
			pokemon.side.removeSideCondition('magicwall');
			pokemon.side.removeSideCondition('dragonendurance');
			pokemon.side.removeSideCondition('benevolence');
		},
	},

	// Additions
	babble: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 45, 
		category: "Special", 
		name: "Babble", 
		pp: 25, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1}, 
		target: "normal",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
	},
	papercut: {
		num: 0, 
		type: "Steel", 
		accuracy: 90, 
		basePower: 30, 
		category: "Physical", 
		name: "Papercut", 
		pp: 20, 
		priority: 0, 
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['papercut'] || move.hit === 1) {
				pokemon.addVolatile('papercut');
			}
			const bp = this.clampIntRange(move.basePower * pokemon.volatiles['papercut'].multiplier, 1, 160);
			this.debug('BP: ' + bp);
			return bp;
		},
		target: "normal",
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
		desc: "Power doubles with each successful hit, up to a maximum of 160 power. The power is reset if this move misses or another move is used.",
		shortDesc: "Power doubles with each hit, up to 160.",
	},
	hotchilipepper: { 
		num: 0, 
		type: "Grass", 
		accuracy: 100, 
		basePower: 80, 
		category: "Physical", 
		name: "Hot Chili Pepper", 
		pp: 15, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		secondary: {
			chance: 30,
			status: 'brn',
		},
		desc: "Has a 30% chance to burn the target.",
		shortDesc: "30% chance to burn the target.",
	},
	bremandrhapsody: { // The more bremand the stronger the move, but not coded into the gamae
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 35, 
		category: "Special", 
		name: "Bremand Rhapsody", 
		pp: 10, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		target: "allAdjacentFoes",
		desc: "No additional effect.",
		shortDesc: "No additional effect. Hits adjacent foes.",
	},
	jetstrike: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 60, 
		category: "Physical", 
		name: "Jet Strike", 
		pp: 20, 
		priority: 3, 
		flags: {contact: 1, protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		target: "normal", 
		desc: "No additional effect.",
		shortDesc: "Nearly always goes first.",
	},
	subwoofer: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 70, 
		category: "Physical", 
		name: "Subwoofer", 
		pp: 20, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		target: "allAdjacentFoes", 
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		desc: "Has a 30% chance to make the target flinch.",
		shortDesc: "30% chance to make the target flinch. Hits adjacent foes.",
	},
	wilddance: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 120, 
		category: "Physical", 
		name: "Wild Dance", 
		pp: 10, 
		priority: 0, 
		flags: {contact: 1, protect: 1, mirror: 1, sound: 1, bypasssub: 1, failinstruct: 1, metronome: 1},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		secondary: null,
		target: "randomNormal",
		desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
	},
	noiseburst: { 
		num: 0, 
		type: "Sound", 
		accuracy: 90, 
		basePower: 150, 
		category: "Special", 
		name: "Noise Burst", 
		pp: 5, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, cantusetwice: 1, metronome: 1},
		target: "normal", 
		secondary: null,
		shortDesc: "Cannot be selected the turn after it's used.",
	},
	perfectglare: { 
		num: 0, 
		type: "Normal", 
		accuracy: 90, 
		basePower: 0, 
		category: "Status", 
		name: "Perfect Glare", 
		pp: 20, 
		priority: 1, 
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		target: "normal", 
		secondary: {
			chance: 100,
			status: 'par',
		},
		desc: "Usually goes first. Paralyzes the target.",
		shortDesc: "Usually goes first. Paralyzes the target.",
	},
	primalscream: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 80, 
		category: "Special", 
		name: "Primal Scream", 
		pp: 15, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		target: "allAdjacentFoes",
		secondary: {
			chance: 100,
			boosts: {
				atk: -1,
			},
		},
		desc: "Lowers the foe's Attack by 1 stage. Hits adjacent foes.",
		shortDesc: "Lowers the foe's Atk by 1. Hits adjacent foes.",
	},
	revup: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 60, 
		category: "Physical", 
		name: "Rev Up", 
		pp: 20, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		target: "normal", 
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		desc: "Raises the user's Speed by 1 stage.",
		shortDesc: "Raises the user's Speed by 1.",
	},
	sugarrush: { 
		num: 0, 
		type: "Fairy", 
		accuracy: 100, 
		basePower: 120, 
		category: "Physical", 
		name: "Sugar Rush", 
		pp: 15, 
		priority: 0, 
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		recoil: [33,100],
		desc: "If the target lost HP, the user takes recoil damage equal to 1/3 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/3 recoil.",
	},
	dragonpledge: { // No Added effects found 
		num: 0, 
		type: "Dragon", 
		accuracy: 100, 
		basePower: 80, 
		category: "Special", 
		name: "Dragon Pledge", 
		pp: 10, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		shortDesc: "No additional effect.",
	},
	fairypledge: { // No Added effects found
		num: 0, 
		type: "Fairy", 
		accuracy: 100, 
		basePower: 80, 
		category: "Special", 
		name: "Fairy Pledge", 
		pp: 10, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		shortDesc: "No additional effect.",
	},
	soundpledge: { // No Added effects found 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 80, 
		category: "Special", 
		name: "Sound Pledge", 
		pp: 10, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		shortDesc: "No additional effect.",
	},
	soundimpact: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 80, 
		category: "Special", 
		name: "Sound Impact", 
		pp: 10, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		target: "normal", 
		shortDesc: "No additional effect.",
	},
	frostbite: { 
		num: 0, 
		type: "Ice", 
		accuracy: 100, 
		basePower: 60, 
		category: "Physical", 
		name: "Frostbite", 
		pp: 15, 
		priority: 0, 
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		secondary: {
			chance: 30,
			status: 'par',
		},
		desc: "Has a 30% chance to paralyze the target.",
		shortDesc: "30% chance to paralyze the target.",
	},
	feralclutch: { 
		num: 0, 
		type: "Fairy", 
		accuracy: 100, 
		basePower: 70, 
		category: "Physical", 
		name: "Feral Clutch", 
		pp: 15, 
		priority: 0, 
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		volatileStatus: 'partiallytrapped',
		secondary: null,
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Shed Tail, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
	},
	tidaldragoon: { 
		num: 0, 
		type: "Dragon", 
		accuracy: 100, 
		basePower: 25, 
		category: "Special", 
		name: "Tidal Dragoon", 
		pp: 30, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, pulse: 1},
		target: "normal", 
		multihit: [2, 5],
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
	},
	darkeningbolt: { 
		num: 0, 
		type: "Dark", 
		accuracy: 100, 
		basePower: 90, 
		category: "Special", 
		name: "Darkening Bolt", 
		pp: 15, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		secondary: {
			chance: 30,
			boosts: {
				spd: -1,
			},
		},
		desc: "Has a 30% chance to lower the target's Sp. Defense by 1 stage.",
		shortDesc: "30% chance to lower the target's Sp. Defense by 1.",
	},
	hiss: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 0, 
		category: "Status", 
		name: "Hiss", 
		pp: 30, 
		priority: 0, 
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1},
		target: "allAdjacentFoes",
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		desc: "Has a 100% chance to lower the target's Sp. Defense by 2 stages.",
		shortDesc: "100% chance to lower the foe(s) Sp. Defense by 2.",
	},
	discofever: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 0, 
		category: "Status", 
		name: "Disco Fever", 
		pp: 10, 
		priority: 0, 
		flags: {protect: 1, reflectable: 1, mirror: 1, metronome: 1},
		target: "normal", 
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		desc: "Causes the target to become confused.",
		shortDesc: "Confuses the target.",
	},
	electroswing: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 0, 
		category: "Status", 
		name: "Electroswing", 
		pp: 10, 
		priority: 0, 
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		target: "normal", 
		secondary: {
			chance: 100,
			status: 'par',
		},
		desc: "Paralyzes the target.",
		shortDesc: "Paralyzes the target.",
	},
	bluenote: { 
		num: 0, 
		type: "Sound", 
		accuracy: 100, 
		basePower: 0, 
		category: "Status", 
		name: "Blue Note", 
		pp: 10, 
		priority: 0, 
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		target: "normal", 
		status: 'slp',
		secondary: null,
		shortDesc: "Causes the target to fall asleep.",
	},
	creamwhip: { 
		num: 0, 
		type: "Ice", 
		accuracy: 100, 
		basePower: 80, 
		category: "Physical", 
		name: "Cream Whip", 
		pp: 20, 
		priority: 0, 
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance lower target's Speed by 1.",
	},
	thunderhammer: { 
		num: 0, 
		type: "Electric", 
		accuracy: 90, 
		basePower: 150, 
		category: "Physical", 
		name: "Thunder Hammer", 
		pp: 5, 
		priority: 0, 
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, recharge: 1},
		target: "normal", 
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn.",
	},
	voidstar: { 
		num: 0, 
		type: "Ice", 
		accuracy: 100, 
		basePower: 80, 
		category: "Special", 
		name: "Void Star", 
		pp: 10, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, metronome: 1, heal: 1},
		target: "normal", 
		drain: [1, 2],
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
	},
	astrallance: { 
		num: 0, 
		type: "Astral Lance", 
		accuracy: true, 
		basePower: 80, 
		category: "Special", 
		name: "Astral Lance", 
		pp: 10, 
		priority: 0, 
		flags: {protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		willCrit: true,
		desc: "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities. This move does not check accuracy.",
		shortDesc: "Always results in a critical hit. This mvoe does not check accuracy.",
	},
	starburst: { // Needs tooltip
		num: 0, 
		type: "Fairy", 
		accuracy: 90, 
		basePower: 130, 
		category: "Special", 
		name: "Star Burst", 
		pp: 5, 
		priority: 0, 
		flags: {mirror: 1, cantusetwice: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onModifyType(move, pokemon, target) {
			switch (pokemon.species.baseSpecies) { // Requires these to be base species and the others forms
				case 'Trishout':
					move.type = 'Sound';
					break;
				case 'Shulong':
					move.type = 'Dragon';
					break;
				default:
					move.type = 'Fairy';
				}
		},
		target: "normal", 
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Abilities of other Pokemon. This move's type depends on the user's species. This move will be Sound-type if the user is Trishout, Dragon-type if the user is Shulong.",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignores Abilities. Sound-type if Trishout, Dragon-type if Shulong, otherwise Fairy-type",
	},
	firekunai: { 
		num: 0, 
		type: "Fire", 
		accuracy: 95, 
		basePower: 40, 
		category: "Physical", 
		name: "Fire Kunai", 
		pp: 10, 
		priority: 1, 
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		target: "normal", 
		thawsTarget: true,
		willCrit: true,
		desc: "Will always result in a critical hit. Thaws user.",
		shortDesc: "Nearly always goes first. Always crits. Thaws user.",
	},
	xtransform: { //in Pokemon.ts
		num: 0, 
		type: "Normal", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "X Transform", 
		pp: 10, 
		priority: 0, 
		flags: {allyanim: 1, failencore: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1},
		target: "self",
		onHit(target, pokemon) {
			if (!pokemon.xtransformInto(target)) {
				return false;
			}
		}, 
		desc: "User transforms into a random X Pokémon. It will select a random ability from that species, and pick the last four moves it can learn by level. The IVs, EVs, and Nature remain that of the user.",
		shortDesc: "User transforms into a random X Pokémon."
	},
	acidrain: {
		num: 0, 
		type: "Water", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "Acid Rain", 
		pp: 10, 
		priority: 0, 
		flags: {metronome: 1},
		target: "all",
		weather: 'AcidRain',
		secondary: null,
		desc: "For 5 turns, the weather becomes Acid Rain. At the end of each turn except the last, all active Pokemon lose 1/10 of their maximum HP, rounded down, unless they are a Water, or Poison type, or have the Magic Guard, or Overcoat Abilities. Fails if the current weather is Acid Rain.",
		shortDesc: "For 5 turns, a acid rain falls.",
	},
	dragonendurance: {
		num: 0, 
		type: "Dragon", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "Dragon Endurance", 
		pp: 15, 
		priority: 0, 
		flags: {snatch: 1, metronome: 1},
		sideCondition: 'dragonendurance',
		condition: {
			duration: 5,
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && ['Electric', 'Fire', 'Water', 'Grass'].includes(move.type)) {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Dragon Endurance weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'Dragon Endurance');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add('-sideend', side, 'Dragon Endurance');
			},
		},
		target: "allySide",
		desc: "For 5 turns, the user and its party members take 0.5x (0.66x if more than one Pokémon are active on this side) damage from Electric, Fire, Water, or Grass type attacks. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, allies gain Dragon-type resistances.",
	},
	velvetscales: {
		num: 0, 
		type: "Dragon", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "Velvet Scales", 
		pp: 20, 
		priority: 0, 
		flags: {snatch: 1, metronome: 1},
		target: "foeSide",
		sideCondition: 'velvetscales',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Velvet Scales');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('magicguard')) return; //Magic Guard blocks this for some reason
				if (pokemon.getStat('def', false, true) < pokemon.getStat('spd', false, true)) {
					this.boost({def: -1}, pokemon, null, null, true);
				} else {
					this.boost({spd: -1}, pokemon, null, null, true)
				}
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, lowering the lowest defense stat of the Pokémon switching in. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		shortDesc: "Lower's foe's lowest defense on switch-in.",
	},
	hawthorns: {
		num: 0, 
		type: "Grass", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "Hawthorns", 
		pp: 15, 
		priority: 0, 
		flags: {snatch: 1, metronome: 1},
		target: "allySide", 
		sideCondition: 'hawthorns',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Hawthorns');
			},
			onResidualOrder: 5,
			onResidualSubOrder: 4,
			onResidual(pokemon) {
				this.heal(pokemon.baseMaxhp / 10);
			},
		},
		
		desc: "Sets up a hazard on the user's side of the field, healing the user and allies for 1/10 of their max HP every turn. Fails if the effect is already active on the user's side. Can be removed from the user's side if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		shortDesc: "Heals user for 1/10 max HP every turn.",
	},
	scorchedashes: {
		num: 0, 
		type: "Fire", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "Scorched Ashes", 
		pp: 20, 
		priority: 0, 
		flags: {reflectable: 1, metronome: 1},
		target: "foeSide", 
		sideCondition: 'scorchedashes',
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Scorched Ashes');
			},
			onEntryHazard(pokemon) {
				if (pokemon.hasItem('heavydutyboots') || pokemon.hasAbility('magicguard')) return; //Magic Guard blocks this for some reason
				if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) {
					this.boost({atk: -1}, pokemon, null, null, true);
				} else {
					this.boost({spa: -1}, pokemon, null, null, true)
				}
			},
		},
		desc: "Sets up a hazard on the opposing side of the field, lowering the highest attacking stat of the Pokémon switching in. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Mortal Spin, Rapid Spin, or Defog successfully, or is hit by Defog.",
		shortDesc: "Lower's foe's highest attack stat on switch-in.",
	},
	benevolence: {
		num: 0, 
		type: "Fairy", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "Benevolence", 
		pp: 15, 
		priority: 0, 
		flags: {mirror: 1, metronome: 1},
		target: "allySide", 
		sideCondition: 'benevolence',
		condition: {
			duration: 6,
			onTryHealPriority: 1,
			onTryHeal(damage, target, source, effect) {
					return this.chainModify([6144, 4096]);
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Benevolence');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 2,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Benevolence');
			},
		},
		desc: "For 6 turns, the user and its party members' healing is boosted 1.5x. Fails if the effect is already active on the user's side.",
		shortDesc: "For 6 turns, allies' healing is boosted 1.5x.",
	},
	cheering: { //grants ally +2 prio (TEST)
		num: 0, 
		type: "Sound", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "Cheering", 
		pp: 10, 
		priority: 4, 
		flags: {mirror: 1, metronome: 1, sound: 1, bypasssub: 1},
		target: "adjacentAlly",
		sideCondition: 'cheering',
		condition: {
			duration: 2,
			onSideStart(side, source) {
				this.add('-sidestart', side, 'move: Cheering');
			},
			onModifyPriority(priority, source, target, move) {
				return priority + 2;
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Cheering');
			},
		},
		desc: "For 2 turns, the target has its Priority increased by 2. Fails if this move is already in effect for the user's side.",
		shortDesc: "For 2 turns, target get +2 Priority.",
	},
	magicwall: {
		num: 0, 
		type: "Fairy", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "Magic Wall", 
		pp: 15, 
		priority: 0, 
		flags: {snatch: 1, metronome: 1},
		sideCondition: 'magicwall',
		condition: {
			duration: 5,
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && ['Dragon', 'Fighting', 'Bug', 'Dark'].includes(move.type)) {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Magic Wall weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'Magic Wall');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add('-sideend', side, 'Magic Wall');
			},
		},
		target: "allySide",
		desc: "For 5 turns, the user and its party members take 0.5x (0.66x if more than one Pokémon are active on this side) damage from Dragon, Fighting, Bug, or Dark type attacks. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, allies gain Fairy-type resistances.",
	},
	soundbarrier: {
		num: 0, 
		type: "Sound", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "Sound Barrier", 
		pp: 15, 
		priority: 0, 
		flags: {snatch: 1, metronome: 1},
		sideCondition: 'soundbarrier',
		condition: {
			duration: 5,
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target) && ['Flying', 'Water', 'Fairy'].includes(move.type)) {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Sound Barrier weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'Sound Barrier');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 1,
			onSideEnd(side) {
				this.add('-sideend', side, 'Sound Barrier');
			},
		},
		target: "allySide",
		desc: "For 5 turns, the user and its party members take 0.5x (0.66x if more than one Pokémon are active on this side) damage from Flying, Fairy, or Water type attacks. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, allies gain Sound-type resistances.",
	},
	flavortest: { // Heals for 1/10th, fucking weirdo
		num: 0, 
		type: "Fairy", 
		accuracy: 100, 
		basePower: 100, 
		category: "Physical", 
		name: "Flavor Test", 
		pp: 10, 
		priority: 0, 
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, heal: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Ice', type);
		},
		drain: [1, 10],
		target: "normal", 
		desc: "The user recovers 1/10 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down. This move combines Flying in its type effectiveness against the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
		shortDesc: "User recovers 10% of the damage dealt. Combines Flying in its type effectiveness.",
	},
	divinejudgement: {
		num: 0, 
		type: "Normal", 
		accuracy: 100, 
		basePower: 255, 
		category: "Special", 
		name: "Divine Judgement", 
		pp: 10, 
		priority: 0, 
		flags: {allyanim: 1, metronome: 1, futuremove: 1},
		target: "normal", 
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				duration: 3,
				move: 'divinejudgement',
				source: source,
				moveData: {
					id: 'divinejudgement',
					name: "Divine Judgement",
					accuracy: 100,
					basePower: 255,
					category: "Special",
					priority: 0,
					flags: {allyanim: 1, metronome: 1, futuremove: 1},
					ignoreImmunity: false,
					effectType: 'Move',
					type: 'Normal',
				},
			});
			this.add('-start', source, 'move: Future Sight');
			return this.NOT_FAIL;
		},
		desc: "Deals damage two turns after this move is used. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if this move or Doom Desire is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used.",
	},
	elepunch: {
		num: 0, 
		type: "Normal", 
		accuracy: 100, 
		basePower: 85, 
		category: "Physical", 
		name: "Elepunch", 
		pp: 10, 
		priority: 0, 
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1, metronome: 1},
		onModifyType(move, pokemon, target) {
			const item = pokemon.getItem();
			switch (item.id) {
				case 'smoothrock':
					move.type = 'Electric';
					break;
				case 'heatrock':
					move.type = 'Fire';
					break;
				case 'icyrock':
					move.type = 'Ice';
					break;
				case 'damprock':
					move.type = 'Water';
					break;
				case 'kingsrock':
					move.type = 'Rock';
					break;
				default:
					move.type = 'Normal';
				}
		},
		target: "normal", 
		desc: "This move's type depends on the user's held item. The interactions are as follows: Electric with Smooth Rock, Fire with Heat Rock, Water with Damp Rock, Ice with Icy Rock, and Rock with King's Rock.",
		shortDesc: "Type varies based on the held item.",
	},
	abguillotine: {
		num: 12,
		accuracy: 100,
		basePower: 0,
		category: "Physical",
		name: "ABGuillotine",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		ohko: true,
		secondary: null,
		target: "normal",
		type: "Steel",
		desc: "Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is at a higher level. Pokemon with the Sturdy Ability are immune.",
		shortDesc: "OHKOs the target. Fails if user is a lower level.",
	},
};
