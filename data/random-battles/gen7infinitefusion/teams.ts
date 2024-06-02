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
		const usedSpecies: string[] = [];

		while (pokemon.length < this.maxTeamSize) {
			const curSpecies = this.sampleNoReplace(pool);
			const curSet: Partial<RandomTeamsTypes.RandomSet> = this.sample(this.randomSets[curSpecies]);

			const speciesS = this.dex.species.get(curSet.species).baseStats;
			const fusionS = this.dex.species.get(curSet.fusion).baseStats;

			// Level balance--calculate directly from stats rather than using some silly lookup table
			const mbstmin = 1307;

			const stats = {
				hp: Math.floor((speciesS.hp * (2 / 3)) + (fusionS.hp * (1 / 3))),
				spa: Math.floor((speciesS.spa * (2 / 3)) + (fusionS.spa * (1 / 3))),
				spd: Math.floor((speciesS.spd * (2 / 3)) + (fusionS.spd * (1 / 3))),
				atk: Math.floor((speciesS.atk * (1 / 3)) + (fusionS.atk * (2 / 3))),
				def: Math.floor((speciesS.def * (1 / 3)) + (fusionS.def * (2 / 3))),
				spe: Math.floor((speciesS.spe * (1 / 3)) + (fusionS.spe * (2 / 3))),
			};

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

			if ((curSet.name === "" || curSet.name) && curSet.species && curSet.fusion && curSet.moves && curSet.ability && curSet.item && !usedSpecies.includes(curSet.species) && !usedSpecies.includes(curSet.fusion)) {
				pokemon.push({
					name: curSet.name,
					species: this.dex.species.get(curSet.species).name,
					fusion: this.dex.species.get(curSet.fusion).name,
					happiness: curSet.moves.includes('frustration') ? 0 : 255,
					alt: curSet.alt,
					shiny: this.randomChance(1, 1024),
					level: level,
					gender: this.dex.species.get(curSet.species).gender,
					moves: curSet.moves,
					ability: curSet.ability,
					item: curSet.item,
					evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84},
					ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				});
				usedSpecies.push(...[curSet.species, curSet.fusion]);
			}
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed}) (pls report this!)`);
		}
		return pokemon;
	}
}

export default RandomGen7Teams;
