import { RandomTeams } from "../gen9/teams";
import { RandomGen6Teams } from "../gen6/teams";
import { RandomBattleSets } from "../../remote/remote";
import { TeamValidator } from '../../../sim';
import { cutDex } from '../../mods/gen6infinity/pokedex'
import { Pokedex } from '../../pokedex'

export class RandomInfTeams extends RandomTeams {
	randomInfSets: Partial<RandomTeamsTypes.RandomSet>[] = RandomBattleSets['gen6infinity'];
	validator = new TeamValidator('gen6infinityag');
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

	override randomSets: { [species: string]: RandomTeamsTypes.RandomSpeciesData } = require('../gen6/sets');

	override randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();	
		
		const seed = this.prng.getSeed();
		const pokemon: RandomTeamsTypes.RandomSet[] = [];
		const InfDex = Object.keys(cutDex)
		const gen6 = new RandomGen6Teams(this.format, this.prng);

		let pool: Partial<RandomTeamsTypes.RandomSet>[] = this.dex.deepClone(this.randomInfSets);
		// Filter out mons that don't exist in Infinity, additionally not ALL mons have sets, so also filter out those that don't
		let vanillaPool = Object.keys(Pokedex).filter(mon => InfDex.includes(mon) && Object.keys(this.randomSets).includes(mon))
		let counter = 3; // Minimum number of Infinity sets

		while (pokemon.length < this.maxTeamSize) {
			const candidate = {...this.sampleNoReplace(pool), evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84}};
			const species = this.dex.species.get(candidate.species);

			const vanillaSpecies = this.sample(vanillaPool);
			const vanillaCandidate = gen6.randomSet(vanillaSpecies);

			if (candidate.level) candidate.level = parseInt(candidate.level);
			else candidate.level = this.levels[species.tier] ? this.levels[species.tier] : 95;
			if (this.validator.validateSet({...candidate, level: 100} as PokemonSet, {})) continue;


			const result = this.random(2);
			if (result === 0 || (this.maxTeamSize - pokemon.length === counter )) { //add Infinity mon
				counter -= 1;
				pokemon.push(candidate);

				pool = pool.filter(set => set.species !== candidate.species);

				if (this.dex.mod('gen9').species.get(candidate.species).exists) {
					pool = pool.filter(set => !this.dex.mod('gen9').species.get(set.species).exists);
				}
				if (vanillaPool.includes(candidate.species)) {
					vanillaPool = vanillaPool.filter(set => set !== candidate.species)
				}

			} else {
				pokemon.push(vanillaCandidate);

				vanillaPool = vanillaPool.filter(mon => mon !== vanillaSpecies);
				pool = pool.filter(set => set.species !== vanillaSpecies);

			}
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}
		return pokemon;
	}
}

export default RandomInfTeams;