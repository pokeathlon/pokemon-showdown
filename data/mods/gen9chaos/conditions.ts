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
	hail: {
		inherit: true,
		onWeather(target) {
			let sleet = false;
			for (const pokemon of this.getAllActive()) if (pokemon.hasAbility('Sleet')) sleet = true;
			this.damage(target.baseMaxhp / (sleet ? 5 : 16));
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
