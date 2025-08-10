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
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Sleep Moves Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drizzle', 'ability:drought', 'ability:sandrush',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate', 'move:electrify',
			'pokemon:greninjabond', 'pokemon:greninjaash',
		],
	},
	{
		name: "[Gen 7] IF Dex Ubers",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen7infinitefusion',
		ruleset: [
			'Obtainable', 'Team Preview', 'Evasion Clause', 'OHKO Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause',
		],
		banlist: [
			'Mega',
			'ability:hugepower', 'ability:moody', 'ability:wonderguard', 'ability:shadowtag', 'ability:arenatrap', 'ability:imposter',
			'move:spore', 'move:bellydrum', 'move:shellsmash', 'move:batonpass', 'move:vcreate',
		],
	},
	{
		name: "[Gen 7] IF Dex UU",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Sleep Moves Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber', 'OU', 'UUBL',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub', 'item:necrozium',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drought', 'ability:drizzle',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate', 'move:electrify',
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
			'Standard NatDex', '!Species Clause', 'Z-Move Clause', 'Ability Clause = 1',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'ND AG', 'ND Uber',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:hugepower', 'ability:purepower', 'ability:disguise', 'ability:moody', 'ability:contrary', 'ability:simple', 'ability:wonderguard', 'ability:arenatrap', 'ability:powerconstruct', 'ability:shadowtag', 'ability:speedboost', 'ability:imposter', 'ability:comatose', 'ability:triage', 'ability:waterbubble',
			'move:shellsmash', 'move:bellydrum', 'move:lastrespects', 'move:populationbomb', 'move:ragefist', 'move:assist', 'move:batonpass', 'move:shedtail', 'move:geomancy', 'move:doubleironbash', 'move:spore',
		],
	},
	{
		name: "[Gen 9] IF National Dex Ubers",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen9infinitefusion',
		ruleset: [
			'Standard NatDex',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'ND AG',
			'item:gengarite', 'item:medichamite', 'item:mawilite', 'item:kangaskhanite',
			'ability:hugepower', 'ability:purepower', 'ability:arenatrap', 'ability:moody', 'ability:wonderguard', 'ability:shadowtag', 'ability:parentalbond', 'ability:comatose', 'ability:hadronengine', 'ability:orichalcumpulse',
			'move:spore', 'move:bellydrum', 'move:shellsmash', 'move:ragefist', 'move:lastrespects', 'move:assist', 'move:doubleironbash', 'move:batonpass',
		],
	},
	{
		name: "[Gen 9] IF National Dex AG",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen9infinitefusion',
		ruleset: [
			'Standard AG', 'NatDex Mod',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause',
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
			'move:afteryou', 'move:spore',
			'item:lightball', 'item:thickclub',
			'ability:wonderguard', 'ability:hugepower', 'ability:shadowtag', 'ability:imposter', 'ability:contrary'
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
			'Standard NatDex',
			'Infinite Fusion Mod', 'IF Move Legality', 'Fusion Species Clause', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
		banlist: [
			'DUber', 'Mega',
			'ability:hugepower', 'ability:purepower', 'ability:commander', 'ability:swordofruin', 'ability:beadsofruin', 'ability:contrary', 'ability:wonderguard', 'ability:powerconstruct', 'ability:simple', 'ability:zerotohero', 'ability:shadowtag', 'ability:imposter', 'ability:moody',
			'move:geomancy', 'move:afteryou', 'move:clangoroussoul', 'move:lastrespects', 'move:bellydrum', 'move:shellsmash', 'move:ragefist', 'move:spore'
		],
	},
	{
		name: "[Gen 9] IF NatDex Doubles AG",
		searchShow: false,

		mod: 'gen9infinitefusion',
		gameType: 'doubles',
		ruleset: [
			'Standard AG', 'NatDex Mod',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause',
		],
	},

	{
		section: "Infinite Fusion: Extras",
	},
	{
		name: "[Gen 9] IF Free-for-all",
		searchShow: false,

		mod: 'gen9infinitefusion',
		gameType: 'freeforall',
		rated: false,
		ruleset: [
			'Standard AG', 'NatDex Mod',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause',
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
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drought', 'ability:drizzle',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', `- Drizzle ++ Swift Swim`, `- Drought ++ Chlorophyll`, 'Greninja-Bond', 'Greninja-Ash',
		],
	},
	{
		name: "[Gen 7] IF Averagemons",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",
		searchShow: false,
		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Ability Clause = 1', 'Sleep Moves Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause', 'IF Averagemons',
		],
		banlist: [
			'Mega',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub', 'item:eviolite', 'item:quickpowder', 'item:metalpowder',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drizzle', 'ability:drought', 'ability:sandrush',  'ability:contrary', 'ability:simple', 'ability:magicguard', 'ability:sheerforce', 'ability:poisonheal', 'ability:snowwarning', 'ability:sandstream',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate', 'move:electrify', 'move:tailglow', 'move:quiverdance',
			'pokemon:greninjabond', 'pokemon:greninjaash', 'pokemon:kyogre',
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
		section: "Drafts",
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
			'Standard NatDex',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause',
		],
	},
	{
		name: "[Gen 9] Ins NDL Draft",
		searchShow: false,

		mod: 'gen9insurgence',
		ruleset: ['Standard NatDex', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'Species Reveal Clause', '!Species Clause'],
		banlist: [
			'move:hiddenpower', 'move:lastrespects', 'move:shedtail', 'move:revivalblessing', 'move:nanorepair', 'move:livewire', 'move:permafrost', 'move:achillesheel', 'ability:powerconstruct', 'ability:winterjoy', 
			'Emolga-Delta+Blaze Boost', 'Blastoise-Mega+Shell Smash', 'Parental Bond+Seismic Toss', 'Parental Bond+Night Shade', 
		],
	},
	{
		name: "[Gen 9] Ins HBF Draft",
		searchShow: false,

		mod: 'gen9insurgence',
		ruleset: ['Standard NatDex', 'Tera Type Preview', 'Swagger Clause', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'Species Reveal Clause', '!Species Clause'],
		banlist: ['move:hiddenpower'],
	},
	{
		name: "[Gen 9] Ins HBF MM Draft",
		searchShow: false,
		mod: 'gen9insurgence',
		ruleset: ['Standard NatDex', 'Tera Type Preview', 'Swagger Clause', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'Species Reveal Clause', '!Species Clause', 'Multiple Mega'],
		banlist: ['move:hiddenpower'],
	},
	{
		name: "[Gen 9] Chaos Tera Preview Draft",
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Tera Type Preview', 'Mega Forme Clause', '+CAP', '+item:crucibellite', '+item:vilevial', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Draft",
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Mega Forme Clause', '+CAP', '+item:crucibellite', '+item:vilevial', 'Terastal Clause', '+item:berserkgene', 'Species Reveal Clause'],
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
	{
		name: "[Gen 9] NatDex VGC Draft",
		mod: 'gen9',
		searchShow: false,

		gameType: 'doubles',
		ruleset: [ 'Standard NatDex', 'Picked Team Size = 4', 'Tera Type Preview', 'Item Clause = 1', 'Adjust Level Down = 50'],
	},

	{
		section: "Super Mariomon!",
		column: 2,
	},
	{
		name: "[Gen 9] Mariomon Random Battle",

		mod: 'gen9mariomon',
		team: 'random',
		ruleset: [
			'Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause', 'Overflow Stat Mod', 'Species Reveal Clause'
		],
	},
	{
		name: "[Gen 9] Mariomon AG",
		mod: 'gen9mariomon',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', '+LGPE', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Mariomon OU",

		mod: 'gen9mariomon',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Swagger Clause', 'Terastal Clause', 'Z-Move Clause', 'No Event Moves', '+LGPE', 'Species Reveal Clause', 'Gems Clause'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag',
			'item:souldew', 'item:kingsrock', 'item:razorfang', 'item:quickclaw',
			'move:batonpass', 'move:electrify', 'move:boomburst',
		],
	},
	{
		name: "[Gen 9] Mariomon LC",

		mod: 'gen9mariomon',
		ruleset: ['Standard NatDex', 'Little Cup', 'Terastal Clause', 'Z-Move Clause', 'Species Reveal Clause', 'Baton Pass Stat Trap Clause'],
		banlist: ['pokemon:fighterfly', 'pokemon:gushen', 'pokemon:koopatroopa', 'move:electrify', 'item:kingsrock'],
	},
	{
		name: "[Gen 9] Mariomon VGC",
		mod: 'gen9mariomon',
		gameType: 'doubles',

		bestOfDefault: true,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Terastal Clause', 'Z-Move Clause', '+LGPE'],
	},
	{
		name: "[Gen 9] Mariomon Custom Game",

		mod: 'gen9mariomon',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Overflow Stat Mod'],
	},

	{
		section: "Insurgence Formats",
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
		ruleset: ['Standard', 'Swagger Clause', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag',
			'item:souldew',
			'move:batonpass', 'move:permafrost', 'move:livewire', "move:achillesheel",
		],
	},
	{
		name: "[Gen 6] Insurgence AG",
		searchShow: false,

		mod: 'gen6insurgence',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Insurgence NatDex OU",

		mod: 'gen9insurgence',
		ruleset: ['Standard NatDex', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause',  'Terastal Clause', ],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire', 'move:achillesheel',
		],
	},
	{
		name: "[Gen 9] Insurgence NatDex AG",
		searchShow: false,

		mod: 'gen9insurgence',
		ruleset: ['Standard AG', 'NatDex Mod', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 6] Ins Dex Doubles AG",
		searchShow: false,

		mod: 'gen6insurgence',
		gameType: 'doubles',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Ins NatDex Doubles AG",
		searchShow: false,

		mod: 'gen9insurgence',
		gameType: 'doubles',
		ruleset: ['Standard AG', 'NatDex Mod', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Ins Free-For-All",
		searchShow: false,

		mod: 'gen9insurgence',
		gameType: 'freeforall',
		rated: false,
		ruleset: [
			'Standard AG', 'NatDex Mod', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause'
		],
	},
	{
		name: "[Gen 9] Ins Custom Game",

		mod: 'gen9insurgence',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 120', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},

	{
		section: "Uranium Formats",
		column: 2,
	},
	{
		name: "[Gen 6] Ura Random Battle",

		mod: 'gen6uranium',
		team: 'random',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Illusion Level Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 6] Uranium OU",

		mod: 'gen6uranium',
		ruleset: ['Standard', 'Swagger Clause', 'Nuclear Clause', 'Species Reveal Clause'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag',
			'item:souldew',
			'move:batonpass',
		],
	},
	{
		name: "[Gen 6] Uranium AG",
		searchShow: false,

		mod: 'gen6uranium',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Uranium NatDex OU",

		mod: 'gen9uranium',
		ruleset: ['Standard NatDex', 'Nuclear Clause', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail',
		],
	},
	{
		name: "[Gen 9] Uranium NatDex AG",
		searchShow: false,

		mod: 'gen9uranium',
		ruleset: ['Standard AG', 'NatDex Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 6] Ura Dex Doubles AG",
		searchShow: false,

		mod: 'gen6uranium',
		gameType: 'doubles',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Ura NatDex Doubles AG",
		searchShow: false,

		mod: 'gen9uranium',
		gameType: 'doubles',
		ruleset: ['Standard AG', 'NatDex Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Ura Free-For-All",
		searchShow: false,

		mod: 'gen9uranium',
		gameType: 'freeforall',
		rated: false,
		ruleset: ['Standard AG', 'NatDex Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Uranium Custom Game",

		mod: 'gen9uranium',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Overflow Stat Mod'],
	},

	{
		section: "Infinity Formats",
		column: 2,
	},
	{
		name: "[Gen 6] Inf Random Battle",

		mod: 'gen6infinity',
		team: 'random',
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Illusion Level Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 6] Infinity OU",

		mod: 'gen6infinity',
		ruleset: ['Standard', 'Swagger Clause', 'Baton Pass Clause', 'No Event Moves', 'Overflow Stat Mod', 'Species Reveal Clause'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag', 'ability:purefocus',
			'item:souldew',
			'move:vanish', 'move:cinderbreath',
		],
	},
	{
		name: "[Gen 6] Infinity AG",
		searchShow: false,

		mod: 'gen6infinity',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'No Event Moves', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Infinity NatDex OU",

		mod: 'gen9infinity',
		ruleset: ['Standard NatDex', 'No Event Moves', 'Overflow Stat Mod', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:vanish', 'move:cinderbreath',
		],
	},
	{
		name: "[Gen 9] Infinity NatDex AG",
		searchShow: false,

		mod: 'gen9infinity',
		ruleset: ['Standard AG', 'NatDex Mod', 'No Event Moves', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 6] Inf Dex Doubles AG",
		searchShow: false,

		mod: 'gen6infinity',
		gameType: 'doubles',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'No Event Moves', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Inf NatDex Doubles AG",
		searchShow: false,

		mod: 'gen9infinity',
		gameType: 'doubles',
		ruleset: ['Standard AG', 'NatDex Mod', 'No Event Moves', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Inf Free-For-All",
		searchShow: false,

		mod: 'gen9infinity',
		gameType: 'freeforall',
		rated: false,
		ruleset: ['Standard AG', 'NatDex Mod', 'No Event Moves', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Inf Custom Game",

		mod: 'gen9infinity',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 6] Inf Custom Game",

		mod: 'gen6infinity',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},

		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},

	{
		section: "Pokéathlon: Full Dex",
		column: 3,
	},
	{
		name: "[Gen 9] PoA Random Battle",
		desc: `Randomized teams of Pok&eacute;mon with sets that are generated to be competitively viable.`,

		mod: 'gen9pokeathlon',
		team: 'random',
		ruleset: ['Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause'],
	},
	{
		name: "[Gen 9] PoA OU",

		mod: 'gen9pokeathlon',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG',
			'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire', 'move:achillesheel', 'move:glare',
			'ability:arenatrap', 'ability:moody', 'ability:shadowtag', 'ability:multishot',
			'item:razorfang', 'item:kingsrock', 'item:focusband', 'item:quickclaw', 'item:lightclay', 'item:trickrock',
		],
	},
	{
		name: "[Gen 9] PoA Ubers",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'Species Reveal Clause'],
		banlist: ['ND AG'],
	},
	{
		name: "[Gen 9] PoA UU",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG', 'ND OU',
			'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire', 'move:achillesheel', 'move:glare',
			'ability:arenatrap', 'ability:moody', 'ability:shadowtag', 'ability:multishot',
			'item:razorfang', 'item:kingsrock', 'item:focusband', 'item:quickclaw', 'item:lightclay',
		],
	},
	{
		name: "[Gen 9] PoA LC",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard NatDex', 'Little Cup', 'Terastal Clause', 'Z-Move Clause', 'Species Reveal Clause'],
		banlist: [],
	},
	{
		name: "[Gen 9] PoA AG",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard AG', 'NatDex Mod', 'Terastal Clause', 'Species Reveal Clause'],
	},

	{
		section: "Pokéathlon: Season 2",
		column: 3,
	},
	{
		name: "[Gen 9] PoA OU S2",

		mod: 'gen9pokeathlon',
		ruleset: ['Standard', 'Terastal Clause', 'Species Reveal Clause'],
		banlist: [
			'Uber', 'AG',
			'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire', 'move:achillesheel', 'move:glare',
			'ability:arenatrap', 'ability:moody', 'ability:shadowtag', 'ability:multishot',
			'item:razorfang', 'item:kingsrock', 'item:focusband', 'item:quickclaw', 'item:lightclay', 'item:trickrock',
		],
	},
	{
		name: "[Gen 9] PoA UU S2",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard', 'Terastal Clause', 'Species Reveal Clause'],
		banlist: [
			'OU', 'UUBL', 'Uber', 'AG',
			'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire', 'move:achillesheel', 'move:glare',
			'ability:arenatrap', 'ability:moody', 'ability:shadowtag', 'ability:multishot',
			'item:razorfang', 'item:kingsrock', 'item:focusband', 'item:quickclaw', 'item:lightclay', 'item:trickrock',
		],
	},
	{
		name: "[Gen 9] PoA AG S2",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Terastal Clause', 'Species Reveal Clause'],
	},

	{
		section: "Pokéathlon: Doubles",
		column: 3,
	},
	{
		name: "[Gen 9] PoA Doubles AG",
		searchShow: false,

		mod: 'gen9pokeathlon',
		gameType: 'doubles',
		ruleset: ['Standard AG', 'NatDex Mod', 'Terastal Clause', 'Z-Move Clause', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] PoA Doubles AG S2",
		searchShow: false,

		mod: 'gen9pokeathlon',
		gameType: 'doubles',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Terastal Clause', 'Species Reveal Clause'],
	},

	{
		section: "Pokéathlon: Extras",
		column: 3,
	},
	{
		name: "[Gen 9] PoA Free-for-all",
		searchShow: false,

		mod: 'gen9pokeathlon',
		gameType: 'freeforall',
		rated: false,
		ruleset: ['Standard AG', 'NatDex Mod', 'Terastal Clause', 'Z-Move Clause', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] PoA Mono",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'PoA Same Type Clause', 'Species Reveal Clause'],
		banlist: [
			'pokemon:berserkergene', 'pokemon:electrodemega', 'pokemon:florgesmega', 'pokemon:snorlaxfrostmega', 'pokemon:sceptiledeltamega', 'pokemon:blazikendeltamega', 'pokemon:suicunesupra',
			'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire', 'move:achillesheel', 'move:glare',
			'ability:arenatrap', 'ability:moody', 'ability:shadowtag', 'ability:multishot',
			'item:razorfang', 'item:kingsrock', 'item:focusband', 'item:quickclaw', 'item:lightclay',
		],
	},
	{
		name: "[Gen 9] PoA Custom Game",

		mod: 'gen9pokeathlon',
		searchShow: false,
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Species Reveal Clause'],
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
			'Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause', 'Overflow Stat Mod', 'Species Reveal Clause'
		],
	},
	{
		name: "[Gen 9] Chaos OU",

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag', 'ability:illuminate', 'ability:quickcharge',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:berserkgene', 'item:lightclay', 'item:trickrock', 'item:damprock', 'item:heatrock', 'item:darkrock',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:vanish', 'move:cinderbreath', 'move:livewire', 'move:permafrost', 'move:achillesheel', 'move:fibregraft', 'move:hammerthrow', 'move:supremecannon', 'move:nimbusfist',
		],
	},
	{
		name: "[Gen 9] Chaos AG",
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: [
			'Standard AG', 'NatDex Mod', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'Species Reveal Clause'
		],
	},
	{
		name: "[Gen 9] Chaos UU",

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG', 'ND OU', 'ND UUBL',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag', 'ability:illuminate', 'ability:quickcharge',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:berserkgene', 'item:lightclay', 'item:trickrock', 'item:damprock', 'item:darkrock', 'item:smoothrock', 'item:heatrock', 'item:icyrock',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:vanish', 'move:cinderbreath', 'move:livewire', 'move:permafrost', 'move:achillesheel', 'move:fibregraft', 'move:hammerthrow', 'move:supremecannon', 'move:nimbusfist', 'move:jumpship',
		],
	},
	{
		name: "[Gen 9] Chaos Fusions OU",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen9chaosfusion',
		ruleset: [
			'Standard NatDex', '!Species Clause', 'Z-Move Clause', 'Ability Clause = 1', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', '!Nickname Clause', 'Sketch Clause', 'Nuclear Move Clause', 'Overflow Stat Mod'
		],
		banlist: [
			'ND AG', 'ND Uber', 'Mega',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:lightball', 'item:thickclub', 'item:berserkgene', 'item:deepseascale', 'item:deepseatooth', 'item:managel', 'item:anchor', 'item:boomerang', 'item: trickrock',
			'ability:hugepower', 'ability:purepower', 'ability:disguise', 'ability:moody', 'ability:contrary', 'ability:simple', 'ability:wonderguard', 'ability:arenatrap', 'ability:powerconstruct', 'ability:shadowtag', 'ability:speedboost', 'ability:imposter', 'ability:comatose', 'ability:triage', 'ability:waterbubble', 'ability:blazeboost', 'ability:athenian', 'ability:furcoat', 'ability:icescales', 'ability:sharpcoral', 'ability:multishot', 'ability:regurgitation', 'ability:lernean', 'ability:purefocus', 'ability:musclememory', 'ability:illuminate', 'ability:atomizate', 'ability: unburden',
			'move:shellsmash', 'move:bellydrum', 'move:lastrespects', 'move:populationbomb', 'move:ragefist', 'move:assist', 'move:batonpass', 'move:shedtail', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'ability:quickcharge', 'move:achillesheel', 'move:metalcruncher', 'move:vanish', 'move:cinderbreath', 'move:fishiousrend', 'move:hammerthrow', 'move:permafrost', 'move:livewire', 'move:electrify',
		],
	},
	{
		name: "[Gen 9] Chaos Fusions AG",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",
		searchShow: false,

		mod: 'gen9chaosfusion',
		ruleset: [
			'Standard AG', 'NatDex Mod', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Overflow Stat Mod',
		],
	},

	{
		section: "Chaos: Extras",
		column: 4,
	},
	{
		name: "[Gen 9] Chaos Doubles OU",
		searchShow: false,

		mod: 'gen9chaos',
		gameType: 'doubles',
		ruleset: [
			'Standard NatDex', 'Terastal Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause'
		],
		banlist: [
			'DUber',
			'move:assist', 'move:cinderbreath', 'move:coaching', 'move:darkvoid', 'move:jetstream', 'move:livewire', 'move:permafrost', 'move:supremecannon', 'move:swagger',
			'ability:commander', 'ability:fairylaw', 'ability:illuminate', 'ability:inertia', 'ability:powerconstruct', 'ability:quickcharge',
			'item:berserkgene', 'item:eeviumz', 'item:focusband', 'item:kingsrock', 'item:lightclay', 'item:quickclaw', 'item:razorfang', 'item:trickrock',
			'Prankster + After You',
		],
	},
	{
		name: "[Gen 9] Chaos Monotype",
		desc: `All the Pok&eacute;mon on a team must share a type.`,
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Same Type Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause'],
		banlist: [
			'Alakazam-Mega', 'Annihilape', 'Arceus', 'Arceus-Primal', 'Archilles-Mega', 'Arkhaos', 'Baxcalibur', 'Birdo', 'Blastoise-Mega', 'Blaziken', 'Blaziken-Mega', 'Blissey-Egho', 'Calyrex-Ice', 'Calyrex-Shadow', 'Celemewchi', 'Chi-Yu', 'Chien-Pao', 'Chuggalong',
			'Crustle-Delta-Cake', 'Cryogonal-Mega', 'Darkrai', 'Deosectwo', 'Deoxys', 'Deoxys-Attack', 'Diaboromon', 'Dialga', 'Dialga-Origin', 'Dracovish', 'Dragapult', 'Dragonite-Delta', 'Dramsama-Dark-Mega', 'Drilgann-Mega', 'Eevee-Mega', 'Eeveeon', 'Electrode-Mega',
			'Emolga-Delta', 'Espathra', 'Eternatus', 'Exor', 'Fafninter', 'Fafninter-Christmas', 'Feraligatr-Egho', 'Feraligatr-Mega', 'Fidgit', 'Flutter Mane', 'Flymon', 'Frosthra', 'Garchomp-Mega', 'Genesect', 'Gengar-Mega', 'Gigantusk', 'Giratina', 'Giratina-Origin', 'Giratina-Primal', 'Gouging Fire', 'Groudon', 'Groudon-Primal',
			'Haxorus-Mega', 'Ho-Oh', 'Hoopa-Delta-Unleashed', 'Hoopa-Unbound', 'Hydreigon-Mega', 'Icyall', 'Inflagetah', 'Inflagetah-Mega', 'Iron Bundle', 'Jerbolta-Nuclear', 'Jirachi-Mega', 'Kangaskhan-Mega', 'Kingambit', 'Koraidon', 'Kyodonquaza', 'Kyogre', 'Kyogre-Primal', 'Kyurem-Black',
			'Kyurem-White', 'Lanthan', 'Leomon', 'Lucario-Mega', 'Lugia', 'Lukagon', 'Lunala', 'Machinedramon', 'Magearna', 'MagnaAngemon', 'Marshadow', 'Metagross-Delta-Ruin-Crystal', 'Metagross-Delta-Ruin-Mega', 'Metagross-Delta-Spider-Mega', 'Metagross-Mega', 'MetalEtemon', 'MetalGarurumon', 'Mew', 'Mewthree',
			'Mewtwo', 'pokemon:mewtwoarmor', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Mewtwo-Shadow', 'Mewtwo-Shadow-Mega-X', 'Miraidon', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Nucleon', 'Oculeus', 'Ogerpon-Hearthflame', 'Okuwamon', 'Omnimon', 'Palafin', 'Paldiatina', 'Palkia', 'Palkia-Origin',
			'Petey Piranha', 'Pheromosa', 'Raffiti', 'Rayquaza', 'Rayquaza-Mega', 'Reaptide', 'Regigigas-Primal', 'Reshiram', 'Reuniclus-Mega', 'SaberLeomon', 'Salamence-Mega', 'Scizor-Delta-Mega', 'Seikamater', 'Shaymin-Sky', 'SkullGreymon', 'Snosquatch', 'Solgaleo', 'Sonic', 'pokemon:spark', 'Super Fly', 'Swamptiliken', 
			'Tiptron', 'Togekiss', 'Torterneon', 'UFI', 'Ursaluna-Bloodmoon', 'Urshifu', 'Vareon', 'Venustoizard', 'Volcarona-Delta',
			'pokemon:volcaronadeltaarmor', 'WarGreymon', 'Xerneas', 'Yatagaryu', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zapmolticuno', 'Zekrom', 'pokemon:zekromarmor', 'Zekyushiram', 'Zudomon', 'Zygarde', 'Zygarde-Complete',
			'ability:illuminate', 'ability:moody', 'ability:powerconstruct', 'ability:quickcharge', 'ability:shadowtag',
			'item:boosterenergy', 'item:damprock', 'item:focusband', 'item:heatrock', 'item:icyrock', 'item:kingsrock', 'item:lightclay', 'item:quickclaw', 'item:razorfang', 'item:smoothrock', 'item:terrainextender', 'item:trickrock', 'item:darkrock', 'item:hydreigonite',
			'move:achillesheel', 'move:assist', 'move:batonpass', 'move:cinderbreath', 'move:electrify', 'move:fibregraft', 'move:jumpship', 'move:lastrespects', 'move:livewire', 'move:permafrost', 'move:shedtail', 'move:swagger', 'move:wildfire'
		],
	},
	{
		name: "[Gen 9] Chaos AAA",
		desc: `Pok&eacute;mon have access to almost any ability.`,
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', '!Sleep Clause Mod', 'Sleep Moves Clause', 'Species Reveal Clause', '!Obtainable Abilities', 'Ability Clause = 1', 'Z-Move Clause'],
		banlist: [
			'Alakazam-Mega', 'Annihilape', 'Arceus', 'Arceus-Primal', 'Archeops', 'Arkhaos', 'Archilles-Mega', 'Baxcalibur', 'Birdo', 'Blacephalon', 'Blastoise-Mega', 'Blaziken-Mega', 'Blissey-Egho',
			'Calyrex-Ice', 'Calyrex-Shadow', 'Chansey-Egho', 'Chi-Yu', 'Chien-Pao', 'Cryogonal-Mega', 'Darkrai', 'Deosectwo', 'Deoxys', 'Deoxys-Attack', 'Diaboromon', 'Dialga', 'Dialga-Origin', 'Dragapult', 'Dracovish', 'Dramsama-Dark-Mega',
			'Drilgann-Mega', 'Electrode-Mega', 'Eternatus', 'Feraligatr-Mega', 'Flutter Mane', 'Genesect', 'Gengar-Mega', 'Giratina', 'Giratina-Origin', 'Giratina-Primal', 'Gouging Fire', 'Groudon', 'Groudon-Primal',
			'Haxorus-Mega', 'Ho-Oh', 'Hoopa-Delta-Unleashed', 'Hoopa-Unbound', 'Hydreigon-Mega', 'Infermon', 'Inflagetah-Mega', 'Iron Bundle', 'Iron Valiant', 'Jirachi-Mega', 'Kangaskhan-Mega', 'Kingambit', 'Keldeo', 'Koraidon',
			'Kyodonquaza', 'Kyogre', 'Kyogre-Primal', 'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Landorus', 'Lanthan', 'Lucario-Mega', 'Lugia', 'Lunala', 'Machinedramon', 'Magearna', 'MagnaAngemon', 'Marshadow', 'Metagross-Delta-Ruin-Crystal', 'Metagross-Delta-Ruin-Mega',
			'Metagross-Delta-Spider-Mega', 'Metagross-Mega', 'MetalEtemon', 'MetalGarurumon', 'Mewthree', 'Mewtwo', 'pokemon:mewtwoarmor', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Mewtwo-Shadow', 'Mewtwo-Shadow-Mega-X', 'Miraidon', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necturna',
			'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Oculeus', 'Okuwamon', 'Omnimon', 'Paldiatina', 'Palkia', 'Palkia-Origin', 'Pheromosa', 'Piximon', 'Raffiti', 'Rayquaza', 'Rayquaza-Mega', 'Regigigas', 'Regigigas-Primal', 'Reshiram', 'Reuniclus-Mega',
			'SaberLeomon', 'Salamence-Mega', 'Seikamater', 'Shaymin-Sky', 'SkullGreymon', 'Solgaleo', 'Sonic', 'Spectrier', 'Stratagem', 'Terapagos-Stellar', 'Typhlosion-Delta-Mega', 'Urshifu', 'Urshifu-Rapid-Strike', 'Volcarona-Delta', 'pokemon:volcaronadeltaarmor', 
			'WarGreymon', 'Xerneas', 'Xurkitree', 'Yatagaryu', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zeraora', 'Zekrom', 'pokemon:zekromarmor', 'Zekyushiram', 'Zudomon', 'Zygarde', 'Zygarde-Complete',
			'ability:acceleration', 'ability:ancientpresence', 'ability:atomizate', 'ability:athenian', 'ability:arenatrap', 'ability:blazeboost', 'ability:bushido', 'ability:chaosemeralds', 'ability:chlorofury', 'ability:chernobyl', 'ability:comatose',
			'ability:contrary', 'ability:deepfreeze', 'ability:eventhorizon', 'ability:fairylaw', 'ability:furcoat', 'ability:goodasgold', 'ability:gorillatactics', 'ability:hueshift', 'ability:icescales', 'ability:illusion', 'ability:imposter', 'ability:infuriate',
			'ability:innardsout', 'ability:irrelephant', 'ability:lernean', 'ability:magnetpull', 'ability:magicbounce', 'ability:moody', 'ability:multishot', 'ability:musclememory', 'ability:necromancy', 'ability:neutralizinggas', 'ability:omnitype',
			'ability:orichalcumpulse', 'ability:parentalbond', 'ability:periodicorbit', 'ability:persistent', 'ability:poisonheal', 'ability:purefocus', 'ability:purepower', 'ability:quickcharge', 'ability:shadowtag', 'ability:simple', 'ability:sleet', 'ability:gulpmissile',
			'ability:speedboost', 'ability:speedswap', 'ability:stakeout', 'ability:stormbringer', 'ability:toxicdebris', 'ability:triage', 'ability:unburden', 'ability:unleafed', 'ability:waterbubble', 'ability:wonderguard', 'ability:sacredtreasures', 'ability:starfall',
			'ability:inertia', 'ability:proteanmaxima', 'ability:kablooey', 'ability:momentum', 'ability:multitasker', 'ability:cleansweep', 'ability:glitch', 'ability:hugepower', 'ability:sharpcoral', 'ability:hadronengine', 'ability:powerconstruct', 'ability:serenegrace',
			'ability:supercell',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:trickrock',
			'move:achillesheel', 'move:assist', 'move:batonpass', 'move:cinderbreath', 'move:electrify', 'move:fibregraft', 'move:hammerthrow', 'move:lastrespects', 'move:livewire', 'move:permafrost', 'move:shedtail', 'move:swagger'
		],
	},
	{
		name: "[Gen 9] Chaos STABmons",
		searchShow: false,
		desc: `Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.`,

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause', 'Chaos STABmons Move Legality', 'Z-Move Clause'],
		banlist: [
			'ability:arenatrap', 'ability:fairylaw', 'ability:illuminate', 'ability:moody', 'ability:quickcharge', 'ability:shadowtag',
			'item:damprock', 'item:darkrock', 'item:focusband', 'item:heatrock', 'item:icyrock', 'item:kingsrock', 'item:lightclay', 'item:quickclaw', 'item:razorfang', 'item:smoothrock', 'item:terrainextender', 'item:trickrock',
			'move:achillesheel', 'move:assist', 'move:batonpass', 'move:eevoboost', 'move:electrify', 'move:fibregraft', 'move:hammerthrow', 'move:lastrespects', 'move:livewire', 'move:omniblast', 'move:permafrost', 'move:ragefist', 'move:revivalblessing', 'move:riftjump', 'move:shedtail', 'move:shellsmash', 'move:vengefulpulse', 'move:yuckytongue',
			'move:cinderbreath', 'move:mugencannon', 'move:devilsdeed', 'move:icewolfclaw', 'move:getlucky', 'move:nimbusfist', 'move:infinityarrow', 'move:glaciallance', 'move:lightofruin', 'move:duoscissorclaw',
			'pokemon:landorus', 'pokemon:fafninterchristmas', 'pokemon:araquanid', 'pokemon:pheromosa', 'pokemon:hydreigonmega', 'pokemon:spectrier', 'pokemon:fluttermane', 'pokemon:agumon', 'pokemon:airdramon', 'pokemon:alakazammega', 'pokemon:angemon', 'pokemon:arceus', 'pokemon:arceusprimal', 'pokemon:archillesmega', 'pokemon:arkhaos', 'pokemon:azumarill', 'pokemon:azumarillegho', 'pokemon:bakemon', 'pokemon:baxcalibur', 'pokemon:betamon',
			'pokemon:birdo', 'pokemon:birdramon', 'pokemon:biyomon', 'pokemon:blazikenmega', 'pokemon:blisseyegho', 'pokemon:botamon', 'pokemon:calyrexice', 'pokemon:calyrexshadow', 'pokemon:chanseyegho', 'pokemon:chienpao', 'pokemon:chiyu', 'pokemon:coelamon', 'pokemon:crabmon',
			'pokemon:cryogonalmega', 'pokemon:darkrai', 'pokemon:darmanitangalar', 'pokemon:demidevimon', 'pokemon:deosectwo', 'pokemon:deoxys', 'pokemon:deoxysattack', 'pokemon:devimon', 'pokemon:diaboromon', 'pokemon:dialga', 'pokemon:dialgaorigin', 'pokemon:dracovish',
			'pokemon:dragapult', 'pokemon:dragonite', 'pokemon:dramsamadarkmega', 'pokemon:drilgannmega', 'pokemon:drimogemon', 'pokemon:elecmon', 'pokemon:electrodemega', 'pokemon:emolgadelta', 'pokemon:enamorus', 'pokemon:etemon', 'pokemon:eternatus', 'pokemon:exor',
			'pokemon:fafninter', 'pokemon:feraligatregho', 'pokemon:feraligatrmega', 'pokemon:fidgit', 'pokemon:flymon', 'pokemon:frigimon', 'pokemon:frosthra', 'pokemon:gabumon', 'pokemon:garudamon', 'pokemon:garurumon', 'pokemon:gazimon', 'pokemon:genesect',
			'pokemon:gengarmega', 'pokemon:gigantusk', 'pokemon:giratina', 'pokemon:giratinaorigin', 'pokemon:giratinaprimal', 'pokemon:gomamon', 'pokemon:gougingfire', 'pokemon:greymon', 'pokemon:groudon', 'pokemon:groudonprimal', 'pokemon:haxorusmega', 'pokemon:hooh',
			'pokemon:hoopadeltaunleashed', 'pokemon:icyall', 'pokemon:ikkakumon', 'pokemon:infermon', 'pokemon:inflagetah', 'pokemon:inflagetahmega', 'pokemon:ironbundle', 'pokemon:jerboltanuclear', 'pokemon:jirachimega', 'pokemon:kabuterimon', 'pokemon:kangaskhanmega',
			'pokemon:kartana', 'pokemon:keramon', 'pokemon:koraidon', 'pokemon:koromon', 'pokemon:kunemon', 'pokemon:kuwagamon', 'pokemon:kyodonquaza', 'pokemon:kyogre', 'pokemon:kyogreprimal', 'pokemon:kyurem', 'pokemon:kyuremblack', 'pokemon:kyuremwhite',
			'pokemon:lanthan', 'pokemon:leomon', 'pokemon:lilliganthisui', 'pokemon:lillymon', 'pokemon:lucariomega', 'pokemon:lugia', 'pokemon:lukagon', 'pokemon:lunala', 'pokemon:machinedramon', 'pokemon:magearna', 'pokemon:magnaangemon', 'pokemon:manaphy', 'pokemon:marshadow',
			'pokemon:mawiledeltamega', 'pokemon:megakabuterimon', 'pokemon:megaseadramon', 'pokemon:melmetal', 'pokemon:metagrossdeltaruincrystal', 'pokemon:metagrossdeltaruinmega', 'pokemon:metagrossdeltaspidermega', 'pokemon:metagrossmega', 'pokemon:metaletemon',
			'pokemon:metalgarurumon', 'pokemon:metalgreymon', 'pokemon:mewthree', 'pokemon:mewtwo', 'pokemon:mewtwoarmor', 'pokemon:mewtwomegax', 'pokemon:mewtwomegay', 'pokemon:mewtwoshadow', 'pokemon:mewtwoshadowmegax', 'pokemon:miraidon', 'pokemon:mojyamon',
			'pokemon:monochromon', 'pokemon:monzaemon', 'pokemon:motimon', 'pokemon:naganadel', 'pokemon:necrozmadawnwings', 'pokemon:necrozmaduskmane', 'pokemon:necturna', 'pokemon:nucleon', 'pokemon:numemon', 'pokemon:oblivicornmega', 'pokemon:ockthane',
			'pokemon:oculeus', 'pokemon:ogerponhearthflame', 'pokemon:ogerponwellspring', 'pokemon:ogremon', 'pokemon:okuwamon', 'pokemon:omnimon', 'pokemon:pagumon', 'pokemon:paldiatina', 'pokemon:palkia', 'pokemon:palkiaorigin', 'pokemon:palmon', 'pokemon:patamon',
			'pokemon:piximon', 'pokemon:porygonx', 'pokemon:porygonz', 'pokemon:raffiti', 'pokemon:rayquaza', 'pokemon:rayquazamega', 'pokemon:reaptide', 'pokemon:redvegiemon', 'pokemon:regigigasprimal', 'pokemon:regimyo', 'pokemon:reshiram', 'pokemon:reuniclusmega', 'pokemon:saberleomon', 'pokemon:salamencemega',
			'pokemon:scizordeltamega', 'pokemon:seadramon', 'pokemon:seikamater', 'pokemon:shayminsky', 'pokemon:shellmon', 'pokemon:silvally', 'pokemon:skullgreymon', 'pokemon:snorlaxfrostmega', 'pokemon:snosquatch', 'pokemon:solgaleo', 'pokemon:sonic', 'pokemon:swamptiliken',
			'pokemon:tapukoko', 'pokemon:tapulele', 'pokemon:tentomon', 'pokemon:terapagos', 'pokemon:togemon', 'pokemon:tsunomon', 'pokemon:tyrannomon', 'pokemon:ufi', 'pokemon:unimon', 'pokemon:ursalunabloodmoon', 'pokemon:urshifu', 'pokemon:vareon', 'pokemon:vegiemon',
			'pokemon:volcaronadelta', 'pokemon:volcaronadeltaarmor', 'pokemon:wargreymon', 'pokemon:weregarurumon', 'pokemon:whamon', 'pokemon:wizardmon', 'pokemon:xerneas', 'pokemon:xurkitree', 'pokemon:yatagaryu', 'pokemon:yveltal', 'pokemon:zacian', 'pokemon:zaciancrowned',
			'pokemon:zamazentacrowned', 'pokemon:zekrom', 'pokemon:zekromarmor', 'pokemon:zekyushiram', 'pokemon:zudomon', 'pokemon:zygarde', 'pokemon:zygardecomplete',
		],
		restricted: [
			'move:acupressure', 'move:astralbarrage', 'move:bellydrum', 'move:boltbeak', 'move:bulwark', 'move:ceaselessedge', 'move:chatter', 'move:clangoroussoul', 'move:direclaw', 'move:doubleironbash', 'move:dragonenergy', 'move:electroshot', 'move:eruption', 'move:extremespeed', 'move:filletaway', 'move:finalgambit', 'move:fishiousrend', 'move:flameimpact',
			'move:flowertrick', 'move:geomancy', 'move:gigatonhammer', 'move:groomguard', 'move:infernalblade', 'move:jaggedshot', 'move:metalcruncher', 'move:nanorepair', 'move:noretreat', 'move:populationbomb', 'move:retrograde', 'move:rocketgrab', 'move:shiftgear', 'move:shroudedblows', 'move:subduction', 'move:supremecannon', 'move:terraforce',
			'move:thousandarrows', 'move:transcendentsword', 'move:triplearrows', 'move:vcreate', 'move:victorydance', 'move:waterspout', 'move:webwrecker', 'move:wickedblow', 'move:wickedtorque',
		],
	},
	{
		name: "[Gen 9] Chaos Free-for-all",
		searchShow: false,

		mod: 'gen9chaos',
		gameType: 'freeforall',
		rated: false,
		ruleset: [
			'Standard AG', 'NatDex Mod', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'Species Reveal Clause'
		],
	},
	{
		name: "[Gen 9] Chaos Multi Battle",
		searchShow: false,

		mod: 'gen9chaos',
		gameType: 'multi',
		ruleset: ['Standard AG', 'NatDex Mod', 'Terastal Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:cinderbreath',
		],
	},
	{
		name: "[Gen 9] Chaos Fusions FFA",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'freeforall',
		rated: false,
		ruleset: [
			'Standard AG', 'NatDex Mod', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Overflow Stat Mod'
		],
	},
	{
		name: "[Gen 9] Chaos Fusions Multi Battle",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'multi',
		ruleset: [
			'Standard AG', 'NatDex Mod', 'Z-Move Clause', 'Ability Clause = 1', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', 'Overflow Stat Mod'
		],
		banlist: [
			'ND AG', 'ND Uber', 'Mega',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:hugepower', 'ability:purepower', 'ability:disguise', 'ability:moody', 'ability:contrary', 'ability:simple', 'ability:wonderguard', 'ability:arenatrap', 'ability:powerconstruct', 'ability:shadowtag', 'ability:speedboost', 'ability:imposter', 'ability:comatose', 'ability:triage', 'ability:waterbubble', 'ability:blazeboost', 'ability:athenian', 'ability:furcoat', 'ability:icescales', 'ability:sharpcoral', 'ability:multishot',
			'move:shellsmash', 'move:bellydrum', 'move:lastrespects', 'move:populationbomb', 'move:ragefist', 'move:assist', 'move:batonpass', 'move:shedtail', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'ability:quickcharge', 'move:achillesheel', 'move:metalcruncher', 'move:cinderbreath',
		],
	},
	{
		name: "[Gen 9] Chaos Custom Game",
		searchShow: false,

		mod: 'gen9chaos',
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Multi CG",
		searchShow: false,

		mod: 'gen9chaos',
		gameType: 'multi',
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Fusion Custom Game",
		searchShow: false,

		mod: 'gen9chaosfusion',
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Fusion Doubles CG",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'doubles',
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Fusion FFA CG",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'freeforall',
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Fusion Multi CG",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'multi',
		debug: true,
		battle: {trunc: Math.trunc},
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
];
