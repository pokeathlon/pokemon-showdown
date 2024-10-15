export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Modded
	deepseascale: {
		inherit: true,
		onModifySpD(spd, pokemon) {
			if (['Clamperl', 'Clamperl-Delta'].includes(pokemon.baseSpecies.name)) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl", "Clamperl-Delta"],
	},
	deepseatooth: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			if (['Clamperl', 'Clamperl-Delta'].includes(pokemon.baseSpecies.name)) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Clamperl", "Clamperl-Delta"],
	},
	lightball: {
		inherit: true,
		onModifyAtk(atk, pokemon) {
			if (['Pikachu', 'Pikachu-Delta'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		onModifySpA(spa, pokemon) {
			if (['Pikachu', 'Pikachu-Delta'].includes(pokemon.baseSpecies.baseSpecies)) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Pikachu", "Pikachu-Cosplay", "Pikachu-Rock-Star", "Pikachu-Belle", "Pikachu-Pop-Star", "Pikachu-PhD", "Pikachu-Libre", "Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner", "Pikachu-Starter", "Pikachu-World", "Pikachu-Delta"],
	},
	metalpowder: {
		inherit: true,
		onModifyDef(def, pokemon) {
			if (['Ditto', 'Ditto-Delta'].includes(pokemon.species.name) && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Ditto", "Ditto-Delta"],
	},
	quickpowder: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (['Ditto', 'Ditto-Delta'].includes(pokemon.species.name) && !pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		itemUser: ["Ditto", "Ditto-Delta"],
	},

	// Additions
	trickrock: {
		name: "Trick Rock",
		desc: "Holder's use of Trick Room lasts 8 turns instead of 5.",
		spritenum: -1,
		fling: {
			basePower: 60,
		},
		num: 0,
	},
	darkrock: {
		name: "Dark Rock",
		desc: "Holder's use of New Moon lasts 8 turns instead of 5.",
		spritenum: -1,
		fling: {
			basePower: 60,
		},
		num: 0,
	},
	crystalpiece: {
		name: "Crystal Piece",
		desc: "If held by Giratina/Arceus/Regigigas, this item triggers its Primal Reversion.",
		spritenum: -1,
		itemUser: ["Arceus", "Giratina", "Regigigas"],
		onSwitchIn(pokemon) {
			if (pokemon.isActive && ['Arceus', 'Giratina', 'Regigigas'].includes(pokemon.baseSpecies.name)) {
				this.queue.insertChoice({choice: 'runPrimal', pokemon: pokemon});
			}
		},
		onPrimal(pokemon) {
			if (['Arceus', 'Giratina', 'Regigigas'].includes(pokemon.baseSpecies.name)) {
				pokemon.formeChange(pokemon.baseSpecies.name + '-Primal', this.effect, true);
			}
		},
		onTakeItem(item, source) {
			return !['Arceus', 'Giratina', 'Regigigas'].includes(source.baseSpecies.baseSpecies);
		},
		num: 0,
	},
	crystalfragment: {
		name: "Crystal Fragment",
		desc: "If held by a Delta Metagross Ruin, this item allows it to Crystallize in battle.",
		spritenum: -1,
		megaStone: "Metagross-Delta-Ruin-Crystal",
		megaEvolves: "Metagross-Delta-Ruin",
		itemUser: ["Metagross-Delta-Ruin"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	flygonarmor: {
		name: "Flygon Armor",
		desc: "If held by a Flygon, this item changes its forme to Armored.",
		spritenum: -1,
		onTakeItem(item, pokemon, source) {
			return !((source && source.baseSpecies.baseSpecies === 'Flygon') || pokemon.baseSpecies.baseSpecies === 'Flygon');
		},
		forcedForme: "Flygon-Armor",
		itemUser: ["Flygon-Armor"],
		num: 0,
	},
	leavannyarmor: {
		name: "Leavanny Armor",
		desc: "If held by a Leavanny, this item changes its forme to Armored.",
		spritenum: -1,
		onTakeItem(item, pokemon, source) {
			return !((source && source.baseSpecies.baseSpecies === 'Leavanny') || pokemon.baseSpecies.baseSpecies === 'Leavanny');
		},
		forcedForme: "Leavanny-Armor",
		itemUser: ["Leavanny-Armor"],
		num: 0,
	},
	mewtwoarmor: {
		name: "Mewtwo Armor",
		desc: "If held by a Mewtwo, this item changes its forme to Armored.",
		spritenum: -1,
		onTakeItem(item, pokemon, source) {
			return !((source && source.baseSpecies.baseSpecies === 'Mewtwo') || pokemon.baseSpecies.baseSpecies === 'Mewtwo');
		},
		forcedForme: "Mewtwo-Armor",
		itemUser: ["Mewtwo-Armor"],
		num: 0,
	},
	tyranitararmor: {
		name: "Tyranitar Armor",
		desc: "If held by a Tyranitar, this item changes its forme to Armored.",
		spritenum: -1,
		onTakeItem(item, pokemon, source) {
			return !((source && source.baseSpecies.baseSpecies === 'Tyranitar') || pokemon.baseSpecies.baseSpecies === 'Tyranitar');
		},
		forcedForme: "Tyranitar-Armor",
		itemUser: ["Tyranitar-Armor"],
		num: 0,
	},
	volcaronadeltaarmor: {
		name: "Volcarona-Delta Armor",
		desc: "If held by a Volcarona-Delta, this item changes its forme to Armored.",
		spritenum: -1,
		onTakeItem(item, pokemon, source) {
			return !((source && source.baseSpecies.baseSpecies === 'Volcarona-Delta') || pokemon.baseSpecies.baseSpecies === 'Volcarona-Delta');
		},
		forcedForme: "Volcarona-Delta-Armor",
		itemUser: ["Volcarona-Delta-Armor"],
		num: 0,
	},
	zekromarmor: {
		name: "Zekrom Armor",
		desc: "If held by a Zekrom, this item changes its forme to Armored.",
		spritenum: -1,
		onTakeItem(item, pokemon, source) {
			return !((source && source.baseSpecies.baseSpecies === 'Zekrom') || pokemon.baseSpecies.baseSpecies === 'Zekrom');
		},
		forcedForme: "Zekrom-Armor",
		itemUser: ["Zekrom-Armor"],
		num: 0,
	},

	// Mega Stones
	poliwrathite: {
		name: "Poliwrathite",
		desc: "If held by a Poliwrath, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Poliwrath-Mega",
		megaEvolves: "Poliwrath",
		itemUser: ["Poliwrath"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	marowakite: {
		name: "Marowakite",
		desc: "If held by a Marowak, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Marowak-Mega",
		megaEvolves: "Marowak",
		itemUser: ["Marowak"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	eevite: {
		name: "Eevite",
		desc: "If held by a Eevee, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Eevee-Mega",
		megaEvolves: "Eevee",
		itemUser: ["Eevee"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			if (source.species.name === 'Vaporeon' || 
				source.species.name === 'Jolteon' ||
				source.species.name === 'Flareon' ||
				source.species.name === 'Umbreon' ||
				source.species.name === 'Espeon' ||
				source.species.name === 'Glaceon' ||
				source.species.name === 'Leafeon' ||
				source.species.name === 'Sylveon') return false;
			return true;
		},
		num: 0,
	},
	meganiumite: {
		name: "Meganiumite",
		desc: "If held by a Meganium, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Meganium-Mega",
		megaEvolves: "Meganium",
		itemUser: ["Meganium"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	typhlosionite: {
		name: "Typhlosionite",
		desc: "If held by a Typhlosion, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Typhlosion-Mega",
		megaEvolves: "Typhlosion",
		itemUser: ["Typhlosion"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	feraligatite: {
		name: "Feraligatite",
		desc: "If held by a Feraligatr, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Feraligatr-Mega",
		megaEvolves: "Feraligatr",
		itemUser: ["Feraligatr"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	sudowoodite: {
		name: "Sudowoodite",
		desc: "If held by a Sudowoodo, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Sudowoodo-Mega",
		megaEvolves: "Sudowoodo",
		itemUser: ["Sudowoodo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	politoedite: {
		name: "Politoedite",
		desc: "If held by a Politoed, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Politoed-Mega",
		megaEvolves: "Politoed",
		itemUser: ["Politoed"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	sunflorite: {
		name: "Sunflorite",
		desc: "If held by a Sunflora, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Sunflora-Mega-M",
		megaEvolves: "Sunflora",
		itemUser: ["Sunflora"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	etigirafarigite: {
		name: "Etigirafarigite",
		desc: "If held by a Girafarig, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Girafarig-Mega",
		megaEvolves: "Girafarig",
		itemUser: ["Girafarig"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	magcargonite: {
		name: "Magcargonite",
		desc: "If held by a Magcargo, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Magcargo-Mega",
		megaEvolves: "Magcargo",
		itemUser: ["Magcargo"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	donphanite: {
		name: "Donphanite",
		desc: "If held by a Donphan, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Donphan-Mega",
		megaEvolves: "Donphan",
		itemUser: ["Donphan"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	miltankite: {
		name: "Miltankite",
		desc: "If held by a Miltank, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Miltank-Mega",
		megaEvolves: "Miltank",
		itemUser: ["Miltank"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	shiftrite: {
		name: "Shiftrite",
		desc: "If held by a Shiftry, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Shiftry-Mega",
		megaEvolves: "Shiftry",
		itemUser: ["Shiftry"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	flygonite: {
		name: "Flygonite",
		desc: "If held by a Flygon, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Flygon-Mega",
		megaEvolves: "Flygon",
		itemUser: ["Flygon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	cacturnite: {
		name: "Cacturnite",
		desc: "If held by a Cacturne, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Cacturne-Mega",
		megaEvolves: "Cacturne",
		itemUser: ["Cacturne"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	crawdauntite: {
		name: "Crawdauntite",
		desc: "If held by a Crawdaunt, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Crawdaunt-Mega",
		megaEvolves: "Crawdaunt",
		itemUser: ["Crawdaunt"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	milotite: {
		name: "Milotite",
		desc: "If held by a Milotic, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Milotic-Mega",
		megaEvolves: "Milotic",
		itemUser: ["Milotic"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	jirachite: {
		name: "Jirachite",
		desc: "If held by a Jirachi, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Jirachi-Mega",
		megaEvolves: "Jirachi",
		itemUser: ["Jirachi"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	chatotite: {
		name: "Chatotite",
		desc: "If held by a Chatot, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Chatot-Mega",
		megaEvolves: "Chatot",
		itemUser: ["Chatot"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	spiritombite: {
		name: "Spiritombite",
		desc: "If held by a Spiritomb, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Spiritomb-Mega",
		megaEvolves: "Spiritomb",
		itemUser: ["Spiritomb"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	froslassite: {
		name: "Froslassite",
		desc: "If held by a Froslass, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Froslass-Mega",
		megaEvolves: "Froslass",
		itemUser: ["Froslass"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	zebstrikite: {
		name: "Zebstrikite",
		desc: "If held by a Zebstrika, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Zebstrika-Mega",
		megaEvolves: "Zebstrika",
		itemUser: ["Zebstrika"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	zoronite: {
		name: "Zoronite",
		desc: "If held by a Zoroark, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Zoroark-Mega",
		megaEvolves: "Zoroark",
		itemUser: ["Zoroark"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	gothitite: {
		name: "Gothitite",
		desc: "If held by a Gothitelle, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Gothitelle-Mega",
		megaEvolves: "Gothitelle",
		itemUser: ["Gothitelle"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	reuniclite: {
		name: "Reuniclite",
		desc: "If held by a Reuniclus, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Reuniclus-Mega",
		megaEvolves: "Reuniclus",
		itemUser: ["Reuniclus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	haxorite: {
		name: "Haxorite",
		desc: "If held by a Haxorus, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Haxorus-Mega",
		megaEvolves: "Haxorus",
		itemUser: ["Haxorus"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	cryogonalite: {
		name: "Cryogonalite",
		desc: "If held by a Cryogonal, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Cryogonal-Mega",
		megaEvolves: "Cryogonal",
		itemUser: ["Cryogonal"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	stunfiskite: {
		name: "Stunfiskite",
		desc: "If held by a Stunfisk, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Stunfisk-Mega",
		megaEvolves: "Stunfisk",
		itemUser: ["Stunfisk"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	bisharpite: {
		name: "Bisharpite",
		desc: "If held by a Bisharp, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Bisharp-Mega",
		megaEvolves: "Bisharp",
		itemUser: ["Bisharp"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	hydreigonite: {
		name: "Hydreigonite",
		desc: "If held by a Hydreigon, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Hydreigon-Mega",
		megaEvolves: "Hydreigon",
		itemUser: ["Hydreigon"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltavenusaurite: {
		name: "Delta Venusaurite",
		desc: "If held by a Delta Venusaur, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Venusaur-Delta-Mega",
		megaEvolves: "Venusaur-Delta",
		itemUser: ["Venusaur-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltacharizardite: {
		name: "Delta Charizardite",
		desc: "If held by a Delta Charizard, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Charizard-Delta-Mega",
		megaEvolves: "Charizard-Delta",
		itemUser: ["Charizard-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltablastoisinite: {
		name: "Delta Blastoisinite",
		desc: "If held by a Delta Blastoise, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Blastoise-Delta-Mega",
		megaEvolves: "Blastoise-Delta",
		itemUser: ["Blastoise-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltabisharpite: {
		name: "Delta Bisharpite",
		desc: "If held by a Delta Bisharp, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Bisharp-Delta-Mega",
		megaEvolves: "Bisharp-Delta",
		itemUser: ["Bisharp-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltagardevoirite: {
		name: "Delta Gardevoirite",
		desc: "If held by a Delta Gardevoir, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Gardevoir-Delta-Mega",
		megaEvolves: "Gardevoir-Delta",
		itemUser: ["Gardevoir-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltagalladite: {
		name: "Delta Galladite",
		desc: "If held by a Delta Gallade, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Gallade-Delta-Mega",
		megaEvolves: "Gallade-Delta",
		itemUser: ["Gallade-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltasunflorite: {
		name: "Delta Sunflorite",
		desc: "If held by a Delta Sunflora, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Sunflora-Delta-Mega",
		megaEvolves: "Sunflora-Delta",
		itemUser: ["Sunflora-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltascizorite: {
		name: "Delta Scizorite",
		desc: "If held by a Delta Scizor, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Scizor-Delta-Mega",
		megaEvolves: "Scizor-Delta",
		itemUser: ["Scizor-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltaglalitite: {
		name: "Delta Glalitite",
		desc: "If held by a Delta Glalie, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Glalie-Delta-Mega",
		megaEvolves: "Glalie-Delta",
		itemUser: ["Glalie-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltafroslassite: {
		name: "Delta Froslassite",
		desc: "If held by a Delta Froslass, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Froslass-Delta-Mega",
		megaEvolves: "Froslass-Delta",
		itemUser: ["Froslass-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltatyphlosionite: {
		name: "Delta Typhlosionite",
		desc: "If held by a Delta Typhlosion, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Typhlosion-Delta-Mega",
		megaEvolves: "Typhlosion-Delta",
		itemUser: ["Typhlosion-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltapidgeotite: {
		name: "Delta Pidgeotite",
		desc: "If held by a Delta Pidgeot, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Pidgeot-Delta-Mega",
		megaEvolves: "Pidgeot-Delta",
		itemUser: ["Pidgeot-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltaetigirafarigite: {
		name: "Delta Etigirafarigite",
		desc: "If held by a Delta Girafarig, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Girafarig-Delta-Mega",
		megaEvolves: "Girafarig-Delta",
		itemUser: ["Girafarig-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltasablenite: {
		name: "Delta Sablenite",
		desc: "If held by a Delta Sableye, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Sableye-Delta-Mega",
		megaEvolves: "Sableye-Delta",
		itemUser: ["Sableye-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltamawilite: {
		name: "Delta Mawilite",
		desc: "If held by a Delta Mawile, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Mawile-Delta-Mega",
		megaEvolves: "Mawile-Delta",
		itemUser: ["Mawile-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltamedichamite: {
		name: "Delta Medichamite",
		desc: "If held by a Delta Medicham, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Medicham-Delta-Mega",
		megaEvolves: "Medicham-Delta",
		itemUser: ["Medicham-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltacameruptite: {
		name: "Delta Cameruptite",
		desc: "If held by a Delta Camerupt, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Camerupt-Delta-Mega",
		megaEvolves: "Camerupt-Delta",
		itemUser: ["Camerupt-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltamilotite: {
		name: "Delta Milotite",
		desc: "If held by a Delta Milotic, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Milotic-Delta-Mega",
		megaEvolves: "Milotic-Delta",
		itemUser: ["Milotic-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltametagrossitespider: {
		name: "Delta Metagrossite (Spider)",
		desc: "If held by a Delta Metagross Spider, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Metagross-Delta-Spider-Mega",
		megaEvolves: "Metagross-Delta-Spider",
		itemUser: ["Metagross-Delta-Spider"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltametagrossiteruin: {
		name: "Delta Metagrossite (Ruin)",
		desc: "If held by a Delta Metagross Ruin, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Metagross-Delta-Ruin-Mega",
		megaEvolves: "Metagross-Delta-Ruin",
		itemUser: ["Metagross-Delta-Ruin"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltalopunnite: {
		name: "Delta Lopunnite",
		desc: "If held by a Delta Lopunny, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Lopunny-Delta-Mega",
		megaEvolves: "Lopunny-Delta",
		itemUser: ["Lopunny-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	deltalucarionite: {
		name: "Delta Lucarionite",
		desc: "If held by a Delta Lucario, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Lucario-Delta-Mega",
		megaEvolves: "Lucario-Delta",
		itemUser: ["Lucario-Delta"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	steelixitefire: {
		name: "Steelixite Fire",
		desc: "If held by a Steelix, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Steelix-Mega-F",
		megaEvolves: "Steelix",
		itemUser: ["Steelix"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
	shadowmewtwonitex: {
		name: "Shadow Mewtwonite X",
		desc: "If held by a Mewtwo-Shadow, this item allows it to Mega Evolve in battle.",
		spritenum: -1,
		megaStone: "Mewtwo-Shadow-Mega-X",
		megaEvolves: "Mewtwo-Shadow",
		itemUser: ["Mewtwo-Shadow"],
		onTakeItem(item, source) {
			if (item.megaEvolves === source.baseSpecies.baseSpecies) return false;
			return true;
		},
		num: 0,
	},
};
