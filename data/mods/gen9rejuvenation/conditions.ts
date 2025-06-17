const {Dex} = require('../../../sim/dex');
export const ModConditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	arceus: {
		inherit: true,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype') return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
	partiallytrapped: {
		inherit: true,
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
			this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
			if (this.effectState.sourceEffect.id === 'thundercage' && this.field.isTerrain('electricterrain')) this.effectState.boundDivisor = 6;
			if (this.effectState.sourceEffect.id === 'snaptrap' && this.field.isTerrain('grassyterrain')) this.effectState.boundDivisor = 6;
			if (this.effectState.sourceEffect.id === 'whirlpool' && this.field.isBattlefield(['watersurfacefield','underwaterfield'])) this.effectState.boundDivisor = 6;
			if (this.effectState.sourceEffect.id === 'magmastorm' && this.field.isBattlefield('dragonsdenfield')) this.effectState.boundDivisor = 6;
		},
	},
	hail: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock') || this.field.isBattlefield(['icyfield','frozendimensionalfield','skyfield'])) {
				return 8;
			}
			return 5;
		},
		onWeather(target) {
			let damageMod = this.field.isBattlefield('frozendimensionalfield') ? 2: 1
			this.damage(target.baseMaxhp * damageMod / 16);
		},
	},
	snow: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock') || this.field.isBattlefield('skyfield')) {
				return 8;
			}
			return 5;
		},
	},
	raindance: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock') || this.field.isBattlefield('skyfield')) {
				if (this.field.battlefieldState.rainbow) this.field.battlefieldState.rainbowDuration = 8
				return 8;
			}
			if (this.field.battlefieldState.rainbow) this.field.battlefieldState.rainbowDuration = 5
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (this.field.isWeather('sunnyday')) {
				this.field.setBattlefield('rainbowfield')
				this.field.battlefieldState.rainbow = true;
			}
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect.name, `[of] ${source}`);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
	},
	sunnyday: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('heatrock') || this.field.isBattlefield('skyfield')) {
				if (this.field.battlefieldState.rainbow) this.field.battlefieldState.rainbowDuration = 8
				return 8;
			}
			if (this.field.battlefieldState.rainbow) this.field.battlefieldState.rainbowDuration = 5
			return 5;
		},
		onFieldStart(battle, source, effect) {
			if (this.field.isWeather('raindance')) {
				this.field.setBattlefield('rainbowfield')
				this.field.battlefieldState.rainbow = true;
			}
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect.name, `[of] ${source}`);
			} else {
				this.add('-weather', 'SunnyDay');
			}
		},
	},
	sandstorm: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock') || this.field.isBattlefield('skyfield')) {
				return 8;
			}
			return 5;
		},
	},
	brn: {
		inherit: true,
		onResidual(pokemon) {
			let modifier = this.field.isBattlefield('icyfield')? 32 : 16;
			this.damage(pokemon.baseMaxhp / modifier);
		},
	},
	shadowsky: {
		name: 'Shadow Sky',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('amplifiedrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Shadow Sky', '[from] ability: ' + effect.name, `[of] ${source}`);
			} else {
				this.add('-weather', 'Shadow Sky');
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Shadow') {
				this.debug('Shadow Sky fire boost');
				return this.chainModify(1.5);
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Shadow Sky', '[upkeep]');
			if (this.field.isWeather('shadowsky')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	ptr: {
		name: 'ptr',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'ptr', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'ptr');
			}
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (!target || target.fainted || target.hp <= 0) return;
			let damage = this.damage(pokemon.baseMaxhp / 8);
			if (damage && target) {
				this.heal(damage, target, pokemon, "drain")
			}
		},
	},
};
export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = Dex.deepClone(ModConditions);
