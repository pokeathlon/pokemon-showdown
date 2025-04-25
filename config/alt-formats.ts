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
			`- Drizzle ++ Swift Swim`, `- Drought ++ Chlorophyll`, 'Greninja-Bond', 'Greninja-Ash',
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
			'Standard NatDex',
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
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard',
			'move:batonpass', 'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', `- Drizzle ++ Swift Swim`, `- Drought ++ Chlorophyll`, 'Greninja-Bond', 'Greninja-Ash',
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
		name: "[Gen 9] Ins NatDex Draft",
		searchShow: false,

		mod: 'gen9insurgence',
		ruleset: ['Standard NatDex', 'Tera Type Preview', 'Swagger Clause', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'Species Reveal Clause'],
		banlist: ['move:hiddenpower'],
	},
	{
		name: "[Gen 9] Ins NatDex LC Draft",
		searchShow: false,
		mod: 'gen9insurgence',
		ruleset: ['Little Cup', 'Standard NatDex', 'Tera Type Preview', 'Swagger Clause', 'Overflow Stat Mod', 'Item Clause = 2'],
		banlist: [
			'move:revivalblessing', 'move:shedtail', 'move:lastrespects', 'move:achillesheel', 'move:permafrost', 'move:livewire', 'move:nanorepair', 'move:jetstream',
			'ability:moody', 'ability:illuminate', 'ability:winterjoy',
		],
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
			'Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause','Overflow Stat Mod', 'Species Reveal Clause'
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
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Swagger Clause', 'Terastal Clause', 'Z-Move Clause', 'No Event Moves', '+LGPE', 'Species Reveal Clause'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag',
			'item:souldew', 'item:kingsrock', 'item:razorfang',
			'move:batonpass', 'move:electrify', 'move:boomburst', 'move:acupressure',
		],
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
			'move:batonpass', 'move:permafrost', 'move:livewire',
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
		ruleset: ['Standard NatDex', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire',
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
		banlist: ['ND Uber', 'ND AG'],
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
		banlist: ['ND Uber', 'ND AG', 'ND OU'],
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
		section: "Pokéathlon: Gen 2",
		column: 3,
	},
	{
		name: "[Gen 9] [Gen 2] PoA Dex OU",

		mod: 'gen9pokeathlon2',
		ruleset: ['Standard', 'Terastal Clause', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:batonpass',
		],
	},
	{
		name: "[Gen 9] [Gen 2] PoA Dex UU",
		searchShow: false,

		mod: 'gen9pokeathlon2',
		ruleset: ['Standard', 'Terastal Clause', 'Species Reveal Clause'],
		banlist: ['OU', 'UUBL', 'Uber', 'AG'],
	},
	{
		name: "[Gen 9] [Gen 2] PoA Dex AG",
		searchShow: false,

		mod: 'gen9pokeathlon2',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Terastal Clause', 'Species Reveal Clause'],
	},

	{
		section: "Pokéathlon: Gen 1",
		column: 3,
	},
	{
		name: "[Gen 9] [Gen 1] PoA Dex OU",

		mod: 'gen9pokeathlon',
		ruleset: ['Standard', 'Terastal Clause', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang',
			'move:batonpass',
		],
	},
	{
		name: "[Gen 9] [Gen 1] PoA Dex UU",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard', 'Terastal Clause', 'Species Reveal Clause'],
		banlist: ['OU', 'UUBL', 'Uber', 'AG'],
	},
	{
		name: "[Gen 9] [Gen 1] PoA Dex AG",
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
		name: "[Gen 9] [Gen 2] PoA Doubles AG",
		searchShow: false,

		mod: 'gen9pokeathlon2',
		gameType: 'doubles',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Terastal Clause', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] [Gen 1] PoA Doubles AG",
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
		banlist: [],
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
			'Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause','Overflow Stat Mod', 'Species Reveal Clause'
		],
	},
	{
		name: "[Gen 9] Chaos OU",

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag', 'ability:illuminate', 'ability:quickcharge',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:berserkgene', 'item:lightclay', 'item:trickrock', 'item:damprock',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:vanish', 'move:cinderbreath', 'move:livewire', 'move:permafrost', 'move:achillesheel', 'move:acupressure', 'move:fibregraft', 'move:hammerthrow', 'move:supremecannon',
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
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:berserkgene', 'item:lightclay', 'item:trickrock', 'item:damprock',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:vanish', 'move:cinderbreath', 'move:livewire', 'move:permafrost', 'move:achillesheel', 'move:acupressure', 'move:fibregraft', 'move:hammerthrow', 'move:supremecannon',
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
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:lightball', 'item:thickclub', 'item:berserkgene', 'item:deepseascale', 'item:deepseatooth', 'item:managel',
			'ability:hugepower', 'ability:purepower', 'ability:disguise', 'ability:moody', 'ability:contrary', 'ability:simple', 'ability:wonderguard', 'ability:arenatrap', 'ability:powerconstruct', 'ability:shadowtag', 'ability:speedboost', 'ability:imposter', 'ability:comatose', 'ability:triage', 'ability:waterbubble', 'ability:blazeboost', 'ability:athenian', 'ability:furcoat', 'ability:icescales', 'ability:sharpcoral', 'ability:multishot', 'ability:regurgitation', 'ability:lernean', 'ability:purefocus', 'ability:musclememory', 'ability:illuminate', 'ability:atomizate',
			'move:shellsmash', 'move:bellydrum', 'move:lastrespects', 'move:populationbomb', 'move:ragefist', 'move:assist', 'move:batonpass', 'move:shedtail', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'ability:quickcharge', 'move:achillesheel', 'move:metalcruncher', 'move:vanish', 'move:cinderbreath', 'move:fishiousrend', 'move:acupressure',
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
		name: "[Gen 9] Chaos Monotype",
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Same Type Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause'],
		banlist: [
			'Alakazam-Mega', 'Annihilape', 'Arceus', 'Arceus-Primal', 'Archilles-Mega', 'Arkhaos', 'Baxcalibur', 'Blastoise-Mega', 'Blaziken', 'Blaziken-Mega', 'Blissey-Egho', 'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Chuggalong', 
			'Crustle-Delta-Cake', 'Cryogonal-Mega', 'Darkrai', 'Deosectwo', 'Deoxys', 'Deoxys-Attack', 'Diaboromon', 'Dialga', 'Dialga-Origin', 'Dracovish', 'Dragapult', 'Dragonite-Delta', 'Dramsama-Dark-Mega', 'Drilgann-Mega', 'Eevee-Mega', 'Eeveeon', 'Electrode-Mega', 
			'Emolga-Delta', 'Espathra', 'Eternatus', 'Fafninter', 'Feraligatr-Egho', 'Feraligatr-Mega', 'Fidgit', 'Flutter Mane', 'Flymon', 'Frosthra', 'Genesect', 'Gengar-Mega', 'Gigantusk', 'Giratina', 'Giratina-Origin', 'Giratina-Primal', 'Gouging Fire', 'Groudon', 'Groudon-Primal', 
			'Haxorus-Mega', 'Ho-Oh', 'Hoopa-Delta-Unleashed', 'Hoopa-Unbound', 'Hydreigon-Mega', 'Icyall', 'Inflagetah', 'Inflagetah-Mega', 'Iron Bundle', 'Jerbolta-Nuclear', 'Jirachi-Mega', 'Kangaskhan-Mega', 'Kingambit', 'Koraidon', 'Kyodonquaza', 'Kyogre', 'Kyogre-Primal', 'Kyurem-Black', 
			'Kyurem-White', 'Lanthan', 'Lucario-Mega', 'Lugia', 'Lukagon', 'Lunala', 'Machinedramon', 'Magearna', 'MagnaAngemon', 'Marshadow', 'Metagross-Delta-Ruin-Crystal', 'Metagross-Delta-Ruin-Mega', 'Metagross-Delta-Spider-Mega', 'Metagross-Mega', 'MetalEtemon', 'MetalGarurumon', 'Mewthree', 
			'Mewtwo', 'pokemon:mewtwoarmor', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Mewtwo-Shadow', 'Mewtwo-Shadow-Mega-X', 'Miraidon', 'Naganadel', 'Necrozma-Dawn-Wings', 'Necrozma-Dusk-Mane', 'Nucleon', 'Oculeus', 'Ogerpon-Hearthflame', 'Okuwamon', 'Omnimon', 'Palafin', 'Paldiatina', 'Palkia', 'Palkia-Origin', 
			'Pheromosa', 'Raffiti', 'Rayquaza', 'Rayquaza-Mega', 'Reaptide', 'Regigigas-Primal', 'Reshiram', 'Reuniclus-Mega', 'SaberLeomon', 'Salamence-Mega', 'Scizor-Delta-Mega', 'Seikamater', 'Shaymin-Sky', 'SkullGreymon', 'Solgaleo', 'Swamptiliken', 'UFI', 'Urshifu', 'Vareon', 'Volcarona-Delta', 
			'pokemon:volcaronadeltaarmor', 'WarGreymon', 'Xerneas', 'Yatagaryu', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zekrom', 'pokemon:zekromarmor', 'Zekyushiram', 'Zudomon', 'Zygarde', 'Zygarde-Complete',
			'ability:illuminate', 'ability:moody', 'ability:powerconstruct', 'ability:quickcharge','ability:shadowtag',
			'item:boosterenergy', 'item:damprock', 'item:focusband', 'item:heatrock', 'item:icyrock', 'item:kingsrock', 'item:lightclay', 'item:quickclaw', 'item:razorfang', 'item:smoothrock', 'item:terrainextender', 'item:trickrock',
			'move:acupressure', 'move:achillesheel', 'move:assist', 'move:batonpass', 'move:cinderbreath', 'move:electrify', 'move:fibregraft', 'move:jumpship', 'move:lastrespects', 'move:livewire', 'move:permafrost', 'move:shedtail', 'move:swagger', 'move:wildfire'
		],
	},
	{
		name: "[Gen 9] Chaos AAA",
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Same Type Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', '!Sleep Clause Mod', 'Sleep Moves Clause', 'Species Reveal Clause', '!Obtainable Abilities', 'Ability Clause = 1', 'Z-Move Clause'],
		banlist: [
			'Alakazam-Mega', 'Annihilape', 'Arceus', 'Arceus-Primal', 'Archeops', 'Arkhaos', 'Archilles-Mega', 'Annihilape', 'Archeops', 'Baxcalibur', 'Blacephalon', 'Blastoise-Mega', 'Blaziken-Mega', 'Blissey-Egho', 
			'Calyrex-Ice', 'Calyrex-Shadow', 'Chi-Yu', 'Chien-Pao', 'Cryogonal-Mega', 'Darkrai', 'Deosectwo', 'Deoxys', 'Deoxys-Attack', 'Diaboromon', 'Dialga', 'Dialga-Origin', 'Dragapult', 'Dracovish', 'Dramsama-Dark-Mega', 
			'Drilgann-Mega', 'Electrode-Mega', 'Emolga-Delta', 'Eternatus', 'Feraligatr-Mega', 'Flutter Mane', 'Genesect', 'Gengar-Mega', 'Giratina', 'Giratina-Origin', 'Giratina-Primal', 'Gouging Fire', 'Groudon', 'Groudon-Primal', 
			'Haxorus-Mega', 'Ho-Oh', 'Hoopa-Delta-Unleashed', 'Hoopa-Unbound', 'Hydreigon-Mega', 'Infermon', 'Inflagetah', 'Inflagetah-Mega', 'Iron Bundle', 'Iron Valiant', 'Jirachi-Mega', 'Kangaskhan-Mega', 'Kingambit', 'Keldeo', 'Koraidon', 
			'Kyodonquaza', 'Kyogre', 'Kyogre-Primal', 'Kyurem', 'Kyurem-Black', 'Kyurem-White', 'Lanthan', 'Lucario-Mega', 'Lugia', 'Lunala', 'Machinedramon', 'Magearna', 'MagnaAngemon', 'Marshadow', 'Metagross-Delta-Ruin-Crystal', 'Metagross-Delta-Ruin-Mega', 
			'Metagross-Delta-Spider-Mega', 'Metagross-Mega', 'MetalEtemon', 'MetalGarurumon', 'Mewthree', 'Mewtwo', 'pokemon:mewtwoarmor', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Mewtwo-Shadow', 'Mewtwo-Shadow-Mega-X', 'Miraidon', 'Naganadel', 'Necrozma-Dawn-Wings', 
			'Necrozma-Dusk-Mane', 'Oculeus', 'Okuwamon', 'Omnimon', 'Paldiatina', 'Palkia', 'Palkia-Origin', 'Pheromosa', 'Piximon', 'Raffiti', 'Rayquaza', 'Rayquaza-Mega', 'Reaptide', 'Regigigas', 'Regigigas-Primal', 'Reshiram', 'Reuniclus-Mega', 
			'SaberLeomon', 'Salamence-Mega', 'Seikamater', 'Shaymin-Sky', 'SkullGreymon', 'Solgaleo', 'Sonic', 'Spectrier', 'Urshifu', 'Urshifu-Rapid-Strike', 'Volcarona-Delta', 'pokemon:volcaronadeltaarmor', 'WarGreymon', 'Weavile', 'Xerneas', 'Xurkitree', 
			'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zeraora', 'Zekrom', 'pokemon:zekromarmor', 'Zekyushiram', 'Zudomon', 'Zygarde', 'Zygarde-Complete',
			'ability:acceleration', 'ability:ancientpresence', 'ability:atomizate', 'ability:athenian', 'ability:arenatrap', 'ability:blazeboost', 'ability:bushido', 'ability:chaosemeralds', 'ability:chlorofury', 'ability:chernobyl', 'ability:comatose', 
			'ability:contrary', 'ability:deepfreeze', 'ability:eventhorizon', 'ability:fairylaw', 'ability:furcoat', 'ability:goodasgold', 'ability:gorillatactics', 'ability:hueshift', 'ability:icescales', 'ability:illusion', 'ability:imposter', 'ability:infuriate', 
			'ability:innardsout', 'ability:irrelephant', 'ability:lernean', 'ability:magnetpull', 'ability:magicbounce', 'ability:moody', 'ability:multishot', 'ability:musclememory', 'ability:necromancy', 'ability:neutralizinggas', 'ability:omnitype', 
			'ability:orichalcumpulse', 'ability:parentalbond', 'ability:periodicorbit', 'ability:persistent', 'ability:poisonheal', 'ability:purefocus', 'ability:purepower', 'ability:quickcharge', 'ability:shadowtag', 'ability:simple', 'ability:sleet', 
			'ability:speedboost', 'ability:speedswap', 'ability:stakeout', 'ability:stormbringer', 'ability:toxicdebris', 'ability:triage', 'ability:unburden', 'ability:unleafed', 'ability:waterbubble', 'ability:wonderguard',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:trickrock',
			'move:achillesheel', 'move:assist', 'move:batonpass', 'move:cinderbreath', 'move:electrify', 'move:fibregraft', 'move:hammerthrow', 'move:lastrespects', 'move:livewire', 'move:permafrost', 'move:shedtail', 'move:sleepmoves', 'move:swagger'
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
];
