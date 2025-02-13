const prevos: {[k: string]: string[]} = {
	"seikamater": ["Sponee", "Smore", "Tricwe"],
};

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	pokemon: {
		formeChange(
			speciesId: string | Species, source: Effect | null = null,
			isPermanent?: boolean, message?: string
		) {
			const rawSpecies = this.battle.dex.species.get(speciesId);

			const species = this.setSpecies(rawSpecies, source);
			if (!species) return false;

			if (this.battle.gen <= 2) return true;

			// The species the opponent sees
			const apparentSpecies =
				this.illusion ? this.illusion.species.name : species.baseSpecies;
			if (isPermanent) {
				this.baseSpecies = rawSpecies;
				this.details = species.name + (this.level === 100 ? '' : ', L' + this.level) +
					(this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '');
				let details = (this.illusion || this).details;
				if (this.terastallized) details += `, tera:${this.terastallized}`;
				if (!this.illusion) this.battle.add('detailschange', this, details);
				if (!source) {
					// Tera forme
					// Ogerpon/Terapagos text goes here
				} else if (source.effectType === 'Item') {
					this.canTerastallize = null; // National Dex behavior
					if (source.zMove) {
						this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
					} else if (source.onPrimal) {
						if (this.illusion) {
							this.ability = '';
							this.battle.add('-primal', this.illusion, species.requiredItem);
						} else {
							this.battle.add('-primal', this, species.requiredItem);
						}
					} else {
						if (this.illusion) {
							const allowedItems = this.battle.dex.items.all().filter(item => ((!item.isNonstandard || ['Unobtainable', 'Past'].includes(item.isNonstandard)) && item.exists));
							let megaForme;
							for (const item of allowedItems) {
								if (item.megaEvolves === this.illusion.species.name) megaForme = this.battle.dex.species.get(item.megaStone);
							}
							if (megaForme) {
								const illusionDetails = this.illusion.setSpecies(megaForme, source).name +
									(this.level === 100 ? '' : ', L' + this.level) + (this.illusion.gender === '' ? '' : ', ' + this.illusion.gender) + (this.illusion.set.shiny ? ', shiny' : '');
								this.battle.add('detailschange', this, illusionDetails);
								this.battle.add('-mega', this, megaForme.name, megaForme.requiredItem);
								this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
							}
						} else {
							this.battle.add('-mega', this, apparentSpecies, species.requiredItem);
							this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
						}
					}
				} else if (source.effectType === 'Status') {
					// Shaymin-Sky -> Shaymin
					this.battle.add('-formechange', this, species.name, message);
				}
			} else {
				if (source?.effectType === 'Ability') {
					this.battle.add('-formechange', this, species.name, message, `[from] ability: ${source.name}`);
				} else {
					this.battle.add('-formechange', this, this.illusion ? this.illusion.species.name : species.name, message);
				}
			}
			if (isPermanent && (!source || !['disguise', 'iceface', 'proteanmaxima'].includes(source.id))) {
				if (this.illusion) {
					this.ability = ''; // Don't allow Illusion to wear off
					this.addVolatile('ability:illusion');
				}
				// Ogerpon's forme change doesn't override permanent abilities
				if (source || !this.getAbility().flags['cantsuppress']) this.setAbility(species.abilities['0'], null, true);
				// However, its ability does reset upon switching out
				this.baseAbility = Dex.toID(species.abilities['0']);
			}
			if (this.terastallized) {
				this.knownType = true;
				this.apparentType = this.terastallized;
			}
			return true;
		},
	},
	init() {
		for (const mon in prevos) {
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
						if (method.startsWith('6')) {
							if (!learnset[move as keyof typeof learnset]) learnset[move as keyof typeof learnset] = [];
							if (!learnset[move as keyof typeof learnset].includes(method)) learnset[move as keyof typeof learnset].push(method);
						}
					}
				}
			}
		}
	},
};
