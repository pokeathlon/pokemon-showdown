import { Learnsets as Base } from '../../learnsets';
import { Learnsets as Child } from '../gen7infinitefusion/learnsets';

import {ModdedLearnsetDataTable} from '../../../sim/dex-species';
import {ModdedLearnsetData} from '../../../sim/dex-species';

const baseLearnsets = require('../../learnsets').Learnsets;

function combineLearnsets(...learnsets: ModdedLearnsetData[]) {
	let finalLearnset: ModdedLearnsetData = {learnset: {}, eventData: []};
	for (const learnset of learnsets) {
		if (!learnset.learnset || !finalLearnset.learnset) continue;
		let moves = learnset.learnset;
		let events = learnset.eventData;
		if (events) finalLearnset.eventData = finalLearnset.eventData?.concat(events);
		
		for (const move in moves) {
			if (!(move in finalLearnset.learnset)) {
				finalLearnset.learnset[move as keyof typeof finalLearnset.learnset] = learnset.learnset[move as keyof typeof learnset.learnset];
			} else {
				for (const source of learnset.learnset[move as keyof typeof learnset.learnset]) {
					if (!finalLearnset.learnset[move as keyof typeof finalLearnset.learnset].includes(source)) {
						finalLearnset.learnset[move as keyof typeof finalLearnset.learnset].push(source);
					}
				}
			}
		}
	}
	return finalLearnset;
}

export const Learnsets: ModdedLearnsetDataTable = {
	// Modded
	meloettapirouette: Base.meloetta,

	// Additions
	bulbmantle: combineLearnsets
	(
		baseLearnsets.bulbasaur,
		baseLearnsets.charmander,
		baseLearnsets.squirtle,
	),
	ivymelortle: combineLearnsets
	(
		baseLearnsets.bulbasaur,
		baseLearnsets.charmander,
		baseLearnsets.squirtle,
		baseLearnsets.ivysaur,
		baseLearnsets.charmeleon,
		baseLearnsets.wartortle,
	),
	venustoizard: combineLearnsets
	(
		baseLearnsets.bulbasaur,
		baseLearnsets.charmander,
		baseLearnsets.squirtle,
		baseLearnsets.ivysaur,
		baseLearnsets.charmeleon,
		baseLearnsets.wartortle,
		baseLearnsets.venusaur,
		baseLearnsets.charizard,
		baseLearnsets.blastoise,
	),
	totoritaquil: combineLearnsets
	(
		baseLearnsets.totodile,
		baseLearnsets.chikorita,
		baseLearnsets.cyndaquil,
	),
	baylavanaw: combineLearnsets
	(
		baseLearnsets.totodile,
		baseLearnsets.chikorita,
		baseLearnsets.cyndaquil,
		baseLearnsets.bayleef,
		baseLearnsets.quilava,
		baseLearnsets.croconaw,
	),
	megaligasion: combineLearnsets
	(
		baseLearnsets.totodile,
		baseLearnsets.chikorita,
		baseLearnsets.cyndaquil,
		baseLearnsets.bayleef,
		baseLearnsets.quilava,
		baseLearnsets.croconaw,
		baseLearnsets.meganium,
		baseLearnsets.feraligatr,
		baseLearnsets.typhlosion,
	),
	torkipcko: combineLearnsets
	(
		baseLearnsets.torchic,
		baseLearnsets.mudkip,
		baseLearnsets.treecko,
	),
	gromarshken: combineLearnsets
	(
		baseLearnsets.torchic,
		baseLearnsets.mudkip,
		baseLearnsets.treecko,
		baseLearnsets.grovyle,
		baseLearnsets.marshtomp,
		baseLearnsets.combusken,
	),
	swamptiliken: combineLearnsets
	(
		baseLearnsets.torchic,
		baseLearnsets.mudkip,
		baseLearnsets.treecko,
		baseLearnsets.grovyle,
		baseLearnsets.marshtomp,
		baseLearnsets.combusken,
		baseLearnsets.swampert,
		baseLearnsets.sceptile,
		baseLearnsets.blaziken,
	),
	turcharlup: combineLearnsets
	(
		baseLearnsets.turtwig,
		baseLearnsets.chimchar,
		baseLearnsets.piplup,
	),
	prinfernotle: combineLearnsets
	(
		baseLearnsets.turtwig,
		baseLearnsets.chimchar,
		baseLearnsets.piplup,
		baseLearnsets.prinplup,
		baseLearnsets.monferno,
		baseLearnsets.grotle,
	),
	torterneon: combineLearnsets
	(
		baseLearnsets.turtwig,
		baseLearnsets.chimchar,
		baseLearnsets.piplup,
		baseLearnsets.prinplup,
		baseLearnsets.monferno,
		baseLearnsets.grotle,
		baseLearnsets.torterra,
		baseLearnsets.infernape,
		baseLearnsets.empoleon,
	),
	zapmolticuno: combineLearnsets
	(
		baseLearnsets.zapdos,
		baseLearnsets.moltres,
		baseLearnsets.articuno,
	),
	enraicune: combineLearnsets
	(
		baseLearnsets.entei,
		baseLearnsets.raikou,
		baseLearnsets.suicune,
	),
	kyodonquaza: combineLearnsets
	(
		baseLearnsets.kyogre,
		baseLearnsets.groudon,
		baseLearnsets.rayquaza,
	),
	paldiatina: combineLearnsets
	(
		baseLearnsets.palkia,
		baseLearnsets.dialga,
		baseLearnsets.giratina,
	),
	zekyushiram: combineLearnsets
	(
		baseLearnsets.zekrom,
		baseLearnsets.kyurem,
		baseLearnsets.reshiram,
	),
	celemewchi: combineLearnsets
	(
		baseLearnsets.celebi,
		baseLearnsets.mew,
		baseLearnsets.jirachi,
	),
	regitrio: combineLearnsets
	(
		baseLearnsets.registeel,
		baseLearnsets.regirock,
		baseLearnsets.regice,
	),
	deosectwo: combineLearnsets
	(
		baseLearnsets.deoxys,
		baseLearnsets.genesect,
		baseLearnsets.mewtwo,
	),
};

for (const key in Child) {
	const id = key as keyof typeof Child;
	if (Learnsets[id] || !Child[id].learnset) continue;

	if (!Base[id]) { Learnsets[id] = Child[id]; continue; }

	Learnsets[id] = {inherit: true, learnset: {...Base[id].learnset}};
	if (!Learnsets[id].learnset) continue;

	for (const movekey in Child[id].learnset) {
		const moveid = movekey as IDEntry;

		if (!Learnsets[id].learnset[moveid]) Learnsets[id].learnset[moveid] = [];
		Learnsets[id].learnset[moveid].push(...Child[id].learnset[moveid]);
	}
}
