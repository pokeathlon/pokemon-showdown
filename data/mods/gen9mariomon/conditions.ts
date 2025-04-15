export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	frz: {
		inherit: true,
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'frz');
			}
			if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
				target.formeChange('Shaymin', this.effect, true);
				target.regressionForme = false;
			}
			this.add('-message', 'Freeze is replaced with Frostbite in Super Mariomon (special damage is halved, and 1/16 HP is lost each turn).');
		},
		// Damage reduction is handled directly in the sim/battle.js damage function
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
		onBeforeMove(pokemon, target, move) {},
	},
	raindance: {
		inherit: true,
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'RainDance', '[from] ability: ' + effect.name, `[of] ${source}`);
			} else {
				this.add('-weather', 'RainDance');
			}
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'boomerang' as ID;
						move.move = 'Boomerang';
					}
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
		onFieldStart(field, source, effect) {
			this.add('-weather', 'PrimordialSea', '[from] ability: ' + effect.name, `[of] ${source}`);
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'boomerang' as ID;
						move.move = 'Boomerang';
					}
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
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'SunnyDay', '[from] ability: ' + effect.name, `[of] ${source}`);
			} else {
				this.add('-weather', 'SunnyDay');
			}
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'fireball' as ID;
						move.move = 'Fire Ball';
					}
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
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DesolateLand', '[from] ability: ' + effect.name, `[of] ${source}`);
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'fireball' as ID;
						move.move = 'Fire Ball';
					}
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
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Hail', '[from] ability: ' + effect.name, `[of] ${source}`);
			} else {
				this.add('-weather', 'Hail');
			}
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'icetoss' as ID;
						move.move = 'Ice Toss';
					}
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
	snowscape: {
		inherit: true,
		onFieldStart(field, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'Snowscape', '[from] ability: ' + effect.name, `[of] ${source}`);
			} else {
				this.add('-weather', 'Snowscape');
			}
			for (const target of this.getAllPokemon()) {
				for (const move of target.moveSlots) {
					if (['hammerthrow', 'boomerang', 'fireball', 'icetoss'].includes(move.id)) {
						move.id = 'icetoss' as ID;
						move.move = 'Ice Toss';
					}
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
