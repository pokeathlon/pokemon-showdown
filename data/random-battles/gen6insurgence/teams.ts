import {RandomGen8Teams} from '../gen8/teams';
import {PRNG, PRNGSeed} from '../../../sim/prng';


export class RandomGen7Teams extends RandomGen8Teams {
	randomSets: AnyObject = require('./data.json');

	constructor(format: Format | string, prng: PRNG | PRNGSeed | null) {
		super(format, prng);
	}

	randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.seed;
		const pokemon: RandomTeamsTypes.RandomSet[] = [];
		let pool = Object.keys(this.randomSets);

		while (pokemon.length < this.maxTeamSize) {
			const curSpecies = this.sampleNoReplace(pool);
			const curSet: Partial<RandomTeamsTypes.RandomSet> = this.sample(this.randomSets[curSpecies]);

			// Level balance--calculate directly from stats rather than using some silly lookup table
			const mbstmin = 1307;

			const stats = this.dex.species.get(curSpecies).baseStats;

			// Modified base stat total assumes 31 IVs, 85 EVs in every stat
			let mbst = (stats["hp"] * 2 + 31 + 21 + 100) + 10;
			mbst += (stats["atk"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["def"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spa"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spd"] * 2 + 31 + 21 + 100) + 5;
			mbst += (stats["spe"] * 2 + 31 + 21 + 100) + 5;

			let level;
			if (this.adjustLevel) {
				level = this.adjustLevel;
			} else {
				level = Math.floor(100 * mbstmin / mbst); // Initial level guess will underestimate

				while (level < 100) {
					mbst = Math.floor((stats["hp"] * 2 + 31 + 21 + 100) * level / 100 + 10);
					// Since damage is roughly proportional to level
					mbst += Math.floor(((stats["atk"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats["def"] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor(((stats["spa"] * 2 + 31 + 21 + 100) * level / 100 + 5) * level / 100);
					mbst += Math.floor((stats["spd"] * 2 + 31 + 21 + 100) * level / 100 + 5);
					mbst += Math.floor((stats["spe"] * 2 + 31 + 21 + 100) * level / 100 + 5);

					if (mbst >= mbstmin) break;
					level++;
				}
			}

			if (curSet.moves && curSet.ability && curSet.item) {
				pokemon.push({
					name: this.dex.species.get(curSpecies).name,
					species: this.dex.species.get(curSpecies).name,
					happiness: curSet.moves.includes('frustration') ? 0 : 255,
					shiny: this.randomChance(1, 1024),
					level: curSet.ability === 'necromancy' ? 70 : level,
					gender: this.dex.species.get(curSpecies).gender,
					moves: curSet.moves,
					ability: curSet.ability,
					item: curSet.item,
					evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84},
					ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				});
			}
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed}) (pls report this!)`);
		}
		return pokemon;
	}
}

export default RandomGen7Teams;
