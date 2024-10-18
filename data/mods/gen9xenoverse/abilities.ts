export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	dirtypool: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Chimaooze' || pokemon.transformed) return;
			if (pokemon.level > 20 && pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.forme !== 'Monster') {
					pokemon.formeChange('Chimaooze-Monster');
				}
			} else {
				if (pokemon.species.forme === 'Monster') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Chimaooze' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.level > 20 && pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.forme !== 'Monster') {
					pokemon.formeChange('Chimaooze-Monster');
				}
			} else {
				if (pokemon.species.forme === 'Monster') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		flags: {},
		name: "Dirty Pool",
		shortDesc: "If Chimaooze, switch-in/end of turn it changes to Monster at 1/2 max HP or less.",
		rating: 4,
		num: 0,
	},

	holyguard: {
		// Add "<Pokemon> senses the opponents strengths!" message on trigger
		onStart(pokemon) {
			let totalatk = 0;
			let totalspa = 0;
			for (const target of pokemon.foes()) {
				totalatk += target.getStat('atk', false, true);
				totalspa += target.getStat('spa', false, true);
			}
			if (totalatk && totalatk >= totalspa) {
				this.boost({def: 1});
			} else if (totalspa) {
				this.boost({spd: 1});
			}
		},
		flags: {},
		name: "Holy Guard",
		shortDesc: "On switch-in, Defense or Sp. Def is raised 1 stage based on the foes' stronger Attack.",
		rating: 4,
		num: 0,
	},
	mysticwind: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon' || move.type === 'Bug' || move.type === 'Dark' || move.type === 'Fighting') {
				this.debug('Mystic Wind weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Mystic Wind",
		shortDesc: "This Pokémon takes on the resistances of the Fairy type.",
		rating: 4,
		num: 0,
	},
	piggybank: {
		// Could maybe make it do the scatter coins effect, since it doubles earned money in-game
		flags: {},
		name: "Piggy Bank",
		shortDesc: "No competitive use.",
		rating: 0,
		num: 0,
	},
	raptor: { //Need to make it work for doubles, currently it just doesn't work (on purpose, to avoid a crash)
		onModifyPriority(priority, source, pokemon, move) {
			let target = source.getMoveTargets(move, pokemon).targets
			if (target.length > 1) {
				console.log("more than 1 target")
				return;
			}
			if (source && target[0].hp) {
				if (target[0].hp <= Math.floor(target[0].maxhp/4)) return priority + 1;
			}
		},
		flags: {},
		name: "Raptor",
		shortDesc: "+1 priority if target has 1/4 HP or less.",
		rating: 4.5,
		num: 0,
	},
	synthesizer: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Sound') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', source, '[from] ability: Synthesizer');
				}
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Synthesizer",
		shortDesc: "This Pokemon heals 1/4 of its max HP when hit by Sound moves; Sound immunity.",
		rating: 3.5,
		num: 0,
	},
	junglespirit: {
		onModifySTAB(stab, source, target, move) {
			if (move.forceSTAB || source.hasType(move.type)) {
				if (stab === 2) {
					return 2.25;
				}
				return 2;
			}
		},
		flags: {},
		name: "Jungle Spirit",
		shortDesc: "This Pokemon's same-type attack bonus (STAB) is 2 instead of 1.5.",
		rating: 4,
		num: 0,
	},
	voicetuning: {
		onModifySTAB(stab, source, target, move) {
			if (move.forceSTAB || source.hasType(move.type)) {
				if (stab === 2) {
					return 2.25;
				}
				return 2;
			}
		},
		flags: {},
		name: "Voice Tuning",
		shortDesc: "This Pokemon's same-type attack bonus (STAB) is 2 instead of 1.5.",
		rating: 4,
		num: 0,
	},
	dragonarmor: {
		onModifySTAB(stab, source, target, move) {
			if (move.forceSTAB || source.hasType(move.type)) {
				if (stab === 2) {
					return 2.25;
				}
				return 2;
			}
		},
		flags: {},
		name: "Dragon Armor",
		shortDesc: "This Pokemon's same-type attack bonus (STAB) is 2 instead of 1.5.",
		rating: 4,
		num: 0,
	},

	cloudburst: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Rapidash-X' || pokemon.transformed) return;
			if (pokemon.hp < pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Storm') {
					pokemon.formeChange('Rapidash-X-Storm');
				}
			} else {
				if (pokemon.species.forme === 'Storm') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Rapidash-X' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp < pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Storm') {
					pokemon.formeChange('Rapidash-X-Storm');
				}
			} else {
				if (pokemon.species.forme === 'Storm') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		flags: {},
		name: "Cloud Burst",
		shortDesc: "If Rapidash-X, switch-in/end of turn it changes to Storm at 1/2 max HP or less.",
		rating: 4,
		num: 0,
	},

	equalize: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Sound';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Equalize",
		shortDesc: "This Pokemon's Normal-type moves become Sound type and have 1.2x power.",
		rating: 4,
		num: 0,
	},
	scalate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Dragon';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Scalate",
		shortDesc: "This Pokemon's Normal-type moves become Dragon type and have 1.2x power.",
		rating: 4,
		num: 0,
	},
	titan: {
		onSwitchIn(source) {
			var type;
			switch (source.item) {
				case 'heatrock':
					type = 'Fire';
					break;
				case 'damprock':
					type = 'Water';
					break;
				case 'smoothrock':
					type = 'Electric';
					break;
				case 'icyrock':
					type = 'Ice';
					break;
				case 'kingsrock':
					type = 'Rock';
					break;
				default:
					type = false;
					break;
				}
				if (type) {
				this.add('-start', source, 'typeadd', type, '[from] ability: Titan');
				}
		},
		flags: {},
		name: "Titan",
		rating: 4,
		num: 0,
	},
	dreadspace: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Dread Space');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 2;
		},
		flags: {},
		name: "Dread Space",
		shortDesc: "If this Pokemon is the target of a foe's move, that move loses two additional PP.",
		rating: 4,
		num: 0,
	},
	solarprominence: {
		onSourceModifyDamage(damage, source, target, move) {
				this.debug('Solar Prominence weaken');
				return this.chainModify(0.7);
		},
		flags: {breakable: 1},
		name: "Solar Prominence",
		shortDesc: "This Pokemon takes x0.7 damage.",
		rating: 5,
		num: 0,
	},
	creamshield: {
		onSourceModifyDamage(damage, source, target, move) {
				this.debug('Cream Shield weaken');
				let targethpRatio = target.hp/target.maxhp;
				var dmgReduction =  (1 - 0.7*targethpRatio);
				return this.chainModify(dmgReduction);
		},
		flags: {breakable: 1},
		name: "Cream Shield",
		shortDesc: "This Pokemon takes reduced damage, the higher its health.",
		rating: 3.5,
		num: 0,
	},
	waterstream: { //TEST - not sure if source is source of move or you
		onSourceModifyDamage(damage, source, target, move) {
			if (target.speed > source.speed) {
				this.debug('Water Stream weaken');
				var dmgReduction = (source.speed/target.speed)
				if (dmgReduction > 1) dmgReduction = 1;
				if (dmgReduction < 0.3) dmgReduction = 0.3;
				return this.chainModify(dmgReduction);
			}
		},
		flags: {},
		name: "Water Stream",
		shortDesc: "This Pokemon takes 1/2 damage if faster than the opponent.",
		rating: 2.5,
		num: 0,
	},
	majesticaura: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Majestic Aura', move, '[of] ' + target);
				return false;
			}
		},
		flags: {breakable: 1},
		name: "Majestic Aura",
		shortDesc: "This Pokemon and its allies are protected from opposing priority moves.",
		rating: 2.5,
		num: 0,
	},
};
