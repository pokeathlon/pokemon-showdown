import type { Pokemon, Battle } from '../../../sim';
import { toID } from '../../../sim/dex';

export function removeInnates(pokemon: Pokemon, battle: Battle) {
	for (const innate of (pokemon.m.activeInnates || [])) {
		if (battle.dex.abilities.get(innate).flags['cantsuppress'] || innate === 'neutralizinggas') continue;
		pokemon.removeVolatile("ability" + innate);
		pokemon.removeVolatile("ability:" + toID(innate));
		battle.add('-endability', pokemon, innate);
	}
	pokemon.m.activeInnates = undefined;
	battle.add('-displayabilities', pokemon, [pokemon.ability, ...(pokemon.m.activeInnates || [])], pokemon.m.innates);
}

export function removeInnate(pokemon: Pokemon, innate: string, battle: Battle) {
	if (!pokemon.m.activeInnates?.includes(innate)) return false;
	if (battle.dex.abilities.get(innate).flags['cantsuppress'] || innate === 'neutralizinggas') return false;

	pokemon.removeVolatile("ability" + innate);
	pokemon.removeVolatile("ability:" + toID(innate));
	battle.add('-endability', pokemon, innate);

	const index = pokemon.m.activeInnates.indexOf(innate);
	if (index !== -1) pokemon.m.activeInnates.splice(index, 1);
	if (pokemon.m.activeInnates.length === 0) pokemon.m.activeInnates = undefined;
	battle.add('-displayabilities', pokemon, [pokemon.ability, ...(pokemon.m.activeInnates || [])], pokemon.m.innates);
}

export function addActiveInnates(pokemon: Pokemon, innatesToAdd: string[] | undefined, battle: Battle, fromName: string, ofPokemon: string | undefined) {
	for (const innate of (innatesToAdd || [])) {
		const pokemonHasAbility = pokemon.m.activeInnates?.includes(innate) || pokemon.ability === toID(innate);
		const abilityIsNotTraceable = battle.dex.abilities.getByID(innate).flags['notrace'];
		if (pokemonHasAbility || abilityIsNotTraceable) continue;
		pokemon.addVolatile("ability:" + toID(innate));
		pokemon.m.activeInnates = [...(pokemon.m.activeInnates || []), innate];
		if (fromName === 'silent') battle.add('-ability', pokemon, innate, '[silent]');
		else if (ofPokemon != undefined) battle.add('-ability', pokemon, innate, `[from] ${fromName}`, `[of] ${ofPokemon}`);
		else battle.add('-ability', pokemon, innate, `[from] ${fromName}`);
	}
	battle.add('-displayabilities', pokemon, [pokemon.ability, ...(pokemon.m.activeInnates || [])], [pokemon.baseAbility, ...(pokemon.m.innates || [])]);
}

export function swapInnates(source: Pokemon, target: Pokemon, battle: Battle, fromName: string) {
	const sourceInnates = source.m.activeInnates;
	const targetInnates = target.m.activeInnates;
	removeInnates(source, battle);
	removeInnates(target, battle);
	addActiveInnates(source, targetInnates, battle, fromName);
	addActiveInnates(target, sourceInnates, battle, fromName);
}

export function countBoosts(move: string, dex: ModdedDex, hasContrary: boolean, extras: number) {
	const boosts = dex.moves.get(move).boosts;
	const selfBoosts = dex.moves.get(move).self?.boosts;
	function isBoostingValue(value: any) {
		return (typeof value === 'number') ?
			(!hasContrary && value > 0) || (hasContrary && value < 0) :
			false;
	};
	const boostingMoves = [
		"trailblaze", "aqua step", "flame charge", "aura wheel", "esper wing", "order up", "scale shot",
		"power-up punch",
		"diamond storm", "psyshield bash",
		"charge beam", "fiery dance", "electro shot", "torch song", "meteor beam", "mystical power",
	];
	const boostingMovesExtras = boostingMoves.includes(move.toLowerCase()) ? 1 : 0;
	const numBoosts = (boosts) ?
		Object.values(boosts)
			.filter(value => isBoostingValue(value))
			.reduce((sum, value) => sum + Math.abs(value), 0) :
		0;
	const numSelfBoosts = (selfBoosts) ?
		Object.values(selfBoosts)
			.filter(value => isBoostingValue(value))
			.reduce((sum, value) => sum + Math.abs(value), 0) :
		0;
	return numBoosts + numSelfBoosts + extras + boostingMovesExtras;
}
export function hasBoosting(set: PokemonSet, dex: ModdedDex) {
	const hasContrary = set.ability?.toLowerCase() === "contrary";
	const extras = (set.ability?.toLowerCase() === "speed boost") ? 1 : 0;
	return set.moves?.some(m => countBoosts(m, dex, hasContrary, extras));
}
export function countHighestBoosts(set: PokemonSet, dex: ModdedDex) {
	const hasContrary = set.ability?.toLowerCase() === "contrary";
	const extras = (set.ability?.toLowerCase() === "speed boost") ? 1 : 0;
	return Math.max(...set.moves.map(m => countBoosts(m, dex, hasContrary, extras)));
}

