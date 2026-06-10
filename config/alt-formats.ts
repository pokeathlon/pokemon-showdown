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
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Sleep Moves Clause', 'DryPass Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drizzle', 'ability:drought', 'ability:sandstream', 'ability:snowwarning',
			'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate', 'move:electrify', 'move:quiverdance',
			'pokemon:greninjabond', 'pokemon:greninjaash',
		],
	},
	{
		name: "[Gen 7] IF Dex Ubers",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen7infinitefusion',
		ruleset: [
			'Obtainable', 'Team Preview', 'Evasion Clause', 'OHKO Clause', 'Sleep Clause Mod', 'Z-Move Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', 'DryPass Clause',
		],
		banlist: [
			'Mega',
			'ability:hugepower', 'ability:moody', 'ability:wonderguard', 'ability:shadowtag', 'ability:arenatrap', 'ability:imposter',
			'move:spore', 'move:bellydrum', 'move:shellsmash', 'move:vcreate',
		],
	},
	{
		name: "[Gen 7] IF Dex UU",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Sleep Moves Clause', 'DryPass Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drizzle', 'ability:drought', 'ability:sandstream', 'ability:snowwarning',
			'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate', 'move:electrify',
			'pokemon:greninjabond', 'pokemon:greninjaash',
			'OU', 'UUBL',
			'item:necrozium',
			'ability:contrary',
		],
	},
	{
		name: "[Gen 7] IF Dex RU",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Sleep Moves Clause', 'DryPass Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drizzle', 'ability:drought', 'ability:sandstream', 'ability:snowwarning',
			'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate', 'move:electrify',
			'pokemon:greninjabond', 'pokemon:greninjaash',
			'OU', 'UUBL', 'UU', 'RUBL',
			'item:necrozium',
			'ability:contrary',
			'move:quiverdance',
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
			'Standard NatDex', '!Species Clause', 'Z-Move Clause', 'Ability Clause = 1', 'DryPass Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'ND AG', 'ND Uber',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:hugepower', 'ability:purepower', 'ability:disguise', 'ability:moody', 'ability:contrary', 'ability:simple', 'ability:wonderguard', 'ability:arenatrap', 'ability:powerconstruct', 'ability:shadowtag', 'ability:speedboost', 'ability:imposter', 'ability:comatose', 'ability:triage', 'ability:waterbubble',
			'move:shellsmash', 'move:bellydrum', 'move:lastrespects', 'move:populationbomb', 'move:ragefist', 'move:assist', 'move:shedtail', 'move:geomancy', 'move:doubleironbash', 'move:spore',
		],
	},
	{
		name: "[Gen 9] IF National Dex Ubers",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen9infinitefusion',
		ruleset: [
			'Standard NatDex', 'DryPass Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'ND AG',
			'item:gengarite', 'item:medichamite', 'item:mawilite', 'item:kangaskhanite',
			'ability:hugepower', 'ability:purepower', 'ability:arenatrap', 'ability:moody', 'ability:wonderguard', 'ability:shadowtag', 'ability:parentalbond', 'ability:comatose', 'ability:hadronengine', 'ability:orichalcumpulse',
			'move:spore', 'move:bellydrum', 'move:shellsmash', 'move:ragefist', 'move:lastrespects', 'move:assist', 'move:doubleironbash',
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
			'ability:wonderguard', 'ability:hugepower', 'ability:shadowtag', 'ability:imposter', 'ability:contrary',
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
			'move:geomancy', 'move:afteryou', 'move:clangoroussoul', 'move:lastrespects', 'move:bellydrum', 'move:shellsmash', 'move:ragefist', 'move:spore',
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
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Fusion Same Type Clause', 'DryPass Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drought', 'ability:drizzle',
			'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', `- Drizzle ++ Swift Swim`, `- Drought ++ Chlorophyll`, 'Greninja-Bond', 'Greninja-Ash',
		],
	},
	{
		name: "[Gen 7] New Lands",
		desc: "Welcome to Hoenn!",

		mod: 'gen7infinitefusionhoenn',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Sleep Moves Clause', 'DryPass Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause', 'IF New Lands Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drizzle', 'ability:drought', 'ability:sandrush', 'ability:adaptability', 'ability:purepower',
			'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate', 'move:electrify',
			'pokemon:greninjabond', 'pokemon:greninjaash',
		],
	},
	{
		name: "[Gen 7] IF 2 Abilities",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Sleep Moves Clause', 'DryPass Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Double Ability Mod', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drizzle', 'ability:drought', 'ability:sandstream', 'ability:snowwarning',
			'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate', 'move:electrify', 'move:quiverdance',
			'pokemon:greninjabond', 'pokemon:greninjaash',
		],
	},
	{
		name: "[Gen 7] IF 2 Abilities AG",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",
		searchShow: false,

		mod: 'gen7infinitefusion',
		ruleset: [
			'Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Z-Move Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Double Ability Mod',
		],
		banlist: ['Mega'],
	},
	{
		name: "[Gen 7] IF RevelationMons",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen7infinitefusion',
		ruleset: [
			'Standard', 'Evasion Abilities Clause', 'Z-Move Clause', '!Species Clause', 'Sleep Moves Clause', 'RevelationMons mod', 'DryPass Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'Mega', 'Uber',
			'item:kingsrock', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:arenatrap', 'ability:shadowtag', 'ability:speedboost', 'ability:disguise', 'ability:imposter', 'ability:hugepower', 'ability:wonderguard', 'ability:drizzle', 'ability:drought', 'ability:sandstream', 'ability:snowwarning',
			'move:shellsmash', 'move:bellydrum', 'move:geomancy', 'move:facade', 'move:extremespeed', 'move:doubleironbash', 'move:spore', 'move:boomburst', 'move:vcreate', 'move:electrify', 'move:quiverdance',
			'pokemon:greninjabond', 'pokemon:greninjaash',
		],
	},
	{
		name: "[Gen 7] IF Literally 1984",
		desc: `There are no bans! Just a few clauses... (Use "/rule [clausename]" in any chat to see what each clause does)`,

		mod: 'gen7infinitefusion',
		ruleset: [
			'Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Z-Move Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause',
			'No Fun Clause', 'No Evading Clause', 'No Extreme Gimmicks Clause', 'No Trapping Clause',
			'No Dancing Clause', 'No Dance Partners Clause',
			'No Extreme Stats Clause', 'No Limit Breaking Clause', 'No Nukes Clause', 'No Weather Combos Clause',
		],
		banlist: [
			'Mega',
		],
	},
	{
		name: "[Gen 9] IF NatDex Mix and Mega",
		desc: `Pokemon can use any Mega Stone. Each Mega Stone gives the same base stat bonuses to any Pokemon.`,
		searchShow: false,

		mod: 'gen9infinitefusion',
		ruleset: [
			"Mix and Mega Mod",
			'Standard NatDex', '!Species Clause', 'Z-Move Clause', 'Ability Clause = 1', 'DryPass Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', '!Nickname Clause',
		],
		banlist: [
			'ND AG',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:lightball', 'item:thickclub',
			'ability:hugepower', 'ability:purepower', 'ability:disguise', 'ability:moody', 'ability:contrary', 'ability:simple', 'ability:wonderguard', 'ability:arenatrap', 'ability:powerconstruct', 'ability:shadowtag', 'ability:speedboost', 'ability:imposter', 'ability:comatose', 'ability:triage', 'ability:waterbubble',
			'move:shellsmash', 'move:bellydrum', 'move:lastrespects', 'move:populationbomb', 'move:ragefist', 'move:assist', 'move:shedtail', 'move:geomancy', 'move:doubleironbash', 'move:spore',
		],
	},
	{
		name: "[Gen 9] IF Custom Game",

		mod: 'gen9infinitefusion',
		searchShow: false,
		debug: true,
		battle: { trunc: Math.trunc },
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod'],
	},
	{
		name: "[Gen 7] IF Custom Game",

		mod: 'gen7infinitefusion',
		searchShow: false,
		debug: true,
		battle: { trunc: Math.trunc },
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod'],
	},

	{
		section: "Drafts",
	},
	{
		name: "[Gen 9] IF NatDex Draft",
		searchShow: false,

		mod: 'gen9infinitefusion',
		ruleset: [
			'Standard NatDex',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', '!Nickname Clause', '+ Future',
			'+item:barbaracite', '+item:chandelurite', '+item:chesnaughtite', '+item:clefablite', '+item:delphoxite', '+item:dragalgite', '+item:dragoninite', '+item:drampanite',
			'+item:eelektrossite', '+item:emboarite', '+item:excadrite', '+item:falinksite', '+item:feraligite', '+item:floettite', '+item:froslassite', '+item:greninjite',
			'+item:hawluchanite', '+item:malamarite', '+item:meganiumite', '+item:pyroarite', '+item:scolipite', '+item:scraftinite', '+item:skarmorite', '+item:starminite',
			'+item:victreebelite', '+item:zygardite',
			'+pokemon:floetteeternal',
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
		ruleset: ['Standard NatDex', 'Tera Type Preview', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'Species Reveal Clause', '!Species Clause'],
		banlist: ['move:hiddenpower', 'move:swagger'],
	},
	{
		name: "[Gen 9] Ins HBF LC Draft",
		searchShow: false,

		mod: 'gen9insurgence',
		ruleset: ['Standard NatDex', 'Tera Type Preview', 'Default Level = 5', 'Overflow Stat Mod', 'Species Reveal Clause', '!Species Clause', 'Little Cup', 'Item Clause = 2'],
		banlist: [],
	},
	{
		name: "[Gen 9] Chaos Draft",
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Mega Forme Clause', '+CAP', '+item:crucibellite', '+item:vilevial', 'Terastal Clause', '+item:berserkgene', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos LC Draft",
		mod: 'gen9chaos',
		searchShow: false,
		teraPreviewDefault: true,
		ruleset: ['[Gen 9] Chaos Draft', 'Little Cup'],
		banlist: [],
	},
	{
		name: "[Gen 9] Mariomon Draft",
		mod: 'gen9mariomon',
		searchShow: false,
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Terastal Clause', 'Z-Move Clause', 'No Event Moves', '+LGPE', 'Species Reveal Clause'],
		banlist: ['move:swagger'],
	},
	{
		name: "[Gen 9] Mariomon VGC Draft",
		mod: 'gen9mariomon',
		gameType: 'doubles',

		bestOfDefault: true,
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Open Team Sheets', 'Terastal Clause', 'Z-Move Clause', '+LGPE', 'Double Ability Mod'],
	},

	{
		section: "Super Mariomon!",
		column: 2,
	},
	{
		name: "[Gen 9] Mariomon VGC Randbat",

		mod: 'gen9mariomon',
		team: 'random',
		gameType: 'doubles',
		ruleset: [
			'Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'HP Percentage Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause', 'Overflow Stat Mod', 'Species Reveal Clause',
		],
	},
	{
		name: "[Gen 9] Mariomon Random Battle",

		mod: 'gen9mariomon',
		team: 'random',
		ruleset: [
			'Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause', 'Overflow Stat Mod', 'Species Reveal Clause',
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
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Terastal Clause', 'Z-Move Clause', 'No Event Moves', '+LGPE', 'Species Reveal Clause'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag',
			'item:souldew', 'item:kingsrock', 'item:razorfang', 'item:quickclaw', 'item:damprock',
			'move:batonpass', 'move:swagger', 'move:shedtail', 'move:boomburst'
		],
	},
	{
		name: "[Gen 9] Mariomon Ubers",

		mod: 'gen9mariomon',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Terastal Clause', 'Z-Move Clause', 'No Event Moves', '+LGPE', 'Species Reveal Clause'],
		banlist: [
			'AG',
			'move:batonpass', 'move:swagger',
		],
	},
	{
		name: "[Gen 9] Mariomon UU",

		mod: 'gen9mariomon',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Terastal Clause', 'Z-Move Clause', 'No Event Moves', '+LGPE', 'Species Reveal Clause'],
		banlist: [
			'AG', 'Uber', 'OU', 'UUBL',
			'ability:arenatrap', 'ability:shadowtag',
			'item:souldew', 'item:kingsrock', 'item:razorfang', 'item:quickclaw', 'item:damprock',
			'move:batonpass', 'move:electrify', 'move:boomburst', 'move:swagger',
		],
	},
	{
		name: "[Gen 9] Mariomon LC",

		mod: 'gen9mariomon',
		ruleset: ['Standard NatDex', 'Little Cup', 'Terastal Clause', 'Z-Move Clause', 'Species Reveal Clause', 'Baton Pass Stat Trap Clause'],
		banlist: ['pokemon:gushen', 'move:electrify', 'item:kingsrock'],
	},
	{
		name: "[Gen 9] Mariomon Monotype",
		searchShow: false,

		mod: 'gen9mariomon',
		ruleset: ['Standard', 'Evasion Abilities Clause', 'Terastal Clause', 'Z-Move Clause', 'No Event Moves', '+LGPE', 'Species Reveal Clause', 'Same Type Clause'],
		banlist: [
			'pokemon:superfly', 'pokemon:peteypiranha', 'pokemon:gushen', 'pokemon:sonic', 'pokemon:hooktail', 'pokemon:tiptron',
			'ability:arenatrap', 'ability:shadowtag',
			'move:batonpass', 'move:electrify', 'move:boomburst', 'move:swagger',
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
		battle: { trunc: Math.trunc },
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
		ruleset: ['Standard', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag',
			'item:souldew',
			'move:batonpass', 'move:permafrost', 'move:livewire', "move:achillesheel", 'move:swagger',
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
		ruleset: ['Standard NatDex', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause', 'Terastal Clause'],
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
			'Standard AG', 'NatDex Mod', 'Max Level = 120', 'Default Level = 120', 'Overflow Stat Mod', 'No Event Moves', 'Species Reveal Clause',
		],
	},
	{
		name: "[Gen 9] Ins Custom Game",

		mod: 'gen9insurgence',
		searchShow: false,
		debug: true,
		battle: { trunc: Math.trunc },
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
		ruleset: ['Standard', 'Nuclear Clause', 'Species Reveal Clause'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag',
			'item:souldew',
			'move:batonpass', 'move:swagger',
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
		battle: { trunc: Math.trunc },
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
		ruleset: ['Obtainable', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod', 'Illusion Level Mod', 'Species Reveal Clause', '+ Future'],
	},
	{
		name: "[Gen 6] Infinity OU",

		mod: 'gen6infinity',
		ruleset: ['Standard', 'Baton Pass Clause', 'No Event Moves', 'Overflow Stat Mod', 'Species Reveal Clause', '+ Future'],
		banlist: [
			'AG', 'Uber',
			'ability:arenatrap', 'ability:shadowtag', 'ability:purefocus',
			'item:souldew',
			'move:vanish', 'move:cinderbreath', 'move:swagger',
		],
	},
	{
		name: "[Gen 6] Infinity AG",
		searchShow: false,

		mod: 'gen6infinity',
		ruleset: ['Obtainable', 'Team Preview', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'No Event Moves', 'Species Reveal Clause', '+ Future'],
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
		battle: { trunc: Math.trunc },
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 6] Inf Doubles CG",

		mod: 'gen6infinity',
		searchShow: false,
		debug: true,
		gameType: "doubles",
		battle: { trunc: Math.trunc },
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 6] Inf Custom Game",

		mod: 'gen6infinity',
		searchShow: false,
		debug: true,
		battle: { trunc: Math.trunc },

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
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', 'Species Reveal Clause', 'Mega Forme Clause'],
		banlist: [
			'ND Uber', 'ND AG',
			'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire', 'move:newmoon', 'move:achillesheel',
			'ability:arenatrap', 'ability:moody', 'ability:shadowtag', 'ability:multishot',
			'item:razorfang', 'item:kingsrock', 'item:focusband', 'item:quickclaw', 'item:lightclay', 'item:trickrock',
			'item:hafliberry', 'item:goombaboots', 'item:sturdyshell', 'item:mankeyspaw', 'item:necrozium', 'item:darkrock',
		],
	},
	{
		name: "[Gen 9] PoA UU",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['[Gen 9] PoA OU'],
		banlist: [
			'ND OU', 'ND UUBL',
		],
	},
	{
		name: "[Gen 9] PoA AG",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Standard AG', 'NatDex Mod', 'Terastal Clause', 'Species Reveal Clause', 'Mega Forme Clause'],
	},

	{
		section: "Pokéathlon: Season 2",
		column: 3,
	},
	{
		name: "[Gen 9] PoA OU S2",

		mod: 'gen9pokeathlon',
		ruleset: ['Standard', 'Terastal Clause', 'Species Reveal Clause', '+move:hiddenpower', 'Mega Forme Clause'],
		banlist: [
			'Uber', 'AG',
			'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire', 'move:achillesheel', 'move:glare',
			'ability:arenatrap', 'ability:moody', 'ability:shadowtag', 'ability:multishot', 'ability:sandveil', 'ability:snowcloak', 'ability:asabove',
			'item:razorfang', 'item:kingsrock', 'item:focusband', 'item:quickclaw', 'item:trickrock',
			'item:hafliberry', 'item:goombaboots', 'item:sturdyshell', 'item:mankeyspaw', 'item:necrozium',
		],
	},
	{
		name: "[Gen 9] PoA UU S2",

		mod: 'gen9pokeathlon',
		ruleset: ['[Gen 9] PoA OU S2'],
		banlist: [
			'OU', 'UUBL',
		],
	},
	{
		name: "[Gen 9] PoA AG S2",
		searchShow: false,

		mod: 'gen9pokeathlon',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Terastal Clause', 'Species Reveal Clause', 'Mega Forme Clause'],
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
		name: "[Gen 9] PoA VGC",
		mod: 'gen9pokeathlon',
		bestOfDefault: true,
		gameType: "doubles",
		ruleset: ['Obtainable', 'Team Preview', 'Species Clause', 'Nickname Clause', 'Item Clause = 1', 'Picked Team Size = Auto', 'Cancel Mod', 'Adjust Level = 50', 'VGC Timer', 'NatDex Mod', 'Terastal Clause', 'Z-Move Clause', 'Mega Forme Clause'],
		banlist: [
			'item:trickrock', 'item:hafliberry', 'item:goombaboots', 'item:sturdyshell', 'item:mankeyspaw', 'item:necrozium',
		],
	},
	{
		name: "[Gen 9] PoA Doubles AG S2",
		searchShow: false,

		mod: 'gen9pokeathlon',
		gameType: 'doubles',
		ruleset: ['Min Source Gen = 9', 'Obtainable', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause', 'Terastal Clause', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] PoA S2 VGC",
		mod: 'gen9pokeathlon',
		bestOfDefault: true,
		gameType: "doubles",
		ruleset: ['Flat Rules', '!! Adjust Level = 50', 'VGC Timer', 'Terastal Clause', 'Z-Move Clause', 'Mega Forme Clause'],
		banlist: [
			'pokemon:tyranitardeltamega',
			'item:trickrock', 'item:hafliberry', 'item:goombaboots', 'item:sturdyshell', 'item:mankeyspaw', 'item:necrozium',
		],
	},

	{
		section: "Pokéathlon: Extras",
		column: 3,
	},
	{
		name: "[Gen 9] PoA Fusions",

		mod: 'gen9pokeathlon',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Z-Move Clause', '!Species Clause', 'Sleep Moves Clause',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Fusion Species Clause', '!Nickname Clause'],
		banlist: [
			'ND AG',
			'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:permafrost', 'move:livewire', 'move:newmoon', 'move:achillesheel', 'move:quiverdance', 'move:spore', 'move:bellydrum', 'move:doubleironbash', 'move:electrify', 'move:geomancy', 'move:shellsmash',
			'ability:arenatrap', 'ability:moody', 'ability:shadowtag', 'ability:multishot', 'ability:musclememory', 'ability:inertia', 'ability:asabove', 'ability:contrary', 'ability:speedboost', 'ability:furcoat', 'ability:vaporization', 'ability:lernean', 'ability:adaptability',
			'item:razorfang', 'item:kingsrock', 'item:focusband', 'item:quickclaw', 'item:lightclay', 'item:trickrock',
			'item:hafliberry', 'item:goombaboots', 'item:sturdyshell', 'item:mankeyspaw', 'item:necrozium', 'item:darkrock',
			'pokemon:electrodemega', 'pokemon:sceptiledeltamega', 'pokemon:tyranitardeltamega', 'pokemon:blazikendeltamega', 'pokemon:florgesmega', 'pokemon:snorlaxfrostmega', 'pokemon:suicunesupra',
			'Comatose + Sleep Talk',
		],
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
		name: "[Gen 9] PoA Custom Game",

		mod: 'gen9pokeathlon',
		searchShow: false,
		debug: true,
		battle: { trunc: Math.trunc },
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
			'Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause', 'Overflow Stat Mod', 'Species Reveal Clause',
		],
	},
	{
		name: "[Gen 9] Chaos OU",

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause', 'Restrict Ability = wonderguard'],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag', 'ability:illuminate', 'ability:quickcharge',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:berserkgene', 'item:lightclay', 'item:trickrock', 'item:damprock', 'item:heatrock', 'item:darkrock',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:vanish', 'move:cinderbreath', 'move:livewire', 'move:permafrost', 'move:achillesheel', 'move:hammerthrow', 'move:supremecannon', 'move:nimbusfist',
			'move:zippyzap', 'MegaKabuterimon + Speed Boost',
		],
	},
	{
		name: "[Gen 9] Chaos AG",
		searchShow: false,

		mod: 'gen9chaos',
		ruleset: [
			'Standard AG', 'NatDex Mod', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'Species Reveal Clause',
		],
	},
	{
		name: "[Gen 9] Chaos Ubers",

		mod: 'gen9chaos',
		ruleset: ['Standard NatDex', 'Terastal Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause', 'Restrict Ability = wonderguard'],
		banlist: [
			'ND AG',
			'ability:illuminate', 'ability:deepfreeze', 'ability:persistent', 'ability:atomizate', 'ability:multishot', 'ability:illusionist',
			'item:focusband', 'item:lightclay', 'item:trickrock', 'item:reuniclite',
			'move:achillesheel', 'move:assist', 'move:batonpass', 'move:cinderbreath', 'move:livewire', 'move:permafrost', 'move:hammerthrow', 'move:omniblast', 'move:supremecannon',
		],
	},
	{
		name: "[Gen 9] Chaos UU",

		mod: 'gen9chaos',
		ruleset: ['[Gen 9] Chaos OU'],
		banlist: [
			'ND OU', 'ND UUBL',
			'item:smoothrock', 'item:icyrock',
		],
	},
	{
		name: "[Gen 9] Chaos Fusions OU",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen9chaosfusion',
		ruleset: [
			'Standard NatDex', '!Species Clause', 'Z-Move Clause', 'Ability Clause = 1', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', '!Nickname Clause', 'Sketch Clause', 'Nuclear Move Clause', 'Overflow Stat Mod', 'Sleep Moves Clause',
		],
		banlist: [
			'ND AG', 'ND Uber',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:lightball', 'item:thickclub', 'item:berserkgene', 'item:deepseascale', 'item:deepseatooth', 'item:managel', 'item:anchor', 'item: trickrock', 'item:dragonfang', 'item:floettite',
			'ability:hugepower', 'ability:purepower', 'ability:disguise', 'ability:moody', 'ability:contrary', 'ability:simple', 'ability:wonderguard', 'ability:arenatrap', 'ability:powerconstruct', 'ability:shadowtag', 'ability:speedboost', 'ability:imposter', 'ability:comatose', 'ability:inertia', 'ability:stormbringer', 'ability:goodasgold', 'ability:noctem','ability:quickcharge', 'ability:cannoneer',
			'ability:triage', 'ability:waterbubble', 'ability:blazeboost', 'ability:athenian', 'ability:furcoat', 'ability:icescales', 'ability:sharpcoral', 'ability:multishot', 'ability:regurgitation', 'ability:lernean', 'ability:purefocus', 'ability:musclememory', 'ability:illuminate', 'ability:atomizate', 'ability: unburden', 'ability:asabove', 'ability:simplyevil', 'ability:illusionist', 'ability:grandentrance',
			'move:shellsmash', 'move:bellydrum', 'move:lastrespects', 'move:populationbomb', 'move:ragefist', 'move:assist', 'move:batonpass', 'move:shedtail', 'move:geomancy', 'move:doubleironbash', 'move:spore', 'move:bittermalice',
			'move:achillesheel', 'move:metalcruncher', 'move:vanish', 'move:cinderbreath', 'move:fishiousrend', 'move:hammerthrow', 'move:permafrost', 'move:livewire', 'move:electrify', 'move:vcreate', 'move:subduction', 'move:direclaw', 'move:granite', 'move:cherryblast',
		],
	},
	{
		name: "[Gen 9] Chaos Fusions UU",
		desc: "Pok&eacute;mon can fuse with other Pok&eacute;mon!",

		mod: 'gen9chaosfusion',
		ruleset: ['[Gen 9] Chaos Fusions OU'],
		banlist: [
			'ND OU', 'ND UUBL',
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
		name: "[Gen 9] Chaos Doubles Randbat",
		desc: `Randomized teams of Pok&eacute;mon with sets that are generated to be competitively viable.`,

		mod: 'gen9chaos',
		gameType: 'doubles',
		team: 'random',
		ruleset: [
			'Obtainable', 'HP Percentage Mod', 'Cancel Mod', 'Sleep Clause Mod', 'Illusion Level Mod', 'Terastal Clause', 'Overflow Stat Mod', 'Species Reveal Clause',
		],
	},
	{
		name: "[Gen 9] Chaos Doubles OU",
		searchShow: false,

		mod: 'gen9chaos',
		gameType: 'doubles',
		ruleset: [
			'Standard NatDex', 'Terastal Clause', 'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause',
		],
		banlist: [
			'DUber',
			'move:assist', 'move:cinderbreath', 'move:coaching', 'move:darkvoid', 'move:jetstream', 'move:livewire', 'move:permafrost', 'move:supremecannon', 'move:swagger',
			'ability:commander', 'ability:illuminate', 'ability:inertia', 'ability:powerconstruct', 'ability:quickcharge',
			'item:berserkgene', 'item:eeviumz', 'item:focusband', 'item:kingsrock', 'item:lightclay', 'item:quickclaw', 'item:razorfang', 'item:trickrock',
			'Prankster + After You',
		],
	},
	{
		name: "[Gen 9] Chaos Mix and Mega",

		mod: 'gen9chaos',
		ruleset: [
			"Mix and Mega Mod",
			'Standard NatDex', 'Terastal Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause', 'Restrict Ability = wonderguard',
		],
		banlist: [
			'ND AG',
			'pokemon:arkhaos', 'pokemon:calyrexshadowrider', 'pokemon:diaboromon', 'pokemon:fidgit', 'pokemon:frosthra', 'pokemon:icyall', 'pokemon:koraidon', 'pokemon:miraidon', 'pokemon:nucleon', 'pokemon:omnimon', 'pokemon:raffiti', 'pokemon:raffitiratthew', 'pokemon:reaptide', 'pokemon:sonic', 'pokemon:supersonic', 'pokemon:drybones', 'pokemon:shedinja',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag', 'ability:illuminate', 'ability:quickcharge', 'ability:eventhorizon',
			'move:lastrespects', 'move:shedtail', 'move:vanish', 'move:cinderbreath', 'move:livewire', 'move:permafrost', 'move:achillesheel', 'move:batonpass',
			'item:kingsrock', 'item:trickrock', 'item:focusband',
			'item:beedrillite', 'item:blazikenite', 'item:cryogonalite', 'item:donphanite', 'item:electrodite', 'item:eevite', 'item:froslassitei', 'item:gengarite', 'item:hydreigonite',
			'item:inflagetite', 'item:kangaskhanite', 'item:marowakite', 'item:mawilite', 'item:deltamawilite', 'item:medichamite', 'item:deltamedichamite',
			'item:shadowmewtwonitex', 'item:pidgeotite', 'item:reuniclite', 'item:stunfiskite', 'item:sunflorite', 'item:deltasunflorite', 'item:zygardite', 'item:corrupteddata',
		],
		restricted: [
			'Arceus', 'Basculegion-M', 'Blissey-Egho', 'Calyrex-Ice', 'Chansey-Egho', 'Crustle-Delta-Cake', 'Deosectwo', 'Deoxys-Attack', 'Deoxys-Base', 'Dialga', 'Eternatus', 'Flutter Mane', 'Gengar', 'Giratina', 'Gigantusk', 'Gouging Fire', 'Groudon', 'Ho-Oh', 'Hoopa-Delta-Unleashed',
			'Infermon', 'Inflagetah', 'Iron Bundle', 'Kyodonquaza', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Lukagon', 'Lunala', 'MagnaAngemon', 'Marshadow', 'Manaphy', 'Melmetal', 'Machinedramon', 'Naganadel', 'MetalEtemon', 'Mewtwo', 'Mewtwo-Shadow', 'Mewthree', 'Necrozma-Dawn-Wings',
			'Necrozma-Dusk-Mane', 'Oculeus', 'Okuwamon', 'Palkia', 'Rayquaza', 'Reshiram', 'Regigigas', 'SaberLeomon', 'Seikamater', 'Shedinja', 'Slaking', 'Solgaleo', 'Sneasler', 'SkullGreymon', 'Ursaluna-Bloodmoon', 'Urshifu-Single-Strike', 'Urshifu-Rapid-Strike', 'Ufi', 'Volcarona-Delta', 'Xerneas',
			'Yatagaryu', 'Yveltal', 'WarGreymon', 'Zacian', 'Zekrom', 'Zekyushiram', 'Mew', 'Paldiatina', 'Piedmon', 'MetalGarurumon', 'MetalSeadramon', 'Jupiter', 'Mars', 'Myotismon', 'Venus', 'Mercury', 'YatagaryuGossamir', 'Puppetmon',
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
			'Necrozma-Dusk-Mane', 'Necrozma-Ultra', 'Oculeus', 'Okuwamon', 'Omnimon', 'Paldiatina', 'Palkia', 'Palkia-Origin', 'Pheromosa', 'Piximon', 'Raffiti', 'Raffiti-Ratthew', 'Rayquaza', 'Rayquaza-Mega', 'Regigigas', 'Regigigas-Primal', 'Reshiram', 'Reuniclus-Mega',
			'SaberLeomon', 'Salamence-Mega', 'Seikamater', 'Shaymin-Sky', 'SkullGreymon', 'Solgaleo', 'Sonic', 'Spectrier', 'Stratagem', 'Terapagos-Stellar', 'Typhlosion-Delta-Mega', 'Urshifu', 'Urshifu-Rapid-Strike', 'Volcarona-Delta', 'pokemon:volcaronadeltaarmor',
			'WarGreymon', 'Xerneas', 'Xurkitree', 'Yatagaryu', 'Yatagaryu-Gossamir', 'Yveltal', 'Zacian', 'Zacian-Crowned', 'Zamazenta', 'Zamazenta-Crowned', 'Zeraora', 'Zekrom', 'pokemon:zekromarmor', 'Zekyushiram', 'Zudomon', 'Zygarde', 'Zygarde-Complete',
			'ability:acceleration', 'ability:ancientpresence', 'ability:atomizate', 'ability:athenian', 'ability:arenatrap', 'ability:blazeboost', 'ability:bushido', 'ability:chaosemeralds', 'ability:chlorofury', 'ability:chernobyl', 'ability:comatose',
			'ability:contrary', 'ability:deepfreeze', 'ability:eventhorizon', 'ability:furcoat', 'ability:goodasgold', 'ability:gorillatactics', 'ability:hueshift', 'ability:icescales', 'ability:illusion', 'ability:imposter', 'ability:infuriate',
			'ability:innardsout', 'ability:irrelephant', 'ability:lernean', 'ability:magnetpull', 'ability:magicbounce', 'ability:moody', 'ability:multishot', 'ability:musclememory', 'ability:necromancy', 'ability:neutralizinggas', 'ability:omnitype',
			'ability:orichalcumpulse', 'ability:parentalbond', 'ability:periodicorbit', 'ability:persistent', 'ability:poisonheal', 'ability:purefocus', 'ability:purepower', 'ability:quickcharge', 'ability:shadowtag', 'ability:simple', 'ability:sleet', 'ability:gulpmissile',
			'ability:speedboost', 'ability:speedswap', 'ability:stakeout', 'ability:stormbringer', 'ability:toxicdebris', 'ability:triage', 'ability:unburden', 'ability:unleafed', 'ability:waterbubble', 'ability:wonderguard', 'ability:starfall',
			'ability:inertia', 'ability:proteanmaxima', 'ability:kablooey', 'ability:momentum', 'ability:multitasker', 'ability:cleansweep', 'ability:glitch', 'ability:hugepower', 'ability:sharpcoral', 'ability:hadronengine', 'ability:powerconstruct', 'ability:serenegrace',
			'ability:supercell',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:trickrock',
			'move:achillesheel', 'move:assist', 'move:batonpass', 'move:cinderbreath', 'move:electrify', 'move:hammerthrow', 'move:lastrespects', 'move:livewire', 'move:permafrost', 'move:shedtail', 'move:swagger',
		],
	},
	{
		name: "[Gen 9] Chaos Balanced Hackmons",
		desc: `Anything directly hackable onto a set (EVs, IVs, forme, ability, item, and move) and is usable in local battles is allowed.`,
		mod: 'gen9chaos',
		ruleset: [
			'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Endless Battle Clause',
			'OHKO Clause', 'Evasion Clause', 'Forme Clause', 'Sleep Moves Clause',
			'Species Reveal Clause', 'Terastal Clause', 'CFZ Clause',
			'Mega Forme Clause', 'Nuclear Move Clause', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'LGPE Clause',
		],
		banlist: [
			'pokemon:eternatuseternamax', 'pokemon:arkhaos', 'pokemon:blisseyegho', 'pokemon:calyrexshadow', 'pokemon:chanseyegho', 'pokemon:electrodemega', 'pokemon:groudonprimal', 'pokemon:nucleon', 'pokemon:rayquazamega', 'pokemon:regigigasprimal', 'pokemon:terapagosstellar', 'pokemon:urayne', 'pokemon:uraynebeta', 'pokemon:xenogen', 'pokemon:xenoqueen', 'pokemon:arceusprimal', 'pokemon:pajaynuclear', 'pokemon:palijnuclear', 'pokemon:sonic', 'pokemon:supersonic', 'pokemon:drybones', 'pokemon:shedinja', 'pokemon:zygardemega',
			'ability:ancientpresence', 'ability:arenatrap', 'ability:athenian', 'ability:atomizate', 'ability:blazeboost', 'ability:contrary', 'ability:deepfreeze', 'ability:eventhorizon', 'ability:foundry', 'ability:gorillatactics', 'ability:hadronengine', 'ability:hugepower', 'ability:illusion', 'ability:innardsout', 'ability:lernean', 'ability:orichalcumpulse', 'ability:chernobyl', 'ability:gulpmissile', 'ability:necromancy', 'ability:inertia',
			'ability:magnetpull', 'ability:moody', 'ability:multishot', 'ability:musclememory', 'ability:neutralizinggas', 'ability:omnitype', 'ability:parentalbond', 'ability:purefocus', 'ability:purepower', 'ability:quickcharge', 'ability:shadowtag', 'ability:sleet', 'ability:stakeout', 'ability:stormbringer', 'ability:waterbubble', 'ability:wonderguard', 'ability:glitch', 'ability:chaosemeralds', 'ability:sharpcoral', 'ability:regurgitation', 'ability:starfall',
			'move:achillesheel', 'move:bellydrum', 'move:bigbang', 'move:boltbeak', 'move:chatter', 'move:doubleironbash', 'move:electrify', 'move:lastrespects', 'move:livewire', 'move:octolock', 'move:omniblast', 'move:permafrost', 'move:ragefist', 'move:revivalblessing', 'move:riftjump', 'move:shedtail', 'move:shellsmash', 'move:supremecannon', 'move:thunderstorm', 'move:transcendentsword', 'move:yuckytongue', 'move:zippyzap', 'move:sleeptalk', 'move:nihillight', 'move:ceaselessedge',
			'item:gengarite', 'item:deltamawilite', 'item:hafliberry', 'item:managel', 'item:crystalpiece',
		],
		restricted: ['Arceus'],
		onValidateTeam(team, format) {
			// baseSpecies:count
			const restrictedPokemonCount = new this.dex.Multiset<string>();
			for (const set of team) {
				const species = this.dex.species.get(set.species);
				if (!this.ruleTable.isRestrictedSpecies(species)) continue;
				restrictedPokemonCount.add(species.baseSpecies);
			}
			for (const [baseSpecies, count] of restrictedPokemonCount) {
				if (count > 1) {
					return [
						`You are limited to one ${baseSpecies} forme.`,
						`(You have ${count} ${baseSpecies} forme${count === 1 ? '' : 's'}.)`,
					];
				}
			}
		},
	},
	{
		name: "[Gen 9] Chaos 35",

		mod: 'gen9chaos',
		ruleset: [
			'Standard NatDex', 'Terastal Clause', 'Nuclear Move Clause', '+item:crucibellite', '+item:vilevial', '+move:lightofruin',
			'Overflow Stat Mod', 'LGPE Clause', 'Sleep Moves Clause', 'Species Reveal Clause', 'Restrict Ability = wonderguard', 'Z-Move Clause', '- all pokemon',
			'+pokemon:noiverndelta', '+pokemon:conkeldurr', '+pokemon:bewitwing', '+pokemon:laissure', '+pokemon:blastoisedelta', '+pokemon:spiketop',
			'+pokemon:sekrilon', '+pokemon:reneguana', '+pokemon:lilligantdeltawater', '+pokemon:mandibuzz', '+pokemon:escarphone', '+pokemon:flygon',
			'+pokemon:regasunde', '+pokemon:drilgann', '+pokemon:mochimechi', '+pokemon:nebulant', '+pokemon:goodrahisui', '+pokemon:glavinug', '+pokemon:grimmsnarl',
			'+pokemon:quagsire', '+pokemon:regalunith', '+pokemon:celestray', '+pokemon:tangrowthegho', '+pokemon:krilowatt', '+pokemon:ceruledge', '+pokemon:crobat',
			'+pokemon:blubelrog', '+pokemon:togemon', '+pokemon:incandele', '+pokemon:wyrmplode', '+pokemon:empirilla', '+pokemon:saharaja', '+pokemon:gargryph'
		],
		banlist: [
			'ND Uber', 'ND AG',
			'ability:arenatrap', 'ability:moody', 'ability:powerconstruct', 'ability:shadowtag',
			'item:kingsrock', 'item:quickclaw', 'item:razorfang', 'item:berserkgene', 'item:lightclay',
			'move:assist', 'move:batonpass', 'move:lastrespects', 'move:shedtail', 'move:vanish', 'move:cinderbreath', 'move:livewire', 'move:permafrost', 'move:achillesheel', 'move:hammerthrow', 'move:supremecannon', 'move:nimbusfist', 'move:meltdown',
			'move:zippyzap', 'MegaKabuterimon + Speed Boost',
		],
	},
	{
		name: "[Gen 9] Chaos Free-for-all",
		searchShow: false,

		mod: 'gen9chaos',
		gameType: 'freeforall',
		rated: false,
		ruleset: [
			'Standard AG', 'NatDex Mod', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin', 'Overflow Stat Mod', 'Species Reveal Clause',
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
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Overflow Stat Mod',
		],
	},
	{
		name: "[Gen 9] Chaos Fusions Multi Battle",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'multi',
		ruleset: [
			'Standard AG', 'NatDex Mod', 'Z-Move Clause', 'Ability Clause = 1', '+CAP', '+item:crucibellite', '+item:vilevial', '+move:lightofruin',
			'Infinite Fusion Mod', 'IF Move Legality', 'No Event Moves', '!Obtainable Abilities', 'Species Reveal Clause', 'Terastal Clause', 'Fusion Species Clause', 'Overflow Stat Mod',
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
		battle: { trunc: Math.trunc },
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Multi CG",
		searchShow: false,

		mod: 'gen9chaos',
		gameType: 'multi',
		debug: true,
		battle: { trunc: Math.trunc },
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Fusion Custom Game",
		searchShow: false,

		mod: 'gen9chaosfusion',
		debug: true,
		battle: { trunc: Math.trunc },
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Fusion Doubles CG",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'doubles',
		debug: true,
		battle: { trunc: Math.trunc },
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Fusion FFA CG",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'freeforall',
		debug: true,
		battle: { trunc: Math.trunc },
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
	{
		name: "[Gen 9] Chaos Fusion Multi CG",
		searchShow: false,

		mod: 'gen9chaosfusion',
		gameType: 'multi',
		debug: true,
		battle: { trunc: Math.trunc },
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod', 'Max Team Size = 24', 'Max Move Count = 24', 'Max Level = 9999', 'Default Level = 100', 'Infinite Fusion Mod', 'Overflow Stat Mod', 'Species Reveal Clause'],
	},
];
