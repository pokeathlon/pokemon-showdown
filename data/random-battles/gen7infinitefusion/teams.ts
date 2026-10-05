import { RandomGen7Teams } from "../gen7/teams";
import { TeamValidator } from '../../../sim';

export class RandomIFTeams extends RandomGen7Teams {
	override randomSets: { [species: string]: RandomTeamsTypes.RandomSpeciesData } = { ...require('../gen7/sets.json') };
	validator = new TeamValidator('gen7ifdexag');
	bannedAbilities = [
		'Defeatist', 'Huge Power', 'Moody', 'Pure Power', 'Shadow Tag', 'Slow Start', 'Truant', 'Wonder Guard',
	];

	fuse(head: Species, body: Species) {
		const species = {
			...this.dex.formats.get('Infinite Fusion Mod').onModifySpecies!.call(
				{ dex: this.dex } as Battle, head, { m: { fusion: body.name }, set: {} } as unknown as Pokemon
			),
			id: `${head.id}${body.id}`,
		} as Species;
		const learnable = new Set([...this.dex.species.getMovePool(head.id), ...this.dex.species.getMovePool(body.id)]);
		const [stat, offStat] = species.baseStats.atk >= species.baseStats.spa ?
			['atk', 'spa'] as const : ['spa', 'atk'] as const;
		const offCategory = offStat === 'atk' ? 'Physical' : 'Special';
		const parents = [head, body].map(parent => this.randomSets[parent.id]);
		const abilities = [...new Set(parents.flatMap(data => data.sets.flatMap(set => set.abilities!)))]
			.filter(ability => !this.bannedAbilities.includes(ability));
		const sets = parents.flatMap((data, i) => data.sets.filter(set => set.role !== 'Z-Move user').map(set => {
			const other = parents[1 - i].sets;
			const movepool = [...new Set([
				...set.movepool,
				...other.filter(otherSet => otherSet.role === set.role).flatMap(otherSet => otherSet.movepool),
				...other.flatMap(otherSet => otherSet.movepool).filter(move => species.types.includes(this.dex.moves.get(move).type)),
			])].filter(id => {
				const move = this.dex.moves.get(id);
				return learnable.has(move.id) && !(move.category === offCategory && move.basePower > 40 && !move.selfSwitch) &&
					!(move.boosts?.[offStat] && !move.boosts[stat]);
			});
			return { ...set, movepool, abilities };
		})).filter(set => set.movepool.length >= 4 && abilities.length);

		this.randomSets[species.id] = { level: Math.round((parents[0].level! + parents[1].level!) / 2), sets };
		return species;
	}

	override randomTeam() {
		this.enforceNoDirectCustomBanlistChanges();

		const pokemon: RandomTeamsTypes.RandomSet[] = [];
		const fusions: Species[] = [];
		const teamDetails: RandomTeamsTypes.TeamDetails = {};
		const pool = Object.keys(this.randomSets).map(id => this.dex.species.get(id)).filter(species => species.exists &&
			!species.isNonstandard && !species.nfe && !species.battleOnly && !species.requiredItem && !species.requiredItems &&
			!species.eggGroups.includes('Infinite Fusion'));
		const limitFactor = Math.round(this.maxTeamSize / 6) || 1;

		for (let attempts = 0; pokemon.length < this.maxTeamSize && attempts < 1000; attempts++) {
			const head = this.sample(pool);
			const body = this.sample(pool);
			const baseSpecies = pokemon.flatMap(set => [set.species, set.fusion!])
				.map(name => this.dex.species.get(name).baseSpecies);
			if (head.baseSpecies === body.baseSpecies ||
				[head, body].some(half => baseSpecies.includes(half.baseSpecies))) continue;

			const species = this.fuse(head, body);
			if (!this.randomSets[species.id].sets.length) continue;
			if (species.types.some(type =>
				fusions.filter(fusion => fusion.types.includes(type)).length >= 2 * limitFactor)) continue;
			if (this.dex.types.names().some(typeName => {
				const typeMod = this.dex.getEffectiveness(typeName, species);
				const typeMods = fusions.map(fusion => this.dex.getEffectiveness(typeName, fusion));
				return (typeMod > 0 && typeMods.filter(mod => mod > 0).length >= 3 * limitFactor) ||
					(typeMod > 1 && typeMods.filter(mod => mod > 1).length >= limitFactor);
			})) continue;

			const set = { ...this.randomSet(species, teamDetails, !pokemon.length), species: head.name, fusion: body.name };
			if (set.moves.length !== this.maxMoveCount) continue;
			if (set.ability === 'Illusion' && pokemon.length === this.maxTeamSize - 1) continue;
			if (this.validator.validateSet({ ...set, moves: [...set.moves] } as PokemonSet, {})) continue;

			pokemon.push(set);
			fusions.push(species);

			if (set.ability === 'Snow Warning' || set.moves.includes('hail')) teamDetails.hail = 1;
			if (set.moves.includes('raindance') || set.ability === 'Drizzle') teamDetails.rain = 1;
			if (set.ability === 'Sand Stream') teamDetails.sand = 1;
			if (set.moves.includes('sunnyday') || set.ability === 'Drought') teamDetails.sun = 1;
			if (set.moves.includes('aromatherapy') || set.moves.includes('healbell')) teamDetails.statusCure = 1;
			if (set.moves.includes('spikes')) teamDetails.spikes = (teamDetails.spikes || 0) + 1;
			if (set.moves.includes('stealthrock')) teamDetails.stealthRock = 1;
			if (set.moves.includes('stickyweb')) teamDetails.stickyWeb = 1;
			if (set.moves.includes('toxicspikes')) teamDetails.toxicSpikes = 1;
			if (set.moves.includes('defog')) teamDetails.defog = 1;
			if (set.moves.includes('rapidspin')) teamDetails.rapidSpin = 1;
			if (set.moves.includes('auroraveil') || (set.moves.includes('reflect') && set.moves.includes('lightscreen'))) {
				teamDetails.screens = 1;
			}
		}

		if (pokemon.length < this.maxTeamSize) {
			throw new Error(`Could not build a random team for ${this.format}`);
		}
		return pokemon;
	}
}

export default RandomIFTeams;
