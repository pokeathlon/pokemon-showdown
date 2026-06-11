export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Current items that do not exist

	// Modded
	babiriberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Steel-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Steel-type attack. Single use.",
	},
	chartiberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Rock-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Rock-type attack. Single use.",
	},
	chilanberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (
				move.type === 'Normal' &&
				(!target.volatiles['substitute'] || move.flags['bypasssub'] || (move.infiltrates && this.gen >= 6))
			) {
				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from a Normal-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from a Normal-type attack. Single use.",
	},
	chopleberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Fighting-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Fighting-type attack. Single use.",
	},
	cobaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Flying-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Flying-type attack. Single use.",
	},
	colburberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Dark-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Dark-type attack. Single use.",
	},
	habanberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Dragon-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Dragon-type attack. Single use.",
	},
	kasibberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Ghost-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Ghost-type attack. Single use.",
	},
	kebiaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Poison-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Poison-type attack. Single use.",
	},
	occaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Fire-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Fire-type attack. Single use.",
	},
	passhoberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Water-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Water-type attack. Single use.",
	},
	payapaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Psychic-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Psychic-type attack. Single use.",
	},
	rindoberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Grass-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Grass-type attack. Single use.",
	},
	roseliberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Fairy-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Fairy-type attack. Single use.",
	},
	shucaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Ground-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Ground-type attack. Single use.",
	},
	tangaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Bug-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Bug-type attack. Single use.",
	},
	wacanberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Electric-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Electric-type attack. Single use.",
	},
	yacheberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.add('-enditem', target, this.effect, '[weaken]');
					if (target.ability === 'ripen') {
						this.debug('95% reduction')
						return this.chainModify(0.05);
					}
					this.debug('-75% reduction');
					return this.chainModify(0.25);
				}
			}
		},
		desc: "1/4 damage taken from supereffective Ice-type attack. Single use. If user has the Ripen ability, damage reduced by 95%.",
		shortDesc: "1/4 damage taken from supereffective Ice-type attack. Single use.",
	},
	buggem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Bug-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	darkgem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Dark-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	dragongem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Dragon-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	electric: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Electric-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	fairygem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Fairy-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	fightinggem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Fighting-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	firegem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Fire-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	flyinggem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Flying-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	ghostgem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Ghost-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	grassgem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Grass-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	groundgem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Ground-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	icegem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Ice-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	normalgem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Normal-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	poisongem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Poison-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	psychicgem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Psychic-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	rockgem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Rock-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	steelgem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Steel-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	watergem: {
		inherit: true,
		isNonstandard: undefined,
		shortDesc: "Holder's first successful Water-type attack will have 1.4x power. Single use.",
		gen: 9,
	},
	adrenalineorb: {
		inherit: true,
		onAfterBoost(boost, target, source, effect) {
			// Adrenaline Orb activates if Intimidate is blocked by an ability like Hyper Cutter,
			// which deletes boost.atk,
			// but not if the holder's attack is already at -6 (or +6 if it has Contrary),
			// which sets boost.atk to 0
			if (target.boosts['spe'] === 6 || boost.atk === 0) {
				return;
			}
			if (effect.name === 'Intimidate' || effect.name === 'Dishearten') {
				target.useItem();
			}
		},
		num: 0,
		shortDesc: "Raises holder's Speed by 1 stage if it gets affected by Intimidate or Dishearten. Single use.",
		gen: 9,
	},
	rockyhelmet: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		shortDesc: "If holder is hit by a Physical move, the attacker loses 1/8 of its max HP.",
		gen: 9,
	},
	
	// New items 
	assaultarmor: {
		name: "Assault Armor",
		spritenum: -6,
		fling: {
			basePower: 80,
		},
		onModifyDefPriority: 1,
		onModifyDef(def) {
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.category === 'Status' && move.id !== 'mefirst') {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder's Def is 1.5x, but it can only select damaging moves.",
	},
	bodyarmor: {
		name: "Body Armor",
		spritenum: -6,
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.recoil) move.recoil = undefined;
		},
		num: 0,
		desc: "Holder does not take recoil damage.",
	},
	cosmicgem: {
		name: "Cosmic Gem",
		spritenum: -6,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Cosmic' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder's first successful Cosmic-type attack will have 1.4x power. Single use.",
	},
	soundgem: {
		name: "Sound Gem",
		spritenum: -6,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Sound' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder's first successful Sound-type attack will have 1.4x power. Single use.",
	},
	lightgem: {
		name: "Light Gem",
		spritenum: -6,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Light' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder's first successful Light-type attack will have 1.4x power. Single use.",
	},
	sharpcoral: {
		name: "Sharp Coral",
		spritenum: -6,
		fling: {
			basePower: 90,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Cubone-Soulstones' || pokemon.baseSpecies.baseSpecies === 'Marowak-Soulstones') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Cubone-Soulstones", "Marowak-Soulstones"],
		num: 0,
		gen: 9,
		shortDesc: "If held by a Cubone-Soulstones or Marowak-Soulstones, its Attack is doubled.",
	},
	arcanespellbook: {
		name: "Arcane Spellbook",
		spritenum: -6,
		fling: {
			basePower: 90,
		},
		onModifySpAPriority: 1,
		onModifySpA(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Omanyte-Soulstones' || pokemon.baseSpecies.baseSpecies === 'Omastar-Soulstones') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Omanyte-Soulstones", "Omastar-Soulstones"],
		num: 0,
		gen: 9,
		shortDesc: "If held by a Omanyte-Soulstones or Omastar-Soulstones, its Sp. Atk is doubled.",
	},
	focusingorb: {
		name: "Focusing Orb",
		spritenum: -6,
		fling: {
			basePower: 30,
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Clamperl-Soulstones') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Clamperl-Soulstones') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl-Soulstones"],
		num: 0,
		gen: 9,
		shortDesc: "If held by a Clamperl-Soulstones, its Def and Sp. Def is doubled.",
	},
	voidheart: {
		name: "Void Heart",
		spritenum: -6,
		fling: {
			basePower: 30,
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Volbeat-Soulstones') {
				return this.chainModify(2);
			}
		},
		onModifyDefPriority: 1,
		onModifyDef(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Volbeat-Soulstones') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Volbeat-Soulstones"],
		num: 0,
		gen: 9,
		shortDesc: "If held by a Volbeat-Soulstones, its Atk and Def are 1.5x.",
	},
	radiantorb: {
		name: "Radiant Orb",
		spritenum: -6,
		fling: {
			basePower: 30,
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Illumise-Soulstones') {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 1,
		onModifySpD(def, pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Illumise-Soulstones') {
				return this.chainModify(2);
			}
		},
		itemUser: ["Illumise-Soulstones"],
		num: 0,
		gen: 9,
		shortDesc: "If held by a Illumise-Soulstones, its Sp. Atk and Sp. Def are 1.5x.",
	},
	headphones: {
		name: "Headphones",
		spritenum: -6,
		fling: {
			basePower: 10,
		},
		onStart(target) {
			if (!target.ignoringItem()) {
				this.add('-item', target, 'Headphones');
			}
		},
		onDamagingHit(damage, target, source, move) {
			this.add('-enditem', target, 'Headphones');
			target.item = '';
			this.clearEffectState(target.itemState);
			this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('headphones'));
		},
		onAfterSubDamage(damage, target, source, effect) {
			this.debug('effect: ' + effect.id);
			if (effect.effectType === 'Move') {
				this.add('-enditem', target, 'Headphones');
				target.item = '';
				this.clearEffectState(target.itemState);
				this.runEvent('AfterUseItem', target, null, null, this.dex.items.get('headphones'));
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder is immune to Sound-type attacks. Pops when holder is hit.",
	},
	stellarplate: {
		name: "Stellar Plate",
		spritenum: -6,
		onPlate: 'Cosmic',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Cosmic') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Cosmic",
		num: 0,
		gen: 9,
		shortDesc: "Holder's Cosmic-type attacks have 1.2x power. Judgment is Cosmic type.",
	},
	rhythmplate: {
		name: "Rhythm Plate",
		spritenum: -6,
		onPlate: 'Sound',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Sound') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Sound",
		num: 0,
		gen: 9,
		shortDesc: "Holder's Sound-type attacks have 1.2x power. Judgment is Sound type.",
	},
	holyplate: {
		name: "Holy Plate",
		spritenum: -6,
		onPlate: 'Light',
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move && move.type === 'Light') {
				return this.chainModify([4915, 4096]);
			}
		},
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 493) || pokemon.baseSpecies.num === 493) {
				return false;
			}
			return true;
		},
		forcedForme: "Arceus-Light",
		num: 0,
		gen: 9,
		shortDesc: "Holder's Light-type attacks have 1.2x power. Judgment is Light type.",
	},
	oliberry: {
		name: "Oli Berry",
		spritenum: -6,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Cosmic",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Cosmic' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Cosmic-type attack. Single use.",
	},
	patotoberry: {
		name: "Patoto Berry",
		spritenum: -6,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Sound",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Sound' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Sound-type attack. Single use.",
	},
	avocaberry: {
		name: "Avoca Berry",
		spritenum: -6,
		isBerry: true,
		naturalGift: {
			basePower: 80,
			type: "Light",
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Light' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
		onEat() { },
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Light-type attack. Single use.",
	},
	cosmicdust: {
		name: "Cosmic Dust",
		spritenum: -6,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Cosmic') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder's Cosmic-type attacks have 1.2x power.",
	},
	musicbox: {
		name: "Music Box",
		spritenum: -6,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Sound') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder's Sound-type attacks have 1.2x power.",
	},
	clearmirror: {
		name: "Clear Mirror",
		spritenum: -6,
		fling: {
			basePower: 10,
		},
		onBasePowerPriority: 15,
		onBasePower(basePower, user, target, move) {
			if (move.type === 'Light') {
				return this.chainModify([4915, 4096]);
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder's Light-type attacks have 1.2x power.",
	},

	// Mega stones
	gengarites: {
    		name: "Gengarite-S",
    		spritenum: -6,
    		megaStone: { "Gengar-Soulstones": "Gengar-Soulstones-Mega" },
    		itemUser: ["Gengar-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gengar-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	dodrinites: {
    		name: "Dodrinite-S",
    		spritenum: -6,
    		megaStone: { "Dodrio-Soulstones": "Dodrio-Soulstones-Mega" },
    		itemUser: ["Dodrio-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Dodrio-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	arbokinites: {
    		name: "Arbokinite-S",
    		spritenum: -6,
    		megaStone: { "Arbok-Soulstones": "Arbok-Soulstones-Mega" },
    		itemUser: ["Arbok-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Arbok-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	starmites: {
    		name: "Starmite-S",
    		spritenum: -6,
    		megaStone: { "Starmie-Soulstones": "Starmie-Soulstones-Mega" },
    		itemUser: ["Starmie-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Starmie-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	steelixites: {
    		name: "Steelixite-S",
    		spritenum: -6,
    		megaStone: { "Steelix-Soulstones": "Steelix-Soulstones-Mega" },
    		itemUser: ["Steelix-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Steelix-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	xatunites: {
    		name: "Xatunite-S",
    		spritenum: -6,
    		megaStone: { "Xatu-Soulstones": "Xatu-Soulstones-Mega" },
    		itemUser: ["Xatu-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Xatu-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	seismitoadites: {
    		name: "Seismitoadite-S",
    		spritenum: -6,
    		megaStone: { "Seismitoad-Soulstones": "Seismitoad-Soulstones-Mega" },
    		itemUser: ["Seismitoad-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Seismitoad-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	golites: {
    		name: "Golite-S",
    		spritenum: -6,
    		megaStone: { "Golurk-Soulstones": "Golurk-Soulstones-Mega" },
    		itemUser: ["Golurk-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Golurk-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	gyaradosites: {
    		name: "Gyaradosite-S",
    		spritenum: -6,
    		megaStone: { "Gyarados-Soulstones": "Gyarados-Soulstones-Mega" },
    		itemUser: ["Gyarados-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gyarados-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	avaluggites: {
    		name: "Avaluggite-S",
    		spritenum: -6,
    		megaStone: { "Avalugg-Soulstones": "Avalugg-Soulstones-Mega" },
    		itemUser: ["Avalugg-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Avalugg-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	rapidashinites: {
    		name: "Rapidashinite-S",
    		spritenum: -6,
    		megaStone: { "Rapidash-Soulstones": "Rapidash-Soulstones-Mega" },
    		itemUser: ["Rapidash-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Rapidash-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	aerodactylites: {
    		name: "Aerodactylite-S",
    		spritenum: -6,
    		megaStone: { "Aerodactyl-Soulstones": "Aerodactyl-Soulstones-Mega" },
    		itemUser: ["Aerodactyl-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Aerodactyl-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	giganites: {
    		name: "Giganite-S",
    		spritenum: -6,
    		megaStone: { "Gigalith-Soulstones": "Gigalith-Soulstones-Mega" },
    		itemUser: ["Gigalith-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gigalith-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	gliscites: {
    		name: "Gliscite-S",
    		spritenum: -6,
    		megaStone: { "Gliscor-Soulstones": "Gliscor-Soulstones-Mega" },
    		itemUser: ["Gliscor-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gliscor-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	sudowooditex: {
    		name: "Sudowoodite-X",
    		spritenum: -6,
    		megaStone: { "Sudowoodo-Soulstones": "Sudowoodo-Soulstones-Mega-X" },
    		itemUser: ["Sudowoodo-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Sudowoodo-Soulstones, this item allows it to Mega Evolve in battle.",
    	},
	sudowooditey: {
    		name: "Sudowoodite-Y",
    		spritenum: -6,
    		megaStone: { "Sudowoodo-Soulstones": "Sudowoodo-Soulstones-Mega-Y" },
    		itemUser: ["Sudowoodo-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Sudowoodo-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	noctowlites: {
    		name: "Noctowlite-S",
    		spritenum: -6,
    		megaStone: { "Noctowl-Soulstones": "Noctowl-Soulstones-Mega" },
    		itemUser: ["Noctowl-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Noctowl-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	electronites: {
    		name: "Electronite-S",
    		spritenum: -6,
    		megaStone: { "Electrode-Soulstones": "Electrode-Soulstones-Mega" },
    		itemUser: ["Electrode-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Electrode-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	beedrillites: {
    		name: "Beedrillite-S",
    		spritenum: -6,
    		megaStone: { "Beedrill-Soulstones": "Beedrill-Soulstones-Mega" },
    		itemUser: ["Beedrill-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Beedrill-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	machampites: {
    		name: "Machampite-S",
    		spritenum: -6,
    		megaStone: { "Machamp-Soulstones": "Machamp-Soulstones-Mega" },
    		itemUser: ["Machamp-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Machamp-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	venusaurites: {
    		name: "Venusaurite-S",
    		spritenum: -6,
    		megaStone: { "Venusaur-Soulstones": "Venusaur-Soulstones-Mega" },
    		itemUser: ["Venusaur-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Venusaur-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	sharpedonites: {
    		name: "Sharpedonite-S",
    		spritenum: -6,
    		megaStone: { "Sharpedo-Soulstones": "Sharpedo-Soulstones-Mega" },
    		itemUser: ["Sharpedo-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Sharpedo-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	chandelites: {
    		name: "Chandelite-S",
    		spritenum: -6,
    		megaStone: { "Chandelure-Soulstones": "Chandelure-Soulstones-Mega" },
    		itemUser: ["Chandelure-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Chandelure-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	glalitites: {
    		name: "Glalitite-S",
    		spritenum: -6,
    		megaStone: { "Glalie-Soulstones": "Glalie-Soulstones-Mega" },
    		itemUser: ["Glalie-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Glalie-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	froslassites: {
    		name: "Froslassite-S",
    		spritenum: -6,
    		megaStone: { "Froslass-Soulstones": "Froslass-Soulstones-Mega" },
    		itemUser: ["Froslass-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Froslass-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	infernapinites: {
    		name: "Infernapinite-S",
    		spritenum: -6,
    		megaStone: { "Infernape-Soulstones": "Infernape-Soulstones-Mega" },
    		itemUser: ["Infernape-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Infernape-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	sablenites: {
    		name: "Sablenite-S",
    		spritenum: -6,
    		megaStone: { "Sableye-Soulstones": "Sableye-Soulstones-Mega" },
    		itemUser: ["Sableye-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Sableye-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	bearticites: {
    		name: "Bearticite-S",
    		spritenum: -6,
    		megaStone: { "Beartic-Soulstones": "Beartic-Soulstones-Mega" },
    		itemUser: ["Beartic-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Beartic-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	sceptilites: {
    		name: "Sceptilite-S",
    		spritenum: -6,
    		megaStone: { "Sceptile-Soulstones": "Sceptile-Soulstones-Mega" },
    		itemUser: ["Sceptile-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Sceptile-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tyranitarites: {
    		name: "Tyranitarite-S",
    		spritenum: -6,
    		megaStone: { "Tyranitar-Soulstones": "Tyranitar-Soulstones-Mega" },
    		itemUser: ["Tyranitar-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Tyranitar-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	hippowdonites: {
    		name: "Hippowdonite-S",
    		spritenum: -6,
    		megaStone: { "Hippowdon-Soulstones": "Hippowdon-Soulstones-Mega" },
    		itemUser: ["Hippowdon-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Hippowdon-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	ampharosites: {
    		name: "Ampharosite-S",
    		spritenum: -6,
    		megaStone: { "Ampharos-Soulstones": "Ampharos-Soulstones-Mega" },
    		itemUser: ["Ampharos-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Ampharos-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	altarianites: {
    		name: "Altarianite-S",
    		spritenum: -6,
    		megaStone: { "Altaria-Soulstones": "Altaria-Soulstones-Mega" },
    		itemUser: ["Altaria-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Altaria-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	heracronites: {
    		name: "Heracronite-S",
    		spritenum: -6,
    		megaStone: { "Heracross-Soulstones": "Heracross-Soulstones-Mega" },
    		itemUser: ["Heracross-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Heracross-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	sawsbuckites: {
    		name: "Sawsbuckite-S",
    		spritenum: -6,
    		megaStone: { "Sawsbuck-Soulstones": "Sawsbuck-Soulstones-Mega" },
    		itemUser: ["Sawsbuck-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Sawsbuck-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	aggronites: {
    		name: "Aggronite-S",
    		spritenum: -6,
    		megaStone: { "Aggron-Soulstones": "Aggron-Soulstones-Mega" },
    		itemUser: ["Aggron-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Aggron-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	slowkingites: {
    		name: "Slowkingite-S",
    		spritenum: -6,
    		megaStone: { "Slowking-Soulstones": "Slowking-Soulstones-Mega" },
    		itemUser: ["Slowking-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Slowking-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	corvinites: {
    		name: "Corvinite-S",
    		spritenum: -6,
    		megaStone: { "Corviknight-Soulstones": "Corviknight-Soulstones-Mega" },
    		itemUser: ["Corviknight-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Corviknight-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	kingdranites: {
    		name: "Kingdranite-S",
    		spritenum: -6,
    		megaStone: { "Kingdra-Soulstones": "Kingdra-Soulstones-Mega" },
    		itemUser: ["Kingdra-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Kingdra-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	butterfrites: {
    		name: "Butterfrite-S",
    		spritenum: -6,
    		megaStone: { "Butterfree-Soulstones": "Butterfree-Soulstones-Mega" },
    		itemUser: ["Butterfree-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Butterfree-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	furretites: {
    		name: "Furretite-S",
    		spritenum: -6,
    		megaStone: { "Furret-Soulstones": "Furret-Soulstones-Mega" },
    		itemUser: ["Furret-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Furret-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	gardevoirites: {
    		name: "Gardevoirite-S",
    		spritenum: -6,
    		megaStone: { "Gardevoir-Soulstones": "Gardevoir-Soulstones-Mega" },
    		itemUser: ["Gardevoir-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gardevoir-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	galladites: {
    		name: "Galladite-S",
    		spritenum: -6,
    		megaStone: { "Gallade-Soulstones": "Gallade-Soulstones-Mega" },
    		itemUser: ["Gallade-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gallade-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	dugtrioites: {
    		name: "Dugtrioite-S",
    		spritenum: -6,
    		megaStone: { "Dugtrio-Soulstones": "Dugtrio-Soulstones-Mega" },
    		itemUser: ["Dugtrio-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Dugtrio-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	azumarillites: {
    		name: "Azumarillite-S",
    		spritenum: -6,
    		megaStone: { "Azumarill-Soulstones": "Azumarill-Soulstones-Mega" },
    		itemUser: ["Azumarill-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Azumarill-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	meloettites: {
    		name: "Meloettite-S",
    		spritenum: -6,
    		megaStone: { "Meloetta-Soulstones": "Meloetta-Soulstones-Mega" },
    		itemUser: ["Meloetta-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Meloetta-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	absolites: {
    		name: "Absolite-S",
    		spritenum: -6,
    		megaStone: { "Absol-Soulstones": "Absol-Soulstones-Mega" },
    		itemUser: ["Absol-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Absol-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	metagrossites: {
    		name: "Metagrossite-S",
    		spritenum: -6,
    		megaStone: { "Metagross-Soulstones": "Metagross-Soulstones-Mega" },
    		itemUser: ["Metagross-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Metagross-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	medichamites: {
    		name: "Medichamite-S",
    		spritenum: -6,
    		megaStone: { "Medicham-Soulstones": "Medicham-Soulstones-Mega" },
    		itemUser: ["Medicham-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Medicham-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	pidgeotites: {
    		name: "Pidgeotite-S",
    		spritenum: -6,
    		megaStone: { "Pidgeot-Soulstones": "Pidgeot-Soulstones-Mega" },
    		itemUser: ["Pidgeot-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Pidgeot-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	blissites: {
    		name: "Blissite-S",
    		spritenum: -6,
    		megaStone: { "Blissey-Soulstones": "Blissey-Soulstones-Mega" },
    		itemUser: ["Blissey-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Blissey-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tentacruelites: {
    		name: "Tentacruelite-S",
    		spritenum: -6,
    		megaStone: { "Tentacruel-Soulstones": "Tentacruel-Soulstones-Mega" },
    		itemUser: ["Tentacruel-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Tentacruel-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tsareenitex: {
    		name: "Tsareenite-X",
    		spritenum: -6,
    		megaStone: { "Tsareena-Soulstones": "Tsareena-Soulstones-Mega-X" },
    		itemUser: ["Tsareena-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Tsareena-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tsareenitey: {
    		name: "Tsareenite-Y",
    		spritenum: -6,
    		megaStone: { "Tsareena-Soulstones": "Tsareena-Soulstones-Mega-Y" },
    		itemUser: ["Tsareena-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Tsareena-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	beheeyemites: {
    		name: "Beheeyemite-S",
    		spritenum: -6,
    		megaStone: { "Beheeyem-Soulstones": "Beheeyem-Soulstones-Mega" },
    		itemUser: ["Beheeyem-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Beheeyem-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	sandaconites: {
    		name: "Sandaconite-S",
    		spritenum: -6,
    		megaStone: { "Sandaconda-Soulstones": "Sandaconda-Soulstones-Mega" },
    		itemUser: ["Sandaconda-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Sandaconda-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	raichunites: {
    		name: "Raichunite-S",
    		spritenum: -6,
    		megaStone: { "Raichu-Soulstones": "Raichu-Soulstones-Mega" },
    		itemUser: ["Raichu-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Raichu-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	cofagrinites: {
    		name: "Cofagrinite-S",
    		spritenum: -6,
    		megaStone: { "Cofagrigus-Soulstones": "Cofagrigus-Soulstones-Mega" },
    		itemUser: ["Cofagrigus-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Cofagrigus-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	swampertites: {
    		name: "Swampertite-S",
    		spritenum: -6,
    		megaStone: { "Swampert-Soulstones": "Swampert-Soulstones-Mega" },
    		itemUser: ["Swampert-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Swampert-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	gothitellites: {
    		name: "Gothitellite-S",
    		spritenum: -6,
    		megaStone: { "Gothitelle-Soulstones": "Gothitelle-Soulstones-Mega" },
    		itemUser: ["Gothitelle-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gothitelle-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	charizardites: {
    		name: "Charizardite-S",
    		spritenum: -6,
    		megaStone: { "Charizard-Soulstones": "Charizard-Soulstones-Mega" },
    		itemUser: ["Charizard-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Charizard-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	wiggnites: {
    		name: "Wiggnite-S",
    		spritenum: -6,
    		megaStone: { "Wigglytuff-Soulstones": "Wigglytuff-Soulstones-Mega" },
    		itemUser: ["Wigglytuff-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Wigglytuff-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	manectites: {
    		name: "Manectite-S",
    		spritenum: -6,
    		megaStone: { "Manectric-Soulstones": "Manectric-Soulstones-Mega" },
    		itemUser: ["Manectric-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Manectric-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	mamoswinites: {
    		name: "Mamoswinite-S",
    		spritenum: -6,
    		megaStone: { "Mamoswine-Soulstones": "Mamoswine-Soulstones-Mega" },
    		itemUser: ["Mamoswine-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Mamoswine-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	torterranites: {
    		name: "Torterranite-S",
    		spritenum: -6,
    		megaStone: { "Torterra-Soulstones": "Torterra-Soulstones-Mega" },
    		itemUser: ["Torterra-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Torterra-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	lopunnites: {
    		name: "Lopunnite-S",
    		spritenum: -6,
    		megaStone: { "Lopunny-Soulstones": "Lopunny-Soulstones-Mega" },
    		itemUser: ["Lopunny-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Lopunny-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tgothitellite: {
    		name: "T.Gothitellite",
    		spritenum: -6,
    		megaStone: { "T.Gothitelle": "T.Gothitelle-Mega" },
    		itemUser: ["T.Gothitelle"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.GOthitelle, this item allows it to Mega Evolve in battle.",
    	},

	donphanites: {
    		name: "Donphanite-S",
    		spritenum: -6,
    		megaStone: { "Donphan-Soulstones": "Donphan-Soulstones-Mega" },
    		itemUser: ["Donphan-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Donphan-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	garchompites: {
    		name: "Garchompite-S",
    		spritenum: -6,
    		megaStone: { "Garchomp-Soulstones": "Garchomp-Soulstones-Mega" },
    		itemUser: ["Garchomp-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Garchomp-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	ninetalites: {
    		name: "Ninetalite-S",
    		spritenum: -6,
    		megaStone: { "Ninetales-Soulstones": "Ninetales-Soulstones-Mega" },
    		itemUser: ["Ninetales-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Ninetales-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	toxtricites: {
    		name: "Toxtricite-S",
    		spritenum: -6,
    		megaStone: { "Toxtricity-Soulstones": "Toxtricity-Soulstones-Mega" },
    		itemUser: ["Toxtricity-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Toxtricity-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tdugtrioite: {
    		name: "T.Dugtrioite",
    		spritenum: -6,
    		megaStone: { "T.Dugtrio": "T.Dugtrio-Mega" },
    		itemUser: ["T.Dugtrio"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Dugtrio, this item allows it to Mega Evolve in battle.",
    	},

	luvdiscites: {
    		name: "Luvdiscite-S",
    		spritenum: -6,
    		megaStone: { "Luvdisc-Soulstones": "Luvdisc-Soulstones-Mega" },
    		itemUser: ["Luvdisc-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Luvdisc-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tabsolite: {
    		name: "T.Absolite",
    		spritenum: -6,
    		megaStone: { "T.Absol": "T.Absol-Mega" },
    		itemUser: ["T.Absol"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Absol, this item allows it to Mega Evolve in battle.",
    	},

	abomasites: {
    		name: "Abomasite-S",
    		spritenum: -6,
    		megaStone: { "Abomasnow-Soulstones": "Abomasnow-Soulstones-Mega" },
    		itemUser: ["Abomasnow-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Abomasnow-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tsablenite: {
    		name: "T.Sablenite",
    		spritenum: -6,
    		megaStone: { "T.Sableye": "T.Sableye-Mega" },
    		itemUser: ["T.Sableye"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Sableye, this item allows it to Mega Evolve in battle.",
    	},

	garbodinites: {
    		name: "Garbodinite-S",
    		spritenum: -6,
    		megaStone: { "Garbodor-Soulstones": "Garbodor-Soulstones-Mega" },
    		itemUser: ["Garbodor-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Garbodor-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	taltarianite: {
    		name: "T.Altarianite",
    		spritenum: -6,
    		megaStone: { "T.Altaria": "T.Altaria-Mega" },
    		itemUser: ["T.Altaria"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Altaria, this item allows it to Mega Evolve in battle.",
    	},

	tswampertite: {
    		name: "T.Swampertite",
    		spritenum: -6,
    		megaStone: { "T.Swampert": "T.Swampert-Mega" },
    		itemUser: ["T.Swampert"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Swampert, this item allows it to Mega Evolve in battle.",
    	},

	tmasquerite: {
    		name: "T.Masquerite",
    		spritenum: -6,
    		megaStone: { "T.Masquerain": "T.Masquerain-Mega" },
    		itemUser: ["T.Masquerain"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Masquerain, this item allows it to Mega Evolve in battle.",
    	},

	barbaraclites: {
    		name: "Barbaraclite-S",
    		spritenum: -6,
    		megaStone: { "Barbaracle-Soulstones": "Barbaracle-Soulstones-Mega" },
    		itemUser: ["Barbaracle-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Barbaracle-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	falinkites: {
    		name: "Falinkite-S",
    		spritenum: -6,
    		megaStone: { "Falinks-Soulstones": "Falinks-Soulstones-Mega" },
    		itemUser: ["Falinks-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Falinks-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	mismagites: {
    		name: "Mismagite-S",
    		spritenum: -6,
    		megaStone: { "Mismagius-Soulstones": "Mismagius-Soulstones-Mega" },
    		itemUser: ["Mismagius-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Mismagius-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	scizorites: {
    		name: "Scizorite-S",
    		spritenum: -6,
    		megaStone: { "Scizor-Soulstones": "Scizor-Soulstones-Mega" },
    		itemUser: ["Scizor-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Scizor-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	coalossalites: {
    		name: "Coalossalite-S",
    		spritenum: -6,
    		megaStone: { "Coalossal-Soulstones": "Coalossal-Soulstones-Mega" },
    		itemUser: ["Coalossal-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Coalossal-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tgiganite: {
    		name: "T.Giganite",
    		spritenum: -6,
    		megaStone: { "T.Gigalith": "T.Gigalith-Mega" },
    		itemUser: ["T.Gigalith"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Gigalith, this item allows it to Mega Evolve in battle.",
    	},

	dragites: {
    		name: "Dragite-S",
    		spritenum: -6,
    		megaStone: { "Dragonite-Soulstones": "Dragonite-Soulstones-Mega" },
    		itemUser: ["Dragonite-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Dragonite-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	dragapultites: {
    		name: "Dragapultite-S",
    		spritenum: -6,
    		megaStone: { "Dragapult-Soulstones": "Dragapult-Soulstones-Mega" },
    		itemUser: ["Dragapult-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Dragapult-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	banettites: {
    		name: "Banettite-S",
    		spritenum: -6,
    		megaStone: { "Banette-Soulstones": "Banette-Soulstones-Mega" },
    		itemUser: ["Banette-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Banette-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	houndoominites: {
    		name: "Houndoominite-S",
    		spritenum: -6,
    		megaStone: { "Houndoom-Soulstones": "Houndoom-Soulstones-Mega" },
    		itemUser: ["Houndoom-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Houndoom-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	empoleonites: {
    		name: "Empoleonite-S",
    		spritenum: -6,
    		megaStone: { "Empoleon-Soulstones": "Empoleon-Soulstones-Mega" },
    		itemUser: ["Empoleon-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Empoleon-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tjumpinite: {
    		name: "T.Jumpinite",
    		spritenum: -6,
    		megaStone: { "T.Jumpluff": "T.Jumpluff-Mega" },
    		itemUser: ["T.Jumpluff"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Jumpluff, this item allows it to Mega Evolve in battle.",
    	},

	exploudinites: {
    		name: "Exploudinite-S",
    		spritenum: -6,
    		megaStone: { "Exploud-Soulstones": "Exploud-Soulstones-Mega" },
    		itemUser: ["Exploud-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Exploud-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	centiskorites: {
    		name: "Centiskorite-S",
    		spritenum: -6,
    		megaStone: { "Centiskorch-Soulstones": "Centiskorch-Soulstones-Mega" },
    		itemUser: ["Centiskorch-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Centiskorch-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	salamencites: {
    		name: "Salamencite-S",
    		spritenum: -6,
    		megaStone: { "Salamence-Soulstones": "Salamence-Soulstones-Mega" },
    		itemUser: ["Salamence-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Salamence-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	grapploctites: {
    		name: "Grapploctite-S",
    		spritenum: -6,
    		megaStone: { "Grapploct-Soulstones": "Grapploct-Soulstones-Mega" },
    		itemUser: ["Grapploct-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Grapploct-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	hatterenites: {
    		name: "Hatterenite-S",
    		spritenum: -6,
    		megaStone: { "Hatterene-Soulstones": "Hatterene-Soulstones-Mega" },
    		itemUser: ["Hatterene-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Hatterene-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	chimechites: {
    		name: "Chimechite-S",
    		spritenum: -6,
    		megaStone: { "Chimecho-Soulstones": "Chimecho-Soulstones-Mega" },
    		itemUser: ["Chimecho-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Chimecho-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tgrimmsnarlite: {
    		name: "T.Grimmsnarlite",
    		spritenum: -6,
    		megaStone: { "T.Grimmsnarl": "T.Grimmsnarl-Mega" },
    		itemUser: ["T.Grimmsnarl"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Grimmsnarl, this item allows it to Mega Evolve in battle.",
    	},

	twyrdeerite: {
    		name: "T.Wyrdeerite",
    		spritenum: -6,
    		megaStone: { "T.Wyrdeer": "T.Wyrdeer-Mega" },
    		itemUser: ["T.Wyrdeer"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Wyrdeer, this item allows it to Mega Evolve in battle.",
    	},

	ursalunites: {
    		name: "Ursalunite-S",
    		spritenum: -6,
    		megaStone: { "Ursaluna-Soulstones": "Ursaluna-Soulstones-Mega" },
    		itemUser: ["Ursaluna-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a URsaluna-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	emolgites: {
    		name: "Emolgite-S",
    		spritenum: -6,
    		megaStone: { "Emolga-Soulstones": "Emolga-Soulstones-Mega" },
    		itemUser: ["Emolga-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Emolga-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	vespiquenites: {
    		name: "Vespiquenite-S",
    		spritenum: -6,
    		megaStone: { "Vespiquen-Soulstones": "Vespiquen-Soulstones-Mega" },
    		itemUser: ["Vespiquen-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Vespiquen-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	blazikenites: {
    		name: "Blazikenite-S",
    		spritenum: -6,
    		megaStone: { "Blaziken-Soulstones": "Blaziken-Soulstones-Mega" },
    		itemUser: ["Blaziken-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Blaziken-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	garganaclites: {
    		name: "Garganaclite-S",
    		spritenum: -6,
    		megaStone: { "Garganacl-Soulstones": "Garganacl-Soulstones-Mega" },
    		itemUser: ["Garganacl-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Garganacl-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	wobbnites: {
    		name: "Wobbnite-S",
    		spritenum: -6,
    		megaStone: { "Wobbuffet-Soulstones": "Wobbuffet-Soulstones-Mega" },
    		itemUser: ["Wobbuffet-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Wobbuffet-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	plusites: {
    		name: "Plusite-S",
    		spritenum: -6,
    		megaStone: { "Plusle-Soulstones": "Plusle-Soulstones-Mega" },
    		itemUser: ["Plusle-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Plusle-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	minunites: {
    		name: "Minunite-S",
    		spritenum: -6,
    		megaStone: { "Minun-Soulstones": "Minun-Soulstones-Mega" },
    		itemUser: ["Minun-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Minun-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	blastoisinites: {
    		name: "Blastoisinite-S",
    		spritenum: -6,
    		megaStone: { "Blastoise-Soulstones": "Blastoise-Soulstones-Mega" },
    		itemUser: ["Blastoise-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Blastoise-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tcacturnite: {
    		name: "T.Cacturnite",
    		spritenum: -6,
    		megaStone: { "T.Cacturne": "T.Cacturne-Mega" },
    		itemUser: ["T.Cacturne"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Cacturne-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tursalunite: {
    		name: "T.Ursalunite",
    		spritenum: -6,
    		megaStone: { "T.Ursaluna": "T.Ursaluna-Mega" },
    		itemUser: ["T.Ursaluna"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Ursaluna, this item allows it to Mega Evolve in battle.",
    	},

	drednites: {
    		name: "Drednite-S",
    		spritenum: -6,
    		megaStone: { "Drednaw-Soulstones": "Drednaw-Soulstones-Mega" },
    		itemUser: ["Drednaw-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Drednaw-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	melmetalites: {
    		name: "Melmetalite-S",
    		spritenum: -6,
    		megaStone: { "Melmetal-Soulstones": "Melmetal-Soulstones-Mega" },
    		itemUser: ["Melmetal-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Melmetal-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	twhimsicottite: {
    		name: "T.Whimsicottite",
    		spritenum: -6,
    		megaStone: { "T.Whimsicott": "T.Whimsicott-Mega" },
    		itemUser: ["T.Whimsicott"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Whimsicott, this item allows it to Mega Evolve in battle.",
    	},

	tcharizardite: {
    		name: "T.Charizardite",
    		spritenum: -6,
    		megaStone: { "T.Charizard": "T.Charizard-Mega" },
    		itemUser: ["T.Charizard"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Charizard, this item allows it to Mega Evolve in battle.",
    	},

	victreebelites: {
    		name: "Victreebelite-S",
    		spritenum: -6,
    		megaStone: { "Victreebel-Soulstones": "Victreebel-Soulstones-Mega" },
    		itemUser: ["Victreebel-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Victreebel-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	delibirdites: {
    		name: "Delibirdite-S",
    		spritenum: -6,
    		megaStone: { "Delibird-Soulstones": "Delibird-Soulstones-Mega" },
    		itemUser: ["Delibird-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Delibird-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tscizorite: {
    		name: "T.Scizorite",
    		spritenum: -6,
    		megaStone: { "T.Scizor": "T.Scizor-Mega" },
    		itemUser: ["T.Scizor"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Scizor, this item allows it to Mega Evolve in battle.",
    	},

	tkleavorite: {
    		name: "T.Kleavorite",
    		spritenum: -6,
    		megaStone: { "T.Kleavor": "T.Kleavor-Mega" },
    		itemUser: ["T.Kleavor"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Kleavor, this item allows it to Mega Evolve in battle.",
    	},

	kangaskhanites: {
    		name: "Kangaskhanite-S",
    		spritenum: -6,
    		megaStone: { "Kangaskhan-Soulstones": "Kangaskhan-Soulstones-Mega" },
    		itemUser: ["Kangaskhan-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Kangaskhan-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	pyukumites: {
    		name: "Pyukumite-S",
    		spritenum: -6,
    		megaStone: { "Pyukumuku-Soulstones": "Pyukumuku-Soulstones-Mega" },
    		itemUser: ["Pyukumuku-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Pyukumuku-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tvenusaurite: {
    		name: "T.Venusaurite",
    		spritenum: -6,
    		megaStone: { "T.Venusaur": "T.Venusaur-Mega" },
    		itemUser: ["T.Venusaur"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Venusaur, this item allows it to Mega Evolve in battle.",
    	},
		
	mawilites: {
    		name: "Mawilite-S",
    		spritenum: -6,
    		megaStone: { "Mawile-Soulstones": "Mawile-Soulstones-Mega" },
    		itemUser: ["Mawile-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Mawile-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tampharosite: {
    		name: "T.Ampharosite",
    		spritenum: -6,
    		megaStone: { "T.Ampharos": "T.Ampharos-Mega" },
    		itemUser: ["T.Ampharos"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Ampharos, this item allows it to Mega Evolve in battle.",
    	},

	tsnorlaxite: {
    		name: "T.Snorlaxite",
    		spritenum: -6,
    		megaStone: { "T.Snorlax": "T.Snorlax-Mega" },
    		itemUser: ["T.Snorlax"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Snorlax, this item allows it to Mega Evolve in battle.",
    	},

	tfurretite: {
    		name: "T.Furretite",
    		spritenum: -6,
    		megaStone: { "T.Furret": "T.Furret-Mega" },
    		itemUser: ["T.Furret"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Furret, this item allows it to Mega Evolve in battle.",
    	},

	tmagcargite: {
    		name: "T.Magcargite",
    		spritenum: -6,
    		megaStone: { "T.Magcargo": "T.Magcargo-Mega" },
    		itemUser: ["T.Magcargo"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Magcargo, this item allows it to Mega Evolve in battle.",
    	},
		
	reuniclites: {
    		name: "Reuniclite-S",
    		spritenum: -6,
    		megaStone: { "Reuniclus-Soulstones": "Reuniclus-Soulstones-Mega" },
    		itemUser: ["Reuniclus-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Reuniclus-Soulstones, this item allows it to Mega Evolve in battle.",
    	},
		
	meowsticites: {
    		name: "Meowsticite-S",
    		spritenum: -6,
    		megaStone: { "Meowstic-Soulstones": "Meowstic-Soulstones-Mega" },
    		itemUser: ["Meowstic-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Meowstic-Soulstones, this item allows it to Mega Evolve in battle.",
    	},
		
	staraptites: {
    		name: "Staraptite-S",
    		spritenum: -6,
    		megaStone: { "Staraptor-Soulstones": "Staraptor-Soulstones-Mega" },
    		itemUser: ["Staraptor-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Staraptor-Soulstones, this item allows it to Mega Evolve in battle.",
    	},
		
	raticatites: {
    		name: "Raticatite-S",
    		spritenum: -6,
    		megaStone: { "Raticate-Soulstones": "Raticate-Soulstones-Mega" },
    		itemUser: ["Raticate-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Raticate-Soulstones, this item allows it to Mega Evolve in battle.",
    	},
		
	baxcalibrites: {
    		name: "Baxcalibrite-S",
    		spritenum: -6,
    		megaStone: { "Baxcalibur-Soulstones": "Baxcalibur-Soulstones-Mega" },
    		itemUser: ["Baxcalibur-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Baxcalibur-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	twiggnite: {
    		name: "T.Wiggnite",
    		spritenum: -6,
    		megaStone: { "T.Wigglytuff": "T.Wigglytuff-Mega" },
    		itemUser: ["T.Wigglytuff"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Wigglytuff, this item allows it to Mega Evolve in battle.",
    	},
		
	eelektrossites: {
    		name: "Eelektrossite-S",
    		spritenum: -6,
    		megaStone: { "Eelektross-Soulstones": "Eelektross-Soulstones-Mega" },
    		itemUser: ["Eelektross-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Eelektross-Soulstones, this item allows it to Mega Evolve in battle.",
    	},
	normalshield: {
		name: "Normal Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Normal' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Normal-type attack.",
	},
	fireshield: {
		name: "Fire Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Fire-type attack.",
	},
	watershield: {
		name: "Water Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Water-type attack.",
	},
	grassshield: {
		name: "Grass Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Grass-type attack.",
	},
	electricshield: {
		name: "Electric Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Electric-type attack.",
	},
	iceshield: {
		name: "Ice Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Ice-type attack.",
	},
	poisonshield: {
		name: "Poison Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Poison-type attack.",
	},
	fightingshield: {
		name: "Fighting Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Fighting-type attack.",
	},
	groundshield: {
		name: "Ground Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Ground-type attack.",
	},
	flyingshield: {
		name: "Flying Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Flying-type attack.",
	},
	psychicshield: {
		name: "Psychic Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Psychic-type attack.",
	},
	bugshield: {
		name: "Bug Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Bug-type attack.",
	},
	rockshield: {
		name: "Rock Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Rock-type attack.",
	},
	ghostshield: {
		name: "Ghost Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Ghost-type attack.",
	},
	dragonshield: {
		name: "Dragon Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Dragon-type attack.",
	},
	steelshield: {
		name: "Steel Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Steel-type attack.",
	},
	darkshield: {
		name: "Dark",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Dark-type attack.",
	},
	fairyshield: {
		name: "Fairy Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Fairy-type attack.",
	},
	cosmicshield: {
		name: "Cosmic Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Cosmic' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Cosmic-type attack.",
	},
	lightshield: {
		name: "Light Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Light' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Light-type attack.",
	},
	soundshield: {
		name: "Sound Shield",
		spritenum: -6,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Sound' && target.getMoveHitData(move).typeMod > 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					return this.chainModify(0.5);
				}
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Halves damage taken from a supereffective Sound-type attack.",
	},
	frostorb: {
		name: "Frost Orb",
		spritenum: -6,
		fling: {
			basePower: 30,
			status: 'frb',
		},
		onResidualOrder: 28,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			pokemon.trySetStatus('frb', pokemon);
		},
		num: 0,
		gen: 9,
		shortDesc: "At the end of every turn, this item attempts to frostbite the holder.",
	},
	hivisjacked: {
		name: "Hi-Vis Jacket",
		spritenum: -6,
		fling: {
			basePower: 60,
		},
		onDamagingHitOrder: 2,
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Special') {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "If holder is hit by a Special move, the attacker loses 1/8 of its max HP.",
	},
	normalsword: {
		name: "Normal Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Normal' && type === 'Dragon') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Normal-type moves hit Dragon for supereffective.",
	},
	firesword: {
		name: "Fire Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Fire' && type === 'Dark') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Fire-type moves hit Dark for supereffective.",
	},
	watersword: {
		name: "Water Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Water' && type === 'Cosmic') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Water-type moves hit Cosmic for supereffective.",
	},
	grasssword: {
		name: "Grass Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Grass' && type === 'Fairy') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Grass-type moves hit Fairy for supereffective.",
	},
	electricsword: {
		name: "Electric Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Electric' && type === 'Psychic') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Electric-type moves hit Psychic for supereffective.",
	},
	icesword: {
		name: "Ice Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Ice' && type === 'Bug') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Ice-type moves hit Bug for supereffective.",
	},
	poisonsword: {
		name: "Poison Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Poison' && type === 'Fighting') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Poison-type moves hit Fighting for supereffective.",
	},
	fightingsword: {
		name: "Fighting Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Fighting' && type === 'Fire') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Fighting-type moves hit Fire for supereffective.",
	},
	groundsword: {
		name: "Ground Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Ground' && type === 'Sound') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Ground-type moves hit Sound for supereffective.",
	},
	flyingsword: {
		name: "Flying Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Flying' && type === 'Ghost') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Flying-type moves hit Ghost for supereffective.",
	},
	psychicsword: {
		name: "Psychic Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Psychic' && type === 'Normal') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Psychic-type moves hit Normal for supereffective.",
	},
	bugsword: {
		name: "Bug Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Bug' && type === 'Electric') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Bug-type moves hit Electric for supereffective.",
	},
	rocksword: {
		name: "Rock Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Rock' && type === 'Light') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Rock-type moves hit Light for supereffective.",
	},
	ghostsword: {
		name: "Ghost Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Ghost' && type === 'Steel') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Ghost-type moves hit Steel for supereffective.",
	},
	dragonsword: {
		name: "Dragon Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Dragon' && type === 'Flying') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Dragon-type moves hit Flying for supereffective.",
	},
	steelsword: {
		name: "Steel Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Steel' && type === 'Poison') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Steel-type moves hit Poison for supereffective.",
	},
	darksword: {
		name: "Dark Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Dark' && type === 'Grass') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Dark-type moves hit Grass for supereffective.",
	},
	fairysword: {
		name: "Fairy Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Fairy' && type === 'Water') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's NoFairyrmal-type moves hit Water for supereffective.",
	},
	cosmicsword: {
		name: "Cosmic Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Cosmic' && type === 'Ground') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Cosmic-type moves hit Ground for supereffective.",
	},
	lightsword: {
		name: "Light Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Light' && type === 'Ice') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Light-type moves hit Ice for supereffective.",
	},
	soundsword: {
		name: "Sound Sword",
		spritenum: -6,
		fling: {
			basePower: 130,
		},
		onFoeEffectiveness(typeMod, target, type, move) {
			if (move.type === 'Sound' && type === 'Rock') return 1;
		},
		num: 0,
		gen: 9,
		shortDesc: "User's Sound-type moves hit Rock for supereffective.",
	},
};
