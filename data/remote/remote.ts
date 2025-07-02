function compileRandbats(): {[key: string]: Partial<RandomTeamsTypes.RandomSet>[]} {
	const randbats: {[key: string]: string[][]} = require('./randbats.json');
	let sets: {[key: string]: Partial<RandomTeamsTypes.RandomSet>[]} = {};

	for (const mod in randbats) {
		sets[mod] = [];
		let indices: {[key: string]: number} = {};
		randbats[mod][0].forEach((label, index) => indices[label] = index);

		randbats[mod].slice(1).forEach((entry, index) => {
			let set: Partial<RandomTeamsTypes.RandomSet> = { moves: [] };
			for (const key of ['name', 'species', 'fusion', 'alt', 'item', 'ability', 'teraType', 'level']) (set as any)[key] = entry[indices[key]];
			for (let move = 1; move <= 4; move++) if (entry[indices[`move ${move}`]]) set.moves?.push(entry[indices[`move ${move}`]]);
			sets[mod].push(set);
		});
	}
	return sets;
}

export const RandomBattleSets = compileRandbats();
