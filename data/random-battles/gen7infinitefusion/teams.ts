import type { PRNG, PRNGSeed } from "../../../sim/prng";
import { RandomTeams, type MoveCounter } from "../gen9/teams";
import { TeamValidator } from '../../../sim';

export class RandomIFTeams extends RandomTeams {
	data: {[key: string]: AnyObject[]} = require('./data.json');
	constructor(format: Format | string, prng: PRNG | PRNGSeed | null) {
		super(format, prng);
	}

	override randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.getSeed();
		const pokemon: RandomTeamsTypes.RandomSet[] = [];
		let pool: AnyObject[] = this.data.sets.filter((set: AnyObject) => set.fusion);

		while (pokemon.length < this.maxTeamSize) {
			const curSet = this.sampleNoReplace(pool);
			const curSpecies = curSet.species;

			const species_stats = this.dex.species.get(curSet.species).baseStats;
			const fusion_stats = this.dex.species.get(curSet.fusion).baseStats
		
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
				name: curSet.name ? curSet.name : this.dex.species.get(curSet.species).name,
				species: this.dex.species.get(curSet.species).name,
				fusion: this.dex.species.get(curSet.fusion).name,
				happiness: curSet.moves.includes('frustration') ? 0 : 255,
				shiny: false,
				level: level,
				gender: this.dex.species.get(curSet.species).gender,
				moves: curSet.moves,
				ability: curSet.ability,
				item: curSet.item,
				evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
			} as PokemonSet;

			const result = TeamValidator.get('gen7ifdexou').validateSet(candidate, {});
			if (!result) {
				pokemon.push(candidate as RandomTeamsTypes.RandomSet);
				pool = pool.filter(sample => ![curSet.species, curSet.fusion].includes(sample.species) && ![curSet.species, curSet.fusion].includes(sample.fusion));
			}
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed}) (pls report this!)`);
		}
		return pokemon;
	}
}

export default RandomIFTeams;
