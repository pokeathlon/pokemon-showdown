'use strict';

const {google} = require('googleapis');
const fs = require('fs');
const path = require('path');

const randbatsSheet = '1z5oK9_nqsjBzSqiK8M97-TZGyOosL9irW4ItO4yrUNE';

const formatsSheets = {
	'gen9pokeathlon': '1aS2bM27i28iJWG5MSmxmzTNP0_NkAEPpbUgw6SHFa6k',
};

function formatDex(pokedex) {
	let data = pokedex.data.values;
	for (const i in data[0]) if (!data[1][i]) data[1][i] = data[0][i];

	const targets = [
		'name', '1', '2',
		'type1', 'type2',
		'hp', 'atk', 'def', 'spa', 'spd', 'spe',
		'ability1', 'ability2', 'hiddenability',
		'weightkg', 'heightm', 'gender',
		'prevo', 'formeinfo', 'cosmeticformes',
		'tier', 'natdextier', 'doublestier',
		'learnset',
	];
	const index = getIndexes(data[1], targets);

	const dex = {};
	for (const line of data.slice(2)) {
		dex[toID(line[0])] = {
			name: line[index.name],
			gen1: line[index['1']] === "TRUE",
			gen2: line[index['2']] === "TRUE",
			types: [
				line[loc.types + 0] || undefined,
				line[loc.types + 1] || undefined,
			],
			abilities: {
				0: line[loc.abilities + 0] || undefined,
				1: line[loc.abilities + 1] || undefined,
				H: line[loc.abilities + 2] || undefined,
			},
			baseStats: {
				hp:  parseInt(line[loc.stats + 0] || undefined),
				atk: parseInt(line[loc.stats + 1] || undefined),
				def: parseInt(line[loc.stats + 2] || undefined),
				spa: parseInt(line[loc.stats + 3] || undefined),
				spd: parseInt(line[loc.stats + 4] || undefined),
				spe: parseInt(line[loc.stats + 5] || undefined),
			},
			weightkg: parseFloat(line[loc.weight] || undefined),
			heightm: parseFloat(line[loc.height] || undefined),
			prevo: line[loc.prevo] || undefined,
			formeinfo: line[loc.formeinfo] || undefined,
			cosmetics: line[loc.cosmeticFormes] || undefined,
			tier: line[loc.tiers + 0] || undefined,
			natDexTier: line[loc.tiers + 1] || undefined,
			doublesTier: line[loc.tiers + 2] || undefined,
			learnset: line[loc.learnset] || undefined,
		};
	}
	return dex;
}

function formatBans(bans) {
	const formatsData = bans.data.values;
	let banlists = {};
	for (const line of formatsData) {
		banlists[line[0]] = {
			pokemon: line[1],
			abilities: line[2],
			moves: line[3],
			items: line[4],
			custom: line[5],
		};
	}
	return banlists;
}

exports.update = async () => {
	const key = require('../config/config').googleSheetsKey;
	if (!key || !key.client_email || !key.private_key) return;

	const auth = new google.auth.JWT(key.client_email, null, key.private_key.replace(/\\n/g, '\n'), 'https://www.googleapis.com/auth/spreadsheets');
	const connection = google.sheets({version: 'v4', auth: auth});

	let randbats = {};
	const formats = (await connection.spreadsheets.get({spreadsheetId: randbatsSheet})).data.sheets.map((sheet) => sheet.properties.title);
	
	for (const format of formats) {
		const data = (await connection.spreadsheets.values.get({spreadsheetId: randbatsSheet, range: `${format}!A1:ZZ`})).data.values;
		randbats[format] = data;
	}

	fs.writeFileSync(path.resolve(__dirname, '../data/remote/randbats.json'), JSON.stringify(randbats), { flag: "w" });
}
