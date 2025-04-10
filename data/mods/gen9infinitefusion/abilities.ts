const {Dex} = require('../../../sim/dex');
export const ModAbilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	disguise: {
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
				this.effectState.fusionBusted = false;
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
	stancechange: {
		onBeforeSwitchIn() {
			this.effectState.forme = 'shield';
		},
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.transformed) return;
			if (attacker.species.baseSpecies === 'Aegislash' && !attacker.fusion) {
				if (move.category === 'Status' && move.id !== 'kingsshield') return;
				const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
				if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			} else if (attacker.fusion) {
				if (!this.effectState.forme) this.effectState.forme = 'shield';
				if (move.category === 'Status' && (!move.stallingMove || ['endure', 'allyswitch'].includes(move.id))) return;

				const targetForme = (move.category !== 'Status' ? 'blade' : 'shield');

				if (this.effectState.forme !== targetForme) {
					this.add('-activate', attacker, 'ability: Stance Change');
					this.add('-message', `${attacker.name} entered its ${targetForme} stance.`);

					const stats = attacker.storedStats;
					[stats.atk, stats.def, stats.spa, stats.spd] = [stats.def, stats.atk, stats.spd, stats.spa];
					attacker.storedStats = stats;

					this.effectState.forme = targetForme;
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Stance Change",
		rating: 4,
		num: 176,
	},
	hungerswitch: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.transformed || pokemon.terastallized) return;
			if (pokemon.species.baseSpecies === 'Morpeko') {
				const targetForme = pokemon.species.name === 'Morpeko' ? 'Morpeko-Hangry' : 'Morpeko';
				pokemon.formeChange(targetForme);
			} else if (pokemon.fusion?.includes('Morpeko')) {
				const targetForme = pokemon.fusion === 'Morpeko' ? 'Morpeko-Hangry' : 'Morpeko';
				pokemon.fusionChange(targetForme);
			}
		},
	},
	battlebond: {
		inherit: true,
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType !== 'Move') return;
			if (source.abilityState.battleBondTriggered) return;
			if ((source.species.id === 'greninjabond' || source.fusion === 'Greninja-Bond') && source.hp && !source.transformed && source.side.foePokemonLeft()) {
				this.boost({atk: 1, spa: 1, spe: 1}, source, source, this.effect);
				this.add('-activate', source, 'ability: Battle Bond');
				source.abilityState.battleBondTriggered = true;
			}
		},
	},
	flowergift: {
		inherit: true,
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || pokemon.transformed) return;
			if (!pokemon.hp) return;
			const fusionSpecies = this.dex.species.get(pokemon.fusion);
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine' && pokemon.baseSpecies.baseSpecies === 'Cherrim') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '[msg]');
				} else if (pokemon.fusion !== 'Cherrim-Sunshine' && fusionSpecies.baseSpecies === 'Cherrim') {
					pokemon.fusionChange('Cherrim-Sunshine', this.effect);
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine' && pokemon.baseSpecies.baseSpecies === 'Cherrim') {
					pokemon.formeChange('Cherrim', this.effect, false, '[msg]');
				} else if (pokemon.fusion === 'Cherrim-Sunshine' && fusionSpecies.baseSpecies === 'Cherrim') {
					pokemon.fusionChange('Cherrim', this.effect);
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim' && !this.effectState.target.fusion?.includes('Cherrim')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim' && !this.effectState.target.fusion?.includes('Cherrim')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
	},
	forecast: {
		inherit: true,
		onWeatherChange(pokemon) {
			if (pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'hail':
			case 'snowscape':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				if (pokemon.baseSpecies.baseSpecies === 'Castform') {
					pokemon.formeChange(forme, this.effect, false, '[msg]');
				} else if (pokemon.fusion?.includes('Castform')) {
					pokemon.fusionChange(forme, this.effect);
				}
			}
		},
	},
	iceface: {
		inherit: true,
		onStart(pokemon) {
			if (this.field.isWeather(['hail', 'snow']) && !pokemon.transformed) {
				if (pokemon.species.id === 'eiscuenoice') {
					this.add('-activate', pokemon, 'ability: Ice Face');
					this.effectState.busted = false;
					pokemon.formeChange('Eiscue', this.effect, true);
				} else if (pokemon.fusion === 'Eiscue-Noice') {
					this.effectState.busted = false;
					pokemon.fusionChange('Eiscue', this.effect);
				}
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' && effect.category === 'Physical' &&
				(target.species.id === 'eiscue' || this.dex.species.get(target.fusion).id === 'eiscue') && !target.transformed
			) {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || (target.species.id !== 'eiscue' && this.dex.species.get(target.fusion).id !== 'eiscue') || target.transformed) return;
			if (target.volatiles['substitute'] && !(move.flags['bypasssub'] || move.infiltrates)) return;
			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || (target.species.id !== 'eiscue' && this.dex.species.get(target.fusion).id !== 'eiscue') || target.transformed) return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (this.effectState.busted) {
				if (pokemon.species.id === 'eiscue') {
					pokemon.formeChange('Eiscue-Noice', this.effect, true);
				} else if (pokemon.fusion === 'Eiscue') {
					pokemon.fusionChange('Eiscue-Noice', this.effect);
				}
			}
		},
		onWeatherChange(pokemon, source, sourceEffect) {
			// snow/hail resuming because Cloud Nine/Air Lock ended does not trigger Ice Face
			if ((sourceEffect as Ability)?.suppressWeather) return;
			if (!pokemon.hp) return;
			if (this.field.isWeather(['hail', 'snow']) && !pokemon.transformed) {
				if (pokemon.species.id === 'eiscuenoice') {
					this.add('-activate', pokemon, 'ability: Ice Face');
					this.effectState.busted = false;
					pokemon.formeChange('Eiscue', this.effect, true);
				} else if (pokemon.fusion === 'Eiscue-Noice') {
					this.effectState.busted = false;
					pokemon.fusionChange('Eiscue', this.effect);
				}
			}
		},
	},
	powerconstruct: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Zygarde' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'zygardecomplete' || pokemon.fusion === 'Zygarde-Complete' || pokemon.hp > pokemon.maxhp / 2) return;

			if (pokemon.baseSpecies.baseSpecies === 'Zygarde') {
				this.add('-activate', pokemon, 'ability: Power Construct');
				pokemon.formeChange('Zygarde-Complete', this.effect, true);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			} else if (pokemon.fusion?.includes('Zygarde')) {
				this.add('-activate', pokemon, 'ability: Power Construct');
				pokemon.fusionChange('Zygarde-Complete', this.effect);
				pokemon.baseMaxhp = Math.floor(Math.floor(
					2 * pokemon.species.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100
				) * pokemon.level / 100 + 10);
				const newMaxHP = pokemon.volatiles['dynamax'] ? (2 * pokemon.baseMaxhp) : pokemon.baseMaxhp;
				pokemon.hp = newMaxHP - (pokemon.maxhp - pokemon.hp);
				pokemon.maxhp = newMaxHP;
				this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
			}
		},
	},
	schooling: {
		inherit: true,
		onStart(pokemon) {
			if ((pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' && !pokemon.fusion?.includes('Wishiwashi')) || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				} else if (pokemon.fusion === 'Wishiwashi') {
					pokemon.fusionChange('Wishiwashi-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				} else if (pokemon.fusion === 'Wishiwashi-School') {
					pokemon.fusionChange('Wishiwashi');
				}
			}
		},
		onResidual(pokemon) {
			if (
				(pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' && !pokemon.fusion?.includes('Wishiwashi')) ||
				pokemon.level < 20 || pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				} else if (pokemon.fusion === 'Wishiwashi') {
					pokemon.fusionChange('Wishiwashi-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				} else if (pokemon.fusion === 'Wishiwashi-School') {
					pokemon.fusionChange('Wishiwashi');
				}
			}
		},
	},
	shieldsdown: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.transformed) return;
			const fusionSpecies = this.dex.species.get(pokemon.fusion);
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor' && pokemon.baseSpecies.baseSpecies === 'Minior') {
					pokemon.formeChange('Minior-Meteor');
				} else if (fusionSpecies.forme !== 'Meteor' && fusionSpecies.baseSpecies === 'Minior') {
					pokemon.fusionChange('Minior-Meteor');
				}
			} else {
				if (pokemon.species.forme === 'Meteor' && pokemon.baseSpecies.baseSpecies === 'Minior') {
					pokemon.formeChange(pokemon.set.species);
				} else if (fusionSpecies.forme === 'Meteor' && fusionSpecies.baseSpecies === 'Minior') {
					pokemon.fusionChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.transformed || !pokemon.hp) return;
			const fusionSpecies = this.dex.species.get(pokemon.fusion);
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor' && pokemon.baseSpecies.baseSpecies === 'Minior') {
					pokemon.formeChange('Minior-Meteor');
				} else if (fusionSpecies.forme !== 'Meteor' && fusionSpecies.baseSpecies === 'Minior') {
					pokemon.fusionChange('Minior-Meteor');
				}
			} else {
				if (pokemon.species.forme === 'Meteor' && pokemon.baseSpecies.baseSpecies === 'Minior') {
					pokemon.formeChange(pokemon.set.species);
				} else if (fusionSpecies.forme === 'Meteor' && fusionSpecies.baseSpecies === 'Minior') {
					pokemon.fusionChange(pokemon.set.species);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if ((target.species.id !== 'miniormeteor' && !target.fusion?.includes('Minior-Meteor')) || target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Shields Down');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if ((target.species.id !== 'miniormeteor' && !target.fusion?.includes('Minior-Meteor')) || target.transformed) return;
			if (status.id !== 'yawn') return;
			this.add('-immune', target, '[from] ability: Shields Down');
			return null;
		},
	},
	zenmode: {
		inherit: true,
		onResidual(pokemon) {
			if ((pokemon.baseSpecies.baseSpecies !== 'Darmanitan' && !pokemon.fusion?.includes('Darmanitan')) || pokemon.transformed) {
				return;
			}
			const fusionForme = this.dex.species.get(pokemon.fusion).forme;
			if (pokemon.hp <= pokemon.maxhp / 2 && (!['Zen', 'Galar-Zen'].includes(pokemon.species.forme) || !['Zen', 'Galar-Zen'].includes(fusionForme))) {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && (['Zen', 'Galar-Zen'].includes(pokemon.species.forme) || ['Zen', 'Galar-Zen'].includes(fusionForme))) {
				pokemon.addVolatile('zenmode'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];

			const fusionSpecies = this.dex.species.get(pokemon.fusion);
			if (pokemon.species.baseSpecies === 'Darmanitan' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '[silent]');
			} else if (fusionSpecies.baseSpecies === 'Darmanitan' && fusionSpecies.battleOnly) {
				pokemon.fusionChange(fusionSpecies.battleOnly as string, this.effect);
			}
		},
		condition: {
			onStart(pokemon) {
				if (pokemon.baseSpecies.baseSpecies === 'Darmanitan') {
					if (!pokemon.species.name.includes('Galar')) {
						if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
					} else {
						if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
					}
				} else if (pokemon.fusion?.includes('Darmanitan')) {
					if (!pokemon.fusion.includes('Galar')) {
						if (pokemon.fusion !== 'Darmanitan-Zen') pokemon.fusionChange('Darmanitan-Zen');
					} else {
						if (pokemon.fusion !== 'Darmanitan-Galar-Zen') pokemon.fusionChange('Darmanitan-Galar-Zen');
					}
				}
			},
			onEnd(pokemon) {
				const fusionSpecies = this.dex.species.get(pokemon.fusion);
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				} else if (['Zen', 'Galar-Zen'].includes(fusionSpecies.forme)) {
					pokemon.fusionChange(fusionSpecies.battleOnly as string);
				}
			},
		},
	},
	zerotohero: {
		inherit: true,
		onSwitchOut(pokemon) {
			if (pokemon.transformed) return;
			const fusionSpecies = this.dex.species.get(pokemon.fusion);
			if (pokemon.species.forme !== 'Hero' && pokemon.baseSpecies.baseSpecies === 'Palafin') {
				pokemon.formeChange('Palafin-Hero', this.effect, true);
			} else if (fusionSpecies.forme !== 'Hero' && fusionSpecies.baseSpecies === 'Palafin') {
				pokemon.fusionChange('Palafin-Hero', this.effect);
			}
		},
		onStart(pokemon) {
			if (!this.effectState.switchingIn) return;
			this.effectState.switchingIn = false;
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin' || pokemon.transformed) return;
			if (!this.effectState.heroMessageDisplayed && pokemon.species.forme === 'Hero') {
				this.add('-activate', pokemon, 'ability: Zero to Hero');
				this.effectState.heroMessageDisplayed = true;
			}
		},
	},
	commander: {
		inherit: true,
		onUpdate(pokemon) {
			if (this.gameType !== 'doubles') return;
			const ally = pokemon.allies()[0];
			if (!ally || pokemon.transformed ||
				(pokemon.baseSpecies.baseSpecies !== 'Tatsugiri' && !pokemon.fusion?.includes('Tatsugiri')) ||
				(ally.baseSpecies.baseSpecies !== 'Dondozo') && !ally.fusion?.includes('Dondozo')) {
				// Handle any edge cases
				if (pokemon.getVolatile('commanding')) pokemon.removeVolatile('commanding');
				return;
			}

			if (!pokemon.getVolatile('commanding') && !ally.getVolatile('commanding')) {
				// If Dondozo already was commanded this fails
				if (ally.getVolatile('commanded') || pokemon.getVolatile('commanded')) return;
				// Cancel all actions this turn for pokemon if applicable
				this.queue.cancelAction(pokemon);
				// Add volatiles to both pokemon
				this.add('-activate', pokemon, 'ability: Commander', '[of] ' + ally);
				pokemon.addVolatile('commanding');
				ally.addVolatile('commanded', pokemon);
				// Continued in conditions.ts in the volatiles
			} else {
				if (!ally.fainted) return;
				pokemon.removeVolatile('commanding');
			}
		},
	},
	gulpmissile: {
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.transformed || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('cramorant', move);
			} else if (['cramorantgulping', 'cramorantgorging'].includes(this.dex.species.get(target.fusion).id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (this.dex.species.get(target.fusion).id === 'cramorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.fusionChange('cramorant', move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (
				effect && effect.id === 'surf' && source.hasAbility('gulpmissile') && !source.transformed
			) {
				const forme = source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				if (source.species.name === 'Cramorant') {
					source.formeChange(forme, effect);
				} else if (source.fusion === 'Cramorant') {
					source.fusionChange(forme, effect);
				}
			}
		},
		flags: {cantsuppress: 1, notransform: 1},
		name: "Gulp Missile",
		rating: 2.5,
		num: 241,
	},
	illusion: {
		inherit: true,
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.species.name + (pokemon.level === 100 ? '' : ', L' + pokemon.level) +
					(pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '') +
					(pokemon.set.fusion ? ', fusion: ' + pokemon.set.fusion : '') + (pokemon.set.altsprite ? ', alt: ' + pokemon.set.altsprite : '');
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
				if (this.ruleTable.has('illusionlevelmod')) {
					this.hint("Illusion Level Mod is active, so this Pok\u00e9mon's true level was hidden.", true);
				}
			}
		},
	},
	noguard: {
		inherit: true,
		onAnyInvulnerability(target, source, move) {
			if (move && !move.ohko && (!source.hasItem('mankeyspaw')) && (source === this.effectState.target || target === this.effectState.target)) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && !move.ohko && (!source.hasItem('mankeyspaw')) && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
	},
	poisonpuppeteer: {
		inherit: true,
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source.baseSpecies.name !== "Pecharunt" && source.fusion !== "Pecharunt") return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'psn' || status.id === 'tox') {
				target.addVolatile('confusion');
			}
		},
	},
};
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = Dex.deepClone(ModAbilities);
