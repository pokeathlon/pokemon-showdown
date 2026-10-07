import { FS, Utils } from '../../lib';

let ladderQueue: { [formatid: string]: number } = {};
const ladderQueueInterval = setInterval(() => {
	const queue: { [formatid: string]: number } = {};
	for (const [formatid, formatTable] of Ladders.searches) {
		if (formatTable.searches.size) queue[formatid] = formatTable.searches.size;
	}
	if (JSON.stringify(queue) === JSON.stringify(ladderQueue)) return;
	ladderQueue = queue;
	const lobby = Rooms.get('lobby');
	if (!lobby) return;
	for (const user of Object.values(lobby.users)) user.send(`|queryresponse|ladderqueue|${JSON.stringify(queue)}`);
}, 2 * 1000);

export const crqHandlers: { [k: string]: Chat.CRQHandler } = {
	ladderqueue(target, user, trustable) {
		if (!trustable) return false;
		return ladderQueue;
	},
};

export const commands: Chat.ChatCommands = {
	challengeonly(target, room, user, connection) {
		if (!Config.challengeonlysecret) throw new Chat.ErrorMessage(`Challenge-only accounts are disabled on this server.`);
		if (user.named) throw new Chat.ErrorMessage(`You already have a name.`);
		target = target.trim();
		if (!target) return this.parse('/help challengeonly');

		return user.challengeOnlyRename(target, connection);
	},
	challengeonlyhelp: [
		`/challengeonly [seed] - Gives you a challenge-only name generated from [seed].`,
	],

	fuse: 'fusion',
	fusion(target, room, user, connection, cmd) {
		const args = target.split(',');
		if (!toID(args[0]) && !toID(args[1])) return this.parse('/help fusion');
		const targetGen = parseInt(cmd[cmd.length - 1]);
		if (targetGen && !args[2]) target = `${target},gen${targetGen}`;
		const { dex, targets } = this.splitFormat(target, true);
		this.runBroadcast();
		if (targets.length > 2) return this.parse('/help fusion');
		const species = Utils.deepClone(dex.species.get(targets[0]));
		const fusion = dex.species.get(targets[1]);
		if (!fusion.name.length) throw new Chat.ErrorMessage(`Error: No fusion given.`);
		if (!species.exists || species.gen > dex.gen) {
			const monName = species.gen > dex.gen ? species.name : args[0].trim();
			const additionalReason = species.gen > dex.gen ? ` in Generation ${dex.gen}` : ``;
			throw new Chat.ErrorMessage(`Error: Pok\u00e9mon '${monName}' not found${additionalReason}.`);
		}
		if (!fusion.exists || fusion.gen > dex.gen) {
			const monName = fusion.gen > dex.gen ? fusion.name : args[1].trim();
			const additionalReason = fusion.gen > dex.gen ? ` in Generation ${dex.gen}` : ``;
			throw new Chat.ErrorMessage(`Error: Pok\u00e9mon '${monName}' not found${additionalReason}.`);
		}
		if (fusion.name === species.name) {
			throw new Chat.ErrorMessage('Pok\u00e9mon can\'t fuse with themselves.');
		}

		// STATS
		species.bst = 0;
		for (const stat in species.baseStats) {
			if (stat === 'hp' || stat === 'spa' || stat === 'spd') {
				species.baseStats[stat] = Math.floor((species.baseStats[stat] * 2 / 3) + (fusion.baseStats[stat] * 1 / 3));
			}
			if (stat === 'atk' || stat === 'def' || stat === 'spe') {
				species.baseStats[stat] = Math.floor((species.baseStats[stat] * 1 / 3) + (fusion.baseStats[stat] * 2 / 3));
			}
			species.bst += species.baseStats[stat];
		}

		// TYPES
		let speciesTypes = species.types;
		let fusionTypes = fusion.types;

		if (speciesTypes.length === 2 && speciesTypes.includes('Flying') && speciesTypes.includes('Normal')) speciesTypes = ['Flying'];
		if (fusionTypes.length === 2 && fusionTypes.includes('Flying') && fusionTypes.includes('Normal')) fusionTypes = ['Flying'];

		const typesSet = new Set([speciesTypes[0]]);
		const bonusType = dex.types.get(fusionTypes[fusionTypes.length - 1]);
		if (bonusType.exists) typesSet.add(bonusType.name);
		if (fusionTypes.length === 2 && typesSet.size === 1) typesSet.add(fusionTypes[0]);

		// ABILITIES
		const abilities = new Set<string>([...Object.values(species.abilities), ...Object.values(fusion.abilities)]);
		let buf = '<div class="message"><ul class="utilichart"><li class="result">';
		buf += `<span class="col iconcol"><psicon title="${species.name}/${fusion.name}" pokemon="${species.id}" fusion="${fusion.id}"/></span> `;
		buf += '<span class="col typecol">';
		for (const type of typesSet) {
			buf += `<img src="https://${Config.routes.client}/sprites/types/${type}.png" alt="${type}" height="14" width="32">`;
		}
		buf += '</span> ';
		if (dex.gen >= 3) {
			buf += '<span style="float:left;min-height:26px">';
			const ability1 = [...abilities.values()][0];
			abilities.delete(ability1);
			let ability2;
			if (abilities.size) {
				ability2 = [...abilities.values()][0];
				abilities.delete(ability2);
			}
			let ability3;
			if (abilities.size) {
				ability3 = [...abilities.values()][0];
				abilities.delete(ability3);
			}
			let ability4;
			if (abilities.size) {
				ability4 = [...abilities.values()][0];
				abilities.delete(ability4);
			}
			let ability5;
			if (abilities.size) {
				ability5 = [...abilities.values()][0];
				abilities.delete(ability5);
			}
			let ability6;
			if (abilities.size) {
				ability6 = [...abilities.values()][0];
				abilities.delete(ability6);
			}
			let ability7;
			if (abilities.size) {
				ability7 = [...abilities.values()][0];
				abilities.delete(ability7);
			}
			if (ability1) {
				if (ability2) {
					buf += '<span class="col twoabilitycol">' + ability1 + '<br />' + ability2 + '</span>';
				} else {
					buf += '<span class="col abilitycol">' + ability1 + '</span>';
				}
			}
			if (ability3) {
				if (ability4) {
					buf += '<span class="col twoabilitycol">' + ability3 + '<br />' + ability4 + '</span>';
				} else {
					buf += '<span class="col abilitycol">' + ability3 + '</span>';
				}
			}
			if (ability5) {
				if (ability6) {
					buf += '<span class="col twoabilitycol">' + ability5 + '<br />' + ability6 + '</span>';
				} else {
					buf += '<span class="col abilitycol">' + ability5 + '</span>';
				}
			}
			if (ability7) {
				buf += '<span class="col abilitycol">' + ability7 + '</span>';
			}
			buf += '</span>';
		}
		buf += '<span style="float:left;min-height:26px">';
		if (fusion.name.length) {
			buf += '<span class="col statcol"><em>HP</em><br />' + species.baseStats.hp + '</span> ';
		} else {
			buf += '<span class="col statcol"><em>HP</em><br />0</span> ';
		}
		buf += '<span class="col statcol"><em>Atk</em><br />' + species.baseStats.atk + '</span> ';
		buf += '<span class="col statcol"><em>Def</em><br />' + species.baseStats.def + '</span> ';
		if (dex.gen <= 1) {
			buf += '<span class="col statcol"><em>Spc</em><br />' + species.baseStats.spa + '</span> ';
		} else {
			buf += '<span class="col statcol"><em>SpA</em><br />' + species.baseStats.spa + '</span> ';
			buf += '<span class="col statcol"><em>SpD</em><br />' + species.baseStats.spd + '</span> ';
		}
		buf += '<span class="col statcol"><em>Spe</em><br />' + species.baseStats.spe + '</span> ';
		buf += '<span class="col bstcol"><em>BST<br />' + species.bst + '</em></span> ';
		buf += '</span>';
		buf += '</li><li style="clear:both"></li></ul></div>';
		this.sendReply(`|raw|${buf}`);
	},
	fusionhelp: [
		`/fuse <head pokemon>, <body pokemon>[, generation] - Shows the stats, types and abilities that <head pokemon> would get when fused with <body pokemon>.`,
	],
};

export const handlers: Chat.Handlers = {
	onRename(user, oldID, newID) {
		if (!user.s1 || newID.startsWith('guest')) return;
		for (const punishment of Punishments.userids.get(user.s1) || []) {
			if (!punishment.id.startsWith('#')) Punishments.userids.add(newID, punishment);
		}
	},
};

export const punishmentfilter: Chat.PunishmentFilter = (user, punishment) => {
	if (punishment.id.startsWith('#')) return;
	const userid = (typeof user === 'object' && user.s1) || toID(user);
	void LoginServer.request('discord/names', { userid }).then(([res]) => {
		const names = (res?.names as ID[] || []).filter(name => (
			(Punishments.userids.getByType(name, punishment.type)?.expireTime || 0) < punishment.expireTime
		));
		if (!names.length) return;
		for (const name of names) Punishments.userids.add(name, punishment);
		Punishments.savePunishments();
		for (const name of names) {
			const targetUser = Users.getExact(name);
			if (targetUser) Punishments.checkName(targetUser, targetUser.id, targetUser.registered);
		}
	});
};

export function destroy() {
	clearInterval(ladderQueueInterval);
}
