'use strict';

const fs = require('fs');
const path = require('path');

const logs = path.resolve(__dirname, '../logs');

const toID = text => {
	return `${text}`.toLowerCase().replace(/[^a-z0-9]+/g, '');
};

const pad = (text, fill, count) => {
	text = `${text}`.substring(0, count);
	return text + fill.repeat(count - text.length);
};

const args = process.argv.slice(2);
const format = toID(args[0]);

const dates = [args[1], args[2]];

for (const month of fs.readdirSync(logs).filter(path => path.startsWith('20'))) {
	if (!fs.readdirSync(`${logs}/${month}`).includes(format)) continue;
	dates.push(...fs.readdirSync(`${logs}/${month}/${format}`));
}

const winrates = {};

for (const date of dates.sort().slice(dates.indexOf(args[1]) + 1, dates.indexOf(args[2]))) {
	const battles = fs.readdirSync(`${logs}/${date.slice(0, 7)}/${format}/${date}`);

	for (const battle of battles) {
		const data = JSON.parse(fs.readFileSync(`${logs}/${date.slice(0, 7)}/${format}/${date}/${battle}`, 'utf-8'));
		if (!data['p1rating']) continue;

		for (let i = 1; i <= 4; i++) {
			if (!data[`p${i}team`]) continue;
			for (const set of data[`p${i}team`]) {
				const setstr = `${toID(set['species'])},${toID(set['fusion'])},${set['moves'].map(move => toID(move)).join(',')},${toID(set['item'])},${toID(set['ability'])},${toID(set['level'])}`;
				if (!winrates[setstr]) winrates[setstr] = {
					wins: 0,
					losses: 0,
					rate: 1,
				};

				if (data[`p${i}`] === data['winner']) {
					winrates[setstr].wins += 1;
				} else {
					winrates[setstr].losses += 1;
				}
			}
		}
	}
}

for (const set in winrates) {
	winrates[set].rate = (winrates[set].wins) / (winrates[set].wins + winrates[set].losses);
}

console.log(`${pad('RATE', ' ', 6)} | ${pad('TOTAL', ' ', 6)} | SET\n${pad('', '-', 30)}`);

for (const entry of Object.entries(winrates).toSorted((a, b) => b[1].rate - a[1].rate)) {
	console.log(`${pad(entry[1].rate, ' ', 6)} | ${pad(entry[1].wins + entry[1].losses, ' ', 6)} | ${entry[0]}`);
}
