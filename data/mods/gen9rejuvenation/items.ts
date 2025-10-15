const {Dex} = require('../../../sim/dex');
export const ModItems: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Modded
	cellbattery: {
		inherit: true,
		onSwitchIn(pokemon) {
			if (this.field.isTerrain('electricterrain')) pokemon.useItem();
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
				return this.field.isTerrain('grassyterrain')? this.chainModify(1.6) : this.chainModify(1.3);
			}
		},
		gen: undefined
	},
	// Additions
	magicalseed: {
		name: "Magical Seed",
		spritenum: -6,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('psychicterrain') ||
				this.field.isBattlefield(['darkcrystalcavernfield','rainbowfield','crystalcavernfield','blessedfield','fairytalefield','starlightarenafield','newworldfield','inversefield','dimensionalfield','hauntedfield','bewitchedwoodsfield'])) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain('psychicterrain')) {
				pokemon.useItem();
			}
		},
		onBattlefieldChange(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isBattlefield(['darkcrystalcavernfield','rainbowfield','crystalcavernfield','blessedfield','fairytalefield','starlightarenafield','newworldfield','inversefield','dimensionalfield','hauntedfield','bewitchedwoodsfield'])) {
				pokemon.useItem();
			}
		},
		onUseItem(item, pokemon) {
			if (this.field.isTerrain('psychicterrain')) {
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
				this.add('-start', pokemon, 'typechange', 'Normal');
				pokemon.setAbility('normalize')
				this.add('-ability', pokemon, 'Normalize', '[from] item: Magical Seed');
			}
			if (this.field.isBattlefield('dimensionalfield')) {
				this.boost({def: 1});
				this.actions.useMove('trickroom', pokemon, {target: pokemon});
			}
			if (this.field.isBattlefield('hauntedfield')) {
				this.boost({def: 1, spd: 1});
				pokemon.trySetStatus('brn', pokemon);
			}
		},
		num: 0,
		desc: "Provides boost in magical fields.",
	},
	elementalseed: {
		name: "Elemental Seed",
		spritenum: -6,
		fling: {
			basePower: 10,
		},
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain(['electricterrain', 'grassyterrain', 'mistyterrain']) ||
				this.field.isBattlefield(['volcanicfield', 'corrosivemistfield','icyfield', 'watersurfacefield','underwaterfield','murkwatersurfacefield','dragonsdenfield','frozendimensionalfield','skyfield','infernalfield'])) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isTerrain(['electricterrain', 'grassyterrain', 'mistyterrain'])) {
				pokemon.useItem();
			}
		},
		onBattlefieldChange(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isBattlefield(['volcanicfield', 'corrosivemistfield','icyfield', 'watersurfacefield','underwaterfield','murkwatersurfacefield','dragonsdenfield','frozendimensionalfield','skyfield','infernalfield'])) {
				pokemon.useItem();
			}
		},
		onUseItem(item, pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				this.boost({spe: 1})
				pokemon.addVolatile('charge')
			}
			if (this.field.isTerrain('grassyterrain')) {
				this.boost({def: 1})
				pokemon.addVolatile('ingrain')
			}
			if (this.field.isTerrain('mistyterrain')) {
				this.boost({spd: 1})
				this.actions.useMove('wish', pokemon, {target: pokemon})
			}
			if (this.field.isBattlefield('volcanicfield')) {
				this.boost({atk: 1, spa: 1, spe: 1})
				this.actions.useMove('firespin', pokemon, {target: pokemon})
			}
			if (this.field.isBattlefield('corrosivemistfield')) {
				this.boost({atk: 1, spa: 1})
				pokemon.trySetStatus('tox', pokemon)
			}
			if (this.field.isBattlefield('icyfield')) {
				this.boost({spe: 2})
				pokemon.damage(pokemon.baseMaxhp/8);
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
	amuletcoin: { 
		name: "Amulet Coin",
		spritenum: -6,
		num: 0,
		onSetStatus(status, target, source, effect) {
			if (this.field.isTerrain('dragonsdenfield')) {
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
				['Electric', 'Ice'].includes(move.type) ? this.chainModify(1.2) : this.chainModify(1.5);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (source.species.id !== 'ampharosaevian') return;
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Crest neutralize');
				return this.chainModify(0.70);
			}
		},
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onTakeItem: false,
		itemUser: ["Ampharos-Aevian"],
		num: 0,
		desc: "If held by an Ampharos-Aevian, the move in its first moveslot will be boosted by x1.2 if Electric or Ice-type, x1.5 otherwise. Reduces damage taken from Super-effective attacks by 30%.",
	},
	ariadoscrest: {
		name: "Ariados Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
		onTakeItem: false,
		itemUser: ["Ariados"],
		num: 0,
		desc: "If held by an Ariados, x1.5 speed. Always lands critical hits against slowed or poisoned foes.",
	},
	bastiodoncrest: {
		name: "Bastiodon Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (target.species.id !== 'bastiodon') return;
			if (move.totalDamage && move.category != 'Status') {
				this.damage(damage/2, target, source);
				this.heal(move.totalDamage / 8, target);
			}
		},
		onTakeItem: false,
		itemUser: ["Bastiodon"],
		num: 0,
		desc: "If held by a Bastiodon, foe takes 50% recoil from hit, and user heals for the same value.",
	},
	beheeyemcrest: {
		name: "Beheeyem Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (source.species.id !== 'beheeyem') return;
			if (source.volatiles['disable']) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
					source.addVolatile('disable', this.effectState.target);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.species.id !== 'beheeyem') return;
			if (this.queue.willMove(target)) {
				this.debug('Crest neutralize');
				return this.chainModify(0.66);
			}
		},
		onTakeItem: false,
		itemUser: ["Beheeyem"],
		num: 0,
		desc: "If held by a Beheeyem, takes x0.66 damage if it hasn't moved yet. Disables moves that hit the user.",
	},
	boltundcrest: {
		name: "Boltund Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.species.id !== 'boltund') return;
			if (move.flags['bite'] && this.queue.willMove(defender)) {
				return this.chainModify(1.5);
			}
		},
		onTakeItem: false,
		itemUser: ["Boltund"],
		num: 0,
		desc: "If held by a Boltund, x1.5 power to biting moves if user moves before foe.",
	},
	castformcrest: {
		name: "Castform Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.id !== 'castform') return;
			for (const moveSlot of pokemon.moveSlots) {
				if (this.dex.moves.get(moveSlot.move).weather) {
					this.actions.useMove(moveSlot.move, pokemon, {target: pokemon});
					break
				}
			}
		},
		onUpdate(pokemon) {
			if (pokemon.baseSpecies.id !== 'castform') return;
				switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					pokemon.formeChange('Castform-Sun', this.effect, true);
					break;
				case 'raindance':
				case 'primordialsea':
					pokemon.formeChange('Castform-Rain', this.effect, true);
					break;
				case 'hail':
				case 'snow':
					pokemon.formeChange('Castform-Hail', this.effect, true);
					break;
				}
		},
		onTakeItem: false,
		itemUser: ["Castform"],
		num: 0,
		desc: "If held by a Castform, summons first known weather move, changes form based on weather.",
	},
	cherrimcrest: { //implemented in modded Flower Gift ability
		name: "Cherrim Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onTakeItem: false,
		itemUser: ["Cherrim"],
		num: 0,
		desc: "If held by a Cherrim, forces Cherrim into Sunshine form.",
	},
	cinccinocrest: {
		name: "Cinccino Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.id !== 'cinccino') return;
			if (move.multihit) return;
				move.multihit = [2, 5];
		},
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.species.id !== 'cinccino') return;
			return this.chainModify([3, 10]);
		},
		onTakeItem: false,
		itemUser: ["Cinccino"],
		num: 0,
		desc: "If held by a Cinccino, turns all moves into multihit at 30% BP.",
	},
	claydolcrest: {
		name: "Claydol Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target, target.getItem().name);
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.species.id !== 'claydol') return;
			if (/beam/i.test(move.id)) {
				return this.chainModify(1.5)
			}
		},
		onChargeMove(pokemon, target, move) {
			if (pokemon.species.id !== 'claydol') return;
			if (/beam/i.test(move.id)) {
				return false;
			}
		},
		onAfterMove(source, target, move) {
			if (source.species.id !== 'claydol') return;
			if (/beam/i.test(move.id) && source.volatiles["mustrecharge"]) {
				source.removeVolatile("mustrecharge");
				this.add("cant", source, "recharge");
				return;
			}
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.id !== 'claydol') return;
			if (move.category != 'Special') return;
			move.overrideOffensiveStat = 'def';
		},
		onTakeItem: false,
		itemUser: ["Claydol"],
		num: 0,
		desc: "If held by a Claydol, x1.5 to beam moves. Uses Def instead of Sp.Atk in damage calculations.",
	},
	cofagriguscrest: {
		name: "Cofagrigus Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id !== 'cofagrigus') return;
				return this.chainModify(1.25);
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id !== 'cofagrigus') return;
				return this.chainModify(1.25);
		},
		onTakeItem: false,
		itemUser: ["Cofagrigus"],
		num: 0,
		desc: "If held by a Cofagrigus, x1.25 Sp.Def and Sp.Atk.",
	},
	crabominablecrest: {
		name: "Crabominable Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (pokemon.species.id !== 'crabominable') return;
				return this.chainModify(1.2);
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id !== 'crabominable') return;
				return this.chainModify(1.2);
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			target.itemState.CrabominableCrest = true;
		},
		onBasePower(basePower, source, target, move) {
			if (source.itemState.CrabominableCrest) {
				return this.chainModify(1.5)
			}
		},
		onBeforeTurn(pokemon) {
			pokemon.itemState.CrabominableCrest = false;
		},
		onTakeItem: false,
		itemUser: ["Crabominable"],
		num: 0,
		desc: "If held by a Crabominable, x1.2 Def and Sp.Def. x1.5 boost if hit by an attack before moving.",
	},
	cryogonalcrest: {
		name: "Cryogonal Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, pokemon) {
			if (pokemon.species.id !== 'cryogonal') return;
				return this.chainModify(1.2);
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.species.id !== 'cryogonal') return;
				return atk = atk + pokemon.storedStats.spd*0.1;
		},
		onModifyDefPriority: 5,
		onModifyDef(def, pokemon) {
			if (pokemon.species.id !== 'cryogonal') return;
				return def = def + pokemon.storedStats.spd*0.1;
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.species.id !== 'cryogonal') return;
				return spa = spa + pokemon.storedStats.spd*0.1;
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (pokemon.species.id !== 'cryogonal') return;
				return spe = spe + pokemon.storedStats.spd*0.1;
		},
		onTakeItem: false,
		itemUser: ["Cryogonal"],
		num: 0,
		desc: "If held by a Cryogonal, x1.2 Sp.Def, rest of stats are raised by 10% of Sp.Def.",
	},
	darmanitancrest: {
		name: "Darmanitan Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.species.id == 'darmanitan') {
				pokemon.formeChange('Darmanitan-Zen', this.effect, true);
			}
		},
		onTakeItem: false,
		itemUser: ["Darmanitan"],
		num: 0,
		desc: "If held by a Darmanitan, forces it into Zen Mode.",
	},
	dedennecrest: {
		name: "Dedenne Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.id !== 'dedenne') return;
			if (move.category === 'Physical') {
				move.overrideOffensiveStat = 'spe';
			}
		},
		onTakeItem: false,
		itemUser: ["Dedenne"],
		num: 0,
		desc: "If held by a Dedenne, uses Speed instead of Attack in damage calculation.",
	},
	delcattycrest: {
		name: "Delcatty Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
		onTakeItem: false,
		itemUser: ["Delcatty"],
		num: 0,
		desc: "If held by a Delcatty, +10% of all unfainted allies' stats.",
	},
	druddigoncrest: {
		name: "Druddigon Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onBasePowerPriority: 30,
		onBasePower(basePower, source, target, move){
			if (source.species.id !== 'druddigon') return;
			if (['Dragon', 'Fire'].includes(move.type)) {
				return this.chainModify(1.3)
			}
		},
		onTryHit(target, source, move) {
			if (source.species.id !== 'druddigon') return;
			if (target !== source && move.type === 'Fire' && !move.ignoreAbility) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] item: Druddigon Crest');
				}
				return null;
			}
		},
		onTakeItem: false,
		itemUser: ["Druddigon"],
		num: 0,
		desc: "If held by a Druddigon, heals when hit by Fire-type attacks. x1.3 power to Dragon and Fire moves.",
	},
	dusknoircrest: {
		name: "Dusknoir Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
		onTakeItem: false,
		itemUser: ["Dusknoir"],
		num: 0,
		desc: "If held by a Dusknoir, x1.5 attack, x1.5 power to moves under 60 BP.",
	},
	electrodecrest: {
		name: "Electrode Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onFoeModifyDef(def, source, target, move) {
			if (source.species.id !== 'electrode') return;
			if (!move.selfdestruct && move.category === 'Physical') return this.chainModify(0.5)
		},
		onTakeItem: false,
		itemUser: ["Electrode"],
		num: 0,
		desc: "If held by an Electrode, halves foe's defense.",
	},
	empoleoncrest: {
		name: "Empoleon Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
			if (this.field.isWeather(['Hail', 'Snow']) || this.field.isBattlefield(['Icy Field', 'Snowy Mountain', 'Frozen Dimensional Field'])) {
				return this.chainModify(2)
			}
		},
		onTakeItem: false,
		itemUser: ["Empoleon"],
		num: 0,
		desc: "If held by an Empoleon, gains Ice STAB. x2 speed in hail/snow and icy fields.",
	},
	fearowcrest: {
		name: "Fearow Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
		onTakeItem: false,
		itemUser: ["Fearow"],
		num: 0,
		desc: "If held by a Fearow, x1.5 to stabbing moves, +1 crit chance.",
	},
	furretcrest: {
		name: "Furret Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'furret') return;
				this.actions.useMove(this.dex.moves.get('substitute'), pokemon, {target: pokemon});
		},
		onTakeItem: false,
		itemUser: ["Furret"],
		num: 0,
		desc: "If held by a Furret, uses Substitute on switch-in.",
	},
	feraligatrcrest: {
		name: "Feraligatr Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
			if (pokemon.activeMoveActions === 0 && move.category != 'Status') return priority + 2;
		},
		onTakeItem: false,
		itemUser: ["Feraligatr"],
		num: 0,
		desc: "If held by a Feraligatr, +2 prio on first turn out. x1.5 power to biting moves.",
	},
	glaceoncrest: {
		name: "Glaceon Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onEffectivenessPriority: 1,
		onEffectiveness(typeMod, target, type, move) {
			if (target?.species.id !== 'glaceon') return;
			if (typeMod && (move.type === 'Rock' || move.type === 'Fighting')) return typeMod-1;
		},
		onTakeItem: false,
		itemUser: ["Glaceon"],
		num: 0,
		desc: "If held by a Glaceon, resists Rock and Fighting-type moves.",
	},
	gothitellecrest: {
		name: "Gothitelle Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
			this.heal(pokemon.baseMaxhp / 16);
		},
		onTakeItem: false,
		itemUser: ["Gothitelle"],
		num: 0,
		desc: "If held by a Gothitelle, swaps between Dark and Psychic-type depending on move used. Heals 1/16th at end of turn.",
	},
	hypnocrest: {
		name: "Hypno Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
		onTakeItem: false,
		itemUser: ["Hypno"],
		num: 0,
		desc: "If held by a Hypno, x1.5 Sp.Atk, x1.5 accuracy.",
	},
	infernapecrest: {
		name: "Infernape Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onSwitchIn(pokemon) { //acts like IF stance change on switch in
			if (pokemon.species.id !== 'infernape') return;
			const stats = pokemon.storedStats;
			[stats.atk, stats.def, stats.spa, stats.spd] = [stats.def, stats.atk, stats.spd, stats.spa];
			pokemon.storedStats = stats;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 4,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'infernape') return;
			this.heal(pokemon.baseMaxhp / 16);
		},
		onTakeItem: false,
		itemUser: ["Infernape"],
		num: 0,
		desc: "If held by an Infernape, recovers 1/16 Max HP at end of turn. Swaps offenses and defenses.",
	},
	leafeoncrest: {
		name: "Leafeon Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onEffectivenessPriority: 1,
		onEffectiveness(typeMod, target, type, move) {
			if (target?.species.id !== 'leafeon') return;
			if (typeMod && (move.type === 'Fire' || move.type === 'Flying')) return typeMod-1;
		},
		onTakeItem: false,
		itemUser: ["Leafeon"],
		num: 0,
		desc: "If held by a Leafeon, resists Fire and Flying-type moves.",
	},
	lediancrest: {
		name: "Ledian Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'ledian') return;
			if (move.flags.punch) {
				move.multihit = move.multihit? [8, 20] : 4
			}
		},
		onTakeItem: false,
		itemUser: ["Ledian"],
		num: 0,
		desc: "If held by a Ledian, punching moves hit 4 times in a row.",
	},
	luvdisccrest: {
		name: "Luvdisc Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onBasePower(basePower, source, target, move) {
			if (source.species.id !== 'luvdisc') return;
			basePower = Math.min(source.happiness, 250);
			return basePower // is this necessary?
		},
		onTakeItem: false,
		itemUser: ["Luvdisc"],
		num: 0,
		desc: "If held by a Luvdisc, basepower of moves matches happiness, capping at 250.",
	},
	luxraycrest: {
		name: "Luxray Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'luxray') return;
			if (move.type === 'Dark') {
				move.forceSTAB = true;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (source.species.id !== 'luxray') return;
			if (move.type === 'Dark' || move.type === 'Ghost') {
				this.debug('Luxray Crest weaken');
				return this.chainModify(0.5);
			}
		},
		onTryHit(target, source, move) {
			if (source.species.id !== 'luxray') return;
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
		onTakeItem: false,
		itemUser: ["Luxray"],
		num: 0,
		desc: "If held by a Luxray, gains Galvanize effect, and Dark-type resistances and immunities.",
	},
	magcargocrest: {
		name: "Magcargo Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
		onTakeItem: false,
		itemUser: ["Magcargo"],
		num: 0,
		desc: "If held by a Magcargo, Swaps Def. and Speed. x1.1 Sp.Atk.",
	},
	meganiumcrest: {
		name: "Meganium Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
				this.heal(ally.baseMaxhp / 16);
			}
		},
		onTakeItem: false,
		itemUser: ["Meganium"],
		num: 0,
		desc: "If held by a Meganium, user's side takes x0.8 damage and recovers 1/16 max HP every turn.",
	},
	noctowlcrest: {
		name: "Noctowl Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onDamagingHit(damage, target, source, effect) {
			if (source.species.id !== 'noctowl') return;
			this.boost({spd: 1});
		},
		onModifyDefPriority: 5,
		onModifyDef(def, source, target, move) {
			if (source.species.id !== 'noctowl') return;
			return this.chainModify(1.2);
		},
		onTakeItem: false,
		itemUser: ["Noctowl"],
		num: 0,
		desc: "If held by a Noctowl, raises user's Sp.Def when hit. x1.2 Def.",
	},
	oricoriocrest: {
		name: "Oricorio Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, source, target, move) {
			if (source.baseSpecies.id !== 'oricorio') return;
			return this.chainModify(1.25);
		},
		onModifySpe(spe, source) {
			if (source.baseSpecies.id !== 'oricorio') return;
			return this.chainModify(1.25);
		},
		onTakeItem: false,
		itemUser: ["Oricorio"],
		num: 0,
		desc: "If held by an Oricorio, x1.25 Sp.Atk and Speed.",
	},
	phionecrest: {
		name: "Phione Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyDefPriority: 5,
		onModifyDef(def, source, target, move) {
			if (source.species.id !== 'phione`') return;
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
		onTakeItem: false,
		itemUser: ["Phione"],
		num: 0,
		desc: "If held by a Phione, x1.5 Def and Sp.Def. Summons Aqua Ring on switch-in.",
	},
	probopasscrest: { // Levitate effect implemented in scripts
		name: "Probopass Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onAfterHit(source, target, move) {
			this.hint(`${target.name}'s mininoses followed up on the attack!`)
			this.actions.useMove('steelnose', source)
			this.actions.useMove('rocknose', source)
			this.actions.useMove('electricnose', source)
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'phione') return;
				pokemon.addVolatile('probopasscrest');
		},
		onTakeItem: false,
		itemUser: ["Probopass"],
		num: 0,
		desc: "If held by a Probopass, gains Levitate. 20BP Steel/Rock/Electric-type move after damaging move.",
	},
	rampardoscrest: {
		name: "Rampardos Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onDamagePriority: -40,
		onDamage(damage, target, source, effect) {
			if (target.species.id !== 'rampardos') return;
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
			if (!target.itemState.activated && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add("-activate", target, "item: Rampardos Crest");
				target.itemState.activated = true;
				return target.hp - 1;
			}
		},
		onTakeItem: false,
		itemUser: ["Rampardos"],
		num: 0,
		desc: "If held by a Rampardos, survives at 1HP once per battle. Takes no recoil from recoil moves.",
	},
	relicanthcrest: {
		name: "Relicanth Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, source, target, move) {
			if (source.species.id !== 'relicanth') return;
			return this.chainModify(1.2);
		},
		onModifySpDPriority: 5,
		onModifySpD(spd, source) {
			if (source.species.id !== 'relicanth') return;
			return this.chainModify(1.3);
		},
		onTakeItem: false,
		itemUser: ["Relicanth"],
		num: 0,
		desc: "If held by a Relicanth, x1.2 Atk, x1.3 Sp.Def.",
	},
	reunicluscrest: {
		name: "Reuniclus Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'reuniclus') return;
			pokemon.itemState.baseSpA = pokemon.storedStats.spa; //store initial SpA value
			pokemon.itemState.baseAtk  = pokemon.storedStats.atk;
			if (this.dex.moves.get(pokemon.moveSlots[0].move).category === 'Physical') {
				this.debug('Entering Fighting forme')
				this.add('-start', pokemon, 'typechange', 'Fighting', '[from] item: Reuniclus Crest');
				pokemon.storedStats.spa = pokemon.itemState.baseAtk
				pokemon.storedStats.atk = pokemon.itemState.baseSpA
			}
		},
		onPrepareHit(source, target, move) {
			if (source.species.id !== 'reuniclus') return;
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			const type = move.type;
			if (move.category === 'Physical') {
				this.debug('Entering Fighting forme')
				this.add('-start', source, 'typechange', 'Fighting', '[from] item: Reuniclus Crest');
				source.storedStats.spa = source.itemState.baseAtk
				source.storedStats.atk = source.itemState.baseSpA
			}
			if (move.category === 'Special') {
				this.debug('Entering Psychic forme')
				this.add('-start', source, 'typechange', 'Psychic', '[from] item: Reuniclus Crest');
				source.storedStats.spa = source.itemState.baseSpA
				source.storedStats.atk = source.itemState.baseAtk
			}
		},
		onTakeItem: false,
		itemUser: ["Reuniclus"],
		num: 0,
		desc: "If held by a Reuniclus, swaps forms when using Physical or Special attacks.",
	},
	samurottcrest: {
		name: "Samurott Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
			if (source.species.id !== 'samurott') return;
			if (move.type === 'Dark' || move.type === 'Bug' || move.type === 'Rock') {
				this.debug('Samurott Crest weaken');
				return this.chainModify(0.5);
			}
		},
		onTakeItem: false,
		itemUser: ["Samurott"],
		num: 0,
		desc: "If held by a Samurott, gains Fighting-type STAB, resistances, and immunities. Slicing moves will always land a critical hit.",
	},
	sawsbuckcrest: {
		name: "Sawsbuck Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.id !== 'sawsbuck') return;
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
			if (source.baseSpecies.id !== 'sawsbuck') return;
			if (move.type === source.itemState.type) {
				return this.chainModify(1.2)
			}
		},
		onTakeItem: false,
		itemUser: ["Sawsbuck"],
		num: 0,
		desc: "If held by a Sawsbuck, changes type depending on form.",
	},
	sevipercrest: {
		name: "Seviper Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.species.id !== 'seviper') return;
			return this.chainModify(1.5)
		},
		onBasePower(basePower, source, target, move) {
			if (source.species.id !== 'seviper') return;
			var dmgMult = 1 + Math.floor(target.hp/(2*target.baseMaxhp));
			return this.chainModify(dmgMult)
		},
		onTakeItem: false,
		itemUser: ["Seviper"],
		num: 0,
		desc: "If held by a Seviper, x1.5 Speed, damage boosted by 1% for each 2% HP the foe has left.",
	},
	shiinoticcrest: {
		name: "Shiinotic Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onResidualOrder: 8,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'shiinotic') return;
			for (const target of pokemon.adjacentFoes()) {
				if (target.status) {
					const damage = this.damage(pokemon.baseMaxhp / 16, pokemon, target);
					if (damage) {
						this.heal(Math.floor(damage*1.3), target, pokemon);
					}
				}
			}
		},
		onTakeItem: false,
		itemUser: ["Shiinotic"],
		num: 0,
		desc: "If held by a Shiinotic, drains health from status'd foes.",
	},
	simipourcrest: {
		name: "Simipour Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'simipour') return;
			if (move.type === 'Grass') {
				move.forceSTAB = true;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (source.species.id !== 'simipour') return;
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
		onTakeItem: false,
		itemUser: ["Simipour"],
		num: 0,
		desc: "If held by a Simipour, gains Grass-type STAB and resistances, Atk. and Sp.Atk are x1.2.",
	},
	simisagecrest: {
		name: "Simisage Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'simisage') return;
			if (move.type === 'Fire') {
				move.forceSTAB = true;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (source.species.id !== 'simisage') return;
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
		onTakeItem: false,
		itemUser: ["Simisage"],
		num: 0,
		desc: "If held by a Simisage, gains Fire-type STAB and resistances, Atk. and Sp.Atk are x1.2.",
	},
	simisearcrest: {
		name: "Simisear Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'simisear') return;
			if (move.type === 'Water') {
				move.forceSTAB = true;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (source.species.id !== 'simisear') return;
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
		onTakeItem: false,
		itemUser: ["Simisear"],
		num: 0,
		desc: "If held by a Simisear, gains Water-type STAB and resistances, Atk. and Sp.Atk are x1.2.",
	},
	skuntankcrest: {
		name: "Skuntank Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (source.species.id !== 'skuntank') return;
			if (target !== source && move.type === 'Ground' && !move.ignoreAbility) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] item: Skuntank Crest');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source.species.id !== 'skuntank') return;
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Ground' && !move.ignoreAbility) {
				this.boost({atk: 1}, this.effectState.target);
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
		onTakeItem: false,
		itemUser: ["Skuntank"],
		num: 0,
		desc: "If held by a Skuntank, if hit by Ground-type move raises Atk by 1 stage. Immune to Ground-type attacks. x1.2 Atk and Sp.Atk.",
	},
	spiritombcrest: {
		name: "Spiritomb Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.species.id !== 'spiritomb') return;
			const fallen = Math.min(attacker.side.totalFainted, 5);
			this.debug('Spiritomb Crest boost');
			return this.chainModify(1 + fallen/5);
		},
		onResidualOrder: 8,
		onResidual(pokemon) {
			if (pokemon.species.id !== 'spiritomb') return;
				this.heal(pokemon.side.foe.totalFainted / 20);
		},
		onTakeItem: false,
		itemUser: ["Spiritomb"],
		num: 0,
		desc: "If held by a Spiritomb, +20% power boost per fainted ally. Heals 1/20th per fainted foe.",
	},
	stantlercrest: {
		name: "Stantler Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
		onTakeItem: false,
		itemUser: ["Stantler", "Wyrdeer"],
		num: 0,
		desc: "If held by a Stantler or Wyrdeer, x1.5 Atk and x1.5 accuracy.",
	},
	swalotcrest: { //Belch interaction coded into Belch move
		name: "Swalot Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onAfterMove(source, target, move) {
			if (source.species.id !== 'swalot') return;
			if (source.volatiles['stockpile']?.layers >= 3) return;
			if (['spitup', 'swallow', 'stockpile'].includes(move.id)) return;
			this.actions.useMove(this.dex.moves.get('stockpile'), source, {target: source});
		},
		onTakeItem: false,
		itemUser: ["Swalot"],
		num: 0,
		desc: "If held by a Swalot, will attempt to use Stockpile after moving.",
	},
	thievulcrest: {
		name: "Thievul Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
		onTakeItem: false,
		itemUser: ["Thievul"],
		num: 0,
		desc: "If held by a Thievul, lowers foe(s) Sp.Atk by 1 stage. Raises user's Sp.Atk by 1 stage.",
	},
	torterracrest: {
		name: "Torterra Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
		onTakeItem: false,
		itemUser: ["Torterra"],
		num: 0,
		desc: "If held by a Torterra, inverts type resistances and weaknesses for itself, not immunities. Gains Shell Bell effect.",
	},
	typhlosioncrest: {
		name: "Typhlosion Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (pokemon.species.id !== 'typhlosion') return;
			if (move.category === 'Physical') {
				move.overrideOffensiveStat = 'spa';
			}
			if (move.flags.contact) {
				move.multihit = 2;
			}
		},
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.species.id !== 'typhlosion') return;
			return move.hit === 1? move.basePower : Math.floor(move.basePower*0.3)
		},
		onTakeItem: false,
		itemUser: ["Typhlosion"],
		num: 0,
		desc: "If held by a Typhlosion, uses Sp.Atk instead of Attack in damage calculation. Contact moves hit twice.",
	},
	vespiquencrest: {
		name: "Vespiquen Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
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
		onTakeItem: false,
		itemUser: ["Vespiquen"],
		num: 0,
		desc: "If held by a Vespiquen, will swap stance when using Heal Order or Defend Order and attacking moves.",
	},
	whiscashcrest: {
		name: "Whiscash Crest",
		spritenum: -6,
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target,  target.getItem().name);
			}
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (source.species.id !== 'whiscash') return;
			if (target !== source && move.type === 'Grass' && !move.ignoreAbility) {
				if (!this.boost({atk: 1})) {
					this.add('-immune', target, '[from] item: Whiscash Crest');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source.species.id !== 'whiscash') return;
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Grass' && !move.ignoreAbility) {
				this.boost({atk: 1}, this.effectState.target);
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
		onTakeItem: false,
		itemUser: ["Whiscash"],
		num: 0,
		desc: "If held by a Whiscash, +1 Atk when hit by Grass-type move. Immune to Grass-type moves. x1.2 Atk and Sp.Atk.",
	},
	zangoosecrest: {
		name: "Zangoose Crest",
		spritenum: -6,
		onStart(target) {
			if (target.species.id !== 'zangoose') return;
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
			if (source.species.id !== 'zangoose') return;
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		onTakeItem: false,
		itemUser: ["Zangoose"],
		num: 0,
		desc: "If held by a Zangoose, poisons user and restors HP if user is poisoned.",
	},
	zoroarkcrest: {
		name: "Zoroark Crest",
		spritenum: -6,
		onStart(pokemon) {
			if (!pokemon.ignoringItem()) {
				this.add('-item', pokemon,  pokemon.getItem().name);
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.species.id !== 'zoroark') return;
			if (pokemon.illusion) {
				const noCopy = ['multitype', 'comatose', 'disguise', 'schooling', 'resuscitation', 'prismpower', 'rkssystem', 'imposter', 'shieldsdown', 'powerofalchemy', 'receiver', 'forecast', 'flowergift', 'illusion', 'wonderguard', 'zenmode', 'powerconstruct', 'iceface', 'neutralizinggas'];
				if (!noCopy.includes(this.dex.abilities.get(pokemon.illusion.ability).id)) {
					pokemon.ability = pokemon.illusion.ability
				}
			}
		},
		onModifyMove(move, source, target) {
			if (source.species.id !== 'pokemon') return;
			if (source.illusion && source.illusion?.types.includes(move.type)) {
				move.forceSTAB = true;
			}
		},
		onTakeItem: false,
		itemUser: ["Zoroark"],
		num: 0,
		desc: "If held by a Zoroark, takes on ability and STAB types of Pokémon it is disguised as.",
	},

	// Mega Stones
	alcremite: {
		name: "Alcremite",
		spritenum: -6,
		megaStone: "Alcremie-Mega",
		megaEvolves: "Alcremie",
		itemUser: ["Alcremie"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by an Alcremie, this item allows it to Mega Evolve in battle.",
	},
	appletunite: {
		name: "Appletunite",
		spritenum: -6,
		megaStone: "Appletun-Mega",
		megaEvolves: "Appletun",
		itemUser: ["Appletun"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by an Appletun, this item allows it to Mega Evolve in battle.",
	},
	blastoisiniteg: {
		name: "Blastoisinite G",
		spritenum: -6,
		megaStone: "Blastoise-Mega-G",
		megaEvolves: "Blastoise",
		itemUser: ["Blastoise"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Blastoise, this item allows it to Mega Evolve in battle.",
	},
	butterfreenite: {
		name: "Butterfreenite",
		spritenum: -6,
		megaStone: "Butterfree-Mega",
		megaEvolves: "Butterfree",
		itemUser: ["Butterfree"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Butterfree, this item allows it to Mega Evolve in battle.",
	},
	centiskorchite: {
		name: "Centiskorchite",
		spritenum: -6,
		megaStone: "Centiskorch-Mega",
		megaEvolves: "Centiskorch",
		itemUser: ["Centiskorch"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Centiskorch, this item allows it to Mega Evolve in battle.",
	},
	charizarditeg: {
		name: "Charizardite G",
		spritenum: -6,
		megaStone: "Charizard-Mega-G",
		megaEvolves: "Charizard",
		itemUser: ["Charizard"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Charizard, this item allows it to Mega Evolve in battle.",
	},
	cinderacite: {
		name: "Cinderacite",
		spritenum: -6,
		megaStone: "Cinderace-Mega",
		megaEvolves: "Cinderace",
		itemUser: ["Cinderace"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Cinderace, this item allows it to Mega Evolve in battle.",
	},
	coalossalite: {
		name: "Coalossalite",
		spritenum: -6,
		megaStone: "Coalossal-Mega",
		megaEvolves: "Coalossal",
		itemUser: ["Coalossal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Coalossal, this item allows it to Mega Evolve in battle.",
	},
	copperajite: {
		name: "Copperajite",
		spritenum: -6,
		megaStone: "Copperajah-Mega",
		megaEvolves: "Copperajah",
		itemUser: ["Copperajah"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Copperajah, this item allows it to Mega Evolve in battle.",
	},
	corviknite: {
		name: "Corviknite",
		spritenum: -6,
		megaStone: "Corviknight-Mega",
		megaEvolves: "Corviknight",
		itemUser: ["Corviknight"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Corviknight, this item allows it to Mega Evolve in battle.",
	},
	drednawtite: {
		name: "Drednawtite",
		spritenum: -6,
		megaStone: "Drednaw-Mega",
		megaEvolves: "Drednaw",
		itemUser: ["Drednaw"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	duraludonite: {
		name: "Duraludonite",
		spritenum: -6,
		megaStone: "Duraludon-Mega",
		megaEvolves: "Duraludon",
		itemUser: ["Duraludon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Duraludon, this item allows it to Mega Evolve in battle.",
	},
	eeveetite: {
		name: "Eeveetite",
		spritenum: -6,
		megaStone: "Eevee-Mega-G",
		megaEvolves: "Eevee",
		itemUser: ["Eevee"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by an Eevee, this item allows it to Mega Evolve in battle.",
	},
	flappletite: {
		name: "Flappletite",
		spritenum: -6,
		megaStone: "Flapple-Mega",
		megaEvolves: "Flapple",
		itemUser: ["Flapple"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Flapple, this item allows it to Mega Evolve in battle.",
	},
	garbodornite: {
		name: "Garbodornite",
		spritenum: -6,
		megaStone: "Garbodor-Mega",
		megaEvolves: "Garbodor",
		itemUser: ["Garbodor"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Garbodor, this item allows it to Mega Evolve in battle.",
	},
	gengariteg: {
		name: "Gengarite G",
		spritenum: -6,
		megaStone: "Gengar-Mega-G",
		megaEvolves: "Gengar",
		itemUser: ["Gengar"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Gengar, this item allows it to Mega Evolve in battle.",
	},
	grimmsnarlite: {
		name: "Grimmsnarlite",
		spritenum: -6,
		megaStone: "Grimmsnarl-Mega",
		megaEvolves: "Grimmsnarl",
		itemUser: ["Grimmsnarl"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Grimmsnarl, this item allows it to Mega Evolve in battle.",
	},
	hatterenite: {
		name: "Hatterenite",
		spritenum: -6,
		megaStone: "Hatterene-Mega",
		megaEvolves: "Hatterene",
		itemUser: ["Hatterene"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Hatterene, this item allows it to Mega Evolve in battle.",
	},
	inteleonite: {
		name: "Inteleonite",
		spritenum: -6,
		megaStone: "Inteleon-Mega",
		megaEvolves: "Inteleon",
		itemUser: ["Inteleon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by an Inteleon, this item allows it to Mega Evolve in battle.",
	},
	kinglerite: {
		name: "Kinglerite",
		spritenum: -6,
		megaStone: "Kingler-Mega",
		megaEvolves: "Kingler",
		itemUser: ["Kingler"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Kingler, this item allows it to Mega Evolve in battle.",
	},
	laprasite: {
		name: "Laprasite",
		spritenum: -6,
		megaStone: "Lapras-Mega",
		megaEvolves: "Lapras",
		itemUser: ["Lapras"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Lapras, this item allows it to Mega Evolve in battle.",
	},
	machampite: {
		name: "Machampite",
		spritenum: -6,
		megaStone: "Machamp-Mega",
		megaEvolves: "Machamp",
		itemUser: ["Machamp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Machamp, this item allows it to Mega Evolve in battle.",
	},
	melmetalite: {
		name: "Melmetalite",
		spritenum: -6,
		megaStone: "Melmetal-Mega",
		megaEvolves: "Melmetal",
		itemUser: ["Melmetal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Melmetal, this item allows it to Mega Evolve in battle.",
	},
	meowthite: {
		name: "Meowthite",
		spritenum: -6,
		megaStone: "Meowth-Mega",
		megaEvolves: "Meowth",
		itemUser: ["Meowth"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Meowth, this item allows it to Mega Evolve in battle.",
	},
	orbeetlenite: {
		name: "Orbeetlenite",
		spritenum: -6,
		megaStone: "Orbeetle-Mega",
		megaEvolves: "Orbeetle",
		itemUser: ["Orbeetle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by an Orbeetle, this item allows it to Mega Evolve in battle.",
	},
	pikachutite: {
		name: "Pikachutite",
		spritenum: -6,
		megaStone: "Pikachu-Mega",
		megaEvolves: "Pikachu",
		itemUser: ["Pikachu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Pikachu, this item allows it to Mega Evolve in battle.",
	},
	rillaboomite: {
		name: "Rillaboomite",
		spritenum: -6,
		megaStone: "Rillaboom-Mega",
		megaEvolves: "Rillaboom",
		itemUser: ["Rillaboom"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Rillaboom, this item allows it to Mega Evolve in battle.",
	},
	sandacondite: {
		name: "Sandacondite",
		spritenum: -6,
		megaStone: "Sandaconda-Mega",
		megaEvolves: "Sandaconda",
		itemUser: ["Sandaconda"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Sandaconda, this item allows it to Mega Evolve in battle.",
	},
	snorlaxite: {
		name: "Snorlaxite",
		spritenum: -6,
		megaStone: "Snorlax-Mega",
		megaEvolves: "Snorlax",
		itemUser: ["Snorlax"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Snorlax, this item allows it to Mega Evolve in battle.",
	},
	toxtricitite: {
		name: "Toxtricitite",
		spritenum: -6,
		megaStone: "Toxtricity-Mega",
		megaEvolves: "Toxtricity",
		itemUser: ["Toxtricity"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Toxtricity, this item allows it to Mega Evolve in battle.",
	},
	venusauriteg: {
		name: "Venusaurite G",
		spritenum: -6,
		megaStone: "Venusaur-Mega-G",
		megaEvolves: "Venusaur",
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by a Venusaur, this item allows it to Mega Evolve in battle.",
	},
	urshifite: {
		name: "Urshifite",
		spritenum: -6,
		megaStone: "Urshifu-Mega",
		megaEvolves: "Urshifu",
		itemUser: ["Urshifu"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by an Urshifu, this item allows it to Mega Evolve in battle.",
	},
	urshifiterapidstrike: {
		name: "Urshifite (Rapid Strike)",
		spritenum: -6,
		megaStone: "Urshifu-Rapid-Strike-Mega",
		megaEvolves: "Urshifu-Rapid-Strike",
		itemUser: ["Urshifu-Rapid-Strike"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
		desc: "If held by an Urshifu-Rapid-Strike, this item allows it to Mega Evolve in battle.",
	},
	
};
export const Items: import('../../../sim/dex-items').ModdedItemDataTable = Dex.deepClone(ModItems);
