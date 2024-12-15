import {RandomGen8Teams} from '../gen8/teams';
import {PRNG, PRNGSeed} from '../../../sim/prng';
import { TeamValidator } from '../../../sim';


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
			const set = this.sampleNoReplace(pool);

			const species_stats = this.dex.species.get(set.species).baseStats;
			const fusion_stats = this.dex.species.get(set.fusion).baseStats

			const stats = {
				hp: Math.floor((species_stats.hp * (2 / 3)) + (fusion_stats.hp * (1 / 3))),
				spa: Math.floor((species_stats.spa * (2 / 3)) + (fusion_stats.spa * (1 / 3))),
				spd: Math.floor((species_stats.spd * (2 / 3)) + (fusion_stats.spd * (1 / 3))),
				atk: Math.floor((species_stats.atk * (1 / 3)) + (fusion_stats.atk * (2 / 3))),
				def: Math.floor((species_stats.def * (1 / 3)) + (fusion_stats.def * (2 / 3))),
				spe: Math.floor((species_stats.spe * (1 / 3)) + (fusion_stats.spe * (2 / 3))),
			};

			let level = Math.floor(((30 / Math.max(...Object.values(stats))) ** 0.2) * 100);

			const candidate = {
				name: set.name ? set.name : this.dex.species.get(set.species).name,
				species: this.dex.species.get(set.species).name,
				fusion: this.dex.species.get(set.fusion).name,
				happiness: set.moves.includes('frustration') ? 0 : 255,
				shiny: false,
				level: level,
				gender: this.dex.species.get(set.species).gender,
				moves: set.moves,
				ability: set.ability,
				item: set.item,
				teraType: this.dex.types.get(set.teraType).name,
				evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			} as PokemonSet;

			const result = TeamValidator.get('gen7ifdexou').validateSet(candidate, {});
			if (!result) {
				pokemon.push(candidate as RandomTeamsTypes.RandomSet);
				pool = pool.filter(sample => ![set.species, set.fusion].includes(sample.species) && ![set.species, set.fusion].includes(sample.fusion));
			}
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed}) (pls report this!)`);
		}
		return pokemon;
	}
}

export default RandomGen7Teams;
