import { RandomTeams } from "../gen9/teams";
import { RandomBattleSets } from "../../remote/remote";
import { TeamValidator } from '../../../sim';
import { cutDex } from '../../mods/gen9mariomon/pokedex';

export class RandomMarioTeams extends RandomTeams {
	randomMarioSets: Partial<RandomTeamsTypes.RandomSet>[] = RandomBattleSets['gen9chaos'];
	validator = new TeamValidator('gen9mariomonag');
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
		const typeWeaknesses: { [k: string]: number } = {};
		const typeDoubleWeaknesses: { [k: string]: number } = {};
		const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

		const seed = this.prng.getSeed();
		const pokemon: RandomTeamsTypes.RandomSet[] = [];
		let pool: Partial<RandomTeamsTypes.RandomSet>[] = this.dex.deepClone(this.randomMarioSets);
		const MarioDex = Object.keys(cutDex);
		pool = pool.filter(mon => MarioDex.includes(mon.species!)); // Filters pool to only be mariomons

		while (pokemon.length < this.maxTeamSize) {
			let skip = false;
			const chosenSpecies = this.sampleNoReplace(MarioDex); // Chooses random Mariomon
			const tempPool = pool.filter(mon => chosenSpecies === mon.species); // Creates temporary pool exclusively of chosenSpecies sets
			const candidate = { ...this.sampleNoReplace(tempPool), evs: { hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84 } };
			const species = this.dex.species.get(candidate.species);

			// Limit three weak to any type, and one double weak to any type
			for (const typeName of this.dex.types.names()) {
				// it's weak to the type
				if (this.dex.getEffectiveness(typeName, species) > 0) {
					if (!typeWeaknesses[typeName]) typeWeaknesses[typeName] = 0;
					if (typeWeaknesses[typeName] >= 3 * limitFactor) {
						skip = true;
						break;
					}
				}
				if (this.dex.getEffectiveness(typeName, species) > 1) {
					if (!typeDoubleWeaknesses[typeName]) typeDoubleWeaknesses[typeName] = 0;
					if (typeDoubleWeaknesses[typeName] >= limitFactor) {
						skip = true;
						break;
					}
				}
			}
			if (skip) continue;

			if (candidate.level) candidate.level = parseInt(candidate.level);
			else candidate.level = this.levels[species.tier] ? this.levels[species.tier] : 95;
			if (this.validator.validateSet({ ...candidate, level: 100 } as PokemonSet, {})) continue;
			pokemon.push(candidate);

			// Increment weakness counter
			for (const typeName of this.dex.types.names()) {
				// it's weak to the type
				if (this.dex.getEffectiveness(typeName, species) > 0) {
					typeWeaknesses[typeName]++;
				}
				if (this.dex.getEffectiveness(typeName, species) > 1) {
					typeDoubleWeaknesses[typeName]++;
				}
			}

			pool = pool.filter(set => set.species !== candidate.species);
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}
		return pokemon;
	}
}

export default RandomMarioTeams;