export function isRecoveryMove(moveName: string, dex: ModdedDex) {
	const otherRecoveryMoves = ["rest", "wish", "strength sap"];
	const move = dex.moves.get(moveName);
	return move.heal || move.drain || otherRecoveryMoves.includes(moveName.toLowerCase());
}

export function isSpammableHighPowerStab(moveName: string, set: PokemonSet, dex: ModdedDex) {
	const moveExceptions = [
		"explosion", "self-destruct",
		"hyper beam", "giga impact", "prismatic laser", "blast burn", "frenzy plant", "hydro cannon", "roar of time", "rock wrecker",
		"psycho boost",
		"focus punch", "shell trap", "last resort",
		"sky attack", "freeze shock", "ice burn",
		"doom desire", "future sight",
	];
	const ateAbilities: Record<string, string> = {
		aerilate: "Flying",
		galvanize: "Electric",
		pixilate: "Fairy",
		refrigerate: "Ice",
	};
	const statusItems = ["toxic orb", "flame orb"];
	const isStatusFacade = moveName.toLowerCase() === "facade" && statusItems.includes(set.item?.toLowerCase());
	const typing = getFusionTyping(set, dex);

	const move = dex.moves.get(moveName);
	const hasHighBasePower = move.basePower >= 140 || isStatusFacade;
	const hasAteTyping =
		Object.keys(ateAbilities).includes(set.ability.toLowerCase()) &&
		typing.includes(ateAbilities[set.ability.toLowerCase()]);
	const isStab = typing.includes(move.type) || (move.type === "Normal" && hasAteTyping);
	const isAnException = moveExceptions.includes(moveName.toLowerCase());

	return isStab && hasHighBasePower && !isAnException;
}

export function canBoostSpeed(set: PokemonSet) {
	const speedBoostingMoves = [
		"quiver dance", "dragon dance", "agility", "rock polish", "autotomize", "trailblaze", "aqua step", "aura wheel",
		"flame charge", "geomancy", "shell smash", "clangorous soul", "shift gear", "tidy up", "victory dance",
	];
	const speedBoostingAbilities = [
		"speed boost", "quick feet", "chlorophyll", "sand rush", "slush rush", "swift swim",
	];
	const hasSpeedBoostingAbility = speedBoostingAbilities.includes(set.ability.toLowerCase());
	const hasSpeedBoostingMove = set.moves?.some(m => speedBoostingMoves.includes(m.toLowerCase()));
	return hasSpeedBoostingAbility || hasSpeedBoostingMove;
}

export function calculateBaseFusionStat(statName: StatID, headStat: number, bodyStat: number) {
	const headStrong: StatID[] = ['hp', 'spa', 'spd'];
	let baseStat: number;
	if (headStrong.includes(statName)) {
		baseStat = Math.floor(headStat * 2 / 3 + bodyStat * 1 / 3);
	} else {
		baseStat = Math.floor(headStat * 1 / 3 + bodyStat * 2 / 3);
	}
	return baseStat;
}

export function calculateFullFusionStat(stat: StatID, set: PokemonSet, dex: ModdedDex): number {
	const headStats = dex.species.get(set.species).baseStats;
	const bodyStats = set.fusion ? dex.species.get(set.fusion).baseStats : headStats;
	const baseStat = calculateBaseFusionStat(stat, headStats[stat], bodyStats[stat]);

	const level = set.level ?? 100;
	const iv = set.ivs?.[stat] ?? 31;
	const ev = set.evs?.[stat] ?? 0;
	let natureMult = 1.0;
	if (stat !== 'hp' && set.nature) {
		const nature = dex.natures.get(set.nature);
		if (nature.plus === stat) natureMult *= 1.1;
		if (nature.minus === stat) natureMult *= 0.9;
	}

	const unnaturedStat = stat === 'hp' ?
		Math.floor((2 * baseStat + iv + Math.floor(ev / 4)) * level / 100) + level + 10 :
		Math.floor((2 * baseStat + iv + Math.floor(ev / 4)) * level / 100) + 5;
	const fullStat = Math.floor(unnaturedStat * natureMult);

	return fullStat;
}

export function getFusionStats(set: PokemonSet, dex: ModdedDex) {
	const headStats = dex.species.get(set.species).baseStats;
	if (!set.fusion) return headStats;
	const bodyStats = dex.species.get(set.fusion).baseStats;

	const allStats: StatID[] = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
	const fusionStats: StatsTable = {} as StatsTable;
	for (const stat of allStats) {
		fusionStats[stat] = calculateBaseFusionStat(stat, headStats[stat], bodyStats[stat]);
	}
	return fusionStats;
}

