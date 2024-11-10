const {treasures} = require('./abilities');

export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	lunachi: {
		name: 'Lunachi',
		onUpdate(pokemon) {
			const curItem = pokemon.getItem();
			if (curItem.id in treasures) {
				if (pokemon.species.id === 'lunachi' && pokemon.ability === 'sacredtreasures') {
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
	luckycharm: {
		name: 'Lucky Charm',
		noCopy: true,
		onSideStart(target, source, sourceEffect) {
			this.add('-sidestart', target, 'ability: Lucky Charm');
		},
		onModifySecondaries(secondaries) {
			this.debug('Lucky Charm prevent secondary');
			return secondaries.filter(effect => !!(effect.self || effect.dustproof));
		},
		onCriticalHit: false,
	},
};
