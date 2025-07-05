export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	actions: {
		canMegaEvo(pokemon: Pokemon) {
			const species = pokemon.baseSpecies;
			const altForme = species.otherFormes && this.dex.species.get(species.otherFormes[0]);
			const item = pokemon.getItem();
			// Mega Rayquaza
			if ((this.battle.gen <= 7 || this.battle.ruleTable.has('+pokemontag:past')) &&
				altForme?.isMega && altForme?.requiredMove &&
				pokemon.baseMoves.includes(this.battle.dex.toID(altForme.requiredMove)) && !item.zMove) {
				return altForme.name;
			}
			// a hacked-in Megazard X can mega evolve into Megazard Y, but not into Megazard X
			if (item.megaEvolves === species.baseSpecies && item.megaStone !== species.name) {
				if (species.id === 'sunflora' && pokemon.gender === 'F') return 'Sunflora-Mega-F';
				return item.megaStone;
			}
			return null;
		},
		switchIn(pokemon: Pokemon, pos: number, sourceEffect: Effect | null = null, isDrag?: boolean) {
			if (!pokemon || pokemon.isActive) {
				this.battle.hint("A switch failed because the Pokémon trying to switch in is already in.");
				return false;
			}

			const side = pokemon.side;
			if (pos >= side.active.length) {
				throw new Error(`Invalid switch position ${pos} / ${side.active.length}`);
			}
			const oldActive = side.active[pos];
			const unfaintedActive = oldActive?.hp ? oldActive : null;
			if (unfaintedActive) {
				oldActive.beingCalledBack = true;
				let switchCopyFlag: 'copyvolatile' | 'shedtail' | boolean = false;
				if (sourceEffect && typeof (sourceEffect as Move).selfSwitch === 'string') {
					switchCopyFlag = (sourceEffect as Move).selfSwitch!;
				}
				if (!oldActive.skipBeforeSwitchOutEventFlag && !isDrag) {
					this.battle.runEvent('BeforeSwitchOut', oldActive);
					if (this.battle.gen >= 5) {
						this.battle.eachEvent('Update');
					}
				}
				oldActive.skipBeforeSwitchOutEventFlag = false;
				if (oldActive.getVolatile('preventswitch')) {
					oldActive.removeVolatile('preventswitch');
					return false;
				}
				if (!this.battle.runEvent('SwitchOut', oldActive)) {
					// Warning: DO NOT interrupt a switch-out if you just want to trap a pokemon.
					// To trap a pokemon and prevent it from switching out, (e.g. Mean Look, Magnet Pull)
					// use the 'trapped' flag instead.

					// Note: Nothing in the real games can interrupt a switch-out (except Pursuit KOing,
					// which is handled elsewhere); this is just for custom formats.
					return false;
				}
				if (!oldActive.hp) {
					// a pokemon fainted from Pursuit before it could switch
					return 'pursuitfaint';
				}

				// will definitely switch out at this point

				oldActive.illusion = null;
				this.battle.singleEvent('End', oldActive.getAbility(), oldActive.abilityState, oldActive);
				this.battle.singleEvent('End', oldActive.getItem(), oldActive.itemState, oldActive);

				// if a pokemon is forced out by Whirlwind/etc or Eject Button/Pack, it can't use its chosen move
				this.battle.queue.cancelAction(oldActive);

				let newMove = null;
				if (this.battle.gen === 4 && sourceEffect) {
					newMove = oldActive.lastMove;
				}
				if (switchCopyFlag) {
					pokemon.copyVolatileFrom(oldActive, switchCopyFlag);
				}
				if (newMove) pokemon.lastMove = newMove;
				oldActive.clearVolatile();
			}
			if (oldActive) {
				oldActive.isActive = false;
				oldActive.isStarted = false;
				oldActive.usedItemThisTurn = false;
				oldActive.statsRaisedThisTurn = false;
				oldActive.statsLoweredThisTurn = false;
				oldActive.position = pokemon.position;
				if (oldActive.fainted) oldActive.status = '';
				pokemon.position = pos;
				side.pokemon[pokemon.position] = pokemon;
				side.pokemon[oldActive.position] = oldActive;
			}
			pokemon.isActive = true;
			side.active[pos] = pokemon;
			pokemon.activeTurns = 0;
			pokemon.activeMoveActions = 0;
			for (const moveSlot of pokemon.moveSlots) {
				moveSlot.used = false;
			}
			pokemon.abilityState.effectOrder = this.battle.effectOrder++;
			pokemon.itemState.effectOrder = this.battle.effectOrder++;
			this.battle.runEvent('BeforeSwitchIn', pokemon);
			if (sourceEffect) {
				this.battle.add(isDrag ? 'drag' : 'switch', pokemon, pokemon.getFullDetails, `[from] ${sourceEffect}`);
			} else {
				this.battle.add(isDrag ? 'drag' : 'switch', pokemon, pokemon.getFullDetails);
			}
			if (isDrag && this.battle.gen === 2) pokemon.draggedIn = this.battle.turn;
			pokemon.previouslySwitchedIn++;

			if (isDrag && this.battle.gen >= 5) {
				// runSwitch happens immediately so that Mold Breaker can make hazards bypass Clear Body and Levitate
				this.runSwitch(pokemon);
			} else {
				this.battle.queue.insertChoice({ choice: 'runSwitch', pokemon });
			}

			return true;
		},
		hitStepAccuracy(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) {
			const hitResults = [];
			for (const [i, target] of targets.entries()) {
				this.battle.activeTarget = target;
				// calculate true accuracy
				let accuracy = move.accuracy;
				if (move.ohko) { // bypasses accuracy modifiers
					if (!target.isSemiInvulnerable()) {
						accuracy = 30;
						if (move.ohko === 'Ice' && this.battle.gen >= 7 && !pokemon.hasType('Ice')) {
							accuracy = 20;
						}
						if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
							(move.ohko === true || !target.hasType(move.ohko))) {
							accuracy += (pokemon.level - target.level);
						} else {
							this.battle.add('-immune', target, '[ohko]');
							hitResults[i] = false;
							continue;
						}
					}
				} else {
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (accuracy !== true) {
						let boost = 0;
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, { ...pokemon.boosts });
							boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, { ...target.boosts });
							boost = this.battle.clampIntRange(boost - boosts['evasion'], -6, 6);
						}
						if (boost > 0) {
							accuracy = this.battle.trunc(accuracy * (3 + boost) / 3);
						} else if (boost < 0) {
							accuracy = this.battle.trunc(accuracy * 3 / (3 - boost));
						}
					}
				}
				if (
					move.alwaysHit || (move.id === 'toxic' && this.battle.gen >= 8 && pokemon.hasType('Poison')) ||
					(move.target === 'self' && move.category === 'Status' && !target.isSemiInvulnerable())
				) {
					accuracy = true; // bypasses ohko accuracy modifiers
				} else {
					accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
				}
				if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
					if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
						this.battle.boost({ spe: 2 }, pokemon);
					}
					if (!move.ohko && pokemon.hasItem('doubledip') && pokemon.useItem()) {
						this.battle.actions.useMove(move, pokemon);
					}
					if (!move.ohko && pokemon.hasAbility('pixelperfect')) {
						this.battle.boost({ accuracy: 1 }, pokemon);
					}
					hitResults[i] = false;
					continue;
				}
				hitResults[i] = true;
			}
			return hitResults;
		},
	},
	pokemon: {
		tryTrap(isHidden) {
			if (!this.runStatusImmunity('trapped')) return false;
			if (this.getAbility().id === 'runaway') return false;
			if (this.trapped && isHidden) return true;
			this.trapped = isHidden ? 'hidden' : true;
			return true;
		},
		ignoringAbility() {
			if (this.battle.gen >= 5 && !this.isActive) return true;

			// Certain Abilities won't activate while Transformed, even if they ordinarily couldn't be suppressed (e.g. Disguise)
			if (this.getAbility().flags['notransform'] && this.transformed) return true;
			if (this.getAbility().flags['cantsuppress']) return false;
			if (this.volatiles['gastroacid']) return true;

			// Check if any active pokemon have the ability Neutralizing Gas
			if (this.hasItem('Ability Shield') || this.ability === ('neutralizinggas' as ID)) return false;
			for (const pokemon of this.battle.getAllActive()) {
				// can't use hasAbility because it would lead to infinite recursion
				if (pokemon.ability === ('neutralizinggas' as ID) && !pokemon.volatiles['gastroacid'] &&
					!pokemon.transformed && !pokemon.abilityState.ending && !this.volatiles['commanding']) {
					return true;
				} if (pokemon.ability === ('chaosemeralds' as ID) && (pokemon.species.id === 'supersonic' || pokemon.fusion === 'Super Sonic') && 
					!pokemon.volatiles['gastroacid'] && !pokemon.transformed && !pokemon.abilityState.ending) {
					return true;
				}
			}

			return false;
		},
		formeChange(
			speciesId: string | Species, source: Effect | null = null,
			isPermanent?: boolean, abilitySlot = '0', message?: string
		) {
			const rawSpecies = this.battle.dex.species.get(speciesId);

			const species = this.setSpecies(rawSpecies, source);
			if (!species) return false;

			if (this.battle.gen <= 2) return true;

			// The species the opponent sees
			const apparentSpecies =
				this.illusion ? this.illusion.species.name : species.baseSpecies;
			if (isPermanent) {
				this.baseSpecies = rawSpecies;
				this.details = species.name + (this.level === 100 ? '' : ', L' + this.level) +
					(this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '') +
						(this.fusion ? ', fusion: ' + this.fusion + (this.set.altsprite ? ', alt: ' + this.set.altsprite : '') : '');
				let details = (this.illusion || this).details;
				if (this.terastallized) details += `, tera:${this.terastallized}`;
				if (!this.illusion) this.battle.add('detailschange', this, details);
				if (!source) {
					// Tera forme
					// Ogerpon/Terapagos text goes here
					this.formeRegression = true;
				} else if (source.effectType === 'Item') {
					this.canTerastallize = null; // National Dex behavior
					if (source.zMove) {
						this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
					} else if (source.isPrimalOrb) {
						if (this.illusion) {
							this.ability = '';
							this.battle.add('-primal', this.illusion, species.requiredItem);
						} else {
							this.battle.add('-primal', this, species.requiredItem);
						}
					} else {
						if (this.illusion) {
							const allowedItems = this.battle.dex.items.all().filter(item => ((!item.isNonstandard || ['Unobtainable', 'Past'].includes(item.isNonstandard)) && item.exists));
							let megaForme;
							for (const item of allowedItems) {
								if (item.megaEvolves === this.illusion.species.name) megaForme = this.battle.dex.species.get(item.megaStone);
							}
							if (megaForme) {
								const illusionDetails = this.illusion.setSpecies(megaForme, source).name +
									(this.level === 100 ? '' : ', L' + this.level) + (this.illusion.gender === '' ? '' : ', ' + this.illusion.gender) + (this.illusion.set.shiny ? ', shiny' : '') +
										(this.illusion.fusion ? ', fusion: ' + this.illusion.fusion + (this.illusion.set.altsprite ? ', alt: ' + this.illusion.set.altsprite : '') : '');
								this.battle.add('detailschange', this, illusionDetails);
								this.battle.add('-mega', this, megaForme.name, megaForme.requiredItem);
								this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
							}
						} else {
							this.battle.add('-mega', this, apparentSpecies, species.requiredItem);
							this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
						}
					}
					this.formeRegression = true;
				} else if (source.effectType === 'Status') {
					// Shaymin-Sky -> Shaymin
					this.battle.add('-formechange', this, species.name, message);
				}
			} else {
				if (source?.effectType === 'Ability') {
					this.battle.add('-formechange', this, species.name, message, `[from] ability: ${source.name}`);
				} else {
					this.battle.add('-formechange', this, this.illusion ? this.illusion.species.name : species.name, message);
				}
			}
			if (isPermanent && (!source || !['disguise', 'iceface', 'proteanmaxima'].includes(source.id))) {
				if (this.illusion && source) {
					// Tera forme by Ogerpon or Terapagos breaks the Illusion
					this.ability = ''; // Don't allow Illusion to wear off
					this.addVolatile('ability:illusion');
				}
				const ability = species.abilities[abilitySlot] || species.abilities['0'];
				// Ogerpon's forme change doesn't override permanent abilities
				if (source || !this.getAbility().flags['cantsuppress']) this.setAbility(ability, null, true);
				// However, its ability does reset upon switching out
				this.baseAbility = this.battle.dex.toID(ability);
			}
			if (this.terastallized) {
				this.knownType = true;
				this.apparentType = this.terastallized;
			}
			return true;
		},
		setStatus(
			status: string | Condition,
			source: Pokemon | null = null,
			sourceEffect: Effect | null = null,
			ignoreImmunities = false
		) {
			if (!this.hp) return false;
			status = this.battle.dex.conditions.get(status);
			if (this.battle.event) {
				if (!source) source = this.battle.event.source;
				if (!sourceEffect) sourceEffect = this.battle.effect;
			}
			if (!source) source = this;

			if (this.status === status.id) {
				if ((sourceEffect as Move)?.status === this.status) {
					this.battle.add('-fail', this, this.status);
				} else if ((sourceEffect as Move)?.status) {
					this.battle.add('-fail', source);
					this.battle.attrLastMove('[still]');
				}
				return false;
			}

			if (source?.hasAbility('venomous') && status.id === 'psn') status = this.battle.dex.conditions.get('tox');

			if (
				!ignoreImmunities && status.id && !(source?.hasAbility('corrosion') && ['tox', 'psn'].includes(status.id))
			) {
				// the game currently never ignores immunities
				if (!this.runStatusImmunity(status.id === 'tox' ? 'psn' : status.id)) {
					this.battle.debug('immune to status');
					if ((sourceEffect as Move)?.status) {
						this.battle.add('-immune', this);
					}
					return false;
				}
			}
			const prevStatus = this.status;
			const prevStatusState = this.statusState;
			if (status.id) {
				const result: boolean = this.battle.runEvent('SetStatus', this, source, sourceEffect, status);
				if (!result) {
					this.battle.debug('set status [' + status.id + '] interrupted');
					return result;
				}
			}

			this.status = status.id;
			this.statusState = this.battle.initEffectState({ id: status.id, target: this });
			if (source) this.statusState.source = source;
			if (status.duration) this.statusState.duration = status.duration;
			if (status.durationCallback) {
				this.statusState.duration = status.durationCallback.call(this.battle, this, source, sourceEffect);
			}

			if (status.id && !this.battle.singleEvent('Start', status, this.statusState, this, source, sourceEffect)) {
				this.battle.debug('status start [' + status.id + '] interrupted');
				// cancel the setstatus
				this.status = prevStatus;
				this.statusState = prevStatusState;
				return false;
			}
			if (status.id && !this.battle.runEvent('AfterSetStatus', this, source, sourceEffect, status)) {
				return false;
			}
			return true;
		},
		transformInto(pokemon, effect) {
			const species = pokemon.species;
			if (
				pokemon.fainted || this.illusion || pokemon.illusion || (pokemon.volatiles['substitute'] && this.battle.gen >= 5) ||
				(pokemon.transformed && this.battle.gen >= 2) || (this.transformed && this.battle.gen >= 5) ||
				species.name === 'Eternatus-Eternamax' ||
				(['Ogerpon', 'Terapagos'].includes(species.baseSpecies) && (this.terastallized || pokemon.terastallized)) ||
				this.terastallized === 'Stellar'
			) {
				return false;
			}

			if (this.battle.dex.currentMod === 'gen1stadium' && (
				species.name === 'Ditto' ||
				(this.species.name === 'Ditto' && pokemon.moves.includes('transform'))
			)) {
				return false;
			}

			if (!this.setSpecies(species, effect, true)) return false;

			this.transformed = true;
			this.weighthg = pokemon.weighthg;

			const types = pokemon.getTypes(true, true);
			this.setType(pokemon.volatiles['roost'] ? pokemon.volatiles['roost'].typeWas : types, true);
			this.addedType = pokemon.addedType;
			this.knownType = this.isAlly(pokemon) && pokemon.knownType;
			this.apparentType = pokemon.apparentType;

			let statName: StatIDExceptHP;
			const statTable = (pokemon.ability === 'Stance Change' && pokemon.fusion) ? pokemon.baseStoredStats : pokemon.storedStats;
			for (statName in this.storedStats) {
				this.storedStats[statName] = statTable[statName];
				if (this.modifiedStats) this.modifiedStats[statName] = pokemon.modifiedStats![statName]; // Gen 1: Copy modified stats.
			}
			this.moveSlots = [];
			this.hpType = (this.battle.gen >= 5 ? this.hpType : pokemon.hpType);
			this.hpPower = (this.battle.gen >= 5 ? this.hpPower : pokemon.hpPower);
			this.timesAttacked = pokemon.timesAttacked;
			for (const moveSlot of pokemon.moveSlots) {
				let moveName = moveSlot.move;
				if (moveSlot.id === 'hiddenpower') {
					moveName = 'Hidden Power ' + this.hpType;
				}
				this.moveSlots.push({
					move: moveName,
					id: moveSlot.id,
					pp: moveSlot.maxpp === 1 ? 1 : 5,
					maxpp: this.battle.gen >= 5 ? (moveSlot.maxpp === 1 ? 1 : 5) : moveSlot.maxpp,
					target: moveSlot.target,
					disabled: false,
					used: false,
					virtual: true,
				});
			}
			let boostName: BoostID;
			for (boostName in pokemon.boosts) {
				this.boosts[boostName] = pokemon.boosts[boostName];
			}
			if (this.battle.gen >= 6) {
				// we need to remove all of the overlapping crit volatiles before adding any of them
				const volatilesToCopy = ['dragoncheer', 'focusenergy', 'gmaxchistrike', 'laserfocus'];
				for (const volatile of volatilesToCopy) this.removeVolatile(volatile);
				for (const volatile of volatilesToCopy) {
					if (pokemon.volatiles[volatile]) {
						this.addVolatile(volatile);
						if (volatile === 'gmaxchistrike') this.volatiles[volatile].layers = pokemon.volatiles[volatile].layers;
						if (volatile === 'dragoncheer') this.volatiles[volatile].hasDragonType = pokemon.volatiles[volatile].hasDragonType;
					}
				}
			}
			if (effect) {
				this.battle.add('-transform', this, pokemon, '[from] ' + effect.fullname);
			} else {
				this.battle.add('-transform', this, pokemon);
			}
			if (this.terastallized) {
				this.knownType = true;
				this.apparentType = this.terastallized;
			}
			if (this.battle.gen > 2) this.setAbility(pokemon.ability, this, true, true);

			// Change formes based on held items (for Transform)
			// Only ever relevant in Generation 4 since Generation 3 didn't have item-based forme changes
			if (this.battle.gen === 4) {
				if (this.species.num === 487) {
					// Giratina formes
					if (this.species.name === 'Giratina' && this.item === 'griseousorb') {
						this.formeChange('Giratina-Origin');
					} else if (this.species.name === 'Giratina-Origin' && this.item !== 'griseousorb') {
						this.formeChange('Giratina');
					}
				}
				if (this.species.num === 493) {
					// Arceus formes
					const item = this.getItem();
					const targetForme = (item?.onPlate ? 'Arceus-' + item.onPlate : 'Arceus');
					if (this.species.name !== targetForme) {
						this.formeChange(targetForme);
					}
				}
			}

			// Pokemon transformed into Ogerpon cannot Terastallize
			// restoring their ability to tera after they untransform is handled ELSEWHERE
			if (['Ogerpon', 'Terapagos'].includes(this.species.baseSpecies) && this.canTerastallize) this.canTerastallize = false;

			return true;
		},
		isGrounded(negateImmunity = false) {
			if ('gravity' in this.battle.field.pseudoWeather) return true;
			if ('ingrain' in this.volatiles && this.battle.gen >= 4) return true;
			if ('smackdown' in this.volatiles) return true;
			if ('groundingstomp' in this.volatiles) return true;
			const item = (this.ignoringItem() ? '' : this.item);
			if (item === 'ironball') return true;
			// If a Fire/Flying type uses Burn Up and Roost, it becomes ???/Flying-type, but it's still grounded.
			if (!negateImmunity && this.hasType('Flying') && !(this.hasType('???') && 'roost' in this.volatiles)) return false;
			if (this.hasAbility(['levitate', 'omnitype']) && !this.battle.suppressingAbility(this)) return null;
			if ('magnetrise' in this.volatiles) return false;
			if ('telekinesis' in this.volatiles) return false;
			return item !== 'airballoon';
		},
	},
};
