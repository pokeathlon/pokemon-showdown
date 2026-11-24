import { RandomPOATeams } from "../gen9pokeathlon/teams";
import { RandomGen6Teams } from "../gen6/teams";
import { cutDex } from '../../mods/gen6infinity/pokedex';
import { toID } from '../../../sim/dex';

export class RandomInfTeams extends RandomPOATeams {
	override sheet = 'gen6infinity';
	override validatorFormat = 'gen6infinityag';

	override randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const pokemon: RandomTeamsTypes.RandomSet[] = [];
		const gen6 = new RandomGen6Teams(this.format, this.prng);
		const gen9 = this.dex.mod('gen9');
		const removers = ['rapidspin', 'defog', 'gale', 'transcendentsword'];
		const pool = this.getPool();
		const vanillaPool = [...new Set([
			...Object.keys(gen6.randomSets).filter(id => cutDex[id]),
			...pool.map(set => set.species!).filter(id => gen9.species.get(id).exists),
		])];
		let counterInf = 2;
		let counterVanilla = 2;

		while (pokemon.length < this.maxTeamSize) {
			const remaining = this.maxTeamSize - pokemon.length;
			const forceRemover = remaining === 1 &&
				!pokemon.some(set => set.moves.some(move => removers.includes(toID(move))));

			if (forceRemover || remaining === counterInf || (remaining !== counterVanilla && !this.random(2))) {
				const sets = pool.filter(set => !gen9.species.get(set.species).exists && this.isAllowed(set, pokemon) &&
					(!forceRemover || set.moves!.some(move => removers.includes(toID(move)))));
				const species = this.sample([...new Set(sets.map(set => set.species))]);
				pokemon.push(this.getSet(this.sample(sets.filter(set => set.species === species))));
				counterInf--;
			} else {
				const species = this.sample(vanillaPool.filter(id => this.isAllowed({ species: id }, pokemon)));
				const sets = pool.filter(set => set.species === species);
				if (sets.length) {
					pokemon.push(this.getSet(this.sample(sets)));
				} else {
					const set = gen6.randomSet(species);
					if (set.level >= 80) set.level -= 1;
					if (set.level > 94) set.level = 94;
					if (set.moves.includes('stickyweb')) set.level -= 2;
					if (species === 'sunflora') set.level -= 2;
					pokemon.push(set);
				}
				counterVanilla--;
			}
		}

		return pokemon;
	}
}

export default RandomInfTeams;
