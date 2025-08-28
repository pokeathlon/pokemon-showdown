import { Utils } from '../../../lib';
import { Items as Base } from '../../items';
import { Items as Parent} from '../gen9infinitefusion/items';

export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	...Utils.deepClone(Parent),

	// Legalize Gems
	buggem: {inherit: true, isNonstandard: null},
	darkgem: {inherit: true, isNonstandard: null},
	dragongem: {inherit: true, isNonstandard: null},
	electricgem: {inherit: true, isNonstandard: null},
	fairygem: {inherit: true, isNonstandard: null},
	fightinggem: {inherit: true, isNonstandard: null},
	firegem: {inherit: true, isNonstandard: null},
	flyinggem: {inherit: true, isNonstandard: null},
	ghostgem: {inherit: true, isNonstandard: null},
	grassgem: {inherit: true, isNonstandard: null},
	groundgem: {inherit: true, isNonstandard: null},
	icegem: {inherit: true, isNonstandard: null},
	poisongem: {inherit: true, isNonstandard: null},
	psychicgem: {inherit: true, isNonstandard: null},
	rockgem: {inherit: true, isNonstandard: null},
	steelgem: {inherit: true, isNonstandard: null},
	watergem: {inherit: true, isNonstandard: null},

	// SE Berries
	babiriberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Steel' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	chartiberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Rock' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	chopleberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fighting' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	cobaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Flying' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	colburberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dark' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	habanberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Dragon' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	kasibberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ghost' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	kebiaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	occaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fire' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	passhoberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	payapaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Pyschic' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	rindoberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	roseliberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	shucaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ground' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	tangaberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	wacanberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},
	yacheberry: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Ice' && target.getMoveHitData(move).typeMod >= 0) {
				const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
				if (hitSub) return;

				if (target.eatItem()) {
					this.debug('-50% reduction');
					this.add('-enditem', target, this.effect, '[weaken]');
					return this.chainModify(0.5);
				}
			}
		},
	},

	// Arceus Plates
	dracoplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	dreadplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	earthplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	fistplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	flameplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	icicleplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	insectplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	ironplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	meadowplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	mindplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	pixieplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	skyplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	splashplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	spookyplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	stoneplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	toxicplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	zapplate: {
		inherit: true,
		onTakeItem(item, pokemon, source) {
			if ((source && source.baseSpecies.num === 315) || pokemon.baseSpecies.num === 315) {
				return false;
			} if ((source && this.dex.species.get(source.fusion).num === 315) || this.dex.species.get(pokemon.fusion).num === 315) {
				return false;
			}
			return true;
		},
	},
	
	griseousorb: {
		inherit: true,
		forcedForme: null,
	},
};
