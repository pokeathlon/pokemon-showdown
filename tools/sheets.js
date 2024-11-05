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
const path = require('path');

var key = require('../config/config').googleSheetsKey;

const allSheets = [
	{id: "1aS2bM27i28iJWG5MSmxmzTNP0_NkAEPpbUgw6SHFa6k", mod: "gen9pokeathlon", owner: "everyone"},
];

const loc = {types: 8, stats: 10, abilities: 16, weight: 19, height: 20, prevo: 21, gender: 22, formeinfo: 23, cosmeticFormes: 24, tiers: 26, learnset: 30};

function c(item) {
	return item ? item : undefined;
}

function toID(text) {
	return (text && typeof text === "string" ? text : "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

async function update() {
	for (var sheet of allSheets) {
		const dex = await pull(sheet.id, 'Pokedex');
		const bans = await pull(sheet.id, 'Formats');

		var out = {
			dex: formatDex(dex),
			banlists: formatBans(bans),
		};

		fs.writeFileSync(path.resolve(__dirname, '../data/mods/' + sheet.mod + '/remote.json'), JSON.stringify(out, null, '\t'));
	}
}

function pull(sheetid, section) {
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
		range: `${section}!A3:AE`,
	});
}

function formatDex(pokedex) {
	const dexData = pokedex.data.values;
	var dex = {};
	for (var line of dexData) {
		dex[toID(line[0])] = {
			name: line[0],
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
				hp:  parseInt(c(line[loc.stats + 0])),
				atk: parseInt(c(line[loc.stats + 1])),
				def: parseInt(c(line[loc.stats + 2])),
				spa: parseInt(c(line[loc.stats + 3])),
				spd: parseInt(c(line[loc.stats + 4])),
				spe: parseInt(c(line[loc.stats + 5])),
			},
			weightkg:    parseFloat(c(line[loc.weight])),
			heightm:     parseFloat(c(line[loc.height])),
			prevo:       c(line[loc.prevo]),
			formeinfo:   c(line[loc.formeinfo]),
			cosmetics:   c(line[loc.cosmeticFormes]),
			tier:        c(line[loc.tiers + 0]),
			natDexTier:  c(line[loc.tiers + 1]),
			doublesTier: c(line[loc.tiers + 2]),
			learnset:    c(line[loc.learnset])
		};
	}
	return dex;
}

function formatBans(bans) {
	const formatsData = bans.data.values;
	banlists = {};
	for (var line of formatsData) {
		banlists[line[0]] = {
			pokemon:   line[1],
			abilities: line[2],
			moves:     line[3],
			items:     line[4],
			custom:    line[5],
		}
	}
	return banlists;
}

exports.update = update;