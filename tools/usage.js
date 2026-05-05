'use strict';

const fs = require('fs');
const path = require('path');
const { Dex } = require('../dist/sim/dex');

const logs = path.resolve(__dirname, '../logs');
const server = path.resolve(__dirname, '../server/static');

const toID = text => {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, '');
};

const incrementObj = (obj, key, amount = 1) => {
	if (!obj[key]) obj[key] = 0;
	obj[key] += amount;
};

const pad = (text, fill, count) => {
	text = `${text}`.substring(0, count);
	return text + fill.repeat(count - text.length);
};

const formatinfo = {};

{
	process.stdout.write('Indexing formats... \n');
	const { Formats } = require('../dist/config/alt-formats');

	for (const section of Formats) {
		if (section.name) formatinfo[toID(section.name)] = section;
	}
}

if (process.argv[2] === 'full') {
	process.stdout.write('Compiling usage... \n');
	const months = fs.readdirSync(logs).filter(path => path.startsWith('20'));

	for (const month of months) {
		const usage = {};

		const formats = fs.readdirSync(`${logs}/${month}`);
		for (const format of formats) {
			if (formatinfo[format] && formatinfo[format].team) continue;
			process.stdout.write(month + ' ' + format);

			usage[format] = {
				total: {
					battles: 0,
					ladders: 0,
					teams: 0,
				},
				daily: {},
				species: {},
				sets: {},
				winrates: {},
			};

			const isFusions = !formatinfo[format] || formatinfo[format].ruleset.includes('Infinite Fusion Mod');
			const is2Ability = !formatinfo[format] || formatinfo[format].ruleset.includes('Double Ability Mod');

			const dates = fs.readdirSync(`${logs}/${month}/${format}`);

			for (const date of dates) {
				const battles = fs.readdirSync(`${logs}/${month}/${format}/${date}`);

				usage[format].total.battles += battles.length;
				usage[format].daily[date] = {
					battles: battles.length,
					ladders: 0,
				};

				for (const battle of battles) {
					const data = JSON.parse(fs.readFileSync(`${logs}/${month}/${format}/${date}/${battle}`, 'utf-8'));
					if (!data['p1rating']) continue;

					usage[format].daily[date].ladders += 1;
					usage[format].total.ladders += 1;

					for (let i = 1; i <= 4; i++) {
						if (!data[`p${i}team`]) continue;

						usage[format].total.teams += 1;

						for (const set of data[`p${i}team`]) {
							const species = `${toID(set['species'])}${isFusions && set['fusion'] ? '+' + toID(set['fusion']) : ''}`;
							incrementObj(usage[format].species, species);

							if (!usage[format].winrates[species]) usage[format].winrates[species] = {
								wins: 0,
								losses: 0,
								rate: 1,
							};

							if (data[`p${i}`] === data['winner']) {
								usage[format].winrates[species].wins += 1;
							} else {
								usage[format].winrates[species].losses += 1;
							}

							if (!usage[format].sets[species]) usage[format].sets[species] = {
								abilities: {},
								items: {},
								moves: {},
							};

							const abilities = [toID(set['ability'])];
							if (is2Ability && set['ability2']) abilities.push(toID(set['ability2']));
							incrementObj(usage[format].sets[species].abilities, abilities.toSorted().join('+'));

							if (set['item']) incrementObj(usage[format].sets[species].items, toID(set['item']));

							for (const move of set['moves']) incrementObj(usage[format].sets[species].moves, toID(move));
						}
					}
				}
			}

			for (const species in usage[format].winrates) {
				usage[format].winrates[species].rate = usage[format].winrates[species].wins / (usage[format].winrates[species].wins + usage[format].winrates[species].losses);
			}

			process.stdout.write('\r                                                \r');
		}

		fs.writeFileSync(`${server}/usage/raw/${month}.json`, JSON.stringify(usage, null, 2));
	}
}

