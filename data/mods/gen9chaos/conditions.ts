export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	// Uranium
	slp: {
		name: 'slp',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'slp', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
			} else if (sourceEffect && sourceEffect.effectType === 'Move') {
				this.add('-status', target, 'slp', '[from] move: ' + sourceEffect.name);
			} else {
				this.add('-status', target, 'slp');
			}
			// 1-3 turns
			this.effectState.startTime = this.random(2, 5);
			this.effectState.time = this.effectState.startTime;

			if (target.removeVolatile('nightmare')) {
				this.add('-end', target, 'Nightmare', '[silent]');
			}
		},
		onBeforeMovePriority: 10,
		onBeforeMove(pokemon, target, move) {
			let nightterror = false;
			for (const foe of pokemon.foes()) {
				if (foe.hasAbility('Night Terror')) nightterror = true;
			}

			if (pokemon.hasAbility('earlybird')) {
				pokemon.statusState.time--;
			}
			pokemon.statusState.time--;
			if (pokemon.statusState.time <= 0) {
				pokemon.cureStatus();
				if (nightterror) {
					pokemon.trySetStatus('par', null, this.dex.abilities.get('Night Terror'));
				}
				return;
			}
			this.add('cant', pokemon, 'slp');
			if (move.sleepUsable) {
				return;
			}
			return false;
		},
	},

	// Insurgence
	wish: {
		name: 'Wish',
		duration: 2,
		onStart(pokemon, source) {
			this.effectState.hp = source.maxhp / 2;
		},
		onResidualOrder: 4,
		onEnd(target) {
			if (target && !target.fainted) {
				const damage = this.heal(this.effectState.hp, target, target);
				if (damage) {
					this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectState.source.name);
				}
			}
		},
	},
	orbitalwish: {
		name: 'Orbital Wish',
		duration: 4,
		onStart(pokemon, source) {
			this.effectState.hp = source.maxhp / 2;
		},
		onResidualOrder: 4,
		onEnd(target) {
			if (target && !target.fainted) {
				const damage = this.heal(this.effectState.hp, target, target, this.dex.getActiveMove('Wish'));
				if (damage) {
					this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectState.source.name);
				}
			}
		},
	},
	orbitalfuturemove: {
		// this is a slot condition
		name: 'orbitalfuturemove',
		duration: 5,
		onResidualOrder: 3,
		onEnd(target) {
			const data = this.effectState;
			// time's up; time to hit! :D
			const move = this.dex.moves.get(data.move);
			if (target.fainted || target === data.source) {
				this.hint(`${move.name} did not hit because the target is ${(target.fainted ? 'fainted' : 'the user')}.`);
				return;
			}

			this.add('-end', target, 'move: ' + move.name);
			target.removeVolatile('Protect');
			target.removeVolatile('Endure');

			if (data.source.hasAbility('infiltrator') && this.gen >= 6) {
				data.moveData.infiltrates = true;
			}
			if (data.source.hasAbility('normalize') && this.gen >= 6) {
				data.moveData.type = 'Normal';
			}
			const hitMove = new this.dex.Move(data.moveData) as ActiveMove;

			this.actions.trySpreadMoveHit([target], data.source, hitMove, true);
			if (data.source.isActive && data.source.hasItem('lifeorb') && this.gen >= 5) {
				this.singleEvent('AfterMoveSecondarySelf', data.source.getItem(), data.source.itemState, data.source, target, data.source.getItem());
			}
			this.activeMove = null;

			this.checkWin();
		},
	},

	// Mariomon
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
		onWeather(target) {
			let sleet = false;
			for (const pokemon of this.getAllActive()) if (pokemon.hasAbility('Sleet')) sleet = true;
			this.damage(target.baseMaxhp / (sleet ? 5 : 16));
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

	// IF
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
	silvally: {
		inherit: true,
		onType(types, pokemon) {
			if (pokemon.transformed || pokemon.ability !== 'rkssystem') return types;
			let type: string | undefined = 'Normal';
			if (pokemon.ability === 'rkssystem') {
				type = pokemon.getItem().onMemory;
				if (!type) {
					type = 'Normal';
				}
			}
			return [type];
		},
	},
};
