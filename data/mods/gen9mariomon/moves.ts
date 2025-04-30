const {Dex} = require('../../../sim/dex');
export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	// Modded
	darkvoid: {
		inherit: true,
		accuracy: 80,
		onTry(source, target, move) {
			if (source.species.name === 'Antasma' || move.hasBounced) {
				return;
			}
			this.add('-fail', source, 'move: Dark Void');
			this.hint("Only a Pokemon whose form is Antasma can use this move.");
			return null;
		},
	},

	// Additions
	hammerthrow: {
		num: 0,
		accuracy: 85,
		basePower: 25,
		category: "Physical",
		name: "Hammer Throw",
		shortDesc: "Hits 2-5 times. Changes based on the weather.",
		multihit: [2, 5],
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	fireball: {
		num: 0,
		accuracy: 85,
		basePower: 25,
		category: "Special",
		name: "Fire Ball",
		shortDesc: "Hits 3 times. 15% chance to burn.",
		multihit: 3,
		secondary: {
			chance: 15,
			status: 'brn',
		},
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, nosketch: 1},
		isNonstandard: "Unobtainable",
		target: "normal",
		type: "Fire",
	},
	boomerang: {
		num: 0,
		accuracy: 90,
		basePower: 45,
		category: "Physical",
		name: "Boomerang",
		shortDesc: "Hits 2 times. 15% chance to flinch.",
		multihit: 2,
		secondary: {
			chance: 15,
			volatileStatus: 'flinch'
		},
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, nosketch: 1},
		isNonstandard: "Unobtainable",
		target: "normal",
		type: "Flying",
	},
	icetoss: {
		num: 0,
		accuracy: 85,
		basePower: 25,
		category: "Special",
		name: "Ice Toss",
		shortDesc: "Hits 3 times. 15% chance to frostbite.",
		multihit: 3,
		secondary: {
			chance: 15,
			status: 'frz',
		},
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, nosketch: 1},
		isNonstandard: "Unobtainable",
		target: "normal",
		type: "Ice",
	},
};

for (const i of Dex.moves.all()) {
	if (["Past", "Unobtainable"].includes(i.isNonstandard)) {
		if (!Moves[i.id]) Moves[i.id] = {inherit: true};
		Moves[i.id].isNonstandard = null;
	}
}
