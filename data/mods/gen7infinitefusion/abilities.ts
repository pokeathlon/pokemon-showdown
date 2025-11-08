import { Utils } from '../../../lib';
import { Abilities as Base } from '../../abilities';
import { Abilities as Parent} from '../gen9infinitefusion/abilities';

export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	...Utils.deepClone(Parent),
	disguise: {
		onSwitchOut(pokemon) {
			if (this.effectState.busted) {
				this.effectState.busted = false;
				this.effectState.fusionBusted = undefined;
				const speciesid = pokemon.species.id === 'mimikyubustedtotem' ? 'Mimikyu-Totem' : 'Mimikyu';
				pokemon.formeChange(speciesid, this.effect, true);
			}
			if (this.effectState.fusionBusted) {
				this.effectState.busted = false;
				this.effectState.fusionBusted = undefined;
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				if (
					['mimikyu', 'mimikyutotem'].includes(target.species.id) && !target.transformed
				) {
					this.add('-activate', target, 'ability: Disguise');
					this.effectState.busted = true;
					return 0;
				}
				if (!this.effectState.busted && this.effectState.fusionBusted === undefined) {
					this.add('-activate', target, 'ability: Disguise');
					this.effectState.fusionBusted = true;
					return 0;
				}
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) ||
				this.effectState.fusionBusted === false || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) ||
				this.effectState.fusionBusted === false || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id) && this.effectState.busted) {
				const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				if (this.dex.gen > 7) {
					this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
				}
			}
			if (this.effectState.fusionBusted !== undefined && this.effectState.fusionBusted) {
				if (this.dex.gen > 7) {
					this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, pokemon.species);
				}
			}
		},
		flags: {
			failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			breakable: 1, notransform: 1,
		},
		name: "Disguise",
		rating: 3.5,
		num: 209,
	},

	// Double Abilities
	mummy: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (target.ability === 'mummy') {
				const sourceAbility = source.getAbility();
				if (sourceAbility.flags['cantsuppress'] || sourceAbility.id === 'mummy') {
					return;
				}
				if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
					const oldAbility = source.setAbility('mummy', target);
					if (oldAbility) {
						this.add('-activate', target, 'ability: Mummy', this.dex.abilities.get(oldAbility).name, `[of] ${source}`);
					}
				}
			} else {
				const possibleAbilities = [source.ability, ...(source.m.innates || [])]
					.filter(val => !this.dex.abilities.get(val).flags['cantsuppress'] && val !== 'mummy');
				if (!possibleAbilities.length) return;
				if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
					const abil = this.sample(possibleAbilities);
					if (abil === source.ability) {
						const oldAbility = source.setAbility('mummy', target);
						if (oldAbility) {
							this.add('-activate', target, 'ability: Mummy', this.dex.abilities.get(oldAbility).name, `[of] ${source}`);
						}
					} else {
						source.removeVolatile('ability:' + abil);
						source.addVolatile('ability:mummy', source);
						if (abil) {
							this.add('-activate', target, 'ability: Mummy', this.dex.abilities.get(abil).name, `[of] ${source}`);
						}
					}
				}
			}
		},
	},
	neutralizinggas: {
		inherit: true,
		// Ability suppression implemented in sim/pokemon.ts:Pokemon#ignoringAbility
		onSwitchIn(pokemon) {
			this.add('-ability', pokemon, 'Neutralizing Gas');
			pokemon.abilityState.ending = false;
			// Remove setter's innates before the ability starts
			if (pokemon.m.innates) {
				for (const innate of pokemon.m.innates) {
					if (this.dex.abilities.get(innate).flags['cantsuppress'] || innate === 'neutralizinggas') continue;
					pokemon.removeVolatile('ability:' + innate);
				}
			}
			for (const target of this.getAllActive()) {
				if (target.illusion) {
					this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, pokemon, 'neutralizinggas');
				}
				if (target.volatiles['slowstart']) {
					delete target.volatiles['slowstart'];
					this.add('-end', target, 'Slow Start', '[silent]');
				}
				if (target.m.innates) {
					for (const innate of target.m.innates) {
						if (this.dex.abilities.get(innate).flags['cantsuppress']) continue;
						target.removeVolatile('ability:' + innate);
					}
				}
			}
		},
		onEnd(source) {
			this.add('-end', source, 'ability: Neutralizing Gas');

			// FIXME this happens before the pokemon switches out, should be the opposite order.
			// Not an easy fix since we cant use a supported event. Would need some kind of special event that
			// gathers events to run after the switch and then runs them when the ability is no longer accessible.
			// (If you're tackling this, do note extreme weathers have the same issue)

			// Mark this pokemon's ability as ending so Pokemon#ignoringAbility skips it
			if (source.abilityState.ending) return;
			source.abilityState.ending = true;
			const sortedActive = this.getAllActive();
			this.speedSort(sortedActive);
			for (const pokemon of sortedActive) {
				if (pokemon !== source) {
					// Will be suppressed by Pokemon#ignoringAbility if needed
					this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityState, pokemon);
					if (pokemon.m.innates) {
						for (const innate of pokemon.m.innates) {
							// permanent abilities
							if (pokemon.volatiles['ability:' + innate]) continue;
							pokemon.addVolatile('ability:' + innate, pokemon);
						}
					}
				}
			}
		},
	},
	powerofalchemy: {
		inherit: true,
		onAllyFaint(ally) {
			const pokemon = this.effectState.target;
			if (!pokemon.hp) return;
			const isAbility = pokemon.ability === 'powerofalchemy';
			let possibleAbilities = [ally.ability];
			if (ally.m.innates) possibleAbilities.push(...ally.m.innates);
			const additionalBannedAbilities = [pokemon.ability, ...(pokemon.m.innates || [])];
			possibleAbilities = possibleAbilities
				.filter(val => !this.dex.abilities.get(val).flags['noreceiver'] && !additionalBannedAbilities.includes(val));
			if (!possibleAbilities.length) return;
			const ability = this.dex.abilities.get(possibleAbilities[this.random(possibleAbilities.length)]);
			this.add('-ability', pokemon, ability, '[from] ability: Power of Alchemy', `[of] ${ally}`);
			if (isAbility) {
				pokemon.setAbility(ability);
			} else {
				pokemon.removeVolatile("ability:powerofalchemy");
				pokemon.addVolatile(`ability:${ability}`, pokemon);
			}
		},
	},
	receiver: {
		inherit: true,
		onAllyFaint(ally) {
			const pokemon = this.effectState.target;
			if (!pokemon.hp) return;
			const isAbility = pokemon.ability === 'receiver';
			let possibleAbilities = [ally.ability];
			if (ally.m.innates) possibleAbilities.push(...ally.m.innates);
			const additionalBannedAbilities = [pokemon.ability, ...(pokemon.m.innates || [])];
			possibleAbilities = possibleAbilities
				.filter(val => !this.dex.abilities.get(val).flags['noreceiver'] && !additionalBannedAbilities.includes(val));
			if (!possibleAbilities.length) return;
			const ability = this.dex.abilities.get(possibleAbilities[this.random(possibleAbilities.length)]);
			this.add('-ability', pokemon, ability, '[from] ability: Receiver', `[of] ${ally}`);
			if (isAbility) {
				pokemon.setAbility(ability);
			} else {
				pokemon.removeVolatile("ability:receiver");
				pokemon.addVolatile(`ability:${ability}`, pokemon);
			}
		},
	},
	trace: {
		inherit: true,
		onUpdate(pokemon) {
			if (!this.effectState.seek) return;
			const isAbility = pokemon.ability === 'trace';
			const possibleTargets: Pokemon[] = [];
			for (const target of pokemon.side.foe.active) {
				if (target && !target.fainted) {
					possibleTargets.push(target);
				}
			}
			while (possibleTargets.length) {
				const rand = this.random(possibleTargets.length);
				const target = possibleTargets[rand];
				let possibleAbilities = [target.ability];
				if (target.m.innates) possibleAbilities.push(...target.m.innates);
				const additionalBannedAbilities = [pokemon.ability, ...(pokemon.m.innates || [])];
				possibleAbilities = possibleAbilities
					.filter(val => !this.dex.abilities.get(val).flags['notrace'] && !additionalBannedAbilities.includes(val));
				if (!possibleAbilities.length) {
					possibleTargets.splice(rand, 1);
					continue;
				}
				const ability = this.dex.abilities.get(this.sample(possibleAbilities));
				this.add('-ability', pokemon, ability, '[from] ability: Trace', `[of] ${target}`);
				if (isAbility) {
					pokemon.setAbility(ability);
				} else {
					pokemon.removeVolatile("ability:trace");
					pokemon.addVolatile(`ability:${ability}`, pokemon);
				}
				return;
			}
		},
	},
	wanderingspirit: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			const isAbility = target.ability === 'wanderingspirit';
			if (isAbility) {
				if (source.getAbility().flags['failskillswap'] || target.volatiles['dynamax']) return;

				if (this.checkMoveMakesContact(move, source, target)) {
					const sourceAbility = source.setAbility('wanderingspirit', target);
					if (!sourceAbility) return;
					if (target.isAlly(source)) {
						this.add('-activate', target, 'Skill Swap', '', '', `[of] ${source}`);
					} else {
						this.add('-activate', target, 'ability: Wandering Spirit', this.dex.abilities.get(sourceAbility).name, 'Wandering Spirit', `[of] ${source}`);
					}
					target.setAbility(sourceAbility);
				}
			} else {
				// Make Wandering Spirit replace a random ability
				const possibleAbilities = [source.ability, ...(source.m.innates || [])]
					.filter(val => !this.dex.abilities.get(val).flags['failskillswap']);
				if (!possibleAbilities.length || target.volatiles['dynamax']) return;
				if (move.flags['contact']) {
					const sourceAbility = this.sample(possibleAbilities);
					if (sourceAbility === source.ability) {
						if (!source.setAbility('wanderingspirit', target)) return;
					} else {
						source.removeVolatile('ability:' + sourceAbility);
						source.addVolatile('ability:wanderingspirit', source);
					}
					if (target.isAlly(source)) {
						this.add('-activate', target, 'Skill Swap', '', '', `[of] ${source}`);
					} else {
						this.add('-activate', target, 'ability: Wandering Spirit', this.dex.abilities.get(sourceAbility).name, 'Wandering Spirit', `[of] ${source}`);
					}
					if (sourceAbility === source.ability) {
						target.setAbility(sourceAbility);
					} else {
						target.removeVolatile('ability:wanderingspirit');
						target.addVolatile('ability:' + sourceAbility, target);
					}
				}
			}
		},
	},
};
