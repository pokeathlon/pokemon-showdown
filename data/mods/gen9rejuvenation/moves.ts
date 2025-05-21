const {Dex} = require('../../../sim/dex');
export const ModMoves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	// Modded
	camouflage: {
		inherit: true,
		onHit(target) {
			let newType = 'Normal';
			if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			} else if (this.field.isBattlefield(['volcanicfield','infernalfield'])) {
				newType = 'Fire';
			} else if (this.field.isBattlefield(['corrosivemistfield','murkwatersurfacefield'])) {
				newType = 'Poison';
			} else if (this.field.isBattlefield(['icyfield','frozendimensionalfield'])) {
				newType = 'Ice';
			} else if (this.field.isBattlefield(['watersurfacefield','underwaterfield'])) {
				newType = 'Water';
			} else if (this.field.isBattlefield('dragonsdenfield')) {
				newType = 'Dragon';
			}  else if (this.field.isBattlefield('skyfield')) {
				newType = 'Flying';
			} 

			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},
	naturepower: {
		inherit: true,
		onTryHit(target, pokemon) {
			let move = 'triattack';
			if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'mistball';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			} else if (this.field.isBattlefield('volcanicfield')) {
				move = 'flamethrower';
			} else if (this.field.isBattlefield('corrosivemistfield')) {
				move = 'venoshock';
			} else if (this.field.isBattlefield(['icefield','frozendimensionalfield'])) {
				move = 'icebeam';
			} else if (this.field.isBattlefield(['watersurfacefield','underwaterfield'])) {
				move = 'whirlpool';
			} else if (this.field.isBattlefield('murkwatersurfacefield')) {
				move = 'sludgewave';
			}  else if (this.field.isBattlefield('dragonsdenfield')) {
				move = 'dragonpulse';
			}   else if (this.field.isBattlefield('skyfield')) {
				move = 'skyattack';
			}    else if (this.field.isBattlefield('infernalfield')) {
				move = 'punishment';
			} 
			this.actions.useMove(move, pokemon, {target});
			return null;
		},
	},
	secretpower: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('')) return;
			move.secondaries = [];
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isBattlefield(['volcanicfield','dragonsdenfield','infernalfield'])) {
				move.secondaries.push({
					chance: 30,
					status: 'brn',
				});
			} else if (this.field.isBattlefield(['corrosivemistfield','murkwatersurfacefield'])) {
				move.secondaries.push({
					chance: 30,
					status: 'psn',
				});
			} else if (this.field.isBattlefield(['icyfield','frozendimensionalfield'])) {
				move.secondaries.push({
					chance: 10,
					status: 'frz',
				});
			} else if (this.field.isBattlefield('skyfield')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'confusion',
				});
			} else if (this.field.isBattlefield('underwaterfield')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						atk: -1,
					},
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain') || this.field.isBattlefield('watersurfacefield')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} 
		},
	},
	terrainpulse: {
		inherit: true,
		onModifyType(move, pokemon) {
			if (!pokemon.isGrounded()) return;
			switch (this.field.terrain || this.field.battlefield) {
			case 'electricterrain':
				move.type = 'Electric';
				break;
			case 'grassyterrain':
				move.type = 'Grass';
				break;
			case 'mistyterrain':
				move.type = 'Fairy';
				break;
			case 'psychicterrain':
				move.type = 'Psychic';
				break;
			case 'volcanicfield':
			case 'infernalfield':
				move.type = 'Fire';
				break;
			case 'corrosivemistfield':
			case 'murkwatersurfacefield':
				move.type = 'Poison';
				break;
			case 'icyfield':
			case 'frozendimensionalfield':
				move.type = 'Ice';
				break;
			case 'watersurfacefield':
			case 'underwaterfield':
				move.type = 'Water';
				break;
			case 'dragonsdenfield':
				move.type = 'Dragon';
				break;
			case 'skyfield':
				move.type = 'Flying';
				break;
			}
		},
	},
	shelter: {
		inherit: true,
		pseudoWeather: 'shelter',
		condition: {
			onBasePowerPriority: 1,
			onHit(target) {
				target.addVolatile('shelter')
			},
			onSourceModifyDamage(damage, source, target, move) {
				if (!target.volatiles['shelter']) return;
				if (this.field.isTerrain('electricterrain') && move.type === 'Electric') return this.chainModify(0.5);
				if (this.field.isTerrain('grassyterrain') && move.type === 'Grass') return this.chainModify(0.5);
				if (this.field.isTerrain('mistyterrain') && move.type === 'Fairy') return this.chainModify(0.5);
				if (this.field.isBattlefield(['volcanicfield','infernalfield']) && move.type === 'Fire') return this.chainModify(0.5);
				if (this.field.isBattlefield(['corrosivemistfield','murkwatersurfacefield']) && move.type === 'Poison') return this.chainModify(0.5);
				if (this.field.isBattlefield(['icyfield','frozendimensionalfield']) && move.type === 'Ice') return this.chainModify(0.5);
				if (this.field.isBattlefield(['watersurfacefield','underwaterfield']) && move.type === 'Water') return this.chainModify(0.5);
				if (this.field.isBattlefield('dragonsdenfield') && move.type === 'Dragon') return this.chainModify(0.5);
				if (this.field.isBattlefield('skyfield') && move.type === 'Flying') return this.chainModify(0.5);
			},
			onSwitchOut(pokemon) {
				pokemon.removeVolatile('shelter')
			},
		},
	},
	belch: {
		inherit: true,
		onDisableMove(pokemon) {
			if (pokemon.item === 'swalotcrest') return;
			if (!pokemon.ateBerry) pokemon.disableMove('belch');
		},
		onAfterMove(source, target, move) {
			this.actions.useMove('spitup', target);
		},
	},
	plasmafists: {
		inherit: true,
		onHit(source) {
			this.field.setTerrain('electricterrain');
		},
	},
	iondeluge: {
		inherit: true,
		onHit(source) {
			this.field.setTerrain('electricterrain');
		},
	},
	stokedsparksurfer: {
		inherit: true,
		onHit(source) {
			this.field.setTerrain('electricterrain');
		},
	},
	dive: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			if (attacker.hasAbility('gulpmissile') && attacker.species.name === 'Cramorant' && !attacker.transformed) {
				var forme = attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				if (this.field.isTerrain('electricterrain')) forme = 'cramorantgorging';
				if (this.field.isBattlefield(['watersurfacefield','underwaterfield'])) forme = 'cramorantgulping';
				attacker.formeChange(forme, move);
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	focuspunch: {
		inherit: true,
		priorityChargeCallback(pokemon) {
			if (this.field.isTerrain('electricterrain')) return;
			pokemon.addVolatile('focuspunch');
		},
	},
	magnetrise: {
		inherit: true,
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (this.field.isTerrain('electricterrain')) return 8;
				return 5;
			},
			onStart(target) {
				this.add('-start', target, 'Magnet Rise');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 18,
			onEnd(target) {
				this.add('-end', target, 'Magnet Rise');
			},
		},
	},
	electrify: {
		inherit: true,
		onHit(target) {
			if (!this.field.isTerrain('electricterrain')) return;
			if (target.getTypes().join() === 'Electric' || !target.setType('Electric')) {
				// Soak should animate even when it fails.
				// Returning false would suppress the animation.
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Electric');
		},
	},
	magneticflux: {
		inherit: true,
		onHitSide(side, source, move) {
			const targets = side.allies().filter(ally => (
				ally.hasAbility(['plus', 'minus']) &&
				(!ally.volatiles['maxguard'] || this.runEvent('TryHit', ally, source, move))
			));
			if (!targets.length) return false;

			let didSomething = false;
			for (const target of targets) {
				let boostValue = this.field.isTerrain('electricterrain')? 2 : 1
				didSomething = this.boost({def: boostValue, spd: boostValue}, target, source, move, false, true) || didSomething;
			}
			return didSomething;
		},
	},
	tectonicrage: {
		inherit: true,
		onBasePower(basePower, source, target, move) {
			if (this.field.isTerrain('electricterrain')) this.chainModify(1.3);
		},
		onHit() {
			if (this.field.isTerrain('electricterrain')) {
				this.field.clearTerrain()
				this.field.clearBattlefield()
			};
		},
		onAfterSubDamage() {
			if (this.field.isTerrain('electricterrain')) {
				this.field.clearTerrain()
				this.field.clearBattlefield()
			};
		},
	},
	mudsport: {
		inherit: true,
		condition: {
			duration: 5,
			onFieldStart(field, source) {
				this.add('-fieldstart', 'move: Mud Sport', '[of] ' + source);
			},
			onBasePowerPriority: 1,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('mud sport weaken');
					return this.chainModify([1352, 4096]);
				}
			},
			onUpdate(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				this.field.clearTerrain()
				this.field.clearBattlefield()
			};
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 4,
			onFieldEnd() {
				this.add('-fieldend', 'move: Mud Sport');
			},
		},
	},
	charge: {
		inherit: true,
		condition: {
			onStart(pokemon, source, effect) {
				if (effect && ['Electromorphosis', 'Wind Power'].includes(effect.name)) {
					this.add('-start', pokemon, 'Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} if (effect && ['Elemental Seed'].includes(effect.name)) {
					this.add('-start', pokemon, 'Charge', this.activeMove!.name, '[from] item: ' + effect.name);
					pokemon.itemState.chargeDuration = 3;
				} else {
					this.add('-start', pokemon, 'Charge');
				}
			},
			onRestart(pokemon, source, effect) {
				if (effect && ['Electromorphosis', 'Wind Power'].includes(effect.name)) {
					this.add('-start', pokemon, 'Charge', this.activeMove!.name, '[from] ability: ' + effect.name);
				} else {
					this.add('-start', pokemon, 'Charge');
				}
			},
			onBasePowerPriority: 9,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric') {
					this.debug('charge boost');
					return this.chainModify(2);
				}
			},
			onMoveAborted(pokemon, target, move) {
				if (move.type === 'Electric' && move.id !== 'charge') {
					pokemon.removeVolatile('charge');
				}
			},
			onAfterMove(pokemon, target, move) {
				if (move.type === 'Electric' && move.id !== 'charge') {
					pokemon.removeVolatile('charge');
				}
			},
			onResidualOrder: 12,
			onResidual(pokemon) {
				if (pokemon.itemState.chargeDuration && pokemon.itemState.chargeDuration <= 0) {
					pokemon.removeVolatile('charge');
				}
				if (pokemon.itemState.chargeDuration) {
					pokemon.itemState.chargeDuration -= 1
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Charge', '[silent]');
			},
		},
	},
	bloomdoom: {
		inherit: true,
		onHit(source) {
			this.field.setTerrain('grassyterrain');
		},
	},
	ingrain: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Ingrain');
			},
			onResidualOrder: 7,
			onResidual(pokemon) {
				let denominator = this.field.isTerrain('grassyterrain')? 8 : 16 
				this.heal(pokemon.baseMaxhp / denominator);
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onDragOut(pokemon) {
				this.add('-activate', pokemon, 'move: Ingrain');
				return null;
			},
		},
	},
	razorwind: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (this.field.isTerrain('grassyterrain')) return;
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onModifyMove(move, pokemon, target) {
			if (this.field.isTerrain('grassyterrain')) move.flags.charge = undefined;
		},
	},
	floralhealing: {
		inherit: true,
		onHit(target, source) {
			let success = false;
			if (this.field.isTerrain('grassyterrain')) {
				success = !!this.heal(this.modify(target.baseMaxhp, 0.75));
			} else {
				success = !!this.heal(Math.ceil(target.baseMaxhp * 0.5));
			}
			if (success && !target.isAlly(source)) {
				target.staleness = 'external';
			}
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	synthesis: {
		inherit: true,
		onHit(pokemon) {
			let factor = 0.5;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				factor = 0.667;
				break;
			case 'raindance':
			case 'primordialsea':
			case 'sandstorm':
			case 'hail':
			case 'snow':
				factor = 0.25;
				break;
			}
			if (this.field.isTerrain('grassyterrain')) factor = 0.75;
			const success = !!this.heal(this.modify(pokemon.maxhp, factor));
			if (!success) {
				this.add('-fail', pokemon, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
	},
	leechseed: {
		inherit: true,
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.getAtSlot(pokemon.volatiles['leechseed'].sourceSlot);
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				var damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					if (this.field.isTerrain('grassyterrain')) damage *= 1.3;
					this.heal(damage, target, pokemon);
				}
			},
		},
		onTryImmunity(target) {
			return !target.hasType('Grass');
		},
	},
	growth: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather()) || this.field.isTerrain('grassyterrain')) move.boosts = {atk: 2, spa: 2};
		},
	},
	naturesmadness: {
		inherit: true,
		damageCallback(pokemon, target) {
			if (this.field.isTerrain('grassyterrain')) return this.clampIntRange(Math.floor(target.getUndynamaxedHP()*3 / 4), 1);
			return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
	},
	aquaring: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Aqua Ring');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				if (this.field.isTerrain('corrosivemistfield') && !pokemon.hasType(['Steel', 'Poison'])) return this.damage(pokemon.baseMaxhp / 16);
				(this.field.isTerrain('mistyterrain') || this.field.isBattlefield(['watersurfacefield', 'underwaterfield']))? this.heal(pokemon.baseMaxhp / 8) : this.heal(pokemon.baseMaxhp / 16);
			},
		},
	},
	barbbarrage: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox' || this.field.isBattlefield(['corrosivemistfield','murkwatersurfacefield'])) {
				return this.chainModify(2);
			}
		},
	},
	venoshock: {
		inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'psn' || target.status === 'tox' || this.field.isBattlefield(['corrosivemistfield','murkwatersurfacefield'])) {
				return this.chainModify(2);
			}
		},
	},
	venomdrench: {
		inherit: true,
		onHit(target, source, move) {
			if (target.status === 'psn' || target.status === 'tox' || this.field.isBattlefield(['corrosivemistfield','murkwatersurfacefield'])) {
				return !!this.boost({atk: -1, spa: -1, spe: -1}, target, source, move);
			}
			return false;
		},
	},
	wish: {
		inherit: true,
		condition: {
			onStart(pokemon, source) {
				this.effectState.hp = this.field.isTerrain('mistyterrain')? source.maxhp * 3 / 4 : source.maxhp / 2;
				this.effectState.startingTurn = this.getOverflowedTurnCount();
				if (this.effectState.startingTurn === 255) {
					this.hint(`In Gen 8+, Wish will never resolve when used on the ${this.turn}th turn.`);
				}
			},
			onResidualOrder: 4,
			onResidual(side: any) {
				if (this.getOverflowedTurnCount() <= this.effectState.startingTurn) return;
				side.removeSlotCondition(this.getAtSlot(this.effectState.sourceSlot), 'wish');
			},
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectState.source.name);
					}
				}
			},
		},
	},
	grasspledge: {
		inherit: true,
		onAfterMove(source, target, move) {
			// Save use to field
			this.field.terrainState.grasspledge = true;
			if (this.field.terrainState.firepledge) this.field.setBattlefield('volcanicfield')
		},
	},
	firepledge: {
		inherit: true,
		onAfterMove(source, target, move) {
			// Save use to field
			this.field.terrainState.firepledge = true;
			if (this.field.terrainState.grasspledge) this.field.setBattlefield('volcanicfield')
		},
	},
	auroraveil: {
		inherit: true,
		onTry() {
			return (this.field.isWeather(['hail', 'snow']) || this.field.isBattlefield(['icyfield','frozendimensionalfield']));
		},
	},
	takeheart: {
		inherit: true,
		onHit(pokemon) {
			let boost = this.field.isBattlefield(['watersurfacefield','underwaterfield']) ? {spa: 2, spd: 2}: {spa: 1, spd: 1}
			const success = !!this.boost({spa: 1, spd: 1});
			return pokemon.cureStatus() || success;
		},
	},
	freezeshock: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (this.field.isBattlefield('frozendimensionalfield')) return;
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	iceburn: {
		inherit: true,
		onTryMove(attacker, defender, move) {
			if (this.field.isBattlefield('frozendimensionalfield')) return;
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
	},
	partingshot: {
		inherit: true,
		onHit(target, source, move) {
			let boostTable = this.field.isBattlefield('frozendimensionalfield')? {atk: -1, spa: -1, spe: -1} : {atk: -1, spa: -1};
			const success = this.boost(boostTable, target, source);
			if (!success && !target.hasAbility('mirrorarmor')) {
				delete move.selfSwitch;
			}
		},
	},
	powertrip: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			let bpChange = this.field.isBattlefield('frozendimensionalfield')? 40 : 20;
			const bp = move.basePower + bpChange * pokemon.positiveBoosts();
			this.debug('BP: ' + bp);
			return bp;
		},
	},
	flyingpress: {
		inherit: true,
		onEffectiveness(typeMod, target, type, move) {
			if (this.field.isBattlefield('skyfield') && this.dex.getEffectiveness('Flying', type) < 0) return typeMod
			return typeMod + this.dex.getEffectiveness('Flying', type);
		},
	},
	tailwind: {
		inherit: true,
		condition: {
			duration: 4,
			durationCallback(target, source, effect) {
				if (this.field.isBattlefield('skyfield')) {
					this.field.setWeather('deltastream');
					return 8;
				}
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Tailwind');
					return 6;
				}
				return 4;
			},
			onSideStart(side, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-sidestart', side, 'move: Tailwind', '[persistent]');
				} else {
					this.add('-sidestart', side, 'move: Tailwind');
				}
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(2);
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 5,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Tailwind');
			},
		},
	},
	weatherball: {
		inherit: true,
		onModifyType(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.type = 'Fire';
				break;
			case 'raindance':
			case 'primordialsea':
				move.type = 'Water';
				break;
			case 'sandstorm':
				move.type = 'Rock';
				break;
			case 'hail':
			case 'snow':
				move.type = 'Ice';
				break;
			case 'deltastream':
				move.type = 'Flying';
				break;
			case 'shadowsky':
				move.type = '???';
				break;
			}
		},
		onModifyMove(move, pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				move.basePower *= 2;
				break;
			case 'raindance':
			case 'primordialsea':
				move.basePower *= 2;
				break;
			case 'sandstorm':
				move.basePower *= 2;
				break;
			case 'hail':
			case 'snow':
				move.basePower *= 2;
				break;
			case 'deltastream':
				move.basePower *= 2;
				break;
			case 'shadowsky':
				move.basePower *= 2;
				break;
			}
			this.debug('BP: ' + move.basePower);
		},
	},
	perishsong: {
		inherit: true,
		condition: {
			duration: 4,
			durationCallback(source, effect) {
				if (source.volatiles['infernalperish']) {
					return 1;
				}
				return 4;
			},
			onEnd(target) {
				this.add('-start', target, 'perish0');
				target.faint();
			},
			onResidualOrder: 24,
			onResidual(pokemon) {
				const duration = pokemon.volatiles['perishsong'].duration;
				this.add('-start', pokemon, 'perish' + duration);
			},
		},
	},
	hex: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose') || this.field.isBattlefield('infernalfield')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	nightmare: {
		inherit: true,
		condition: {
			noCopy: true,
			onStart(pokemon) {
				if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose') && !this.field.isBattlefield('infernalfield')) {
					return false;
				}
				this.add('-start', pokemon, 'Nightmare');
			},
			onResidualOrder: 11,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / 4);
			},
		},
	},
	// custom move
	alphashot: {
		num: 1,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Alpha Shot",
		pp: 35,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		shortDesc: "No additional effect.",
		target: "normal",
		type: "Normal",
		contestType: "Tough",
	},
	aquabatics: {
		num: 2,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Aquabatics",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		secondary: null,
		boosts: {
			spa: 1,
			spe: 1,
		},
		desc: "Raises the user's Special Attack and Speed by 1 stage.",
		shortDesc: "Raises the user's Sp. Attack and Speed by 1.",
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	arenitewall: { //TODO - must be removable by brick break, defog, psychic fangs, etc.
		num: 3,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Aquabatics",
		pp: 15,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		sideCondition: 'arenitewall',
		onTry() {
			return this.field.isWeather(['sandstorm']) || this.field.isBattlefield(['desertfield', 'ashenbeachfield', 'rockyfield']);
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if (target.getMoveHitData(move).typeMod > 0) {
						this.debug('Arenite Wall weaken');
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Arenite Wall');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 10,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Arenite Wall');
			},
		},
		secondary: null,
		desc: "For 5 turns, the user and its party members take 0.5x damage from super effective attacks. It is removed from the user's side if the user or an ally is successfully hit by Brick Break, Psychic Fangs, or Defog. Brick Break and Psychic Fangs remove the effect before damage is calculated. Lasts for 8 turns if the user is holding Light Clay. Fails unless the weather is Sandstorm.",
		shortDesc: "For 5 turns, damage taken by super effective moves is halved. Sandstorm only.",
		target: "allySide",
		type: "Ground",
		contestType: "Tough",
	},
	barbedweb: {
		num: 4,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Barbed Web",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		critRatio: 2,
		secondary: {
			chance: 30,
			status: 'psn',
		},
		desc: "Has a higher chance for a critical hit. Has a 30% chance to poison the target.",
		shortDesc: "High critical hit ratio. 30% chance to poison the target.",
		target: "allAdjacentFoes",
		type: "Bug",
		contestType: "Tough",
	},
	bunrakubeatdown: {
		num: 5,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Bunraku Beatdown",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		critRatio: 2,
		onBasePower(basePower, attacker, defender, move){
			if (attacker.ability === 'worldofnightmares') {
				const fallen = defender.side.totalFainted;
				return basePower+15*fallen
			} else {
			const fallen = Math.min(attacker.side.totalFainted, 6);
			return basePower+15*fallen
		}
		},
		secondary: null,
		desc: "Basepower increases by 15 BP for each fainted ally, capping at 6 faintes allied. Will increase basepower by 15 BP for each fainted foe instead if the user's ability is World of Nightmares.",
		shortDesc: "+15 BP per fainted ally. +15 BP per fainted for if user's ability is World of Nightmares.",
		target: "normal",
		type: "Bug",
		contestType: "Tough",
	},
	coldtruth: {
		num: 6,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		name: "Cold Truth",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onHit(target, source) {
			target.addVolatile('torment')
		},
		secondary: null,
		desc: "Torments foe on hit.",
		shortDesc: "Torments foe on hit.",
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Tough",
	},
	decimation: { //TODO - Add petrification condition
		num: 7,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Decimation",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 30,
			status: 'ptr',
		},
		ignoreAbility: true,
		desc: "Has a 30% chance to petrify the target. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "30% chance to petrify the target. Ignores abilities.",
		target: "normal",
		type: "Dark",
		contestType: "Tough",
	},
	deluge: {
		num: 8,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Deluge",
		pp: 10,
		priority: -4,
		flags: {protect: 1, mirror: 1, metronome: 1},
		basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug('BP doubled for getting hit by ' + target);
				return move.basePower * 2;
			}
			return move.basePower;
		},
		secondary: null,
		desc: "Power doubles if the user was hit by the target this turn.",
		shortDesc: "Power doubles if user is damaged by the target.",
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	desertsmark: {
		num: 9,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Desert's Mark",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, reflectable: 1},
		volatileStatus: 'desertsmark',
		condition: {
			name: 'desertsmark',
			duration: 5,
			durationCallback(target, source) {
				if (source?.hasItem('gripclaw')) return 8;
				return this.random(5, 7);
			},
			onStart(pokemon, source) {
				this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, '[of] ' + source);
				this.effectState.boundDivisor = (source.hasItem('bindingband') || this.field.isBattlefield(['desertfield'])) ? 6 : 8;
			},
			onResidualOrder: 13,
			onResidual(pokemon) {
				const source = this.effectState.source;
				if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns)) {
					delete pokemon.volatiles['partiallytrapped'];
					this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
					return;
				}
				this.damage(pokemon.baseMaxhp / this.effectState.boundDivisor);
				if (this.field.isTerrain(['ashenbeach'])) {
					this.boost({accuracy: -1})
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]');
			},
			onTrapPokemon(pokemon) {
				if (this.effectState.source?.isActive) pokemon.tryTrap();
			},
		},
		onHit(target) {
			if (target.getTypes().join() === 'Ground' || !target.setType('Ground')) {
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Ground');
		},
		secondary: null,
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Shed Tail, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Mortal Spin, Rapid Spin, or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages the target for 4-5 turns.",
		target: "normal",
		type: "Ground",
		contestType: "Tough",
	},
	etherealtempest: {
		num: 10,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Ethereal Tempest",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		desc: "Has a 20% chance to paralyze the target.",
		shortDesc: "20% chance to paralyze the target.",
		type: "Flying",
		contestType: "Cool",
	},
	feverpitch: {
		num: 11,
		accuracy: 100,
		basePower: 0,
		category: "Special",
		name: "Fever Pitch",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTry(source) {
			return source.status === 'slp' || source.hasAbility('comatose');
		},
		onTryMove(source) {
			if (source.status === 'slp') {
				source.cureStatus()
			}
		},
		onModifyMove(move, pokemon) {
			const i = this.random(100);
			if (i < 5) {
				move.magnitude = 4;
				move.basePower = 40;
			} else if (i < 15) {
				move.magnitude = 5;
				move.basePower = 60;
			} else if (i < 35) {
				move.magnitude = 6;
				move.basePower = 65;
			} else if (i < 65) {
				move.magnitude = 7;
				move.basePower = 70;
			} else if (i < 85) {
				move.magnitude = 8;
				move.basePower = 85;
			} else if (i < 95) {
				move.magnitude = 9;
				move.basePower = 100;
			} else {
				move.magnitude = 10;
				move.basePower = 150;
			}
		},
		onUseMoveMessage(pokemon, target, move) {
			this.add('-activate', pokemon, 'move: Fever Pitch', move.magnitude);
		},
		secondary: null,
		desc: "The power of this move varies; 5% chances for 10 and 150 power, 10% chances for 30 and 110 power, 20% chances for 50 and 90 power, and 30% chance for 70 power.",
		shortDesc: "Hits adjacent Pokemon.",
		target: "allAdjacent",
		type: "Fire",
		contestType: "Tough",
	},
	galestrike: {
		num: 12,
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		name: "Gale Strike",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, metronome: 1},
		onModifyMove(move, source, target) {
			if (source.hp < source.maxhp / 2) {
				move.willCrit = true;
			}
		},
		onBasePower(basePower, pokemon, target) {
			if (this.field.isBattlefield(['forestfield'])) {
				return this.chainModify(1.5);
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (this.field.isBattlefield(['forestfield'])) {
			return typeMod + this.dex.getEffectiveness('Grass', type);
			}
		},
		desc: "Move will land a critical hit if user is under 50% of its max HP.",
		shortDesc: "Move crits if user is under 50% of its max HP.",
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Clever",
	},
	gildedarrow: {
		num: 13,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Gilded Arrow",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, metronome: 1},
		onModifyMove(move, source, target) {
			var type = 'Normal'
			if (source.types.length > 1 && ['Dark', 'Fairy'].includes(source.types.slice(-1)[0])) {
				type = source.types.slice(-1)[0];
			} else {
				type = source.types[0];
			}
			move.type = type;
 		},
		secondary: null,
		desc: "If the first hit breaks the target's substitute, it will take damage for the second hit. Type depends on user's last type, unless this is Dark or Fairy, in which case the first type is used instead.",
		shortDesc: "Type depends on user's last type, unless Dark or Fairy.",
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	gildedhelix: {
		num: 14,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		name: "Gilded Helix",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, contact: 1, metronome: 1},
		onModifyMove(move, source, target) {
			var type = 'Normal'
			if (source.types.length > 1 && ['Dark', 'Fairy'].includes(source.types.slice(-1)[0])) {
				type = source.types.slice(-1)[0];
			} else {
				type = source.types[0];
			}
			move.type = type;
 		},
		secondary: null,
		multihit: 2,
		critRatio: 2,
		desc: "High crit ratio. Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. Type depends on user's last type, unless this is Dark or Fairy, in which case the first type is used instead.",
		shortDesc: "High crit ratio. Hits 2 times in one turn. Type depends on user's last type, unless Dark or Fairy.",
		target: "normal",
		type: "Normal",
		contestType: "Clever",
	},
	heavenlywing: {
		num: 15,
		accuracy: true,
		basePower: 90,
		category: "Physical",
		name: "Hevenly Wing",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondary: null,
		shortDesc: "Resets all of the target's stat stages to 0.",
		target: "normal",
		type: "Flying",
		contestType: "Beautiful",
	},
	hexingslash: {
		num: 16,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Hexing Slash",
		pp: 15,
		priority: 0,
		flags: {protect: 1, contact: 1, mirror: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		secondary: {
			chance: 30,
			status: 'psn',
		},
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	hoarfrostmoon: {
		num: 17,
		accuracy: 90,
		basePower: 90,
		category: "Special",
		name: "Hoarfrost Moon",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		desc: "Has a 50% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "50% chance to raise the user's Sp. Atk by 1.",
		target: "allAdjacentFoes",
		type: "Ice",
		contestType: "Beautiful",
	},
	irritation: {
		num: 18,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Irritation",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		desc: "Power doubles if the target has a non-volatile status condition.",
		shortDesc: "Power doubles if the target has a status ailment.",
		target: "normal",
		type: "Bug",
		zMove: {basePower: 160},
		contestType: "Clever",
	},
	magmadrift: {
		num: 19,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Magma Drift",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1},
		secondary: null,
		shortDesc: "Hits adjacent Pokemon.",
		target: "allAdjacent",
		type: "Fire",
		contestType: "Beautiful",
	},
	matrixshot: {
		num: 20,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		overrideDefensiveStat: 'spd',
		name: "Matrix Shot",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		desc: "Deals damage to the target based on its Special Defense instead of Defense.",
		shortDesc: "Damages target based on Sp. Def, not Defense.",
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	mirrorbeam: {
		num: 21,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Mirror Beam",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, source, target) {
			move.type = source.types.slice(-1)[0];
		},
		secondary: null,
		desc: "This move will take on the user's last type.",
		shortDesc: "Type is last type user has.",
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	mudbarrage: {
		num: 22,
		accuracy: 95,
		basePower: 25,
		category: "Special",
		name: "Mud Barrage",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		multihit: [2, 5],
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times. If the user is holding Loaded Dice, this move will hit 4-5 times.",
		shortDesc: "Hits 2-5 times in one turn.",
		target: "normal",
		type: "Ground",
		contestType: "Beautiful",
	},	
	multipulse: {
		num: 23,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Multipulse",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyType(move, pokemon) {
			if (pokemon.ignoringItem()) return;
			const item = pokemon.getItem();
			if (item.id && item.onPlate && !item.zMove) {
				move.type = item.onPlate;
			}
		},
		secondary: null,
		desc: "This move's type depends on the user's held Plate.",
		shortDesc: "Type varies based on the held Plate.",
		target: "normal",
		type: "Normal",
		contestType: "Beautiful",
	},
	poisonsweep: {
		num: 24,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Poison Sweep",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		desc: "Has a 30% chance to lower the target's Speed by 1 stage.",
		shortDesc: "30% chance to lower the foe's Speed by 1.",
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	pyrokinesis: {
		num: 25,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Pyrokinesis",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, defrost: 1},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		desc: "Has a 30% chance to burn the target. The target thaws out if it is frozen.",
		shortDesc: "30% chance to burn the target. Thaws target.",
		target: "normal",
		type: "Poison",
		contestType: "Cool",
	},
	quicksilverspear: {
		num: 26,
		accuracy: 75,
		basePower: 80,
		category: "Physical",
		name: "Quicksilver Spear",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onHit(target, source, move) {
			target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: {
			boosts: {
				spe: -1,
			},
		},
		desc: "Lowers target's Speed by 1 stage. Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.",
		shortDesc: "Lowers target's Speed by 1 stage. Prevents target from switching out.",
		target: "normal",
		type: "Steel",
		contestType: "Cool",
	},
	riftsnare: {
		num: 27,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Rift Snare",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		shortDesc: "No additional effect.",
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	slashandburn: {
		num: 28,
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		name: "Slash and Burn",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Grass",
		contestType: "Cool",
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "10% chance to burn the target.",
	},
	solarflare: {
		num: 29,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		name: "Solar Flare",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		desc: "Has a 50% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "50% chance to raise the user's Sp. Atk by 1.",
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	sparkleon: {
		num: 30,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Sparkle On",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		recoil: [1, 3],
		secondary: null,
		target: "normal",
		desc: "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil.",
		type: "Fairy",
		contestType: "Tough",
	},
	spectralscream: {
		num: 31,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Spectral Scream",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, sound: 1},
		secondary: {
			chance: 60,
			onHit(target, source) {
				const result = this.random(2);
				if (result === 0) {
					this.boost({def: 1})
				} else {
					this.boost({spd: 1})
				}
			},
		},
		desc: "Has a 60% chance to raise user's Defense or Special Defense by 1 stage.",
		shortDesc: "60% chance to raise the user's Def or Sp. Def by 1.",
		target: "normal",
		type: "Ghost",
	},
	stackingshot: {
		num: 32,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			if (!pokemon.volatiles['stackingshot'] || move.hit === 1) {
				pokemon.addVolatile('stackingshot');
			}
			const bp = this.clampIntRange(move.basePower * pokemon.volatiles['stackingshot'].multiplier, 1, 160);
			this.debug('BP: ' + bp);
			return bp;
		},
		category: "Physical",
		name: "Stacking Shot",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		condition: {
			duration: 2,
			onStart() {
				this.effectState.multiplier = 1;
			},
			onRestart() {
				if (this.effectState.multiplier < 4) {
					this.effectState.multiplier <<= 1;
				}
				this.effectState.duration = 2;
			},
		},
		secondary: null,
		desc: "Power doubles with each successful hit, up to a maximum of 160 power. The power is reset if this move misses or another move is used.",
		shortDesc: "Power doubles with each hit, up to 160.",
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	superumdmove: {
		num: 33,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Super U.M.D Move",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			if (!target) return;
			const atk = pokemon.getStat('atk', false, true);
			const spa = pokemon.getStat('spa', false, true);
			const def = target.getStat('def', false, true);
			const spd = target.getStat('spd', false, true);
			const physical = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * atk) / def) / 50);
			const special = Math.floor(Math.floor(Math.floor(Math.floor(2 * pokemon.level / 5 + 2) * 90 * spa) / spd) / 50);
			if (physical > special || (physical === special && this.randomChance(1, 2))) {
				move.category = 'Physical';
				move.flags.contact = 1;
			}
				move.secondaries = [];
			if (move.category = 'Physical') {
				move.secondaries.push({
					chance: 20,
					boosts: {def: -1}
				});
			} else {
				move.secondaries.push({
					chance: 20,
					boosts: {spd: -1}
				});
			}
		},
		secondary: null,
		desc: "This move becomes a special attack if the value of ((((2 * the user's level / 5 + 2) * 90 * X) / Y) / 50), where X is the user's SpAtk stat and Y is the target's SpDef stat, is greater than the same value where X is the user's Attack stat and Y is the target's Defense stat. No stat modifiers other than stat stage changes are considered for this purpose. If the two values are equal, this move chooses a damage category at random.",
		shortDesc: "Special if it would be stronger.",
		target: "normal",
		type: "Steel",
	},
	thunderraid: {
		num: 34,
		accuracy: 100,
		basePower: 20,
		basePowerCallback(pokemon, target, move) {
			return 20 * move.hit;
		},
		category: "Physical",
		name: "Thunder Raid",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		multihit: 3,
		multiaccuracy: true,
		secondary: null,
		desc: "Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
		shortDesc: "Hits 3 times. Each hit can miss, but power rises.",
		target: "normal",
		type: "Electric",
		zMove: {basePower: 120},
		maxMove: {basePower: 140},
	},
	tidalwave: {
		num: 35,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Tidal Wave",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		desc: "Hits adjacent Pokemon.",
		shortDesc: "Hits adjacent Pokemon.",
		target: "allAdjacent",
		type: "Water",
		contestType: "Beautiful",
	},
	uproot: {
		num: 36,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Uproot",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		desc: "Has a 100% chance to lower the target's Special Defense by 2 stages.",
		shortDesc: "100% chance to lower the target's Sp. Def by 2.",
		target: "normal",
		type: "Grass",
	},
	venamskiss: {
		num: 37,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Venam's Kiss",
		desc: "This move's type effectiveness against Steel is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Steel. 10% chance to poison foe.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		ignoreImmunity: {'Poison': true},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Steel') return 1;
		},
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Beautiful",
	},
	vileassault: {
		num: 38,
		accuracy: 100,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Vile Assault damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Vile Assault",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('vileassault', pokemon);
				const data = side.getSideConditionData('vileassault');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('vileassault');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Vile Assault start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Vile Assault');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst || source.canTerastallize) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source) {
								if (action.choice === 'megaEvo') {
									this.actions.runMegaEvo(source);
								} else if (action.choice === 'terastallize') {
									// Also a "forme" change that happens before moves, though only possible in NatDex
									this.actions.terastallize(source);
								} else {
									continue;
								}
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('vileassault', source, source.getLocOf(pokemon));
				}
			},
		},
		secondary: null,
		desc: "If an opposing Pokemon switches out this turn, this move hits that Pokemon before it leaves the field, even if it was not the original target. If the user moves after an opponent using Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch, but not Baton Pass, it will hit that opponent before it leaves the field. Power doubles and no accuracy check is done if the user hits an opponent switching out, and the user's turn is over; if an opponent faints from this, the replacement Pokemon does not become active until the end of the turn.",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	wakeupshock: {
		num: 39,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
			if (target.status === 'slp' || target.hasAbility('comatose')) {
				this.debug('BP doubled on sleeping target');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Wake-Up Shock",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		onHit(target) {
			if (target.status === 'slp') target.cureStatus();
		},
		secondary: null,
		desc: "Power doubles if the target is asleep. If the user has not fainted, the target wakes up.",
		shortDesc: "Power doubles if target is asleep, and wakes it.",
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},
	steelnose: {
		num: 0,
		accuracy: true,
		basePower: 20,
		category: "Physical",
		name: "Steel Nose",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: null,
		desc: "To be called by Probopass Crest.",
		shortDesc: "To be called by Probopass Crest.",
		target: "normal",
		type: "Steel",
		contestType: "Tough",
	},
	rocknose: {
		num: 0,
		accuracy: true,
		basePower: 20,
		category: "Physical",
		name: "Rock Nose",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: null,
		desc: "To be called by Probopass Crest.",
		shortDesc: "To be called by Probopass Crest.",
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	electricnose: {
		num: 0,
		accuracy: true,
		basePower: 20,
		category: "Physical",
		name: "Electric Nose",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		secondary: null,
		desc: "To be called by Probopass Crest.",
		shortDesc: "To be called by Probopass Crest.",
		target: "normal",
		type: "Electric",
		contestType: "Tough",
	},

	// Terrains
	// Elemental terrains
	
	electricterrain: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Electric Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		terrain: 'electricterrain',
		condition: {
			effectType: "Terrain",
			duration: 3,
			durationCallback(source, effect) {
				if (source?.lastMoveUsed && ['iondeluge', 'stokedsparksurfer', 'plasmafists'].includes(source.lastMoveUsed.id) && !source.hasItem('everstone')) {
					return source.hasItem('amplifiedrock')? 3 : 6
				}
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if ((move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable())
				|| ['explosion', 'hurricane', 'muddywater', 'selfdestruct', 'smackdown', 'surf', 'thousandarrows', 'wildboltstorm'].includes(move.id)) {
					this.debug('electric terrain boost');
					return this.chainModify(1.5);
				}
				if (move.id === 'magnetbomb') return this.chainModify(2);
			},
			onEffectiveness(typeMod, target, type, move) {
				if (['explosion', 'hurricane', 'muddywater', 'selfdestruct', 'smackdown', 'surf', 'thousandarrows', 'wildboltstorm', 'hydrovortex'].includes(move.id)) return typeMod + this.dex.getEffectiveness('Electric', type);
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},		
			onSwitchIn(pokemon) {
				if (['steadfast'].includes(pokemon.ability)) this.boost({spe: 1});
				if (['lightningrod'].includes(pokemon.ability)) this.boost({spe: 1});
			},	
			onResidual(target, source, effect) {
				if (target.hasAbility('voltabsorb')) this.heal(target.baseMaxhp / 16);
				if (target.hasAbility('motordrive')) this.boost({spe: 1});
			},
			onModifyMove(move, pokemon, target) {
				if (move.id === 'charge') return move.boosts = {spd: 2};
				if (move.id === 'eerieimpulse') return move.boosts = {spa: -3};
				if (move.id === 'electroweb') return move.secondary = {chance: 100, boosts: {spe: -2}};
				if (move.id === 'paraboliccharge') return move.drain = [3, 4];
				if (move.id === 'wildcharge') return move.recoil = undefined;
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
		secondary: null,
		target: "all",
		type: "Electric",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	grassyterrain: {
		inherit: true,
		condition: {
			effectType: "Terrain",
			duration: 3,
			durationCallback(source, effect) {
				if (source?.lastMoveUsed && ['bloomdoom'].includes(source.lastMoveUsed.id) && !source.hasItem('everstone')) {
					return source.hasItem('amplifiedrock')? 3 : 6
				}
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onFieldStart(field, source, effect) {
				this.field.terrainState.flooding = 0;
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Grassy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Grassy Terrain');
				}
			},
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Grass' && attacker.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify(1.5);
				}
				if (move.type === 'Fire' && defender.isGrounded()) {
					this.debug('grassy terrain boost');
					return this.chainModify(1.5);
				}
				if (['fairywind', 'grassknot', 'gust', 'icywind', 'ominouswind', 'razorwind', 'silverwind', 'twister'].includes(move.id)) {
					this.debug('grassy terrain boost');
					return this.chainModify(1.5)
				}
				const weakenedMoves = ['earthquake', 'bulldoze', 'magnitude'];
				if (weakenedMoves.includes(move.id) && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('move weakened by grassy terrain');
					return this.chainModify(0.5);
				}
				if (['sludgewave', 'aciddownpour'].includes(move.id)) {
					return this.chainModify(1.3)
				}
				if ((move.id === 'surf' && this.field.terrainState.flooding >= 2) || (move.id === 'muddywater' && this.field.terrainState.flooding >= 1)) {
					return this.chainModify(1.3)
				}
			},
			onModifyMove(move, pokemon, target) {
				if (['absorb', 'megadrain', 'gigadrain', 'hornleech'].includes(move.id)) {
					move.drain = [3,4]
				}
				if (move.id === 'coil') move.boosts = {atk: 2, def: 2, accuracy: 2};
				if (move.id === 'cottonspore') move.boosts = {spe: -4};
				if (move.id === 'grasswhistle') move.accuracy = 80 ;
				if (move.id === 'worryseed') move.boosts = {atk: -1};
			},
			onHit(target, source, move) {
				if (move.id === 'surf') this.field.terrainState.flooding += 1;
				if (move.id === 'muddywater') this.field.terrainState.flooding += 2; 
				if (this.field.terrainState.flooding >= 3) this.field.setBattlefield('swampfield');
				if (['sludgewave', 'aciddownpour'].includes(move.id)) {
					this.hint('The grassy terrain was corroded!')
					this.field.setBattlefield('corrosivefield');
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual(pokemon) {
				if (pokemon.hasAbility('sapsipper')) this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable()) {
					this.heal(pokemon.baseMaxhp / 16, pokemon, pokemon);
				} else {
					this.debug(`Pokemon semi-invuln or not grounded; Grassy Terrain skipped`);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Grassy Terrain');
			},
		},
	},
	mistyterrain: {
		inherit: true,
		condition: {
			effectType: "Terrain",
			duration: 3,
			durationCallback(source, effect) {
				if (source?.lastMoveUsed && ['mist'].includes(source.lastMoveUsed.id) && !source.hasItem('everstone')) {
					return source.hasItem('amplifiedrock')? 3 : 6
				}
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5);
				}
				if (move.type === 'Fairy' && attacker.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('misty terrain boost');
					return this.chainModify(1.5);
				}
				if (['aurasphere', 'clearsmog', 'doomdesire', 'icywind', 'magicalleaf', 'mistball', 'moongeistbeam', 'mysticalfire', 'silverwind', 'smog', 'springtidestorm', 'steameruption', 'strangestream'].includes(move.id)) {
					this.debug('misty terrain boost');
					return this.chainModify(1.5)
				}
				if (['darkpulse', 'nightdaze', 'shadowball'].includes(move.id)) {
					this.debug('misty terrain weaken');
					return this.chainModify(0.5)
				}
				if (['gust', 'hurricane', 'razorwind', 'supersonicskystrike','twister','aciddownpour'].includes(move.id)) {
					this.debug('misty terrain boost');
					return this.chainModify(1.3)
				}
				if (['clearsmog', 'smog'].includes(move.id) && this.field.terrainState.corrosion >= 1) {
					return this.chainModify(1.3)
				}
			},	
			onModifyMove(move, pokemon, target) {
				if (move.id === 'aromaticmist') move.boosts = {spd: 2};
				if (move.id === 'cosmicpower') move.boosts = {def: 2, spd: 2};
				if (move.id === 'sweetkiss') move.accuracy = 100;
				if (move.id === 'sweetscent') move.boosts = {def: -2, spd: -2, evasion: -2};
			},
			onHit(target, source, move) {
				if (['defog', 'gust', 'hurricane', 'razorwind', 'supersonicskystrike', 'tailwind', 'twister', 'whirlwind'].includes(move.id)) this.field.clearTerrain
				if (['clearsmog', 'poisongas', 'smog'].includes(move.id)) this.field.terrainState.corrosion += 1;
				if (move.id === 'aciddownpour') this.field.terrainState.corrosion += 2; 
				if (this.field.terrainState.corrosion >= 2) this.field.setBattlefield('corrosivemistfield');
			},
			onAnyTryMove(target, source, effect) {
				if (['explosion', 'mindblown', 'selfdestruct'].includes(effect.id)) {
					this.attrLastMove('[still]');
					this.add('cant', this.effectState.target, 'field: Misty Terrain', effect, '[of] ' + target);
					return false;
				}
			},
			onModifySpDPriority: 10,
			onModifySpD(spd, pokemon) {
				if (pokemon.hasType('Fairy')) {
					return this.modify(spd, 1.5);
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 4,
			onResidual(pokemon) {
				if (pokemon.hasAbility('dryskin')) this.heal(pokemon.baseMaxhp / 16);
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasAbility('watercompaction')) this.boost({def: 2});
			},
			onFieldStart(field, source, effect) {
				this.field.terrainState.corrosion = 0;
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
	},
	volcanicfield: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Volcanic Field",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		battlefield: 'volcanicfield',
		condition: {
			effectType: "Battlefield",
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('volcanic field boost');
					return this.chainModify(1.5);
				}
				if (['Grass', 'Ice'].includes(move.type) && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('volcanic field weaken');
					return this.chainModify(0.5);
				}
				if (['clearsmog', 'smog'].includes(move.id)) return this.chainModify(2);
				if (['rockslide', 'smackdown', 'thousandarrows', 'infernalparade'].includes(move.id)) return this.chainModify(1.5);
				if ([
					'continentalcrush', 'sandtomb', 
					'defog', 'gust', 'hurricane', 'razorwind', 'supersonicskystrike', 'tailwind', 'twister', 'whirlwind',
					'hydrovortex', 'muddywater', 'oceanicoperetta','sparklingaria','surf','waterpledge','watersport','waterspout',
					'sludgewave'
					].includes(move.id)) return this.chainModify(1.3);
			},
			onEffectiveness(typeMod, target, type, move) {
				if (['clearsmog', 'smog', 'rockslide', 'smackdown', 'thousandarrows'].includes(move.id)) return typeMod + this.dex.getEffectiveness('Fire', type);
			},
			onModifyMove(move, pokemon, target) {
				if (move.id === 'smokescreen') move.boosts = {accuracy: -2}
				if (move.id === 'willowisp') move.accuracy = 100;
			},
			onHit(target, source, move) {
				if ([
					'continentalcrush', 'sandtomb', 
					'defog', 'gust', 'hurricane', 'razorwind', 'supersonicskystrike', 'tailwind', 'twister', 'whirlwind',
					'hydrovortex', 'muddywater', 'oceanicoperetta','sparklingaria','surf','waterpledge','watersport','waterspout',
					'sludgewave'
					].includes(move.id)) this.field.setBattlefield('cavefield')
			},
			onUpdate(pokemon) {
				if (pokemon.status === 'frz') {
					this.add('-activate', pokemon, 'field: Volcanic Field');
					pokemon.cureStatus();
				}
			},
			onImmunity(type, pokemon) {
				if (type === 'frz') return false;
			},
			onSwitchIn(pokemon) {
				if (pokemon.ability === 'magmaarmor') this.boost({def: 1});
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				if (pokemon.hasAbility('flashfire') && pokemon.isGrounded()) pokemon.addVolatile('flashfire');
				if (pokemon.hasAbility('steamengine')) this.boost({spe: 1});
				if (pokemon.lastMoveUsed?.id === 'burnup' && pokemon.hasType('???')) {
					pokemon.setType(pokemon.getTypes(true).map(type => type === '???' ? 'Fire' : type));
					this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] field: Volcanic Field');
				}
				if (this.field.isWeather(['sandstorm', 'raindance', 'primordialsea'])) this.field.setBattlefield('cavefield');
				if (pokemon.hasAbility(['flamebody', 'flareboost', 'flashfire', 'heatproof', 'magmaarmor', 'waterbubble','waterveil']) || pokemon.volatiles['aquaring']) return;
				if (pokemon.isGrounded() && !pokemon.isSemiInvulnerable() && !pokemon.hasType('Fire')) {
					var typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('flamethrower')), -6, 6);
					if (pokemon.hasAbility(['fluffy', 'grasspelt', 'icebody', 'leafguard']) || pokemon.volatiles['tarshot']) typeMod *= 2;
						this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
				}
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect.id === 'ragingfury') {
					this.add('-activate', target, 'field: Volcanic Field');
				}
				return false;
			},
			onFieldStart(field, source, effect) {
				if (this.field.isWeather(['hail', 'snow'])) this.field.clearWeather;
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Volcanic Field', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Volcanic Field');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Volcanic Field');
			},
		},
		secondary: null,
		target: "all",
		type: "Fire",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	corrosivemistfield: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Corrosive Mist Field",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		battlefield: 'corrosivemistfield',
		condition: {
			effectType: "Battlefield",
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onHit(target, source, move) {
				if (move.id === 'gravity'){
					 this.field.setBattlefield('corrosivefield');
					 this.hint('The toxic mist collected on the ground!')
					}
				if (move.id === 'seedflare'){
						this.field.setTerrain('mistyterrain');
						this.hint('The polluted mist was purified!')
					}
				if (['defog', 'gust', 'hurricane', 'razorwind', 'supersonicskystrike', 'tailwind', 'twister', 'whirlwind'].includes(move.id)){
					this.field.clearTerrain()
					this.field.clearBattlefield()
					this.hint('The mist was blown away!')
				}
				if (['eruption', 'explosion', 'firepledge', 'flameburst', 'heatwave', 'incinerate','infernooverdrive','lavaplume','mindblown','searingshot','self-destruct'].includes(move.id)){
					this.field.clearTerrain()
					this.field.clearBattlefield()
					let damp = false;
					for (const poke of this.getAllActive()) {
						if (this.toID(poke.ability) === ('damp' as ID)) {
							damp = true;
							break;
						}
					}
					if (damp) return;
					for (const poke of this.getAllActive()) {
						if (poke.hasAbility('flashfire') || poke.isProtected()) return;
						poke.damage(poke.baseMaxhp, source, move)
					}
					this.hint('The toxic mist combusted!')
				}
			},
			onBasePower(basepower, source, target, move) {
				if (move.type === 'Fire'){ 
					this.chainModify(1.5);
					this.hint('The toxic mist caught flame!')
				}
				if (source.hasAbility('corrosion')) this.chainModify(1.5);
				if (['acidspray','appleacid','bubble','bubblebeam','clearsmog','smog','sparklingaria'].includes(move.id)) this.chainModify(1.5)
				if ([
					'seedflare',
					'gust', 'hurricane', 'razorwind', 'supersonicskystrike', 'twister'
					].includes(move.id)) this.chainModify(1.3);
				},
			onEffectiveness(typeMod, target, type, move) {
				if (['acidspray','appleacid','bubble','bubblebeam','clearsmog','smog','sparklingaria'].includes(move.id)) {
					this.hint(`The poison strengthened the attack!`)
					return typeMod + this.dex.getEffectiveness('Poison', type);
				}
				if (move.category === 'Special') return typeMod + this.dex.getEffectiveness('Poison', type);
				if (move.id === 'energyball') return typeMod + this.dex.getEffectiveness('Poison', type); // This one doesn't have the flavor text :/
			},
			onModifyMove(move, pokemon, target) {
				if (move.id === 'acidarmor') move.boosts = {def: 3};
				if (move.id === 'smokescreen') move.boosts = {accuracy: -2};
				if (move.id === 'toxic') move.accuracy = 100;
				if (['floralhealing', 'lifedew'].includes(move.id)) move.secondary = {chance: 100, status: 'psn'};
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasAbility('watercompaction')) this.boost({def: 2});
			},
			onResidualOrder: 9,
			onResidual(pokemon) {
				let ngas = false;
				for (const poke of this.getAllActive()) {
					if (this.toID(poke.ability) === ('neutralizinggas' as ID)) {
						ngas = true;
						break;
					}
				}
				if (!ngas) {
					pokemon.trySetStatus('psn')
					this.hint(`${pokemon.name} was poisoned by the corrosive mist!`)
				}
				if (!pokemon.hasType(['Poison', 'Steel'])) this.damage(pokemon.baseMaxhp / 8);
				if (pokemon.hasType('Poison')) this.heal(pokemon.baseMaxhp / 8);
				if (pokemon.hasAbility('poisonheal')) {
					this.heal(pokemon.baseMaxhp / 8 );
					this.hint(`${pokemon.name} was healed by poison!`)
				}
			},
			onFieldStart(field, source, effect) {
				if (this.field.isWeather(['hail', 'snow'])) this.field.clearWeather;
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Corrosive Mist Field', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Corrosive Mist Field');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Corrosive Mist Field');
			},
		},
		secondary: null,
		target: "all",
		type: "Poison",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	icyfield: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Icy Field",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		battlefield: 'icyfield',
		condition: {
			effectType: "Battlefield",
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onBasePower(basepower, source, target, move) {
				if (move.type === 'Ice' || move.id === 'bittermalice'){ 
					this.chainModify(1.5);
					this.hint('The cold strengthened the attack!')
				}
				if (move.type === 'Fire' || ['scald', 'steameruption'].includes(move.id)){ 
					this.chainModify(0.5);
					this.hint('The cold softened the attack...')
				}
				if (['eruption','firepledge','flameburst','heatwave',
					'incinerate','infernooverdrive','lavaplume','magmadrift',
					'mindblown','ragingfury','searingshot'].includes(move.id)) this.chainModify(1.3);
				if (move.id === 'scald' && this.field.battlefieldState.melting >= 1) this.chainModify(1.3)
			},
			onEffectiveness(typeMod, target, type, move) {
				if (move.type === 'Rock') return typeMod + this.dex.getEffectiveness('Ice', type);
			},
			onModifyDef(def, target, source, move) {
				if (this.field.isWeather('hail') && source.hasType('Ice')) return this.chainModify(1.5);
			},
			onModifyMove(move, pokemon, target) {
				if (move && move.id === 'bittermalice') {
					move.secondaries?.push({
					chance: 10,
					status: 'frz',
				});
				}

			},
			onAfterMove(source, target, move) {
				if (['bulldoze', 'earthquake', 'fissure', 'magnitude', 'tectonicrage'].includes(move.id)) {
					this.hint('The quake broke up the ice into spiky pieces!')
					for (const side of this.sides) {
						side.addSideCondition('spikes');
					}
				}
			},
			onHit(target, source, move) {
				if (move.id === 'scald') {
					this.field.battlefieldState.melting += 1;
					this.hint('Parts of the ice melted!')
				}
				if (move.id === 'steameruption') this.field.battlefieldState.melting += 2; 
				if (this.field.battlefieldState.melting >= 2) {
					this.hint('The hot water melted the ice!')
					this.field.setBattlefield('watersurfacefield');
				}
				if (['eruption','firepledge','flameburst','heatwave',
					'incinerate','infernooverdrive','lavaplume','magmadrift',
					'mindblown','ragingfury','searingshot'].includes(move.id)){ 
					this.field.setBattlefield('cavefield');
					this.hint('The ice melted away!')
				}
				if (['bulldoze', 'earthquake', 'fissure', 'magnitude', 'tectonicrage'].includes(move.id)) this.field.setBattlefield('cavefield');
			},
			onAfterHit(source, target, move) {
				if ((move.category === 'Physical' && move.flags.contact && move.priority > 0) || ['defensecurl', 'lunge', 'rollout', 'steamroller'].includes(move.id)) {
					this.hint(`${source.name} gained momentum on the ice!`)
					this.boost({spe: 1});
				}
			},
			onFieldStart(field, source, effect) {
				this.field.battlefieldState.melting = 0;
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Icy Field', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Icy Field');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Icy Field');
			},
		},
		secondary: null,
		target: "all",
		type: "Ice",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	watersurfacefield: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Water Surface Field",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		battlefield: 'watersurfacefield',
		condition: {
			effectType: "Battlefield",
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onBasePower(basepower, source, target, move) {
				if (move.type === 'Water'){ 
					this.chainModify(1.5);
					this.hint('The water strengthened the attack!')
				}
				if (move.type === 'Electric' && target.isGrounded()){ 
					this.chainModify(1.5);
					this.hint('The water conducted the attack!')
				}
				if (move.type === 'Fire' && target.isGrounded()){ 
					this.chainModify(0.5);
					this.hint('The water deluged the attack...')
				}
				if (move.priority > 0 && source.hasAbility('propellertail')) {
					this.chainModify(1.5);
				}
				if (['dive', 'hydrovortex', 'muddywater', 'octazooka', 'originpulse', 'surf', 'whirlpool'].includes(move.id)){ 
					this.chainModify(1.2);
					this.hint('The attack rode the current!')
				}
				if (move.id === 'sludgewave') {
					this.chainModify(1.2)
					this.hint('Poison spread through the water!')
				}
				if (['anchorshot', 'dive','gravapple','gravity', 'aciddownpour',
					'blizzard', 'glaciate','subzeroslammer'].includes(move.id)) {
					this.chainModify(1.3)
				}
				if (move.id === 'sludgewave' && this.field.battlefieldState.pollution > 0) {
					this.chainModify(1.3)
				}
			},
			onModifyMove(move, pokemon, target) {
				if (move.id === 'dive') move.condition = {}; // hoping this doesn't break dive
				if (move.id === 'shoreup' && pokemon.hasAbility('watercompaction')) this.boost({def: 1});
				if (move.id === 'splash') {
					move.target = 'normal'
					move.boosts = {accuracy: -1}
				}
				if (move.id === 'wavecrash') move.recoil = [1,4];
			},
			onAfterMove(source, target, move) {
				if (move.id === 'lifedew') this.actions.useMove('aquaring', source)
			},
			onTryHit(source, target, move) {
				if (move.type === 'Ground') {
					this.hint('...But there was no solid ground to attack from!')
					this.add('-activate', target, 'field: Water Surface Field');
					return null
				}
				if (['spikes', 'toxicspikes'].includes(move.id)) {
					this.hint('...The spikes sank into the water and vanished!')
					this.add('-activate', target, 'field: Water Surface Field');
					return null
				}
			},
			onHit(target, source, move) {
				if (move.id === 'sludgewave') this.field.battlefieldState.pollution += 1;
				if (move.id === 'aciddownpour') this.field.battlefieldState.pollution += 2; 
				if (this.field.battlefieldState.pollution >= 2) {
					this.hint('The water was polluted!')
					this.field.setBattlefield('murkwatersurfacefield');
				}
				if (move.id === 'anchorshot') {
					this.hint('The battle was pulled underwater!')
					this.field.setBattlefield('underwaterfield')
				}
				if (['dive','gravapple','gravity', 'aciddownpour'].includes(move.id)) {
					this.hint('The battle sank into the depths!')
					this.field.setBattlefield('underwaterfield')
				}
				if (['blizzard', 'glaciate', 'subzeroslammer'].includes(move.id)) {
					this.hint('The water froze over!')
					this.field.setBattlefield('icyfield')
				}
			},
			onModifySpe(spe, pokemon) {
				if (!pokemon.hasType('Water') && !pokemon.hasAbility(['surgesurfer', 'swiftswim'])) {
					return this.chainModify(0.75);
				}
			},
			onFieldStart(field, source, effect) {
				this.field.battlefieldState.pollution = 0;
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Water Surface Field', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Water Surface Field');
				}
			},
			onResidualOrder: 5,
			onResidual(pokemon) {
				if (pokemon.hasAbility('dryskin') && pokemon.isGrounded()) {
					this.hint(`${pokemon.name}'s Dry Skin was healed by the water!`)
					this.heal(pokemon.baseMaxhp / 16);
				}
				if (pokemon.hasAbility('waterabsorb') && pokemon.isGrounded()) {
					this.hint(`${pokemon.name} absorbed some of the water!`)
					this.heal(pokemon.baseMaxhp / 16);
				}
				if (pokemon.hasAbility('steamengine')) {
					this.boost({spe: 1});
				}
				if (pokemon.hasAbility('watercompaction')) {
					this.boost({def: 1});
				}
				if (pokemon.volatiles['tarshot']) {
					this.hint(`${pokemon.name} was cleansed of Tar Shot!`)
					pokemon.removeVolatile('tarshot')
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Water Surface Field');
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	underwaterfield: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Underwater Field",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		battlefield: 'underwaterfield',
		condition: {
			effectType: "Battlefield",
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onBasePower(basepower, source, target, move) {
				if (move.type === 'Electric') {
					this.chainModify(2)
					this.hint('The water super-conducted the attack!')
				}
				if (move.type === 'Water') {
					this.chainModify(1.5)
					this.hint('The water strengthened the attack!')
				}
				if (move.type != 'Water' && !source.hasType('Water') && move.category === 'Physical' && !source.hasAbility(['swiftswim', 'steelworker'])) {
					this.chainModify(0.5)
				}
				if (source.hasAbility('propellertail') && move.priority > 0) return this.chainModify(1.5)
				if (['anchorshot','dragondarts'].includes(move.id)) {
					this.chainModify(2);
					this.hint('From the depths!')
				}
				if (move.id === 'waterpulse') {
					this.chainModify(1.5);
					this.hint('Jet-streamed!')
				}
				if (['bounce','fly','dive','skydrop','aciddownpour'].includes(move.id)) {
					this.chainModify(1.3)
				}
				if (move.id === 'sludgewave' && this.field.battlefieldState.pollution > 0) {
					this.chainModify(1.3)
				}
			},
			onModifySpe(spe, pokemon) {
				if (!pokemon.hasType('Water') && !pokemon.hasAbility(['swiftswim', 'steelworker'])) this.chainModify(0.5);
			},
			onModifyMove(move, pokemon, target) {
				if (move.type === 'Electric') move.accuracy = true;
				if (move.id === 'dive') move.condition = {}; // hoping this doesn't break dive
				if (move.id === 'wavecrash') move.recoil = [1,4];
			},
			onEffectiveness(typeMod, target, type, move) {
				if (move.type === 'Ground' || ['dragondarts','gravapple'].includes(move.id)) return typeMod + this.dex.getEffectiveness('Water', type);
				if (move.type === 'Water' && type === 'Water') return 0;
			},
			onTryHit(source, target, move) {
				if (move.id === 'tarshot') {
					this.hint('The tar washed off instantly!')
					this.add('-activate', target, 'field: Water Surface Field');
					return null
				}
			},
			onHit(target, source, move) {
				if (move.id === 'sludgewave') this.field.battlefieldState.pollution += 1;
				if (move.id === 'aciddownpour') this.field.battlefieldState.pollution += 2;
				if (this.field.battlefieldState.pollution >= 2) {
					this.hint('The grime sank beneath the battlers! The water was polluted!')
					this.field.setBattlefield('murkwatersurfacefield');
				}
				if (['bounce','dive','fly','skydrop'].includes(move.id)) {
					this.hint('The battle resurfaced!')
					this.field.setBattlefield('watersurfacefield')
				}
				if (this.field.battlefieldState.pollution >= 2) {
					for (const poke of this.getAllActive()) {
						if (poke.hasType(['Poison', 'Steel'])) return;
						poke.faint()
					} 
				}
			},
			onFieldStart(field, source, effect) {
				this.field.battlefieldState.pollution = 0;
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Underwater Field', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Underwater Field');
				}
				if (this.field.weather) {
					this.field.clearWeather()
					this.hint(`You're too deep to notice the weather!`)
				}
			},
			onResidualOrder: 5,
			onResidual(pokemon) {
				if (pokemon.hasAbility('dryskin') && pokemon.isGrounded()) {
					this.heal(pokemon.baseMaxhp/16)
					this.hint(`${pokemon.name}'s Dry Skin was healed by the water!`)
				}
				if (pokemon.hasAbility('waterabsorb') && pokemon.isGrounded()) {
					this.heal(pokemon.baseMaxhp/16)
					this.hint(`${pokemon.name} absorbed some of the water!`)
				}
				if (pokemon.runEffectiveness(this.dex.getActiveMove('bubblebeam')) > 0 && !pokemon.hasAbility(['magicguard', 'swiftswim'])) {
					var typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('bubblebeam')), -6, 6);
					if (pokemon.hasAbility(['magmaarmor','flamebody'])) typeMod *=2;
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
					this.hint(`${pokemon.name} struggled in the water!`)
				}
				if (pokemon.hasAbility('steamengine')) this.boost({spe: 1})
				if (pokemon.hasAbility('watercompaction')) this.boost({def: 1})
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Underwater Field');
			},
		},
		secondary: null,
		target: "all",
		type: "Water",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	murkwatersurfacefield: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Murkwater Surface Field",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		battlefield: 'murkwatersurfacefield',
		condition: {
			effectType: "Battlefield",
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onBasePower(basePower, source, target, move) {
				if (['Water','Poison'].includes(move.type) ||
					['mudbarrage','mudbomb','mudshot','mudslap','thuosandwaves','appleacid','smackdown','acid','acidspray','brine'].includes(move.id)){
					this.chainModify(1.5)
					this.hint('The toxic water strengthened the attack!')
				}
				if (move.type === 'Electric'){
					this.chainModify(1.3)
					this.hint('The toxic water conducted the attack!')
				}
				if (['whirlpool','blizzard','glaciate','subzeroslammer'].includes(move.id)) this.chainModify(1.3)
			},
			onModifyMove(move, pokemon, target) {
				if (['mudbarrage','mudbomb','mudshot','mudslap','thuosandwaves'].includes(move.id)) move.type === 'Water';
				if (move.id === 'acidarmor') move.boosts = {def: 3};
				if (['lifedew','tarshot'].includes(move.id)) move.status === 'psn';
				if (move.id === 'shoreup' && pokemon.hasAbility('watercompaction')) this.boost({def: 1});
			},
			onEffectiveness(typeMod, target, type, move) {
				if (move.type === 'Water' || ['mudbarrage','mudbomb','mudshot','mudslap','thuosandwaves','appleacid','smackdown'].includes(move.id)) return typeMod + this.dex.getEffectiveness('Poison', type);
			
			},
			onTryHit(source, target, move) {
				if (move.type === 'Ground') {
					this.hint('...But there was no solid ground to attack from!')
					this.add('-activate', target, 'field: Murkwater Surface Field');
					return null
				}
				if (['spikes', 'toxicspikes'].includes(move.id)) {
					this.hint('...The spikes sank into the water and vanished!')
					this.add('-activate', target, 'field: Murkwater Surface Field');
					return null
				}
			},
			onHit(target, source, move) {
				if (move.id === 'whirlpool') {
					this.hint('The maelstrom flushed out the poison!')
					this.field.setBattlefield('watersurfacefield')
				}
				if (move.id === 'purify') {
					this.hint('the attack cleared the waters!')
					this.field.setBattlefield('watersurfacefield')
				}
				if (['blizzard','glaciate','subzeroslammer'].includes(move.id)) {
					this.hint('The toxic water froze over!')
					this.field.setBattlefield('icyfield')
				}
			},
			onModifySpe(spe, pokemon) {
				if (pokemon.isGrounded() && !pokemon.hasType('Water') && !pokemon.hasAbility(['surgesurfer','swiftswim'])) {
					this.chainModify(0.75)
				}
			},
			onResidualOrder: 5,
			onResidual(pokemon) {
				if (!pokemon.hasType(['Steel','Poison']) && pokemon.isGrounded() && !pokemon.hasAbility(['magicguard', 'immunity','pastelveil','poisonheal','surgesurfer','toxicboost','wonderguard'])) {
					var typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('sludgebomb')), -6, 6);
					if (pokemon.hasAbility(['dryskin','flamebody','magmaarmor','waterabsorb'])) typeMod *=2;
					if (pokemon.volatiles['dive']) typeMod *=4;
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
					this.hint(`${pokemon.name} was hurt by the toxic water!!`)
				}
				if ((pokemon.hasType('Poison') && pokemon.hasAbility(['dryskin','waterabsorb'])) || pokemon.hasAbility('poisonheal')) {
					this.heal(pokemon.baseMaxhp / 8)
					this.hint(`${pokemon.name} was healed by the poisoned water!`)
				}
				if (pokemon.hasAbility('watercompaction')) this.boost({def: 1})
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Murkwater Surface Field', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Murkwater Surface Field');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Murkwater Surface Field');
			},
		},
		secondary: null,
		target: "all",
		type: "Poison",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	dragonsdenfield: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Dragons Den Field",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		battlefield: 'dragonsdenfield',
		condition: {
			effectType: "Battlefield",
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onBasePower(basePower, source, target, move) {
				if (move.type === 'Dragon') {
					this.chainModify(1.5)
					this.hint('The draconic energy boosted the attack!')
				}
				if (move.type === 'Fire') {
					this.chainModify(1.5)
					this.hint(`The lava's heat boosted the flame!`)
				}
				if (move.type === 'Rock') {
					this.chainModify(1.3)
				}
				if (move.type === 'Water') {
					this.chainModify(0.5)
					this.hint(`The lava's heat softened the attack...`)
				}
				if (['smackdown','thousandarrows'].includes(move.id)) {
					this.chainModify(2)
				}
				if (move.id === 'payday') {
					this.chainModify(2)
					this.hint('Sparkling treasure!')
				}
				if (['dragonascent','mistball','lusterpurge'].includes(move.id)) {
					this.chainModify(2)
					this.hint('The draconic energy boosted the attack!')
				}
				if (['rockclimb','strength'].includes(move.id)) {
					this.chainModify(1.5)
				}
				if (['diamondstorm','matrixshot','powergem'].includes(move.id)) {
					this.chainModify(1.5)
					this.hint('Sparkling treasure!')
				}
				if (['earthpower','lavaplume','magmastorm','magmadrift','shelltrap'].includes(move.id)) {
					this.chainModify(1.5)
					this.hint('The lava strengthened the attack!')
				}
				if (move.id === 'megakick') {
					this.chainModify(1.5)
					this.hint('Trial of the Dragon!!!')
				}
				if (move.id === 'stompingtantrum') {
					this.chainModify(1.5)
					this.hint('Wrath of the Dragon!!!')
				}
				if (move.id === 'mistball') {
					this.chainModify(1.3)
				}
			},
			onTryMove(source, target, move) {
				if (move.terrain || move.battlefield) {
					this.hint(`The draconic power blocked the terrain...`)
					return null
				}
			},
			onTryHit(target, source, move) {
				if (target !== source && move.type === 'Fire' && target.hasAbility('magmaarmor')) {
					this.add('-immune', target, '[from] ability: Magma Armor');
					return null;
				}
			},
			onHit(target, source, move) {
				if (move.id === 'mistball') {
					this.hint('The mist-ical energy altered the surroundings!')
					this.field.setBattlefield('fairytalefield')
				}
			},
			onEffectiveness(typeMod, target, type, move) {
				if (target?.hasAbility('multiscale') && move && move.effectType === 'Move' && move.category !== 'Status' && type === 'Dragon' && typeMod > 0) {
					this.add('-fieldactivate', 'Dragons Den Field');
					return 0;
				}
				if (['smackdown', 'thousandarrows'].includes(move.id)){
					this.hint(`${target?.name} was knocked into the lava!`)
					return typeMod + this.dex.getEffectiveness('Fire', type);
				} 
				if (['rockclimb','strength'].includes(move.id)){
					this.hint(`Unrivaled power!`)
					return typeMod + this.dex.getEffectiveness('Fire', type);
				} 
				if (move.id === 'earthquake'){
					return typeMod + this.dex.getEffectiveness('Fire', type);
				} 
			},
			onModifyMove(move, pokemon, target) {
				if (['rockclimb','strength'].includes(move.id)) {
					move.type === 'Rock'
				}
				if (['bounce','fly'].includes(move.id)) move.condition = {};
				if (move.id === 'dragondance') move.boosts = {atk: 2, spe: 2}
				if (move.id === 'dragonrush') move.accuracy = 100;
				if (move.id === 'coil') move.boosts = {atk: 2, def: 2, accuracy: 2}
				if (move.id === 'nobleroar') move.boosts = {atk: 2, spa: 2}
				if (move.id === 'stealthrock') {
					move.condition = {
						// this is a side condition
						onSideStart(side) {
							this.add('-sidestart', side, 'move: Stealth Rock');
						},
						onEntryHazard(pokemon) {
							if (pokemon.hasItem('heavydutyboots')) return;
							const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('ember')), -6, 6);
							this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
							this.hint(`${pokemon.name} was hurt by the molten stealth rocks!`)
						},
					}
				}
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasAbility('magmaarmor')) this.boost({def: 1, spd: 1})
				if (pokemon.hasAbility('shellarmor')) this.boost({def: 1})
			},
			onModifyDef(def, pokemon) {
				if (pokemon.hasType('Dragon')) this.chainModify(1.3)
			},
			onModifySpD(spd, pokemon) {
				if (pokemon.hasType('Dragon')) this.chainModify(1.3)
			},
			onFieldStart(field, source, effect) {
				if (this.field.isWeather(['hail','snow'])) {
					this.field.clearWeather()
					this.hint('The hail is melting in the heat...')
				}
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Dragons Den Field', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Dragons Den Field');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Dragons Den Field');
			},
		},
		secondary: null,
		target: "all",
		type: "Dragon",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	frozendimensionalfield: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Frozen Dimensional Field",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		battlefield: 'frozendimensionalfield',
		condition: {
			effectType: "Battlefield",
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onBasePower(basePower, source, target, move) {
				if (move.type === 'Dark') {
					this.chainModify(1.5)
					this.hint('The darkness is here...')
				}
				if (move.type === 'Ice') {
					this.chainModify(1.2)
					this.hint('The dimension mutated the ice!')
				}
				if (['fierywrath','freezingglare','lashout','outrage','ragingfury','rage','roaroftime','stompingtantrum','thrash'].includes(move.id)) {
					this.chainModify(1.5)
					this.hint('The rage continues.')
				}
				if (['darkpulse','hydropump','muddywater','nightslash','surf','waterpulse','hyperspacehole','hyperspacefury'].includes(move.id)) {
					this.chainModify(1.2)
				}
				if (['eruption','firepledge','flameburst','heatwave','incinerate','infernooverdrive','lavaplume','mindblown','ragingfury','searingshot'].includes(move.id)) {
					this.chainModify(1.3)
				}
			},
			onEffectiveness(typeMod, target, type, move) {
				if (['darkpulse','hydropump','muddywater','nightslash','surf','waterpulse'].includes(move.id)){
					this.hint('The ice warped the attack!')
					return typeMod + this.dex.getEffectiveness('Ice', type);
				} 
			},
			onModifyMove(move, pokemon, target) {
				if (move.id === 'darkvoid') move.accuracy = 100;
				if (move.id === 'dragonrage') move.damage = 140;
				if (move.id === 'rage') {
					move.basePower = 60;
					move.type = 'Dark';
					move.self = {};
					move.condition = {};
					move.secondary = {chance: 100,self: {boosts: {spa: 1}}};
				}
				if (move.id === 'snarl') move.secondary = {chance: 100,self: {boosts: {spa: 2}}};
			},
			onTryMove(source, target, move) {
				if (['electricterrain','grassyterrain','gravity','magicroom','mistyterrain','psychicterrain','trickroom','wonderroom'].includes(move.id)) {
					this.hint('The frozen dimensions remain unchanged.')
					this.add('-activate', target, 'field: Frozen Dimensional Field');
					return null
				}
				if (['courtchange','teatime'].includes(move.id)) return null
			},
			onHit(target, source, move) {
				if (['eruption','firepledge','flameburst','heatwave','incinerate','infernooverdrive','lavaplume','mindblown','ragingfury','searingshot'].includes(move.id)) {
					this.field.setBattlefield('dimensionalfield')
					this.hint('The dimension thawed away!')
				}
				if (move.id === 'purify') {
					this.field.setBattlefield('icyfield');
					this.hint('The dimension was purified!')
				}
			},
			onModifyDef(def, pokemon) {
				if (pokemon.hasType(['Ice','Ghost'])) this.chainModify(1.2)
				if (pokemon.hasType('Fire')) this.chainModify(0.8)
			},
			onModifySpD(spd, pokemon) {
				if (pokemon.hasType(['Ice','Ghost'])) this.chainModify(1.2)
				if (pokemon.hasType('Fire')) this.chainModify(0.8)
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasAbility(['angerpoint','justified'])) this.boost({atk: 1})
				if (pokemon.hasAbility('berserk')) this.boost({spa: 1})
				if (pokemon.hasAbility('rattled')) this.boost({spe: 1})
				if (pokemon.hasAbility('pressure')) {
					let activated = false;
					for (const target of pokemon.adjacentFoes()) {
						if (!activated) {
							this.add('-ability', pokemon, 'Pressure', 'boost');
							activated = true;
						}
						if (target.volatiles['substitute']) {
							this.add('-immune', target);
						} else {
							this.boost({def: -1, spd: -1}, target, pokemon, null, true);
						}
					}
				}
				if (pokemon.hasAbility('unnerve')) {
					let activated = false;
					for (const target of pokemon.adjacentFoes()) {
						if (!activated) {
							this.add('-ability', pokemon, 'Unnerve', 'boost');
							activated = true;
						}
						if (target.volatiles['substitute']) {
							this.add('-immune', target);
						} else {
							this.boost({spe: -1}, target, pokemon, null, true);
						}
					}
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Frozen Dimensional Field', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Frozen Dimensional Field');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Dragons Den Field');
			},
		},
		secondary: null,
		target: "all",
		type: "Ice",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	skyfield: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Sky Field",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		battlefield: 'skyfield',
		condition: {
			effectType: "Battlefield",
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onBasePower(basePower, source, target, move) {
				if (move.type === 'Flying') {
					this.chainModify(1.5)
					this.hint('The open air strengthened the attack!')
				}
				if (source.hasAbility('longreach')) this.chainModify(1.5)
				if (['dive','twister','aeroblast','bleakwindstorm','dragonascent','dragondarts',
					'esperwing','fairywind','flyingpress','gravapple','icywind','ominouswind',
					'razorwind','silverwind','skyuppercut','steelwing','thunder','thunderbolt','thundershock'].includes(move.id)) {
					this.chainModify(1.5)
					this.hint('The open skies strengthened the attack!')
				}
				if (['sandsearstorm','springtidestorm','windboltstorm'].includes(move.id)) {
					this.chainModify(1.3)
					this.hint('The open skies strengthened the attack!')
				}
				if (['gravapple','gravity','ingrain','smackdown','thousandarrows'].includes(move.id)) {
					this.chainModify(1.3)
				}
			},
			onEffectiveness(typeMod, target, type, move) {
				if (['dive','twister'].includes(move.id)){
					return typeMod + this.dex.getEffectiveness('Flying', type);
				} 
				if (type === 'Flying' && move.id === 'bonemerang') return 1;
			},
			onModifyMove(move, pokemon, target) {
				if (move.id === 'bounce') {
					move.flags.charge = undefined;
					move.condition = {}
					move.onTryMove = undefined // if this works, should do for other charge moves like dive and shi
				}
				if (move.id === 'fly') {
					move.flags.charge = undefined;
					move.condition = {}
					move.onTryMove = undefined 
				}
				if (move.id === 'razorwind') {
					move.flags.charge = undefined;
					move.onTryMove = undefined 
				}
				if (move.id === 'skyattack') {
					move.flags.charge = undefined;
					move.onTryMove = undefined 
				}
				if (['hurricane','thunder'].includes(move.id)) move.accuracy = true;
				if (move.id === 'mirrormove') move.secondary = {chance: 100, self: {boosts: {atk: 1, spa: 1, spe: 1}}};
			},
			onHit(target, source, move) {
				if (['gravapple','gravity','ingrain','smackdown','thousandarrows'].includes(move.id)) {
					this.field.setBattlefield('mountainfield')
					this.hint('The battle has been brought down to the mountains!')
				}
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasAbility('bigpecks')){
					this.boost({def: 1})
					this.hint(`${pokemon.name}'s Big Pecks raised its defense in the skies!`)
				} 
				if (pokemon.hasAbility('cloudnine')){
					this.field.clearWeather()
					this.hint(`${pokemon.name}'s Cloud Nine removed all weather effects!`)
				} 
				if (pokemon.hasAbility(['levitate','lunaridol','solaridol'])){
					this.boost({spe: 1})
					this.hint(`${pokemon.name}'s ${pokemon.ability} made it go faster in the open skies!`)
				} 
			},
			onUpdate(pokemon) {
				if (pokemon.status === 'slp') {
					this.add('-activate', pokemon, 'field: Sky FIeld');
					pokemon.cureStatus();
				}
			},
			onSetStatus(status, target, source, effect) {
				if (status.id !== 'slp') return;
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] field: Sky Field');
				}
				return false;
			},
			onTryHit(source, target, move) {
				if (['spikes', 'toxicspikes','bulldoze','dig','earthquake','magnitude','rototiller','stickyweb'].includes(move.id)) {
					this.hint('But there is no solid ground!')
					this.add('-activate', target, 'field: Sky Field');
					return null
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Sky Field', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Sky Field');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Sky Field');
			},
		},
		secondary: null,
		target: "all",
		type: "Flying",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
	infernalfield: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Infernal Field",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1, metronome: 1},
		battlefield: 'infernalfield',
		condition: {
			effectType: "Battlefield",
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onBasePower(basePower, source, target, move) {
				if (['Dark','Fire'].includes(move.type) || ['blastburn','infernalparade','inferno','infernooverdrive','precipiceblades','ragingfury'].includes(move.id)) {
					this.chainModify(1.5)
					this.hint('The infernal flames strengthened the attack!')
				}
				if (['Fairy','Water'].includes(move.type) && move.id != 'spiritbreak') {
					this.chainModify(0.5)
					this.hint('The hellfire burnt out the attack!')
				}
				if (['punishment','smog','dreameater'].includes(move.id)) {
					this.chainModify(2)
					this.hint('Hellish suffering!')
				}
				if (['glaciate','judgement','originpulse','purify'].includes(move.id)) {
					this.chainModify(1.3)
				}
			},
			onModifyMove(move, pokemon, target) {
				if (['darkvoid','inferno','willowisp'].includes(move.id)) move.accuracy = true;
				if (move.id === 'nastyplot') move.boosts = {spa: 3};
				if (move.id === 'stealthrock') {
					move.condition = {
						// this is a side condition
						onSideStart(side) {
							this.add('-sidestart', side, 'move: Stealth Rock');
						},
						onEntryHazard(pokemon) {
							if (pokemon.hasItem('heavydutyboots')) return;
							const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('ember')), -6, 6);
							this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
							this.hint(`${pokemon.name} was hurt by the molten stealth rocks!`)
						},
					}
				}
			},
			onEffectiveness(typeMod, target, type, move) {
				if (['Ground','Rock','Steel'].includes(move.type)){
					return typeMod + this.dex.getEffectiveness('Fire', type);
				} 
				if (['aurasphere','frustration','spiritbreak'].includes(move.id)){
					return typeMod + this.dex.getEffectiveness('Dark', type);
				} 
				if (type === 'Ghost' && move.type === 'Fire') return 1;
			},
			onTryHit(target, source, move) {
				if (target !== source && move.type === 'Fire' && target.hasAbility('magmaarmor')) {
					this.add('-immune', target, '[from] ability: Magma Armor');
					return null;
				}
			},
			onHit(target, source, move) {
				if (move.id === 'glaciate') {
					this.field.setBattlefield('dimensionalfield')
					this.hint('The hellish landscape was douesed of its fire!')
				}
				if (['judgement','originpulse','purify'].includes(move.id)) {
					this.field.setBattlefield('volcanictopfield')
					this.hint('The hellish landscape was purified!')
				}
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasAbility(['desolateland','flamebody','magmaarmor'])) this.boost({def: 1, spd: 1});
			},
			onResidualOrder: 5,
			onResidual(pokemon) {
				if (!pokemon.hasType('Fire') && pokemon.isGrounded() && !pokemon.volatiles['aquaring'] && !pokemon.hasAbility(['flamebody','flareboost','flashfire','heatproof','magmaarmor','waterbubble','waterveil'])) {
					var typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('flamethrower')), -6, 6);
					if (pokemon.hasAbility(['fluffy','grasspelt','icebody','leafguard']) || pokemon.volatiles['tarshot']) typeMod *=2;
					this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
					this.hint(`${pokemon.name} was burned by the field!`)
				}
				if (pokemon.lastMoveUsed?.id === 'burnup' && pokemon.hasType('???')) {
					pokemon.setType(pokemon.getTypes(true).map(type => type === '???' ? 'Fire' : type));
					this.add('-start', pokemon, 'typechange', pokemon.getTypes().join('/'), '[from] field: Volcanic Field');
				}
				if (pokemon.hasAbility('steamengine')) this.boost({spe: 1});
				if (pokemon.volatiles['torment']) this.damage(pokemon.baseMaxhp / 8)
			},
			onFieldStart(field, source, effect) {
				if (this.field.isWeather(['hail','snow'])) {
					this.hint('The hail melted away!')
					this.field.clearWeather()
				}
				if (this.field.isWeather('raindance')) {
					this.hint('The rain evaporated away!')
					this.field.clearWeather()
				}
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Frozen Dimensional Field', '[from] ability: ' + effect.name, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move:Frozen Dimensional Field');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Dragons Den Field');
			},
		},
		secondary: null,
		target: "all",
		type: "Fire",
		zMove: {boost: {spa: 1}},
		contestType: "Clever",
	},
};
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = Dex.deepClone(ModMoves);
