'use strict';

const {google} = require('googleapis');
const fs = require('fs');
const path = require('path');

const randbatsSheet = '1z5oK9_nqsjBzSqiK8M97-TZGyOosL9irW4ItO4yrUNE';

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
