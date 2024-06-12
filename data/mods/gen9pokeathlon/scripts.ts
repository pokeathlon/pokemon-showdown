const {Dex} = require('../../../sim/dex');
const PoADex: {[k: string]: number} = {
	// "syclar": 5001,
	// "syclant": 5002,
	// "revenankh": 5003,
	// "embirch": 5004,
	// "flarelm": 5005,
	// "pyroak": 5006,
	// "breezi": 5007,
	// "fidgit": 5008,
	// "rebble": 5009,
	// "tactite": 5010,
	// "stratagem": 5011,
	// "privatyke": 5012,
	// "arghonaut": 5013,
	// "nohface": 5014,
	// "kitsunoh": 5015,
	// "monohm": 5016,
	// "duohm": 5017,
	// "cyclohm": 5018,
	// "dorsoil": 5019,
	// "colossoil": 5020,
	// "protowatt": 5021,
	// "krilowatt": 5022,
	// "voodoll": 5023,
	// "voodoom": 5024,
	// "scratchet": 5025,
	// "tomohawk": 5026,
	// "necturine": 5027,
	// "necturna": 5028,
	// "mollux": 5029,
	// "cupra": 5030,
	// "argalis": 5031,
	// "aurumoth": 5032,
	// "brattler": 5033,
	// "malaconda": 5034,
	// "cawdet": 5035,
	// "cawmodore": 5036,
	// "volkritter": 5037,
	// "volkraken": 5038,
	// "snugglow": 5039,
	// "plasmanta": 5040,
	// "floatoy": 5041,
	// "caimanoe": 5042,
	// "naviathan": 5043,
	// "crucibelle": 5044,
	// "crucibellemega": 5045,
	// "pluffle": 5046,
	// "kerfluffle": 5047,
	// "pajantom": 5048,
	// "mumbao": 5049,
	// "jumbao": 5050,
	// "fawnifer": 5051,
	// "electrelk": 5052,
	// "caribolt": 5053,
	// "smogecko": 50554,
	// "smoguana": 5055,
	// "smokomodo": 5056,
	// "swirlpool": 5057,
	// "coribalis": 5058,
	// "snaelstrom": 5059,
	// "justyke": 5060,
	// "equilibra": 5061,
	// "solotl": 5062,
	// "astrolotl": 5063,
	// "miasmite": 5064,
	// "miasmaw": 5065,
	// "chromera": 5066,
	// "venomicon": 5067,
	// "venomiconepilogue": 5068,
	// "saharascal": 5069,
	// "saharaja": 5070,
	// "ababo": 5071,
	// "scattervein": 5072,
	// "hemogoblin": 5073,
	// "cresceidon": 5074,
	"soulply": 6001,
	"imitotion": 6002,
	"aviotion": 6003,
	"dracotion": 6004,
	"bunnor": 6005,
	"rabbicicle": 6006,
	"enchantobra": 6007,
	"eyespy": 6008,
	"icyall": 6009,
	"ironeverlasting": 6010,
	"squice": 6011,
	"toxice": 6012,
	"golisopodshogun": 768,
	"tinkatonrhinian": 959,
	"regimyo": 6013,
	"jovianshk": 6014,
	"lunachi": 6015,
	"ockthane": 6016,
	"porygon2rhinian": 6017,
	"porygonzrhinian": 6018,
	"incineroarolulian": 727,
	"raikousupra": 243,
	"enteisupra": 244,
	"suicunesupra": 245,
	"heatransupra": 485,
	"mosster": 6019,
	"barrimander": 6020,
	"staruhz": 6021,
	"wrighvern": 6022,
	"meditao": 6023,
	"electrodemega": 101,
	"florgesmega": 671,
	"pandiz": 6024,
	"bewitwing": 6025,
	"eidolburgh": 6026,
	"snorlaxfrost": 143,
	"snorlaxfrostmega": 143,
	"heracrosssubarctic": 214,
	"sirentom": 6027,
	"braskeptic": 6028,
	"maggony": 6029,
	"sweepdol": 6030,
	"paldemaria": 6031,
	"monetoad": 6032,
	"drifloonkitakami": 425,
	"drifbozu": 6033,
	"voliable": 6034,
	"nestitan": 6035,
	"loxicant": 6036,
	"manacra": 6037,
	"manacraplated": 6037,
	"feidan": 6038,
	"niandertroll": 6039,
	"scorchingkiln": 6040,
	"berserkergene": 6041,
	"scalyterror": 6042,
	"pestri": 6043,
	"sinistersickle": 6044,
	"larvitardelta": 246,
	"pupitardelta": 247,
	"tyranitardelta": 248,
	"blazikendeltamega": 257,
	"sceptiledeltamega": 254,
	"felapstan": 6045,
	"tinkastab": 6046,
	"tinkaslice": 6047,
	"tinkashank": 6048,
	"grandmirage": 6049,
	"magnegauss": 6050,

};

