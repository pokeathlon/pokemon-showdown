const {Dex} = require('../../../sim/dex');

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
};

const reversal: string[] = [
	"gloom", "poliwhirl", "slowpoke", "tyrogue", "eevee", "clamperl", "gloomegho",
];

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
		for (var i of reversal) {
			const mon = this.species.get(this.toID(i));
			if (mon.evos && mon.evos.length > 1) {
				for (var receiver of [mon.name].concat(mon.evos)) {
					if (!(this.toID(receiver) in Dex.mod('gen9infinity').data.Learnsets)) continue;
					var locallearnset = Dex.mod('gen9infinity').data.Learnsets[this.toID(receiver)].learnset;
					if (!locallearnset) locallearnset = {};
					for (var evo of mon.evos) {
						if (this.toID(evo) in Dex.mod('gen6infinity').data.Learnsets) {
							var tomerge = Dex.mod('gen6infinity').data.Learnsets[this.toID(evo)].learnset;
							for (var move in tomerge) {
								for (var lMethod of tomerge[move as keyof typeof tomerge]) {
									if (!locallearnset[move as keyof typeof locallearnset]) locallearnset[move as keyof typeof locallearnset] = [];
									if (!locallearnset[move as keyof typeof locallearnset].includes(lMethod)) locallearnset[move as keyof typeof locallearnset].push(lMethod);
								}
							}
						}
					}
				}
			}
		}
	}
};
