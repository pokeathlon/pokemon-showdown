'use strict';

const fs = require('fs');
const path = require('path');
const { Dex } = require('../dist/sim/dex');

const logs = path.resolve(__dirname, '../logs');
const formatinfo = {};

const toID = (text) => {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

const incrementObj = (obj, key, amount=1) => {
	if (!obj[key]) obj[key] = 0;
	obj[key] += amount;
}

const pad = (text, fill, count) => {
	text = `${text}`.substring(0, count);
	return text + fill.repeat(count - text.length);
}

{
	process.stdout.write('Indexing formats... \n');
	const { Formats } = require('../dist/config/alt-formats');

	for (const section of Formats) {
		if (section.name) formatinfo[toID(section.name)] = section;
	}
}

{
	process.stdout.write('Compiling usage... \n');
	const months = fs.readdirSync(logs).filter((path) => path.startsWith('20'));

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
			process.stdout.write('\r                                                \r');
		}

		fs.writeFileSync(`${logs}/usage/${month}.json`, JSON.stringify(usage, null, 2));
	}
}

{
	process.stdout.write('Generating HTML files... \n');

	const server = path.resolve(__dirname, '../server/static');

	const start = `<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta name="color-scheme" content="light dark">\n\t</head>\n\t<body>\n\t\t<pre style="word-wrap: break-word; white-space: pre-wrap;">`
	const end = `\n\t\t</pre>\n\t</body>\n</html>`;

	const months = fs.readdirSync(`${logs}/usage`).map(element => element.split('.')[0]).toReversed();
	let a = start;
	a += `\n--- POK&Eacute;ATHLON USAGE STATS ---\n\n`;
	a += `${pad('BATTLES', ' ', 8)} | MONTH\n${pad('', '-', 18)}\n`;

	for (const month of months) {
		if (!fs.existsSync(`${server}/usage/${month}`)) fs.mkdirSync(`${server}/usage/${month}`);

		let total = 0;
		const usage = JSON.parse(fs.readFileSync(`${logs}/usage/${month}.json`, 'utf-8'));
		Object.keys(usage).forEach(format => total += usage[format].total.ladders);

		a += `${pad(total, ' ', 8)} | <a href=/${month}.html>${month}</a>\n`;

		let b = start;
		b += `<a href=/><- back</a>\n\n`;
		b += `${pad('BATTLES', ' ', 8)} | FORMAT\n${pad('', '-', 36)}\n`;

		for (const format of Object.keys(usage).toSorted((a, b) => usage[b].total.ladders - usage[a].total.ladders)) {
			if (!usage[format].total.ladders) continue;
			if (!fs.existsSync(`${server}/usage/${month}/${format}`)) fs.mkdirSync(`${server}/usage/${month}/${format}`);

			const dex = Dex.mod(formatinfo[format] ? formatinfo[format].mod : format.substring(0, 4));

			b += `${pad(usage[format].total.ladders, ' ', 8)} | <a href=/${month}/${format}.html>${formatinfo[format] ? formatinfo[format].name : format}</a>\n`;

			let c = start;
			c += `<a href=/${month}.html><- back</a>\n\n`;
			c += `${pad('USAGE %', ' ', 8)} | POK&Eacute;MON\n${pad('', '-', 36)}\n`;

			for (const species of Object.entries(usage[format].species).toSorted((a, b) => b[1] - a[1])) {
				let percent = (species[1] / usage[format].total.teams) * 100;
				if (percent < 0.5) continue;

				const name = species[0].split('+').map(element => dex.species.get(element).name).join(' + ');
				const sets = usage[format].sets[species[0]];

				c += `${pad(`${percent}`.includes('.') ? percent : `${percent}.`, '0', 8)} | <a href=/${month}/${format}/${species[0]}.html>${name}</a>\n`;

				let d = start;
				d += `<a href=/${month}/${format}.html><- back</a>\n\n`;
				d += `--- ${name.toUpperCase()} ---\n\n`;
				d += `${pad('USAGE %', ' ', 8)} | ${pad('MOVES', ' ', 24)}\n${pad('', '-', 35)}\n`;

				total = 0;
				const moves = Object.entries(sets.moves).toSorted((a, b) => b[1] - a[1]);
				moves.forEach(entry => total += entry[1]);

				for (const move of moves) {
					percent = (move[1] / total) * 100;

					d += `${pad(`${percent}`.includes('.') ? percent : `${percent}.`, '0', 8)} | ${pad(dex.moves.get(move[0]), ' ', 24)}\n`;
				}

				d += `\n${pad('USAGE %', ' ', 8)} | ${pad('ABILITIES', ' ', 24)}\n${pad('', '-', 35)}\n`;

				total = 0;
				const abilities = Object.entries(sets.abilities).toSorted((a, b) => b[1] - a[1]);
				abilities.forEach(entry => total += entry[1]);
				
				for (const ability of abilities) {
					percent = (ability[1] / total) * 100;

					d += `${pad(`${percent}`.includes('.') ? percent : `${percent}.`, '0', 8)} | ${pad(ability[0].split('+').map(element => dex.abilities.get(element).name).join(' + '), ' ', 24)}\n`;
				}

				d += `\n${pad('USAGE %', ' ', 8)} | ${pad('ITEMS', ' ', 24)}\n${pad('', '-', 35)}\n`;

				total = 0;
				const items = Object.entries(sets.items).toSorted((a, b) => b[1] - a[1]);
				items.forEach(entry => total += entry[1]);

				for (const item of items) {
					percent = (item[1] / total) * 100;

					d += `${pad(`${percent}`.includes('.') ? percent : `${percent}.`, '0', 8)} | ${pad(dex.items.get(item[0]), ' ', 24)}\n`;
				}

				d += `\n<a href=/${month}/${format}.html><- back</a>`;
				d += end;
				fs.writeFileSync(`${server}/usage/${month}/${format}/${species[0]}.html`, d);
			}

			c += `\n<a href=/${month}.html><- back</a>`;
			c += end;
			fs.writeFileSync(`${server}/usage/${month}/${format}.html`, c);
		}

		b += `\n<a href=/><- back</a>`;
		b += end;
		fs.writeFileSync(`${server}/usage/${month}.html`, b);

	}

	a += end;
	fs.writeFileSync(`${server}/usage/index.html`, a);
}
