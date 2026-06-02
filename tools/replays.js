'use strict';

const fs = require('fs');
const path = require('path');

const replayspath = path.resolve(__dirname, '../server/static/replays');

const toID = text => {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, '');
};

const replays = fs.readdirSync(replayspath).filter(f => f.endsWith('.log') || f.endsWith('.html') || f.endsWith('.json'));
const csv = fs.readFileSync(replayspath + '/replays.csv', 'utf-8').split('\n').map(line => line.split(','));
const indices = [];

for (const replay of replays.filter(f => f.endsWith('.html'))) {
	process.stdout.write(replay.slice(0, -5) + ' '.repeat(50) + '\r');

	const html = fs.readFileSync(replayspath + '/' + replay, 'utf-8');
	const log = html.split('<script type="text/plain" class="battle-log-data">')[1].split('\n</script>\n</div>\n</div>')[0];

	fs.writeFileSync(replayspath + '/' + replay.slice(0, -5) + '.log', log);

	const data = csv[csv.map(line => line[7]).indexOf(replay.slice(0, -5))];
	if (!data) continue;

	const players = [];
	data.slice(1, 5).forEach((player) => {if (player) players.push(player);});
	let rating = null;
	if (log.includes('\n|rated|\n') && log.includes('\n|win|')) {
		rating = Math.min(...log.split('\n').filter(line => line.startsWith('|raw|') && line.includes('\'s rating: ')).map(raw => parseInt(raw.split('<strong>')[1].split('<\/strong>')[0])));
	}
	const json = {id: replay.slice(0, -5), log: log, players: players, format: data[6], formatid: toID(data[6]), players: players, rating: rating, private: 0, password: null, uploadtime: Math.floor(parseInt(data[5]) / 1000)};

	let pokemon = [];
	if (log.includes('\n|teampreview')) {
		log.split('\n').filter(line => line.startsWith('|poke|')).forEach((line) => {
			const details = line.split('|')[3];
			let used = '';
			used += toID(details.split(', ')[0]);
			if (details.includes('fusion: ')) used += '/' + toID(details.split('fusion: ')[1].split(',')[0]);
			pokemon.push(used);
		});
	}

	indices.push([
		replay.slice(0, -5), toID(data[6]), rating, parseInt(data[5]),...(players.concat(...' '.repeat(4).split('')).slice(0, 4).map(player => toID(player))),...pokemon.concat(...' '.repeat(24).split('')).slice(0, 24),
	]);

	fs.writeFileSync(replayspath + '/' + replay.slice(0, -5) + '.json', JSON.stringify(json));

	fs.unlinkSync(replayspath + '/' + replay);
}

fs.writeFileSync(replayspath + '/replays.csv', indices.sort((a, b) => a[3] - b[3]).map(line => line.join(',')).join('\n'));
