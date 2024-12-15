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
		let pool: AnyObject[] = this.randomSets.random_sets.filter((set: AnyObject) => set.fusion);

		while (pokemon.length < this.maxTeamSize) {
			const curSet = this.sampleNoReplace(pool);
			const curSpecies = curSet.species;
			const curFusion = curSet.fusion;

			// Level balance--calculate directly from stats rather than using some silly lookup table
			const mbstmin = 1307;

			const species_stats = this.dex.species.get(curSpecies).baseStats;
			const fusion_stats = this.dex.species.get(curFusion).baseStats

			const stats = {
				hp: Math.floor((species_stats.hp * (2 / 3)) + (fusion_stats.hp * (1 / 3))),
				spa: Math.floor((species_stats.spa * (2 / 3)) + (fusion_stats.spa * (1 / 3))),
				spd: Math.floor((species_stats.spd * (2 / 3)) + (fusion_stats.spd * (1 / 3))),
				atk: Math.floor((species_stats.atk * (1 / 3)) + (fusion_stats.atk * (2 / 3))),
				def: Math.floor((species_stats.def * (1 / 3)) + (fusion_stats.def * (2 / 3))),
				spe: Math.floor((species_stats.spe * (1 / 3)) + (fusion_stats.spe * (2 / 3))),
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

			if (curSet.moves && curSet.ability && curSet.item) {
				pokemon.push({
					name: curSet.name ? curSet.name : this.dex.species.get(curSpecies).name,
					species: this.dex.species.get(curSpecies).name,
					fusion: this.dex.species.get(curFusion).name,
					happiness: curSet.moves.includes('frustration') ? 0 : 255,
					shiny: false,
					level: level,
					gender: this.dex.species.get(curSpecies).gender,
					moves: curSet.moves,
					ability: curSet.ability,
					item: curSet.item,
					teraType: this.dex.types.get(curSet.teraType).name,
					evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84},
					ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				});
				pool = pool.filter(set => ![set.species, set.fusion].includes(curSpecies) && ![set.species, set.fusion].includes(curFusion));
			}
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed}) (pls report this!)`);
		}
		return pokemon;
	}
}

export default RandomGen7Teams;
