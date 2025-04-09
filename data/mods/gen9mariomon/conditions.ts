export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	frz: {
		inherit: true,
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
		onBeforeMove(pokemon, target, move) {},
	},
	raindance: {
		inherit: true,
		onWeather(target) {
			for (const move of target.moveSlots) {
				if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
					move.id = 'boomerang' as ID;
					move.move = 'Boomerang';
				}
			}
		},
		onFieldEnd() {
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'hammerthrow' as ID;
						move.move = 'Hammer Throw';
					}
				}
			}
			this.add('-weather', 'none');
		},
	},
	primordialsea: {
		inherit: true,
		onWeather(target) {
			for (const move of target.moveSlots) {
				if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
					move.id = 'boomerang' as ID;
					move.move = 'Boomerang';
				}
			}
		},
		onFieldEnd() {
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'hammerthrow' as ID;
						move.move = 'Hammer Throw';
					}
				}
			}
			this.add('-weather', 'none');
		},
	},
	sunnyday: {
		inherit: true,
		onWeather(target) {
			for (const move of target.moveSlots) {
				if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
					move.id = 'fireball' as ID;
					move.move = 'Fire Ball';
				}
			}
		},
		onFieldEnd() {
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'hammerthrow' as ID;
						move.move = 'Hammer Throw';
					}
				}
			}
			this.add('-weather', 'none');
		},
	},
	desolateland: {
		onWeather(target) {
			for (const move of target.moveSlots) {
				if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
					move.id = 'fireball' as ID;
					move.move = 'Fire Ball';
				}
			}
		},
		onFieldEnd() {
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'hammerthrow' as ID;
						move.move = 'Hammer Throw';
					}
				}
			}
			this.add('-weather', 'none');
		},
	},
	hail: {
		inherit: true,
		onWeather(target) {
			for (const move of target.moveSlots) {
				if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
					move.id = 'icetoss' as ID;
					move.move = 'Ice Toss';
				}
			}
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'hammerthrow' as ID;
						move.move = 'Hammer Throw';
					}
				}
			}
			this.add('-weather', 'none');
		},
	},
	snow: {
		inherit: true,
		onWeather(target) {
			for (const move of target.moveSlots) {
				if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
					move.id = 'icetoss' as ID;
					move.move = 'Ice Toss';
				}
			}
		},
		onFieldEnd() {
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'hammerthrow' as ID;
						move.move = 'Hammer Throw';
					}
				}
			}
			this.add('-weather', 'none');
		},
	},
};