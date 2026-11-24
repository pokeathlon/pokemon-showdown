import { RandomTeams } from "../gen9/teams";
import { RandomBattleSets } from "../../remote/remote";
import { TeamValidator } from '../../../sim';

const legalSets: { [k: string]: Partial<RandomTeamsTypes.RandomSet>[] } = {};

export class RandomPOATeams extends RandomTeams {
	sheet = 'gen9chaos';
	validatorFormat = 'gen9poaag';
	levels: { [tier: string]: number } = {
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

	getPool() {
		const key = `${this.sheet}:${this.validatorFormat}`;
		if (!legalSets[key]) {
			const validator = new TeamValidator(this.validatorFormat);
			legalSets[key] = RandomBattleSets[this.sheet].filter(set => !validator.validateSet({
				...set, moves: [...set.moves!], evs: { hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84 }, level: 100,
			} as PokemonSet, {}));
		}
		return legalSets[key];
	}

	getSet(set: Partial<RandomTeamsTypes.RandomSet>) {
		return {
			...set,
			moves: [...set.moves!],
			evs: { hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84 },
			level: Number(set.level) || this.levels[this.dex.species.get(set.species).tier] || 95,
		} as RandomTeamsTypes.RandomSet;
	}

	isAllowed(set: Partial<RandomTeamsTypes.RandomSet>, team: RandomTeamsTypes.RandomSet[]) {
		const baseSpecies = this.dex.species.get(set.species).baseSpecies;
		return team.every(member => this.dex.species.get(member.species).baseSpecies !== baseSpecies);
	}

	sampleSet(pool: Partial<RandomTeamsTypes.RandomSet>[]) {
		return this.sampleNoReplace(pool);
	}

	override randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const pokemon: RandomTeamsTypes.RandomSet[] = [];
		const pool = [...this.getPool()];

		while (pool.length && pokemon.length < this.maxTeamSize) {
			const set = this.sampleSet(pool);
			if (this.isAllowed(set, pokemon)) pokemon.push(this.getSet(set));
		}

		if (pokemon.length < this.maxTeamSize) {
			throw new Error(`Could not build a random team for ${this.format}`);
		}
		return pokemon;
	}
}

export default RandomPOATeams;
