import { Utils } from '../../../lib';
import { RandomGen7Teams } from "../gen7/teams";
import type { MoveCounter } from "../gen9/teams";
import { TeamValidator } from '../../../sim';
import { toID } from '../../../sim/dex';
import { getFusionName } from '../../split-names';

export class RandomIFTeams extends RandomGen7Teams {
	override randomSets: { [species: string]: RandomTeamsTypes.RandomSpeciesData } = { ...require('../gen7/sets.json') };
	moveUsage = Object.values(this.randomSets).flatMap(data => data.sets.flatMap(set => set.movepool))
		.reduce((usage, move) => usage.add(move), new Utils.Multiset<string>());
	validator = new TeamValidator('gen7ifdexag');
	modifySpecies = this.dex.formats.get('Infinite Fusion Mod').onModifySpecies!;
	bannedAbilities = [
		'Defeatist', 'Huge Power', 'Moody', 'Pure Power', 'Shadow Tag', 'Slow Start', 'Truant', 'Wonder Guard',
	];
	bannedItems = ['Thick Club'];
	protectMoves = ['banefulbunker', 'kingsshield', 'protect', 'spikyshield'];
	moveAbilities: { [move: string]: string[] } = {
		raindance: ['Swift Swim', 'Hydration'],
		sunnyday: ['Chlorophyll', 'Solar Power'],
		sandstorm: ['Sand Rush', 'Sand Force'],
		hail: ['Slush Rush'],
		facade: ['Guts', 'Quick Feet', 'Toxic Boost', 'Poison Heal'],
	};

	fuse(head: Species, body: Species, fusion: Species) {
		const learnable = new Set([...this.dex.species.getMovePool(head.id), ...this.dex.species.getMovePool(body.id)]);
		const gap = Math.abs(fusion.baseStats.atk - fusion.baseStats.spa);
		const parents = [head, body].map(parent => this.randomSets[parent.id]);
		const legal = [head, body].flatMap(parent => Object.values(parent.abilities));
		const abilities = [...new Set(parents.flatMap(data => data.sets.flatMap(set => set.abilities!)))]
			.filter(ability => legal.includes(ability) && !this.bannedAbilities.includes(ability));
		const level = Math.round((parents[0].level! + parents[1].level!) / 2);

		return [head, body].map((parent, i) => {
			const species = {
				...fusion, id: `${head.id}${body.id}${i}`, name: parent.name, baseSpecies: parent.baseSpecies,
			} as Species;
			const other = parents[1 - i].sets;
			const sets = parents[i].sets.filter(set => set.role !== 'Z-Move user').map(set => {
				const categories = new Set(set.movepool.map(id => this.dex.moves.get(id))
					.filter(move => move.basePower > 40 && !move.selfSwitch).map(move => move.category));
				const physical = gap < 10 && categories.size ? categories.has('Physical') :
					fusion.baseStats.atk >= fusion.baseStats.spa || gap < 20 && categories.has('Physical');
				const special = gap < 10 && categories.size ? categories.has('Special') :
					fusion.baseStats.atk < fusion.baseStats.spa || gap < 20 && categories.has('Special');
				const allowed = (move: Move) => move.category === 'Physical' ? physical : move.category !== 'Special' || special;
				const movepool = [...new Set([
					...set.movepool,
					...[
						...other.filter(otherSet => otherSet.role === set.role).flatMap(otherSet => otherSet.movepool),
						...other.flatMap(otherSet => otherSet.movepool).filter(id => {
							const move = this.dex.moves.get(id);
							return move.category !== 'Status' && fusion.types.includes(move.type);
						}),
					].filter(move => !(move in this.moveAbilities)),
				])].filter(id => {
					const move = this.dex.moves.get(id);
					return learnable.has(move.id) && !(!allowed(move) && move.basePower > 40 && !move.selfSwitch) &&
						!((move.boosts?.atk || move.boosts?.spa) && !(move.boosts.atk && physical) && !(move.boosts.spa && special)) &&
						!(['bellydrum', 'curse'].includes(move.id) && !physical) &&
						!(set.role === 'AV Pivot' && move.category === 'Status') && !(move.weather && !fusion.types.includes(move.type));
				});
				movepool.push(...fusion.types.filter(type => !movepool.some(id => {
					const move = this.dex.moves.get(id);
					return move.type === type && move.category !== 'Status' && !this.noStab.includes(id);
				})).flatMap(type => Utils.sortBy([...learnable].filter(id => {
					const move = this.dex.moves.get(id);
					return move.type === type && move.category !== 'Status' && allowed(move) && !this.noStab.includes(id) &&
						(move.basePower || move.basePowerCallback) && this.moveUsage.get(id);
				}), id => -this.moveUsage.get(id)).slice(0, 1)));
				return { ...set, movepool, abilities };
			}).filter(set => set.movepool.length >= 4 && abilities.length &&
				!(set.role.includes('Setup') && !this.queryMoves(new Set(set.movepool), species, '', abilities).get('setup')));

			this.randomSets[species.id] = { level, sets };
			return species;
		});
	}

