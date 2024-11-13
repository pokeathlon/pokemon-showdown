const reversal: string[] = [
	"gloom", "poliwhirl", "slowpoke", "tyrogue", "eevee", "clamperl", "gloomegho",
];

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen6',
	init() {
		for (var i in reversal) {
			const mon = this.species.get(this.toID(i));
			if (mon.evos && mon.evos.length > 1) {
				for (var receiver of [mon.name].concat(mon.evos)) {
					if (!(this.toID(receiver) in this.data.Learnsets)) continue;
					var learnset = this.data.Learnsets[this.toID(receiver)].learnset;
					if (!learnset) learnset = {};
					for (var evo of mon.evos) {
						if (this.toID(evo) in this.data.Learnsets) {
							var tomerge = this.data.Learnsets[this.toID(evo)].learnset;
							for (var move in tomerge) {
								for (var lMethod of tomerge[move as keyof typeof tomerge]) {
									if (!learnset[move as keyof typeof learnset]) learnset[move as keyof typeof learnset] = [];
									if (!learnset[move as keyof typeof learnset].includes(lMethod)) learnset[move as keyof typeof learnset].push(lMethod);
								}
							}
						}
					}
				}
			}
		}
	}
};
