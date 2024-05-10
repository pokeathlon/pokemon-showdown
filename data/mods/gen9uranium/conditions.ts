export const Conditions: {[k: string]: ModdedConditionData} = {
	thunderstorm: {
		name: 'Thunderstorm',
		effectType: 'Weather',
		duration: 5,
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Thunderstorm', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Thunderstorm');
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Thunderstorm electric boost');
				return this.chainModify(1.5);
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Thunderstorm', '[upkeep]');
			if (this.field.isWeather('thunderstorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			if (this.effectState.duration % 2 === 0) {
				const typeMod = this.clampIntRange(target.runEffectiveness(this.dex.getActiveMove('thunderstorm')), -6, 6);
				this.damage(target.maxhp * Math.pow(2, typeMod) / 8);
			}
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
	fallout: {
		name: 'Fallout',
		effectType: 'Weather',
		duration: 5,
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				this.add('-weather', 'Fallout', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'Fallout');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Fallout', '[upkeep]');
			if (this.field.isWeather('fallout')) this.eachEvent('Weather');
		},
		onWeather(target) {
			if (this.effectState.duration % 2 === 0) {
				const typeMod = this.clampIntRange(target.runEffectiveness(this.dex.getActiveMove('fallout')), -6, 6);
				this.damage(target.maxhp * Math.pow(2, typeMod) / 8);
			}
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
};
