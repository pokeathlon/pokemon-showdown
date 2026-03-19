export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	// Modded
	stickyhold: {
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || ['knockoff', 'dinokick'].includes(this.activeMove.id)) {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
		flags: { breakable: 1 },
		name: "Sticky Hold",
		rating: 1.5,
		num: 60,
	},
	snowwarning: {
		inherit: true,
		onStart(source) {
			this.field.setWeather('snowscape');
		},
	},

	// Additions
	purefocus: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		flags: {},
		name: "Pure Focus",
		shortDesc: "Doubles the user's Special Attack stat.",
		rating: 5,
		num: 0,
	},
	nightmareheart: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Dark') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Nightmare Heart');
				}
				return null;
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fairy') {
				return this.chainModify(1.25);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'hail' || effect.id === 'snow') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: { breakable: 1 },
		name: "Nightmare Heart",
		shortDesc: "This Pokemon is healed 1/4 by Dark, 1/8 by Snow; is hurt 1.25x by Fairy, 1/8 by Sun.",
		rating: 5,
		num: 0,
	},
	wokhei: {
		onFoeAfterSetStatus(status, target, source, effect) {
			if (effect.effectType != 'Move') return;
			if (target && source === target) return;
			if (status.id === 'brn') this.boost({atk: 2}, source, source, null, false, true);
		},
		flags: {},
		name: "Wok Hei",
		shortDesc: "+2 Atk. when burning a foe.",
		rating: 5,
		num: 0,
	},
	crystalline: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground' || move.type === 'Water') {
				this.debug('Crystalline weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground' || move.type === 'Water') {
				this.debug('Crystalline weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Crystalline",
		shortDesc: "Ground-/Water-type moves against this Pokemon deal damage with a halved offensive stat.",
		rating: 3.5,
		num: 47,
	},
	migraine: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move.category === "Status") return;
			return -7;
		},
		onModifyCritRatio(critRatio, source, target) {
			return 5;
		},
		flags: {},
		name: "Migraine",
		shortDesc: "-7 prio on attacks; 100% crit chance.",
		rating: 5,
		num: 0,
	},
	supercharged: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Electric'] = true;
			}
		},
		onModifyDamage(damage, source, target, move) { //simulates resistance
			if (move && target.hasType('Ground') && move.type === 'Electric') {
				return this.chainModify(0.5);
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Special') target.addVolatile('charge');
		},
		flags: { breakable: 1 },
		name: "Supercharged",
		shortDesc: "Electric-type moves hit Ground for resisted; Charges when hit by special move.",
		rating: 5,
		num: 0,
	},
	restlessspirit: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Restless Spirit');
		},
		onSetStatus(status, target, source, effect) {
			if (status.id === 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Restless Spirit');
			}
			return false;
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (pokemon.status && pokemon.status === 'slp') pokemon.faint()
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Restless Spirit",
		shortDesc: "Immune to status bar sleep; if asleep at end of turn, faints.",
		rating: 5,
		num: 0,
	},
	illusionist: {
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			// yes, you can Illusion an active pokemon but only if it's to your right
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				if (!possibleTarget.fainted) {
					// If Ogerpon is in the last slot while the Illusion Pokemon is Terastallized
					// Illusion will not disguise as anything
					if (!pokemon.terastallized || !['Ogerpon', 'Terapagos'].includes(possibleTarget.species.baseSpecies)) {
						pokemon.illusion = possibleTarget;
					}
					break;
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, source, move);
			}
		},
		onBeforeMove(source, target, move) {
			if (source.illusion && move.category != 'Status') {
				this.singleEvent('End', this.dex.abilities.get('Illusion'), source.abilityState, source, source, move);
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.getUpdatedDetails();
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
				if (this.ruleTable.has('illusionlevelmod')) {
					this.hint("Illusion Level Mod is active, so this Pok\u00e9mon's true level was hidden.", true);
				}
			}
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy, target) {
			if (typeof accuracy !== 'number') return;
			if (target.illusion) {
				this.debug('Illusionist - decreasing accuracy');
				return this.chainModify(0.8);
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
		name: "Illusionist",
		shortDesc: "Illusion. While illusion, x1.25 evasion. Loses illusion when attacking.",
		rating: 5,
		num: 0,
	},
	glitchout: { // implemented in scripts/actions/hitstepaccuracy
		flags: {},
		name: "Glitch Out",
		shortDesc: "If user misses a move, will select random move from list.",
		desc:"After the user misses a move, a move will be randomly selected from: Swords Dance, Mind Reader, Vanish, Iron Defense, Nasty Plot, Amnesia, Agility, Whirlwind, Stealth Rock, Spikes, Toxic Spikes, Sticky Web, Reflect, Lightscreen, and used.",
		rating: 5,
		num: 0,
	},
	grandentrance: {
		onStart(target) {
            const stat = target.getBestStat(true, true);
            this.boost({[stat]: 1}, target);
		},
		flags: {},
		name: "Grand Entrance",
		shortDesc: "+1 to highest stat on switch-in.",
		rating: 5,
		num: 0,
	},
	simplyevil: {
		onAnyTryBoost(boost, target, source, effect) {
			if (!target.hasType('Poison')) return;
			if (effect && effect.id === 'zpower') return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= 2;
			}
		},
		flags: {},
		name: "Simply Evil",
		shortDesc: "x2 to stat changes for all Poison-type pokemon.",
		rating: 5,
		num: 0,
	},
};