	override fastPop(list: any[], index: number) {
		if (index < 0) return;
		return super.fastPop(list, index);
	}

	override cullMovePool(
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		movePool: string[],
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): void {
		super.cullMovePool(types, moves, abilities, counter, movePool, teamDetails, species, isLead, preferredType, role);
		this.incompatibleMoves(moves, movePool, this.protectMoves, this.protectMoves);
	}

	override getAbility(
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
	): string {
		if (abilities.includes('Imposter')) return 'Imposter';
		for (const move in this.moveAbilities) {
			const moveAbilities = abilities.filter(ability => this.moveAbilities[move].includes(ability));
			if (moves.has(move) && moveAbilities.length) return this.sample(moveAbilities);
		}
		const empty = this.queryMoves(new Set(), species, '', abilities);
		const triggered = abilities.filter(ability =>
			!this.shouldCullAbility(ability, types, moves, abilities, counter, teamDetails, species) &&
			this.shouldCullAbility(ability, types, new Set(), abilities, empty, {}, species));
		return super.getAbility(types, moves, triggered.length ? triggered : abilities, counter, teamDetails, species);
	}

	override shouldCullAbility(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		abilities: string[],
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
	): boolean {
		switch (ability) {
		case 'Aerilate': case 'Galvanize': case 'Pixilate': case 'Refrigerate':
			return ![...moves].some(id => {
				const move = this.dex.moves.get(id);
				return move.type === 'Normal' && move.category !== 'Status';
			});
		case 'Quick Feet': case 'Toxic Boost':
			return !moves.has('facade');
		case 'Reckless':
			return !counter.get('recoil');
		case 'Serene Grace': case 'Sheer Force':
			return !counter.get('sheerforce');
		case 'Strong Jaw':
			return !counter.get('strongjaw');
		}

		return super.shouldCullAbility(ability, types, moves, abilities, counter, teamDetails, species);
	}

	override getPriorityItem(
		ability: string,
		types: Set<string>,
		moves: Set<string>,
		counter: MoveCounter,
		teamDetails: RandomTeamsTypes.TeamDetails,
		species: Species,
		isLead: boolean,
		preferredType: string,
		role: RandomTeamsTypes.Role,
	): string | undefined {
		const item = super.getPriorityItem(ability, types, moves, counter, teamDetails, species, isLead, preferredType, role);
		if (this.bannedItems.includes(item!)) return;
		if (['Flame Orb', 'Toxic Orb'].includes(item!) && !this.moveAbilities.facade.includes(ability)) return;
		return item;
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

			const fusion = this.modifySpecies.call(
				{ dex: this.dex } as Battle, head, { m: { fusion: body.name }, set: {} } as unknown as Pokemon
			) as Species;
			if (fusion.types.some(type =>
				fusions.filter(other => other.types.includes(type)).length >= 2 * limitFactor)) continue;
			if (this.dex.types.names().some(typeName => {
				const typeMod = this.dex.getEffectiveness(typeName, fusion);
				const typeMods = fusions.map(other => this.dex.getEffectiveness(typeName, other));
				return (typeMod > 0 && typeMods.filter(mod => mod > 0).length >= 3 * limitFactor) ||
					(typeMod > 1 && typeMods.filter(mod => mod > 1).length >= limitFactor);
			})) continue;

			const halves = this.fuse(head, body, fusion).filter(half => this.randomSets[half.id].sets.length);
			if (!halves.length) continue;
			const species = this.sample(halves);

			const set = {
				...this.randomSet(species, teamDetails, !pokemon.length),
				name: getFusionName(toID(head.baseSpecies), toID(body.baseSpecies)) || head.baseSpecies,
				species: head.name,
				fusion: body.name,
			};
			const moves = set.moves.map(move => this.dex.moves.get(move));
			const status = moves.filter(move => move.category === 'Status');
			if (moves.length !== this.maxMoveCount || status.length === moves.length) continue;
			if (this.dex.items.get(set.item).isChoice &&
				status.some(move => !['healingwish', 'memento', 'switcheroo', 'transform', 'trick'].includes(move.id))) continue;
			if (this.queryMoves(new Set(status.map(move => move.id)), species, '', []).get('setup') > 1 &&
				!moves.some(move => ['batonpass', 'powertrip', 'storedpower'].includes(move.id))) continue;
			if (['Aerilate', 'Galvanize', 'Pixilate', 'Refrigerate'].includes(set.ability) &&
				!moves.some(move => move.type === 'Normal' && move.category !== 'Status')) continue;
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
