import { RandomPOATeams } from "../gen9pokeathlon/teams";

export class RandomMarioTeams extends RandomPOATeams {
	override sheet = this.format.gameType === 'singles' ? 'gen9chaos' : 'gen9mariomonvgc';
	override validatorFormat = 'gen9mariomonag';

	override getSet(set: Partial<RandomTeamsTypes.RandomSet>) {
		return { ...super.getSet(set), shiny: this.randomChance(1, 10) };
	}

	override isAllowed(set: Partial<RandomTeamsTypes.RandomSet>, team: RandomTeamsTypes.RandomSet[]) {
		const limitFactor = Math.round(this.maxTeamSize / 6) || 1;
		const species = this.dex.species.get(set.species);
		return super.isAllowed(set, team) && this.dex.types.names().every(typeName => {
			const typeMod = this.dex.getEffectiveness(typeName, species);
			if (typeMod <= 0) return true;
			const typeMods = team.map(member => this.dex.getEffectiveness(typeName, this.dex.species.get(member.species)));
			return typeMods.filter(mod => mod > 0).length < 3 * limitFactor &&
				(typeMod <= 1 || typeMods.filter(mod => mod > 1).length < limitFactor);
		});
	}

	override sampleSet(pool: Partial<RandomTeamsTypes.RandomSet>[]) {
		const species = this.sample([...new Set(pool.map(set => set.species))]);
		return pool.splice(pool.indexOf(this.sample(pool.filter(set => set.species === species))), 1)[0];
	}
}

export default RandomMarioTeams;
