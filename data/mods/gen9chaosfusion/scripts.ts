export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init: require('../gen9chaos/scripts').Scripts.init,
	actions: require('../gen9chaos/scripts').Scripts.actions,
	pokemon: require('../gen9chaos/scripts').Scripts.pokemon,
};
