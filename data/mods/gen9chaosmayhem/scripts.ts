import { Scripts as Chaos } from '../gen9chaos/scripts';

const prevos: { [k: string]: string[] } = {
	// Digimon
	"unimon": ["Elecmon", "Biyomon", "Patamon"],
	"mojyamon": ["Elecmon", "Gomamon"],
	"piximon": ["Unimon", "Mojyamon"],
	"airdramon": ["Biyomon", "Patamon"],
	"kuwagamon": ["Kunemon", "Tentomon"],
	"frigimon": ["Gabumon", "Gomamon"],
	"ogremon": ["Agumon", "Gabumon"],
	"leomon": ["Elecmon", "Gazimon"],
	"drimogemon": ["Gabumon", "Elecmon"],
	"monochromon": ["Agumon", "Gabumon"],
	"shellmon": ["Betamon", "Palmon"],
	"numemon": ["Agumon", "Betamon", "Palmon", "Gabumon"],

	"nidorook": ["Nidorino", "Nidorina"],
	"penumbralith": ["Solrock", "Lunatone"],
	"seikamater": ["Sponee", "Smore", "Tricwe"],
};

const modEggGroups: { [k: string]: string } = {
	"Infinite Fusion": "gen9infinitefusion",
	"Uranium": "gen9uranium",
	"Insurgence": "gen9insurgence",
	"Infinity": "gen9infinity",
	"Mariomon": "gen9mariomon",
	"Soulstones": "gen9soulstones",
};

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		const newMoves = require('./moves').newMoves;
		const newAbilities = require('./abilities').newAbilities;
		for (const mon in prevos) {
			if (!this.data.Learnsets[this.toID(mon)]) console.log("No learnset data for: " + this.toID(mon));
			let learnset = this.data.Learnsets[this.toID(mon)].learnset;
			if (!learnset) learnset = {};
			const learnfrom = prevos[mon];
			let foundnew = true;
			while (foundnew) {
				foundnew = false;
				for (const prevo of learnfrom) {
					const species = this.species.get(prevo);
					if (species.prevo && !learnfrom.includes(species.prevo)) {
						learnfrom.push(species.prevo);
						foundnew = true;
					}
				}
			}
			for (const prevo of learnfrom) {
				const toadd = this.data.Learnsets[this.toID(prevo)].learnset;
				for (const move in toadd) {
					for (const method of toadd[move as keyof typeof toadd]) {
						if (method.startsWith('9')) {
							if (!learnset[move as keyof typeof learnset]) learnset[move as keyof typeof learnset] = [];
							if (!learnset[move as keyof typeof learnset].includes(method)) learnset[move as keyof typeof learnset].push(method);
						}
					}
				}
			}
		}
		for (const pokemon in this.data.Learnsets) {
			if (!this.data.Learnsets[pokemon].learnset) continue;

			const eggGroup = this.data.Pokedex[pokemon]?.eggGroups?.find(eggGroup => modEggGroups[eggGroup]);

			if (eggGroup) {
				const mod = modEggGroups[eggGroup];

				for (const [moveid, newMove] of Object.entries(newMoves[mod]) as [ID, ID][]) {
					if (this.data.Learnsets[pokemon].learnset[moveid]) {
						this.data.Learnsets[pokemon].learnset[newMove] = this.data.Learnsets[pokemon].learnset[moveid];
						delete this.data.Learnsets[pokemon].learnset[moveid];
					}
				}
			}

			for (const move in this.data.Learnsets[pokemon].learnset) {
				if (this.data.Moves[move]) {
					this.data.Moves[move].isNonstandard = null;
				} else {
					// console.log('Misspelled move: ' + move);
				}
			}
		}
		for (const pokemon in this.data.Pokedex) { // replace abilities
			if (!this.data.Pokedex[pokemon]) continue;

			const eggGroup = this.data.Pokedex[pokemon]?.eggGroups?.find(eggGroup => modEggGroups[eggGroup]);

			if (eggGroup) {
				const mod = modEggGroups[eggGroup];

				for (const [abilityid, newAbility] of Object.entries(newAbilities[mod]) as [ID, ID][]) {
					for (const [slot, ability] of Object.entries(this.data.Pokedex[pokemon].abilities) as [('0' | '1' | 'H' | 'S'), string][]) {
						if (this.toID(ability) === abilityid) this.data.Pokedex[pokemon].abilities[slot] = this.data.Abilities[newAbility].name;
					}
				}
			}
		}
	},
	actions: Chaos.actions,
	pokemon: Chaos.pokemon,
};
