const prevos: {[k: string]: string[]} = {
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
	"nidorook": ["Nidorina", "Nidorino"],
}

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		for (var mon in prevos) {
			var learnset = this.data.Learnsets[this.toID(mon)].learnset;
			if (!learnset) learnset = {};
			var learnfrom = prevos[mon];
			var foundnew = true;
			while (foundnew) {
				foundnew = false;
				for (var prevo of learnfrom) {
					const species = this.species.get(prevo);
					if (species.prevo && !learnfrom.includes(species.prevo)) {
						learnfrom.push(species.prevo);
						foundnew = true;
					}
				}
			}
			for (var prevo of learnfrom) {
				var toadd = this.data.Learnsets[this.toID(prevo)].learnset;
				for (var move in toadd) {
					for (var method of toadd[move as keyof typeof toadd]) {
						if (method.startsWith('6')) {
							if (!learnset[move as keyof typeof learnset]) learnset[move as keyof typeof learnset] = [];
							if (!learnset[move as keyof typeof learnset].includes(method)) learnset[move as keyof typeof learnset].push(method);
						}
					}
				}
			}
		}
		for (let i in this.data.Pokedex) {
			const mon = this.data.Pokedex[i];
			if (mon.evos && mon.evos.length > 1 && !["Digimon"].includes(mon.eggGroups[1])) {
				for (var receiver of [mon.name].concat(mon.evos)) {
					if (!(this.toID(receiver) in this.data.Learnsets)) continue;
					var learnset = this.data.Learnsets[this.toID(receiver)].learnset;
					if (!learnset) learnset = {};
					for (var evo of mon.evos) {
						if (this.toID(evo) in this.data.Learnsets) {
							var toadd = this.data.Learnsets[this.toID(evo)].learnset;
							for (var move in toadd) {
								for (var method of toadd[move as keyof typeof toadd]) {
									if (!learnset[move as keyof typeof learnset]) learnset[move as keyof typeof learnset] = [];
									if (!learnset[move as keyof typeof learnset].includes(method)) learnset[move as keyof typeof learnset].push(method);
								}
							}
						}
					}
				}
			}
		}
	}
};
