export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	// Current items that do not exist

	// Past items that are now legal
	
	// New items 
	
	assaultvest: {
		name: "Assault Vest",
		spritenum: -3,
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
	paddedhelmet: {
		name: "Padded Helmet",
		spritenum: -3,
		onModifyMovePriority: 1,
		onModifyMove(move) {
			if (move.recoil) move.recoil = undefined;
		},
		num: 0,
		desc: "Holder does not take recoil damage.",
	},
	cosmicgem: {
		name: "Cosmic Gem",
		spritenum: -3,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Cosmic' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder's first successful Cosmic-type attack will have 1.3x power. Single use.",
	},
	soundgem: {
		name: "Sound Gem",
		spritenum: -3,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Sound' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder's first successful Sound-type attack will have 1.3x power. Single use.",
	},
	lightgem: {
		name: "Light Gem",
		spritenum: -3,
		isGem: true,
		onSourceTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (move.type === 'Light' && source.useItem()) {
				source.addVolatile('gem');
			}
		},
		num: 0,
		gen: 9,
		shortDesc: "Holder's first successful Light-type attack will have 1.3x power. Single use.",
	},
	sharpcoral: { // ASK - item desc says it "boosts", is that x1.5 or x2
		name: "Sharp Coral",
		spritenum: -3,
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
		spritenum: -3,
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
		spritenum: -3,
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
		spritenum: -3,
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
		spritenum: -3,
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
		spritenum: -3,
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

	// Mega stones
	gengarites: {
    		name: "Gengarite-S",
    		spritenum: -3,
    		megaStone: { "Gengar-Soulstones": "Gengar-Soulstones-Mega" },
    		itemUser: ["Gengar-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gengar-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	dodrinite: {
    		name: "Dodrinite",
    		spritenum: -3,
    		megaStone: { "Dodrio-Soulstones": "Dodrio-Soulstones-Mega" },
    		itemUser: ["Dodrio-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Dodrio-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	arbokinite: {
    		name: "Arbokinite",
    		spritenum: -3,
    		megaStone: { "Arbok-Soulstones": "Arbok-Soulstones-Mega" },
    		itemUser: ["Arbok-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Arbok-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	starmite: {
    		name: "Starmite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Steelix-Soulstones": "Steelix-Soulstones-Mega" },
    		itemUser: ["Steelix-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Steelix-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	xatunite: {
    		name: "Xatunite",
    		spritenum: -3,
    		megaStone: { "Xatu-Soulstones": "Xatu-Soulstones-Mega" },
    		itemUser: ["Xatu-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Xatu-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	seismitoadite: {
    		name: "Seismitoadite",
    		spritenum: -3,
    		megaStone: { "Seismitoad-Soulstones": "Seismitoad-Soulstones-Mega" },
    		itemUser: ["Seismitoad-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Seismitoad-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	golite: {
    		name: "Golite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Gyarados-Soulstones": "Gyarados-Soulstones-Mega" },
    		itemUser: ["Gyarados-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gyarados-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	avaluggite: {
    		name: "Avaluggite",
    		spritenum: -3,
    		megaStone: { "Avalugg-Soulstones": "Avalugg-Soulstones-Mega" },
    		itemUser: ["Avalugg-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Avalugg-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	rapidashinite: {
    		name: "Rapidashinite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Aerodactyl-Soulstones": "Aerodactyl-Soulstones-Mega" },
    		itemUser: ["Aerodactyl-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Aerodactyl-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	giganite: {
    		name: "Giganite",
    		spritenum: -3,
    		megaStone: { "Gigalith-Soulstones": "Gigalith-Soulstones-Mega" },
    		itemUser: ["Gigalith-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gigalith-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	gliscite: {
    		name: "Gliscite",
    		spritenum: -3,
    		megaStone: { "Gliscor-Soulstones": "Gliscor-Soulstones-Mega" },
    		itemUser: ["Gliscor-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gliscor-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	sudowoodites: {
    		name: "Sudowoodite-S",
    		spritenum: -3,
    		megaStone: { "Sudowoodo-Soulstones": "Sudowoodo-Soulstones-Mega" },
    		itemUser: ["Sudowoodo-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Sudowoodo-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	noctowlite: {
    		name: "Noctowlite",
    		spritenum: -3,
    		megaStone: { "Noctowl-Soulstones": "Noctowl-Soulstones-Mega" },
    		itemUser: ["Noctowl-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Noctowl-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	electronite: {
    		name: "Electronite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Beedrill-Soulstones": "Beedrill-Soulstones-Mega" },
    		itemUser: ["Beedrill-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Beedrill-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	machampite: {
    		name: "Machampite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Sharpedo-Soulstones": "Sharpedo-Soulstones-Mega" },
    		itemUser: ["Sharpedo-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Sharpedo-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	chandelite: {
    		name: "Chandelite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Froslass-Soulstones": "Froslass-Soulstones-Mega" },
    		itemUser: ["Froslass-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Froslass-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	infernapinite: {
    		name: "Infernapinite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Sableye-Soulstones": "Sableye-Soulstones-Mega" },
    		itemUser: ["Sableye-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Sableye-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	bearticite: {
    		name: "Bearticite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Tyranitar-Soulstones": "Tyranitar-Soulstones-Mega" },
    		itemUser: ["Tyranitar-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Tyranitar-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	hippowdonite: {
    		name: "Hippowdonite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Heracross-Soulstones": "Heracross-Soulstones-Mega" },
    		itemUser: ["Heracross-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Heracross-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	sawsbuckite: {
    		name: "Sawsbuckite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Aggron-Soulstones": "Aggron-Soulstones-Mega" },
    		itemUser: ["Aggron-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Aggron-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	slowkingite: {
    		name: "Slowkingite",
    		spritenum: -3,
    		megaStone: { "Slowking-Soulstones": "Slowking-Soulstones-Mega" },
    		itemUser: ["Slowking-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Slowking-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	corvinite: {
    		name: "Corvinite",
    		spritenum: -3,
    		megaStone: { "Corviknight-Soulstones": "Corviknight-Soulstones-Mega" },
    		itemUser: ["Corviknight-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Corviknight-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	kingdranite: {
    		name: "Kingdranite",
    		spritenum: -3,
    		megaStone: { "Kingdra-Soulstones": "Kingdra-Soulstones-Mega" },
    		itemUser: ["Kingdra-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Kingdra-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	butterfrite: {
    		name: "Butterfrite",
    		spritenum: -3,
    		megaStone: { "Butterfree-Soulstones": "Butterfree-Soulstones-Mega" },
    		itemUser: ["Butterfree-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Butterfree-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	furretite: {
    		name: "Furretite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Gallade-Soulstones": "Gallade-Soulstones-Mega" },
    		itemUser: ["Gallade-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Gallade-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	dugtrioite: {
    		name: "Dugtrioite",
    		spritenum: -3,
    		megaStone: { "Dugtrio-Soulstones": "Dugtrio-Soulstones-Mega" },
    		itemUser: ["Dugtrio-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Dugtrio-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	azumarillite: {
    		name: "Azumarillite",
    		spritenum: -3,
    		megaStone: { "Azumarill-Soulstones": "Azumarill-Soulstones-Mega" },
    		itemUser: ["Azumarill-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Azumarill-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	meloettite: {
    		name: "Meloettite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Pidgeot-Soulstones": "Pidgeot-Soulstones-Mega" },
    		itemUser: ["Pidgeot-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Pidgeot-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	blissite: {
    		name: "Blissite",
    		spritenum: -3,
    		megaStone: { "Blissey-Soulstones": "Blissey-Soulstones-Mega" },
    		itemUser: ["Blissey-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Blissey-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	tentacruelite: {
    		name: "Tentacruelite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Tsareena-Soulstones": "Tsareena-Soulstones-Mega-Y" },
    		itemUser: ["Tsareena-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Tsareena-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	beheeyemite: {
    		name: "Beheeyemite",
    		spritenum: -3,
    		megaStone: { "Beheeyem-Soulstones": "Beheeyem-Soulstones-Mega" },
    		itemUser: ["Beheeyem-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Beheeyem-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	sandaconite: {
    		name: "Sandaconite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Raichu-Soulstones": "Raichu-Soulstones-Mega" },
    		itemUser: ["Raichu-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Raichu-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	cofagrinite: {
    		name: "Cofagrinite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Swampert-Soulstones": "Swampert-Soulstones-Mega" },
    		itemUser: ["Swampert-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Swampert-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	gothitellite: {
    		name: "Gothitellite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Charizard-Soulstones": "Charizard-Soulstones-Mega" },
    		itemUser: ["Charizard-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Charizard-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	wiggnite: {
    		name: "Wiggnite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Manectric-Soulstones": "Manectric-Soulstones-Mega" },
    		itemUser: ["Manectric-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Manectric-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	mamoswinite: {
    		name: "Mamoswinite",
    		spritenum: -3,
    		megaStone: { "Mamoswine-Soulstones": "Mamoswine-Soulstones-Mega" },
    		itemUser: ["Mamoswine-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Mamoswine-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	torterranite: {
    		name: "Torterranite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Garchomp-Soulstones": "Garchomp-Soulstones-Mega" },
    		itemUser: ["Garchomp-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Garchomp-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	ninetalite: {
    		name: "Ninetalite",
    		spritenum: -3,
    		megaStone: { "Ninetales-Soulstones": "Ninetales-Soulstones-Mega" },
    		itemUser: ["Ninetales-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Ninetales-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	toxtricite: {
    		name: "Toxtricite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "T.Dugtrio": "T.Dugtrio-Mega" },
    		itemUser: ["T.Dugtrio"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Dugtrio, this item allows it to Mega Evolve in battle.",
    	},

	luvdiscite: {
    		name: "Luvdiscite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "T.Sableye": "T.Sableye-Mega" },
    		itemUser: ["T.Sableye"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Sableye, this item allows it to Mega Evolve in battle.",
    	},

	garbodinite: {
    		name: "Garbodinite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "T.Masquerain": "T.Masquerain-Mega" },
    		itemUser: ["T.Masquerain"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Masquerain, this item allows it to Mega Evolve in battle.",
    	},

	barbaraclite: {
    		name: "Barbaraclite",
    		spritenum: -3,
    		megaStone: { "Barbaracle-Soulstones": "Barbaracle-Soulstones-Mega" },
    		itemUser: ["Barbaracle-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Barbaracle-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	falinkite: {
    		name: "Falinkite",
    		spritenum: -3,
    		megaStone: { "Falinks-Soulstones": "Falinks-Soulstones-Mega" },
    		itemUser: ["Falinks-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Falinks-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	mismagite: {
    		name: "Mismagite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Scizor-Soulstones": "Scizor-Soulstones-Mega" },
    		itemUser: ["Scizor-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Scizor-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	coalossalite: {
    		name: "Coalossalite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "T.Gigalith": "T.Gigalith-Mega" },
    		itemUser: ["T.Gigalith"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Gigalith, this item allows it to Mega Evolve in battle.",
    	},

	dragite: {
    		name: "Dragite",
    		spritenum: -3,
    		megaStone: { "Dragonite-Soulstones": "Dragonite-Soulstones-Mega" },
    		itemUser: ["Dragonite-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Dragonite-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	dragapultite: {
    		name: "Dragapultite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Houndoom-Soulstones": "Houndoom-Soulstones-Mega" },
    		itemUser: ["Houndoom-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Houndoom-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	empoleonite: {
    		name: "Empoleonite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "T.Jumpluff": "T.Jumpluff-Mega" },
    		itemUser: ["T.Jumpluff"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Jumpluff, this item allows it to Mega Evolve in battle.",
    	},

	exploudinite: {
    		name: "Exploudinite",
    		spritenum: -3,
    		megaStone: { "Exploud-Soulstones": "Exploud-Soulstones-Mega" },
    		itemUser: ["Exploud-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Exploud-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	centiskorite: {
    		name: "Centiskorite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Salamence-Soulstones": "Salamence-Soulstones-Mega" },
    		itemUser: ["Salamence-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Salamence-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	grapploctite: {
    		name: "Grapploctite",
    		spritenum: -3,
    		megaStone: { "Grapploct-Soulstones": "Grapploct-Soulstones-Mega" },
    		itemUser: ["Grapploct-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Grapploct-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	hatterenite: {
    		name: "Hatterenite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "T.Wyrdeer": "T.Wyrdeer-Mega" },
    		itemUser: ["T.Wyrdeer"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Wyrdeer, this item allows it to Mega Evolve in battle.",
    	},

	ursalunite: {
    		name: "Ursalunite",
    		spritenum: -3,
    		megaStone: { "Ursaluna-Soulstones": "Ursaluna-Soulstones-Mega" },
    		itemUser: ["Ursaluna-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a URsaluna-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	emolgite: {
    		name: "Emolgite",
    		spritenum: -3,
    		megaStone: { "Emolga-Soulstones": "Emolga-Soulstones-Mega" },
    		itemUser: ["Emolga-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Emolga-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	vespiquenite: {
    		name: "Vespiquenite",
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "Blaziken-Soulstones": "Blaziken-Soulstones-Mega" },
    		itemUser: ["Blaziken-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Blaziken-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	garganaclite: {
    		name: "Garganaclite",
    		spritenum: -3,
    		megaStone: { "Garganacl-Soulstones": "Garganacl-Soulstones-Mega" },
    		itemUser: ["Garganacl-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Garganacl-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	wobbnite: {
    		name: "Wobbnite",
    		spritenum: -3,
    		megaStone: { "Wobbuffet-Soulstones": "Wobbuffet-Soulstones-Mega" },
    		itemUser: ["Wobbuffet-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Wobbuffet-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	plusite: {
    		name: "Plusite",
    		spritenum: -3,
    		megaStone: { "Plusle-Soulstones": "Plusle-Soulstones-Mega" },
    		itemUser: ["Plusle-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Plusle-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	minunite: {
    		name: "Minunite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "T.Ursaluna": "T.Ursaluna-Mega" },
    		itemUser: ["T.Ursaluna"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Ursaluna, this item allows it to Mega Evolve in battle.",
    	},

	drednite: {
    		name: "Drednite",
    		spritenum: -3,
    		megaStone: { "Drednaw-Soulstones": "Drednaw-Soulstones-Mega" },
    		itemUser: ["Drednaw-Soulstones"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a Drednaw-Soulstones, this item allows it to Mega Evolve in battle.",
    	},

	melmetalite: {
    		name: "Melmetalite",
    		spritenum: -3,
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
    		spritenum: -3,
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
    		spritenum: -3,
    		megaStone: { "T.Charizard": "T.Charizard-Mega" },
    		itemUser: ["T.Charizard"],
    		onTakeItem(item, source) {
    			return !item.megaStone?.[source.baseSpecies.baseSpecies];
    		},
    		num: 0,
    		gen: 9,
			shortDesc: "If held by a T.Charizard, this item allows it to Mega Evolve in battle.",
    	},
};
