import { RandomTeams } from "../gen9/teams";
import { RandomBattleSets } from "../../remote/remote";
import { TeamValidator } from '../../../sim';

export class RandomIFTeams extends RandomTeams {
	randomIFSets: Partial<RandomTeamsTypes.RandomSet>[] = RandomBattleSets['gen7infinitefusion'];
	validator = new TeamValidator('gen7ifdexag');
	levels: AnyObject = {
		"AG": 75,
		"Uber": 80,
		"(Uber)": 80,
		"OU": 85,
		"(OU)": 85,
		"UUBL": 90,
		"UU": 90,
		"RUBL": 95,
		"RU": 95,
		"NFE": 100,
		"LC": 100,
	};

	override randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.getSeed();
		const pokemon: RandomTeamsTypes.RandomSet[] = [];
		let pool: Partial<RandomTeamsTypes.RandomSet>[] = this.dex.deepClone(this.randomIFSets);

		while (pokemon.length < this.maxTeamSize) {
			const candidate = {...this.sampleNoReplace(pool), evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84}};
			const species = this.dex.species.get(candidate.species);
			const fusion = this.dex.species.get(candidate.m.fusion);

			if (candidate.level) candidate.level = parseInt(candidate.level);
			else {
				candidate.level = this.levels[species.tier] ? this.levels[species.tier] : 95;
				candidate.level += this.levels[fusion.tier] ? this.levels[fusion.tier] : 95;
				candidate.level = Math.floor(candidate.level / 2);
			}
			if (this.validator.validateSet({...candidate, level: 100} as PokemonSet, {})) continue;
			pokemon.push(candidate);

			pool = pool.filter(set => set.species !== candidate.species);
			pool = pool.filter(set => set.fusion !== candidate.m.fusion);
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}
		return pokemon;
	}
}

export default RandomIFTeams;