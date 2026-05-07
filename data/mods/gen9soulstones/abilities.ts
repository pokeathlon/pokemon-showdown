export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	// Modded

	disguise: { //TEST
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && ['mimikyu', 'mimikyutotem', 'mimikyusoulstones', 'tmimikyu'].includes(target.species.id)) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem', 'mimikyusoulstones', 'tmimikyu'].includes(target.species.id)) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (!['mimikyu', 'mimikyutotem', 'mimikyusoulstones', 'tmimikyu'].includes(target.species.id)) {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem', 'mimikyusoulstones', 'tmimikyu'].includes(pokemon.species.id) && this.effectState.busted) {
				let speciesid = 'Mimikyu-Busted'
				if (pokemon.species.id === 'mimikyutotem') speciesid = 'Mimikyu-Busted-Totem'
				if (pokemon.species.id === 'mimikyusoulstones') speciesid = 'Mimikyu-Soulstones-Busted'
				if (pokemon.species.id === 'tmimikyu') speciesid = 'T.Mimikyu-Busted'
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
			}
		},
	},
	oblivious: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Oblivious', `[of] ${target}`);
			}
			if (effect.name === 'Dishearten' && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Sp. Atk', '[from] ability: Oblivious', `[of] ${target}`);
			}
		},
	},
	owntempo: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', `[of] ${target}`);
			}
			if (effect.name === 'Dishearten' && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Sp. Atk', '[from] ability: Oblivious', `[of] ${target}`);
			}
		},
	},
	rattled: {
		inherit: true,
		onAfterBoost(boost, target, source, effect) {
			if ((effect?.name === 'Intimidate' && boost.atk) || (effect?.name === 'Dishearten' && boost.spa)) {
				this.boost({ spe: 1 });
			}
		},
	},
	scrappy: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrappy', `[of] ${target}`);
			}
			if (effect.name === 'Dishearten' && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Sp. Atk', '[from] ability: Oblivious', `[of] ${target}`);
			}
		},
	},
	innerfocus: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', `[of] ${target}`);
			}
			if (effect.name === 'Dishearten' && boost.spa) {
				delete boost.spa;
				this.add('-fail', target, 'unboost', 'Sp. Atk', '[from] ability: Oblivious', `[of] ${target}`);
			}
		},
	},

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
	darkswarm: { // TEST
		onSwitchInPriority: -1,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Wishiwashi-Soulstones' || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashisoulstones') {
					pokemon.formeChange('Wishiwashi-Soulstones-Swarm');
				}
			} else {
				if (pokemon.species.id === 'wishiwashisoulstones') {
					pokemon.formeChange('Wishiwashi-Soulstones');
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Wishiwashi-Soulstones' || pokemon.level < 20 ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashisoulstones') {
					pokemon.formeChange('Wishiwashi-Soulstones-Swarm');
				}
			} else {
				if (pokemon.species.id === 'wishiwashisoulstonesswarm') {
					pokemon.formeChange('Wishiwashi-Soulstones');
				}
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Dark Swarm",
		rating: 3,
		num: 0,
		shortDesc: "If user is Wishiwashi-Soulstones, changes to Symphny Form if it has > 1/4 max HP.",
	},
	destructivecore: { //TEST (ask if it also has the status immunity that minior has)
		onSwitchInPriority: -1,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Togedemaru-Soulstones' || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Togedemaru-Soulstones-Reactive') {
					pokemon.formeChange('Togedemaru-Soulstones');
				}
			} else {
				if (pokemon.species.forme === 'Togedemaru-Soulstones-Reactive') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Togedemaru-Soulstones' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Togedemaru-Soulstones-Reactive') {
					pokemon.formeChange('Togedemaru-Soulstones');
				}
			} else {
				if (pokemon.species.forme === 'Togedemaru-Soulstones-Reactive') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Destructive Core",
		rating: 3,
		num: 0,
		shortDesc: "If Togedemaru-Soulstones, switch-in/end of turn it changes to Reactive at 1/2 max HP or less.",
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
					source.addVolatile('partiallytrapped', source, this.dex.getActiveMove('Infestation'));
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
			if (this.field.isWeather(['hail', 'snowscape'])) {
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
	nebulacloud: {
		onAllyTryBoost(boost, target, source, effect) {
			if ((source && target === source) || !target.hasType('Cosmic')) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Nebula Cloud', `[of] ${effectHolder}`);
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (target.hasType('Grass') && source && target !== source && effect && effect.id !== 'yawn') {
				this.debug('interrupting setStatus with Nebula Cloud');
				if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Nebula Cloud', `[of] ${effectHolder}`);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (target.hasType('Grass') && status.id === 'yawn') {
				this.debug('Nebula Cloud blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Nebula Cloud', `[of] ${effectHolder}`);
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Nebula Cloud",
		rating: 0,
		num: 0,
		shortDesc: "This side's Cosmic types can't have stats lowered or status inflicted by other Pokemon.",
	},
	nobility: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Nobility', move, `[of] ${target}`);
				return false;
			}
		},
		flags: { breakable: 1 },
		name: "Nobility",
		rating: 2.5,
		num: 214,
	},
	opaqueness: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Light') {
				this.add('-immune', target, '[from] ability: Water Absorb');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Opaqueness",
		rating: 3.5,
		num: 0,
		shortDesc: "Light immunity.",
	},
	hivemind: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Hivemind boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Hivemind boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Hivemind",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Bug-type attack.",
	},
	packedsnow: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0 && this.field.isWeather(['hail', 'snowscape'])) {
				this.debug('Packed Snow neutralize');
				return this.chainModify(0.5);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		flags: { breakable: 1 },
		name: "Packed Snow",
		rating: 3,
		num: 0,
		shortDesc: "This Pokemon receives 1/2 damage from supereffective attacks during snow or hail. Hail immunity.",
	},
	pounce: {
		onModifyPriority(priority, pokemon) {
			if (pokemon.activeMoveActions === 0) return priority + 1;
		},
		flags: {},
		name: "Pounce",
		shortDesc: "+1 priority on first turn out.",
		rating: 4.5,
		num: 0,
	},
	precision: {
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('precision - enhancing accuracy');
			return this.chainModify(1.3);
		},
		flags: {},
		name: "Precision",
		rating: 3,
		num: 0,
		shortDesc: "This Pokemon's moves have their accuracy multiplied by 1.3.",
	},
	pureheart: {
		onResidual(target, source, effect) {
			this.heal(target.baseMaxhp / 16);
		},
		flags: {},
		name: "Pure Heart",
		shortDesc: "Heals 1/16 HP every turn.",
		rating: 1.5,
		num: 0,
	},
	realism: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost' || move.type === 'Fairy') {
				this.debug('Realism weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ghost' || move.type === 'Fairy') {
				this.debug('Realism weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Realism",
		rating: 3.5,
		num: 0,
		shortDesc: "Ghost-/Fairy-type moves against this Pokemon deal damage with a halved offensive stat.",
	},
	reaper: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.heal(source.maxhp / 5, source, source)
			}
		},
		flags: {},
		name: "Reaper",
		rating: 3,
		num: 0,
		shortDesc: "This Pokemon is healed by 1/5 max HP if it attacks and KOes another Pokemon.",
	},
	regrowth: { //TEST
		onResidual(target, source, effect) {
			let negBoosts = false;
			let i: BoostID;
			for (i in target.boosts) {
				if (target.boosts[i] < 0) {
					this.boost({ [i]: 1 }, this.effectState.target);
					negBoosts = true;
				}
			}
			if (!negBoosts) this.heal(target.baseMaxhp / 16);
		},
		flags: {},
		name: "Regrowth",
		shortDesc: "Raises negative stat boosts on self by 1 stage. Otherwise, heals 1/16 HP every turn.",
		rating: 1.5,
		num: 0,
	},
	requiem: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Requiem boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dark') {
				this.debug('Requiem boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Requiem",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's offensive stat is multiplied by 1.5 while using a Dark-type attack.",
	},
	scorchscale: {
		onFoeTryMove(target, source, move) {
			if (move.priority > 0.1 && move.category != 'Status') {
				source.trySetStatus('brn', target);
			}
		},
		flags: { breakable: 1 },
		name: "Scorch Scale",
		rating: 2.5,
		num: 0,
		shortDesc: "Burns any foe that uses priority attacks on it."
	},
	sharpshooter: {
		onAccuracy(accuracy, target, source, move) {
			if (!move.flags.contact) {
				return true;
			}
			return accuracy;
		},
		flags: {},
		name: "Sharp Shooter",
		rating: 4,
		num: 0,
		shortDesc: "Non-contact moves used by this Pokemon will always hit.",
	},
	spellcaster: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Psychic' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Spellcaster boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Psychic' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Spellcaster boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Spellcaster",
		rating: 2,
		num: 0,
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Psychic attacks.",
	},
	starstruck: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Cosmic' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Starstruck boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Cosmic' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Starstruck boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Starstruck",
		rating: 2,
		num: 0,
		shortDesc: "At 1/3 or less of its max HP, this Pokemon's offensive stat is 1.5x with Cosmic attacks.",
	},
	symphony: { //TEST
		onSwitchInPriority: -1,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Unown-Soulstones' || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'unownsoulstones') {
					console.log("Transforming into Symphony onSTART")
					pokemon.formeChange('Unown-Soulstones-Symphony');
				}
			} else {
				if (pokemon.species.id === 'unownsoulstonessymphony') {
					console.log("Transforming into base onSTART")
					pokemon.formeChange('Unown-Soulstones');
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Unown-Soulstones' || pokemon.level < 20 ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'unownsoulstones') {
					console.log("Transforming into Symphony onRES")
					pokemon.formeChange('Unown-Soulstones-Symphony');
				}
			} else {
				if (pokemon.species.id === 'unownsoulstonessymphony') {
					console.log("Transforming into base onRES")
					pokemon.formeChange('Unown-Soulstones');
				}
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Symphony",
		rating: 3,
		num: 0,
		shortDesc: "If user is Unown-Soulstones, changes to Symphony Form if it has > 1/4 max HP.",
	},
	synthesize: {
		onResidual(target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.heal(target.baseMaxhp / 8);
			}
		},
		flags: {},
		name: "Synthesize",
		shortDesc: "Heals 1/8 HP every turn in sun.",
		rating: 1.5,
		num: 0,
	},
	tvface: { //TEST
		onSwitchInPriority: -2,
		onStart(pokemon) {
			if (this.field.isTerrain('electricterrain') && pokemon.species.id === 'eiscuesoulstonesnotv') {
				this.add('-activate', pokemon, 'ability: TV Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue-Soulstones', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && effect.category === 'Physical' && target.species.id === 'eiscuesoulstones') {
				this.add('-activate', target, 'ability: TV Face');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eiscuesoulstones') return;
			if (target.volatiles['substitute'] && !(move.flags['bypasssub'] || move.infiltrates)) return;
			if (!target.runImmunity(move)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eiscuesoulstones') return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'eiscuesoulstones' && this.effectState.busted) {
				pokemon.formeChange('Eiscue-Soulstones-Noice', this.effect, true);
			}
		},
		onTerrainChange(pokemon, source, sourceEffect) {
			// snow/hail resuming because Cloud Nine/Air Lock ended does not trigger Ice Face
			if ((sourceEffect as Ability)?.suppressWeather) return;
			if (!pokemon.hp) return;
			if (this.field.isTerrain('electricterrain') && pokemon.species.id === 'eiscuesoulstonesnotv') {
				this.add('-activate', pokemon, 'ability: TTVle Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue-Soulstones', this.effect, true);
			}
		},
		flags: {
			failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			breakable: 1, notransform: 1,
		},
		name: "TV Face",
		rating: 3,
		num: 0,
		shortDesc: "If Eiscue-Soulstones, the first physical hit it takes deals 0 damage. Effect is restored in Electric Terrain.",
	},
	terminator: {
		onDamage(damage, target, source, effect) {
			this.effectState.checkedTerminator = !(
				effect.effectType === "Move" && !effect.multihit &&
				!(effect.hasSheerForce && source.hasAbility('sheerforce'))
			);
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedTerminator;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedTerminator = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit && !move.smartTarget ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({ atk: 1 }, target, target);
			}
		},
		flags: {},
		name: "Terminator",
		rating: 2,
		num: 0,
		shortDesc: "This Pokemon's Atk is raised by 1 when it reaches 1/2 or less of its max HP.",
	},
	terrorize: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Terrorize weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug') {
				this.debug('Terrorize weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Psychic') {
				this.debug('Terrorize boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Psychic') {
				this.debug('Terrorize boost');
				return this.chainModify(2);
			}
		},
		flags: { breakable: 1 },
		name: "Terrorize",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's Psychic power is 2x; Bug power against it is halved.",
	},
	tormented: {
		// This should be applied directly to the stat as opposed to chaining with the others
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.modify(spa, 1.5);
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Special' && typeof accuracy === 'number') {
				return this.chainModify([3277, 4096]);
			}
		},
		flags: {},
		name: "Tormented",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon's Sp. Atk is 1.5x and accuracy of its special attacks is 0.8x.",
	},
	tropicalhide: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' || move.type === 'Water') {
				this.debug('Tropical Hide weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' || move.type === 'Water') {
				this.debug('Tropical Hide weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Tropical Hide",
		rating: 3.5,
		num: 0,
		shortDesc: "Grass-/Water-type moves against this Pokemon deal damage with a halved offensive stat.",
	},
	unbreakable: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.def && boost.def < 0) {
				delete boost.def;
				if (!(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
					this.add("-fail", target, "unboost", "Defense", "[from] ability:Unbreakable", `[of] ${target}`);
				}
			}
		},
		flags: { breakable: 1 },
		name: "Unbreakable",
		rating: 0.5,
		num: 0,
		shortDesc: "Prevents other Pokemon from lowering this Pokemon's Defense stat stage.",
	},
	vengeful: {
		onDamage(damage, target, source, effect) {
			this.effectState.checkedTerminator = !(
				effect.effectType === "Move" && !effect.multihit &&
				!(effect.hasSheerForce && source.hasAbility('sheerforce'))
			);
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedTerminator;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedTerminator = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit && !move.smartTarget ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({ atk: 1, spe: 1 }, target, target);
			}
		},
		flags: {},
		name: "Vengeful",
		rating: 2,
		num: 0,
		shortDesc: "This Pokemon's Atk and Speed is raised by 1 when it reaches 1/2 or less of its max HP.",
	},
	vitality: {
		onDamagingHit(damage, target, source, effect) {
			this.boost({ spd: 1 });
		},
		flags: {},
		name: "Vitality",
		rating: 4,
		num: 0,
		shortDesc: "This Pokemon's Sp. Def is raised by 1 stage after it is damaged by a move.",
	},
	whiteout: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Dark' && (!noModifyType.includes(move.id) || this.activeMove?.isMax) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Light';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.2);
		},
		flags: {},
		name: "Whiteout",
		rating: 4,
		num: 0,
		shortDesc: "This Pokemon's Dark-type moves become Light-type and have 1.2x power.",
	},
	windfury: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['wind']) {
				this.debug('Wind Fury boost');
				return this.chainModify(1.3);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['wind']) {
				this.debug('Wind Fury weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Wind Fury",
		rating: 3.5,
		num: 0,
		shortDesc: "This Pokemon receives 1/2 damage from wind moves. Its own have 1.3x power.",
	},
	wintergift: { //TEST
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim-Soulstones' || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (['hail', 'snowscape'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsoulstoneshailing') {
					pokemon.formeChange('Cherrim-Soulstones-Hailing', this.effect, false, '0', '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsoulstoneshailing') {
					pokemon.formeChange('Cherrim-Soulstones', this.effect, false, '0', '[msg]');
				}
			}
		},
		onAllyModifySpAPriority: 3,
		onAllyModifySpA(spa, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim-Soulstones') return;
			if (['hail', 'snowscape'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim-Soulstones') return;
			if (['hail', 'snowscape'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1 },
		name: "Winter Gift",
		rating: 1,
		num: 0,
		shortDesc: "If user is Cherrim-Soulstones-Soulstones and Hail or Snow is active, it and allies' Sp. Atk and Sp. Def are 1.5x.",
	},
};
