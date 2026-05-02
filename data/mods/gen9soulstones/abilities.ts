export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	// Modded

	// Additions
	affection: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fairy') {
				this.debug('Affection boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fairy') {
				this.debug('Affection boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Affection",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Fairy-type attack.",
	},
	antigravity: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Sound'] = true;
				move.ignoreImmunity['Ground'] = true;
			}
		},
		flags: {},
		name: "Anti-Gravity",
		rating: 3,
		num: 0,
		shortDesc: "Sound, Ground moves hit Cosmic.",
	},
	arsonist: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Arsonist boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Arsonist boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Arsonist",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Fire-type attack.",
	},
	astralmajesty: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Light' || move.type === 'Dragon') {
				this.debug('Astral Majesty weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Light' || move.type === 'Dragon') {
				this.debug('Astral Majesty weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Astral Majesty",
		rating: 3.5,
		num: 0,
		shortDesc: "Light-/Dragon-type moves against this Pokemon deal damage with a halved offensive stat.",
	},
	attunement: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Attunement",
		rating: 3.5,
		num: 0,
		shortDesc: "If this Pokemon is statused, its Sp. Atk is 1.5x.",
	},
	blacklight: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Light' && (!noModifyType.includes(move.id) || this.activeMove?.isMax) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Dark';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.2);
		},
		flags: {},
		name: "Black Light",
		rating: 4,
		num: 0,
		shortDesc: "This Pokemon's Light-type moves become Dark-type and have 1.2x power.",
	},
	bonecollector: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				this.debug('Bone Collector boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ground') {
				this.debug('Bone Collector boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Bone Collector",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Ground-type attack.",
	},
	cacophony: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Sound') {
				if (!this.boost({ spa: 1 })) {
					this.add('-immune', target, '[from] ability: Cacophony');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Sound' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Cacophony');
				}
				return this.effectState.target;
			}
		},
		flags: { breakable: 1 },
		name: "Cacophony",
		rating: 3,
		num: 0,
		shortDesc: "This Pokemon draws Sound-type moves to itself to raise Sp. Atk by 1; Sound-type immunity.",
	},
	virtuoso: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Sound') {
				this.debug('Virtuoso boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Sound') {
				this.debug('Virtuoso boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Virtuoso",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Sound-type attack.",
	},
	cannonfire: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				return this.chainModify(1.5);
			}
		},
		flags: { breakable: 1 },
		name: "Cannon Fire",
		desc: "This Pokemon's bomb-based attacks have their power multiplied by 1.5.",
		shortDesc: "This Pokemon's bomb-based attacks have 1.5x power.",
		rating: 3,
		num: 0,
	},
	charisma: {
		onSourceAfterFaint(length, target, source, effect) {
			if (this.effectState.charisma) return;
			if (effect && effect.effectType === 'Move') {
				this.effectState.charisma = true;
				this.boost({ spa: 1 }, source);
			}
		},
		flags: {},
		name: "Charisma",
		rating: 3,
		num: 0,
		shortDesc: "This Pokemon's Sp. Atk is raised by 1 stage if it attacks and KOes another Pokemon. Once per switch-in.",
	},
	clayform: {
		onWeather(target, source, effect) {
			if (target.effectiveWeather() !== effect.id) return;
			if (effect.id === 'sandstorm') {
				this.heal(target.baseMaxhp / 8);
			}
		},
		flags: {},
		name: "Clay Form",
		rating: 1.5,
		num: 0,
		shortDesc: "If Sandstorm is active, this Pokemon heals 1/8 of its max HP each turn.",
	},
	cometstorm: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Rock') {
				if (!this.boost({ spa: 1, spe: 1 })) {
					this.add('-immune', target, '[from] ability: Comet Storm');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Comet Storm",
		rating: 3,
		num: 0,
		shortDesc: "When hit by a Rock-type move, +1 Speed and Sp. Atk. Rock-type immunity.",
	},
	conductor: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Electric'] = true;
			}
			move.onEffectiveness = function (typeMod, t, type, m) { //I sure hope this works!
				if (type === 'Electric') return 1;
			};
		},
		flags: { breakable: 1 },
		name: "Conductor",
		shortDesc: "Electric-type moves hit Ground. Electric-type attacks are neutral on Ground and Electric-types.",
		rating: 5,
		num: 0,
	},
	darkmatter: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && (!noModifyType.includes(move.id) || this.activeMove?.isMax) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Cosmic';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.2);
		},
		flags: {},
		name: "Dark Matter",
		rating: 4,
		num: 0,
		shortDesc: "This Pokemon's Normal-type moves become Cosmic-type and have 1.2x power.",
	},
	darkswarm: { // TODO ACTUAL IMPLEMENTATION WITH RELEVANT MON
		onSwitchInPriority: -1,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Dark Swarm",
		rating: 3,
		num: 0,
	},
	destructivecore: { //TODO ACTUAL IMPLEMENTATION WITH TOGEDEMARU
		onSwitchInPriority: -1,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minior' || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				}
			} else {
				if (pokemon.species.forme === 'Meteor') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minior' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				}
			} else {
				if (pokemon.species.forme === 'Meteor') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if (target.species.id !== 'miniormeteor' || target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Shields Down');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (target.species.id !== 'miniormeteor' || target.transformed) return;
			if (status.id !== 'yawn') return;
			this.add('-immune', target, '[from] ability: Shields Down');
			return null;
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Destructive Core",
		rating: 3,
		num: 0,
	},
	disarray: {
		onStart(pokemon) {
			this.field.addPseudoWeather('trickroom');
		},
		flags: {},
		name: "Disarray",
		shortDesc: "This Pokemon summons Trick Room on switch-in.",
		rating: 4.5,
		num: 0,
	},
	dishearten: { //TODO - same abilities that are immune to intim drop are also immune to this.
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Dishearten', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ spa: -1 }, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Dishearten",
		rating: 3.5,
		num: 0,
	},
	ethereal: { //TEST
		onTryHit(target, source, move) {
			if (!move.flags.contact) return;
			if (target.abilityState.etherealLost) return;
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Ethereal');
				}
				target.abilityState.etherealLost = true;
				return null;
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, failskillswap: 1, breakable: 1 },
		name: "Ethereal",
		rating: 5,
		num: 0,
		shortDesc: "User is immune to one contact move per battle."
	},
	fortification: {
		onDamage(damage, target, source, effect) {
			this.effectState.checkFortification = !(
				effect.effectType === "Move" && !effect.multihit &&
				!(effect.hasSheerForce && source.hasAbility('sheerforce'))
			);
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkFortification;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkFortification = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit && !move.smartTarget ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({ def: 1, spd: 1 }, target, target);
			}
		},
		flags: {},
		name: "Fortification",
		rating: 2,
		num: 0,
		shortDesc: "This Pokemon's Sp. Atk is raised by 1 when it reaches 1/2 or less of its max HP.",
	},
	genius: {
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(2);
		},
		flags: {},
		name: "Genius",
		shortDesc: "Doubles the user's Special Attack stat.",
		rating: 5,
		num: 0,
	},
	haunted: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Haunted boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Haunted boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Haunted",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Ghost-type attack.",
	},
	hivebody: { //TEST
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('infestation');
				}
			}
		},
		flags: {},
		name: "Hive Body",
		rating: 2.5,
		num: 0,
		shortDesc: "30% to inflict Infestation when hit by a contact move.",
	},
	icyveins: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather(['hail', 'snow'])) {
				if (move.type === 'Water' || move.type === 'Ice') {
					this.debug('Ivy Veins boost');
					return this.chainModify(1.3);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		flags: {},
		name: "Ivy Veins",
		rating: 2,
		num: 0,
		shortDesc: "This Pokemon's Water/Ice attacks do 1.3x in Hail or Snow; Hail immunity.",
	},
	impenetrable: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.def && boost.def < 0) {
				delete boost.def;
				if (!(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
					this.add("-fail", target, "unboost", "Defense", "[from] ability: Impenetrable", `[of] ${target}`);
				}
			}
			if (boost.spd && boost.spd < 0) {
				delete boost.spd;
				if (!(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
					this.add("-fail", target, "unboost", "Sp. Def", "[from] ability: Impenetrable", `[of] ${target}`);
				}
			}
		},
		flags: { breakable: 1 },
		name: "Impenetrable",
		rating: 0.5,
		num: 0,
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's Def and Sp. Def stat stage.",
	},
	intuition: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.spa && boost.spa < 0) {
				delete boost.spa;
				if (!(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
					this.add("-fail", target, "unboost", "Sp. Atk", "[from] ability: Intuition", `[of] ${target}`);
				}
			}
		},
		flags: { breakable: 1 },
		name: "Intuition",
		rating: 0.5,
		num: 0,
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's  Sp. Atk stat stage.",
	},
	irradiate: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Light' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Irradiate boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Light' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Irradiate boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Irradiate",
		rating: 2,
		num: 0,
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Light attacks.",
	},
	irredeemable: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Light' || move.type === 'Fairy') {
				this.debug('Irredeemable weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Light' || move.type === 'Fairy') {
				this.debug('Irredeemable weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Irredeemable",
		rating: 3.5,
		num: 0,
		shortDesc: "Light-/Fairy-type moves against this Pokemon deal damage with a halved offensive stat.",
	},
	leadership: {
		onModifyPriority(priority, pokemon) {
			if (pokemon.activeMoveActions === 0) return priority + 1;
		},
		flags: {},
		name: "Leadership",
		shortDesc: "+1 priority on first turn out.",
		rating: 4.5,
		num: 0,
	},
	leechingfangs: {
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (this.checkMoveMakesContact(move, pokemon, target, false) && move.flags.bite) {
				this.heal(pokemon.maxhp / 8, pokemon, pokemon);
			}
		},
		flags: {},
		name: "Leeching Fangs",
		shortDesc: "After making contact with a biting move, holder gains 1/8 of the max HP.",
		rating: 3.5,
		num: 0,
	},
	lightaura: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Light Aura');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Light') return;
			if (!move.auraBooster?.hasAbility('Light Aura')) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([move.hasAuraBreak ? 3072 : 5448, 4096]);
		},
		flags: {},
		name: "Light Aura",
		rating: 3,
		num: 0,
		shortDesc: "While this Pokemon is active, a Light move used by any Pokemon has 1.33x power.",
	},
	lightbulb: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Light Bulb weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Light Bulb weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Light') {
				this.debug('Light Bulb boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Light') {
				this.debug('Light Bulb boost');
				return this.chainModify(2);
			}
		},
		flags: { breakable: 1 },
		name: "Light Bulb",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's Light power is 2x; Fire power against it is halved.",
	},
	maelstrom: { // TEST
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.isAdjacent(this.effectState.target)) return;
			if (pokemon.isGrounded()) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (pokemon.isGrounded(!pokemon.knownType)) { // Negate immunity if the type is unknown
				pokemon.maybeTrapped = true;
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('whirlpool');
				}
			}
		},
		flags: {},
		name: "Maelstrom",
		rating: 5,
		num: 0,
		shortDesc: "Prevents grounded foes from switching out. 30% to Whirlpool when hit by a contact move.",
	},
	maestro: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Sound' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Maestro boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Sound' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Maestro boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Maestro",
		rating: 2,
		num: 0,
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Sound attacks.",
	},
};
