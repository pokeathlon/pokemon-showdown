'use strict';

const {google} = require('googleapis');
const fs = require('fs');
const path = require('path');

const key = require('../config/config').googleSheetsKey;

const allFormats = [
	{id: "1aS2bM27i28iJWG5MSmxmzTNP0_NkAEPpbUgw6SHFa6k", mod: "gen9pokeathlon", owner: "everyone"},
];

const randbats = "1z5oK9_nqsjBzSqiK8M97-TZGyOosL9irW4ItO4yrUNE";

const loc = {types: 10, stats: 12, abilities: 18, weight: 21, height: 22, prevo: 23, gender: 24, formeinfo: 25, cosmeticFormes: 26, tiers: 28, learnset: 32};

function c(item) {
	return item ? item : undefined;
}

function toID(text) {
	return (text && typeof text === "string" ? text : "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

async function update() {
	if (!key) return;

	const googleAuth = new google.auth.JWT(
		key.client_email,
		null,
		key.private_key.replace(/\\n/g, '\n'),
		'https://www.googleapis.com/auth/spreadsheets'
	);
	
	const connection = google.sheets({version: 'v4', auth: googleAuth});

	for (const sheet of allFormats) {
		const dex = await pullFormat(connection, googleAuth, sheet.id, 'Pokedex');
		const bans = await pullFormat(connection, googleAuth, sheet.id, 'Formats');

		const out = {
			dex: formatDex(dex),
			banlists: formatBans(bans),
		};

		fs.writeFileSync(path.resolve(__dirname, '../data/mods/' + sheet.mod + '/remote.json'), JSON.stringify(out, null, '\t'));
	}
	await pullRandbats(connection, googleAuth, randbats);
}

async function pullRandbats(connection, googleAuth, sheetid) {
	for (const mod of ['gen9chaos', 'gen7infinitefusion']) {
		let randbats_sets = {sets: []};
		const data = await connection.spreadsheets.values.get({
			auth: googleAuth,
			spreadsheetId: sheetid,
			range: `${mod}!A2:K`,
		});
		for (const line of data.data.values) {
			const key_index = ['name', 'species', 'fusion', 'alt', 'item', 'ability', 'teraType'];
			let cur_set = {moves: []};
			for (const item in line) {
				if (item >= key_index.length) {
					cur_set.moves.push(line[item]);
				} else {
					cur_set[key_index[item]] = line[item];
				}
			}
			randbats_sets.sets.push(cur_set);
		}
		fs.writeFileSync(path.resolve(__dirname, '../data/random-battles/' + mod + '/data.json'), JSON.stringify(randbats_sets, null, '\t'), { flag: "w" });
	}
}

function pullFormat(connection, googleAuth, sheetid, section) {
	return connection.spreadsheets.values.get({
		auth: googleAuth,
		spreadsheetId: sheetid,
		range: `${section}!A3:AG`,
	});
}

function formatDex(pokedex) {
	const dexData = pokedex.data.values;
	const dex = {};
	for (const line of dexData) {
		dex[toID(line[0])] = {
			name: line[0],
			gen1: line[1] === "TRUE" ? 1 : 0,
			gen2: line[2] === "TRUE" ? 1 : 0,
			types: [
				c(line[loc.types + 0]),
				c(line[loc.types + 1]),
			],
			abilities: {
				0: c(line[loc.abilities + 0]),
				1: c(line[loc.abilities + 1]),
				H: c(line[loc.abilities + 2]),
			},
			baseStats: {
				hp: parseInt(c(line[loc.stats + 0])),
				atk: parseInt(c(line[loc.stats + 1])),
				def: parseInt(c(line[loc.stats + 2])),
				spa: parseInt(c(line[loc.stats + 3])),
				spd: parseInt(c(line[loc.stats + 4])),
				spe: parseInt(c(line[loc.stats + 5])),
			},
			weightkg: parseFloat(c(line[loc.weight])),
			heightm: parseFloat(c(line[loc.height])),
			prevo: c(line[loc.prevo]),
			formeinfo: c(line[loc.formeinfo]),
			cosmetics: c(line[loc.cosmeticFormes]),
			tier: c(line[loc.tiers + 0]),
			natDexTier: c(line[loc.tiers + 1]),
			doublesTier: c(line[loc.tiers + 2]),
			learnset: c(line[loc.learnset]),
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

exports.update = update;
