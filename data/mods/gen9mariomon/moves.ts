import { Moves as Base } from '../../moves';

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
	sizzlyslide: {
		inherit: true,
		isNonstandard: null,
	},
	bittermalice: {
		inherit: true,
		secondary: {
			chance: 30,
			status: 'frz',
		},
		shortDesc: "30% chance to frostbite the target.",
	},
	ragingbull: {
		num: 873,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Raging Bull",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
		},
		onModifyType(move, pokemon) {
			switch (pokemon.species.name) {
			case 'Tauros-Paldea-Combat':
			case "Chargin' Chuck":
				move.type = 'Fighting';
				break;
			case 'Tauros-Paldea-Blaze':
				move.type = 'Fire';
				break;
			case 'Tauros-Paldea-Aqua':
				move.type = 'Water';
				break;
			}
		},
		target: "normal",
		type: "Normal",
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
		flags: { protect: 1, mirror: 1 },
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
		flags: { protect: 1, mirror: 1, nosketch: 1 },
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
			volatileStatus: 'flinch',
		},
		pp: 20,
		priority: 0,
		flags: { protect: 1, mirror: 1, nosketch: 1 },
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
		flags: { protect: 1, mirror: 1, nosketch: 1 },
		isNonstandard: "Unobtainable",
		target: "normal",
		type: "Ice",
	},
};

for (const key in Base) {
	const id = key as keyof typeof Base;
	if (Moves[id]) continue;

	if (Base[id].isNonstandard && ["Past", "Unobtainable"].includes(Base[id].isNonstandard)) {
		Moves[id] = { inherit: true, isNonstandard: null };
	}
}