export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	init() {
		const fangames = ['gen9insurgence', 'gen9uranium'];
		const categories = ['Moves', 'Abilities', 'Conditions'];
		for (var fangame of fangames) {
			for (var category of categories) {
				for (var item in Dex.mod(fangame).data[category]) {
					if (!(item in this.data[category as keyof typeof this.data])) {
						this.data[category as keyof typeof this.data][item] = Dex.deepClone(Dex.mod(fangame).data[category][item]);
					}
				}
			}
		}
		for (const i in this.data.Pokedex) {
			if (i in PoADex) {
				this.data.Pokedex[i].num = PoADex[i];
				delete this.data.Pokedex[i].isNonstandard;
			} else {
				if (this.data.Pokedex[i].num > 0) this.data.Pokedex[i].num *= -1;
				this.data.Pokedex[i].isNonstandard = "Unobtainable";
			}
		}
		for (const i in this.data.Moves) {
			if (this.data.Moves[i].isNonstandard === 'Past' || this.data.Moves[i].isNonstandard === 'Unobtainable') {
				delete this.data.Moves[i].isNonstandard;
			}
		}
		for (const i in this.data.Items) {
			if (this.data.Items[i].zMove) {
				delete this.data.Items[i].isNonstandard;
				delete this.data.Items[i].gen;
			}
		}
	},
	actions: {
		switchIn(pokemon: Pokemon, pos: number, sourceEffect: Effect | null = null, isDrag?: boolean) {
			if (!pokemon || pokemon.isActive) {
				this.battle.hint("A switch failed because the Pokémon trying to switch in is already in.");
				return false;
			}
	
			const side = pokemon.side;
			if (pos >= side.active.length) {
				throw new Error(`Invalid switch position ${pos} / ${side.active.length}`);
			}
			const oldActive = side.active[pos];
			const unfaintedActive = oldActive?.hp ? oldActive : null;
			if (unfaintedActive) {
				oldActive.beingCalledBack = true;
				let switchCopyFlag: 'copyvolatile' | 'shedtail' | boolean = false;
				if (sourceEffect && typeof (sourceEffect as Move).selfSwitch === 'string') {
					switchCopyFlag = (sourceEffect as Move).selfSwitch!;
				}
				if (!oldActive.skipBeforeSwitchOutEventFlag && !isDrag) {
					this.battle.runEvent('BeforeSwitchOut', oldActive);
					if (this.battle.gen >= 5) {
						this.battle.eachEvent('Update');
					}
				}
				oldActive.skipBeforeSwitchOutEventFlag = false;
				if (oldActive.getVolatile('preventswitch')) {
					oldActive.removeVolatile('preventswitch');
					return false;
				}
				if (!this.battle.runEvent('SwitchOut', oldActive)) {
					// Warning: DO NOT interrupt a switch-out if you just want to trap a pokemon.
					// To trap a pokemon and prevent it from switching out, (e.g. Mean Look, Magnet Pull)
					// use the 'trapped' flag instead.
	
					// Note: Nothing in the real games can interrupt a switch-out (except Pursuit KOing,
					// which is handled elsewhere); this is just for custom formats.
					return false;
				}
				if (!oldActive.hp) {
					// a pokemon fainted from Pursuit before it could switch
					return 'pursuitfaint';
				}
	
				// will definitely switch out at this point
	
				oldActive.illusion = null;
				this.battle.singleEvent('End', oldActive.getAbility(), oldActive.abilityState, oldActive);
	
				// if a pokemon is forced out by Whirlwind/etc or Eject Button/Pack, it can't use its chosen move
				this.battle.queue.cancelAction(oldActive);
	
				let newMove = null;
				if (this.battle.gen === 4 && sourceEffect) {
					newMove = oldActive.lastMove;
				}
				if (switchCopyFlag) {
					pokemon.copyVolatileFrom(oldActive, switchCopyFlag);
				}
				if (newMove) pokemon.lastMove = newMove;
				oldActive.clearVolatile();
			}
			if (oldActive) {
				oldActive.isActive = false;
				oldActive.isStarted = false;
				oldActive.usedItemThisTurn = false;
				oldActive.statsRaisedThisTurn = false;
				oldActive.statsLoweredThisTurn = false;
				oldActive.position = pokemon.position;
				pokemon.position = pos;
				side.pokemon[pokemon.position] = pokemon;
				side.pokemon[oldActive.position] = oldActive;
			}
			pokemon.isActive = true;
			side.active[pos] = pokemon;
			pokemon.activeTurns = 0;
			pokemon.activeMoveActions = 0;
			for (const moveSlot of pokemon.moveSlots) {
				moveSlot.used = false;
			}
			this.battle.runEvent('BeforeSwitchIn', pokemon);
			if (sourceEffect) {
				this.battle.add(isDrag ? 'drag' : 'switch', pokemon, pokemon.getDetails, '[from] ' + sourceEffect);
			} else {
				this.battle.add(isDrag ? 'drag' : 'switch', pokemon, pokemon.getDetails);
			}
			pokemon.abilityOrder = this.battle.abilityOrder++;
			if (isDrag && this.battle.gen === 2) pokemon.draggedIn = this.battle.turn;
			pokemon.previouslySwitchedIn++;
	
			if (isDrag && this.battle.gen >= 5) {
				// runSwitch happens immediately so that Mold Breaker can make hazards bypass Clear Body and Levitate
				this.battle.singleEvent('PreStart', pokemon.getAbility(), pokemon.abilityState, pokemon);
				this.runSwitch(pokemon);
			} else {
				this.battle.queue.insertChoice({choice: 'runUnnerve', pokemon});
				this.battle.queue.insertChoice({choice: 'runSwitch', pokemon});
			}
	
			return true;
		},
	},
};