export function getBst(stats: StatsTable) {
	return Object.values(stats).reduce((sum, val) => sum + val, 0);
}

export function processTypingForFusion(typing: string[]) {
	if (typing.includes('Flying') && typing.includes('Normal'))
		typing = ['Flying'];
	return typing;
}

export function getFusionTyping(set: PokemonSet, dex: ModdedDex) {
	const headTyping = processTypingForFusion(dex.species.get(set.species).types);
	if (!set.fusion) return headTyping.flat();
	const bodyTyping = processTypingForFusion(dex.species.get(set.fusion).types);

	const fusedTyping = [headTyping[0]];
	const bonusType = dex.types.get(bodyTyping[bodyTyping.length - 1]);
	if (bonusType.exists) fusedTyping.push(bonusType.name);
	if (bodyTyping.length === 2 && fusedTyping.length === 1) fusedTyping.push(bodyTyping[0]);

	return fusedTyping;
}

export function countStatDoubling(stat: StatID, set: PokemonSet): number {
	const doublingMap: Partial<Record<StatID, { items: string[], abilities: string[] }>> = {
		atk: { items: ['light ball', 'thick club'], abilities: ['huge power', 'pure power'] },
		spa: { items: ['light ball', 'deep sea tooth'], abilities: ['pure focus'] },
		spd: { items: ['deep sea scale', 'metal powder'], abilities: [] },
		def: { items: [], abilities: ['fur coat'] },
		spe: { items: [], abilities: ['unburden', 'chlorophyll', 'swift swim', 'sand rush', 'slush rush'] },
	};

	const statDoublers = doublingMap[stat];
	if (!statDoublers) return 1;

	const item = set.item?.toLowerCase();
	const hasStatDoublingItem = item ? statDoublers.items.includes(item) : false;
	const ability = set.ability?.toLowerCase();
	const hasStatDoublingAbility = ability ? statDoublers.abilities.includes(ability) : false;

	let modifierCount = 1;
	if (hasStatDoublingAbility) modifierCount *= 2;
	if (hasStatDoublingItem) modifierCount *= 2;
	return modifierCount;
}

export function calculateFlinchChance(set: PokemonSet, move: string) {
	const multiHitMoves = [
		"bullet seed", "rock blast", "icicle spear", "pin missile", "fury attack", "fury swipes", "comet punch",
		"arm thrust", "barrage", "bone rush", "spike cannon", "tail slap", "water shuriken", "beat up",
	];
	const flinch30moves = [
		"air slash", "iron head", "icicle crash", "rock slide", "needle arm", "rolling kick", "snore", "triple arrows",
		"bite", "headbutt", "stomp", "zing zap",
	];
	const flinch20moves = [
		"zen headbutt", "waterfall", "dark pulse", "fiery wrath", "dragon rush", "twister",
	];
	const lowerCaseMove = move.toLowerCase();
	const hasSereneGrace = set.ability && set.ability.toLowerCase() === "serene grace";
	const hasStench = set.ability && set.ability.toLowerCase() === "stench";
	const hasKingsRock = set.item && set.item.toLowerCase() === "kings rock";
	if (lowerCaseMove === "fake out") return 100;
	else if (lowerCaseMove === "double iron bash") return 51;
	else if (flinch30moves.includes(lowerCaseMove) && hasSereneGrace) return 60;
	else if (flinch20moves.includes(lowerCaseMove) && hasSereneGrace) return 40;
	else if (multiHitMoves.includes(lowerCaseMove) && (hasStench || hasKingsRock)) return 41;
	else return 0;
}

export function hasSleepMove(set: PokemonSet) {
	const sleepMoves = [
		"spore", "sleep powder", "hypnosis", "lovely kiss", "sing", "grass whistle", "dark void", "relic song",
	];
	return set.moves.some(m => sleepMoves.includes(m.toLowerCase()));
}

export function GetMegaStoneStats(item: Item, dex: ModdedDex) {
	const megaSpecies = dex.species.get(item.megaStone);
	const baseSpecies = dex.species.get(item.megaEvolves);
	const diff = {} as StatsTable;
	let stat: StatID;
	for (stat in megaSpecies.baseStats) {
		diff[stat] = megaSpecies.baseStats[stat] - baseSpecies.baseStats[stat];
	}
	return diff;
}

export function GetMegaStoneTyping(item: Item, species: Species, dex: ModdedDex) {
	const megaSpecies = dex.species.get(item.megaStone);
	const baseSpecies = dex.species.get(item.megaEvolves);
	if (megaSpecies.types === baseSpecies.types) return species.types;
	if (species.types[0] === megaSpecies.types[1]) return [species.types[0]];
	else return [species.types[0], megaSpecies.types[1]];
}
