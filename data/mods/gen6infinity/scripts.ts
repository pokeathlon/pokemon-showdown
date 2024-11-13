export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen6',
	init() {
		for (let i in this.data.Pokedex) {
			const mon = this.data.Pokedex[i];
			if (mon.evos && mon.evos.length > 1) {
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
