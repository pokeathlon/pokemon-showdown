import {Scripts as Chaos} from '../gen9chaos/scripts';

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init: Chaos.init,
	actions: Chaos.actions,
	pokemon: Chaos.pokemon,
};
