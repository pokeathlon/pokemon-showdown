import { RandomInsTeams } from "../gen6insurgence/teams";

export class RandomChaosTeams extends RandomInsTeams {
	override sheet = this.format.gameType === 'singles' ? 'gen9chaos' : 'gen9chaosdoubles';
	override validatorFormat = 'gen9chaosag';

	override isAllowed(set: Partial<RandomTeamsTypes.RandomSet>, team: RandomTeamsTypes.RandomSet[]) {
		return super.isAllowed(set, team) &&
			!(this.dex.items.get(set.item).megaStone && team.some(member => this.dex.items.get(member.item).megaStone));
	}
}

export default RandomChaosTeams;
