/*
so my idea for this whole thing is that this script will pull and write all of the data from the whole list of the sheets that we keep below.
you will have the option on the sheet to either have a "natdex meta" or a "cut dex" for natdex, every mon will be in and you can change/add mons as you like
for cut dex you can add or change mons but only the mons that are listed in the "name" column will be a part of the meta. or we can just have that depend on format (probably better)
build-indexes really needs to be rewritten to basically fully consider the mon bans of every format when building teambuilder-tables.js so that ppl can do visual bans in their format on top of regular tiering
maybe use team validator to check every mon in that format??? could work. (is it legal? if yes, get tier)
once that is working then the client should take care of itself entirely
for sprites, the spriteid attribute will be used to transfer the 5? sprite links to the client where they will be looked for and read.
as nice as it would be to write directly to a ts, I plan on writing to a pokedex probably.
they need to be able to edit their format from the sheet tbd how that works also!!! make it so you can't see mons that don't exist in the search to avoid hell!
ok we actually can't check that an ability is real from here, at least not using the dex damn.
*/

var {google} = require('googleapis');
var fs = require('fs');
var {Pokedex} = require('../dist/data/pokedex');

var key = require('../config/config').googleSheetsKey;

allSheets = [
	{id: "1aS2bM27i28iJWG5MSmxmzTNP0_NkAEPpbUgw6SHFa6k", mod: "gen9yoshi", owner: "yoshi", formats: ["gen9yoshidexou"]},
];

function toID(text) {
	return (text && typeof text === "string" ? text : "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function update() {
	for (var sheet of allSheets) {
		pull(sheet.id).then((response) => write(response, sheet.mod, sheet.formats));
	}
}

function pull(sheetid) {
	const googleAuth = new google.auth.JWT(
		key.client_email,
		null,
		key.private_key.replace(/\\n/g, '\n'),
		'https://www.googleapis.com/auth/spreadsheets'
	);
	
	const connection = google.sheets({version: 'v4', auth: googleAuth});
	
	return connection.spreadsheets.values.get({
		auth: googleAuth,
		spreadsheetId: sheetid,
		range: `Pokedex!A3:T200`,
	});
}

function write(info) {
	const dexData = info.data.values;
	out = {};
	for (var line of dexData) {
		const baseStats = getStats(line, 3);
		const abilities = getAbilities(line, 9);
		const types = getTypes(line, 1);
		const gender = getGender(line[15]);
		const evoInfo = resolveEvos(line, dexData);
		if (baseStats && abilities && types) {
			out[toID(line[0])] = {
				name: line[0],
				types: types,
				abilities: abilities,
				baseStats: baseStats,
				weightkg: parseFloat(line[12]),
				heightm: parseFloat(line[13]),
			}
			if (gender) {
				out[toID(line[0])].gender = gender;
			} if (line[14]) {
				out[toID(line[0])].prevo = line[14];
			} if (evoInfo.length) {
				out[toID(line[0])].evos = evoInfo;
			}
		}
	}
}

function getStats(info, start) {
	var stats = {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
	for (var stat in stats) {
		const parsed = parseInt(info[start])
		start++;
		if (typeof parsed == "number") {
			stats[stat] = parsed;
		} else {
			return false;
		}
	}
	return stats;
}

function getTypes(info, start) {
	var types = [];
	for (var i = 0; i < 2; i++) {
		if (info[start]) {
			types.push(info[start]);
		} else {
			return false;
		}
		start++;
	}
	return types;
}

function getAbilities(info, start) {
	var abilities = {};
	if (info[start]) {
		abilities[0] = info[start];
	} else {
		return false;
	}
	if (info[start + 1]) {
		abilities[1] = info[start + 1];
	}
	if (info[start + 2]) {
		abilities.H = info[start + 2];
	}
	return abilities;
}

function getGender(text) {
	if (text && ['N', 'M', 'F'].includes(text.trim().toUpperCase())) {
		return text;
	} else {
		return false;
	}
}

function resolveEvos(line, dexData) {
	evoInfo = [];
	for (info of dexData) {
		if (info[14] === line[0]) {
			evoInfo.push(info[0]);
		}
	}
	return evoInfo;
}

exports.update = update;