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
						if (!learnset[move as keyof typeof learnset]) learnset[move as keyof typeof learnset] = [];
						if (!learnset[move as keyof typeof learnset].includes(method)) learnset[move as keyof typeof learnset].push(method);
					}
				}
			}
		}
	},
	actions: {
		hitStepAccuracy(targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) {
			const hitResults = [];
			for (const [i, target] of targets.entries()) {
				this.battle.activeTarget = target;
				// calculate true accuracy
				let accuracy = move.accuracy;
				if (move.ohko) { // bypasses accuracy modifiers
					if (!target.isSemiInvulnerable()) {
						accuracy = 30;
						if (move.ohko === 'Ice' && this.battle.gen >= 7 && !pokemon.hasType('Ice')) {
							accuracy = 20;
						}
						if (!target.volatiles['dynamax'] && pokemon.level >= target.level &&
							(move.ohko === true || !target.hasType(move.ohko))) {
							accuracy += (pokemon.level - target.level);
						} else {
							this.battle.add('-immune', target, '[ohko]');
							hitResults[i] = false;
							continue;
						}
					}
				} else {
					accuracy = this.battle.runEvent('ModifyAccuracy', target, pokemon, move, accuracy);
					if (accuracy !== true) {
						let boost = 0;
						if (!move.ignoreAccuracy) {
							const boosts = this.battle.runEvent('ModifyBoost', pokemon, null, null, { ...pokemon.boosts });
							boost = this.battle.clampIntRange(boosts['accuracy'], -6, 6);
						}
						if (!move.ignoreEvasion) {
							const boosts = this.battle.runEvent('ModifyBoost', target, null, null, { ...target.boosts });
							boost = this.battle.clampIntRange(boost - boosts['evasion'], -6, 6);
						}
						if (boost > 0) {
							accuracy = this.battle.trunc(accuracy * (3 + boost) / 3);
						} else if (boost < 0) {
							accuracy = this.battle.trunc(accuracy * 3 / (3 - boost));
						}
					}
				}
				if (
					move.alwaysHit || (move.id === 'toxic' && this.battle.gen >= 8 && pokemon.hasType('Poison')) ||
					(move.target === 'self' && move.category === 'Status' && !target.isSemiInvulnerable())
				) {
					accuracy = true; // bypasses ohko accuracy modifiers
				} else {
					accuracy = this.battle.runEvent('Accuracy', target, pokemon, move, accuracy);
				}
				if (accuracy !== true && !this.battle.randomChance(accuracy, 100)) {
					if (move.smartTarget) {
						move.smartTarget = false;
					} else {
						if (!move.spreadHit) this.battle.attrLastMove('[miss]');
						this.battle.add('-miss', pokemon, target);
					}
					if (!move.ohko && pokemon.hasItem('blunderpolicy') && pokemon.useItem()) {
						this.battle.boost({ spe: 2 }, pokemon);
					}
					if (pokemon.hasAbility('glitchout')) {
						let glitchmoves = ["swordsdance", "mindreader", "vanish", "irondefense", "nastyplot", "amnesia", "agility", "whirlwind", "stealthrock", "spikes", "toxicspikes", "stickyweb", "reflect", "lightscreen"]
						this.battle.actions.useMove(this.battle.sample(glitchmoves), pokemon);
					}
					hitResults[i] = false;
					continue;
				}
				hitResults[i] = true;
			}
			return hitResults;
		},
	},
};
