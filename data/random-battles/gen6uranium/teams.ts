import { RandomTeams } from "../gen9/teams";
import { RandomBattleSets } from "../../remote/remote";
import { TeamValidator } from '../../../sim';

export class RandomUraTeams extends RandomTeams {
	randomUraSets: Partial<RandomTeamsTypes.RandomSet>[] = RandomBattleSets['gen9chaos']
	levels: AnyObject = {
		"AG": 55,
		"Uber": 60,
		"(Uber)": 60,
		"OU": 65,
		"(OU)": 65,
		"UUBL": 70,
		"UU": 70,
		"RUBL": 75,
		"RU": 75,
		"NFE": 80,
		"LC": 90,
	};

	override randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const seed = this.prng.getSeed();
		const pokemon: RandomTeamsTypes.RandomSet[] = [];
		let pool: Partial<RandomTeamsTypes.RandomSet>[] = this.dex.deepClone(this.randomUraSets);

		while (pokemon.length < this.maxTeamSize) {
			const candidate = {...this.sampleNoReplace(pool), evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84}};
			const species = this.dex.species.get(candidate.species);

			if (candidate.level) candidate.level = parseInt(candidate.level);
			else candidate.level = this.levels[species.tier] ? this.levels[species.tier] : 75;
			if (TeamValidator.get('gen6uraniumag').validateSet({...candidate, level: 100} as PokemonSet, {})) continue;
			pokemon.push(candidate);

			pool = pool.filter(set => set.species !== candidate.species);

			if (this.dex.mod('gen9').species.get(candidate.species).exists) {
				pool = pool.filter(set => !this.dex.mod('gen9').species.get(set.species).exists);
			}
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}
		return pokemon;
	}
}

export default RandomUraTeams;