{
	process.stdout.write('Generating HTML files... \n');

	const start = `<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta name="color-scheme" content="light dark">\n\t\t<style>\n\t\t\ta { text-decoration: none; }\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<pre>`;
	const end = `\n\t\t</pre>\n\t</body>\n</html>`;

	const months = fs.readdirSync(`${server}/usage/raw`).map(element => element.split('.')[0]).toReversed();
	let a = start;
	a += `\n--- POK&Eacute;ATHLON USAGE STATS ---\n\n`;
	a += `${pad('BATTLES', ' ', 8)} |  MONTH  |    GRAPH\n${pad('', '-', 29)}\n`;

	for (const month of months) {
		if (!fs.existsSync(`${server}/usage/${month}`)) fs.mkdirSync(`${server}/usage/${month}`);

		let total = 0;
		const usage = JSON.parse(fs.readFileSync(`${server}/usage/raw/${month}.json`, 'utf-8'));
		Object.keys(usage).forEach(format => { total += usage[format].total.ladders; });

		a += `${pad(total, ' ', 8)} | <a href=/${month}.html>${month}</a> | ${'&block;'.repeat(Math.sqrt(total / 100) + 1)}\n`;

		let b = start;
		b += `<a href=/><- back</a>\n\n`;
		b += `${pad('BATTLES', ' ', 8)} | ${pad('FORMAT', ' ', 30)}\n${pad('', '-', 41)}\n`;

		for (const format of Object.keys(usage).toSorted((a, b) => usage[b].total.ladders - usage[a].total.ladders)) {
			if (usage[format].total.ladders < 10) continue;
			if (!fs.existsSync(`${server}/usage/${month}/${format}`)) fs.mkdirSync(`${server}/usage/${month}/${format}`);

			const isFusions = !formatinfo[format] || formatinfo[format].ruleset.includes('Infinite Fusion Mod');

			const dex = Dex.mod(formatinfo[format] ? formatinfo[format].mod : format.substring(0, 4));

			b += `${pad(usage[format].total.ladders, ' ', 8)} | <a href=/${month}/${format}/usage.html>${pad(formatinfo[format] ? formatinfo[format].name : format, ' ', 30)}</a>\n`;

			let c = start;
			c += `<a href=/${month}.html><- back</a>\n\n`;
			c += `USAGE &#x25BC; | WINRATE <a href=/${month}/${format}/winrate.html>&#x25B6;</a> | ${pad('POK&Eacute;MON', ' ', isFusions ? 36 : 24)}\n${pad('', '-', 11 + (isFusions ? 36 : 24))}\n`;

			for (const species of Object.entries(usage[format].species).toSorted((a, b) => b[1] - a[1])) {
				let percent = (species[1] / usage[format].total.teams) * 100;
				if (percent < 0.5) continue;

				let winrate = usage[format].winrates[species[0]].rate * 100;

				const name = species[0].split('+').map(element => dex.species.get(element).name).join(' + ');
				const sets = usage[format].sets[species[0]];

				c += `${pad(`${percent}`.includes('.') ? percent : `${percent}.`, '0', 7)} | ${pad(`${winrate}`.includes('.') ? winrate : `${winrate}.`, '0', 9)} | <a href=/${month}/${format}/${species[0]}.html>${pad(name, ' ', isFusions ? 36 : 24)}</a>\n`;

				let d = start;
				d += `<a href=/${month}/${format}/usage.html><- back</a>\n\n`;
				d += `--- ${name.toUpperCase()} ---\n\n`;
				d += `${pad('USAGE %', ' ', 8)} | ${pad('MOVES', ' ', 24)}\n${pad('', '-', 35)}\n`;

				total = 0;
				const moves = Object.entries(sets.moves).toSorted((a, b) => b[1] - a[1]);
				moves.forEach(entry => { total += entry[1]; });

				for (const move of moves) {
					percent = (move[1] / species[1]) * 100;

					d += `${pad(`${percent}`.includes('.') ? percent : `${percent}.`, '0', 8)} | ${pad(dex.moves.get(move[0]), ' ', 24)}\n`;
				}

				d += `\n${pad('USAGE %', ' ', 8)} | ${pad('ABILITIES', ' ', 24)}\n${pad('', '-', 35)}\n`;

				total = 0;
				const abilities = Object.entries(sets.abilities).toSorted((a, b) => b[1] - a[1]);
				abilities.forEach(entry => { total += entry[1]; });

				for (const ability of abilities) {
					percent = (ability[1] / total) * 100;

					d += `${pad(`${percent}`.includes('.') ? percent : `${percent}.`, '0', 8)} | ${pad(ability[0].split('+').map(element => dex.abilities.get(element).name).join(' + '), ' ', 24)}\n`;
				}

				d += `\n${pad('USAGE %', ' ', 8)} | ${pad('ITEMS', ' ', 24)}\n${pad('', '-', 35)}\n`;

				total = 0;
				const items = Object.entries(sets.items).toSorted((a, b) => b[1] - a[1]);
				items.forEach(entry => { total += entry[1]; });

				for (const item of items) {
					percent = (item[1] / total) * 100;

					d += `${pad(`${percent}`.includes('.') ? percent : `${percent}.`, '0', 8)} | ${pad(dex.items.get(item[0]), ' ', 24)}\n`;
				}

				d += `\n<a href=/${month}/${format}/usage.html><- back</a>`;
				d += end;
				fs.writeFileSync(`${server}/usage/${month}/${format}/${species[0]}.html`, d);
			}

			c += `\n<a href=/${month}.html><- back</a>`;
			c += end;
			fs.writeFileSync(`${server}/usage/${month}/${format}/usage.html`, c);

			let winrates = start;
			winrates += `<a href=/${month}.html><- back</a>\n\n`;
			winrates += `USAGE <a href=/${month}/${format}/usage.html>&#x25B6;</a> | WINRATE &#x25BC; | ${pad('POK&Eacute;MON', ' ', isFusions ? 36 : 24)}\n${pad('', '-', 11 + (isFusions ? 36 : 24))}\n`;

			for (const species of Object.entries(usage[format].winrates).toSorted((a, b) => b[1].rate - a[1].rate)) {
				let percent = (usage[format].species[species[0]] / usage[format].total.teams) * 100;
				if (percent < 0.5) continue;

				let winrate = species[1].rate * 100;

				const name = species[0].split('+').map(element => dex.species.get(element).name).join(' + ');
				const sets = usage[format].sets[species[0]];

				winrates += `${pad(`${percent}`.includes('.') ? percent : `${percent}.`, '0', 7)} | ${pad(`${winrate}`.includes('.') ? winrate : `${winrate}.`, '0', 9)} | <a href=/${month}/${format}/${species[0]}.html>${pad(name, ' ', isFusions ? 36 : 24)}</a>\n`;
			}

			winrates += `\n<a href=/${month}.html><- back</a>`;
			winrates += end;
			fs.writeFileSync(`${server}/usage/${month}/${format}/winrate.html`, winrates);
		}

		b += `\n<a href=/><- back</a>`;
		b += end;
		fs.writeFileSync(`${server}/usage/${month}.html`, b);
	}

	a += end;
	fs.writeFileSync(`${server}/usage/index.html`, a);
}
