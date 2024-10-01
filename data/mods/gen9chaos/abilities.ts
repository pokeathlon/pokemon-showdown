export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	// Uranium
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

	// Insurgence
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
	baddreams: {
		inherit: true,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					this.damage(target.baseMaxhp / (target.effectiveWeather() === 'newmoon' ? 4 : 8), target, pokemon);
				}
			}
		},
	},
	pressure: {
		inherit: true,
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return target.effectiveWeather() === 'newmoon' ? 2 : 1;
		},
	},
	illuminate: {
		inherit: true,
		onTryBoost(boost, target, source, effect) {},
		onModifyMove(move) {},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('newmoon')) {
				this.debug('Illuminate - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
	},
	fairyaura: {
		inherit: true,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Fairy') return;
			if (!move.auraBooster?.hasAbility('Fairy Aura')) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([source.effectiveWeather() === 'newmoon' ? 4096 : (move.hasAuraBreak ? 3072 : 5448), 4096]);
		},
	},
	darkaura: {
		inherit: true,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Dark') return;
			if (!move.auraBooster?.hasAbility('Dark Aura')) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([source.effectiveWeather() === 'newmoon' ? 6827 : (move.hasAuraBreak ? 3072 : 5448), 4096]);
		},
	},
	trace: {
		inherit: true,
		onStart(pokemon) {
			// n.b. only affects Hackmons
			// interaction with No Ability is complicated: https://www.smogon.com/forums/threads/pokemon-sun-moon-battle-mechanics-research.3586701/page-76#post-7790209
			if (pokemon.adjacentFoes().some(foeActive => foeActive.ability === 'noability')) {
				this.effectState.gaveUp = true;
			}
			// interaction with Ability Shield is similar to No Ability
			if (pokemon.hasItem('Ability Shield')) {
				if (!pokemon.illusion) this.add('-block', pokemon, 'item: Ability Shield');
				this.effectState.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp) return;

			const possibleTargets = pokemon.adjacentFoes().filter(
				target => !target.getAbility().flags['notrace'] && target.ability !== 'noability'
			);
			if (!possibleTargets.length) return;

			const target = this.sample(possibleTargets);
			const ability = target.getAbility();
			if (pokemon.setAbility(ability) && !pokemon.illusion) {
				this.add('-ability', pokemon, ability, '[from] ability: Trace', '[of] ' + target);
			}
		},
	},
	supercell: {
		inherit: true,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Typhlosion-Delta' || pokemon.transformed || !pokemon.isActive) return;
			if (['newmoon', 'raindance', 'primordialsea', 'thunderstorm'].includes(pokemon.effectiveWeather()) && pokemon.species.id !== 'typhlosiondeltamegaactive') {
				pokemon.formeChange('typhlosiondeltamegaactive', this.effect, false, '[msg]');
			} else if (pokemon.species.id === 'typhlosiondeltamegaactive') {
				pokemon.formeChange('typhlosiondeltamega', this.effect, false, '[msg]');
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['newmoon', 'raindance', 'primordialsea', 'thunderstorm'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
	},
	lernean: {
		inherit: true,
		onUpdate(pokemon) {
			if ( !['hydreigonmega', 'hydroupa'].includes(pokemon.species.id) || !pokemon.hp || pokemon.transformed) return;
			
			const formeOrder = pokemon.species.id.startsWith('hydreigonmega') ? 
			['hydreigonmeganine', 'hydreigonmegaeight', 'hydreigonmegaseven', 'hydreigonmegasix', 'hydreigonmega'] : ['hydroupanine', 'hydroupaeight', 'hydroupaseven', 'hydroupasix', 'hydroupa'];
			
			const targetForme = Math.ceil((pokemon.hp/pokemon.maxhp) * 5) - 1;
			if (formeOrder.indexOf(pokemon.species.id) > targetForme) {
				pokemon.formeChange(formeOrder[targetForme], this.effect, true);
			}
		},
		onModifyMove(move, pokemon, target) {
			if ( !['hydreigonmega', 'hydroupa'].includes(pokemon.species.id)) return;
			if (move.category === "Status" || !move.basePower) return;
			const formes = pokemon.species.id.startsWith('hydreigonmega') ? 
			['hydreigonmega', 'hydreigonmegasix', 'hydreigonmegaseven', 'hydreigonmegaeight', 'hydreigonmeganine'] : ['hydroupa', 'hydroupasix', 'hydroupaseven', 'hydroupaeight', 'hydroupanine'];
			move.multihit = 5 + formes.indexOf(pokemon.species.id);
			if (move.secondaries) {
			   // delete move.secondaries; // Secondaries should still trigger, but only once after all hits take place.
			   // Technically not a secondary effect, but it is negated
			   delete move.self;
			   if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
		   }
		},
		onBasePower(basePower, pokemon, target, move) {
			if ( !['hydreigonmega', 'hydroupa'].includes(pokemon.species.id)) return;
			const formes = pokemon.species.id.startsWith('hydreigonmega') ? 
			['hydreigonmega', 'hydreigonmegasix', 'hydreigonmegaseven', 'hydreigonmegaeight', 'hydreigonmeganine'] : ['hydroupa', 'hydroupasix', 'hydroupaseven', 'hydroupaeight', 'hydroupanine'];
			let nhits = 5 + formes.indexOf(pokemon.species.id);
			return this.chainModify((1.15 + (0.075 * (nhits - 5)))/nhits);
		},
		onSourceDamagingHit(damage, target, pokemon, move) { //onSourceDamagingHit activates after a hit, not before. Need to get secondaries from onModifyMove
			if (move.secondaries) {
				delete move.secondaries;
			}
		},
	},

	// IF
	disguise: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && (['mimikyu', 'mimikyutotem'].includes(target.species.id) || ['mimikyu', 'mimikyutotem'].includes(this.dex.toID(target.fusion)))) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) && ['mimikyu', 'mimikyutotem'].includes(this.dex.toID(target.fusion))) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) && ['mimikyu', 'mimikyutotem'].includes(this.dex.toID(target.fusion))) {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (this.effectState.busted) {
				let valid = false;
				if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id)) {
					const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
					pokemon.formeChange(speciesid, this.effect, true);
					valid = true;
				} if (['mimikyu', 'mimikyutotem'].includes(this.dex.toID(pokemon.fusion))) {
					const fusionid = this.dex.toID(pokemon.fusion) === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
					pokemon.fusionChange(fusionid, this.effect);
					valid = true;
				} if (valid) {
					this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon);
				}
			}
		},
	},
	stancechange: {
		inherit: true,
		onModifyMove(move, attacker, defender) {
			if (attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			const fusion = this.dex.species.get(attacker.fusion);
			const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.species.baseSpecies === 'Aegislash' && attacker.species.name !== targetForme) attacker.formeChange(targetForme);
			if (fusion.baseSpecies === 'Aegislash' && fusion.name !== targetForme) attacker.fusionChange(targetForme);
		},
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
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
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
				forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
				forme = 'Castform-Rainy';
				break;
			case 'hail':
			case 'snow':
				forme = 'Castform-Snowy';
				break;
			case 'sandstorm':
				forme = 'Castform-Sandy';
				break;
			case 'newmoon':
				forme = 'Castform-Cloudy';
				break;
			default:
				forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				if (pokemon.baseSpecies.baseSpecies === 'Castform' && pokemon.species.name !== forme) {
					pokemon.formeChange(forme, this.effect, false, '[msg]');
				} else if (pokemon.fusion?.includes('Castform') && pokemon.fusion !== forme) {
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
