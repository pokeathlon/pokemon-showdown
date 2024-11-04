import {ModdedLearnsetDataTable} from '../../../sim/dex-species';
import {ModdedLearnsetData} from '../../../sim/dex-species';
const {Dex} = require('../../../sim/dex');

const baseLearnsets = require('../../learnsets').Learnsets;
const insgLearnsets = require('../gen9insurgence/learnsets').Learnsets;
const remoteLearnsets = require('./remote.json').dex;

export function flattenLearnset(learnset: ModdedLearnsetData, removals: string[] = [], additions: string[] = []) {
	let finalLearnset: ModdedLearnsetData = {learnset: {}};
	let moves = learnset.learnset;
	if (finalLearnset.learnset) {
		for (const move in moves) {
			if (!removals.includes(move)) {
				finalLearnset.learnset[move as keyof typeof finalLearnset.learnset] = ["9M"];
			}
		}
		for (const addition of additions) {
			if (!(addition in finalLearnset.learnset)) {
				finalLearnset.learnset[addition as keyof typeof finalLearnset.learnset] = ["9M"];
			}
		}
	}
	return finalLearnset;
}

export const Learnsets: ModdedLearnsetDataTable = {
	// Modded
	// Bringing learnset into PoA
	florges: flattenLearnset(baseLearnsets.florges),
	treeckodelta: flattenLearnset(insgLearnsets.treeckodelta),
	grovyledelta: flattenLearnset(insgLearnsets.grovyledelta),
	sceptiledelta: flattenLearnset(insgLearnsets.sceptiledelta),
	sceptiledeltamega: flattenLearnset(insgLearnsets.sceptiledelta),
	torchicdelta: flattenLearnset(insgLearnsets.torchicdelta),
	combuskendelta: flattenLearnset(insgLearnsets.combuskendelta),
	blazikendelta: flattenLearnset(insgLearnsets.blazikendelta),
	blazikendeltamega: flattenLearnset(insgLearnsets.blazikendelta),
	scytherdelta: flattenLearnset(insgLearnsets.scytherdelta),
	electrode: flattenLearnset(baseLearnsets.electrode, ['gigaimpact']),
	lunatone: flattenLearnset(baseLearnsets.lunatone,[],['cometstrike']),
	solrock: flattenLearnset(baseLearnsets.solrock,[],['cometstrike']),
	purugly: flattenLearnset(baseLearnsets.purugly),

	// Adding PoA moves
	meowth: {inherit: true, learnset: {...baseLearnsets.meowth.learnset, currencyflow: ["9M"]}},
	meowthalola: {inherit: true, learnset: {...baseLearnsets.meowthalola.learnset, currencyflow: ["9M"]}},
	meowthgalar: {inherit: true, learnset: {...baseLearnsets.meowthgalar.learnset, currencyflow: ["9M"]}},
	persian: {inherit: true, learnset: {...baseLearnsets.persian.learnset, currencyflow: ["9M"]}},
	persianalola: {inherit: true, learnset: {...baseLearnsets.persianalola.learnset, currencyflow: ["9M"]}},
	perrserker: {inherit: true, learnset: {...baseLearnsets.perrserker.learnset, currencyflow: ["9M"]}},
	gimmighoul: {inherit: true, learnset: {...baseLearnsets.gimmighoul.learnset, currencyflow: ["9M"]}},
	gholdengo: {inherit: true, learnset: {...baseLearnsets.gholdengo.learnset, currencyflow: ["9M"]}},
	goldeen: {inherit: true, learnset: {...baseLearnsets.goldeen.learnset, currencyflow: ["9M"]}},
	golduck: {inherit: true, learnset: {...baseLearnsets.golduck.learnset, currencyflow: ["9M"]}},
	hooh: {inherit: true, learnset: {...baseLearnsets.hooh.learnset, currencyflow: ["9M"]}},
	gastly: {inherit: true, learnset: {...baseLearnsets.gastly.learnset, spiritsiphon: ["9M"]}},
	misdreavus: {inherit: true, learnset: {...baseLearnsets.misdreavus.learnset, spiritsiphon: ["9M"]}},
	sableye: {inherit: true, learnset: {...baseLearnsets.sableye.learnset, spiritsiphon: ["9M"]}},
	duskull: {inherit: true, learnset: {...baseLearnsets.duskull.learnset, spiritsiphon: ["9M"]}},
	drifloon: {inherit: true, learnset: {...baseLearnsets.drifloon.learnset, spiritsiphon: ["9M"]}},
	froslass: {inherit: true, learnset: {...baseLearnsets.froslass.learnset, spiritsiphon: ["9M"]}},
	frillish: {inherit: true, learnset: {...baseLearnsets.frillish.learnset, spiritsiphon: ["9M"]}},
	honedge: {inherit: true, learnset: {...baseLearnsets.honedge.learnset, spiritsiphon: ["9M"]}},
	sandygast: {inherit: true, learnset: {...baseLearnsets.sandygast.learnset, spiritsiphon: ["9M"]}},
	bramblin: {inherit: true, learnset: {...baseLearnsets.bramblin.learnset, spiritsiphon: ["9M"]}},
	alakazam: {inherit: true, learnset: {...baseLearnsets.alakazam.learnset, cometstrike: ["9M"]}},
	arceus: {inherit: true, learnset: {...baseLearnsets.arceus.learnset, cometstrike: ["9M"]}},
	blacephalon: {inherit: true, learnset: {...baseLearnsets.blacephalon.learnset, cometstrike: ["9M"]}},
	claydol: {inherit: true, learnset: {...baseLearnsets.claydol.learnset, cometstrike: ["9M"]}},
	clefable: {inherit: true, learnset: {...baseLearnsets.clefable.learnset, cometstrike: ["9M"]}},
	cosmoem: {inherit: true, learnset: {...baseLearnsets.cosmoem.learnset, cometstrike: ["9M"]}},
	cresselia: {inherit: true, learnset: {...baseLearnsets.cresselia.learnset, cometstrike: ["9M"]}},
	deoxys: {inherit: true, learnset: {...baseLearnsets.deoxys.learnset, cometstrike: ["9M"]}},
	diancie: {inherit: true, learnset: {...baseLearnsets.diancie.learnset, cometstrike: ["9M"]}},
	eternatus: {inherit: true, learnset: {...baseLearnsets.eternatus.learnset, cometstrike: ["9M"]}},
	hoopa: {inherit: true, learnset: {...baseLearnsets.hoopa.learnset, cometstrike: ["9M"]}},
	hydreigon: {inherit: true, learnset: {...baseLearnsets.hydreigon.learnset, cometstrike: ["9M"]}},
	jirachi: {inherit: true, learnset: {...baseLearnsets.jirachi.learnset, cometstrike: ["9M"]}},
	latias: {inherit: true, learnset: {...baseLearnsets.latias.learnset, cometstrike: ["9M"]}},
	latios: {inherit: true, learnset: {...baseLearnsets.latios.learnset, cometstrike: ["9M"]}},
	lunala: {inherit: true, learnset: {...baseLearnsets.lunala.learnset, cometstrike: ["9M"]}},
	mew: {inherit: true, learnset: {...baseLearnsets.mew.learnset, cometstrike: ["9M"]}},
	mewtwo: {inherit: true, learnset: {...baseLearnsets.mewtwo.learnset, cometstrike: ["9M"]}},
	minior: {inherit: true, learnset: {...baseLearnsets.minior.learnset, cometstrike: ["9M"]}},
	necrozma: {inherit: true, learnset: {...baseLearnsets.necrozma.learnset, cometstrike: ["9M"]}},
	nihilego: {inherit: true, learnset: {...baseLearnsets.nihilego.learnset, cometstrike: ["9M"]}},
	probopass: {inherit: true, learnset: {...baseLearnsets.probopass.learnset, cometstrike: ["9M"], shockbombs: ["9M"]}},
	rabsca: {inherit: true, learnset: {...baseLearnsets.rabsca.learnset, cometstrike: ["9M"]}},
	rayquaza: {inherit: true, learnset: {...baseLearnsets.rayquaza.learnset, cometstrike: ["9M"]}},
	regidrago: {inherit: true, learnset: {...baseLearnsets.regidrago.learnset, cometstrike: ["9M"]}},
	regirock: {inherit: true, learnset: {...baseLearnsets.regirock.learnset, cometstrike: ["9M"]}},
	reshiram: {inherit: true, learnset: {...baseLearnsets.reshiram.learnset, cometstrike: ["9M"]}},
	solgaleo: {inherit: true, learnset: {...baseLearnsets.solgaleo.learnset, cometstrike: ["9M"]}},
	uxie: {inherit: true, learnset: {...baseLearnsets.uxie.learnset, cometstrike: ["9M"]}},
	victini: {inherit: true, learnset: {...baseLearnsets.victini.learnset, cometstrike: ["9M"]}},
	zekrom: {inherit: true, learnset: {...baseLearnsets.zekrom.learnset, cometstrike: ["9M"]}},
	ampharos: {inherit: true, learnset: {...baseLearnsets.ampharos.learnset, shockbombs: ["9M"]}},
	archaludon: {inherit: true, learnset: {...baseLearnsets.archaludon.learnset, shockbombs: ["9M"]}},
	bellibolt: {inherit: true, learnset: {...baseLearnsets.bellibolt.learnset, shockbombs: ["9M"]}},
	flaaffy: {inherit: true, learnset: {...baseLearnsets.flaaffy.learnset, shockbombs: ["9M"]}},
	eelektrik: {inherit: true, learnset: {...baseLearnsets.eelektrik.learnset, shockbombs: ["9M"]}},
	electabuzz: {inherit: true, learnset: {...baseLearnsets.electabuzz.learnset, shockbombs: ["9M"]}},
	genesect: {inherit: true, learnset: {...baseLearnsets.genesect.learnset, shockbombs: ["9M"]}},
	graveleralola: {inherit: true, learnset: {...baseLearnsets.graveleralola.learnset, shockbombs: ["9M"]}},
	ironthorns: {inherit: true, learnset: {...baseLearnsets.ironthorns.learnset, shockbombs: ["9M"]}},
	melmetal: {inherit: true, learnset: {...baseLearnsets.melmetal.learnset, shockbombs: ["9M"]}},
	metagross: {inherit: true, learnset: {...baseLearnsets.metagross.learnset, shockbombs: ["9M"]}},
	miraidon: {inherit: true, learnset: {...baseLearnsets.miraidon.learnset, shockbombs: ["9M"]}},
	raichu: {inherit: true, learnset: {...baseLearnsets.raichu.learnset, shockbombs: ["9M"]}},
	raichualola: {inherit: true, learnset: {...baseLearnsets.raichualola.learnset, shockbombs: ["9M"]}},
	regieleki: {inherit: true, learnset: {...baseLearnsets.regieleki.learnset, shockbombs: ["9M"]}},
	stunfisk: {inherit: true, learnset: {...baseLearnsets.stunfisk.learnset, shockbombs: ["9M"]}},
	thundurus: {inherit: true, learnset: {...baseLearnsets.thundurus.learnset, shockbombs: ["9M"]}},
	xurkitree: {inherit: true, learnset: {...baseLearnsets.xurkitree.learnset, shockbombs: ["9M"]}},
};

for (var mon in remoteLearnsets) {
	if (remoteLearnsets[mon].learnset) {
		var out: any = {}
		for (var movename of remoteLearnsets[mon].learnset.split(', ')) {
			out[Dex.toID(movename)] = ["9M"];
		}
		Learnsets[Dex.toID(mon)] = {learnset: out};
	}
}