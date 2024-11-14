const {Dex} = require('../../../sim/dex');
export const FormatsData: import('../../../sim/dex-species').ModdedSpeciesFormatsDataTable = {
	frosthra: {
		inherit: true,
		natDexTier: "Uber",
	},
	kartana: {
		inherit: true,
		natDexTier: "Uber",
	},
	yatagaryu: {
		inherit: true,
		natDexTier: "Uber",
	},
	seikamater: {
		inherit: true,
		natDexTier: "Uber",
	},
	inflagetahmega: {
		inherit: true,
		natDexTier: "Uber",
	},
	inflagetah: {
		inherit: true,
		natDexTier: "Uber",
	},
	slaking: {
		inherit: true,
		natDexTier: "Uber",
	},
	regigigas: {
		inherit: true,
		natDexTier: "Uber",
	},
	tapulele: {
		inherit: true,
		natDexTier: "Uber",
	},
	tapukoko: {
		inherit: true,
		natDexTier: "Uber",
	},
	feliger: {
		inherit: true,
		natDexTier: "Uber",
	},
	blissey: {
		inherit: true,
		natDexTier: "Uber",
	},
	chansey: {
		inherit: true,
		natDexTier: "Uber",
	},
	emolgadelta: {
		inherit: true,
		natDexTier: "UU",
	},
	xurkitree: {
		inherit: true,
		natDexTier: "Uber",
	},
	chanseyegho: {
		inherit: true,
		natDexTier: "Uber",
	},
	necturine: {
		inherit: true,
		natDexTier: "Uber",
	}
};

for (var i of Dex.mod('gen9chaos').species.all()) {
	if (i.types.includes('Nuclear') && !FormatsData[i.id]) {
		FormatsData[i.id] = {
			inherit: true,
			tier: "Uber",
			natDexTier: "Uber"
		};
	}
}
