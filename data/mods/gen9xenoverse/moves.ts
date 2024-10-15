export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
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
	},
	lacerazionedigitale: { // Digital Tear ?
		num: 0, 
		type: "Steel", 
		accuracy: true, 
		basePower: 255, 
		category: "Physical", 
		name: "Lacerazionedigitale", 
		pp: 30, 
		priority: 0, 
		flags: {contact: 1, protect: 1, mirror: 1},
		critRatio: 2,
		target: "normal", 
	},
	papercut: { // (TEST)
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
		multihit: [2, 5]
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
	},
	starburst: { // (TEST)
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
	},
	controllopolare: { // (TEST) NO ONE LEARNS THIS??
		num: 0, 
		type: "Electric", 
		accuracy: true, 
		basePower: 0, 
		category: "Status", 
		name: "Controllo Polare", 
		pp: 20, 
		priority: 0, 
		flags: {snatch: 1, metronome: 1},
		target: "adjacentAlly", 
		onModifyMove(move, pokemon) {
			if (!['Plus', 'Minus'].includes(pokemon.ability)) return;
			move.secondaries = [];
			if (['Plus', 'Minus'].includes(pokemon.ability)) {
				move.secondaries.push({
					boosts: {
						def: 1,
						spd: 1,
					},
				});
			}
		},
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
	},
	acidrain: { // (TEST)
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
	},
	dragonendurance: { // (TEST)
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
	},
	velvetscales: { //Sets hazard that lower lowest def/spdef of incoming foe (TEST)
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
	},
	hawthorns: { // sets self hazard, heals itself and allies for 1/10th at end of every turn (TEST)
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
	},
	scorchedashes: { // sets hazard on foe that lowers highest attack on switch-in (TEST)
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
		sideCondition: 'velvetscales',
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
	},
	benevolence: { // side-condition that boosts ally healing by x1.5 for 6 turns (TEST)
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
	},
	magicwall: { // (TEST)
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
						this.debug('Sound Barrier weaken');
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
	},
	soundbarrier: { // (TEST)
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
	},
	flavortest: { // (TEST) Heals for 1/10th, fucking weirdo
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
	},
	divinejudgement: { // future move (TEST)
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
	},
	elepunch: { // (TEST)
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
				case 'ramprock':
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
	},
};
