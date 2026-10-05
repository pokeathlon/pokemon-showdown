import { RandomPOATeams } from "../gen9pokeathlon/teams";

export class RandomInsTeams extends RandomPOATeams {
	override validatorFormat = 'gen6insurgenceag';

	override isAllowed(set: Partial<RandomTeamsTypes.RandomSet>, team: RandomTeamsTypes.RandomSet[]) {
		const gen9 = this.dex.mod('gen9');
		return super.isAllowed(set, team) &&
			!(gen9.species.get(set.species).exists && team.some(member => gen9.species.get(member.species).exists));
	}
}

export default RandomInsTeams;
