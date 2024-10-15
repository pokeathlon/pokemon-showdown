export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	// Modded
	aerilate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'laserpulse',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Flying';
				move.typeChangerBoosted = this.effect;
			}
		},
	},
	galvanize: {
		inherit: true,
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
	},
	normalize: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball', 'laserpulse',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id) &&
				// TODO: Figure out actual interaction
				!(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Normal';
				move.typeChangerBoosted = this.effect;
			}
		},
	},
	pixilate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'laserpulse',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fairy';
				move.typeChangerBoosted = this.effect;
			}
		},
	},
	refrigerate: {
		inherit: true,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'laserpulse',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ice';
				move.typeChangerBoosted = this.effect;
			}
		},
	},

	// Additions
	acceleration: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.priority > 0) {
				this.debug('Acceleration boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Acceleration",
		shortDesc: "Priority moves are boosted by 1.5x.",
		rating: 3.5,
		num: 0,
	},
	atomizate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball', 'laserpulse'
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Nuclear';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Atomizate",
		desc: "This Pokemon's Normal-type moves become Nuclear-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type.",
		shortDesc: "This Pokemon's Normal-type moves become Nuclear type and have 1.2x power.",
		rating: 4,
		num: 0,
	},
	bloodlust: {
		onAfterMoveSecondarySelf(pokemon, target, move) {
			this.heal(pokemon.lastDamage / 6, pokemon);
		},
		flags: {},
		name: "Blood Lust",
		shortDesc: "After an attack, holder gains 1/6 of the damage in HP dealt to other Pokemon.",
		rating: 3.5,
		num: 0,
	},
	chernobyl: {
		onStart(source) {
			this.field.setWeather('fallout');
		},
		flags: {},
		name: "Chernobyl",
		shortDesc: "On switch-in, this Pokemon summons Fallout.",
		rating: 4,
		num: 0,
	},
	deepfreeze: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('frz', target);
				}
			}
		},
		flags: {},
		name: "Deep Freeze",
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will be frozen.",
		rating: 2,
		num: 0,
	},
	disenchant: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fairy') {
				this.add('-immune', target, '[from] ability: Disenchant');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Disenchant",
		shortDesc: "This Pokemon is immune to Fairy-type moves.",
		rating: 3.5,
		num: 0,
	},
	elementalist: {
		onModifyMove(move, pokemon, target) {
			if (['Fire', 'Water', 'Electric'].includes(move.type)) move.forceSTAB = true;
		},
		flags: {},
		name: "Elementalist",
		shortDesc: "User's Fire, Water, and Electric moves become STAB.",
		rating: 2,
		num: 0,
	},
	energizate: {
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
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Energizate",
		desc: "This Pokemon's Normal-type moves become Electric-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type.",
		shortDesc: "This Pokemon's Normal-type moves become Electric type and have 1.2x power.",
		rating: 4,
		num: 0,
	},
	geigersense: {
		onSwitchIn(pokemon) {
			let shouldBoost = false;
			for (const fieldPokemon of this.getAllPokemon()) {
				if (fieldPokemon !== pokemon && fieldPokemon.hasType('Nuclear')) shouldBoost = true;
			}
			if (shouldBoost) this.boost({atk: 1, spa: 1}, pokemon);
		},
		flags: {},
		name: "Geiger Sense",
		shortDesc: "Raises this Pokemon's Atk and Sp. Atk if a Nuclear-type Pokemon is on the field.",
		rating: 3.5,
		num: 0,
	},
	infuriate: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({atk: 1}, target);
			}
		},
		flags: {},
		name: "Infuriate",
		shortDesc: "If this Pokemon is hit by a physical attack, its attack is raised by 1 stage.",
		rating: 3.5,
		num: 0,
	},
	lazy: {
		onSwitchIn(pokemon) {
			if (pokemon.trySetStatus('slp')) this.add('-activate', pokemon, 'ability: Lazy');
			pokemon.statusState.time = this.random(2, 4);
			pokemon.statusState.startTime = pokemon.statusState.time;
		},
		flags: {},
		name: "Lazy",
		shortDesc: "This Pokemon falls asleep on Switch-in.",
		rating: 3.5,
		num: 0,
	},
	leadskin: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Nuclear') {
				this.add('-immune', target, '[from] ability: Lead Skin');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Lead Skin",
		shortDesc: "This Pokemon is immune to Nuclear-type moves.",
		rating: 3.5,
		num: 0,
	},
	nightterror: {
		flags: {},
		name: "Night Terror",
		shortDesc: "Causes paralysis on awakening foes.",
		rating: 3.5,
		num: 0,
	},
	petrify: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Petrify', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spe: -1}, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Petrify",
		desc: "On switch-in, this Pokemon lowers the Speed of opposing Pokemon by 1 stage. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon lowers the Speed of opponents by 1 stage.",
		rating: 3.5,
		num: 0,
	},
	quickcharge: {
		onModifyPriority(priority, pokemon) {
			if (pokemon.activeMoveActions === 0) return priority + 4;
		},
		flags: {},
		name: "Quick Charge",
		shortDesc: "On this Pokemon's first turn, its moves have +4 priority.",
		rating: 4.5,
		num: 0,
	},
	rebuild: {
		onDamagingHit(damage, target, source, move) {
			this.effectState.attacked = true;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(target, source, effect) {
			if (!this.effectState.attacked) {
				this.heal(target.baseMaxhp / 8);
			}
			this.effectState.attacked = false;
		},
		flags: {},
		name: "Rebuild",
		shortDesc: "If this Pokemon is not hit by an attack during a turn, it heals 1/8th HP.",
		rating: 3.5,
		num: 0,
	},
	sharpcoral: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(2);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		onModifyDefPriority: 5,
		onModifyDef(def) {
			return this.chainModify(0.5);
		},
		onModifySpDPriority: 5,
		onModifySpD(spd) {
			return this.chainModify(0.5);
		},
		flags: {},
		name: "Sharp Coral",
		shortDesc: "Doubles the user's offensive stats and halves its defensive stats.",
		rating: 4,
		num: 0,
	},
	soundboost: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags.sound) {
				this.debug('Sound boost');
				return this.chainModify(1.3);
			}
		},
		flags: {},
		name: "Sound Boost",
		shortDesc: "Sound-based moves are boosted by 1.3x.",
		rating: 3.5,
		num: 0,
	},
	stormbringer: {
		onStart(source) {
			this.field.setWeather('thunderstorm');
		},
		flags: {},
		name: "Stormbringer",
		shortDesc: "On switch-in, this Pokemon summons Thunderstorm.",
		rating: 4,
		num: 0,
	},
};