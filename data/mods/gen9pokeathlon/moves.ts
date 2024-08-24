export const Moves: {[k: string]: ModdedMoveData} = {
	// Mods
	payday: {
		inherit: true,
		onHit(target, source, move) {
			source.side.addSideCondition(this.dex.conditions.get('scatteredcoins'));
		},
	},
	makeitrain: {
		inherit: true,
		onHit(target, source, move) {
			source.side.addSideCondition(this.dex.conditions.get('scatteredcoins'));
		},
	},
	gmaxgoldrush: {
		inherit: true,
		onHit(target, source, move) {
			source.side.addSideCondition(this.dex.conditions.get('scatteredcoins'));
		},
	},
	leechseed: {
		inherit: true,
		onTryImmunity(target) {
			return !target.hasType('Grass') && !target.hasAbility('Ivy Wall');
		},
	},
	fling: {
		inherit: true,
		onModifyMove(move, source, target) {
			if (source.item === 'boomerang') {
				move.multihit = 2
			}
		},
		onPrepareHit(target, source, move) {
			if (source.ignoringItem()) return false;
			const item = source.getItem();
			if (!this.singleEvent('TakeItem', item, source.itemState, source, source, move, item)) return false;
			if (!item.fling) return false;
			move.basePower = item.fling.basePower;
			this.debug('BP: ' + move.basePower);
			if (item.isBerry) {
				move.onHit = function (foe) {
					if (this.singleEvent('Eat', item, null, foe, null, null)) {
						this.runEvent('EatItem', foe, null, null, item);
						if (item.id === 'leppaberry') foe.staleness = 'external';
					}
					if (item.onEat) foe.ateBerry = true;
				};
			} else if (item.fling.effect) {
				move.onHit = item.fling.effect;
			} else {
				if (!move.secondaries) move.secondaries = [];
				if (item.fling.status) {
					move.secondaries.push({status: item.fling.status});
				} else if (item.fling.volatileStatus) {
					move.secondaries.push({volatileStatus: item.fling.volatileStatus});
				}
			}
			source.addVolatile('fling');
		},
		condition: {
			onUpdate(pokemon) {
				if (pokemon.item != 'boomerang') {
					const item = pokemon.getItem();
					pokemon.setItem('');
					pokemon.lastItem = item.id;
					pokemon.usedItemThisTurn = true;
					this.add('-enditem', pokemon, item.name, '[from] move: Fling');
					this.runEvent('AfterUseItem', pokemon, null, null, item);
					pokemon.removeVolatile('fling');
				}
			},
		},
	},
	pollenpuff: {
		inherit: true,
		onTryHit(target, source, move) {
			if (source.isAlly(target)) {
				move.basePower = 0;
				move.infiltrates = true;
			}
		},
		onTryMove(source, target, move) {
			if (source.isAlly(target) && source.volatiles['healblock']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Heal Block', move);
				return false;
			}
		},
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (!this.heal(Math.floor(target.baseMaxhp * (source.ability === 'cannonner' ? 0.75 : 0.5)))) {
					if (target.volatiles['healblock'] && target.hp !== target.maxhp) {
						this.attrLastMove('[still]');
						// Wrong error message, correct one not supported yet
						this.add('cant', source, 'move: Heal Block', move);
					} else {
						this.add('-immune', target);
					}
					return this.NOT_FAIL;
				}
			}
		},
	},

	// Additions
	boxin: {
		num: 0,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Box In",
		desc: "Prevents the user and the target from switching out. The user and the target can still switch out if either of them is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.",
		shortDesc: "Prevents both user and target from switching out.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		onHit(target, source, move) {
			source.addVolatile('trapped', target, move, 'trapper');
			target.addVolatile('trapped', source, move, 'trapper');
		},
		secondary: null,
		target: "normal",
		type: "Ghost",
	},
	runtimeexception: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Runtime Exception",
		desc: "The user randomly uses Flare Blitz, Iron Head, Psychic, or Wild Charge.",
		shortDesc: "Randomly executes one of 4 powerful moves.",
		pp: 10,
		priority: 0,
		flags: {failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1},
		onHit(target, source, effect) {
			const moves = ['flareblitz', 'ironhead', 'psychic', 'wildcharge'];
			const randomMove = this.sample(moves);
			source.side.lastSelectedMove = this.toID(randomMove);
			this.actions.useMove(randomMove, target);
		},
		secondary: null,
		target: "self",
		type: "Steel",
		contestType: "Cute",
	},
	fibregraft: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Fibre Graft",
		desc: "The user faints, and the Pokemon brought out receives the Fighting type, a +1 atk boost, and the effect of Focus Energy. The replacement is sent out at the end of the turn, and the healing happens before hazards take effect.",
		shortDesc: "User faints. Switch-in has boost + Fighting type.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, metronome: 1},
		onTryHit(source) {
			if (!this.canSwitch(source.side)) {
				this.attrLastMove('[still]');
				this.add('-fail', source);
				return this.NOT_FAIL;
			}
		},
		selfdestruct: "ifHit",
		slotCondition: 'fibregraft',
		condition: {
			onSwap(target) {
				if (!target.fainted) {
					this.boost({atk: 1}, target, null, this.effect);
					target.addVolatile('focusenergy');
					target.addType('Fighting');
					this.add('-start', target, 'typeadd', 'Fighting', '[from] move: Fibre Graft');
					target.side.removeSlotCondition(target, 'fibregraft');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Fighting",
		contestType: "Beautiful",
	},
	bloomsday: {
		num: 0,
		accuracy: 100,
		basePower: 150,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower * pokemon.hp / pokemon.maxhp;
			this.debug('BP: ' + bp);
			return bp;
		},
		category: "Special",
		name: "Bloom's Day",
		desc: "Power is equal to (user's current HP * 150 / user's maximum HP), rounded down, but not less than 1.",
		shortDesc: "Less power as user's HP decreases. Hits foe(s).",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Grass",
		contestType: "Beautiful",
	},
	deserttempest: {
		num: 0,
		accuracy: 90,
		basePower: 80,
		category: "Special",
		name: "Desert Tempest",
		shortDesc: "Summons Sandstorm. 1.2x damage if user is holding a Smooth Rock.",
		pp: 15,
		priority: 0,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.item === "smoothrock") {
				return this.chainModify(1.2);
			}
		},
		onHit(source) {
			this.field.setWeather('sandstorm');
		},
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	subzerostorm: {
		num: 0,
		accuracy: 90,
		basePower: 80,
		category: "Physical",
		name: "Subzero Storm",
		shortDesc: "Summons Hail. 1.2x damage if user is holding an Icy Rock.",
		pp: 15,
		priority: 0,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.item === "icyrock") {
				return this.chainModify(1.2);
			}
		},
		onHit(source) {
			this.field.setWeather('snow');
		},
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	fierymaelstrom: {
		num: 0,
		accuracy: 90,
		basePower: 80,
		category: "Special",
		name: "Fiery Maelstrom",
		shortDesc: "Summons Sun. 1.2x damage if user is holding a Heat Rock.",
		pp: 15,
		priority: 0,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.item === "heatrock") {
				return this.chainModify(1.2);
			}
		},
		onHit(source) {
			this.field.setWeather('sunnyday');
		},
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	bulwark: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Bulwark",
		shortDesc: "Sets the effects of Light Screen and Reflect.",
		pp: 5,
		priority: -1,
		flags: {protect: 1, mirror: 1},
		onHit(source) {
			source.side.addSideCondition('reflect');
			source.side.addSideCondition('lightscreen');
		},
		secondary: null,
		target: "self",
		type: "Psychic",
		contestType: "Clever",
	},
	pixietrick: {
		num: 0,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Pixie Trick",
		shortDesc: "0.5x damage if foe isn't holding an item. Swaps items.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, failmefirst: 1, noassist: 1, failcopycat: 1},
		onBasePower(basePower, pokemon, target, move) {
			if (!target.getItem().exists) return this.chainModify([1, 2]);
		},
		onAfterHit(target, source, move) {
			const yourItem = target.takeItem(source);
			const myItem = source.takeItem();
			if (target.item || source.item || (!yourItem && !myItem)) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			if (
				(myItem && !this.singleEvent('TakeItem', myItem, source.itemState, target, source, move, myItem)) ||
				(yourItem && !this.singleEvent('TakeItem', yourItem, target.itemState, source, target, move, yourItem))
			) {
				if (yourItem) target.item = yourItem.id;
				if (myItem) source.item = myItem.id;
				return false;
			}
			this.add('-activate', source, 'move: Pixie Trick', '[of] ' + target);
			if (myItem) {
				target.setItem(myItem);
				this.add('-item', target, myItem, '[from] move: Pixie Trick');
			} else {
				this.add('-enditem', target, yourItem, '[silent]', '[from] move: Pixie Trick');
			}
			if (yourItem) {
				source.setItem(yourItem);
				this.add('-item', source, yourItem, '[from] move: Pixie Trick');
			} else {
				this.add('-enditem', source, myItem, '[silent]', '[from] move: Pixie Trick');
			}
		},
		secondary: null,
		target: "normal",
		type: "Fairy",
		contestType: "Tough",
	},
	mudslide: {
		num: 0,
		accuracy: 95,
		basePower: 95,
		category: "Physical",
		name: "Mudslide",
		desc: "Has a 50% chance to lower the target's Speed by 1 stage.",
		shortDesc: "50% chance to lower the target's Speed by 1.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 50,
			boosts: {
				spe: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Ground",
		contestType: "Tough",
	},
	packin: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Pack In",
		desc: "The user restores 1/2 of its maximum HP, rounded half up. Defense is boosted by +1 if Hail or Snow is active.",
		shortDesc: "User heals 50% of its max HP. +1 Def in Hail/Snow.",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		onAfterMove(source, target, move) {
			if (this.field.isWeather(['hail', 'snow'])) {
				this.boost({def: 1}, source, source);
			}
		},
		secondary: null,
		target: "self",
		type: "Ice",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Clever",
	},
	heal: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Heal",
		shortDesc: "Heals the target by 20HP.",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1, allyanim: 1, metronome: 1},
		onHit(target, source) {
			let success = false;
			success = !!this.heal(20);
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	hyperheal: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Hyper Heal",
		shortDesc: "Heals the target by 200HP.",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1, allyanim: 1, metronome: 1},
		onHit(target, source) {
			let success = false;
			success = !!this.heal(200);
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	fullheal: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Full Heal",
		shortDesc: "Heals the target to full HP.",
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, reflectable: 1, distance: 1, heal: 1, allyanim: 1, metronome: 1},
		onHit(target, source) {
			let success = false;
			success = !!this.heal(target.maxhp);
			if (!success) {
				this.add('-fail', target, 'heal');
				return this.NOT_FAIL;
			}
			return success;
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "Normal",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Beautiful",
	},
	foulstrike: {
		num: 0,
		accuracy: 95,
		basePower: 100,
		category: "Physical",
		name: "Foul Strike",
		shortDesc: "Ignores screens and substitutes.",
		pp: 10,
		priority: 0,
		infiltrates: true,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	sirensong: {
		num: 0,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Siren Song",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Fairy', type);
		},
		secondary: null,
		shortDesc: "This move combines Fairy in its type effectiveness against the target. Hits adjacent foes.",
		target: "allAdjacentFoes",
		type: "Normal",
		contestType: "Cool",
	},
	mindwipe: {
		num: 0,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		name: "Mindwipe",
		desc: "Resets all of the target's stat stages to 0.",
		shortDesc: "Resets all of the target's stat stages to 0.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		onHit(target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	twingust: {
		num: 0,
		accuracy: 100,
		basePower: 35,
		category: "Special",
		name: "Twin Gust",
		desc: "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. In Double Battles, this move attempts to hit the targeted Pokemon and its ally once each. If hitting one of these Pokemon would be prevented by immunity, protection, semi-invulnerability, an Ability, or accuracy, it attempts to hit the other Pokemon twice instead. If this move is redirected, it hits that target twice.",
		shortDesc: "Hits twice. Doubles: Tries to hit each foe once.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, noparentalbond: 1},
		multihit: 2,
		smartTarget: true,
		secondary: null,
		target: "normal",
		type: "Flying",
	},
	currencyflow: {
		num: 0,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Currency Flow",
		shortDesc: "1.5x damage if coins are scattered.",
		pp: 10,
		priority: 0,
		onBasePower(basePower, pokemon, target) {
			if (pokemon.side.getSideCondition('scatteredcoins')) {
				this.add('-activate', pokemon, 'move: Currency Flow');
				return this.chainModify(1.5);
			}
		},
		onAfterHit(source, target, move) {
			target.side.removeSideCondition('scatteredcoins');
		},
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Ground",
		contestType: "Beautiful",
	},
	rocketgrab: {
		num: 0,
		accuracy: 95,
		basePower: 90,
		category: "Physical",
		name: "Rocket Grab",
		desc: "If an opposing Pokemon switches out this turn, this move hits that Pokemon before it leaves the field, even if it was not the original target. If the user moves after an opponent using Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch, but not Baton Pass, it will hit that opponent before it leaves the field. Switch is cancelled if the user hits an opponent switching out, and the user's turn is over; if an opponent faints from this, the replacement Pokemon does not become active until the end of the turn. Can't be used twice in a row.",
		shortDesc: "If a foe is switching out, cancels it. Cannot be used twice in a row.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, cantusetwice: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('rocketgrab', pokemon);
				const data = side.getSideConditionData('rocketgrab');
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onTryHit(target, pokemon) {
			target.side.removeSideCondition('pursuit');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded && !pokemon.hasType('Ghost')) {
						this.add('-activate', pokemon, 'move: Rocket Grab');
						pokemon.addVolatile('preventswitch');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('rocketgrab', source, source.getLocOf(pokemon));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Clever",
	},
	jumpship: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Jump Ship",
		desc: "The user restores 1/2 of its maximum HP, rounded half up. If Manacra, it swaps between plated and radial form",
		shortDesc: "Heals the user by 50% of its max HP. If Manacra, swaps form.",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1, metronome: 1},
		heal: [1, 2],
		onHit(target, pokemon, move) {
			if ((pokemon.baseSpecies.baseSpecies === 'Manacra' || pokemon.fusion?.includes('Manacra')) && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				if (pokemon.species.baseSpecies === 'Manacra') {
					const manacraForme = pokemon.species.id === 'manacraplated' ? '' : '-Plated';
				pokemon.formeChange('Manacra' + manacraForme, this.effect, true, '[msg]');
				} else if (pokemon.fusion?.includes('Manacra')) {
					const manacraForme = pokemon.fusion === 'Manacra-Plated' ? '' : '-Plated';
					pokemon.fusionChange('Manacra' + manacraForme, this.effect);
				}
			}
		},
		target: "self",
		type: "Ghost",
		contestType: "Beautiful",
	},
	moltenglaze: {
		num: 0,
		accuracy: 100,
		basePower: 60,
		category: "Special",
		name: "Molten Glaze",
		desc: "Hits both foes. Until the target switches out, the effectiveness of Fire-type moves is doubled against it.",
		shortDesc: "Hits both foes. Makes foes weaker to fire.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		volatileStatus: 'moltenglaze',
		condition: {
			onStart(pokemon) {
				if (pokemon.terastallized) return false;
				this.add('-start', pokemon, 'Molten Glaze');
			},
			onEffectivenessPriority: -2,
			onEffectiveness(typeMod, target, type, move) {
				if (move.type !== 'Fire') return;
				if (!target) return;
				if (type !== target.getTypes()[0]) return;
				return typeMod + 1;
			},
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fire",
	},
	psychobarrage: {
		num: 0,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Psycho Barrage",
		desc: "The user spends two or three turns locked into this move and becomes confused immediately after its move on the last turn of the effect if it is not already. This move targets an opposing Pokemon at random on each turn. If the user is prevented from moving, is asleep at the beginning of a turn, or the attack is not successful against the target on the first turn of the effect or the second turn of a three-turn effect, the effect ends without causing confusion. If this move is called by Sleep Talk and the user is asleep, the move is used for one turn and does not confuse the user.",
		shortDesc: "Lasts 2-3 turns. Confuses the user afterwards.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, failinstruct: 1},
		self: {
			volatileStatus: 'lockedmove',
		},
		onAfterMove(pokemon) {
			if (pokemon.volatiles['lockedmove'] && pokemon.volatiles['lockedmove'].duration === 1) {
				pokemon.removeVolatile('lockedmove');
			}
		},
		secondary: null,
		target: "randomNormal",
		type: "Psychic",
		contestType: "Cool",
	},
	severingwind: {
		num: 0,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Severing Wind",
		desc: "Has a higher chance for a critical hit. 20% chance to lower the target's Sp. Def by 1.",
		shortDesc: "High critical hit ratio. 20% chance to lower the target's Sp. Def by 1. Hits adjacent foes.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, wind: 1, slicing: 1},
		critRatio: 2,
		secondary: {
			chance: 20,
			boosts: {
				spd: -1,
			},
		},
		target: "allAdjacentFoes",
		type: "Flying",
		contestType: "Cool",
	},
	mindtrap: {
		num: 0,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the mindtrap succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Mindtrap damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Mindtrap",
		desc: "If an opposing Pokemon switches out this turn, this move hits that Pokemon before it leaves the field, even if it was not the original target. If the user moves after an opponent using Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch, but not Baton Pass, it will hit that opponent before it leaves the field. Power doubles and no accuracy check is done if the user hits an opponent switching out, and the user's turn is over; if an opponent faints from this, the replacement Pokemon does not become active until the end of the turn.",
		shortDesc: "If a foe is switching out, hits it at 2x power.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		beforeTurnCallback(pokemon) {
			for (const side of this.sides) {
				if (side.hasAlly(pokemon)) continue;
				side.addSideCondition('mindtrap', pokemon);
				const data = side.getSideConditionData('mindtrap');
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
			target.side.removeSideCondition('mindtrap');
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Mindtrap start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Mindtrap');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source && action.choice === 'megaEvo') {
								this.actions.runMegaEvo(source);
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('mindtrap', source, source.getLocOf(pokemon));
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		contestType: "Clever",
	},
	megatonslice: {
		num: 0,
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		name: "Megaton Slice",
		shortDesc: "Cannot be selected the turn after it's used.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, cantusetwice: 1, slicing: 1},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	lycanpounce: {
		num: 0,
        accuracy: 100,
        basePower: 100,
        category: "Physical",
        name: "Lycan Pounce",
        shortDesc: "High crit ratio. Disguises as the first damaging move in the user's moveset.",
        pp: 5,
        priority: 0,
        flags: {contact: 1, protect: 1, mirror: 1},
        critRatio: 2,
		onModifyMove(move, pokemon, target) {
            let newMoveName;
            for (const moveSlot of pokemon.moveSlots) {
                const temp = this.dex.moves.get(moveSlot.id);
                if(temp.category !== 'Status') {
                    newMoveName = temp.name;
                    break;
                }
            }
			// @ts-ignore
			if (newMoveName) move.name = newMoveName;
        },
        secondary: null,
        target: "normal",
        type: "Fighting",
    },
	spudmortar: {
		num: 0,
		accuracy: 100,
		basePower: 120,
		category: "Special",
		name: "Spud Mortar",
		desc: "Deals damage two turns after this move is used. If the user is holding a berry, this move will consume the berry and boost the move's basepower by 50%. At the end of that turn, the damage is calculated at that time and dealt to the Pokemon at the position the target had when the move was used. If the user is no longer active at the time, damage is calculated based on the user's natural Special Attack stat, types, and level, with no boosts from its held item or Ability. Fails if another future move is already in effect for the target's position.",
		shortDesc: "Hits two turns after being used. If holding berry, x1.5 BP, consumes berry.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1, futuremove: 1},
		onTry(source, target) {
			if (!target.side.addSlotCondition(target, 'futuremove')) return false;
			const item = source.getItem();
			Object.assign(target.side.slotConditions[target.position]['futuremove'], {
				move: 'spudmortar',
				source: source,
				moveData: {
					id: 'spudmortar',
					name: "Spud Mortar",
					accuracy: 100,
					basePower: item.isBerry? 180 : 120,
					category: "Special",
					priority: 0,
					flags: {metronome: 1, futuremove: 1},
					effectType: 'Move',
					type: 'Grass',
				},
			});

			if (item.isBerry) {
				source.setItem('');
				source.lastItem = item.id;
				source.usedItemThisTurn = true;
				this.add('-enditem', source, item.name, '[from] move: Spud Mortar');
			}
			this.add('-start', source, 'Spud Mortar');
			return this.NOT_FAIL;
			
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Beautiful",
	},
	gorgonfang: {
		num: 0,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		name: "Gorgon Fang",
		desc: "Has a 100% chance to lower the target's Speed by 1 stage.",
		shortDesc: "100% chance to lower the foe(s) Speed by 1.",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1},
		secondary: {
			chance: 100,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Rock",
		contestType: "Tough",
	},
	quakingthrust: {
		num: 0,
		accuracy: 100,
		basePower: 75,
		basePowerCallback(pokemon, target, move) {
			if (target.newlySwitched || this.queue.willMove(target)) {
				this.debug('Quaking Thrust damage boost');
				return move.basePower * 1.5;
			}
			this.debug('Quaking Thrust NOT boosted');
			return move.basePower;
		},
		category: "Physical",
		name: "Quaking Thrust",
		desc: "x1.5 power if the user moves before the target.",
		shortDesc: "x1.5 power if user moves before the target.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1},
		secondary: null,
		target: "normal",
		type: "Ground",
	},
	riftjump: {
		num: 0,
		accuracy: true,
		basePower: 0,
		slotCondition: 'riftjump',
		condition: {
			duration: 2,
			onModifyPriority(priority, pokemon) {
				return priority + 1;
			},
		},
		category: "Status",
		name: "Rift Jump",
		desc: "User switches out. The Pokémon switching in will gain +1 priority to any move on their first turn out.",
		shortDesc: "Switch out. Switch-in gains +1 prio for 1 turn.",
		pp: 10,
		priority: 0,
		flags: {metronome: 1},
		selfSwitch: true,
		secondary: null,
		target: "self",
		type: "Electric",
	},
	superheatedcrash: {
		num: 0,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Superheated Crash",
		desc: "If the target is burned, x1.5 damage.",
		shortDesc: "If the target is burned, x1.5 damage.",
		onBasePower(basePower, pokemon, target) {
			if (target.status === 'brn') {
				return this.chainModify(1.5);
			}
		},
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
	},
	groundingstomp: {
		num: 0,
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		name: "Grounding Stomp",
		desc: "This move's type effectiveness against Poison is changed to be super effective no matter what this move's type is. This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If this move hits a target under the effect of Bounce, Fly, Magnet Rise, or Telekinesis, the effect ends. If the target is a Flying type that has not used Roost this turn or a Pokemon with the Levitate Ability, it loses its immunity to Ground-type attacks and the Arena Trap Ability as long as it remains active. During the effect, Magnet Rise fails for the target and Telekinesis fails against the target.",
		shortDesc: "Super effective on Poison. Removes the target's Ground immunity.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1, metronome: 1},
		volatileStatus: 'groundingstomp',
		condition: {
			noCopy: true,
			onStart(pokemon) {
				let applies = false;
				if (pokemon.hasType('Flying') || pokemon.hasAbility('levitate')) applies = true;
				if (pokemon.hasItem('ironball') || pokemon.volatiles['ingrain'] ||
					this.field.getPseudoWeather('gravity')) applies = false;
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					applies = true;
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
				}
				if (pokemon.volatiles['magnetrise']) {
					applies = true;
					delete pokemon.volatiles['magnetrise'];
				}
				if (pokemon.volatiles['telekinesis']) {
					applies = true;
					delete pokemon.volatiles['telekinesis'];
				}
				if (!applies) return false;
				this.add('-start', pokemon, 'Grounding Stomp');
			},
			onRestart(pokemon) {
				if (pokemon.removeVolatile('fly') || pokemon.removeVolatile('bounce')) {
					this.queue.cancelMove(pokemon);
					pokemon.removeVolatile('twoturnmove');
					this.add('-start', pokemon, 'Grounding Stomp');
				}
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
		},
		onEffectiveness(typeMod, target, type) {
			if (type === 'Poison') return 1;
		},
		secondary: null,
		target: "normal",
		type: "Fighting",
		contestType: "Tough",
	},
	spiritsiphon: {
		num: 0,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		name: "Spirit Siphon",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1, metronome: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ghost",
		contestType: "Clever",
	},
	cometstrike: {
		num: 0,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		name: "Comet Strike",
		desc: "Lowers the user's Special Attack by 2 stages. This move's power is x1.3 in gravity",
		shortDesc: "Lowers the user's Sp. Atk by 2. x1.3 power in gravity.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		onBasePower(basePower) {
			if (this.field.getPseudoWeather('gravity')) {
				return this.chainModify(1.3);
			}
		},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Rock",
		contestType: "Beautiful",
	},
	shockbombs: {
		num: 0,
		accuracy: 95,
		basePower: 25,
		category: "Physical",
		name: "Shock Bombs",
		desc: "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits 2-5 times in one turn.",
		pp: 30,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		multihit: [2, 5],
		secondary: null,
		target: "normal",
		type: "Electric",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	jaggedshot: {
		num: 0,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Jagged Shot",
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes.",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignores Abilities.",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, bullet: 1},
		onModifyMove(move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		secondary: null,
		target: "normal",
		type: "Rock",
	},
};
