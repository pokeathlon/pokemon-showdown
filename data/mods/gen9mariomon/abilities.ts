const {Dex} = require('../../../sim/dex');
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	// Modded
	disguise: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && target.species.id === 'uproot') {
				this.add('-activate', target, 'ability: Disguise');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (target.species.id !== 'uproot') {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (target.species.id !== 'uproot') {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'uproot' && this.effectState.busted) {
				const speciesid = 'Uproot-Naked';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
			}
		},
	},
	forecast: {
		inherit: true,
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Hammer Bro' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'hammerbrosunny') forme = 'Hammer Bro-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'hammerbrorainy') forme = 'Hammer Bro-Rainy';
				break;
			case 'hail':
			case 'snow':
				if (pokemon.species.id !== 'hammerbrosnowy') forme = 'Hammer Bro-Snowy';
				break;
			default:
				if (pokemon.species.id !== 'hammerbro') forme = 'Hammer Bro';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '0', '[msg]');
			}
		},
	},
	schooling: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Fuzzy' || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'fuzzy') {
					pokemon.formeChange('Fuzzy-Swarm');
				}
			} else {
				if (pokemon.species.id === 'fuzzyswarm') {
					pokemon.formeChange('Fuzzy');
				}
			}
		},
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Fuzzy' || pokemon.level < 20 ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'fuzzy') {
					pokemon.formeChange('Fuzzy-Swarm');
				}
			} else {
				if (pokemon.species.id === 'fuzzyswarm') {
					pokemon.formeChange('Fuzzy');
				}
			}
		},
	},
	defeatist: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				if (pokemon.species.id === 'rex') pokemon.formeChange('Rex-Squished', this.effect, true);
			} else {
				if (pokemon.species.id === 'rexsquished') pokemon.formeChange('Rex', this.effect, true);
			}
		},
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(0.5);
			}
		},
		onModifySpA(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(0.5);
			}
		},
	},
	angerpoint: {
		inherit: true,
		onHit(target, source, move) {
			if (!target.hp) return;
			if (move?.effectType === 'Move' && target.getMoveHitData(move).crit) {
				if (target.species.id === 'wiggler') target.formeChange('Wiggler-Angry');
				this.boost({atk: 12}, target, target);
			}
		},
	},

	// Additions
	transmutate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Psychic';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Transmutate",
		desc: "This Pokemon's Normal-type moves become Psychic-type moves and have their power multiplied by 1.2. This effect comes after other effects that change a move's type.",
		shortDesc: "This Pokemon's Normal-type moves become Psychic type and have 1.2x power.",
		rating: 4,
		num: 0,
	},
	chaosemeralds: {
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (target.species.id === 'sonic' && damage >= target.hp && effect && effect.effectType === 'Move') {
				return target.hp - 1;
			}
		},
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (!['sonic', 'supersonic'].includes(pokemon.species.id) || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'supersonic' || pokemon.hp !== 1) return;
			this.add('-activate', pokemon, 'ability: Chaos Emeralds');
			pokemon.formeChange('Super Sonic', this.effect, true);
			this.heal(pokemon.baseMaxhp);
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Chaos Emeralds",
		shortDesc: "When Sonic reaches 1 HP, fully heal and transform into Super Sonic.",
		rating: 5,
		num: 0,
	},
};
