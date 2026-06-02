export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	frb: {
		name: 'frb',
		effectType: 'Status',
		onStart(target, source, sourceEffect) {
			if (sourceEffect && sourceEffect.effectType === 'Ability') {
				this.add('-status', target, 'frb', '[from] ability: ' + sourceEffect.name, `[of] ${source}`);
			} else {
				this.add('-status', target, 'frb');
			}
		},
		// Damage reduction is handled directly in the sim/battle.js damage function (scripts)
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 16);
		},
	},
	
};
