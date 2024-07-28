const {treasures} = require('./abilities');

export const Conditions: {[k: string]: ModdedConditionData} = {
	lunachi: {
		name: 'Lunachi',
		onUpdate(pokemon) {
			const curItem = pokemon.getItem();
			if (curItem.id in treasures) {
				if (pokemon.species.id === 'lunachi') {
					pokemon.formeChange('lunachibestowed', this.effect, true);
				}
			} else {
				if (pokemon.species.id === 'lunachibestowed') {
					pokemon.formeChange('lunachi', this.effect, true);
					pokemon.ability = 'sacredtreasures' as ID;
					this.add('-ability', pokemon, 'Sacred Treasures');
				}
			}
		},
		onTakeItem(item, pokemon, source, move) {
			if (pokemon.species.id === 'lunachibestowed') {
				pokemon.formeChange('lunachi', this.effect, true);
				pokemon.ability = 'sacredtreasures' as ID;
				this.add('-ability', pokemon, 'Sacred Treasures');
			}
		},
	},
	scatteredcoins: {
		name: 'Scattered Coins',
		noCopy: true,
		onSideStart(target, source, sourceEffect) {
			this.add('-sidestart', target, 'move: Scattered Coins');
		},
	},
	raindance: {
		name: 'RainDance',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if ((move.type === 'Fire') && !(move.name === 'Supeheated Crash')) {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'RainDance');
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'RainDance', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},
};
