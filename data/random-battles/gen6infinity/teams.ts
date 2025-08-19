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

		// used to filter out vanilla mons and for selecting species
		let namePool = [... new Set(pool.map(set => set.species))];

		// Filter out mons that don't exist in Infinity, don't have sets, and vanilla mons that do have handmade sets
		let vanillaPool = Object.keys(Pokedex).filter(mon => InfDex.includes(mon) && Object.keys(this.randomSets).includes(mon) && !namePool.includes(mon));
		let counterInf = 2; // Minimum number of Infinity sets
		let counterVanilla = 2; // Minimum number of Vanilla sets

		while (pokemon.length < this.maxTeamSize) {

			let vanillaSpecies = this.sample(vanillaPool);
			let vanillaCandidate = gen6.randomSet(vanillaSpecies);

			// Select species and then one of its sets for better set distribution, only pick from Infinity pokemon, not vanilla ones even if they have handmade sets
			let chosenSpecies = this.sampleNoReplace(namePool.filter(id => !this.dex.mod('gen9').species.get(id).exists));

			let candidate = {...this.sampleNoReplace(pool.filter(set => set.species === chosenSpecies)), evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84}};
			let species = this.dex.species.get(candidate.species);

			if (candidate.level) candidate.level = parseInt(candidate.level);
			else candidate.level = this.levels[species.tier] ? this.levels[species.tier] : 95;
			if (this.validator.validateSet({...candidate, level: 100} as PokemonSet, {})) continue;


			let result = this.random(2);
			if (this.maxTeamSize - pokemon.length === counterVanilla ) result = 1; //skips Infinity mon altogether
			if (result === 0 || (this.maxTeamSize - pokemon.length === counterInf )) { //add Infinity mon
				counterInf -= 1;

				pokemon.push(candidate);
				namePool = namePool.filter(id => id !== candidate.species);

			} else { // vanilla pokemon
				counterVanilla -= 1;

				// Some balance adjustments
				if (vanillaCandidate.level >= 80) vanillaCandidate.level -= 1;
				if (vanillaCandidate.level > 94) vanillaCandidate.level = 94;
				if (vanillaCandidate.moves.includes('stickyweb')) vanillaCandidate.level -= 2;
				if (vanillaCandidate.species === "sunflora") vanillaCandidate.level -=2;

				// If pokemon exists in handmade sets, use handmade sets instead
				if (namePool.includes(vanillaSpecies)) {
					vanillaCandidate = {...this.sampleNoReplace(pool.filter(set => set.species === vanillaSpecies)), evs: {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84}};
					vanillaSpecies = vanillaCandidate.species;

					if (vanillaCandidate.level && typeof(vanillaCandidate.level) === 'string') vanillaCandidate.level = parseInt(vanillaCandidate.level);
					else vanillaCandidate.level = this.levels[species.tier] ? this.levels[species.tier] : 95;
					if (this.validator.validateSet({...vanillaCandidate, level: 100} as PokemonSet, {})) continue;

				}

				pokemon.push(vanillaCandidate);
				vanillaPool = vanillaPool.filter(mon => this.dex.mod('gen9').species.get(mon).baseSpecies !== this.dex.mod('gen9').species.get(vanillaSpecies).baseSpecies);
				namePool = namePool.filter(id => id !== vanillaSpecies)

			}
		}

		if (pokemon.length < this.maxTeamSize && pokemon.length < 12) {
			throw new Error(`Could not build a random team for ${this.format} (seed=${seed})`);
		}
		return pokemon;
	}
}

export default RandomInfTeams;