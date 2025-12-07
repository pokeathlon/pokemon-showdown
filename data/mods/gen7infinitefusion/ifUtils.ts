import { Pokemon, Battle } from '../../../sim';
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
