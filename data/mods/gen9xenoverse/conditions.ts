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
	bidoof: {
		name: 'Bidoof-Legend',
		onBeforeSwitchIn(pokemon) {
			pokemon.setType('Normal');
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.id === 'bidooflegend') {
				const item = pokemon.getItem();
				const targetForme = (item?.onPlate ? 'Bidoof-' + item.onPlate : 'Bidoof-Legend');
				if (pokemon.species.name !== targetForme) {
					pokemon.formeChange(targetForme);
				}
			}
		},
		onTypePriority: 1,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'multitype' && this.gen >= 8 || !['arceus', 'bidooflegend'].includes(pokemon.baseSpecies.id)) return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'multitype' || pokemon.baseSpecies.id == 'bidooflegend') {
				type = pokemon.getItem().onPlate;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
};
