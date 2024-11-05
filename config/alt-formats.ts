export const Formats: import('../sim/dex-formats').FormatList = [
	{
		section: "Infinite Fusion: Regional Dex",
	},
	{
		name: "[Gen 7] IF Random Battle",
		desc: `Randomized teams of Pok&eacute;mon with sets that are generated to be competitively viable.`,
		threads: [
			`&bullet; <a href="https://www.smogon.com/forums/threads/3712619/">Random Battle Suggestions</a>`,
		],

		mod: 'gen7infinitefusion',
		team: 'random',
		ruleset: [
			'Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod',
			'Infinite Fusion Mod',
		],
	},
	{
		name: "[Gen 7] IF Dex OU",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate',
			`- Drizzle ++ Swift Swim`,  `- Drought ++ Chlorophyll`, 'Greninja-Bond', 'Greninja-Ash', 
		],
	},
	{
		name: "[Gen 7] IF Dex UU",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber', 'OU', 'UUBL',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub', 'item:necrozium',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drought',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate',
			`- Drizzle ++ Swift Swim`, 'Greninja-Bond', 'Greninja-Ash', 
		],
	},
	{
		name: "[Gen 7] IF Dex AG",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen7infinitefusion',
		ruleset: [
			'Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Z-Move Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause',
		],
		banlist: ['Mega'],
	},

	{
		section: "Infinite Fusion: National Dex",
	},
	{
		name: "[Gen 9] IF National Dex OU",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen9infinitefusion',
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', '!Species Clause', 'Z-Move Clause', 'Ability Clause = 1',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'ND AG', 'ND Uber', 'Mega',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:hugepower', 'ability:purepower', 'ability:disguise', 'ability:moody', 'ability:contrary', 'ability:simple', 'ability:wonderguard', 'ability:arenatrap', 'ability:powerconstruct', 'ability:shadowtag', 'ability:speedboost', 'ability:imposter', 'ability:comatose', 'ability:triage', 'ability:waterbubble',
			'move:shellsmash', 'move:bellydrum', 'move:lastrespects', 'move:populationbomb', 'move:ragefist', 'move:assist', 'move:batonpass', 'move:shedtail', 'move:geomancy', 'move:doubleironbash', 'move:spore',
		],
	},
	{
		name: "[Gen 9] IF National Dex AG",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen9infinitefusion',
		ruleset: [
			'Standard NatDex',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
		banlist: [],
	},

	{
		section: "Infinite Fusion: Doubles",
	},
	{
		name: "[Gen 7] IF Dex Doubles OU",

		mod: 'gen7infinitefusion',
		gameType: 'doubles',
		ruleset: [
			'Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Evasion Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause',
		],
		banlist: [
			'DUber',
			'move:afteryou',
			'item:lightball', 'item:thickclub',
			'ability:wonderguard', 'ability:hugepower',
		],
	},
	{
		name: "[Gen 7] IF Dex Doubles AG",
		searchShow: false,

		mod: 'gen7infinitefusion',
		gameType: 'doubles',
		ruleset: [
			'Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause',
		],
	},
	{
		name: "[Gen 9] IF NatDex Doubles OU",

		mod: 'gen9infinitefusion',
		gameType: 'doubles',
		ruleset: [
			'Standard NatDex', 'Sleep Clause Mod', 'Evasion Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'Fusion Species Clause', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
		banlist: [
			'DUber', 'Mega',
			'ability:hugepower', 'ability:purepower', 'ability:commander', 'ability:swordofruin', 'ability:beadsofruin', 'ability:contrary', 'ability:wonderguard', 'ability:powerconstruct', 'ability:simple', 'ability:zerotohero',
			'move:geomancy', 'move:afteryou', 'move:clangoroussoul', 'move:lastrespects', 'move:bellydrum', 'move:shellsmash', 'move:ragefist',
		],
	},
	{
		name: "[Gen 9] IF NatDex Doubles AG",
		searchShow: false,

		mod: 'gen9infinitefusion',
		gameType: 'doubles',
		ruleset: [
			'Standard NatDex',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
	},

	{
		section: "Infinite Fusion: Extras",
	},
	{
		name: "[Gen 9] IF Free-for-all",

		mod: 'gen9infinitefusion',
		gameType: 'freeforall',
		rated: false,
		ruleset: [
			'Standard NatDex',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
	},
	{
		name: "[Gen 7] IF Dex Triples OU",

		mod: 'gen7infinitefusion',
		gameType: 'triples',
		ruleset: [
			'Obtainable', 'Team Preview', 'Sleep Clause Mod', 'Evasion Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause',
		],
		banlist: [
			'DUber',
			'move:afteryou', 'move:boomburst',
			'item:lightball', 'item:thickclub',
			'ability:wonderguard', 'ability:hugepower',
		],
	},
	{
		name: "[Gen 7] IF Dex Triples AG",
		searchShow: false,

		mod: 'gen7infinitefusion',
		gameType: 'triples',
		ruleset: [
			'Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause',
		],
	},
	{
		name: "[Gen 9] IF Custom Game",

		mod: 'gen9infinitefusion',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod'],
	},
	{
		name: "[Gen 7] IF Custom Game",

		mod: 'gen7infinitefusion',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod'],
	},

	{
		name: "[Gen 7] IF Dex Monogen",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",
		searchShow: false,
		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Force Monogen',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst',  `- Drizzle ++ Swift Swim`,  `- Drought ++ Chlorophyll`, 'Greninja-Bond', 'Greninja-Ash', 
		],
	},
	{
		name: "[Gen 7] IF Dex Big Boss",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",
		searchShow: false,
		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Big Boss Rule',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub', 'item:eviolite', 'item:necrozium',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst',  `- Drizzle ++ Swift Swim`,  `- Drought ++ Chlorophyll`, 'Greninja-Bond', 'Greninja-Ash', 
		],
	},
	{
		name: "[Gen 7] IF Dex Monotype",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",
		searchShow: false,
		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Fusion Same Type Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst',  `- Drizzle ++ Swift Swim`,  `- Drought ++ Chlorophyll`, 'Greninja-Bond', 'Greninja-Ash', 
		],
	},
	

	{
		section: "Fangames: Regional Dex",
		column: 2,
	},
	{
		name: "[Gen 6] Ins Random Battle",

		mod: 'gen6insurgence',
		team: 'random',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Illusion Level Mod'],
	},
	{
		name: "[Gen 6] Insurgence OU",

		mod: 'gen6insurgence',
		ruleset: ['Standard', 'Swagger Clause', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag',
			'item:souldew',
			'move:batonpass', 'move:permafrost', 'move:livewire',
		],
	},
	{
		name: "[Gen 6] Uranium OU",

		mod: 'gen6uranium',
		ruleset: ['Standard', 'Swagger Clause'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag',
			'item:souldew',
			'move:batonpass',
		],
	},
	{
		name: "[Gen 6] Insurgence AG",
		searchShow: false,

		mod: 'gen6insurgence',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves'],
	},
	{
		name: "[Gen 6] Uranium AG",
		searchShow: false,

		mod: 'gen6uranium',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'No Event Moves'],
	},

	{
		section: "Fangames: National Dex",
		column: 2,
	},
	{
		name: "[Gen 9] Insurgence NatDex OU",

		mod: 'gen9insurgence',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire',
		],
	},
	{
		name: "[Gen 9] Uranium NatDex OU",

		mod: 'gen9uranium',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'No Event Moves'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail',
		],
	},
	{
		name: "[Gen 9] Insurgence NatDex AG",
		searchShow: false,

		mod: 'gen9insurgence',
		ruleset: ['Standard NatDex', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves'],
	},
	{
		name: "[Gen 9] Uranium NatDex AG",
		searchShow: false,

		mod: 'gen9uranium',
		ruleset: ['Standard NatDex', 'No Event Moves'],
	},

	{
		section: "Fangames: Doubles",
		column: 2,
	},
	{
		name: "[Gen 6] Ins Dex Doubles AG",
		searchShow: false,

		mod: 'gen6insurgence',
		gameType: 'doubles',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves'],
	},
	{
		name: "[Gen 6] Ura Dex Doubles AG",
		searchShow: false,

		mod: 'gen6uranium',
		gameType: 'doubles',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'No Event Moves'],
	},
	{
		name: "[Gen 9] Ins NatDex Doubles AG",
		searchShow: false,

		mod: 'gen9insurgence',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves'],
	},
	{
		name: "[Gen 9] Ura NatDex Doubles AG",
		searchShow: false,

		mod: 'gen9uranium',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'No Event Moves'],
	},

	{
		section: "Fangames: Extras",
		column: 2,
	},
	{
		name: "[Gen 9] Ins Free-For-All",

		mod: 'gen9insurgence',
		gameType: 'freeforall',
		rated: false,
		ruleset: [
			'Standard NatDex', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves',
		],
	},
	{
		name: "[Gen 9] Ura Free-For-All",

		mod: 'gen9uranium',
		gameType: 'freeforall',
		rated: false,
		ruleset: ['Standard NatDex', 'No Event Moves'],
	},
	{
		name: "[Gen 9] Ins Custom Game",

		mod: 'gen9insurgence',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 120', 'Overflow Stat Mod'],
	},
	{
		name: "[Gen 9] Uranium Custom Game",

		mod: 'gen9uranium',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999'],
	},

	{
		section: "Pokéathlon: Regional Dex",
		column: 3,
	},
	{
		name: "[Gen 9] PoA Random Battle",
		desc: `Randomized teams of Pok&eacute;mon with sets that are generated to be competitively viable.`,

		mod: 'gen9pokeathlon',
		team: 'random',
		ruleset: [
			'Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause',
		],
	},
	{
		name: "[Gen 9] PoA Dex OU",

		mod: 'gen9pokeathlon',
		ruleset: ['Standard', 'Terastal Clause'],
		banlist: ['Uber', 'AG'],
	},
	{
		name: "[Gen 9] PoA Dex AG",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},	
	{
		name: "[Gen 9] PoA Dex UU",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard', 'Terastal Clause'],
		banlist: ['OU', 'UUBL', 'Uber', 'AG'],
	},

	{
		section: "Pokéathlon: National Dex",
		column: 3,
	},
	{
		name: "[Gen 9] PoA National Dex OU",

		mod: 'gen9pokeathlon',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Terastal Clause', '+CAP', '+item:crucibellite', '+item:vilevial'],
		banlist: ['ND Uber', 'ND AG'],
	},
	{
		name: "[Gen 9] PoA National Dex AG",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard NatDex', '+CAP', '+item:crucibellite', '+item:vilevial',],
	},

	{
		section: "Pokéathlon: Doubles",
		column: 3,
	},
	{
		name: "[Gen 9] PoA Dex Doubles AG",
		searchShow: false,

		mod: 'gen9pokeathlon',
		gameType: 'doubles',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 9] PoA NatDex Doubles AG",
		searchShow: false,

		mod: 'gen9pokeathlon',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', '+CAP', '+item:crucibellite', '+item:vilevial',],
	},

	{
		section: "Pokéathlon: Extras",
		column: 3,
	},
	{
		name: "[Gen 9] PoA Free-for-all",

		mod: 'gen9pokeathlon',
		gameType: 'freeforall',
		rated: false,
		ruleset: [
			'Standard NatDex', '+CAP', '+item:crucibellite', '+item:vilevial',
		],
	},
	{
		name: "[Gen 9] PoA Dex Triples AG",
		searchShow: false,

		mod: 'gen9pokeathlon',
		gameType: 'triples',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause'],
	},
	{
		name: "[Gen 9] PoA Dex Mono",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard', 'Terastal Clause', 'PoA Same Type Clause'],
		banlist: [],
	},
	{
		name: "[Gen 9] PoA Custom Game",

		mod: 'gen9pokeathlon',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100'],
	},

	{
		section: "Chaos",
		column: 4,
	},
	{
		name: "[Gen 9] Chaos Random Battle",
		desc: `Randomized teams of Pok&eacute;mon with sets that are generated to be competitively viable.`,

		mod: 'gen9chaos',
		team: 'random',
		ruleset: [
			'Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause',
		],
	},
	{
		name: "[Gen 9] Chaos OU",

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Terastal Clause', '+CAP', '+item:crucibellite', '+item:vilevial'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail',
		],
	},
	{
		name: "[Gen 9] Chaos AG",
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: [
			'Standard NatDex', '+CAP', '+item:crucibellite', '+item:vilevial',
		],
	},
	{
		name: "[Gen 9] Chaos Fusions OU",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen9chaosfusion',
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', '!Species Clause', 'Z-Move Clause', 'Ability Clause = 1', '+CAP', '+item:crucibellite', '+item:vilevial',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'ND AG', 'ND Uber', 'Mega',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:hugepower', 'ability:purepower', 'ability:disguise', 'ability:moody', 'ability:contrary', 'ability:simple', 'ability:wonderguard', 'ability:arenatrap', 'ability:powerconstruct', 'ability:shadowtag', 'ability:speedboost', 'ability:imposter', 'ability:comatose', 'ability:triage', 'ability:waterbubble', 'ability:blazeboost', 'ability:athenian', 'ability:furcoat', 'ability:icescales', 'ability:sharpcoral', 'ability:multishot',
			'move:shellsmash', 'move:bellydrum', 'move:lastrespects', 'move:populationbomb', 'move:ragefist', 'move:assist', 'move:batonpass', 'move:shedtail', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'ability:quickcharge', 'move:achillesheel', 'move:metalcruncher'
		],
	},
	{
		name: "[Gen 9] Chaos Fusions AG",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",
		searchShow: false,

		mod: 'gen9chaosfusion',
		ruleset: [
			'Standard NatDex', '+CAP', '+item:crucibellite', '+item:vilevial',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
	},

	{
		section: "Chaos: Extras",
		column: 4,
	},
	{
		name: "[Gen 9] Chaos Triples",
		searchShow: false,

		mod: 'gen9chaos',
		gameType: 'triples',
		rated: false,
		ruleset: [
			'Standard NatDex', '+CAP', '+item:crucibellite', '+item:vilevial',
		],
	},
	{
		name: "[Gen 9] Chaos Fusions Triples",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'triples',
		rated: false,
		ruleset: [
			'Standard NatDex', '+CAP', '+item:crucibellite', '+item:vilevial',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
	},
	{
		name: "[Gen 9] Chaos Free-for-all",
		searchShow: false,

		mod: 'gen9chaos',
		gameType: 'freeforall',
		rated: false,
		ruleset: [
			'Standard NatDex', '+CAP', '+item:crucibellite', '+item:vilevial',
		],
	},
	{
		name: "[Gen 9] Chaos Fusions FFA",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'freeforall',
		rated: false,
		ruleset: [
			'Standard NatDex', '+CAP', '+item:crucibellite', '+item:vilevial',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
	},
	{
		name: "[Gen 9] Chaos Custom Game",
		searchShow: false,

		mod: 'gen9chaos',
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod'],
	},
	{
		name: "[Gen 9] Chaos Fusion Custom Game",
		searchShow: false,

		mod: 'gen9chaosfusion',
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod'],
	},
	{
		name: "[Gen 9] Chaos Multi Battle",
		searchShow: false,

		mod: 'gen9chaos',
		gameType: 'multi',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', 'Terastal Clause', '+CAP', '+item:crucibellite', '+item:vilevial'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail',
		],
	},
	{
		name: "[Gen 9] Chaos Fusions Multi Battle",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'multi',
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Species Clause', 'Sleep Clause Mod', '!Species Clause', 'Z-Move Clause', 'Ability Clause = 1', '+CAP', '+item:crucibellite', '+item:vilevial',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'ND AG', 'ND Uber', 'Mega',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:hugepower', 'ability:purepower', 'ability:disguise', 'ability:moody', 'ability:contrary', 'ability:simple', 'ability:wonderguard', 'ability:arenatrap', 'ability:powerconstruct', 'ability:shadowtag', 'ability:speedboost', 'ability:imposter', 'ability:comatose', 'ability:triage', 'ability:waterbubble', 'ability:blazeboost', 'ability:athenian', 'ability:furcoat', 'ability:icescales', 'ability:sharpcoral', 'ability:multishot',
			'move:shellsmash', 'move:bellydrum', 'move:lastrespects', 'move:populationbomb', 'move:ragefist', 'move:assist', 'move:batonpass', 'move:shedtail', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'ability:quickcharge', 'move:achillesheel', 'move:metalcruncher'
		],
	},

	// Draft Formats
	{
		section: "Drafts",
		column: 5,
	},
	{
		name: "[Gen 7] IF Dex Draft",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",
		searchShow: false,

		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst',
		],
	},
	{
		name: "[Gen 9] IF NatDex Draft",
		searchShow: false,

		mod: 'gen9infinitefusion',
		ruleset: [
			'Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Sleep Clause Mod',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
	},
	{
		name: "[Gen 9] Ins NatDex Draft",
		searchShow: false,

		mod: 'gen9insurgence',
		ruleset: ['Standard NatDex', 'Tera Type Preview', 'Swagger Clause', 'OHKO Clause', 'Evasion Clause', 'Sleep Clause Mod', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod'],
		banlist: ['move:hiddenpower'],
	},
	{
		name: "[Gen 9] Ins NatDex VGC Draft",
		searchShow: false,
		mod: 'gen9insurgence',
		gameType: 'doubles',
		ruleset: ['Standard NatDex', 'Tera Type Preview', 'Swagger Clause', 'OHKO Clause', 'Evasion Clause', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'Best of = 3', `Picked Team Size = 4`],
		banlist: ['move:hiddenpower', 'move:revivalblessing', 'move:shedtail', 'move:lastrespects', 'move:achillesheel', 'move:permafrost', 'move:livewire', 'move:nanorepair', 'move:jetstream', 
				'ability:moody', 'ability:illuminate', 'ability:winterjoy',
		],
	},
	{
		name: "[Gen 9] Chaos Tera Preview Draft",
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Tera Type Preview', 'OHKO Clause', 'Evasion Clause', 'Sleep Clause Mod', '+CAP', '+item:crucibellite', '+item:vilevial']
	},
	{
		name: "[Gen 9] Chaos Draft",
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'OHKO Clause', 'Evasion Clause', 'Sleep Clause Mod', '+CAP', '+item:crucibellite', '+item:vilevial', 'Terastal Clause', '+item:berserkgene'],
	},
	{
		name: "[Gen 9] Random Ability Draft",
		mod: 'gen9',
		searchShow: false,

		ruleset: [
			'Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999',
			'Default Level = 100', 'Sketch Post-Gen 7 Moves', 'Sleep Clause Mod', 'OHKO Clause', 'Evasion Clause',
			'Endless Battle Clause', 'HP Percentage Mod', 'Obtainable Moves', 'Obtainable Misc', 'Nickname Clause',
		],
	},
];
