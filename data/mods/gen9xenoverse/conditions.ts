export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	// Additions
	acidrain: {
		name: 'Acid Rain',
		effectType: 'Weather',
		duration: 5,
		onFieldStart(field, source, effect) {
				this.add('-weather', 'Acid Rain');
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Acid Rain', '[upkeep]');
			if (this.field.isWeather('acidrain')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 10);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
};
