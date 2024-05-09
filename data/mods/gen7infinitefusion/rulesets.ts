export const Rulesets: {[k: string]: ModdedFormatData} = {
	teampreview: {
		inherit: true,
		onTeamPreview() {
			this.add('clearpoke');
			for (const pokemon of this.getAllPokemon()) {
				const details = pokemon.details.replace(', shiny', '');
				this.add('poke', pokemon.side.id, details, pokemon.item ? 'item' : '');
			}
			this.makeRequest('teampreview');
		},
	},
};
