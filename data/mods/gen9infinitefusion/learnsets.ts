const {Dex} = require('../../../sim/dex');

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

export const ModLearnsets: ModdedLearnsetDataTable = {
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

// const gen7lsets = require('../gen7infinitefusion/learnsets').ModLearnsets
// for (const learnset in gen7lsets) {
// 	if (learnset in baseLearnsets && !(learnset in ModLearnsets)) {
// 		if (!gen7lsets[learnset].learnset || !baseLearnsets[learnset].learnset) continue;
// 		for (const move in gen7lsets[learnset].learnset) {
// 			if (move in baseLearnsets[learnset].learnset) continue;
// 			if (!(learnset in ModLearnsets)) ModLearnsets[learnset as keyof typeof ModLearnsets] = {inherit: true, learnset: {...baseLearnsets[learnset as keyof typeof baseLearnsets].learnset}};
// 			// @ts-ignore unable to stop this somehow
// 			ModLearnsets[learnset as IDEntry].learnset[move as IDEntry] = gen7lsets[learnset].learnset[move];
// 		}
// 	}
// }

export const Learnsets: ModdedLearnsetDataTable = Dex.deepClone(ModLearnsets);
