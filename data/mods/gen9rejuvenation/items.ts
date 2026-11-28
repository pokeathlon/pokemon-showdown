const {Dex} = require('../../../sim/dex');

export const ModItems: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Modded
	cellbattery: {
		inherit: true,
		onSwitchIn(pokemon) {
			if ((!this.field.battlefield && this.field.isTerrain('electricterrain'))) pokemon.useItem();
		},
		boosts: {
			atk: 1,
		},
	},
	bigroot: {
		inherit: true,
		onTryHeal(damage, target, source, effect) {
			const heals = ['drain', 'leechseed', 'ingrain', 'aquaring', 'strengthsap'];
			if (heals.includes(effect.id)) {
				return (!this.field.battlefield && this.field.isTerrain('grassyterrain'))? this.chainModify(1.6) : this.chainModify(1.3);
			}
		},
		gen: undefined
	},
	dousedrive: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] item: Douse Drive');
				}
				return null;
			}
		},
	},
	chilldrive: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] item: Chill Drive');
				}
				return null;
			}
		},
	},
	shockdrive: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({ spe: 1 })) {
					this.add('-immune', target, '[from] item: Shock Drive');
				}
				return null;
			}
		},
	},
	burndrive: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] item: Burn Drive');
				}
				return null;
			}
		},
	},
	blacksludge: {
		inherit: true,
		onResidual(pokemon) {
			let modifier = this.field.isBattlefield('corruptedcavefield')? 2 : 1;
			if (pokemon.hasType('Poison')) {
				this.heal(pokemon.baseMaxhp * modifier / 16);
			} else {
				this.damage(pokemon.baseMaxhp * modifier / 8);
			}
		},
	},
	shellbell: {
		inherit: true,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			let modifier = this.field.isBattlefield('beachfield')? 2 : 1;
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(move.totalDamage * modifier / 8, pokemon);
			}
		},
	},
	ironball: {
		inherit: true,
		onEffectiveness(typeMod, target, type, move) {
			if (this.field.isBattlefield('deepearthfield')) return;
			if (!target) return;
			if (target.volatiles['ingrain'] || target.volatiles['smackdown'] || this.field.getPseudoWeather('gravity')) return;
			if (move.type === 'Ground' && target.hasType('Flying')) return 0;
		},
		// airborneness negation implemented in sim/pokemon.js:Pokemon#isGrounded
		onModifySpe(spe) {
			if (this.field.isBattlefield('deepearthfield')) return;
			return this.chainModify(0.5);
		},
	},

	// Additions
	magicalseed: {
		name: "Magical Seed",
		spritenum: -6,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && ((!this.field.battlefield && this.field.isTerrain('psychicterrain')) ||
				this.field.isBattlefield(['darkcrystalcavernfield','rainbowfield','crystalcavernfield','blessedfield','fairytalefield','starlightarenafield','newworldfield','inversefield','deuxfinalisfield','dimensionalfield','hauntedfield','bewitchedwoodsfield']))) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (!pokemon.ignoringItem() && (!this.field.battlefield && this.field.isTerrain('psychicterrain'))) {
				pokemon.useItem();
			}
		},
		onBattlefieldChange(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isBattlefield(['darkcrystalcavernfield','rainbowfield','crystalcavernfield','blessedfield','fairytalefield','starlightarenafield','newworldfield','inversefield','deuxfinalisfield','dimensionalfield','hauntedfield','bewitchedwoodsfield'])) {
				pokemon.useItem();
			}
		},
		onUseItem(item, pokemon) {
			if ((!this.field.battlefield && this.field.isTerrain('psychicterrain'))) {
				this.boost({spa: 2});
				pokemon.addVolatile('confusion')
			}
			if (this.field.isBattlefield('darkcrystalcavernfield')) {
				this.boost({spd: 1});
				this.actions.useMove('magiccoat', pokemon, {target: pokemon});
			}
			if (this.field.isBattlefield(['rainbowfield', 'starlightarenafield'])) {
				this.boost({spa: 1});
				this.actions.useMove('wish', pokemon, {target: pokemon});
			}
			if (this.field.isBattlefield(['crystalcavernfield','blessedfield'])) {
				this.boost({spa: 1});
				this.actions.useMove('magiccoat', pokemon, {target: pokemon});
			}
			if (this.field.isBattlefield('fairytalefield')) {
				this.actions.useMove('kingsshield', pokemon, {target: pokemon});
			}
			if (this.field.isBattlefield('newworldfield')) {
				this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1});
				pokemon.addVolatile('mustrecharge');
			}
			if (this.field.isBattlefield('inversefield')) {
				pokemon.setType('Normal')
				this.add('-start', pokemon, 'typechange', 'Normal');
				pokemon.setAbility('normalize')
				this.add('-ability', pokemon, 'Normalize', '[from] item: Magical Seed');
			}
			if (this.field.isBattlefield('deuxfinalisfield')) {
				this.boost({def: 1, spd: 1, spe: 1});
				pokemon.addVolatile('perishsong');
			}
			if (this.field.isBattlefield('dimensionalfield')) {
				this.boost({def: 1});
				this.actions.useMove('trickroom', pokemon, {target: pokemon});
			}
			if (this.field.isBattlefield('hauntedfield')) {
				this.boost({def: 1, spd: 1});
				pokemon.trySetStatus('brn', pokemon);
			}
			if (this.field.isBattlefield('bewitchedwoodsfield')) {
				this.boost({spd: 1});
				pokemon.addVolatile('ingrain');
			}
		},
		num: 0,
		desc: "Provides boost in magical fields.",
	},
	syntheticseed: {
		name: "Synthetic Seed",
		spritenum: -6,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && 
				this.field.isBattlefield(['chessboardfield', 'bigtoparenafield', 'factoryfield', 'shortcircuitfield', 'glitchfield', 'mirrorarenafield', 'flowergardenfield', 'corruptedcavefield', 'colosseumfield', 'concertvenuefield', 'backalleyfield', 'cityfield'])) {
				pokemon.useItem();
			}
		},
		onBattlefieldChange(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isBattlefield(['chessboardfield', 'bigtoparenafield', 'factoryfield', 'shortcircuitfield', 'glitchfield', 'mirrorarenafield', 'flowergardenfield', 'corruptedcavefield', 'colosseumfield', 'concertvenuefield', 'backalleyfield', 'cityfield'])) {
				pokemon.useItem();
			}
		},
		onUseItem(item, pokemon) {
			if (this.field.isBattlefield('chessboardfield')) {
				this.boost({spa: 1});
				pokemon.addVolatile('magiccoat');
			}
			if (this.field.isBattlefield('bigtoparenafield')) {
				this.boost({atk: 1});
				pokemon.addVolatile('helpinghand');
			}
			if (this.field.isBattlefield('factoryfield')) {
				this.boost({spa: 1});
				pokemon.addVolatile('laserfocus');
			}
			if (this.field.isBattlefield('shortcircuitfield')) {
				this.boost({spd: 1});
				pokemon.addVolatile('magnetrise');
			}
			if (this.field.isBattlefield('glitchfield')) {
				this.boost({def: 1});
				pokemon.setType('???')
				this.add('-start', pokemon, 'typechange', '???');
			}
			if (this.field.isBattlefield('mirrorarenafield')) {
				this.boost({evasion: 2});
			}
			if (this.field.isBattlefield('flowergardenfield')) {
				this.boost({spd: 1});
				pokemon.addVolatile('ingrain');
			}
			if (this.field.isBattlefield('corruptedcavefield')) {
				this.boost({def: 2});
				pokemon.trySetStatus('tox')
			}
			if (this.field.isBattlefield('colosseumfield')) {
				this.boost({atk: 2});
				pokemon.addVolatile('taunt');
			}
			if (this.field.isBattlefield('concertvenuefield')) {
				this.boost({spa: 1});
				pokemon.addVolatile('helpinghand');
			}
			if (this.field.isBattlefield(['backalleyfield','cityfield'])) {
				this.boost({atk: 1, accuracy: 1});
			}
		},
		num: 0,
		desc: "Provides boost in synthetic fields.",
	},
	telluricseed: {
		name: "Telluric Seed",
		spritenum: -6,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && 
				this.field.isBattlefield(['swampfield','corrosivefield','desertfield','rockyfield','forestfield','volcanictopfield','wastelandfield','beachfield','cavefield','mountainfield','snowymountainfield','deepearthfield'])) {
				pokemon.useItem();
			}
		},
		onBattlefieldChange(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isBattlefield(['swampfield','corrosivefield','desertfield','rockyfield','forestfield','volcanictopfield','wastelandfield','beachfield','cavefield','mountainfield','snowymountainfield','deepearthfield'])) {
				pokemon.useItem();
			}
		},
		onUseItem(item, pokemon) {
			if (this.field.isBattlefield('swampfield')) {
				this.boost({def: 1});
				pokemon.setAbility('clearbody');
				this.add('-ability', pokemon, 'Clear Body', '[from] item: Telluric Seed');
			};
			if (this.field.isBattlefield('corrosivefield')) {
				this.actions.useMove('banefulbunker', pokemon, {target: pokemon});
			};
			if (this.field.isBattlefield('desertfield')) {
				this.boost({def: 1, spd: 1, spe: 1});
				pokemon.addVolatile('partiallytrapped', pokemon, this.dex.getActiveMove('Sand Tomb'));
				if (pokemon.volatiles['partiallytrapped']) pokemon.volatiles['partiallytrapped'].duration = 5;
			};
			if (this.field.isBattlefield('rockyfield')) {
				this.boost({def: 1, spd: 1});
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * (2 ** typeMod) / 4);
			};
			if (this.field.isBattlefield('forestfield')) {
				this.actions.useMove('spikyshield', pokemon, {target: pokemon});
			};
			if (this.field.isBattlefield('volcanictopfield')) {
				this.boost({def: 1});
				this.actions.useMove('shelltrap', pokemon, {target: pokemon});
			};
			if (this.field.isBattlefield('wastelandfield')) {
				this.boost({atk: 1, spa: 1});
				for (const side of this.sides) {
					side.addSideCondition('stealthrock');
				};
			};
			if (this.field.isBattlefield('beachfield')) {
				pokemon.addVolatile('focusenergy');
			};
			if (this.field.isBattlefield('cavefield')) {
				this.boost({def: 2});
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * (2 ** typeMod) / 8);
			};
			if (this.field.isBattlefield('mountainfield')) {
				this.boost({atk: 2, accuracy: -1});
			};
			if (this.field.isBattlefield('snowymountainfield')) {
				this.boost({spa: 2, accuracy: -1});
			};
			if (this.field.isBattlefield('deepearthfield')) {
				this.boost({def: 1});
				pokemon.weighthg *= 2;
			};
		},
		num: 0,
		desc: "Provides boost in telluric fields.",
	},
	elementalseed: {
		name: "Elemental Seed",
		spritenum: -6,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && ((!this.field.battlefield && this.field.isTerrain(['electricterrain', 'grassyterrain', 'mistyterrain'])) ||
				this.field.isBattlefield(['volcanicfield', 'corrosivemistfield','icyfield', 'watersurfacefield','underwaterfield','murkwatersurfacefield','dragonsdenfield','frozendimensionalfield','skyfield','infernalfield']))) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (!pokemon.ignoringItem() && (!this.field.battlefield && this.field.isTerrain(['electricterrain', 'grassyterrain', 'mistyterrain']))) {
				pokemon.useItem();
			}
		},
		onBattlefieldChange(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isBattlefield(['volcanicfield', 'corrosivemistfield','icyfield', 'watersurfacefield','underwaterfield','murkwatersurfacefield','dragonsdenfield','frozendimensionalfield','skyfield','infernalfield'])) {
				pokemon.useItem();
			}
		},
		onUseItem(item, pokemon) {
			if ((!this.field.battlefield && this.field.isTerrain('electricterrain'))) {
				this.boost({spe: 1})
				pokemon.addVolatile('charge')
			}
			if ((!this.field.battlefield && this.field.isTerrain('grassyterrain'))) {
				this.boost({def: 1})
				pokemon.addVolatile('ingrain')
			}
			if ((!this.field.battlefield && this.field.isTerrain('mistyterrain'))) {
				this.boost({spd: 1})
				this.actions.useMove('wish', pokemon, {target: pokemon})
			}
			if (this.field.isBattlefield('volcanicfield')) {
				this.boost({atk: 1, spa: 1, spe: 1})
				pokemon.addVolatile('partiallytrapped', pokemon, this.dex.getActiveMove('firespin'));
				if (pokemon.volatiles['partiallytrapped']) pokemon.volatiles['partiallytrapped'].duration = 5;
			}
			if (this.field.isBattlefield('corrosivemistfield')) {
				this.boost({atk: 1, spa: 1})
				pokemon.trySetStatus('tox', pokemon)
			}
			if (this.field.isBattlefield('icyfield')) {
				this.boost({spe: 2})
				if (pokemon.isGrounded()) this.damage(pokemon.baseMaxhp / 8, pokemon);
			}
			if (this.field.isBattlefield('watersurfacefield')) {
				this.boost({spd: 1})
				this.actions.useMove('aquaring', pokemon, {target: pokemon})
			}
			if (this.field.isBattlefield('underwaterfield')) {
				this.boost({spe: 1})
				this.actions.useMove('soak', pokemon, {target: pokemon})
			}
			if (this.field.isBattlefield('murkwatersurfacefield')) {
				this.boost({spe: 1})
				this.actions.useMove('aquaring', pokemon, {target: pokemon})
				pokemon.trySetStatus('psn')
			}
			if (this.field.isBattlefield('dragonsdenfield')) {
				this.boost({spa: 1})
				pokemon.addVolatile('flashfire')
			}
			if (this.field.isBattlefield('frozendimensionalfield')) {
				this.boost({spe: 2})
				pokemon.addVolatile('torment')
			}
			if (this.field.isBattlefield('skyfield')) {
				this.boost({def: 1, spd: 1})
			}
			if (this.field.isBattlefield('infernalfield')) {
				this.boost({atk: 1, spa: 1})
				pokemon.addVolatile('trapped', pokemon, item, 'trapper');
			}
		},
		num: 0,
		desc: "Provides boost in elemental fields.",
	},
	amplifiedrock: { //TODO - Effects on relevant weathers, rooms, terrains
		name: "Amplified Rock",
		spritenum: -6,
		fling: {
			basePower: 60,
		},
		num: 0,
	},
	interceptz: { //TODO
		name: "Intercept Z",
		spritenum: -6,
		onTakeItem: false,
		zMove: true,
		num: 0,
	},
	unknownmemory: {
		name: "Unknown Memory",
		spritenum: -6,
		onMemory: '???',
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 773) || pokemon.baseSpecies.num === 773) {
				return false;
			}
			return true;
		},
		forcedForme: "Silvally-Unknown",
		itemUser: ["Silvally-Unknown"],
		num: 0,
	},
	souldew: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.isBattlefield('deuxfinalisfield') && ['Latios', 'Latias'].includes(target.species.baseSpecies) &&
				['Dark', 'Ghost'].includes(move.type)) return this.chainModify(0.5);
		},
		onBasePower(basePower, source, target, move) {
			if (!['Latios', 'Latias'].includes(source.species.baseSpecies)) return;
			if (['Dragon', 'Psychic'].includes(move.type)) return this.chainModify([4915, 4096]);
			if (this.field.isBattlefield('deuxfinalisfield') && move.type === 'Dark') return this.chainModify(1.5);
		},
	},
	amuletcoin: { 
		name: "Amulet Coin",
		spritenum: -6,
		num: 0,
		onSetStatus(status, target, source, effect) {
			if (this.field.isBattlefield('dragonsdenfield')) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] item: Amulet Coin');
				}
				return false;
			}
		},
		desc: "Prevents status conditions in Dragon's Den Field.",
	},

	// Crests
	aevianampharoscrest: {
		name: "Aevian Ampharos Crest",
		spritenum: -6,
		onBasePower(basePower, source, target, move) {
			if (source.species.id !== 'ampharosaevian') return;
			if (move.id === source.moveSlots[0].id){
				return this.chainModify(['Electric', 'Ice'].includes(move.type) ? 1.2 : 1.5);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.species.id !== 'ampharosaevian') return;
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Crest neutralize');
				return this.chainModify(0.70);
			}
		},
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Ampharos-Aevian"],
		num: 0,
		desc: "If held by an Ampharos-Aevian, the move in its first moveslot will be boosted by x1.2 if Electric or Ice-type, x1.5 otherwise. Reduces damage taken from Super-effective attacks by 30%.",
	},
	ariadoscrest: {
		name: "Ariados Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (pokemon.species.id === 'ariados') {
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move, source, target){
			if (source.species.id !== 'ariados') return;
			if (target && target != source) {
				if (target.boosts.spe < 0 || ['tox','psn'].includes(target.status)) {
					move.willCrit = true;
				}
			}
		},
		onTryBoost(boost, target, source) {
			if (target.species.id === 'ariados' && target !== source && boost.spe && boost.spe < 0) delete boost.spe;
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Ariados"],
		num: 0,
		desc: "If held by an Ariados, x1.5 speed. Always lands critical hits against slowed or poisoned foes.",
	},
	bastiodoncrest: {
		name: "Bastiodon Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (target.species.id !== 'bastiodon') return;
			if (source === target) return;
			const recoil = this.damage(damage / 2, source, target);
			if (recoil) this.heal(recoil, target);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Bastiodon"],
		num: 0,
		desc: "If held by a Bastiodon, foe takes 50% recoil from hit, and user heals for the same value.",
	},
	beheeyemcrest: {
		name: "Beheeyem Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onDamagingHit(damage, target, source, move) {
			if (target.species.id !== 'beheeyem') return;
			if (source.volatiles['disable']) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
					source.addVolatile('disable', this.effectState.target);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.species.id !== 'beheeyem') return;
			if (source.getStat('spe') > target.getStat('spe')) {
				this.debug('Crest neutralize');
				return this.chainModify(0.67);
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Beheeyem"],
		num: 0,
		desc: "If held by a Beheeyem, takes x0.67 damage if it hasn't moved yet. Disables moves that hit the user.",
	},
	boltundcrest: {
		name: "Boltund Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.species.id !== 'boltund') return;
			if (move.flags['bite'] && this.queue.willMove(defender)) {
				return this.chainModify(1.5);
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Boltund"],
		num: 0,
		desc: "If held by a Boltund, x1.5 power to biting moves if user moves before foe.",
	},
	castformcrest: {
		name: "Castform Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform') return;
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.move).weather) {
					this.actions.useMove(moveSlot.move, pokemon, {target: pokemon});
					break
				}
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.hp || pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			const weather = pokemon.effectiveWeather();
			const forme = ['raindance', 'primordialsea'].includes(weather) ? 'Castform-Rainy' :
				['sunnyday', 'desolateland'].includes(weather) ? 'Castform-Sunny' :
				['hail', 'snow', 'snowscape'].includes(weather) ? 'Castform-Snowy' : 'Castform';
			if (pokemon.species.name === forme && pokemon.itemState.crestForme === forme) return;
			pokemon.itemState.crestForme = forme;
			if (pokemon.species.name !== forme) pokemon.formeChange(forme, this.effect);
			const species = this.dex.species.get(forme);
			const stats = { ...species.baseStats };
			let ability = pokemon.baseAbility;
			if (forme === 'Castform-Rainy') {
				stats.hp = 100;
				stats.def = stats.spd = 80;
				ability = toID('Rain Dish');
			} else if (forme === 'Castform-Sunny') {
				stats.spa = 90;
				stats.spe = 100;
				ability = toID('Solar Power');
			} else if (forme === 'Castform-Snowy') {
				stats.spa = 100;
				stats.spe = 90;
				ability = toID('Slush Rush');
			}
			const spread = this.spreadModify(stats, pokemon.set);
			for (const stat of ['atk', 'def', 'spa', 'spd', 'spe'] as const) pokemon.storedStats[stat] = spread[stat];
			pokemon.hp = Math.max(1, Math.ceil(pokemon.hp * spread.hp / pokemon.maxhp));
			pokemon.baseMaxhp = pokemon.maxhp = spread.hp;
			if (pokemon.ability !== ability) pokemon.setAbility(ability);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Castform", "Castform-Rainy", "Castform-Sunny", "Castform-Snowy"],
		num: 0,
		desc: "If held by a Castform, summons first known weather move, changes form based on weather.",
	},
	cherrimcrest: { //implemented in modded Flower Gift ability
		name: "Cherrim Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Cherrim", "Cherrim-Sunshine"],
		num: 0,
		desc: "If held by a Cherrim, forces Cherrim into Sunshine form.",
	},
	cinccinocrest: {
		name: "Cinccino Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMovePriority: 1,
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.id !== 'cinccino') return;
			if (move.multihit || move.category === 'Status') return;
			move.multihit = [2, 5];
		},
		onBasePowerPriority: 31,
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.species.id === 'cinccino' && move.multihit && !this.dex.moves.get(move.id).multihit) return this.chainModify(0.4);
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (source.species.id === 'cinccino' && !this.dex.moves.get(move.id).multihit && move.hit > 2) return [];
		},
		onTryHeal(amount, target, source, effect) {
			const move = this.activeMove;
			if (target.species.id === 'cinccino' && effect.id === 'drain' && move && move.hit > 2 && !this.dex.moves.get(move.id).multihit) return 0;
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Cinccino"],
		num: 0,
		desc: "If held by a Cinccino, turns single-hit attacks into multihit at 40% BP.",
	},
	claydolcrest: {
		name: "Claydol Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.species.id !== 'claydol') return;
			if ((/beam/i.test(move.id) || ['flashcannon', 'fleurcannon', 'dynamaxcannon'].includes(move.id))) {
				return this.chainModify(1.5)
			}
		},
		onChargeMove(pokemon, target, move) {
			if (pokemon.species.id !== 'claydol') return;
			if ((/beam/i.test(move.id) || ['flashcannon', 'fleurcannon', 'dynamaxcannon'].includes(move.id))) {
				return false;
			}
		},
		onAfterMove(source, target, move) {
			if (source.species.id !== 'claydol') return;
			if ((/beam/i.test(move.id) || ['flashcannon', 'fleurcannon', 'dynamaxcannon'].includes(move.id)) && source.volatiles["mustrecharge"]) {
				source.removeVolatile("mustrecharge");
				return;
			}
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.id !== 'claydol') return;
			if (move.category != 'Special') return;
			move.overrideOffensiveStat = 'def';
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Claydol"],
		num: 0,
		desc: "If held by a Claydol, x1.5 to beam moves. Uses Def instead of Sp.Atk in damage calculations.",
	},
	cofagriguscrest: {
		name: "Cofagrigus Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id !== 'cofagrigus') return;
				return this.chainModify(1.2);
		},
		onModifyDefPriority: 5,
		onModifyDef(spd, pokemon) {
			if (pokemon.species.id !== 'cofagrigus') return;
			return this.chainModify(1.4);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Cofagrigus"],
		num: 0,
		desc: "If held by a Cofagrigus, x1.4 Def and x1.2 Sp.Atk.",
	},
	crabominablecrest: {
		name: "Crabominable Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (pokemon.species.id !== 'crabominable') return;
				return this.chainModify(1.25);
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id !== 'crabominable') return;
				return this.chainModify(1.25);
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			target.itemState.CrabominableCrest = true;
		},
		onBasePower(basePower, source, target, move) {
			if (source.species.id === 'crabominable' && source.itemState.CrabominableCrest) {
				return this.chainModify(1.5)
			}
		},
		onBeforeTurn(pokemon) {
			pokemon.itemState.CrabominableCrest = false;
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Crabominable"],
		num: 0,
		desc: "If held by a Crabominable, x1.25 Def and Sp.Def. x1.5 boost if hit by an attack before moving.",
	},
	cryogonalcrest: {
		name: "Cryogonal Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id !== 'cryogonal') return;
				return this.chainModify(1.2);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.species.id !== 'cryogonal') return;
				return atk = atk + Math.floor(this.modify(pokemon.storedStats.spd, 1.2) / 10);
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (pokemon.species.id !== 'cryogonal') return;
				return def = def + Math.floor(this.modify(pokemon.storedStats.spd, 1.2) / 10);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id !== 'cryogonal') return;
				return spa = spa + Math.floor(this.modify(pokemon.storedStats.spd, 1.2) / 10);
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (pokemon.species.id !== 'cryogonal') return;
				return spe = spe + Math.floor(this.modify(pokemon.storedStats.spd, 1.2) / 10);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Cryogonal"],
		num: 0,
		desc: "If held by a Cryogonal, x1.2 Sp.Def, rest of stats are raised by 10% of Sp.Def.",
	},
	darmanitancrest: {
		name: "Darmanitan Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onUpdate(pokemon) {
			if (pokemon.species.id == 'darmanitan') {
				pokemon.formeChange('Darmanitan-Zen', this.effect);
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Darmanitan", "Darmanitan-Zen"],
		num: 0,
		desc: "If held by a Darmanitan, forces it into Zen Mode.",
	},
	dedennecrest: {
		name: "Dedenne Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.id !== 'dedenne') return;
			if (move.category === 'Physical') {
				move.overrideOffensiveStat = 'spe';
			}
		},
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id === 'dedenne') return this.chainModify([pokemon.storedStats.spe, pokemon.storedStats.spa]);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Dedenne"],
		num: 0,
		desc: "If held by a Dedenne, uses Speed instead of Attack in damage calculation.",
	},
	delcattycrest: {
		name: "Delcatty Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) { // Initialize states
			if (pokemon.species.id !== 'delcatty') return;
			this.effectState.delcattyCrestAtk = 0;
			this.effectState.delcattyCrestDef = 0;
			this.effectState.delcattyCrestSpA = 0;
			this.effectState.delcattyCrestSpD = 0;
			this.effectState.delcattyCrestSpe = 0;
			for (const ally of pokemon.side.pokemon) {
				if (!ally.fainted && ally != pokemon) {
					this.effectState.delcattyCrestAtk += Math.floor(ally.storedStats.atk*0.1);
					this.effectState.delcattyCrestDef += Math.floor(ally.storedStats.def*0.1);
					this.effectState.delcattyCrestSpA += Math.floor(ally.storedStats.spa*0.1);
					this.effectState.delcattyCrestSpD += Math.floor(ally.storedStats.spd*0.1);
					this.effectState.delcattyCrestSpe += Math.floor(ally.storedStats.spe*0.1);
				}
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.species.id !== 'delcatty') return;
			return atk + this.effectState.delcattyCrestAtk;
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (pokemon.species.id !== 'delcatty') return;
			return def + this.effectState.delcattyCrestDef;
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id !== 'delcatty') return;
			return spa + this.effectState.delcattyCrestSpA;
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id !== 'delcatty') return;
			return spd + this.effectState.delcattyCrestSpD;
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (pokemon.species.id !== 'delcatty') return;
			return spe + this.effectState.delcattyCrestSpe;
		},
		onSwitchOut(pokemon) { //reset the sums
			if (pokemon.species.id !== 'delcatty') return;
			this.effectState.delcattyCrestAtk = 0;
			this.effectState.delcattyCrestDef = 0;
			this.effectState.delcattyCrestSpA = 0;
			this.effectState.delcattyCrestSpD = 0;
			this.effectState.delcattyCrestSpe = 0;
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Delcatty"],
		num: 0,
		desc: "If held by a Delcatty, +10% of all unfainted allies' stats.",
	},
	druddigoncrest: {
		name: "Druddigon Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, source, target, move){
			if (source.species.id !== 'druddigon') return;
			if (['Dragon', 'Fire'].includes(move.type)) {
				return this.chainModify(1.3)
			}
		},
		onTryHit(target, source, move) {
			if (target.species.id !== 'druddigon') return;
			if (target !== source && move.type === 'Fire' && move.category !== 'Status' && !this.suppressingAbility(target)) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] item: Druddigon Crest');
				}
				return null;
			}
		},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.species.id === 'druddigon' && ['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Druddigon"],
		num: 0,
		desc: "If held by a Druddigon, heals when hit by Fire-type attacks. x1.3 power to Dragon and Fire moves.",
	},
	dusknoircrest: {
		name: "Dusknoir Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, source, target, move) {
			if (source.species.id !== 'dusknoir') return;
			return this.chainModify(1.5)
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.species.id !== 'dusknoir') return;
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug('Base Power: ' + basePowerAfterMultiplier);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Dusknoir Crest boost');
				return this.chainModify(1.5);
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Dusknoir"],
		num: 0,
		desc: "If held by a Dusknoir, x1.5 attack, x1.5 power to moves under 60 BP.",
	},
	electrodecrest: {
		name: "Electrode Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSourceModifyDef(def, target, source) {
			if (source.species.id === 'electrode') return this.chainModify(0.5);
		},
		onModifyDef(def, pokemon) {
			if (pokemon.species.id === 'electrode') return def + Math.floor(pokemon.storedStats.spe / 10);
		},
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id === 'electrode') return spa + Math.floor(pokemon.storedStats.spe / 10);
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id === 'electrode') return spd + Math.floor(pokemon.storedStats.spe / 10);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Electrode"],
		num: 0,
		desc: "If held by an Electrode, halves foe's defense.",
	},
	empoleoncrest: {
		name: "Empoleon Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'empoleon') return;
			if (move.type === 'Ice') {
				move.forceSTAB = true;
			}
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (pokemon.species.id !== 'empoleon') return;
			if (this.field.isWeather(['hail', 'snowscape', 'snow']) || this.field.isBattlefield(['Icy Field', 'Snowy Mountain Field', 'Frozen Dimensional Field'])) {
				return this.chainModify(2)
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Empoleon"],
		num: 0,
		desc: "If held by an Empoleon, gains Ice STAB. x2 speed in hail/snow and icy fields.",
	},
	fearowcrest: {
		name: "Fearow Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.species.id !== 'fearow') return;
			const stabbing = ['hornattack', 'furyattack', 'poisonsting', 'twineedle', 'pinmissile', 'peck', 'drillpeck', 'megahorn', 'poisonjab', 'needlearm', 'pluck', 'drillrun', 'hornleech', 'fellstinger', 'smartstrike', 'branchpoke', 'glaciallance', 'gildedarrow', 'gildedhelix', 'quicksilverspear']
			if (stabbing.includes(move.id)) {
				return this.chainModify(1.5);
			}
		},
		onModifyCritRatio(critRatio, source) {
			if (source.species.id !== 'fearow') return;
			return critRatio + 1;
		},
		onModifyMove(move, source) {
			if (source.species.id !== 'fearow') return;
			if (move.id != 'furyattack') return;
			if (move.multihit && Array.isArray(move.multihit) && move.multihit.length) {
				move.multihit = move.multihit[1];
			}
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Fearow"],
		num: 0,
		desc: "If held by a Fearow, x1.5 to stabbing moves, +1 crit chance.",
	},
	furretcrest: {
		name: "Furret Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'furret') return;
				this.actions.useMove(this.dex.moves.get('substitute'), pokemon, {target: pokemon});
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Furret"],
		num: 0,
		desc: "If held by a Furret, uses Substitute on switch-in.",
	},
	feraligatrcrest: {
		name: "Feraligatr Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.species.id !== 'feraligatr') return;
			if (move.flags['bite']) {
				return this.chainModify(1.5);
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (pokemon.species.id !== 'feraligatr') return;
			if (pokemon.activeTurns <= 1 && move.category != 'Status') return priority + 2;
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Feraligatr"],
		num: 0,
		desc: "If held by a Feraligatr, +2 prio on first turn out. x1.5 power to biting moves.",
	},
	glaceoncrest: {
		name: "Glaceon Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onEffectivenessPriority: 1,
		onEffectiveness(typeMod, target, type, move) {
			if (target?.species.id !== 'glaceon') return;
			if (['Fighting', 'Rock'].includes(move.type)) return -1;
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Glaceon"],
		num: 0,
		desc: "If held by a Glaceon, resists Rock and Fighting-type moves.",
	},
	gothitellecrest: {
		name: "Gothitelle Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onPrepareHit(source, target, move) { //follows Libero without the switch limitation logic I think
			if (source.species.id !== 'gothitelle') return;
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			if (!['Dark', 'Psychic'].includes(move.type)) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.add('-start', source, 'typechange', type, '[from] item: Gothitelle Crest');
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'gothitelle') return;
			if (pokemon.hasType('Psychic')) this.heal(pokemon.baseMaxhp / 16);
		},
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id === 'gothitelle') return this.chainModify(1.25);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Gothitelle"],
		num: 0,
		desc: "If held by a Gothitelle, swaps between Dark and Psychic-type depending on move used. Heals 1/16th at end of turn.",
	},
	hypnocrest: {
		name: "Hypno Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id !== 'hypno') return;
			return this.chainModify(1.5);
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy, target, source) {
			if (source.species.id !== 'hypno') return;
			if (typeof accuracy === 'number') {
				return this.chainModify(1.5);
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Hypno"],
		num: 0,
		desc: "If held by a Hypno, x1.5 Sp.Atk, x1.5 accuracy.",
	},
	infernapecrest: {
		name: "Infernape Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) { //acts like IF stance change on switch in
			if (pokemon.species.id !== 'infernape') return;
			const stats = pokemon.storedStats;
			stats.atk = stats.def = Math.max(stats.atk, stats.def);
			stats.spa = stats.spd = Math.max(stats.spa, stats.spd);
			pokemon.storedStats = stats;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'infernape') return;
			this.heal(pokemon.baseMaxhp / 16);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Infernape"],
		num: 0,
		desc: "If held by an Infernape, recovers 1/16 Max HP at end of turn. Equalizes offenses and defenses.",
	},
	leafeoncrest: {
		name: "Leafeon Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onEffectivenessPriority: 1,
		onEffectiveness(typeMod, target, type, move) {
			if (target?.species.id !== 'leafeon') return;
			if (['Fire', 'Flying'].includes(move.type)) return -1;
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Leafeon"],
		num: 0,
		desc: "If held by a Leafeon, resists Fire and Flying-type moves.",
	},
	lediancrest: {
		name: "Ledian Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'ledian') return;
			if (move.flags.punch || move.id === 'stackingshot') {
				move.multihit = move.id === 'cometpunch' ? [8, 20] : 4;
			}
		},
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (source.species.id === 'ledian' && (move.flags.punch || move.id === 'stackingshot') && move.hit > 2) return [];
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Ledian"],
		num: 0,
		desc: "If held by a Ledian, punching moves hit 4 times in a row.",
	},
	luvdisccrest: {
		name: "Luvdisc Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onBasePower(basePower, source, target, move) {
			if (source.species.id !== 'luvdisc') return;
			const power = Math.min(source.happiness, 250);
			return Array.isArray(this.dex.moves.get(move.id).multihit) ? Math.max(1, Math.floor(power / 5)) : Math.max(1, power);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.species.id === 'luvdisc' && Array.isArray(move.multihit)) move.multihit = 5;
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Luvdisc"],
		num: 0,
		desc: "If held by a Luvdisc, basepower of moves matches happiness, capping at 250.",
	},
	luxraycrest: {
		name: "Luxray Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'luxray') return;
			if (move.type === 'Dark') {
				move.forceSTAB = true;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.species.id !== 'luxray') return;
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Luxray Crest weaken');
				return this.chainModify(0.5);
			}
		},
		onTryHit(target, source, move) {
			if (target.species.id !== 'luxray') return;
			if (target !== source && move.type === 'Psychic') {
				this.add('-immune', target, '[from] item: Luxray Crest');
				return null;
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (pokemon.species.id !== 'luxray') return;
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.species.id !== 'luxray') return;
			if (move.typeChangerBoosted === this.effect) return this.chainModify(1.2);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Luxray"],
		num: 0,
		desc: "If held by a Luxray, gains Galvanize effect, and Dark-type resistances and immunities.",
	},
	magcargocrest: {
		name: "Magcargo Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) { //TODO - check if they stay on switch out.
			if (pokemon.species.id !== 'magcargo') return;
			const stats = pokemon.storedStats;
			[stats.def, stats.spe] = [stats.spe, stats.def];
			pokemon.storedStats = stats;
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, source, target, move) {
			if (source.species.id !== 'magcargo') return;
			return this.chainModify(1.1);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Magcargo"],
		num: 0,
		desc: "If held by a Magcargo, Swaps Def. and Speed. x1.1 Sp.Atk.",
	},
	meganiumcrest: {
		name: "Meganium Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onAnyModifyDamage(damage, source, target, move) {
			if (this.effectState.target.species.id !== 'meganium') return;
			if (target === this.effectState.target || target.isAlly(this.effectState.target)) {
				this.debug('Meganium Crest weaken');
				return this.chainModify(0.80);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'meganium') return;
			for (const ally of pokemon.side.active) {
				if (ally?.hp) this.heal(ally.baseMaxhp / 16, ally, pokemon);
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Meganium"],
		num: 0,
		desc: "If held by a Meganium, user's side takes x0.8 damage and recovers 1/16 max HP every turn.",
	},
	noctowlcrest: {
		name: "Noctowl Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onDamagingHit(damage, target, source, effect) {
			if (target.species.id !== 'noctowl') return;
			this.boost({spd: 1});
		},
		onModifyDefPriority: 5,
		onModifyDef(def, source, target, move) {
			if (source.species.id !== 'noctowl') return;
			return this.chainModify(1.3);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Noctowl"],
		num: 0,
		desc: "If held by a Noctowl, raises user's Sp.Def when hit. x1.3 Def.",
	},
	oricoriocrest: {
		name: "Oricorio Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, source, target, move) {
			if (source.species.baseSpecies !== 'Oricorio') return;
			return this.chainModify(1.25);
		},
		onModifySpe(spe, source) {
			if (source.species.baseSpecies !== 'Oricorio') return;
			return this.chainModify(1.25);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Oricorio", "Oricorio-Pom-Pom", "Oricorio-Pa'u", "Oricorio-Sensu"],
		num: 0,
		desc: "If held by an Oricorio, x1.25 Sp.Atk and Speed.",
	},
	phionecrest: {
		name: "Phione Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyDefPriority: 5,
		onModifyDef(def, source, target, move) {
			if (source.species.id !== 'phione') return;
			return this.chainModify(1.5);
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, source, target, move) {
			if (source.species.id !== 'phione') return;
			return this.chainModify(1.5);
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'phione') return;
				this.actions.useMove(this.dex.moves.get('aquaring'), pokemon, {target: pokemon});
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Phione"],
		num: 0,
		desc: "If held by a Phione, x1.5 Def and Sp.Def. Summons Aqua Ring on switch-in.",
	},
	probopasscrest: { // Levitate effect implemented in scripts
		name: "Probopass Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (source.species.id !== 'probopass' || !move.totalDamage || !target?.hp) return;
			if (['steelnose', 'rocknose', 'electricnose'].includes(move.id)) return;
			for (const nose of ['steelnose', 'rocknose', 'electricnose']) {
				if (target.hp && source.hp) this.actions.useMove(nose, source, {target});
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Probopass"],
		num: 0,
		desc: "If held by a Probopass, gains Levitate. 20BP Steel/Rock/Electric-type move after damaging move.",
	},
	rampardoscrest: {
		name: "Rampardos Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (target.species.id !== 'rampardos') return;
			if (effect.id === 'recoil') {
				if (!this.activeMove) return;
				if (this.activeMove.id !== 'struggle') return null;
			}
			if (!target.itemState.activated && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add("-activate", target, "item: Rampardos Crest");
				target.itemState.activated = true;
				return target.hp - 1;
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Rampardos"],
		num: 0,
		desc: "If held by a Rampardos, survives at 1HP once per battle. Takes no recoil from recoil moves.",
	},
	relicanthcrest: {
		name: "Relicanth Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, source, target, move) {
			if (source.species.id !== 'relicanth') return;
			return this.chainModify(1.25);
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, source) {
			if (source.species.id !== 'relicanth') return;
			return this.chainModify(1.35);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Relicanth"],
		num: 0,
		desc: "If held by a Relicanth, x1.25 Atk, x1.35 Sp.Def.",
	},
	reunicluscrest: {
		name: "Reuniclus Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'reuniclus') return;
			pokemon.itemState.baseSpA = this.modify(pokemon.storedStats.spa, 1.25);
			pokemon.itemState.baseAtk = pokemon.storedStats.atk;
			pokemon.storedStats.spa = pokemon.itemState.baseSpA;
			const move = this.dex.moves.get(pokemon.moveSlots[0].id);
			if (move.category === 'Status') return;
			const physical = move.category === 'Physical';
			const type = physical ? 'Fighting' : 'Psychic';
			pokemon.storedStats.atk = physical ? pokemon.itemState.baseSpA : pokemon.itemState.baseAtk;
			pokemon.storedStats.spa = physical ? pokemon.itemState.baseAtk : pokemon.itemState.baseSpA;
			if (!pokemon.hasType(type) && pokemon.setType(type)) this.add('-start', pokemon, 'typechange', type, '[from] item: Reuniclus Crest');
		},
		onBeforeTurn(pokemon) {
			if (pokemon.species.id !== 'reuniclus') return;
			const action = this.queue.willMove(pokemon);
			if (!action) return;
			if (pokemon.transformed && !pokemon.itemState.baseSpA) {
				pokemon.itemState.baseSpA = this.modify(pokemon.storedStats.spa, 1.25);
				pokemon.itemState.baseAtk = pokemon.storedStats.atk;
			}
			const move = action.move;
			if (move.category === 'Status') return;
			const physical = move.category === 'Physical';
			const type = physical ? 'Fighting' : 'Psychic';
			pokemon.storedStats.atk = physical ? pokemon.itemState.baseSpA : pokemon.itemState.baseAtk;
			pokemon.storedStats.spa = physical ? pokemon.itemState.baseAtk : pokemon.itemState.baseSpA;
			if (!pokemon.hasType(type) && pokemon.setType(type)) this.add('-start', pokemon, 'typechange', type, '[from] item: Reuniclus Crest');
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Reuniclus"],
		num: 0,
		desc: "If held by a Reuniclus, swaps forms when using Physical or Special attacks.",
	},
	samurottcrest: {
		name: "Samurott Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'samurott') return;
			if (move.type === 'Fighting') {
				move.forceSTAB = true;
			}
			if (move.flags.slicing) {
				move.willCrit = true;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.species.id !== 'samurott') return;
			if (move.type === 'Dark' || move.type === 'Bug' || move.type === 'Rock') {
				this.debug('Samurott Crest weaken');
				return this.chainModify(0.5);
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Samurott"],
		num: 0,
		desc: "If held by a Samurott, gains Fighting-type STAB, resistances, and immunities. Slicing moves will always land a critical hit.",
	},
	sawsbuckcrest: {
		name: "Sawsbuck Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.baseSpecies !== 'Sawsbuck') return;
			switch (pokemon.species.name) {
				case 'Sawsbuck-Summer':
					pokemon.itemState.type = 'Fire'
					break;
				case 'Sawsbuck-Autumn':
					pokemon.itemState.type = 'Ground'
					break;
				case 'Sawsbuck-Winter':
					pokemon.itemState.type = 'Ice'
					break;
				default:
					pokemon.itemState.type = 'Water'
					break;
				}
			pokemon.setType([pokemon.itemState.type, 'Grass'])
		},
		onBasePower(basePower, source, target, move) {
			if (source.species.baseSpecies !== 'Sawsbuck') return;
			if (move.typeChangerBoosted === this.effect) {
				return this.chainModify(1.2)
			}
		},
		onModifyType(move, pokemon) {
			if (pokemon.species.baseSpecies === 'Sawsbuck' && move.type === 'Normal' && pokemon.itemState.type) {
				move.type = pokemon.itemState.type;
				move.typeChangerBoosted = this.effect;
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Sawsbuck", "Sawsbuck-Summer", "Sawsbuck-Autumn", "Sawsbuck-Winter"],
		num: 0,
		desc: "If held by a Sawsbuck, changes type depending on form.",
	},
	sevipercrest: {
		name: "Seviper Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.species.id !== 'seviper') return;
			return this.chainModify(1.5)
		},
		onBasePower(basePower, source, target, move) {
			if (source.species.id !== 'seviper') return;
			const dmgMult = 1 + Math.floor(50 * target.hp / target.maxhp) / 100;
			return this.chainModify(dmgMult)
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Seviper"],
		num: 0,
		desc: "If held by a Seviper, x1.5 Speed, damage boosted by 1% for each 2% HP the foe has left.",
	},
	shiinoticcrest: {
		name: "Shiinotic Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onResidualOrder: 8,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'shiinotic') return;
			for (const target of pokemon.adjacentFoes()) {
				if (target.status) {
					const damage = this.damage(target.baseMaxhp / 16, target, pokemon);
					if (damage) {
						this.heal(damage, pokemon, target, 'drain');
					}
				}
			}
		},
		onTryHeal(amount, target, source, effect) {
			if (target.species.id === 'shiinotic' && ['drain', 'leechseed', 'strengthsap'].includes(effect.id)) return this.chainModify(1.3);
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'shiinotic') return;
			for (const ally of pokemon.adjacentAllies()) ally.addVolatile('spotlight', pokemon);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Shiinotic"],
		num: 0,
		desc: "If held by a Shiinotic, drains health from status'd foes.",
	},
	simipourcrest: {
		name: "Simipour Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'simipour') return;
			if (move.type === 'Grass') {
				move.forceSTAB = true;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.species.id !== 'simipour') return;
			if (move.type === 'Grass' || move.type === 'Water' || move.type === 'Electric' || move.type === 'Ground') {
				this.debug('Simipour Crest weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (pokemon.species.id !== 'simipour') return;
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Grass';
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, source, target, move) {
			if (source.species.id !== 'simipour') return;
			return this.chainModify(1.2);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, source, target, move) {
			if (source.species.id !== 'simipour') return;
			return this.chainModify(1.2);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Simipour"],
		num: 0,
		desc: "If held by a Simipour, gains Grass-type STAB and resistances, Atk. and Sp.Atk are x1.2.",
	},
	simisagecrest: {
		name: "Simisage Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'simisage') return;
			if (move.type === 'Fire') {
				move.forceSTAB = true;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.species.id !== 'simisage') return;
			if (move.type === 'Fire' || move.type === 'Grass' || move.type === 'Bug' || move.type === 'Steel' || move.type === 'Fairy' || move.type === 'Ice') {
				this.debug('Simisage Crest weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (pokemon.species.id !== 'simisage') return;
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fire';
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, source, target, move) {
			if (source.species.id !== 'simisage') return;
			return this.chainModify(1.2);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, source, target, move) {
			if (source.species.id !== 'simisage') return;
			return this.chainModify(1.2);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Simisage"],
		num: 0,
		desc: "If held by a Simisage, gains Fire-type STAB and resistances, Atk. and Sp.Atk are x1.2.",
	},
	simisearcrest: {
		name: "Simisear Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'simisear') return;
			if (move.type === 'Water') {
				move.forceSTAB = true;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.species.id !== 'simisear') return;
			if (move.type === 'Water' || move.type === 'Ice' || move.type === 'Fire' || move.type === 'Steel') {
				this.debug('Simisear Crest weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (pokemon.species.id !== 'simisear') return;
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && !noModifyType.includes(move.id) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Water';
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, source, target, move) {
			if (source.species.id !== 'simisear') return;
			return this.chainModify(1.2);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, source, target, move) {
			if (source.species.id !== 'simisear') return;
			return this.chainModify(1.2);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Simisear"],
		num: 0,
		desc: "If held by a Simisear, gains Water-type STAB and resistances, Atk. and Sp.Atk are x1.2.",
	},
	skuntankcrest: {
		name: "Skuntank Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target.species.id !== 'skuntank') return;
			if (target !== source && move.type === 'Ground' && !this.suppressingAbility(target)) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] item: Skuntank Crest');
				}
				return null;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, source, target, move) {
			if (source.species.id !== 'skuntank') return;
			return this.chainModify(1.2);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, source, target, move) {
			if (source.species.id !== 'skuntank') return;
			return this.chainModify(1.2);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Skuntank"],
		num: 0,
		desc: "If held by a Skuntank, if hit by Ground-type move raises Atk by 1 stage. Immune to Ground-type attacks. x1.2 Atk and Sp.Atk.",
	},
	spiritombcrest: {
		name: "Spiritomb Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.species.id !== 'spiritomb') return;
			const fallen = attacker.side.pokemon.filter(ally => ally.fainted).length;
			this.debug('Spiritomb Crest boost');
			return this.chainModify(1 + fallen/5);
		},
		onResidualOrder: 8,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'spiritomb') return;
				this.heal(pokemon.baseMaxhp * pokemon.side.foe.pokemon.filter(foe => foe.fainted).length / 20);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Spiritomb"],
		num: 0,
		desc: "If held by a Spiritomb, +20% power boost per fainted ally. Heals 1/20th per fainted foe.",
	},
	stantlercrest: {
		name: "Stantler Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (!['stantler', 'wyrdeer'].includes(pokemon.species.id)) return;
			return this.chainModify(1.5);
		},
		onSourceModifyAccuracyPriority: -2,
		onSourceModifyAccuracy(accuracy, target, source) {
			if (!['stantler', 'wyrdeer'].includes(source.species.id)) return;
			if (typeof accuracy === 'number') {
				return this.chainModify(1.5);
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Stantler", "Wyrdeer"],
		num: 0,
		desc: "If held by a Stantler or Wyrdeer, x1.5 Atk and x1.5 accuracy.",
	},
	swalotcrest: { //Belch interaction coded into Belch move
		name: "Swalot Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onAfterMove(source, target, move) {
			if (source.species.id !== 'swalot') return;
			if (source.volatiles['stockpile']?.layers >= 3) return;
			if (['spitup', 'swallow', 'stockpile', 'belch'].includes(move.id)) return;
			this.actions.useMove(this.dex.moves.get('stockpile'), source, {target: source});
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Swalot"],
		num: 0,
		desc: "If held by a Swalot, will attempt to use Stockpile after moving.",
	},
	thievulcrest: {
		name: "Thievul Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'thievul') return;
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-item', pokemon, 'Thievul Crest', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
			this.boost({spa: 1}, pokemon)
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Thievul"],
		num: 0,
		desc: "If held by a Thievul, lowers foe(s) Sp.Atk by 1 stage. Raises user's Sp.Atk by 1 stage.",
	},
	torterracrest: {
		name: "Torterra Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onEffectivenessPriority: 1, //taken from Inverse Mod
		onEffectiveness(typeMod, target, type, move) {
			if (target?.species.id !== 'torterra') return;
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (!target.runImmunity(move.type)) return;
			if (move && !this.dex.getImmunity(move, type)) return 1;
			// Ignore normal effectiveness, prevents bug with Tera Shell
			if (typeMod) return -typeMod;
		},
		onAfterMoveSecondarySelfPriority: -1,
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (pokemon.species.id !== 'torterra') return;
			if (move.totalDamage && !pokemon.forceSwitchFlag) {
				this.heal(move.totalDamage / 8, pokemon);
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Torterra"],
		num: 0,
		desc: "If held by a Torterra, inverts type resistances and weaknesses for itself, not immunities. Gains Shell Bell effect.",
	},
	typhlosioncrest: {
		name: "Typhlosion Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.id !== 'typhlosion') return;
			if (move.category === 'Physical') {
				move.overrideOffensiveStat = 'spa';
			}
			if (move.flags.contact && !move.multihit && move.category !== 'Status') {
				move.multihit = 2;
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.species.id !== 'typhlosion') return;
			if (move.flags.contact && move.hit === 2 && !this.dex.moves.get(move.id).multihit) return this.chainModify(0.3);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Typhlosion"],
		num: 0,
		desc: "If held by a Typhlosion, uses Sp.Atk instead of Attack in damage calculation. Contact moves hit twice.",
	},
	vespiquencrest: {
		name: "Vespiquen Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'vespiquen') return;
			this.boost({atk: 1, spa: 1}, pokemon)
			pokemon.itemState.stance = 'attack';
		},
		onBeforeMove(source, target, move) {
			if (source.species.id !== 'vespiquen') return;
			if (['defendorder', 'healorder'].includes(move.id) && source.itemState.stance === 'attack') {
				this.debug('Enter defense stance')
				this.boost({def: 1, spd: 1, atk: -1, spa: -1}, source)
				source.itemState.stance = 'defense';
			}
			if (move.category != 'Status' && source.itemState.stance === 'defense') {
				this.debug('Enter attack stance from defense')
				this.boost({def: -1, spd: -1, atk: 1, spa: 1}, source)
				source.itemState.stance = 'attack';
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'vespiquen') return;
			if (move.id === 'attackorder') {
				move.volatileStatus = 'partiallytrapped';
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'vespiquen') return;
			if (pokemon.itemState.stance != 'defense') return;
			this.heal(pokemon.baseMaxhp / 16);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Vespiquen"],
		num: 0,
		desc: "If held by a Vespiquen, will swap stance when using Heal Order or Defend Order and attacking moves.",
	},
	whiscashcrest: {
		name: "Whiscash Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target.species.id !== 'whiscash') return;
			if (target !== source && move.type === 'Grass' && !this.suppressingAbility(target)) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] item: Whiscash Crest');
				}
				return null;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, source, target, move) {
			if (source.species.id !== 'whiscash') return;
			return this.chainModify(1.2);
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, source, target, move) {
			if (source.species.id !== 'whiscash') return;
			return this.chainModify(1.2);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Whiscash"],
		num: 0,
		desc: "If held by a Whiscash, +1 Atk when hit by Grass-type move. Immune to Grass-type moves. x1.2 Atk and Sp.Atk.",
	},
	zangoosecrest: {
		name: "Zangoose Crest",
		spritenum: -6,
		onStart(target) {
			if (target.species.id !== 'zangoose') return;
			target.trySetStatus('psn', target);
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'zangoose') return;
			pokemon.trySetStatus('psn', pokemon);
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (target.species.id !== 'zangoose') return;
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Zangoose"],
		num: 0,
		desc: "If held by a Zangoose, poisons user and restors HP if user is poisoned.",
	},
	zoroarkcrest: {
		name: "Zoroark Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) {
			if (!pokemon.illusion || !pokemon.getItem().itemUser?.includes(pokemon.species.name)) return;
			const ability = pokemon.illusion.ability;
			if (['multitype', 'comatose', 'disguise', 'schooling', 'resuscitation', 'prismpower', 'rkssystem', 'imposter',
				'shieldsdown', 'powerofalchemy', 'receiver', 'forecast', 'flowergift', 'illusion', 'wonderguard', 'zenmode',
				'powerconstruct', 'iceface', 'neutralizinggas', 'hadronengine', 'orichalcumpulse'].includes(ability)) return;
			if (pokemon.addVolatile('ability:' + ability, pokemon)) pokemon.itemState.disguiseAbility = ability;
		},
		onUpdate(pokemon) {
			if (!pokemon.illusion && pokemon.itemState.disguiseAbility) {
				pokemon.removeVolatile('ability:' + pokemon.itemState.disguiseAbility);
				delete pokemon.itemState.disguiseAbility;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getItem().itemUser?.includes(pokemon.species.name) && pokemon.illusion?.hasType(move.type)) move.forceSTAB = true;
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Zoroark", "Zoroark-Hisui"],
		num: 0,
		desc: "If held by a Zoroark, takes on ability and STAB types of Pokémon it is disguised as.",
	},

	celebicrest: {
		name: "Celebi Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Celebi"],
		num: 0,
		desc: "While Celebi is active, end-of-turn effects run twice.",
	},
	enteicrest: {
		name: "Entei Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onModifyMove(move, pokemon) {
			if (pokemon.species.id !== 'entei' || move.type !== 'Fire' || move.category === 'Status') return;
			move.target = 'allAdjacentFoes';
			if (move.id === 'sacredfire' && pokemon.adjacentFoes().length > 1) {
				for (const secondary of move.secondaries || []) {
					if (secondary.status === 'brn') secondary.chance = 25;
				}
			}
		},
		onBasePower(basePower, source) {
			if (source.species.id === 'entei') return this.chainModify([1000 + this.clampIntRange(source.hp, 300, 500), 1000]);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Entei"],
		num: 0,
		desc: "Entei boosts its moves by 30–50% based on current HP. Its Fire attacks hit adjacent foes.",
	},
	flygoncrest: {
		name: "Flygon Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onAllyBasePower(basePower, source, target, move) {
			if (this.effectState.target.species.id === 'flygon' && move.flags.sound) return this.chainModify(1.5);
		},
		onAllyTryHit(target, source, move) {
			if (this.effectState.target.species.id === 'flygon' && source !== target && target.isAlly(source) && move.flags.sound) return null;
		},
		onModifyMove(move, pokemon) {
			if (pokemon.species.id === 'flygon' && move.flags.sound) move.overrideOffensiveStat = 'atk';
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Flygon"],
		num: 0,
		desc: "Flygon and its allies boost sound moves by 50% and avoid allied sound attacks. Flygon uses Attack for sound moves.",
	},
	minuncrest: {
		name: "Minun Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onAnyModifyDamage(power, source, target, move) {
			const holder = this.effectState.target;
			if (holder.species.id === 'minun' && holder.isAlly(target) && move.category === 'Physical') return this.chainModify(0.67);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Minun"],
		num: 0,
		desc: "Activates Minus and modifies physical damage for the holder and its allies.",
	},
	pluslecrest: {
		name: "Plusle Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onAllyBasePower(power, source, target, move) {
			const holder = this.effectState.target;
			if (holder.species.id === 'plusle' && holder.isAlly(source) && move.category === 'Physical') return this.chainModify(1.33);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Plusle"],
		num: 0,
		desc: "Activates Plus and modifies physical damage for the holder and its allies.",
	},
	raikoucrest: {
		name: "Raikou Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onAllySetStatus(status, target) {
			if (this.effectState.target.species.id === 'raikou' && status.id === 'slp' && target.isGrounded()) return false;
		},
		onAllyBasePower(basePower, source, target, move) {
			if (this.effectState.target.species.id !== 'raikou' || this.field.terrain === 'electricterrain') return;
			const terrain = this.dex.moves.get('electricterrain').condition;
			return terrain?.onBasePower?.call(this, basePower, source, target, move);
		},
		onAnyEffectiveness(typeMod, target, type, move) {
			const holder = this.effectState.target;
			if (holder.species.id !== 'raikou' || this.field.terrain === 'electricterrain' || !this.activePokemon?.isAlly(holder)) return;
			return this.dex.moves.get('electricterrain').condition?.onEffectiveness?.call(this, typeMod, target, type, move);
		},
		onAllyModifyMove(move, pokemon, target) {
			if (this.effectState.target.species.id !== 'raikou' || this.field.terrain === 'electricterrain') return;
			this.dex.moves.get('electricterrain').condition?.onModifyMove?.call(this, move, pokemon, target);
		},
		onAllyTryAddVolatile(status, target) {
			if (this.effectState.target.species.id === 'raikou' && status.id === 'yawn' && target.isGrounded()) return false;
		},
		onResidualOrder: 1,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'raikou' || this.field.isWeather(['raindance', 'primordialsea'])) return;
			for (const ally of pokemon.alliesAndSelf()) {
				if (ally.effectiveWeather() === 'raindance') {
					this.singleEvent('Weather', ally.getAbility(), ally.abilityState, ally, null, this.dex.conditions.get('raindance'));
				}
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Raikou"],
		num: 0,
		desc: "Raikou and its allies act as if rain and Electric Terrain are active.",
	},
	suicunecrest: {
		name: "Suicune Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id === 'suicune' && pokemon.side.addSideCondition('tailwind', pokemon)) {
				pokemon.side.sideConditions['tailwind'].duration = 1;
			}
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Suicune"],
		num: 0,
		desc: "Suicune ignores the effects of major status and sets Tailwind for one turn on entry.",
	},
	sunfloracrest: {
		name: "Sunflora Crest",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onResidualOrder: 5,
		onResidual(pokemon) {
			if (pokemon.species.id === 'sunflora') this.heal(pokemon.baseMaxhp / 10);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Sunflora"],
		num: 0,
		desc: "Sunflora acts as if sun is active and heals 10% of its max HP each turn.",
	},
	goldenapple: {
		name: "Golden Apple",
		spritenum: -6,
		onStart(pokemon) {
			const item = pokemon.getItem();
			if (item.itemUser?.includes(pokemon.species.name)) this.add('-item', pokemon, item.name);
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.baseSpecies !== 'Zorua') return;
			const evolution = this.dex.species.get(pokemon.species.id === 'zoruahisui' ? 'Zoroark-Hisui' : 'Zoroark');
			const stats = this.spreadModify(evolution.baseStats, pokemon.set);
			for (const stat of ['atk', 'def', 'spa', 'spd', 'spe'] as const) pokemon.storedStats[stat] = stats[stat];
			pokemon.hp = Math.ceil(pokemon.hp * stats.hp / pokemon.maxhp);
			pokemon.maxhp = pokemon.baseMaxhp = stats.hp;
			if (!pokemon.illusion || !pokemon.getItem().itemUser?.includes(pokemon.species.name)) return;
			const ability = pokemon.illusion.ability;
			if (['multitype', 'comatose', 'disguise', 'schooling', 'resuscitation', 'prismpower', 'rkssystem', 'imposter',
				'shieldsdown', 'powerofalchemy', 'receiver', 'forecast', 'flowergift', 'illusion', 'wonderguard', 'zenmode',
				'powerconstruct', 'iceface', 'neutralizinggas', 'hadronengine', 'orichalcumpulse'].includes(ability)) return;
			if (pokemon.addVolatile('ability:' + ability, pokemon)) pokemon.itemState.disguiseAbility = ability;
		},
		onUpdate(pokemon) {
			if (!pokemon.illusion && pokemon.itemState.disguiseAbility) {
				pokemon.removeVolatile('ability:' + pokemon.itemState.disguiseAbility);
				delete pokemon.itemState.disguiseAbility;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.getItem().itemUser?.includes(pokemon.species.name) && pokemon.illusion?.hasType(move.type)) move.forceSTAB = true;
		},
		onModifyDef(def, pokemon) {
			if (pokemon.species.id === 'pangoro') return this.chainModify(1.3);
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id === 'pangoro') return this.chainModify(1.3);
		},
		onAnyBasePower(basePower, source, target, move) {
			const holder = this.effectState.target;
			if (holder.species.id !== 'pangoro' || move.type !== 'Dark' || move.category === 'Status' || source === target) return;
			if (this.getAllActive().some(p => p.hasAbility('darkaura'))) return;
			move.auraBooster ||= holder;
			if (move.auraBooster === holder) return this.chainModify([move.hasAuraBreak ? 3072 : 5448, 4096]);
		},
		onTakeItem(item, pokemon) {
			return !item.itemUser?.includes(pokemon.species.name);
		},
		itemUser: ["Zorua", "Zorua-Hisui", "Pangoro"],
		num: 0,
		desc: "Zorua uses its evolution’s stats and copies its disguise’s ability and STAB. Pangoro gains Dark Aura and 30% higher defenses.",
	},
	// Mega Stones
	alcremite: {
		name: "Alcremite",
		spritenum: -6,
		megaStone: { "Alcremie": "Alcremie-Mega" },
		itemUser: ["Alcremie"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by an Alcremie, this item allows it to Mega Evolve in battle.",
	},
	appletunite: {
		name: "Appletunite",
		spritenum: -6,
		megaStone: { "Appletun": "Appletun-Mega" },
		itemUser: ["Appletun"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by an Appletun, this item allows it to Mega Evolve in battle.",
	},
	blastoisiniteg: {
		name: "Blastoisinite G",
		spritenum: -6,
		megaStone: { "Blastoise": "Blastoise-Mega-G" },
		itemUser: ["Blastoise"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Blastoise, this item allows it to Mega Evolve in battle.",
	},
	butterfreenite: {
		name: "Butterfreenite",
		spritenum: -6,
		megaStone: { "Butterfree": "Butterfree-Mega" },
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
	},
	centiskorchite: {
		name: "Centiskorchite",
		spritenum: -6,
		megaStone: { "Centiskorch": "Centiskorch-Mega" },
		itemUser: ["Centiskorch"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Centiskorch, this item allows it to Mega Evolve in battle.",
	},
	charizarditeg: {
		name: "Charizardite G",
		spritenum: -6,
		megaStone: { "Charizard": "Charizard-Mega-G" },
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Charizard, this item allows it to Mega Evolve in battle.",
	},
	cinderacite: {
		name: "Cinderacite",
		spritenum: -6,
		megaStone: { "Cinderace": "Cinderace-Mega" },
		itemUser: ["Cinderace"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Cinderace, this item allows it to Mega Evolve in battle.",
	},
	coalossalite: {
		name: "Coalossalite",
		spritenum: -6,
		megaStone: { "Coalossal": "Coalossal-Mega" },
		itemUser: ["Coalossal"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Coalossal, this item allows it to Mega Evolve in battle.",
	},
	copperajite: {
		name: "Copperajite",
		spritenum: -6,
		megaStone: { "Copperajah": "Copperajah-Mega" },
		itemUser: ["Copperajah"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Copperajah, this item allows it to Mega Evolve in battle.",
	},
	corviknite: {
		name: "Corviknite",
		spritenum: -6,
		megaStone: { "Corviknight": "Corviknight-Mega" },
		itemUser: ["Corviknight"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Corviknight, this item allows it to Mega Evolve in battle.",
	},
	drednawtite: {
		name: "Drednawtite",
		spritenum: -6,
		megaStone: { "Drednaw": "Drednaw-Mega" },
		itemUser: ["Drednaw"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
	},
	duraludonite: {
		name: "Duraludonite",
		spritenum: -6,
		megaStone: { "Duraludon": "Duraludon-Mega" },
		itemUser: ["Duraludon"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Duraludon, this item allows it to Mega Evolve in battle.",
	},
	eeveetite: {
		name: "Eeveetite",
		spritenum: -6,
		megaStone: { "Eevee": "Eevee-Mega-G" },
		itemUser: ["Eevee"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by an Eevee, this item allows it to Mega Evolve in battle.",
	},
	flappletite: {
		name: "Flappletite",
		spritenum: -6,
		megaStone: { "Flapple": "Flapple-Mega" },
		itemUser: ["Flapple"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Flapple, this item allows it to Mega Evolve in battle.",
	},
	garbodornite: {
		name: "Garbodornite",
		spritenum: -6,
		megaStone: { "Garbodor": "Garbodor-Mega" },
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Garbodor, this item allows it to Mega Evolve in battle.",
	},
	gengariteg: {
		name: "Gengarite G",
		spritenum: -6,
		megaStone: { "Gengar": "Gengar-Mega-G" },
		itemUser: ["Gengar"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Gengar, this item allows it to Mega Evolve in battle.",
	},
	grimmsnarlite: {
		name: "Grimmsnarlite",
		spritenum: -6,
		megaStone: { "Grimmsnarl": "Grimmsnarl-Mega" },
		itemUser: ["Grimmsnarl"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Grimmsnarl, this item allows it to Mega Evolve in battle.",
	},
	hatterenite: {
		name: "Hatterenite",
		spritenum: -6,
		megaStone: { "Hatterene": "Hatterene-Mega" },
		itemUser: ["Hatterene"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Hatterene, this item allows it to Mega Evolve in battle.",
	},
	inteleonite: {
		name: "Inteleonite",
		spritenum: -6,
		megaStone: { "Inteleon": "Inteleon-Mega" },
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by an Inteleon, this item allows it to Mega Evolve in battle.",
	},
	kinglerite: {
		name: "Kinglerite",
		spritenum: -6,
		megaStone: { "Kingler": "Kingler-Mega" },
		itemUser: ["Kingler"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Kingler, this item allows it to Mega Evolve in battle.",
	},
	laprasite: {
		name: "Laprasite",
		spritenum: -6,
		megaStone: { "Lapras": "Lapras-Mega" },
		itemUser: ["Lapras"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Lapras, this item allows it to Mega Evolve in battle.",
	},
	machampite: {
		name: "Machampite",
		spritenum: -6,
		megaStone: { "Machamp": "Machamp-Mega" },
		itemUser: ["Machamp"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Machamp, this item allows it to Mega Evolve in battle.",
	},
	melmetalite: {
		name: "Melmetalite",
		spritenum: -6,
		megaStone: { "Melmetal": "Melmetal-Mega" },
		itemUser: ["Melmetal"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Melmetal, this item allows it to Mega Evolve in battle.",
	},
	meowthite: {
		name: "Meowthite",
		spritenum: -6,
		megaStone: { "Meowth": "Meowth-Mega" },
		itemUser: ["Meowth"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Meowth, this item allows it to Mega Evolve in battle.",
	},
	orbeetlenite: {
		name: "Orbeetlenite",
		spritenum: -6,
		megaStone: { "Orbeetle": "Orbeetle-Mega" },
		itemUser: ["Orbeetle"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by an Orbeetle, this item allows it to Mega Evolve in battle.",
	},
	pikachutite: {
		name: "Pikachutite",
		spritenum: -6,
		megaStone: { "Pikachu": "Pikachu-Mega" },
		itemUser: ["Pikachu"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Pikachu, this item allows it to Mega Evolve in battle.",
	},
	rillaboomite: {
		name: "Rillaboomite",
		spritenum: -6,
		megaStone: { "Rillaboom": "Rillaboom-Mega" },
		itemUser: ["Rillaboom"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Rillaboom, this item allows it to Mega Evolve in battle.",
	},
	sandacondite: {
		name: "Sandacondite",
		spritenum: -6,
		megaStone: { "Sandaconda": "Sandaconda-Mega" },
		itemUser: ["Sandaconda"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Sandaconda, this item allows it to Mega Evolve in battle.",
	},
	snorlaxite: {
		name: "Snorlaxite",
		spritenum: -6,
		megaStone: { "Snorlax": "Snorlax-Mega" },
		itemUser: ["Snorlax"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Snorlax, this item allows it to Mega Evolve in battle.",
	},
	toxtricitite: {
		name: "Toxtricitite",
		spritenum: -6,
		megaStone: { "Toxtricity": "Toxtricity-Mega" },
		itemUser: ["Toxtricity"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Toxtricity, this item allows it to Mega Evolve in battle.",
	},
	venusauriteg: {
		name: "Venusaurite G",
		spritenum: -6,
		megaStone: { "Venusaur": "Venusaur-Mega-G" },
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 0,
		desc: "If held by a Venusaur, this item allows it to Mega Evolve in battle.",
	},
	urshifite: {
		name: "Urshifite",
		spritenum: -6,
		megaStone: { "Urshifu": "Urshifu-Mega" },
		itemUser: ["Urshifu"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.name] && source.baseSpecies.requiredItem !== item.name;
		},
		num: 0,
		desc: "If held by an Urshifu, this item allows it to Mega Evolve in battle.",
	},
	urshifiterapidstrike: {
		name: "Urshifite (Rapid Strike)",
		spritenum: -6,
		megaStone: { "Urshifu-Rapid-Strike": "Urshifu-Rapid-Strike-Mega" },
		itemUser: ["Urshifu-Rapid-Strike"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.name] && source.baseSpecies.requiredItem !== item.name;
		},
		num: 0,
		desc: "If held by an Urshifu-Rapid-Strike, this item allows it to Mega Evolve in battle.",
	},
	interceptiumzparagon: {
		name: "Interceptium Z (Paragon)",
		spritenum: 0,
		onTakeItem: false,
		zMove: true,
		zMoveType: "Interceptiumzparagon",
		num: 0,
		desc: "Allows for Paragon-route Interceptium Z moves.",
	},
	interceptiumzrenegade: {
		name: "Interceptium Z (Renegade)",
		spritenum: 0,
		onTakeItem: false,
		zMove: true,
		zMoveType: "Interceptiumzrenegade",
		num: 0,
		desc: "Allows for Renegade-route Interceptium Z moves.",
	},
};
export const Items: import('../../../sim/dex-items').ModdedItemDataTable = Dex.deepClone(ModItems);
