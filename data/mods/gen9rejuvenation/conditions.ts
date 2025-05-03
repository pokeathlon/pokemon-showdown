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
			if (this.effectState.sourceEffect.id === 'whirlpool' && this.field.isTerrain(['watersurfacefield','underwaterfield'])) this.effectState.boundDivisor = 6;
			if (this.effectState.sourceEffect.id === 'magmastorm' && this.field.isTerrain('dragonsdenfield')) this.effectState.boundDivisor = 6;
		},
	},
	hail: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock') || this.field.isTerrain(['icyfield','frozendimensionalfield','skyfield'])) {
				return 8;
			}
			return 5;
		},
		onWeather(target) {
			let damageMod = this.field.isTerrain('frozendimensionalfield') ? 2: 1
			this.damage(target.baseMaxhp * damageMod / 16);
		},
	},
	snow: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('icyrock') || this.field.isTerrain('skyfield')) {
				return 8;
			}
			return 5;
		},
	},
	raindance: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock') || this.field.isTerrain('skyfield')) {
				return 8;
			}
			return 5;
		},
	},
	sunnyday: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('heatrock') || this.field.isTerrain('skyfield')) {
				return 8;
			}
			return 5;
		},
	},
	sandstorm: {
		inherit: true,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock') || this.field.isTerrain('skyfield')) {
				return 8;
			}
			return 5;
		},
	},
	brn: {
		inherit: true,
		onResidual(pokemon) {
			let modifier = this.field.isTerrain('icyfield')? 32 : 16;
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
};
export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = Dex.deepClone(ModConditions);
