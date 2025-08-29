const {Dex} = require('../../../sim/dex');


const silvabilities: {[k: string]: string} = {
	"Normal": "scrappy",
	"Grass": "flowerveil",
	"Fire": "moxie",
	"Water": "marvelscale",
	"Fighting": "defiant",
	"Flying": "galewings",
	"Poison": "regenerator",
	"Electric": "download",
	"Bug": "tintedlens",
	"Ground": "sheerforce",
	"Rock": "solidrock",
	"Steel": "heatproof",
	"Ice": "gorillatactics",
	"Psychic": "magicbounce",
	"Dark": "strongjaws",
	"Ghost": "mummy",
	"Fairy": "unaware",
	"Dragon": "multiscale",
	"???": "beastboost",
};

export const ModAbilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	// Modded
	mimicry: {
		inherit: true,
		onTerrainChange(pokemon) {
			let types;
			switch (this.field.terrain || this.field.battlefield) {
			case 'electricterrain':
				types = ['Electric'];
				break;
			case 'grassyterrain':
				types = ['Grass'];
				break;
			case 'mistyterrain':
			case 'fairytalefield':
				types = ['Fairy'];
				break;
			case 'psychicterrain':
				types = ['Psychic'];
				break;
			case 'rainbowfield':
				types = ['Dragon'];
				break;
			case 'crystalcavernfield':
				types = [this.field.battlefieldState.crystalTypes[this.field.battlefieldState.crystalIndex]]
				break;
			case 'blessedfield':
				types = ['Normal'];
				break;
			case 'starlightarenafield':
				types = ['Dark'];
				break;
			case 'newworldfield':
				types = [this.sample(['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'])];
				break;
			default:
				types = pokemon.baseSpecies.types;
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;
			if (this.field.terrain || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.terrain) this.hint("Transform Mimicry changes you to your original un-transformed types.");
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
		onBattlefieldChange(pokemon) {
			let types;
			switch (this.field.terrain) {
			case 'volcanicfield':
			case 'infernalfield':
				types = ['Fire'];
				break;
			case 'corrosivemistfield':
			case 'murkwatersurfacefield':
				types = ['Poison'];
				break;
			case 'icyfield':
			case 'frozendimensionalfield':
				types = ['Ice'];
				break;
			case 'watersurfacefield':
			case 'underwaterfield':
				types = ['Water'];
				break;
			case 'dragonsdenfield':
				types = ['Dragon'];
				break;
			case 'skyfield':
				types = ['Flying'];
				break;
			default:
				types = pokemon.baseSpecies.types;
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;
			if (this.field.battlefield || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.battlefield) this.hint("Transform Mimicry changes you to your original un-transformed types.");
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
	},
	flowergift: {
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '0', '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '0', '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()) || pokemon.hasItem('cherrimcrest')) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()) || pokemon.hasItem('cherrimcrest')) {
				return this.chainModify(1.5);
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (pokemon.hasItem('cherrimcrest')) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '0', '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '0', '[msg]');
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1},
		name: "Flower Gift",
		rating: 1,
		num: 122,
	},
	// Terrain interactions
	quickfeet: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (pokemon.status ||this.field.isTerrain('electricterrain')) {
				return this.chainModify(1.5);
			}
		},
	},
	galvanize: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (this.field.isTerrain('electricterrain')) return this.chainModify(1.5);
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
	},
	plus: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			if (this.field.isTerrain('electricterrain')) return this.chainModify(1.5);
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus'])) {
					return this.chainModify(1.5);
				}
			}
		},
	},
	minus: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			if (this.field.isTerrain('electricterrain')) return this.chainModify(1.5);
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus'])) {
					return this.chainModify(1.5);
				}
			}
		},
	},
	comatose: {
		inherit: true,
		onStart(pokemon) {
			if (!this.field.isTerrain('electricterrain')) this.add('-ability', pokemon, 'Comatose');
		},
		onSetStatus(status, target, source, effect) {
			if (this.field.isTerrain('electricterrain')) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Comatose');
			}
			return false;
		},
	},
	gulpmissile: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) {
				if (this.field.isBattlefield('underwaterfield')) {
					var typeMod = this.clampIntRange(target.runEffectiveness(this.dex.getActiveMove('bubblebeam')), -6, 6);
					this.damage(target.maxhp * Math.pow(2, typeMod) / 8);
				} else {
					this.damage(source.baseMaxhp / 4, source, target);
				}
				if (target.species.id === 'cramorantgulping') {
					this.boost({def: -1}, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('cramorant', move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (effect?.id === 'surf' && source.hasAbility('gulpmissile') && source.species.name === 'Cramorant') {
				var forme = source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				if (this.field.isTerrain('electricterrain')) forme = 'cramorantgorging';
				if (this.field.isBattlefield(['watersurfacefield','underwaterfield'])) forme = 'cramorantgulping';
				source.formeChange(forme, effect);
			}
		},
	},
	slowstart: {
		inherit: true,
		condition: {
			duration: 5,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onResidual(pokemon) {
				if (!pokemon.activeTurns && this.effectState.duration) {
					this.effectState.duration += 1;
				}
				if (this.field.isTerrain('electricfield') && this.effectState.duration) {
					this.effectState.duration -= 1;
				}
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start');
			},
		},
	},
	static: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.field.isTerrain('electricfield')? this.randomChance(6, 10) : this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
	},
	teravolt: {
		inherit: true,
		onModifyMove(move) {
			move.ignoreAbility = true;
			if (move.type === 'Electric' && this.field.isTerrain('electricterrain')) move.ignoreImmunity = {'Electric': true};
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.type === 'Electric' && this.field.isTerrain('electricterrain')) return this.chainModify(1.5);
		},
	},
	transistor: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.isTerrain('electricterrain') && move.type === 'Ground') {
				this.debug('Transistor weaken');
				return this.chainModify(0.5);
			}
		},
	},
	leafguard: {
		inherit: true,
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather()) || this.field.isTerrain('grassyterrain')) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Guard');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && ['sunnyday', 'desolateland'].includes(target.effectiveWeather()) || this.field.isTerrain('grassyterrain')) {
				this.add('-immune', target, '[from] ability: Leaf Guard');
				return null;
			}
		},
	},
	cottondown: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (pokemon === target || pokemon.fainted) continue;
				if (!activated) {
					this.add('-ability', target, 'Cotton Down');
					activated = true;
				}
				if (this.field.isTerrain('grassyterrain')) {
					this.boost({spe: -2}, pokemon, target, null, true);
				} else {
					this.boost({spe: -1}, pokemon, target, null, true);
				}
			}
		},
	},
	harvest: {
		inherit: true,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.field.isTerrain('grassyterrain') || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
				}
			}
		},
	},
	overgrow: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && (attacker.hp <= attacker.maxhp / 3 || this.field.isTerrain('grassyterrain'))) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && (attacker.hp <= attacker.maxhp / 3 || this.field.isTerrain('grassyterrain'))) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
	},
	desolateland: {
		inherit: true,
		onStart(source) {
			this.field.setWeather('desolateland');
			if (this.field.isTerrain('grassyterrain')) this.field.setBattlefield('desertfield');
		},
	},
	marvelscale: {
		inherit: true,
		onModifyDef(def, pokemon) {
			if (pokemon.status || this.field.isBattlefield(['mistyterrain','dragonsdenfield','rainbowfield','fairytalefield', 'starlightarenafield'])) {
				return this.chainModify(1.5);
			}
		},
	},
	pastelveil: {
		inherit: true,
		onAnyModifyDamage(damage, source, target, move) {
			if (this.field.isBattlefield('infernalfield')) return;
			if ((target === this.effectState.target || target.isAlly(this.effectState.target)) && (this.field.isTerrain('mistyterrain') || this.field.isBattlefield('rainbowfield')) && move.type === 'Poison') {
				this.debug('Pastel Veil weaken');
				return this.chainModify(0.5);
			}
		},
		onStart(pokemon) {
			if (this.field.isBattlefield('infernalfield')) return;
			for (const ally of pokemon.alliesAndSelf()) {
				if (['psn', 'tox'].includes(ally.status)) {
					this.add('-activate', pokemon, 'ability: Pastel Veil');
					ally.cureStatus();
				}
			}
		},
		onUpdate(pokemon) {
			if (this.field.isBattlefield('infernalfield')) return;
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onAnySwitchIn() {
			if (this.field.isBattlefield('infernalfield')) return;
			((this.effect as any).onStart as (p: Pokemon) => void).call(this, this.effectState.target);
		},
		onSetStatus(status, target, source, effect) {
			if (this.field.isBattlefield('infernalfield')) return;
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Pastel Veil');
			}
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (this.field.isBattlefield('infernalfield')) return;
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Pastel Veil', '[of] ' + effectHolder);
			}
			return false;
		},
	},
	pixilate: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.field.isTerrain('mistyterrain')? this.chainModify(1.5) : this.chainModify([4915, 4096]);
		},
	},
	soulheart: {
		inherit: true,
		onAnyFaint() {
			(this.field.isTerrain('mistyterrain') || this.field.isBattlefield(['raindbowfield','fairytalefield']))? this.boost({spa: 1, spd: 1}, this.effectState.target) : this.boost({spa: 1}, this.effectState.target);
		},
	},
	blaze: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (this.field.isBattlefield('frozendimensionalfield')) return;
			if (move.type === 'Fire' && (attacker.hp <= attacker.maxhp / 3 || this.field.isBattlefield(['volcanicfield','infernalfield']))) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.isBattlefield('frozendimensionalfield')) return;
			if (move.type === 'Fire' && (attacker.hp <= attacker.maxhp / 3 || this.field.isBattlefield(['volcanicfield','infernalfield']))) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
	},
	iceface: {
		inherit: true,
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && (effect.category === 'Physical' || this.field.isBattlefield('frozendimensionalfield')) && target.species.id === 'eiscue') {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectState.busted = true;
				return 0;
			}
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'eiscue' && this.effectState.busted) {
				pokemon.formeChange('Eiscue-Noice', this.effect, true);
			}
		},
		onSwitchIn(pokemon) {
			if (this.field.isBattlefield(['volcanicfield','infernalfield'])) {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = true;
			}
		},
	},
	aftermath: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && this.checkMoveMakesContact(move, source, target, true)) {
				this.field.isBattlefield('corrosivemistfield')? this.damage(source.baseMaxhp / 2, source, target) : this.damage(source.baseMaxhp / 4, source, target);
			}
		},
	},
	merciless: {
		inherit: true,
		onModifyCritRatio(critRatio, source, target) {
			if (target && (['psn', 'tox'].includes(target.status) || this.field.isBattlefield(['corrosivemistfield','murkwatersurfacefield']))) return 5;
		},
	},
	toxicboost: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox' || this.field.isBattlefield(['corrosivemistfield','murkwatersurfacefield'])) && move.category === 'Physical') {
				return this.chainModify(1.5);
			}
		},
	},
	icebody: {
		inherit: true,
		onResidual(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snow' || this.field.isBattlefield(['icyfield','frozendimensionalfield'])) {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onWeather(target, source, effect) {},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
	},
	slushrush: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snow']) || this.field.isBattlefield(['icyfield','frozendimensionalfield'])) {
				return this.chainModify(2);
			}
		},
	},
	snowcloak: {
		inherit: true,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather(['hail', 'snow']) || this.field.isBattlefield(['icyfield','frozendimensionalfield'])) {
				this.debug('Snow Cloak - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
	},
	liquidvoice: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				this.field.isBattlefield('icyfield')? move.type === 'Ice' : move.type = 'Water';
			}
		},
	},
	refrigerate: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.field.isBattlefield(['icyfield','frozendimensionalfield'])? this.chainModify(1.5) : this.chainModify([4915, 4096]);
		},
	},
	hydration: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.status && (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather()) || this.field.isBattlefield(['watersurfacefield','underwaterfield']))) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
	},
	schooling: {
		inherit: true,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4 || this.field.isBattlefield(['watersurfacefield','underwaterfield','murkwatersurfacefield'])) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4 || this.field.isBattlefield(['watersurfacefield','underwaterfield','murkwatersurfacefield'])) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
	},
	surgesurfer: {
		inherit: true,
		onModifySpe(spe) {
			if (this.field.isTerrain('electricterrain') || this.field.isBattlefield(['watersurfacefield','underwaterfield','murkwatersurfacefield'])) {
				return this.chainModify(2);
			}
		},
	},
	swiftswim: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather()) || this.field.isBattlefield(['watersurfacefield','underwaterfield','murkwatersurfacefield'])) {
				return this.chainModify(2);
			}
		},
	},
	torrent: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && (attacker.hp <= attacker.maxhp / 3 || this.field.isBattlefield(['watersurfacefield','underwaterfield']))) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && (attacker.hp <= attacker.maxhp / 3 || this.field.isBattlefield('watersurfacefield'))) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
	},
	waterveil: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'brn' || (pokemon.status && this.field.isBattlefield(['watersurfacefield','underwaterfield']))) {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (this.field.isBattlefield(['watersurfacefield','underwaterfield'])) {
				this.add('-immune', target, '[from] ability: Water Veil');
				return false;
			}
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Veil');
			}
			return false;
		},
	},
	gooey: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Gooey');
				let boostVal = this.field.isBattlefield('murkwatersurface')? -2 : -1;
				this.boost({spe: boostVal}, source, target, null, true);
			}
		},
	},
	liquidooze: {
		inherit: true,
		onSourceTryHeal(damage, target, source, effect) {
			this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
			const canOoze = ['drain', 'leechseed', 'strengthsap'];
			if (canOoze.includes(effect.id)) {
				let damageMod = this.field.isBattlefield('murkwatersurfacefield')? 2 : 1;
				this.damage(damage*damageMod);
				return 0;
			}
		},
	},
	stench: {
		inherit: true,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Stench flinch');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				let chanceMod = this.field.isTerrain('murkwatersurfacefield')? 2 : 1 
				move.secondaries.push({
					chance: 10*chanceMod,
					volatileStatus: 'flinch',
				});
			}
		},
	},
	berserk: {
		inherit: true,
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedBerserk = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit && !move.smartTarget ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				let boostVal = this.field.isBattlefield('dragonsdenfield')? 2 : 1
				this.boost({spa: boostVal}, target, target);
			}
		},
	},
	shedskin: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.hp && pokemon.status && (this.field.isBattlefield('dragonsdenfield')? true : this.randomChance(33, 100))) {
				this.debug('shed skin');
				this.add('-activate', pokemon, 'ability: Shed Skin');
				if (pokemon.cureStatus() && this.field.isBattlefield('dragondensfield')) { // I think this will alwas trigger the cureStatus() function
					pokemon.heal(pokemon.baseMaxhp/4)
					this.boost({def: -1, spd: -1, spa: 1, spe: 1})
					this.hint(`${pokemon.name}'s scaled sheen glimmers brightly!`)
				}
			}
		},
	},
	flamebody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.field.isBattlefield('frozendimensionalfield')) return;
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
	},
	flareboost: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isBattlefield('frozendimensionalfield')) return;
			if ((attacker.status === 'brn' && move.category === 'Special') || this.field.isBattlefield('infernalfield')) {
				return this.chainModify(1.5);
			}
		},
	},
	flashfire: {
		inherit: true,
		onTryHit(target, source, move) {
			if (this.field.isTerrain('frozendimensionalfield')) return;
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onUpdate(pokemon) {
			if (this.field.isBattlefield('frozendimensionalfield') && pokemon.volatiles['flashfire']) pokemon.removeVolatile('flashfire');
			if (this.field.isBattlefield('infernalfield') && !pokemon.volatiles['flashfire']) pokemon.addVolatile('flashfire');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire') {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			},
		},
	},
	magmaarmor: {
		inherit: true,
		onUpdate(pokemon) {
			if (pokemon.status === 'frz' && !this.field.isBattlefield('frozendimendionalfield')) {
				this.add('-activate', pokemon, 'ability: Magma Armor');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (this.field.isBattlefield('frozendimensionalfield')) return;
			if (type === 'frz') return false;
		},
	},
	solarpower: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			if (this.field.isBattlefield('frozendimensionalfield')) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (this.field.isBattlefield('frozendimensionalfield')) return;
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
	},
	hungerswitch: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.species.baseSpecies !== 'Morpeko' || pokemon.terastallized) return;
			let targetForme = pokemon.species.name === 'Morpeko' ? 'Morpeko-Hangry' : 'Morpeko';
			if (this.field.isBattlefield('frozendimensionalfield')) targetForme = 'Morpeko-Hangry';
			if (pokemon.species.name != targetForme) pokemon.formeChange(targetForme); //added IF to avoid formechange animation
		},
	},
	aerilate: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.field.isBattlefield('skyfield')? this.chainModify(1.5) : this.chainModify([4915, 4096]);
		},
	},
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if ((move?.type === 'Flying' && pokemon.hp === pokemon.maxhp) || this.field.isBattlefield('skyfield')) return priority + 1;
		},
	},
	longreach: {
		inherit: true,
		onEffectiveness(typeMod, target, type) {
			if (type === 'Flying' && this.field.isBattlefield('skyfield')) return 1;
		},
	},
	baddreams: {
		inherit: true,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			if (this.field.isBattlefield('rainbowfield')) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					let damageMod = this.field.isBattlefield('infernalfield')? 2 : 1
					this.damage(target.baseMaxhp * damageMod / 8, target, pokemon);
				}
			}
		},
		onFoeTrapPokemon(pokemon) {
			if (!this.field.isBattlefield('infernalfield')) return;
			if (!pokemon.hasAbility('baddreams') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
				this.hint(`${pokemon.name}'s terrible dreams prevent it from being switched out!`)
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!this.field.isBattlefield('infernalfield')) return;
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.hasAbility('baddreams')) {
				pokemon.maybeTrapped = true;
			}
		},
	},
	perishbody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.field.isBattlefield('blessedfield')) return;
			if (!this.checkMoveMakesContact(move, source, target)) return;
			source.addVolatile('trapped', source, move, 'trapper');
			target.addVolatile('infernalperish')

			let announced = false;
			for (const pokemon of [target, source]) {
				if (pokemon.volatiles['perishsong']) continue;
				if (!announced) {
					this.add('-ability', target, 'Perish Body');
					announced = true;
				}
				pokemon.addVolatile('perishsong');
			}
			target.removeVolatile('infernalperish')
		},
	},
	shadowshield: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			let fieldMod = (this.field.isBattlefield('darkcrystalcarvernfield') || this.field.isBattlefield('starlightarenafield'))? 0.75 : 1;
			if (target.hp >= target.maxhp) {
				this.debug('Shadow Shield weaken');
				return this.chainModify(0.5*fieldMod);
			}
			if (this.field.isBattlefield('darkcrystalcavernfield')) {
				this.debug('Field weaken')
				return this.chainModify(fieldMod)
			}
			if (this.field.isBattlefield('starlightarenafield') || this.field.isBattlefield('newworldfield')) {
				this.debug('Field weaken');
				return this.chainModify(0.75);
			}
		},
	},
	wonderskin: {
		inherit: true,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof accuracy === 'number') {
				this.debug('Wonder Skin - modifying accuracy');
				let val = this.field.isBattlefield('rainbowfield')? 0 : 50;
				return val
			}
		},
	},
	cursedbody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.field.isBattlefield('blessedfield')) return;
			if (source.volatiles['disable']) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
	},
	justified: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				this.field.isBattlefield('blessedfield')? this.boost({atk: 2}) : this.boost({ atk: 1 });
			}
		},
	},
	powerspot: {
		inherit: true,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target) {
				this.debug('Power Spot boost');
				return this.field.isBattlefield('blessedfield')? this.chainModify(1.5) : this.chainModify([5325, 4096]);
			}
		},
	},
	stancechange: {
		inherit: true,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.species.name !== targetForme) {
				if (this.field.isBattlefield('fairytalefield')) {
					if (targetForme === 'Aegislash') {
						this.boost({def: 1, atk: -1})
					}
					if (targetForme === 'Aegislash-Blade') {
						this.boost({atk: 1, def: -1})
					}
				}
				attacker.formeChange(targetForme);
			}
		},
	},
	steelyspirit: {
		inherit: true,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steely Spirit boost');
				return this.field.isBattlefield('fairytalefield')? this.chainModify(2) : this.chainModify(1.5);
			}
		},
	},
	mirrorarmor: {
		inherit: true,
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1 && this.field.isBattlefield('starlightarenafield')) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Mirror Armor', move, `[of] ${target}`);
				return false;
			}
		},
	},
	victorystar: {
		inherit: true,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (this.field.isBattlefield('starlightarenafield') || this.field.isBattlefield('newworldfield')) {
				this.debug('Victory Star boost');
				return this.chainModify(1.5);
			}
		},
	},
	multitype: {
		inherit: true,
		onStart(target) {
			let type = this.sample(['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water']);
			this.add('-start', target, 'typechange', type, '[from] ability: Protean');
		},
		onResidual(target, source, effect) {
			let type = this.sample(['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water']);
			this.add('-start', target, 'typechange', type, '[from] ability: Protean');
		},
	},
	rkssystem: {
		inherit: true,
		onStart(target) {
			let type = this.sample(['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water']);
			this.add('-start', target, 'typechange', type, '[from] ability: Protean');
		},
		onResidual(target, source, effect) {
			let type = this.sample(['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water']);
			this.add('-start', target, 'typechange', type, '[from] ability: Protean');
		},
	},
	// Additions
	accumulation: {
		onAfterMove(source, target, move) {
			if (['swallow', 'spitup'].includes(move.id)) {
				source.addVolatile('noaccumulation')
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns && !pokemon.volatiles['noaccumulation']) {
				pokemon.addVolatile('stockpile')
			}
			pokemon.removeVolatile('noaccumulation')
		},
		flags: {},
		shortDesc: "Grants a stack of Stockpile at the end of the turn.",
		desc: "Grants a stack of Stockpile at the end of each turn with the associated stat changes. This will not happen if the moves Spit Up or Stockpile were used.",
		name: "Accumulation",
		rating: 4.5,
		num: 0,
	},
	execution: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Execution", "[of] " + target);
				}
			}
			if (boost.spa && boost.spa < 0) {
				delete boost.spa;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Sp. Attack", "[from] ability: Execution", "[of] " + target);
				}
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.heal(source.baseMaxhp / 8);
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (defender.hp < defender.maxhp/2) {
				return this.chainModify(2);
			}
		},
		flags: {breakable: 1},
		shortDesc: "Prevents Atk. and Sp.Atk. drops from other Pokémon. Heals 1/8 on kill. x2 damage on foes under 1/2 max HP.",
		name: "Execution",
		rating: 0.5,
		num: 1,
	},
	inexorable: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			let boosted = false;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = true;
					break;
				}
			}
			if (boosted && move.type === "Dragon") {
				this.debug('Inexorable boost');
				return this.chainModify(1.3);
			}
		},
		flags: {},
		shortDesc: "Boosts Dragon-type moves by 30% if moving before foe.",
		name: "Inexorable",
		rating: 2.5,
		num: 2,
	},
	lunaridol: {
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.isWeather(['hail', 'snow'])) {
				this.debug('Lunar Idol boost');
				return this.chainModify(1.5);
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.type === "Ice") {
				return this.chainModify(1.5)
			}
		},
		onSwitchIn(pokemon) { //Levitate added in scripts
				this.add('-activate', pokemon, 'ability: Lunar Idol');

		},
		flags: {breakable: 1},
		shortDesc: "Grants effects of Levitate. x1.5 Sp.Atk in Hail and Snow. x1.5 power to Ice-type moves.",
		name: "Lunar Idol",
		rating: 3.5,
		num: 3,
	},
	prismpower: {
		onSwitchIn(pokemon) {
			if (!pokemon.abilityState.prismPower) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, pokemon, pokemon, this.effect);
				this.add('-activate', pokemon, 'ability: Prism Power');
				pokemon.abilityState.PrismPower = true; // If this is just something I can do, should prolly do this for Accumulation too
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		shortDesc: "Boosts Atk, Sp.Atk, Def, Sp.Def, and Speed by 1 stage on switch-in. Once per battle.",
		name: "Prism Power",
		rating: 3.5,
		num: 4,
	},
	reflector: {
		onSwitchIn(pokemon) {
			this.effectState.switchingIn = true;
		},
		onStart(pokemon) {
			// copies across in doubles/triples
			// (also copies across in multibattle and diagonally in free-for-all,
			// but side.foe already takes care of those)
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				const type = target.types.slice(-1)[0]
				if (!pokemon.hasType(type)) {
					pokemon.addType(type)
				}
			}
			this.effectState.switchingIn = false;
		},
		flags: {breakable: 1},
		shortDesc: "Grants user the secondary type of the opposing Pokémon.",
		desc: "Grants user the secondary type of the opposing Pokémon. If the opposing Pokémon does not have a secondary type, it will gain the primary type instead. If the bearer already has the opposing Pokémon's secondary type, it will not gain a type at all.",
		name: "Reflector",
		rating: 3.5,
		num: 5,
	},
	resuscitation: {
		onBeforeFaint(pokemon, effect) {
			if (!['Paras-Aevian','Parasect-Aevian'].includes(pokemon.species.id)) return;
			this.add('-ability', pokemon, 'Resuscitation');
			if (pokemon.species.id === 'Paras-Aevian') pokemon.formeChange('Paras-Aevian-Zombie', this.effect, false, '0', '[msg]');
			if (pokemon.species.id === 'Parasect-Aevian') pokemon.formeChange('Parasect-Aevian-Zombie', this.effect, false, '0', '[msg]');
			return pokemon.hp = pokemon.maxhp;
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		shortDesc: "Paras-Aevian or Parasect-Aevian only: allows the Pokémon to revive at full health.",
		name: "Resuscitation",
		rating: 3.5,
		num: 6,
	},
	solaridol: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (this.field.isWeather(['sunnyday', 'desolateland'])) {
				this.debug('Solar Idol boost');
				return this.chainModify(1.5);
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.type === "Fire") {
				return this.chainModify(1.5)
			}
		},
		onSwitchIn(pokemon) { // Added in scripts
				this.add('-activate', pokemon, 'ability: Solar Idol');

		},
		flags: {breakable: 1},
		shortDesc: "Grants effects of Levitate. x1.5 Atk in Sun. x1.5 power to Fire-type moves.",
		name: "Solar Idol",
		rating: 3.5,
		num: 7,
	},
	stoppn: {
		onDamagePriority: 1,
		onFoeDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.boost({def: -1, spd: -1});
				return false;
			}
		},
		flags: {},
		shortDesc: "Raises Def. and Sp.Def. by 1 stage when taking poison damage.",
		name: "Stop \\PN",
		rating: 3.5,
		num: 8,
	},
	storm9: {
		onStart(source) {
			const result = this.random(5);
			switch (result) {
				case 0:
					this.field.setWeather('raindance');
					this.hint("Storm-9 created a downpour!")
					break;
				case 1:
					this.field.setWeather('hail');
					this.hint("Storm-9 brought hailfall!")
					break;
				case 2:
					this.field.setWeather('sandstorm');
					this.hint("Storm-9 whipper up a duststorm!")
					break;
				case 3:
					this.field.setWeather('deltastream');
					this.hint("Storm-9 whipped up terrible winds!")
					break;
				default:
					this.field.setWeather('shadowsky') //need to add shadow sky from pokemon XD
					this.hint("Storm-9 shrouded the sky in a dark aura...")
				}
		},
		onResidual(target, source, effect) {
			const result = this.random(5);
			switch (result) {
				case 0:
					this.field.setWeather('raindance');
					this.hint("Storm-9 created a downpour!")
					break;
				case 1:
					this.field.setWeather('hail');
					this.hint("Storm-9 brought hailfall!")
					break;
				case 2:
					this.field.setWeather('sandstorm');
					this.hint("Storm-9 whipper up a duststorm!")
					break;
				case 3:
					this.field.setWeather('deltastream');
					this.hint("Storm-9 whipped up terrible winds!")
					break;
				default:
					this.field.setWeather('shadowsky') //need to add shadow sky from pokemon XD
					this.hint("Storm-9 shrouded the sky in a dark aura...")
				}
		},
		onModifyMove(move, source, target) {
			if (move.id === 'weatherball') {
				move.target = 'allAdjacentFoes'
			}
		},
		flags: {},
		shortDesc: "Summons a random weather on switch-in. Changes weather at the end of the turn.",
		name: "Storm-9",
		rating: 4,
		num: 9,
	},
	temporalshift: {
		onTryBoost(boost, target, source, effect) {
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Temporal Shift", "[of] " + target);
			}
		},
		onResidual(target, source, effect) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'hex',
				source: source,
				moveData: {
					id: 'hex',
					name: "Hex",
					accuracy: 100,
					basePower: target.status? 130 : 65,
					category: "Special",
					priority: 0,
					flags: {metronome: 1, futuremove: 1},
					effectType: 'Move',
					type: 'Ghost',
				},
			});
			this.add('-start', source, 'Hex');
			return this.NOT_FAIL;
		},
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		shortDesc: "Prevents stat drops. Will attempt to use Hex with a 3-turn delay, every turn.",
		name: "Temporal Shift",
		rating: 2,
		num: 10,
	},
	trueshot: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bullet']) {
				return this.chainModify(1.3);
			}
		},
		flags: {},
		shortDesc: "This Pokemon's bullet-based attacks have 1.5x power.",
		name: "True Shot",
		rating: 3.5,
		num: 11,
	},
	worldofnightmares: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: World of Nightmares');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: World of Nightmares');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: World of Nightmares');
				return null;
			}
		},
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				target.setStatus('worldofnightmares')
			}
		},
		condition: {
			name: 'worldofnightmares',
			effectType: 'Status',
			onStart(target, source, sourceEffect) {
				this.effectState.stage = 0;
				this.add('-status', target, 'worldofnightmares');
			},
			onSwitchIn() {
				this.effectState.stage = 0;
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				if (this.effectState.stage < 31) {
					this.effectState.stage++;
				}
				this.damage(this.clampIntRange((pokemon.baseMaxhp * (this.field.isBattlefield('newworldfield') ? 1 : 2 / 32), 1) * this.effectState.stage, 1));
			},
		},
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "World of Nightmares",
		shortDesc: "Immune to sleep. Causes foe to take increasing residual damage. Dream Eater and Nightmare never fail.",
		rating: 1.5,
		num: 12,
	},
	silvallycrest: {
		onBasePower(basePower, source, target, move) {
			if (source.baseSpecies.id !== 'silvally') return;
			if (this.dex.items.get(source.item).onMemory) {
				if (move.type === this.dex.items.get(source.item).onMemory) {
					return this.chainModify(1.2);
				}
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.id !== 'silvally') return;
			if (!this.dex.items.get(pokemon.item).onMemory) return;
			const type = this.dex.items.get(pokemon.item).onMemory || "Normal";
			if (type in silvabilities) {
				pokemon.addVolatile('ability:' + silvabilities[type]);
				this.add('-activate', pokemon, 'ability: ' + this.dex.abilities.get(silvabilities[type]).name);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
		name: "Silvally Crest",
		shortDesc: "Silvally: x1.2 power to moves matching memory type. Ability depends on memory.",
		rating: 1.5,
		num: 13,
	},
};
export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = Dex.deepClone(ModAbilities);