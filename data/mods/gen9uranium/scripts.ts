const prevos: {[k: string]: string[]} = {
	"seikamater": ["Sponee", "Smore", "Tricwe"],
};

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
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
	pokemon: {
		formeChange(
			speciesId: string | Species, source: Effect | null = null,
			isPermanent?: boolean, abilitySlot = '0', message?: string
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
					(this.gender === '' ? '' : ', ' + this.gender) + (this.set.shiny ? ', shiny' : '') +
						(this.m.fusion ? ', fusion: ' + this.m.fusion + (this.set.altsprite ? ', alt: ' + this.set.altsprite : '') : '');
				let details = (this.illusion || this).details;
				if (this.terastallized) details += `, tera:${this.terastallized}`;
				if (!this.illusion) this.battle.add('detailschange', this, details);
				if (!source) {
					// Tera forme
					// Ogerpon/Terapagos text goes here
					this.formeRegression = true;
				} else if (source.effectType === 'Item') {
					this.canTerastallize = null; // National Dex behavior
					if (source.zMove) {
						this.battle.add('-burst', this, apparentSpecies, species.requiredItem);
						this.moveThisTurnResult = true; // Ultra Burst counts as an action for Truant
					} else if (source.isPrimalOrb) {
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
									(this.level === 100 ? '' : ', L' + this.level) + (this.illusion.gender === '' ? '' : ', ' + this.illusion.gender) + (this.illusion.set.shiny ? ', shiny' : '') +
										(this.illusion.m.fusion ? ', fusion: ' + this.illusion.m.fusion + (this.illusion.set.altsprite ? ', alt: ' + this.illusion.set.altsprite : '') : '');
								this.battle.add('detailschange', this, illusionDetails);
								this.battle.add('-mega', this, megaForme.name, megaForme.requiredItem);
								this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
							}
						} else {
							this.battle.add('-mega', this, apparentSpecies, species.requiredItem);
							this.moveThisTurnResult = true; // Mega Evolution counts as an action for Truant
						}
					}
					this.formeRegression = true;
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
				if (this.illusion && source) {
					// Tera forme by Ogerpon or Terapagos breaks the Illusion
					this.ability = ''; // Don't allow Illusion to wear off
					this.addVolatile('ability:illusion');
				}
				const ability = species.abilities[abilitySlot] || species.abilities['0'];
				// Ogerpon's forme change doesn't override permanent abilities
				if (source || !this.getAbility().flags['cantsuppress']) this.setAbility(ability, null, null, true);
				// However, its ability does reset upon switching out
				this.baseAbility = this.battle.dex.toID(ability);
			}
			if (this.terastallized) {
				this.knownType = true;
				this.apparentType = this.terastallized;
			}
			return true;
		},
	},
	queue: {
		resolveAction(action: ActionChoice, midTurn = false): Action[] {
			if (!action) throw new Error(`Action not passed to resolveAction`);
			if (action.choice === 'pass') return [];
			const actions = [action];
	
			if (!action.side && action.pokemon) action.side = action.pokemon.side;
			if (!action.move && action.moveid) action.move = this.battle.dex.getActiveMove(action.moveid);
			if (!action.order) {
				const orders: { [choice: string]: number } = {
					team: 1,
					start: 2,
					instaswitch: 3,
					beforeTurn: 4,
					beforeTurnMove: 5,
					revivalblessing: 6,
	
					megaEvo: 101,
					megaEvoX: 101,
					megaEvoY: 101,

					runSwitch: 102,
					switch: 104,

					runDynamax: 105,
					terastallize: 106,
					priorityChargeMove: 107,
	
					shift: 200,
					// default is 200 (for moves)
	
					residual: 300,
				};
				if (action.choice in orders) {
					action.order = orders[action.choice];
				} else {
					action.order = 200;
					if (!['move', 'event'].includes(action.choice)) {
						throw new Error(`Unexpected orderless action ${action.choice}`);
					}
				}
			}
			if (!midTurn) {
				if (action.choice === 'move') {
					if (!action.maxMove && !action.zmove && action.move.beforeTurnCallback) {
						actions.unshift(...this.resolveAction({
							choice: 'beforeTurnMove', pokemon: action.pokemon, move: action.move, targetLoc: action.targetLoc,
						}));
					}
					if (action.mega && !action.pokemon.isSkyDropped()) {
						actions.unshift(...this.resolveAction({
							choice: 'megaEvo',
							pokemon: action.pokemon,
						}));
					}
					if (action.megax && !action.pokemon.isSkyDropped()) {
						actions.unshift(...this.resolveAction({
							choice: 'megaEvoX',
							pokemon: action.pokemon,
						}));
					}
					if (action.megay && !action.pokemon.isSkyDropped()) {
						actions.unshift(...this.resolveAction({
							choice: 'megaEvoY',
							pokemon: action.pokemon,
						}));
					}
					if (action.terastallize && !action.pokemon.terastallized) {
						actions.unshift(...this.resolveAction({
							choice: 'terastallize',
							pokemon: action.pokemon,
						}));
					}
					if (action.maxMove && !action.pokemon.volatiles['dynamax']) {
						actions.unshift(...this.resolveAction({
							choice: 'runDynamax',
							pokemon: action.pokemon,
						}));
					}
					if (!action.maxMove && !action.zmove && action.move.priorityChargeCallback) {
						actions.unshift(...this.resolveAction({
							choice: 'priorityChargeMove',
							pokemon: action.pokemon,
							move: action.move,
						}));
					}
					action.fractionalPriority = this.battle.runEvent('FractionalPriority', action.pokemon, null, action.move, 0);
				} else if (['switch', 'instaswitch'].includes(action.choice)) {
					if (typeof action.pokemon.switchFlag === 'string') {
						action.sourceEffect = this.battle.dex.moves.get(action.pokemon.switchFlag as ID) as any;
					}
					action.pokemon.switchFlag = false;
				}
			}
	
			const deferPriority = this.battle.gen === 7 && action.mega && action.mega !== 'done';
			if (action.move) {
				let target = null;
				action.move = this.battle.dex.getActiveMove(action.move);
	
				if (!action.targetLoc) {
					target = this.battle.getRandomTarget(action.pokemon, action.move);
					// TODO: what actually happens here?
					if (target) action.targetLoc = action.pokemon.getLocOf(target);
				}
				action.originalTarget = action.pokemon.getAtLoc(action.targetLoc);
			}
			if (!deferPriority) this.battle.getActionSpeed(action);
			return actions as any;
		},
	},
};
