const UDex: {[k: string]: number} = {
	"orchynx": 1,
	"metalynx": 2,
	"metalynxmega": 2,
	"raptorch": 3,
	"archilles": 4,
	"archillesmega": 4,
	"eletux": 5,
	"electruxo": 6,
	"electruxomega": 6,
	"chyinmunk": 7,
	"chyinmunknuclear": 7,
	"kinetmunk": 8,
	"kinetmunknuclear": 8,
	"birbie": 9,
	"aveden": 10,
	"splendifowl": 11,
	"cubbug": 12,
	"cubblfly": 13,
	"nimflora": 14,
	"barewl": 15,
	"dearewl": 16,
	"gararewl": 17,
	"grozard": 18,
	"terlard": 19,
	"tonemy": 20,
	"tofurang": 21,
	"dunsparce": 22,
	"dunseraph": 23,
	"fortog": 24,
	"folerog": 25,
	"blubelrog": 26,
	"magikarp": 27,
	"magikarpnuclear": 27,
	"gyarados": 28,
	"gyaradosmega": 28,
	"gyaradosnuclear": 28,
	"gyaradosnuclearmega": 28,
	"feleng": 29,
	"felunge": 30,
	"feliger": 31,
	"mankey": 32,
	"primeape": 33,
	"empirilla": 34,
	"owten": 35,
	"owtennuclear": 35,
	"eshouten": 36,
	"eshoutennuclear": 36,
	"lotad": 37,
	"lombre": 38,
	"ludicolo": 39,
	"smore": 40,
	"firoke": 41,
	"brailip": 42,
	"brainoar": 43,
	"ekans": 44,
	"ekansnuclear": 44,
	"arbok": 45,
	"arbokmega": 45,
	"arboknuclear": 45,
	"arboknuclearmega": 45,
	"tancoon": 46,
	"tancoonnuclear": 46,
	"tanscure": 47,
	"tanscurenuclear": 47,
	"sponee": 48,
	"sponaree": 49,
	"pahar": 50,
	"paharnuclear": 50,
	"palij": 51,
	"palijnuclear": 51,
	"pajay": 52,
	"pajaynuclear": 52,
	"jerbolta": 53,
	"jerboltanuclear": 53,
	"comite": 54,
	"cometeor": 55,
	"astronite": 56,
	"mareep": 57,
	"flaaffy": 58,
	"ampharos": 59,
	"ampharosmega": 59,
	"baashaun": 60,
	"baashaunnuclear": 60,
	"baaschaf": 61,
	"baaschafnuclear": 61,
	"baariette": 62,
	"baariettemega": 62,
	"baariettenuclear": 62,
	"baariettenuclearmega": 62,
	"tricwe": 63,
	"harylect": 64,
	"costraw": 65,
	"costrawnuclear": 65,
	"trawpint": 66,
	"trawpintnuclear": 66,
	"lunapup": 67,
	"herolune": 68,
	"minyan": 69,
	"vilucard": 70,
	"buizel": 71,
	"floatzel": 72,
	"modrille": 73,
	"drilgann": 74,
	"drilgannmega": 74,
	"gligar": 75,
	"gligarnuclear": 75,
	"gliscor": 76,
	"gliscornuclear": 76,
	"sableye": 77,
	"sableyemega": 77,
	"cocaran": 78,
	"cararalm": 79,
	"cocancer": 80,
	"corsola": 81,
	"corsolanuclear": 81,
	"corsoreef": 82,
	"corsoreefnuclear": 82,
	"tubjaw": 83,
	"tubjawnuclear": 83,
	"tubareel": 84,
	"tubareelnuclear": 84,
	"cassnail": 85,
	"sableau": 86,
	"escartress": 87,
	"nupin": 88,
	"nupinnuclear": 88,
	"gellin": 89,
	"gellinnuclear": 89,
	"cottonee": 90,
	"whimsicott": 91,
	"whimsicottmega": 91,
	"misdreavus": 92,
	"mismagius": 93,
	"barand": 94,
	"barandnuclear": 94,
	"glaslug": 95,
	"glavinug": 96,
	"s51": 97,
	"s51a": 98,
	"s51amega": 98,
	"paraudio": 99,
	"paraudionuclear": 99,
	"paraboom": 100,
	"paraboomnuclear": 100,
	"flager": 101,
	"inflagetah": 102,
	"inflagetahmega": 102,
	"chimical": 103,
	"chimaconda": 104,
	"tikiki": 105,
	"frikitiki": 106,
	"unymph": 107,
	"harptera": 108,
	"chicoatl": 109,
	"quetzoral": 110,
	"coatlith": 111,
	"tracton": 112,
	"snopach": 113,
	"dermafrost": 114,
	"slothohm": 115,
	"theriamp": 116,
	"titanice": 117,
	"frynai": 118,
	"saidine": 119,
	"daikatuna": 120,
	"selkid": 121,
	"syrentide": 122,
	"syrentidemega": 122,
	"spritzee": 123,
	"aromatisse": 124,
	"miasmedic": 125,
	"jackdeary": 126,
	"winotinger": 127,
	"duplicat": 128,
	"eevee": 129,
	"vaporeon": 130,
	"jolteon": 131,
	"flareon": 132,
	"espeon": 133,
	"umbreon": 134,
	"leafeon": 135,
	"glaceon": 136,
	"sylveon": 137,
	"nucleon": 138,
	"ratsy": 139,
	"raffiti": 140,
	"gargryph": 141,
	"masking": 142,
	"maskingnuclear": 142,
	"dramsama": 143,
	"dramsamamega": 143,
	"dramsamadarkmega": 143,
	"dramsamanuclear": 143,
	"dramsamanuclearmega": 143,
	"dramsamanucleardarkmega": 143,
	"antarki": 144,
	"chupacho": 145,
	"chupachonuclear": 145,
	"luchabra": 146,
	"luchabranuclear": 146,
	"linkite": 147,
	"chainite": 148,
	"pufluff": 149,
	"alpico": 150,
	"anderind": 151,
	"colarva": 152,
	"frosulo": 153,
	"frosthra": 154,
	"fafurr": 155,
	"fafninter": 156,
	"shrimputy": 157,
	"krilvolver": 158,
	"lavent": 159,
	"swabone": 160,
	"skelerogue": 161,
	"navighast": 162,
	"stenowatt": 163,
	"jungore": 164,
	"majungold": 165,
	"hagoop": 166,
	"hagoopnuclear": 166,
	"haagross": 167,
	"haagrossnuclear": 167,
	"xenomite": 168,
	"xenogen": 169,
	"xenoqueen": 170,
	"hazma": 171,
	"geigeroach": 172,
	"minicorn": 173,
	"kiricorn": 174,
	"kiricornmega": 174,
	"oblivicorn": 175,
	"oblivicornmega": 175,
	"luxi": 176,
	"luxor": 177,
	"luxelong": 178,
	"praseopunk": 179,
	"neopunk": 180,
	"sheebit": 181,
	"terrabbit": 182,
	"laissure": 183,
	"volchik": 184,
	"voltasu": 185,
	"yatagaryu": 186,
	"devimp": 187,
	"fallengel": 188,
	"beliaddon": 189,
	"seikamater": 190,
	"garlikid": 191,
	"lanthan": 195,
	"actan": 196,
	"actannuclear": 196,
	"urayne": 197,
	"uraynebeta": 197,
};

export const Scripts: ModdedBattleScriptsData = {
	gen: 6,
	inherit: 'gen6',
	init() {
		for (const i in this.data.Pokedex) {
			if (i in UDex) {
				this.data.Pokedex[i].num = UDex[i];
				this.data.Pokedex[i].gen = 6;
				delete this.data.Pokedex[i].isNonstandard;
			} else {
				if (this.data.Pokedex[i].num > 0) this.data.Pokedex[i].num *= -1;
				this.data.Pokedex[i].isNonstandard = "Unobtainable";
			}
		}
	},
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
							for (var item of allowedItems) {
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
		}
	},
};
